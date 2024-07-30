import clipboardy from 'clipboardy';
import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: {
    origin: '*',
  },
});

const stack = []; // 스택 초기화

io.on('connection', (socket) => {
  console.log('New client connected');

  // 스택에 메시지 추가 (push)
  socket.on('push', (data) => {
    console.log('Received push event with message:', data);
    clipboardy.writeSync(data);
    stack.push(data); // 스택에 데이터 추가
    io.emit('stack', stack); // 모든 클라이언트에게 스택 상태 전송
  });

  // 스택에서 메시지 제거 (pop)
  socket.on('pop', () => {
    console.log('Received pop event');
    if (stack.length > 0) {
      const message = stack.pop(); // 스택에서 데이터 제거
      io.emit('stack', stack); // 모든 클라이언트에게 스택 상태 전송
      socket.emit('popped', message); // 요청한 클라이언트에게 팝된 메시지 전송
    } else {
      socket.emit('error', 'Stack is empty'); // 스택이 비어 있을 때 에러 메시지 전송
    }
  });

  // 연결 종료 처리
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

console.log('Socket.IO server running at http://localhost:3000/');