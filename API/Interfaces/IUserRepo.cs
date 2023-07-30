using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Extension_services;
using API.Helpers;
using AutoMapper.Execution;

namespace API.Interfaces
{
    public interface IUserRepo
    {
        void update (ApplicationUser user); // void means it will not return anything

        Task<bool> SaveAllAsync(); // Task is a promise that will return a boolean

        
        Task<IEnumerable<ApplicationUser>> GetUsersAsync(); // IEnumerable is a collection of objects that can be individually accessed by index

        Task<ApplicationUser> GetUserByIdAsync(int id); // Task is a promise that will return a ApplicationUser by id

        Task<ApplicationUser> GetUserByUsernameAsync(string username); // Task is a promise that will return a ApplicationUser by username

        Task<PagedListing<MemberDto>> GetMembersAsync(UserParams userParams); // Task is a promise that will return a list of MemberDtos

        Task<MemberDto> GetMemberAsync(string username); // Task is a promise that will return a MemberDto by username
    }
}