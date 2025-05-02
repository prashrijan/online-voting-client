// electionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  electionData: {
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    candidateIds: [],
    visibility: 'private',
    coverImageFile: null,
    coverImagePreview: null,
  },
  candidates: [],
  publicElections: [],
};

const electionSlice = createSlice({
  name: 'election',
  initialState,
  reducers: {
    setElection: (state, action) => {
      state.electionData = action.payload;
    },
    setPublicElection: (state, action) => {
      state.publicElections = action.payload;
    },
    updateElectionField: (state, action) => {
      const { key, value } = action.payload;
      state.electionData[key] = value;
    },
    addCandidate: (state, action) => {
      const exists = state.candidates.some((c) => c._id === action.payload._id);
      if (!exists) {
        state.candidates.push(action.payload);
        state.electionData.candidateIds.push(action.payload._id);
      }
    },
    removeCandidate: (state, action) => {
      state.candidates = state.candidates.filter(
        (c) => c.id !== action.payload._id
      );
      state.electionData.candidateIds = state.electionData.candidateIds.filter(
        (id) => id !== action.payload._id
      );
    },
    resetElection: () => initialState,
  },
});

export const {
  setElection,
  setPublicElection,
  updateElectionField,
  addCandidate,
  removeCandidate,
  resetElection,
} = electionSlice.actions;

export default electionSlice.reducer;
