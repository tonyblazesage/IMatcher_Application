using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Extension_services;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUserRepo _userRepo;
        private readonly ILikesRepo _likesRepo;
        public LikesController(IUserRepo userRepo, ILikesRepo likesRepo)
        {
            _likesRepo = likesRepo;
            _userRepo = userRepo;
            
        }

        [HttpPost("{username}")]

        //this basically updated the join table in the database
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId(); //this is contain the source user id
            var likedUser = await _userRepo.GetUserByUsernameAsync(username);  //this will contain the liked user
            var sourceUser = await _likesRepo.GetUserWithLikes(sourceUserId);   //this will contain the source user

            if(likedUser == null) return NotFound();

            if(sourceUser.UserName == username) return BadRequest("This action is prohibited. You cannot like yourself");

            var userLike = await _likesRepo.GetUserLike(sourceUserId, likedUser.Id);

            if(userLike != null) return BadRequest("You already liked this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if(await _userRepo.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user due to internal server error");
        }


        [HttpGet]
        public async Task<ActionResult<PagedListing<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likesRepo.GetUserLikes(likesParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));

            return Ok(users);
        }
          
    }
}