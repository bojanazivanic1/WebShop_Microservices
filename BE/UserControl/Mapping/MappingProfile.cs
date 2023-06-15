using AutoMapper;
using UserControl.DTO;
using UserControl.Models;

namespace UserControl.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<User, LoginUserDto>().ReverseMap();
            CreateMap<User, VerifySellerDto>().ReverseMap();
            CreateMap<User, GetUserDto>().ReverseMap();
        }
    }
}
