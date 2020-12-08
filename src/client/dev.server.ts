import express from 'express';
import next from 'next';
const app = next({ dev: true });
const handle = app.getRequestHandler();

// import { createProxyMiddleware } from 'http-proxy-middleware';

app.prepare().then(() => {
  const server = express();

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  // server.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'http://127.0.0.1:8080',
  //     changeOrigin: true,
  //   }),
  // );
  // server.get(
  //   /^\/static\//,
  //   createProxyMiddleware({
  //     target: 'http://127.0.0.1:8080',
  //     changeOrigin: true,
  //   }),
  // );

  server.get('/blog/articles/:id', (req, res) => {
    return app.render(req, res, '/blog/article', { id: req.params.id });
  });

  server.get('/', (req, res) => res.redirect('/blog'));

  server.all('*', (req, res) => {
    handle(req, res);
  });

  server.listen(3001, (): void => {
    console.log('> Ready on http://localhost:3001');
  });
});
