export const getImageSrc = (imageName, isNeedDefaultImage = true) => {
  let src = null;

  if (imageName) {
    if (
      imageName.includes('https://i.scdn.co/') ||
      imageName.includes('https://export-download.canva') ||
      imageName.includes('https://api-major-labl.pixy.pro') ||
      imageName.includes('https://lh3.googleusercontent.com') ||
      imageName.includes('https://platform-lookaside.fbsbx.com')
    ) {
      src = imageName;
    } else {
      src = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${imageName}`;
    }
  }

  if (!imageName) {
    if (isNeedDefaultImage) {
      src = '/assets/images/logo-primary.png';
    }

    if (!isNeedDefaultImage) {
      src = '';
    }
  }

  return src;
};
