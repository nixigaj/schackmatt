import * as express from 'express';

const app = express();
app.use(express.static('public'));
import * as http from 'http';
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.get('/', (req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>, res: Response<ResBody, LocalsObj>) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, () => {
    console.log('listening on port: ' + port);
});


