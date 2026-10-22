import express from 'express';
import { findOrder } from './repo.js';

export const app = express();

app.get('/orders/:id', async (req, res) => {
  const order = await findOrder(req.params.id); // rejects for unknown ids -> unhandled rejection
  res.json(order);
});
