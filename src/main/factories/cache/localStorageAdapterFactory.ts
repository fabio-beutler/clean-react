import { SetStorage } from "@/data/protocols/cache";
import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";

const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};

export default makeLocalStorageAdapter;
