import { apiProcessor } from '../../services/apiProcessor.js';
import { conf } from '../../conf/conf.js';

const electionEndPoint = conf.baseUrl + '/api/v1/election';

export const fetchElections = async () => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: electionEndPoint,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};
export const createElectionApi = async (data) => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: electionEndPoint,
      isPrivate: true,
      showToast: true,
      payload: data,
      contentType: 'multipart/form-data',
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
