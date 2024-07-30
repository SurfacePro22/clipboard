const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const queue = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  // 큐에 메시지 추가
  socket.on("enqueue", (message) => {
    queue.push(message);
    io.emit("queue", queue); // 큐 업데이트를 모든 클라이언트에 전송
  });

  // 큐에서 메시지 제거
  socket.on("dequeue", () => {
    if (queue.length > 0) {
      const message = queue.shift();
      io.emit("queue", queue); // 큐 업데이트를 모든 클라이언트에 전송
      socket.emit("dequeued", message); // 제거된 메시지를 요청한 클라이언트에 전송
    } else {
      socket.emit("error", "Queue is empty");
    }
  });

  // 클라이언트 연결 해제 시
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

console.log('Socket.IO server running at http://localhost:3000/');