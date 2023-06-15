using AutoMapper;
using UserControl.DTO;
using UserControl.Infrastructure.IProviders;
using UserControl.Interfaces;
using UserControl.Models;
using UserControl.Models.Enums;

namespace UserControl.Services
{
    public class UserService : IUserService
    {
        private readonly IUserDbProvider _userDbProvider;
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public UserService(IUserDbProvider userDbProvider, IAuthService authService, IEmailService emailService, IImageService imageService, IMapper mapper)
        {
            _userDbProvider = userDbProvider;
            _authService = authService;
            _emailService = emailService;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<GetUserDto> GetUser(int id)
        {
            User? user = await _userDbProvider.FindUserByIdAsync(id);

            if (user == null)
            {
                throw new Exception("That user doesn't exist.");
            }

            return _mapper.Map<GetUserDto>(user);
        }

        public async Task UpdateUser(UpdateUserDto updateUserDto, int id)
        {
            User? user = await _userDbProvider.FindUserByIdAsync(id);

            if (user == null)
            {
                return;
            }

            user.Username = updateUserDto.Username;
            user.PasswordHash = _authService.CreatePasswordHash(updateUserDto.Password);
            user.Email = updateUserDto.Email;
            user.Name = updateUserDto.Name;
            user.LastName = updateUserDto.LastName;
            user.Address = updateUserDto.Address;
            user.Birth = updateUserDto.Birth;

            if (updateUserDto.ImageFile != null && updateUserDto.ImageFile.Length != 0)
            {
                user.Image = await _imageService.ConvertToByteArray(updateUserDto.ImageFile);
            }
            else if (updateUserDto.Image != null && updateUserDto.Image.Length != 0)
            {
                user.Image = updateUserDto.Image;
            }
            else
            {
                user.Image = new byte[0];
            }

            await _userDbProvider.UpdateUser(user);
            await _userDbProvider.SaveChanges();
        }

        public async Task<List<GetUserDto>> GetAllUsersAsync()
        {
            List<User> users = await _userDbProvider.GetAllUsersForAdminAsync();
            return _mapper.Map<List<GetUserDto>>(users);
        }

        public async Task<List<GetUserDto>> GetVerifiedSellersAsync()
        {
            List<User> users = await _userDbProvider.GetVerifiedSellers();
            return _mapper.Map<List<GetUserDto>>(users);
        }

        public async Task<List<GetUserDto>> GetWaitingSellersAsync()
        {
            List<User> users = await _userDbProvider.GetWaitingSellers();
            return _mapper.Map<List<GetUserDto>>(users);
        }

        public async Task VerifySeller(VerifySellerDto verifySellerDto)
        {
            User? user = await _userDbProvider.FindUserByIdAsync(verifySellerDto.Id);

            if (user == null)
            {
                throw new Exception("That user doesn't exist.");
            }

            if (user.VerificationStatus == EVerificationStatus.VERIFIED)
            {
                if (user.UserKind == EUserKind.ADMIN || user.UserKind == EUserKind.BUYER)
                {
                    throw new Exception("You can verify sellers only.");
                }

                throw new Exception("That user has already been verified.");
            }
            if (user.VerificationStatus == EVerificationStatus.DECLINED)
            {
                throw new Exception("That user has already been declined.");
            }

            string emailBody = user.VerificationStatus == EVerificationStatus.VERIFIED ? "You have been verified." : "Your verification has been denied.";
            if (await _emailService.SendEmail(user.Email, "Verification status", emailBody))
            {
                user.VerificationStatus = verifySellerDto.VerificationStatus;
                await _userDbProvider.UpdateUser(user);
                await _userDbProvider.SaveChanges();
            }
        }
    }
}
