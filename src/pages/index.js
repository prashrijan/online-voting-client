// pages/index.js

// Home
export { default as Homepage } from './home/Homepage';

// Auth
export { default as Register } from './auth/Register';
export { default as Login } from './auth/Login';
export { default as ForgetPassword } from './auth/ForgetPassword';
export { default as GoogleAuthSuccess } from './auth/GoogleAuthSuccess';
export { default as VerifyAccount } from './auth/VerifyAccount';
export { default as ResetPassword } from './auth/ResetPassword';

// Dashboard
export { default as Dashboard } from './dashboard/Dashboard';

// Election
export { default as CreateElection } from './Election/CreateElection';
export { default as ElectionVoting } from './Election/ElectionVoting';
export { default as ManageElections } from './Election/ManageElections';
export { default as EditElectionPage } from './Election/EditElectionPage';
export { default as ManageCandidates } from './Election/ManageCandidates';
export { default as MyElection } from './Election/MyElection';
export { default as MyVotes } from './Election/MyVotes';

// Help
export { default as HelpCenter } from './helpCenter/HelpCenter';

// User
export { default as ProfileSettings } from './user/ProfileSettings';
export { default as ProfilePage } from './user/ProfilePage';

// Subscription
export { default as Subscriptions } from './subscription/Subscriptions';
export { default as PaymentSuccess } from './subscription/PaymentSucess';

// Results
export { default as ElectionResultList } from './results/ElectionResultsList';
export { default as ElectionResultDetail } from './results/ElectionResultDetail';
