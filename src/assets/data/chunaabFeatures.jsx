import {
  FaVoteYea,
  FaInfinity,
  FaChartBar,
  FaTasks,
  FaQrcode,
  FaShieldAlt,
} from 'react-icons/fa';

export const chunabFeatures = [
  {
    icon: <FaVoteYea size={24} color="#000" />,
    title: 'One Vote Per User',
    desc: 'Each user can vote only once per election — no duplicates allowed.',
  },
  {
    icon: <FaInfinity size={24} color="#000" />,
    title: 'Unlimited Elections',
    desc: 'Premium users can create and manage unlimited elections effortlessly.',
  },
  {
    icon: <FaChartBar size={24} color="#000" />,
    title: 'Real-time Dashboard',
    desc: 'Live vote count visualization and participation analytics in real time.',
  },
  {
    icon: <FaTasks size={24} color="#000" />,
    title: 'Create & Manage Elections',
    desc: 'Easily set up elections, define candidates, and monitor voter activity.',
  },
  {
    icon: <FaQrcode size={24} color="#000" />,
    title: 'Code-based Join',
    desc: 'Participants can join elections with a short event code from any device.',
  },
  {
    icon: <FaShieldAlt size={24} color="#000" />,
    title: 'Secure & Private Voting',
    desc: 'Votes are encrypted and anonymized to ensure full voter privacy and election integrity.',
  },
];
