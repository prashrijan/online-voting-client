// electionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

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
  electionToShow: {},
  candidatesToShow: [],
  yourElections: [],
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

    setShowElection: (state, action) => {
      state.electionToShow = action.payload;
    },
    setCandidatesToShow: (state, action) => {
      state.candidatesToShow = action.payload;
    },
    setYourElections: (state, action) => {
      state.yourElections = action.payload;
    },
  },
});

export const {
  setElection,
  setPublicElection,
  updateElectionField,
  addCandidate,
  removeCandidate,
  resetElection,
  setShowElection,
  setCandidatesToShow,
  setYourElections,
} = electionSlice.actions;

export default electionSlice.reducer;
