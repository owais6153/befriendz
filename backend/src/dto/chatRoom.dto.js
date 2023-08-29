import AuthorDto from './author.dto.js';
import ChatMessageDto from './chatMessage.dto.js';

const ChatRoomDto = (data, messages = [], user = false) => {
  var additionalFields = {};
  if(data?.messages){
    additionalFields = {
        ...additionalFields,
        messages: data?.messages?.map((msg)=>(ChatMessageDto(msg)))
    }
  }
  if(messages.length > 0){
    additionalFields = {
        ...additionalFields,
        messages: messages?.map((msg)=>(ChatMessageDto(msg)))
    }
  }
  if(user !== false){
    additionalFields = {
        ...additionalFields,
        user: AuthorDto(user)
    }
  }
  return  {
    ...additionalFields,
    _id: data && data?._id ? data._id : null,
    messageCount: data && data?.messageCount ? data.messageCount : null,
  }
};

export default ChatRoomDto;
