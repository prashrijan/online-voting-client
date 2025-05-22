import { conf } from '../conf/conf';
import { apiProcessor } from './apiProcessor';

// const userEndPoint = conf.baseUrlDev + '/api/v1/user';
const userEndPoint = conf.baseUrlProduction + '/api/v1/user';

export const sendHelpMessageApi = async (payload) => {
  try {
    const res = await apiProcessor({
      url: userEndPoint + '/help',
      method: 'POST',
      showToast: true,
      payload,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
