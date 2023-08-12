const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const makeApiUrl = (path: string): string => {
  return apiUrl + path;
};

export default makeApiUrl;
