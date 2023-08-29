const UserUpdateProfileDto = (data) => {
    // Filter Upcoming 
  var userData =  {
    first_name: data && data?.first_name ? data.first_name : null,
    last_name: data && data?.last_name ? data.last_name : null,
    email: data && data?.email ? data.email : null,
    username: data && data?.username ? data.username : null,
    interests: data && data.interests ? data.interests.split(",") : [],
    occupation: data && data?.occupation ? data.occupation : null,
    about: data && data.about ? data.about : null,
    business_name: data && data.business_name ? data.business_name : null,
    business_type: data && data.business_type ? data.business_type : null,
    business_address: data && data.business_address ? data.business_address : null,
    phoneNumber: data && data.phoneNumber ? data.phoneNumber : null,
    dob:
      data && data?.day && data?.month && data?.year
        ? { day: data.day, month: data.month, year: data.year }
        : null
  };
  return userData
};

export default UserUpdateProfileDto;
