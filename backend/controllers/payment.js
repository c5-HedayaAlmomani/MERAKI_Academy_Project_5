const stripe = require("stripe")(
  "sk_test_51L7FmeFUovKQAs7ta9idtxq1ZFQ1vpXU8H7LLn8k5UN0x6hWhnkClQxngQm7Y30Yx9SAXCj0BmIFZMqWcShcTSy600aBX4OSIy"
);
const uuid = require("uuid").v4;

const payment = async (req, res) => {
   
    let error;
    let status;
    try {
      const { product, token } = req.body;
   
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });
   
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        {
          idempotency_key,
        }
      );
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
   
    res.json({ error, status });
  }
module.exports = payment;

