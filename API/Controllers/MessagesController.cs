using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Extension_services;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController: BaseApiController
    {
        private readonly IUserRepo _userRepo;
        private readonly IMessageRepo _messageRepo;
        private readonly IMapper _mapper;
        public MessagesController(IUserRepo userRepo, IMessageRepo messageRepo, IMapper mapper)
        {
            _mapper = mapper;
            _messageRepo = messageRepo;
            _userRepo = userRepo;
            
        }


        [HttpPost]

        public async Task<ActionResult> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();
            if (username == createMessageDto.RecipientUsername.ToLower())
            {
                return BadRequest("Invalid action because you are sending message to yourself.");
            }

            var sender = await _userRepo.GetUserByUsernameAsync(username);
            var recipient = await _userRepo.GetUserByUsernameAsync(createMessageDto.RecipientUsername);
            
            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                MessageContent = createMessageDto.MessageContent
            };

            _messageRepo.AddMessage(message);

            if (await _messageRepo.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));
            

            return BadRequest("Message was not sent due to internal error.");
        }
    }
}