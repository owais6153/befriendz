import { IMAGES } from "../utils/constants/images.js";
import {FILE_URL} from "../utils/constants/file.js"

const TrainingListDto = (data,) => {
   return {
    _id: data && data?._id ? data._id : null,
    coverImage: data && data?.coverImage ? FILE_URL.UPLOADS + data.coverImage : IMAGES.IMAGE_NOT_AVAILABLE, 
    title: data && data?.title ? data.title : null,
    about: data && data?.about ? data.about : null,
    type: data && data?.type ? data.type : null,
    price: data && data?.price ? data.price : false,
    date: data && data?.date ? data.date : false,
    tags: data && data?.tags ? data.tags.map(item => ({_id: item._id, name: item.name})) : [],
  };
};

export default TrainingListDto;
