const express = require('express');
const app = express();
const port = 3000;

// JSON 본문을 처리하기 위한 미들웨어 설정
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// POST 요청을 처리하는 라우터 정의
app.post('/blind', (req, res) => {
  // 요청 본문 데이터
  const requestData = req.body;

  console.log('Received data:', requestData);

  // 클라이언트에 응답 보내기
  res.status(200).json({
    message: 'Data received successfully',
    data: requestData
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});