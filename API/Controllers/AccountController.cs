using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
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
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }


        [HttpPost("signup")]

        public async Task<ActionResult<UserJwtDto>> Signup(SignUpDto signupDto)
        {

            if ( await UserUnavailable(signupDto.Username)) return BadRequest("Username is Unavailable");

            //using keyword is used to depose the class after use. this method is the same as garbage collection in c
            using var hmac = new HMACSHA512();

            var newUser = new ApplicationUser
            {
                UserName = signupDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signupDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();


            return new UserJwtDto 
            {
                Username = newUser.UserName,
                Token = _tokenService.CreateToken(newUser)
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

            return new UserJwtDto
            {
                Username = currentuser.UserName,
                Token = _tokenService.CreateToken(currentuser),
                PhotoUrl = currentuser.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }

        private async Task<bool> UserUnavailable(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}