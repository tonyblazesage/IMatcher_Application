using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }


        [HttpPost("signup")]

        public async Task<ActionResult<UserJwtDto>> Signup(SignUpDto signupDto)
        {

            if ( await UserUnavailable(signupDto.Username)) return BadRequest("Username is Unavailable");

            var newUser = _mapper.Map<ApplicationUser>(signupDto); 

            //using keyword is used to depose the class after use. this method is the same as garbage collection in c
            using var hmac = new HMACSHA512();

      
            newUser.UserName = signupDto.Username.ToLower();
            newUser.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signupDto.Password));
            newUser.PasswordSalt = hmac.Key;
            

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();


            //this part of the code is used to return the userjwtDto to the client (username, token and knownas)
            return new UserJwtDto 
            {
                Username = newUser.UserName,
                Token = _tokenService.CreateToken(newUser),
                KnownAs = newUser.KnownAs,
                Gender = newUser.Gender
            };

        }

        [HttpPost("signin")]
        public async Task<ActionResult<UserJwtDto>> SignIn(SignInDto signinDto)
        {
            var currentuser = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == signinDto.Username.ToLower());


            //if user does not exist, return unauthorised
            if (currentuser == null) return Unauthorized("Incorrect username entered!");


            
            using var hmac = new HMACSHA512(currentuser.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signinDto.Password));

            //using a foreach to loop through the bytearray and compare with the inputted password 
             for(int i = 0; i<computedHash.Length; i++)
             {
                if (computedHash[i] != currentuser.PasswordHash[i]) return Unauthorized("Incorrect password entered!");
             }

            //this part of the code is used to return the userjwtDto to the client (username, token and knownas)
            return new UserJwtDto
            {
                Username = currentuser.UserName,
                Token = _tokenService.CreateToken(currentuser),
                PhotoUrl = currentuser.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = currentuser.KnownAs,
                Gender = currentuser.Gender
            };
        }

        private async Task<bool> UserUnavailable(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}