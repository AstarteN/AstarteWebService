import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { Insult } from 'insult';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/generate', async (req, res) => {
  console.log('Request received with the following data:', req.body);

  const name = req.body.name || 'Friend';

  try {
    const insultMessage = Insult();
    const personalizedInsult = `Hey ${name}, ${insultMessage}`;

    const htmlResponse = `
      <h1 style="color: red;">Insult for ${name}</h1>
      <p style="font-size: 18px;">${personalizedInsult}</p>
      <a href="/" style="color: red; text-decoration: none; font-size: 16px;">Go back</a>
    `;

    res.send(htmlResponse);
  } catch (error) {
    console.error('Error getting insult:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/generate', (req, res) => {
  res.redirect(303, '/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
