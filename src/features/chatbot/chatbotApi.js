import { conf } from '../../conf/conf';
import { apiProcessor } from '../../services/apiProcessor';

const chatbotEndPoint = conf.baseUrl + '/api/v1/chat/message';

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
