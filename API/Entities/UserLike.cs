using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserLike
    {

        //these properties will act as join parameters to our entity ApplicationUser
        public ApplicationUser SourceUser { get; set; }

        public int SourceUserId { get; set; }

        public ApplicationUser TargetUser { get; set; }

        public int TargetUserId { get; set; }
    }
}