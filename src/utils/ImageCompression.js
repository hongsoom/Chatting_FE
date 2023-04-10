import imageCompression from 'browser-image-compression';

export const loadProfilImg = async image => {
  const file = image[0];

  const options = {
    maxSizeMb: 1,
    maxWidthOrHeight: 400,
  };

  const compressedImage = await imageCompression(file, options);
  const resultFile = new File([compressedImage], compressedImage.name, {
    type: compressedImage.type,
  });
  return resultFile;
};
