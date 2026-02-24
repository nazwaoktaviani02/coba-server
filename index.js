import express from 'express';

const app = express();

// global middleware
app.use((req, res, next) => {
  res.locals.msg = `Ini adalah halaman:  ${req.path}`;
  next();
});

app.get('/', (req, res) => {
  res.send(res.locals.msg + ' Halooo');
});

app.get('/say/:greeting', (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

// route baru 1: static route
app.get('/about', (req, res) => {
  res.send(res.locals.msg + ' Ini halaman about');
});

// route baru 2: dynamic route
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(res.locals.msg + ` Hello ${name}`);
});

app.listen(3000);