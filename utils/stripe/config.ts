import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    // @ts-ignore
    apiVersion: null,
    appInfo: {
      name: 'Pup Erase App',
      version: '1.0.0',
      url: 'https://github.com/puperase/pup-erase-app'
    }
  }
)
