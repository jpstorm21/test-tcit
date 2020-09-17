import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import postRoutes from './routes/post.routes';

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes API
app.use('/api/posts', postRoutes);

app.use('/', (req, res) => {
    res.send('hola desde express');
});

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});