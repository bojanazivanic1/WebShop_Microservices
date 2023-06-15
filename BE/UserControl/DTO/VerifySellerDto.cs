using System.ComponentModel.DataAnnotations;
using UserControl.Models.Enums;

namespace UserControl.DTO
{
    public class VerifySellerDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public EVerificationStatus VerificationStatus { get; set; }
    }
}
