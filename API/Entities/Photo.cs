using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {

        
        public int Id { get; set; }
        public string Url { get; set; }

        // This is a boolean value that will be used to determine if the photo is the main photo for the user.
        public bool IsMain { get; set; }   

        public string PublicId { get; set; }

        public int ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set;  }
    }
}