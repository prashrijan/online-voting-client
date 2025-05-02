import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  electionData: {
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    candidates: [],
    visibility: 'private',
    coverImageFile: null,
    coverImagePreview: null,
  },
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
      const exists = state.electionData.candidates.some(
        (c) => c.id === action.payload.id
      );
      if (!exists) {
        state.electionData.candidates.push(action.payload);
      }
    },

    removeCandidate: (state, action) => {
      state.electionData.candidates = state.electionData.candidates.filter(
        (c) => c.id !== action.payload.id
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
