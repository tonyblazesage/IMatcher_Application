using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //DBset represent tables in the database eg Users will be a table name in the database 
        public DbSet<ApplicationUser> Users { get; set; }
    }
}