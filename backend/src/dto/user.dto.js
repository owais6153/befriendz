import { USER_TYPE } from "../utils/constants/user.js";
import { IMAGES } from "../utils/constants/images.js";
import {FILE_URL} from "../utils/constants/file.js"
import { APP_CONSTANT } from "../utils/constants/app.js";

const UserDto = (data) => {
  const type = data.type;
  // Seprate fields for seprate accounts.
  let typeSpecificFields = {};
  if (type && type === USER_TYPE.business) {
    typeSpecificFields = {
      business_name: data && data?.business_name ? data.business_name : null,
      business_type: data && data?.business_type ? data.business_type : null,
      business_address:
        data && data?.business_address ? data.business_address : null,
    };
  } else if (type && type === USER_TYPE.personal) {
    typeSpecificFields = {
      first_name: data && data?.first_name ? data.first_name : null,
      last_name: data && data?.last_name ? data.last_name : null,
      gender: data && data?.gender ? data.gender : null,
      occupation: data && data?.occupation ? data.occupation : null,
      dob: data && data?.dob ? data.dob : null,
    };
  }
  return {
    ...typeSpecificFields,
    _id: data && data?._id ? data._id : null,
    username: data && data?.username ? data.username : null,
    email: data && data?.email ? data.email : null,
    phoneNumber: data && data?.phoneNumber ? data.phoneNumber : null,
    profileImage: data && data?.profileImage ?  FILE_URL.UPLOADS + data.profileImage : IMAGES.AVATAR,    
    images: data && data?.images ? data.images.map(img =>  FILE_URL.UPLOADS + img) : [],
    status: data && data?.status ? data.status : null,
    about: data && data?.about ? data.about : null,
    isVerified: data && data?.isVerified ? data.isVerified : null,
    type: data && data?.type ? data.type : null,
    interests: data && data?.interests ? data.interests : [],
    createdAt: data && data?.createdAt ? new Date(data.createdAt).toLocaleDateString(APP_CONSTANT.LOCALE_DATE_STRING, {day: 'numeric', month: 'short', year: 'numeric'}) : null,
  };
};

export default UserDto;
