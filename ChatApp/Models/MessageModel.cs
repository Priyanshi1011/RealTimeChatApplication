using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Models
{
    public class MessageModel
    {
        [Key]
        public int Id { get; set; }

        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Message { get; set; }
        public DateTime DateTime { get; set; }
        public bool Unread { get; set; }
    }
}
