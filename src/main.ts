'use strict';

import http from 'http';
import {
  IServerConfig,
  Message,
  connection as Socket,
  request as Request,
  server as WebSocketServer
} from 'websocket';

const httpd = http.createServer();

const config: IServerConfig = {
  httpServer           : httpd,
  autoAcceptConnections: false
};

const ws = new WebSocketServer(config);

process.stdout.setEncoding('utf-8');
process.stderr.setEncoding('utf-8');

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;

const connectedSockets: Socket[] = [];

const socketMap = new Map<string, Socket[]>();

ws.on('request', (request: Request) => {
  request.accept();
});

ws.on('connect', (socket: Socket) => {
  if (connectedSockets.includes(socket)) {
    return;
  }

  connectedSockets.push(socket);

  let roomId = '';

  socket.on('message', (message: Message) => {
    if (message.type === 'utf8') {
      roomId = message.utf8Data;
    }

    const sockets = socketMap.get(roomId);

    if (sockets && (sockets.length > 0)) {
      sockets.push(socket);
      socketMap.set(roomId, sockets);
    } else {
      socketMap.set(roomId, [socket]);
    }

    if (!sockets) {
      return;
    }

    sockets.forEach((s: Socket) => {
      if (s === socket) {
        return;
      }

      if (message.type === 'binary') {
        s.send(message.binaryData);
      }
    });
  });

  socket.on('close', () => {
    socket.removeAllListeners('message');
    socket.removeAllListeners('close');

    Object.values(socketMap).forEach((sockets: Socket[]) => {
      const index = sockets.indexOf(socket);

      if (index === -1) {
        return;
      }

      sockets.splice(index, 1);
    });
  });
});

// Start HTTP server and WebSocket server
httpd.listen(port, () => {
  process.stdout.write(`Waiting ... (${port})\n`);
});

// Signal Handler
process.on('SIGINT', () => {
  process.stdout.write(`This process caught signal number 2 (SIGINT). Therefore, (${process.pid}) was terminated.\n`);
  process.exit(0);
});

// Catch Exception
process.on('uncaughtException', (error: Error) => {
  process.stderr.write(`${error.message}\n`);
});
