import http from 'node:http';

const port = Number(process.env.PORT ?? 3000);
http.createServer((req, res) => res.end('ok')).listen(port, () => {
  console.log(`billing-api listening on ${port}`);
});
