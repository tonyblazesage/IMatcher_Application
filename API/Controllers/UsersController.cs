using System.Security.Claims;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Extension_services;
using API.Helpers;
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
        private readonly IPhotoService _photoService;
   
        public UsersController(IUserRepo userrepo, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userrepo = userrepo;
          
        }

        [HttpGet]

    
        public async Task<ActionResult<PagedListing<MemberDto>>> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUser = await _userrepo.GetUserByUsernameAsync(User.GetUsername()); // Get the current user from the database

            userParams.CurrentUsername = currentUser.UserName; // Set the current username to the username of the current user

            if(string.IsNullOrEmpty(userParams.Gender))
            {
                
                userParams.Gender = currentUser.Gender == "male"  ? "female" : "male";
            }





            var users = await _userrepo.GetMembersAsync(userParams); // GetUsersAsync is a method that will return a list of ApplicationUsers

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages)); // AddPaginationHeader is a method that will add pagination headers to the response

            return Ok(users); // Return the list of MemberDtos
        }

        [HttpGet("{username}")]

        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userrepo.GetMemberAsync(username); // GetUserByUsernameAsync is a method that will return a ApplicationUser by username

        }


        [HttpPut]
        public async Task<ActionResult> UpdateUser (MemberUpdateDto memberUpdateDto)
        {

            // Get the user from the database and pass the username of the user
            var user = await _userrepo.GetUserByUsernameAsync(User.GetUsername());

            // Return an error if the user is not found
            if(user == null) return NotFound();

            // Map the MemberUpdateDto to the user
            _mapper.Map(memberUpdateDto, user); // This will map the properties of the MemberUpdateDto to the properties of the user

            // Save the changes to the database
            if (await _userrepo.SaveAllAsync()) return NoContent();

            // If the changes were not saved to the database, return an error
            return BadRequest("Failed to update user because no changes were made");
        }



        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userrepo.GetUserByUsernameAsync(User.GetUsername()); // Get the user from the database and pass the username of the user

            if(user == null) return NotFound(); // Return an error if the user is not found

            var result = await _photoService.AddPhotoAsync(file); // Add the photo to Cloudinary

            if(result.Error != null) return BadRequest(result.Error.Message); // Return an error if the photo was not added to Cloudinary

            var photo = new Photo // Create a new instance of Photo
            {
                Url = result.SecureUrl.AbsoluteUri, // Url is the url of the photo in Cloudinary
                PublicId = result.PublicId // PublicId is the id of the photo in Cloudinary
            };

            if(user.Photos.Count == 0) // If the user does not have any photos
            {
                photo.IsMain = true; // Set the photo as the main photo
            };

            user.Photos.Add(photo); // Add the photo to the user's photos

            if(await _userrepo.SaveAllAsync()) // Save the changes to the database
            {
                return CreatedAtAction(nameof(GetUser), new {username = user.UserName}, _mapper.Map<PhotoDto>(photo)); // Return the photo (201 created resource with the location of the resource )
            }

            return BadRequest("Problem encountered during photo upload"); // Return an error if the changes were not saved to the database

        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userrepo.GetUserByUsernameAsync(User.GetUsername()); // Get the user from the database and pass the username of the user

            if(user == null) return NotFound(); // Return an error if the user is not found

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId); // Get the photo from the user's photos

            if(photo == null) return NotFound(); // Return an error if the photo is not found

            if(photo.IsMain) return BadRequest("This is already your main photo"); // Return an error if the photo is already the main photo

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain); // Get the current main photo

            if(currentMain != null) currentMain.IsMain = false; // Set the current main photo to false

            photo.IsMain = true; // Set the photo as the main photo

            if(await _userrepo.SaveAllAsync()) return NoContent(); // Save the changes to the database

            return BadRequest("Failed to set main photo"); // Return an error if the changes were not saved to the database
        }


        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userrepo.GetUserByUsernameAsync(User.GetUsername()); // Get the user from the database and pass the username of the user

            if(user == null) return NotFound(); // Return an error if the user is not found

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId); // Get the photo from the user's photos

            if(photo == null) return NotFound(); // Return an error if the photo is not found

            if(photo.IsMain) return BadRequest("You cannot delete your main photo"); // Return an error if the photo is the main photo

            if(photo.PublicId != null) // If the photo has a public id
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId); // Delete the photo from Cloudinary

                if(result.Error != null) return BadRequest(result.Error.Message); // Return an error if the photo was not deleted from Cloudinary
            }

            user.Photos.Remove(photo); // Remove the photo from the user's photos

            if(await _userrepo.SaveAllAsync()) return Ok(); // Save the changes to the database

            return BadRequest("Failed to delete photo"); // Return an error if the changes were not saved to the database
        }

    }
}