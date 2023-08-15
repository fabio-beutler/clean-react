import { SetStorage } from "@/data/protocols/cache";
import { CookiesAdapter } from "@/infra/cache/cookiesAdapter";

const makeCookiesAdapter = (): SetStorage => {
  return new CookiesAdapter();
};

export default makeCookiesAdapter;
