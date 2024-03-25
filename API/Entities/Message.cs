using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }

        public string SenderUsername { get; set; }

        public ApplicationUser Sender { get; set; }
        public int RecipientId { get; set; }

        public string RecipientUsername { get; set; }

        public ApplicationUser Recipient { get; set; }

        public string MessageContent { get; set; }

        public DateTime? DateMessageRead { get; set; }

        public DateTime MessageSent { get; set; } = DateTime.UtcNow;

        public bool SenderDeletedMessage { get; set; }

        public bool RecipientDeletedMessage { get; set; }


    }
}