import {
  resetElection,
  setCandidatesToShow,
  setElection,
  setFinishedElection,
  setPublicElection,
  setShowElection,
  setYourElections,
} from './elecitonSlice';
import {
  createElectionApi,
  deleteCandidateFromElectionApi,
  deleteElectionApi,
  fetchCandidatesApi,
  fetchElectionApi,
  fetchElections,
  getElectionByCodeApi,
  getFinishedElectionApi,
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

export const addCandidateToElectionAction =
  async (candidateId, electionId) => async (dispatch) => {
    try {
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const deleteCandidateFromElectionAction =
  (candidateId, electionId) => async (dispatch) => {
    try {
      const { data } = await deleteCandidateFromElectionApi(
        candidateId,
        electionId
      );

      data && dispatch(fetchCandidatesAction(electionId));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getElectionByCodeAction = (code) => async (dispatch) => {
  try {
    const res = await getElectionByCodeApi(code);
    if (res.success && res.data) {
      dispatch(setShowElection(res.data));
      return res.data;
    } else {
      dispatch(setShowElection({}));
      return null;
    }
  } catch (error) {
    console.err('error', error);

    throw error;
  }
};

export const getFinishedElectionAction = () => async (dispatch) => {
  try {
    const res = await getFinishedElectionApi();

    res && res.success && dispatch(setFinishedElection(res.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
