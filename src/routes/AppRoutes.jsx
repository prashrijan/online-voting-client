import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '@components/layout/DefaultLayout';
import ProtectedLayout from '@components/layout/ProtectedLayout';
import {
  Homepage,
  Register,
  Login,
  ForgetPassword,
  GoogleAuthSuccess,
  VerifyAccount,
  ResetPassword,
  Dashboard,
  CreateElection,
  ElectionVoting,
  ManageElections,
  EditElectionPage,
  ManageCandidates,
  MyElection,
  MyVotes,
  ProfilePage,
  ProfileSettings,
  HelpCenter,
  Subscriptions,
  PaymentSuccess,
  ElectionResultDetail,
  ElectionResultList,
  AboutPage,
  ContactUs,
} from '@pages';

const AppRoutes = () => {
  return (
    <Routes ElectionResultListes>
      {/* public routes */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
      {/* private routes */}
      <Route path="/user" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-election" element={<CreateElection />} />
        <Route path="election-voting/:id" element={<ElectionVoting />} />
        <Route path="manage-elections" element={<ManageElections />} />
        <Route
          path="edit-election/:electionId"
          element={<EditElectionPage />}
        />
        <Route
          path="manage-candidates/:electionId"
          element={<ManageCandidates />}
        />
        <Route path="help-center" element={<HelpCenter />} />
        <Route path="my-elections" element={<MyElection />} />
        <Route path="my-votes" element={<MyVotes />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<ProfileSettings />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="results" element={<ElectionResultList />} />
        <Route path="results/:id" element={<ElectionResultDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
