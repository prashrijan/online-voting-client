import { apiProcessor } from '../../services/apiProcessor';

import { conf } from '../../conf/conf';

const userEndPoint = conf.baseUrl + '/api/v1/user';

export const fetchUserApi = async () => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: userEndPoint + '/',
      isPrivate: true,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllUserApi = async () => {
  const res = await apiProcessor({
    method: 'GET',
    url: userEndPoint + '/users',
    isPrivate: true,
  });

  return res;
};
