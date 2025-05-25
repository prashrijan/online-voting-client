export const subscriptionPlans = [
  {
    type: 'Free',
    price: '$0',
    description: 'Perfect for individuals or small teams to try Chunaab.',
    features: ['Create up to 2 elections/month', 'Basic analytics dashboard'],
    cta: 'Get Started Free',
    variant: 'outline-dark',
  },
  {
    type: 'Pro',
    price: '$5',
    description: 'For serious organizers needing full access and control.',
    features: [
      'Unlimited elections',
      'Real-time vote count dashboard',
      'Priority & Email support',
    ],
    cta: 'Buy Pro',
    variant: 'dark',
  },
];

export const subscriptionPlansLoggedIn = [
  {
    type: 'Free',
    description:
      'Get started with our basic features at no cost. Ideal for individuals and small groups.',
    features: ['Create up to 2 elections per day', 'Basic analytics'],
  },
  {
    type: 'Pro',
    description:
      'Unlock advanced features for growing organizations and power users.',
    features: ['Unlimited elections', 'Priority support', 'Email support'],
    price: '$5 one-time payment',
  },
];
