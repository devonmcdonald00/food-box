const express = require('express')
var cors = require('cors');
const stripe = require('stripe')('sk_test_51HeXZCBHhe5b3zt2K8Gj4O6ovLEpUirXZdZQEmJnUdhOkzEE9mEphrFLG1wDFbKSEij4C02abzttrCJw4le4JQVB00PiYSc8MR');

const app = express()
const port = 3001

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/charge', async (req, res) => {
  console.log(req.body);
  const charge = await stripe.charges.create({
    amount: req.body.total,
    currency: 'usd',
    description: 'Foodbox Delivery',
    source: req.body.token,
  });
  res.send(charge);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})