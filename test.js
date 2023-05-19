/*const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'how'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('MySQL 연결 오류:', err);
      return;
    }
    console.log('MySQL 데이터베이스에 연결되었습니다.');
  });
// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 회원 가입 페이지
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// 회원 가입 처리
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // 사용자 정보 생성
  const userData = {
    name,
    email,
    password
  };

  // 파일에 사용자 정보 추가
  fs.appendFile('users.txt', JSON.stringify(userData) + '\n', (err) => {
    if (err) {
      console.error('Error writing user data:', err);
      res.status(500).json({ success: false, message: '회원 가입에 실패했습니다.' });
      return;
    }

    // 회원 가입 성공 응답
    res.json({ success: true, message: '회원 가입이 완료되었습니다.' });
  });
});

// 로그인 페이지
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 로그인 처리
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 사용자 정보 파일에서 읽어오기
  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      res.status(500).json({ success: false, message: '로그인에 실패했습니다.' });
      return;
    }

    // 사용자 정보 확인
    const users = data.split('\n').filter(line => line !== '');
    const foundUser = users.find(user => {
      const userData = JSON.parse(user);
      return userData.email === email && userData.password === password;
    });

    if (foundUser) {
      res.json({ success: true, message: '로그인이 성공적으로 처리되었습니다.' });
    } else {
      res.json({ success: false, message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  });
});
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});
  // 서버 시작
 
// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'how'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('MySQL 연결 오류:', err);
      return;
    }
    console.log('MySQL 데이터베이스에 연결되었습니다.');
  });
// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 회원 가입 페이지
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// 회원 가입 처리
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // 사용자 정보 생성
  const userData = {
    name,
    email,
    password
  };

  // 파일에 사용자 정보 추가
  fs.appendFile('users.txt', JSON.stringify(userData) + '\n', (err) => {
    if (err) {
      console.error('Error writing user data:', err);
      res.status(500).json({ success: false, message: '회원 가입에 실패했습니다.' });
      return;
    }

    // 회원 가입 성공 응답
    res.json({ success: true, message: '회원 가입이 완료되었습니다.' });
  });
});

// 로그인 페이지
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 로그인 처리
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 사용자 정보 파일에서 읽어오기
  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      res.status(500).json({ success: false, message: '로그인에 실패했습니다.' });
      return;
    }

    // 사용자 정보 확인
    const users = data.split('\n').filter(line => line !== '');
    const foundUser = users.find(user => {
      const userData = JSON.parse(user);
      return userData.email === email && userData.password === password;
    });

    if (foundUser) {
      res.json({ success: true, message: '로그인이 성공적으로 처리되었습니다.' });
    } else {
      res.json({ success: false, message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  });
});
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});
  // 서버 시작
 // 도서 검색 기능
app.post('/search', (req, res) => {
    const keyword = req.body.keyword;
  
    // MySQL 쿼리 실행하여 도서 검색
    const query = `SELECT * FROM books WHERE title LIKE '%${keyword}%'`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('도서 검색 오류:', err);
        res.status(500).json({ error: '도서 검색에 실패했습니다.' });
        return;
      }
      res.status(200).json(results);
    });
  });
  app.post('/borrow', (req, res) => {
    const bookId = req.body.bookId;
  
    // Check if the book is available for borrowing
    const availabilityQuery = `SELECT * FROM books WHERE id = ${bookId} AND available = true`;
  
    connection.query(availabilityQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        return;
      }
  
      // If the book is not available, return an error message
      if (results.length === 0) {
        res.status(400).json({ message: '대출할 수 없는 도서입니다.' });
        return;
      }
  
      // Perform the book borrowing operation
      const borrowQuery = `INSERT INTO borrowed_books (book_id, borrower_name, borrowed_date, due_date) VALUES (${bookId}, '대출자 이름', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY))`;
      const updateQuery = `UPDATE books SET available = false WHERE id = ${bookId}`;
  
      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          console.error('Error starting transaction:', transactionError);
          res.status(500).json({ message: '서버 오류가 발생했습니다.' });
          return;
        }
  
        connection.query(borrowQuery, (borrowError, borrowResult) => {
          if (borrowError) {
            console.error('Error executing borrow query:', borrowError);
            connection.rollback(() => {
              res.status(500).json({ message: '서버 오류가 발생했습니다.' });
            });
            return;
          }
  
          connection.query(updateQuery, (updateError, updateResult) => {
            if (updateError) {
              console.error('Error executing update query:', updateError);
              connection.rollback(() => {
                res.status(500).json({ message: '서버 오류가 발생했습니다.' });
              });
              return;
            }
  
            connection.commit((commitError) => {
              if (commitError) {
                console.error('Error committing transaction:', commitError);
                connection.rollback(() => {
                  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
                });
                return;
              }
  
              res.status(200).json({ message: '도서 대출이 완료되었습니다.' });
            });
          });
        });
      });
    });
  });
  app.get('/reservation-list', (req, res) => {
    const reservationQuery = `SELECT books.title AS bookTitle, borrowed_books.borrower_name AS borrowerName FROM borrowed_books JOIN books ON borrowed_books.book_id = books.id WHERE borrowed_books.returned = false`;
  
    connection.query(reservationQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        return;
      }
  
      // Return the reservation list
      res.status(200).json(results);
    });
  });
  app.post('/return', (req, res) => {
    const bookId = req.body.bookId;
  
    // Check if the book is currently borrowed
    const borrowedQuery = `SELECT * FROM borrowed_books WHERE book_id = ${bookId} AND returned = false`;
  
    connection.query(borrowedQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        return;
      }
  
      // If the book is not currently borrowed, return an error message
      if (results.length === 0) {
        res.status(400).json({ success: false, message: '반납할 수 없는 도서입니다.' });
        return;
      }
  
      // Perform the book return operation
      const returnQuery = `UPDATE borrowed_books SET returned = true WHERE book_id = ${bookId}`;
  
      connection.query(returnQuery, (error, result) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ message: '서버 오류가 발생했습니다.' });
          return;
        }
  
        // Update the book availability to true
        const updateAvailabilityQuery = `UPDATE books SET available = true WHERE id = ${bookId}`;
  
        connection.query(updateAvailabilityQuery, (error, result) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
            return;
          }
  
          res.json({ success: true, message: '도서 반납이 완료되었습니다.' });
        });
      });
    });
  });
// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});