export type HttpGetParams = {
  url: string;
};

export interface HttpGetClient<BodyResponse = any> {
  get(params: HttpGetParams): Promise<void>;
}
