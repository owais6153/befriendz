export const same = (val1, val2, message = "Fields not matched") => {
  if (val1 && val2) return val1 === val2 || message;
};
export const fileSize = (files, size, message = "File size exceed") => {
  if (files[0]) return files[0]?.size < size || message;
};
export const allowedFileType = (
  files,
  extensions,
  message = "Invalid file format"
) => {
  if (files[0]) return extensions.includes(files[0]?.type) || message;
};
