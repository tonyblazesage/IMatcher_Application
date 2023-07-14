using System.Security.Claims;
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


        [HttpPut]
        public async Task<ActionResult> UpdateUser (MemberUpdateDto memberUpdateDto)
        {
            // Get the username from the token
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Get the user from the database
            var user = await _userrepo.GetUserByUsernameAsync(username);

            // Return an error if the user is not found
            if(user == null) return NotFound();

            // Map the MemberUpdateDto to the user
            _mapper.Map(memberUpdateDto, user); // This will map the properties of the MemberUpdateDto to the properties of the user

            // Save the changes to the database
            if (await _userrepo.SaveAllAsync()) return NoContent();

            // If the changes were not saved to the database, return an error
            return BadRequest("Failed to update user because no changes were made");
        }

    }
}