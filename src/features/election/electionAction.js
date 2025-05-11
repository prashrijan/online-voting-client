import {
  resetElection,
  setCandidatesToShow,
  setElection,
  setPublicElection,
  setShowElection,
  setYourElections,
} from './elecitonSlice';
import {
  createElectionApi,
  deleteElectionApi,
  fetchCandidatesApi,
  fetchElectionApi,
  fetchElections,
  getMyElectionsApi,
  updateElectionApi,
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

      dispatch(fetchElectionsAction());
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchElectionAction = (id) => async (dispatch) => {
  try {
    const res = await fetchElectionApi(id);

    res && res.success && res.data && dispatch(setShowElection(res.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchCandidatesAction = (id) => async (dispatch) => {
  try {
    const res = await fetchCandidatesApi(id);

    console.log(res);
    res && res.success && res.data && dispatch(setCandidatesToShow(res.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyElectionAction = () => async (dispatch) => {
  try {
    const { data } = await getMyElectionsApi();

    data && dispatch(setYourElections(data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateElectionAction =
  (electionId, updates) => async (dispatch) => {
    try {
      console.log(electionId, updates);
      const { data } = await updateElectionApi(electionId, updates);

      data && dispatch(setShowElection(data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const deleteElectionAction = (electionId) => async (dispatch) => {
  try {
    const { data } = await deleteElectionApi(electionId);

    data && dispatch(getMyElectionAction());
  } catch (err) {
    console.log(err);
    throw err;
  }
};
