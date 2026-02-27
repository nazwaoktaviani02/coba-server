import express from 'express';
import mongoose from "mongoose";
import noteRouter from './routes/notes.js';
import cors from "cors";



// mongoose.connect(
//   "mongodb://user01:admin123@ac-yn1f84i-shard-00-00.desnfid.mongodb.net:27017,ac-yn1f84i-shard-00-01.desnfid.mongodb.net:27017,ac-yn1f84i-shard-00-02.desnfid.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-yn1f84i-shard-0&authSource=admin&retryWrites=true&w=majority"
// )
// .then(()=>console.log('Connect DB'));

// mongoose.connect('mongodb+srv://user01:admin123@cluster0.desnfid.mongodb.net/?appName=Cluster0')
// .then(()=>console.log('Connect DB'));



mongoose.connect(
  "mongodb+srv://user01:admin123@cluster0.desnfid.mongodb.net/Cluster0?retryWrites=true&w=majority"
)
.then(() => console.log("✅ Connect DB"))
.catch(err => console.log(err));  

const app = express();

app.use(cors({
  origin: "*"
}));

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


app.get('/about', (req, res) => {
  res.send(' About Me');
});


app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(res.locals.msg + ` Hello ${name}`);
});

app.get("/secret", (req, res) => {
  res.status(401).send("Gagal nih");
});

app.listen(3000);

app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    result: 'fail',
    error: err.message,
  });
});

app.use('/notes', noteRouter);

