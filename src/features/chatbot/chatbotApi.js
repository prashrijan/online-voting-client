import { conf } from '../../conf/conf';
import { apiProcessor } from '@services/apiProcessor';

const chatbotEndPoint = conf.baseUrlDev + '/api/v1/chat/message';
// const chatbotEndPoint = conf.baseUrlProduction + '/api/v1/chat/message';

export const sendMessageToChatBot = async (userMessage) => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: chatbotEndPoint,
      payload: { message: userMessage },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
