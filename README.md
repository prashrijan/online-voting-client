# Chunaab Client

## Description

Chunaab is a platform for you to host voting events. This project aims to make hosting voting and elections super-easy, with real time updates and role based access. Users and Guests can quickly join the voting event with an event code and vote for their best candidate.

## Features

- **One Vote Per User:** Each user can vote only once per election — no duplicates allowed.
- **Unlimited Elections:** Premium users can create and manage unlimited elections effortlessly.
- **Real-time Dashboard:** Live vote count visualization and participation analytics in real time.
- **Create & Manage Elections:** Easily set up elections, define candidates, and monitor voter activity.
- **Code-based Join:** Participants can join elections with a short event code from any device.
- **Secure & Private Voting:** Votes are encrypted and anonymized to ensure full voter privacy and election integrity.
- **AI Chatbot Assistance:** Provides support and answers common questions.

## Technologies Used

- **Frontend Framework:** React
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **UI Library:** React Bootstrap and Bootstrap
- **HTTP Client:** Axios
- **Form Validation:** Yup
- **Charting:** Chart.js and React-Chartjs-2
- **PDF Generation:** jsPDF and jspdf-autotable
- **Date Management:** Day.js

## Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-repo/chunaab-client.git](https://github.com/your-repo/chunaab-client.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd chunaab-client
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the development server:
    ```bash
    npm start
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the development server using Vite.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## Project Structure (Detailed)

.
├── public/ # Static assets (images, favicon, index.html)
│ ├── chunaabFavicon.svg # Favicon for the application
│ └── images/ # Contains various images used in the app
│ ├── Chunaab.png # Default image for elections
│ ├── donut.png # Default profile image
│ └── hero.avif # Hero section background image
├── src/ # Main application source code
│ ├── App.css # Global CSS for the main App component
│ ├── App.jsx # Main React application component
│ ├── assets/ # Application assets (data, form configs, logo)
│ │ ├── data/
│ │ │ ├── chunaabFeatures.jsx # Data for Chunaab features
│ │ │ ├── subscriptionPlan.js # Subscription plan details
│ │ │ └── testimonials.js # Testimonials data
│ │ ├── form/
│ │ │ ├── dummyCardData.js # Dummy data for cards
│ │ │ └── formFields.js # Form field definitions
│ │ └── logo/
│ │ └── chunaab25.svg # Chunaab logo
│ ├── components/ # Reusable React components
│ │ ├── Footer/
│ │ │ ├── Footer.jsx # Footer component
│ │ │ └── FooterStyles.css # Styling for Footer
│ │ ├── Header/
│ │ │ ├── Header.jsx # Header/Navbar component
│ │ │ └── styles/Header.styles.css # Styling for Header
│ │ ├── auth/
│ │ │ └── ProtectedRoute.jsx # Component for protected routes
│ │ ├── chatbot/
│ │ │ └── Chatbot.jsx # AI Chatbot component
│ │ ├── chart/
│ │ │ └── LiveVoteChart.jsx # Live vote chart component
│ │ ├── dashboard/
│ │ │ └── Hero.jsx # Hero section for dashboard
│ │ ├── elections/
│ │ │ ├── CandidateCard.jsx # Card component for displaying candidates
│ │ │ ├── ElectionCard.jsx # Card component for displaying elections
│ │ │ └── styles/
│ │ │ ├── CandidateCard.styles.css # Styling for CandidateCard
│ │ │ └── ElectionCard.styles.css # Styling for ElectionCard
│ │ ├── forms/
│ │ │ ├── AddCandidateForm.jsx # Form to add candidates to an election
│ │ │ ├── CreateElectionForm.jsx# Form for creating election details
│ │ │ ├── LaunchElectionForm.jsx# Form for reviewing and launching an election
│ │ │ ├── LoginForm.jsx # Login form
│ │ │ ├── RegisterForm.jsx # Registration form
│ │ │ ├── SelectCandidateForm.jsx # Form to select candidates
│ │ │ └── styles/CreateElectionForm.styles.css # Styling for CreateElectionForm
│ │ ├── home/
│ │ │ ├── FeatureSection.jsx # Home page feature section
│ │ │ ├── Hero.jsx # Home page hero section
│ │ │ ├── Subscriptions.jsx # Home page subscriptions section
│ │ │ ├── Testimonial.jsx # Home page testimonials section
│ │ │ └── styles/
│ │ │ ├── Hero.styles.css # Styling for Home Hero
│ │ │ └── Subscriptions.styles.css # Styling for Home Subscriptions
│ │ ├── layout/
│ │ │ ├── DefaultLayout.jsx # Layout for public routes
│ │ │ └── ProtectedLayout.jsx # Layout for authenticated routes
│ │ ├── loader/
│ │ │ └── Loader.jsx # Loading spinner component
│ │ ├── others/
│ │ │ ├── GoBackButton.jsx # Back button component
│ │ │ ├── Logo.jsx # Logo component
│ │ │ └── styles/Logo.styles.css# Styling for Logo
│ │ └── sidebar/
│ │ ├── Sidebar.jsx # Sidebar navigation for authenticated users
│ │ └── styles/Sidebar.styles.css # Styling for Sidebar
│ ├── conf/ # Configuration files
│ │ └── conf.js # Environment configurations (e.g., API base URLs)
│ ├── features/ # Redux slices, actions, and APIs for features
│ │ ├── chatbot/
│ │ │ └── chatbotApi.js # API calls for chatbot
│ │ ├── election/
│ │ │ ├── elecitonSlice.js # Redux slice for election state
│ │ │ ├── electionAction.js # Redux actions for elections
│ │ │ └── electionApi.js # API calls for elections
│ │ └── user/
│ │ ├── userAction.js # Redux actions for user data
│ │ ├── userApi.js # API calls for user data
│ │ └── userSlice.js # Redux slice for user state
│ ├── hooks/ # Custom React hooks
│ │ └── useForm.js # Hook for form handling
│ ├── index.css # Global CSS styles
│ ├── main.jsx # Entry point for the React application
│ ├── pages/ # Defines different views/screens of the application
│ │ ├── Election/
│ │ │ ├── CreateElection.jsx # Page for creating a new election
│ │ │ ├── EditElectionPage.jsx # Page for editing an existing election
│ │ │ ├── ElectionVoting.jsx # Page for casting votes in an election
│ │ │ ├── LiveElections.jsx # Page displaying live elections
│ │ │ ├── ManageCandidates.jsx # Page for managing candidates in an election
│ │ │ ├── ManageElections.jsx # Page for managing user's elections
│ │ │ ├── MyElection.jsx # Page displaying user's created elections
│ │ │ ├── MyVotes.jsx # Page displaying elections user has voted in
│ │ │ ├── UpcomingElections.jsx # Page displaying upcoming elections
│ │ │ └── styles/ManageElections.styles.css # Styling for ManageElections
│ │ ├── auth/
│ │ │ ├── ForgetPassword.jsx # Forget password page
│ │ │ ├── GoogleAuthSuccess.jsx # Page for Google authentication success
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Register.jsx # Registration page
│ │ │ ├── ResetPassword.jsx # Reset password page
│ │ │ └── VerifyAccount.jsx # Email verification page
│ │ ├── dashboard/
│ │ │ └── Dashboard.jsx # User dashboard page
│ │ ├── helpCenter/
│ │ │ └── HelpCenter.jsx # Help center/contact form page
│ │ ├── home/
│ │ │ ├── AboutPage.jsx # About Us page
│ │ │ ├── ContactUs.jsx # Contact Us page
│ │ │ ├── Homepage.jsx # Main landing page
│ │ │ └── styles/AboutPage.styles.css # Styling for AboutPage
│ │ ├── results/
│ │ │ ├── ElectionResultDetail.jsx # Page showing detailed election results
│ │ │ └── ElectionResultsList.jsx # Page listing finished election results
│ │ ├── subscription/
│ │ │ ├── PaymentSucess.jsx # Payment success page
│ │ │ ├── Subscriptions.jsx # Subscription plans page
│ │ │ └── styles/Subscriptions.styles.css # Styling for Subscriptions
│ │ └── user/
│ │ ├── ProfilePage.jsx # User profile display page
│ │ └── ProfileSettings.jsx # User profile edit page
│ │ └── index.js # Exports for all pages
│ ├── routes/
│ │ └── AppRoutes.jsx # Defines all application routes
│ ├── services/ # API interaction logic
│ │ ├── apiProcessor.js # Centralized API request handler
│ │ ├── authApi.js # Authentication-related API calls
│ │ ├── paymentApi.js # Payment-related API calls
│ │ ├── userApi.js # User-related API calls
│ │ └── voteApi.js # Voting-related API calls
│ ├── store/ # Redux store setup
│ │ └── store.js # Redux store configuration
│ ├── utils/ # Utility functions
│ │ ├── date.js # Date formatting utilities
│ │ ├── getRemainingTime.js # Function to calculate remaining time for elections
│ │ └── time.js # Time formatting utilities
│ └── validation/ # Yup validation schemas
│ ├── EditElectionValidation.js # Validation for editing elections
│ ├── LaunchElectionValidation.js # Validation for launching elections
│ ├── LoginValidation.js # Validation for login form
│ ├── RegisterValidation.js # Validation for registration form
│ └── ResetPasswordValidation.js # Validation for reset password form
├── .eslintrc.js # ESLint configuration file
├── package.json # Project dependencies and scripts
├── package-lock.json # Exact dependency tree
├── README.md # Project README
├── vercel.json # Vercel deployment configuration
└── vite.config.js # Vite build configuration

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3.  Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4.  Push to your branch:
    ```bash
    git push origin feature-name
    ```
5.  Open a pull request.

This is a test from pawan.
hello
