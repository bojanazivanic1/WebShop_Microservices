using UserControl.DTO;

namespace UserControl.Interfaces
{
    public interface IUserService
    {
        Task<GetUserDto> GetUser(int id);
        Task UpdateUser(UpdateUserDto updateUserDto, int id);
        Task<List<GetUserDto>> GetAllUsersAsync();
        Task<List<GetUserDto>> GetVerifiedSellersAsync();
        Task<List<GetUserDto>> GetWaitingSellersAsync();
        Task VerifySeller(VerifySellerDto verifySellerDto);
    }
}
