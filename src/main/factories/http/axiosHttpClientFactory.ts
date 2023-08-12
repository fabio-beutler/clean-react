import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";

const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

export default makeAxiosHttpClient;
