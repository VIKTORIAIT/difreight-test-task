export const getFileUrl = (file: File) => {
  return window.URL.createObjectURL(file);
};
