import moment from 'moment';
import AuthorDto from './author.dto.js';
import { IMAGES } from "../utils/constants/images.js";
import {FILE_URL} from "../utils/constants/file.js"

const GroupDto = (data,) => {
   return {
    _id: data && data?._id ? data._id : null,
    coverImage: data && data?.coverImage ? FILE_URL.UPLOADS + data.coverImage : IMAGES.IMAGE_NOT_AVAILABLE, 
    bannerImage: data && data?.bannerImage ? FILE_URL.UPLOADS + data.bannerImage : IMAGES.IMAGE_NOT_AVAILABLE, 
    title: data && data?.title ? data.title : null,
    about: data && data?.about ? data.about : null,
    isJoinedByCurrentUser: data && data?.isJoinedByCurrentUser ? data.isJoinedByCurrentUser : false,
    tags: data && data?.tags ? data.tags.map(item => ({_id: item._id, name: item.name})) : [],
    createdAt: data && data?.createdAt ? moment(data?.createdAt).fromNow() : null,  
    author: data && data?.author ? AuthorDto(data.author) : null,
  };
};

export default GroupDto;
