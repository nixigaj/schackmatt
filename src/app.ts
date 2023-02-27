import express, { Request, Response, Express } from 'express';
//import http from 'http';

const app: Express = express();
app.use(express.static('public'));
const port: number | string = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/index.html');
});

//http.createServer(app).listen(port, () => {
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});


