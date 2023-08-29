import moment from 'moment';
import AuthorDto from './author.dto.js';
import {FILE_URL} from "../utils/constants/file.js"
import CommentDto from './comment.dto.js';


const PostDto = (data, friendStatus = false,) => {
  return {
    _id: data && data?._id ? data._id : null,
    coverImage: data && data?.coverImage ? FILE_URL.UPLOADS + data.coverImage : null,
    title: data && data?.title ? data.title : null,
    tags: data && data?.tags ? data.tags.map(item => ({_id: item._id, name: item.name})) : [],
    content: data && data?.content ? data.content : null,
    createdAt: data && data?.createdAt ? moment(data?.createdAt).fromNow() : null, 
    likeCount: data && data?.likeCount ? data.likeCount : 0, 
    isLikedByCurrentUser: data && data?.isLikedByCurrentUser ? data.isLikedByCurrentUser : false, 
    group: data && data?.group ? {title: data.group?.title, _id: data.group?._id} : null, 
    viewCount: data && data?.viewCount ? data.viewCount : 0, 
    shareCount: data && data?.shareCount ? data.shareCount : 0, 
    sharedPost: data && data?.sharedPost && data?.sharedPost?._id ? PostDto(data.sharedPost) : false, 
    commentCount: data && data?.commentCount ? data.commentCount : 0, 
    comments: data && data?.comments ? data?.comments?.map(item => CommentDto(item)) : [], 
    author: data && data?.author ? AuthorDto(data.author, friendStatus) : null,
    fileType: data && data?.fileType ? data.fileType : "", 
  };
};

export default PostDto;
