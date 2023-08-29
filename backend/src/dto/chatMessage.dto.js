import moment from 'moment';

const ChatMessageDto = (data) => {
  return  {
    _id: data && data?._id ? data._id : null,
    from: data && data?.from ? data.from : null,
    to: data && data?.to ? data.to : null,
    message: data && data?.message ? data.message : null,
    room: data && data?.room ? data.room : null,
    createdAt: data && data?.createdAt ? moment(data?.createdAt).fromNow() : null, 
  }
};

export default ChatMessageDto;
