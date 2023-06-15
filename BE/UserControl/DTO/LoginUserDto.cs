using System.ComponentModel.DataAnnotations;

namespace UserControl.DTO
{
    public class LoginUserDto
    {
        [Required, MaxLength(100)]
        public string? Email { get; set; }
        [Required, MaxLength(100)]
        public string? Password { get; set; }
    }
}
