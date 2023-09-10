import { RemoteLoadSurveyList } from "@/data/useCases/loadSurveyList/remoteLoadSurveyList";
import { LoadSurveyList } from "@/domain/useCases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories";

const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl("/surveys"),
    makeAxiosHttpClient(),
  );
};

export default makeRemoteLoadSurveyList;
