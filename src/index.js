import {
  createTransport
} from 'nodemailer'
import { readFileSync } from 'fs';
import express from 'express';

let cred = JSON.parse(readFileSync('/var/cred/foodicred').toString());

const appPort = 3000;
const app = express();
const transport = createTransport({
  service: 'gmail',
  tls: true,
  auth: {
    pass: cred.pass,
    user: cred.user,
  }
})

app.listen(appPort, () => {
  console.log("Listening on port :" + appPort)
})

function validateApiKey(req) {
  let { query } = req;
  let { key } = query;

  if (key != cred.apiKey) {
    return false
  }

  return true
}

app.use(express.json());

app.post('/mail', (req, res) => {
  if (!validateApiKey(req)) {
    return res.sendStatus(401)
  }

  let { to, subject, message } = req.body || {};

  if (!to || !subject || !message) {
    return res.sendStatus(400);
  }

  transport.sendMail({
    from: cred.user,
    text: message,
    subject,
    to
  }, e => {
    if (e) {
      console.log(e);
      res.sendStatus(500);
    } else {
      res.sendStatus(200)
    }
  })
})