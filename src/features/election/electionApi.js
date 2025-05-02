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
