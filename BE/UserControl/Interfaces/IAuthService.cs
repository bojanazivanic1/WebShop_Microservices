using UserControl.DTO;
using UserControl.Models;

namespace UserControl.Interfaces
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(RegisterUserDto request);
        Task<string> LoginUserAsync(LoginUserDto request);
        Task<string> GoogleLoginAsync(TokenDto request);
        string CreatePasswordHash(string password);
        bool VerifyPasswordHash(string password, User user);
    }
}
