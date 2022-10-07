/*import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    //If stripe promise doesn't yet exist, 
    if(!stripePromise) {
        stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);
    }

    return stripePromise;
}

export default getStripe;*/
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
}

export default getStripe;