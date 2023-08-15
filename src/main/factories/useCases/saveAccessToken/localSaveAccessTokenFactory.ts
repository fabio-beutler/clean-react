import { LocalSaveAccessToken } from "@/data/useCases/saveAccessToken";
import { SaveAccessToken } from "@/domain/useCases";
import { makeLocalStorageAdapter } from "@/main/factories";

const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};

export default makeLocalSaveAccessToken;
