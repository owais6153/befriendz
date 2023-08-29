import { IMAGES } from "../utils/constants/images.js";
import {FILE_URL} from "../utils/constants/file.js"

const GroupListDto = (data,) => {
   return {
    _id: data && data?._id ? data._id : null,
    coverImage: data && data?.coverImage ? FILE_URL.UPLOADS + data.coverImage : IMAGES.IMAGE_NOT_AVAILABLE, 
    bannerImage: data && data?.bannerImage ? FILE_URL.UPLOADS + data.bannerImage : IMAGES.IMAGE_NOT_AVAILABLE, 
    title: data && data?.title ? data.title : null,
    about: data && data?.about ? data.about : null,    
  };
};

export default GroupListDto;
