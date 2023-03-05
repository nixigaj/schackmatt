import express, { Request, Response, Express } from 'express';
import http from 'http';

const app: Express = express();
app.use(express.static('public'));
let port: number | string = process.env.PORT || 3000;
const args: string[] = process.argv.slice(2);
let path: string = process.argv[2] || 'dist/index.html';

if (args[0] === '--port') {
    port = Number(args[1]);
}

if (args[2] === '--path') {
    path = args[3];
}

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/' + path);
});

http.createServer(app).listen(port, () => {
    console.log(`listening on port: ${port}`);
});


