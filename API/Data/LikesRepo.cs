using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Extension_services;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepo : ILikesRepo
    {
        private readonly DataContext _context;
        public LikesRepo(DataContext context)
        {
            _context = context;
            
        }

        //to find the userlike entity with a combination of both int primary keys
        public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, targetUserId);
        }

        //get a list of likes associated with a particular
        public async Task<PagedListing<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();  //this is a query to get a list of users in a database without execution at the database
            var likes = _context.Likes.AsQueryable();

            if(likesParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
                users = likes.Select(like => like.TargetUser); //this will filter the database based on what is on the likes list
            }

            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(like => like.TargetUserId == likesParams.UserId);
                users = likes.Select(like => like.SourceUser); //this will filter the database based on what is on the likes list
            }


            var LikedUsers = users.Select(user => new LikeDto{
                UserName = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City,
                Id = user.Id
            });

            return await PagedListing<LikeDto>.CreateAsync(LikedUsers, likesParams.PageNumber, likesParams.PageSize);
        }

        //this method is used to check if a user has already been liked by another user
        public async Task<ApplicationUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}