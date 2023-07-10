using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    [Authorize]
    public class UsersController : BaseApiController
    {
        //create an instance of the database in a session to be used to perform logical and business operations
        private readonly IUserRepo _userrepo;
        private readonly IMapper _mapper;
   
        public UsersController(IUserRepo userrepo, IMapper mapper)
        {
            _mapper = mapper;
            _userrepo = userrepo;
          
        }

        [HttpGet]

    
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {

            var users = await _userrepo.GetMembersAsync(); // GetUsersAsync is a method that will return a list of ApplicationUsers


            return Ok(users); // Return the list of MemberDtos
        }

        [HttpGet("{username}")]

        public async Task<ActionResult<MemberDto>> GetUserAsync(string username)
        {
            return await _userrepo.GetMemberAsync(username); // GetUserByUsernameAsync is a method that will return a ApplicationUser by username

        }

    }
}