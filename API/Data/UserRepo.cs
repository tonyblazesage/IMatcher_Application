using API.Dtos;
using API.Entities;
using API.Extension_services;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly DataContext _context; // readonly means it can only be set in the constructor
        private readonly IMapper _mapper;
        
        public UserRepo(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x=>x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider) // ProjectTo is a method that will project the query to a destination type
                .SingleOrDefaultAsync(); // SingleOrDefaultAsync is a method that will find a user by username
        }

        public async Task<PagedListing<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable(); // AsQueryable is a method that will return a queryable object

            query = query.Where(u => u.UserName != userParams.CurrentUsername); // Where is a method that will filter the query and exclude the current user from been returned in the matches list

            query = query.Where(u => u.Gender == userParams.Gender);


            //variable to store max and min age (eg min 18 max is 99)
            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1); // DateTime.Today is a method that will return the current date
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge); // DateTime.Today is a method that will return the current date

            //filter according to minimum and maximum date of birth
            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob); 

            //filter according to order by
            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(created => created.Created), 
                _ => query.OrderByDescending(lastactive => lastactive.LastActive) 
            };

            return await PagedListing<MemberDto>.CreateAsync(
                query.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider), 
                userParams.PageNumber, 
                userParams.PageSize); // CreateAsync is a method that will create a new instance of PagedListing
                
        }

        public async Task<ApplicationUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id); // FindAsync is a method that will find a user by id
        }

        public async Task<ApplicationUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p=>p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username); // SingleOrDefaultAsync is a method that will find a user by username    
        }

        // GetUsersAsync will return a list of users
        public async Task<IEnumerable<ApplicationUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p=>p.Photos)
                .ToListAsync(); // ToListAsync is a method that will return a list of users
        }

        // SaveAllAsync will return a boolean
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; // SaveChangesAsync is a method that will save changes to the database 
        }

    
        public void update(ApplicationUser user)
        {
            _context.Entry(user).State = EntityState.Modified; // Entry is a method that will return an object that will be tracked by the database 
        }
    }
}