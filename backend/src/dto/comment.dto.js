import moment from 'moment';
import AuthorDto from './author.dto.js';

const CommentDto = (data) => {
  return  {
    _id: data && data?._id ? data._id : null,
    content: data && data?.content ? data.content : null,
    createdAt: data && data?.createdAt ? moment(data?.createdAt).fromNow() : null, 
    likeCount: data && data?.likeCount ? data.likeCount : 0, 
    isLikedByCurrentUser: data && data?.isLikedByCurrentUser ? data.isLikedByCurrentUser : false, 
    post: data && data?.post ? data.post : false, 
    comments: data && data?.comments && data?.comments?.length > 0 ? data.comments?.map(item => CommentDto(item)) : [], 
    isChild: data && data?.parentComment ? !!data.parentComment : false, 
    user: data && data?.user ? AuthorDto(data.user) : null,
  }
};

export default CommentDto;
