using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    

    public class UsersController : BaseApiController
    {
        //create an instance of the database in a session to be used to perform logical and business operations
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<ApplicationUser>> GetUserAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

    }
}