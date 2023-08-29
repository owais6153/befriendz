const publicURL = (path = "") => {
  return `${process.env.REACT_APP_MY_APP_URL}${path}`;
};
const apiUrl = (path = "") => {
  return `${process.env.REACT_APP_MY_APP_API_URL}api/${path}`;
};
const socketUrl = (path = "") => {
  return `${process.env.REACT_APP_MY_APP_API_URL}`;
};
const siteTitle = () => {
  return `${process.env.REACT_APP_MY_APP}`;
};

function removeHTMLAndLimitString(input, limit = false) {
  // Remove HTML tags using a regular expression
  var str = input.replace(/<[^>]+>/g, '');

  // Limit the string length
  if(limit !== false)
  str = str.slice(0, limit);

  return str;
}

const formatDateObject = (day,month,year ) => {
  const date = new Date(year, month, day);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  
  return formattedDate;
};

const convertTo12HourFormat = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  
  let formattedHours = parseInt(hours);
  let period = "AM";
  
  if (formattedHours >= 12) {
    formattedHours = formattedHours % 12;
    period = "PM";
  }
  
  if (formattedHours === 0) {
    formattedHours = 12;
  }
  
  const formattedTime = `${formattedHours}:${minutes} ${period}`;
  return formattedTime;
};
export { siteTitle, apiUrl,socketUrl, publicURL, removeHTMLAndLimitString, formatDateObject, convertTo12HourFormat };
