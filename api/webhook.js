export default async function handler(req, res) {
  const method = req.method;

  if (method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === 'instapush2020') {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Verification failed');
    }
  } else if (method === 'POST') {
    const data = req.body;

    const makeWebhookUrl = 'https://hook.us1.make.com/your-webhook-url'; // замени на свой
    await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
