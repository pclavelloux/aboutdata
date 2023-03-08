import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { promisify } from 'util';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const listLineItemsAsync = promisify(stripe.checkout.sessions.listLineItems.bind(stripe.checkout.sessions));


const updateFeatureDuration = async (lineItems: Stripe.ApiList<Stripe.LineItem>, asset_id: string) => {
  const now = new Date();
  const isoDate = now.toISOString();

  const { error: error_duration } = await supabase.from('Resources').update({
    featured_duration: lineItems.data[0].quantity,
    featured_start_date: isoDate,
  }).eq('id', asset_id);

  if (error_duration) {
    console.log(`Error update resources webhook featured ${error_duration}`);
  }

};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  /* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
     apiVersion: '2022-11-15',
   });
 */

  const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      const body = await buffer(req);
      event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log('✅ Success stripe webhook:', event.id);

    if (event.type === 'payment_intent.succeeded') {
      const stripeObject = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === 'checkout.session.completed') {

      const stripeObject = event.data.object as Stripe.Checkout.Session;

      if (stripeObject.metadata) {

        const asset_id = stripeObject.metadata.assetId

        const { error } = await supabase.from('Resources').update({
          featured: true,
        }).eq('id', asset_id);

        if (error) {
          console.log(`Error update resources webhook featured ${error}`);
        }



        listLineItemsAsync({ sessionId: stripeObject.id, limit: 1 })
          .then(async (lineItems: Stripe.ApiList<Stripe.LineItem>) => {
            try {
              await updateFeatureDuration(lineItems, asset_id);
            } catch (err: any) {
              return res.status(400).send(`Update feature duration error: ${err.message}`);
            }
          })
          .catch((err: Error) => {
            console.log(`Error retrieving line items: ${err.message}`);
            res.status(400).send(`Error retrieving line items: ${err.message}`);
          });

        /*
        stripe.checkout.sessions.listLineItems(
          stripeObject.id,
          { limit: 1 },
          function (err: Error, lineItems: Stripe.ApiList<Stripe.LineItem>) {
            try {
              updateFeatureDuration(lineItems, asset_id);
              return res.status(200).send('Success');
            } catch (err: any) {
              return res.status(400).send(`Update feature duration error: ${err.message}`);
            }
            return res.status(200).send('Success');

          }
        );*/

      }


    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
};

export default handler;
