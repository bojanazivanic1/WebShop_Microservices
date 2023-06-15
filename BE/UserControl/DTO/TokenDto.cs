using System.ComponentModel.DataAnnotations;

namespace UserControl.DTO
{
    public class TokenDto
    {
        [Required]
        public string? Token { get; set; }
    }
}
