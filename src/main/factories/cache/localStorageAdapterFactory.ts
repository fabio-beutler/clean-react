import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";

const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

export default makeLocalStorageAdapter;
