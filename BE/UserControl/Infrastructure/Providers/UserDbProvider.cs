using System;
using UserControl.Infrastructure.IProviders;
using UserControl.Models.Enums;
using UserControl.Models;
using Microsoft.EntityFrameworkCore;

namespace UserControl.Infrastructure.Providers
{
    public class UserDbProvider : IUserDbProvider
    {
        private readonly UserDbContext dbContext;

        public UserDbProvider(UserDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> AddUserAsync(User newUser)
        {
            await dbContext.Users.AddAsync(newUser);
            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }


            return true;
        }

        public async Task<User?> FindUserByEmailAsync(string email)
        {
            return await dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
        public async Task<User?> FindUserByIdAsync(int id)
        {
            return await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<User>> GetWaitingSellers()
        {
            return await dbContext.Users.Where(seller => seller.UserKind == EUserKind.SELLER
                                                      && seller.VerificationStatus == EVerificationStatus.WAITING)
                .ToListAsync();
        }

        public async Task<List<User>> GetVerifiedSellers()
        {
            return await dbContext.Users.Where(seller => seller.UserKind == EUserKind.SELLER
                                                      && seller.VerificationStatus == EVerificationStatus.VERIFIED)
                .ToListAsync();
        }
        public async Task<List<User>> GetAllUsersForAdminAsync()
        {
            //return await dbContext.Users.Where(user => user.UserKind != EUserKind.ADMIN).ToListAsync();
            return null;
        }

        public async Task SaveChanges()
        {
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateUser(User? user)
        {
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
        }
    }
}
