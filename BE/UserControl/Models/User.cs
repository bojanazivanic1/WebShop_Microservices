using System.ComponentModel.DataAnnotations;
using UserControl.Models.Enums;

namespace UserControl.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, MaxLength(100), RegularExpression("[a-zA-Z0-9]+")]
        public string? Username { get; set; }
        [Required, MaxLength(100), EmailAddress]
        public string? Email { get; set; }
        [Required, MaxLength(300)]
        public string? PasswordHash { get; set; }
        [Required, MaxLength(100)]
        public string? Name { get; set; }
        [Required, MaxLength(100)]
        public string? LastName { get; set; }
        [Required]
        public DateTime Birth { get; set; }
        [Required, MaxLength(200)]
        public string? Address { get; set; }
        [Required]
        public EUserKind UserKind { get; set; }
        public byte[]? Image { get; set; }
        [Required]
        public EVerificationStatus VerificationStatus { get; set; }
    }
}
