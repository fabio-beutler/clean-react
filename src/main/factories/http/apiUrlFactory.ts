const makeApiUrl = (path: string): string => {
  return "http://localhost:3000/api" + path;
};

export default makeApiUrl;
