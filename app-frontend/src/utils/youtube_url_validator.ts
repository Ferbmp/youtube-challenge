const isValidYouTubeUrl = (url: string): boolean => {
  const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

export default isValidYouTubeUrl;
