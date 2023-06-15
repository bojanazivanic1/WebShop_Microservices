using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserControl.DTO;
using UserControl.Interfaces;

namespace UserControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUserAsync([FromForm] UpdateUserDto updateUserDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.UpdateUser(updateUserDto, userId);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetUser()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Bad ID. Logout and login.");

            GetUserDto? user = await userService.GetUser(userId);

            return Ok(user);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("verify-seller")]
        public async Task<ActionResult> VerifySellerAsync(VerifySellerDto verifySellerDto)
        {
            await userService.VerifySeller(verifySellerDto);
            return Ok();
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("get-verified-sellers")]
        public async Task<ActionResult> GetVerifiedSellersAsync()
        {
            List<GetUserDto> users = await userService.GetVerifiedSellersAsync();
            return Ok(users);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("get-waiting-sellers")]
        public async Task<ActionResult> GetWaitingSellersAsync()
        {
            List<GetUserDto> users = await userService.GetWaitingSellersAsync();
            return Ok(users);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("get-all-users")]
        public async Task<ActionResult> GetAllUsersAsync()
        {
            List<GetUserDto> users = await userService.GetAllUsersAsync();
            return Ok(users);
        }
    }
}
