using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using UserControl.Infrastructure.IProviders;
using UserControl.Interfaces;
using UserControl.Models.Enums;
using UserControl.Models;
using Google.Apis.Auth;
using UserControl.DTO;
using System.Security.Cryptography;

namespace UserControl.Services
{
    public class AuthService : IAuthService
    {
        private static IUserDbProvider? _userDbProvider;
        private static IEmailService? _emailService;
        private readonly IConfiguration _configuration;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public AuthService(IUserDbProvider userDbProvider, IConfiguration configuration, IMapper mapper, IEmailService emailService, IImageService imageService)
        {
            _userDbProvider = userDbProvider;
            _emailService = emailService;
            _configuration = configuration;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<string> LoginUserAsync(LoginUserDto request)
        {
            User? user = await _userDbProvider.FindUserByEmailAsync(request.Email);

            if (user == null)
            {
                return "User not found.";
            }

            if (!VerifyPasswordHash(request.Password, user))
            {
                return "Wrong password.";
            }

            if (user.UserKind == EUserKind.SELLER)
            {
                if (user.VerificationStatus == EVerificationStatus.DECLINED)
                    throw new Exception("You are declined by admin.");
                if (user.VerificationStatus == EVerificationStatus.WAITING)
                    throw new Exception("You are not verified yet.");
            }

            return CreateToken(user);
        }

        public async Task<bool> RegisterUserAsync(RegisterUserDto request)
        {
            User? user = await _userDbProvider.FindUserByEmailAsync(request.Email);

            if (user != null)
            {
                throw new Exception("That email is already in use!");
            }

            user = _mapper.Map<User>(request);

            if (user.UserKind == EUserKind.SELLER)
            {
                await _emailService.SendEmail(user.Email, "Registration", "Wait on admin to verify account.");
            }
            else
            {
                user.VerificationStatus = EVerificationStatus.VERIFIED;
            }

            user.PasswordHash = CreatePasswordHash(request.Password);

            if (request.ImageFile != null)
            {
                user.Image = await _imageService.ConvertToByteArray(request.ImageFile);
            }
            else
            {
                user.Image = new byte[0];
            }

            return await _userDbProvider.AddUserAsync(user);

        }

        public async Task<string> GoogleLoginAsync(TokenDto request)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _configuration["GoogleSettings:ClientID"] }
            };

            var data = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);

            User? user = await _userDbProvider.FindUserByEmailAsync(data.Email);

            if (user != null)
            {
                if (user.UserKind == EUserKind.SELLER &&
                   user.VerificationStatus != EVerificationStatus.VERIFIED)
                {
                    return "NIste verifikovani.";
                }

                return CreateToken(user);
            }

            user = new User();
            user.Birth = DateTime.Now.AddYears(-18);
            user.Username = data.GivenName + data.FamilyName[0] + user.Birth.Year;
            user.Email = data.Email;
            user.PasswordHash = CreatePasswordHash("123");
            user.Name = data.GivenName;
            user.LastName = data.FamilyName;
            user.Address = "";
            user.UserKind = EUserKind.BUYER;
            user.VerificationStatus = EVerificationStatus.VERIFIED;
            if (data.Picture != null)
            {
                using (WebClient client = new WebClient())
                {
                    user.Image = client.DownloadData(data.Picture);
                }
            }

            await _userDbProvider.AddUserAsync(user);

            return CreateToken(user);
        }

        public string CreatePasswordHash(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                string hashedPassword = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hashedPassword;
            }
        }

        public bool VerifyPasswordHash(string password, User user)
        {
            if (CreatePasswordHash(password) != user.PasswordHash)
                return false;

            return true;
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserKind.ToString()),
                new Claim("role", user.UserKind.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
