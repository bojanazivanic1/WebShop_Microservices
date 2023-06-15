using System.ComponentModel.DataAnnotations;
using UserControl.Models.Enums;

namespace UserControl.DTO
{
    public class GetUserDto
    {
        [Required]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public DateTime Birth { get; set; }
        public string? Address { get; set; }
        public EUserKind UserKind { get; set; }
        public byte[]? Image { get; set; }
    }
}
