import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';




const updateFeatureDuration = async (lineItems, asset_id) => {
  // console.log(lineItems);
  const now = new Date();
  const isoDate = now.toISOString();


  const { error: error_duration } = await supabase.from("Resources").update({
    featured_duration: lineItems.data[0].quantity,
    featured_start_date: isoDate,
  }).eq("id", asset_id);;


  if (error_duration) {
    console.log(`Error update resources webhook featured ${error_duration}`);
  }

}

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });




  const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET;

  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      const body = await buffer(req);
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success stripe webhook:', event.id);

    // Cast event data to Stripe object
    if (event.type === 'payment_intent.succeeded') {
      const stripeObject: Stripe.PaymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === 'checkout.session.completed') {
      //console.log(event.data.object);
      //console.log(event.data.object.metadata.assetId); // Fabien, pourquoi ça me souligne metadata ? Alors que ça fonctionne

      const asset_id = event.data.object.metadata.assetId

      // Update the db to feature the resource
      const { error } = await supabase.from("Resources").update({
        featured: true,
      }).eq("id", asset_id);;

      if (error) {
        console.log(`Error update resources webhook featured ${error}`);
      }

      //Get the quantity
      const session = event.data.object;

      stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 1 },
        async function (err, lineItems) {
          // Fulfill the purchase...
          try {

            await updateFeatureDuration(lineItems, asset_id)


          } catch (err) {
            return res.status(400).send(`Update feature duration error: ${err.message}`);
          }
        }
      );



    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
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