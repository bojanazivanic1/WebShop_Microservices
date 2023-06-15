using UserControl.Models;

namespace UserControl.Infrastructure.IProviders
{
    public interface IUserDbProvider
    {
        public Task<bool> AddUserAsync(User newUser);
        public Task<User?> FindUserByEmailAsync(string email);
        public Task<User?> FindUserByIdAsync(int id);
        public Task SaveChanges();
        public Task UpdateUser(User? user);
        public Task<List<User>> GetWaitingSellers();
        public Task<List<User>> GetVerifiedSellers();
        public Task<List<User>> GetAllUsersForAdminAsync();
    }
}
