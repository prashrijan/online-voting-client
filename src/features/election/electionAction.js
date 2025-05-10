import {
  resetElection,
  setElection,
  setPublicElection,
  setShowElection,
} from './elecitonSlice';
import {
  createElectionApi,
  fetchElectionApi,
  fetchElections,
} from './electionApi';

export const fetchElectionsAction = () => async (dispatch) => {
  try {
    const { data } = await fetchElections();

    data && dispatch(setPublicElection(data));
  } catch (error) {
    console.error(error);
  }
};

export const createElectionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await createElectionApi(payload);

    if (data) {
      dispatch(setElection(data));
      dispatch(resetElection());
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchElectionAction = (id) => async (dispatch) => {
  console.log('i got called');
  try {
    const res = await fetchElectionApi(id);
    console.log(res);

    res && res.success && res.data && dispatch(setShowElection(res.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
