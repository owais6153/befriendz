import moment from 'moment';
import { USER_TYPE } from "../utils/constants/user.js";
import { IMAGES } from "../utils/constants/images.js";
import {FILE_URL} from "../utils/constants/file.js"

const AuthorDto = (data, friendStatus= false) => {

    let accountTypeSpecific = {};

    if (data?.type === USER_TYPE.business) {
      accountTypeSpecific = {
        business_name: data && data?.business_name ? data?.business_name : null,
        business_type: data && data?.business_type ? data?.business_type : null,
      };
    } else if ( data?.type === USER_TYPE.personal) {
      accountTypeSpecific = {
        first_name: data && data?.first_name ? data?.first_name : null,
        last_name: data && data?.last_name ? data?.last_name : null,
        occupation: data && data?.occupation ? data?.occupation : null,
      };
    }
    if(friendStatus){ //Get Relation of current user with post author
      accountTypeSpecific= {...accountTypeSpecific, friendStatus}
    } 
    const filteredData = {
      ...accountTypeSpecific,
      username: data && data?.username ? data?.username : null,
      _id: data && data?._id ? data?._id : null,
      type: data && data?.type ? data?.type : null,
      profileImage: data && data?.profileImage ?  FILE_URL.UPLOADS + data?.profileImage : IMAGES.AVATAR,    
      createdAt: data && data?.createdAt ? moment(data.createdAt).fromNow() : null,
    }
    return filteredData;

}

export default AuthorDto;