import { RemoteLoadSurveyList } from "@/data/useCases/loadSurveyList/remoteLoadSurveyList";
import { LoadSurveyList } from "@/domain/useCases";
import { makeApiUrl } from "@/main/factories";
import { makeAuthorizeHttpGetClientDecorator } from "@/main/factories/decorators";

const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl("/surveys"),
    makeAuthorizeHttpGetClientDecorator(),
  );
};

export default makeRemoteLoadSurveyList;
