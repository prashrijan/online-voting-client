import { resetElection, setElection, setPublicElection } from './elecitonSlice';
import { createElectionApi, fetchElections } from './electionApi';

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
