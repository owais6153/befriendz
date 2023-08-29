const UserCompleteProfileDto = (data) => {
  // Filter Upcoming 
  return {
    dob:
      data && data?.day && data?.month && data?.year
        ? { day: data.day, month: data.month, year: data.year }
        : null,
    gender: data && data?.gender ? data.gender : null,
    occupation: data && data?.occupation ? data.occupation : null,
    business_address:
      data && data?.business_address ? data.business_address : null,
    phoneNumber: data && data?.phoneNumber ? data.phoneNumber : null,
    occupation: data && data?.occupation ? data.occupation : null,
    about: data && data.about ? data.about : null,
    interests: data && data.interests ? data.interests.split(",") : [],
    profileImage: data && data?.profileImage ? data.profileImage : null,
    images:  data && (data?.image1 || data?.image2 || data?.image3) ? [
        data.image1,
        data.image2,
        data.image3
    ].filter(Boolean) : []
  };
};

export default UserCompleteProfileDto;
