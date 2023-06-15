using System.ComponentModel.DataAnnotations;

namespace UserControl.DTO
{
    public class UpdateUserDto
    {
        [Required, MaxLength(100), RegularExpression("[a-zA-Z0-9]+")]
        public string? Username { get; set; }
        [Required, MaxLength(100)]
        public string? Password { get; set; }
        [Required, MaxLength(100), EmailAddress]
        public string? Email { get; set; }
        [Required, MaxLength(100)]
        public string? Name { get; set; }
        [Required, MaxLength(100)]
        public string? LastName { get; set; }
        [Required]
        public DateTime Birth { get; set; }
        [Required, MaxLength(200)]
        public string? Address { get; set; }
        public IFormFile? ImageFile { get; set; }
        public byte[]? Image { get; set; }
    }
}
