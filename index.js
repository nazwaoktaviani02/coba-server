import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.locals.msg = `Kau ke sini dulu ${req.path}`;
  next();
});

app.get('/', (req, res) => {
  res.send(res.locals.msg + ' - Helloww');
});

app.get('/say/:greeting', (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

app.listen(3000);
