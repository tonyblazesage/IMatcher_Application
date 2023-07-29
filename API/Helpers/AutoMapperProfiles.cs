using API.Dtos;
using API.Entities;
using API.Extension_services;
using AutoMapper;
using AutoMapper.Execution;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Source -> Target
            CreateMap<ApplicationUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url)) // This will map the PhotoUrl property of the MemberDto to the Url property of the Photo that is the main photo of the user (IsMain = true)
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge())); // This will map the Age property of the MemberDto to the DateOfBirth property of the user and calculate the age using the CalculateAge() method   

        
            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, ApplicationUser>();

            CreateMap<SignUpDto, ApplicationUser>();

        }
    }
}