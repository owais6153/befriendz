export const FILE_CONSTANT = {
  EXT: {
    IMAGE: [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".mp4",
      ".mov",
      ".avi",
      ".mkv",
      ".webm",
    ],
  },
  SIZE: {
    "10MB": 1024 * 1024 * 10,
  },
};

export const  FILE_URL =  {
    IMAGES:  `${process.env.APP_ENV === 'local' ? process.env.APP_URL  : process.env.APP_PRODUCTION_URL}get-file/images/`,
    UPLOADS: `${process.env.APP_ENV === 'local' ? process.env.APP_URL  : process.env.APP_PRODUCTION_URL}get-file/uploads/`,
}