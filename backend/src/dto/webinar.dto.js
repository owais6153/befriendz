import moment from 'moment';
import AuthorDto from './author.dto.js';
import { IMAGES } from "../utils/constants/images.js";
import {FILE_URL} from "../utils/constants/file.js"

const WebinarDto = (data,) => {
   return {
    _id: data && data?._id ? data._id : null,
    coverImage: data && data?.coverImage ? FILE_URL.UPLOADS + data.coverImage : IMAGES.IMAGE_NOT_AVAILABLE, 
    title: data && data?.title ? data.title : null,
    about: data && data?.about ? data.about : null,
    type: data && data?.type ? data.type : null,
    isJoinedByCurrentUser: data && data?.isJoinedByCurrentUser ? data.isJoinedByCurrentUser : false,
    price: data && data?.price ? data.price : false,
    date: data && data?.date ? data.date : false,
    tags: data && data?.tags ? data.tags.map(item => ({_id: item._id, name: item.name})) : [],
    createdAt: data && data?.createdAt ? moment(data?.createdAt).fromNow() : null,  
    author: data && data?.author ? AuthorDto(data.author) : null,
  };
};

export default WebinarDto;
