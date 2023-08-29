import moment from 'moment';
import AuthorDto from './author.dto.js';
import PostDto from './post.dto.js';
import CommentDto from './comment.dto.js';


const NotificationDto = (data) => {
  return {
    _id: data && data?._id ? data._id : null,
    user: data && data?.user ? AuthorDto(data.user) : null,
    by: data && data?.by ? AuthorDto(data.by) : null,
    post: data && data?.post ? PostDto(data.post) : null,
    comment: data && data?.comment ? CommentDto(data.comment) : null,
    parentComment: data && data?.parentComment ? CommentDto(data.parentComment) : null,
    type: data && data?.type ? data.type : null,
    is_seen: data && data?.is_seen ? data.is_seen : null,
    action: data && data?.action ? data.action : null,
    createdAt: data && data?.createdAt ? moment(data?.createdAt).fromNow() : null, 
  };
};

export default NotificationDto;
