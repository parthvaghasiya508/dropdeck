import MimeTypes from '../../MimeTypes';

const imagePattern = new RegExp('\.(gif|jpg|jpeg|tiff|png)$', 'i');
export const isImageUrl = (url, contentType) => {

  const mimeTypes = new MimeTypes(contentType);  
  return (imagePattern.test(url) || mimeTypes.isImage(contentType)); 

};
