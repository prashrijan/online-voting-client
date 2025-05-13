import { conf } from '../conf/conf';
import { apiProcessor } from './apiProcessor';

const voteEndPoint = conf.baseUrl + '/api/v1/vote';

export const castVoteApi = async (electionId, candidateId) => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: voteEndPoint + '/',
      isPrivate: true,
      showToast: true,
      payload: { electionId, candidateId },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkVoteStatusApi = async (electionId) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: `${voteEndPoint}/checkVoteStatus/${electionId}`,
      isPrivate: true,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchLiveVoteDataApi = async (electionId) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      isPrivate: true,
      url: `${voteEndPoint}/${electionId}/live`,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVoterCounts = async (electionId) => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      url: `${voteEndPoint}/get-voters-count/${electionId}`,
    });

    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMyVotesApi = async () => {
  try {
    const res = await apiProcessor({
      method: 'GET',
      isPrivate: true,
      url: voteEndPoint + '/my-votes',
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
