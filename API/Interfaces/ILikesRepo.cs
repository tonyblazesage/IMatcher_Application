using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepo
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);

        Task<ApplicationUser> GetUserWithLikes(int userId);

        Task<PagedListing<LikeDto>> GetUserLikes(LikesParams likesParams);
    }
}