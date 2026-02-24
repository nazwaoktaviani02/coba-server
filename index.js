import express from 'express';

const app = express();

// global middleware
app.use((req, res, next) => {
  res.locals.msg = `Ini adalah halaman:`;
  next();
});

app.get('/', (req, res) => {
  res.send(' Halooo');
});

app.get('/say/:greeting', (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

// route baru 1: static route
app.get('/about', (req, res) => {
  res.send(' About Me');
});

// route baru 2: dynamic route
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(res.locals.msg + ` Hello ${name}`);
});

app.get("/secret", (req, res) => {
  res.status(401).send("jam 4 pulang kan ya, Pak?");
});

app.listen(3000);