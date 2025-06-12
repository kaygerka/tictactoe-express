// Because this app is not ran in the browser, we need to use CommonJS (Node.js) syntax.
// For imports, this means using require instead of import.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Psuedo-database.

const user_data = {}; // global object for storing user data.
const game_logs = []; // global array for logging completed games.

// Create, initialize, and run express app.

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

/* HTTP POST RESQUEST HANDLER */
app.post('/signup', (req, res) => {
  /* #1) READS A USERNAME AND PASSWORD */
  const { username, password } = req.body;
  
  /* #2) 409 ERROR MESSAGE */
  if (user_data[username]) {
      return res.status(409).json({ message: 'User already exists' });
  }
  /* #3) SAVES NEW USERS DATA TO user_data */
  user_data[username] = { password };
  /* #4) INFO AND 200 STATUS CODE */
  res.status(200).json({ username });
});
/* ============================================ */

/* ============== LOGIN ======================= */
/* #1 TAKES A USERNAME AND PASSWORD FROM THE REQUEST BODY */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  /* #2) RESPONDS WITH ERROR AND 401 */
  if (!user_data[username] || user_data[username].password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
  }
  /* RESPONDS WITH USER DATA AND 200 */
  res.status(200).json({ username });
});

/* CREATES A LOG-GAME-RESULT HTTP POST REQUEST HANDLER ===== */
app.post('/log-game-result', (req, res) => {
  try {
    /* #1) Takes the score and board state */
    const { score, boardState } = req.body;
    
    /* #2) COPY THE REQUEST BODY OBJECT AND ADD TIME STAMP */
    const gameLog = {
        score,
        boardState,
        timestamp: Date.now()
    };
    
    /* #3_ APPEND THE GAME LOG AND CALL SONSOLE.LOG */
    game_logs.push(gameLog);
    console.log(game_logs);
    /* REPOND 200 = SUCCCESS OR 500 = ERROR */
    res.status(200).send();
  } catch (error) {
    console.error('Error logging game result:', error);
    res.status(500).send('Error logging game result');
}
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});