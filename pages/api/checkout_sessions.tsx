import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log("Checkout ")
        //console.log(req.body)
        const resourceId = req.body.asset_id
        //console.log(resourceId)
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        const lineItems = [
            {
                price: req.body.price_id,
                adjustable_quantity: { // Let the user adjust the quantity
                    enabled: true,
                    maximum: 12,
                    minimum: 1,
                },
                quantity: 1, // Quantity by default
            },
        ];

        try {
            console.log("fdfdd")
            const session = await stripe.checkout.sessions.create({
                metadata: {
                    "assetId": resourceId,
                },
                mode: "payment",
                line_items: lineItems,
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}`,
                automatic_tax: { enabled: true },
            });

            res.send({
                checkout_session_id: session.id,
            });
        }
        catch (err: any) {
            console.log("Error: ", err.message);
            res.status(err.statusCode || 500).json(err.message);
        }

    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
export default handler;