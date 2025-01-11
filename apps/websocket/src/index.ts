import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

const wss = new WebSocketServer({ port: 8080 });
const secretKey = "mysecretkey";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  const url = request.url;

  if (!url) return;

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token');
  if (!token) {
    ws.close();
    return;
  }
  const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
  if (!decodedToken) {
    ws.close();
    return;
  }

  console.log(`User connected: ${decodedToken.userId}`);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});