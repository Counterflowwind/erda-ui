import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // namespace: 'erda',
  secure: true,
})
export class EventsGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'events';
    this.socketServer.emit('reply', data);
    return { event, data };
  }

  broadcast(data: unknown) {
    this.socketServer.emit('broadcast', data);
  }

  @WebSocketServer()
  socketServer: Server;
}
