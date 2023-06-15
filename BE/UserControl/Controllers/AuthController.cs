using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserControl.DTO;
using UserControl.Interfaces;

namespace UserControl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync([FromForm] RegisterUserDto request)
        {
            if (await authService.RegisterUserAsync(request))
                return Ok(request);

            return BadRequest("Cannot register user.");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(LoginUserDto request)
        {
            string token = await authService.LoginUserAsync(request);

            if (token == "User not found.")
                return BadRequest(token);
            if (token == "Wrong password.")
                return BadRequest(token);

            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("google-login")]
        public async Task<ActionResult> GoogleLoginAsync(TokenDto request)
        {
            string token = await authService.GoogleLoginAsync(request);

            return Ok(token);
        }
    }
}