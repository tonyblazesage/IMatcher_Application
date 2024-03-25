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

        public DbSet<UserLike> Likes { get; set; }
        
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); //uses the method in the base class (dbcontex) and passes it to the modelBuilder
            modelBuilder.Entity<UserLike>()
                .HasKey(k => new {k.SourceUserId, k.TargetUserId}); //specify the primary key(s)

            //configuration for source user or current user can like many user (1 to many relationship)
            modelBuilder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            //configuration to get how many likes to a particular user (many to 1 relationship)
            modelBuilder.Entity<UserLike>()
                .HasOne(s => s.TargetUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.TargetUserId)
                .OnDelete(DeleteBehavior.Cascade);

            //configuration for message entity
            modelBuilder.Entity<Message>()
                .HasOne(r => r.Recipient)
                .WithMany(m => m.ReceivedMessages)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(s => s.Sender)
                .WithMany(m => m.SentMessages)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}