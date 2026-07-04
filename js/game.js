```javascript
/*
=========================================
 Percent Balloon v2
 game.js
 Part1
 ゲーム基本管理
=========================================
*/

/*=========================================
    Game Object
=========================================*/

let Game = {

    state: GameState.WAITING,

    round: 0,

    totalRounds: 0,

    score: 0,

    bestScore: 0,

    userAnswer: null,

    correctAnswer: null,

    difference: null,

    startedAt: null,

    finishedAt: null

};

/*=========================================
    Initialize Game
=========================================*/

function initializeGame() {

    Game.state = GameState.WAITING;

    Game.round = 0;

    Game.totalRounds = hasQuestions()

        ? getQuestionCount()

        : 0;

    Game.score = 0;

    Game.bestScore = 0;

    Game.userAnswer = null;

    Game.correctAnswer = null;

    Game.difference = null;

    Game.startedAt = null;

    Game.finishedAt = null;

}

/*=========================================
    Start Game
=========================================*/

function startGame() {

    if (!hasQuestions()) {

        return false;

    }

    initializeGame();

    Game.state = GameState.QUESTION;

    Game.startedAt = Date.now();

    setRoomState(GameState.QUESTION);

    setCurrentQuestion(0);

    return true;

}

/*=========================================
    End Game
=========================================*/

function endGame() {

    Game.state = GameState.FINISH;

    Game.finishedAt = Date.now();

    setRoomState(GameState.FINISH);

}

/*=========================================
    Set Game State
=========================================*/

function setGameState(state) {

    Game.state = state;

    setRoomState(state);

}

/*=========================================
    Get Game State
=========================================*/

function getGameState() {

    return Game.state;

}

/*=========================================
    Is Running
=========================================*/

function isGameRunning() {

    return (

        Game.state !== GameState.WAITING &&

        Game.state !== GameState.FINISH

    );

}

/*=========================================
    Reset Game
=========================================*/

function resetGame() {

    initializeGame();

    resetRoomGame();

}

/*=========================================
    Get Game Object
=========================================*/

function getGame() {

    return Game;

}
```
```javascript
/*
=========================================
 Percent Balloon v2
 game.js
 Part2
 ラウンド管理
=========================================
*/

/*=========================================
    Get Current Round
=========================================*/

function getCurrentRound() {

    return Game.round;

}

/*=========================================
    Get Total Rounds
=========================================*/

function getTotalRounds() {

    return Game.totalRounds;

}

/*=========================================
    Set Round
=========================================*/

function setRound(round) {

    if (

        round < 0 ||

        round >= Game.totalRounds

    ) {

        return false;

    }

    Game.round = round;

    setCurrentQuestion(round);

    return true;

}

/*=========================================
    Next Round
=========================================*/

function nextRound() {

    if (

        Game.round >= Game.totalRounds - 1

    ) {

        endGame();

        return false;

    }

    Game.round++;

    setCurrentQuestion(Game.round);

    Game.userAnswer = null;

    Game.correctAnswer = null;

    Game.difference = null;

    setGameState(GameState.QUESTION);

    return true;

}

/*=========================================
    Previous Round
=========================================*/

function previousRound() {

    if (Game.round <= 0) {

        return false;

    }

    Game.round--;

    setCurrentQuestion(Game.round);

    Game.userAnswer = null;

    Game.correctAnswer = null;

    Game.difference = null;

    setGameState(GameState.QUESTION);

    return true;

}

/*=========================================
    Restart Current Round
=========================================*/

function restartRound() {

    Game.userAnswer = null;

    Game.correctAnswer = null;

    Game.difference = null;

    setGameState(GameState.QUESTION);

}

/*=========================================
    Is First Round
=========================================*/

function isFirstRound() {

    return Game.round === 0;

}

/*=========================================
    Is Last Round
=========================================*/

function isLastRound() {

    return (

        Game.round >= Game.totalRounds - 1

    );

}

/*=========================================
    Get Current Question
=========================================*/

function getCurrentGameQuestion() {

    return getCurrentQuestion();

}
```
```javascript id="x9m4pb"
/*
=========================================
 Percent Balloon v2
 game.js
 Part3
 回答管理・判定
=========================================
*/

/*=========================================
    Set User Answer
=========================================*/

function setUserAnswer(answer) {

    answer = Number(answer);

    if (

        isNaN(answer) ||

        answer < CONFIG.GAME.MIN_PERCENT ||

        answer > CONFIG.GAME.MAX_PERCENT

    ) {

        return false;

    }

    Game.userAnswer = answer;

    return true;

}

/*=========================================
    Get User Answer
=========================================*/

function getUserAnswer() {

    return Game.userAnswer;

}

/*=========================================
    Set Correct Answer
=========================================*/

function setCorrectAnswer(answer) {

    answer = Number(answer);

    if (

        isNaN(answer)

    ) {

        return false;

    }

    Game.correctAnswer = answer;

    return true;

}

/*=========================================
    Get Correct Answer
=========================================*/

function getCorrectAnswer() {

    return Game.correctAnswer;

}

/*=========================================
    Load Correct Answer
=========================================*/

function loadCorrectAnswer() {

    const question = getCurrentQuestion();

    if (!question) {

        return null;

    }

    Game.correctAnswer = Number(

        question.answer

    );

    return Game.correctAnswer;

}

/*=========================================
    Calculate Difference
=========================================*/

function calculateDifference() {

    if (

        Game.userAnswer === null ||

        Game.correctAnswer === null

    ) {

        return null;

    }

    Game.difference = Math.abs(

        Game.userAnswer -

        Game.correctAnswer

    );

    return Game.difference;

}

/*=========================================
    Get Difference
=========================================*/

function getDifference() {

    return Game.difference;

}

/*=========================================
    Is Perfect
=========================================*/

function isPerfectAnswer() {

    return Game.difference === 0;

}

/*=========================================
    Reset Answer
=========================================*/

function resetAnswer() {

    Game.userAnswer = null;

    Game.correctAnswer = null;

    Game.difference = null;

}
```
```javascript id="n8vz4m"
/*
=========================================
 Percent Balloon v2
 game.js
 Part4
 スコア管理
=========================================
*/

/*=========================================
    Calculate Score
=========================================*/

function calculateScore() {

    if (Game.difference === null) {

        return 0;

    }

    const score = Math.max(

        0,

        CONFIG.GAME.MAX_PERCENT -

        Game.difference

    );

    return score;

}

/*=========================================
    Add Score
=========================================*/

function addScore() {

    const score = calculateScore();

    Game.score += score;

    if (score > Game.bestScore) {

        Game.bestScore = score;

    }

    return score;

}

/*=========================================
    Get Total Score
=========================================*/

function getScore() {

    return Game.score;

}

/*=========================================
    Get Best Score
=========================================*/

function getBestScore() {

    return Game.bestScore;

}

/*=========================================
    Get Average Score
=========================================*/

function getAverageScore() {

    if (Game.round < 0) {

        return 0;

    }

    const played = Game.round + 1;

    return Math.round(

        Game.score / played

    );

}

/*=========================================
    Get Rank
=========================================*/

function getRank() {

    const average = getAverageScore();

    if (average >= 98) return "SS";
    if (average >= 95) return "S";
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";

    return "E";

}

/*=========================================
    Get Result
=========================================*/

function getGameResult() {

    return {

        score: getScore(),

        bestScore: getBestScore(),

        average: getAverageScore(),

        rank: getRank(),

        rounds: Game.totalRounds,

        finished: Game.finishedAt

    };

}

/*=========================================
    Reset Score
=========================================*/

function resetScore() {

    Game.score = 0;

    Game.bestScore = 0;

}
```
```javascript
/*
=========================================
 Percent Balloon v2
 game.js
 Part5
 補助関数・タイマー・初期化
=========================================
*/

/*=========================================
    Timer
=========================================*/

let GameTimer = null;

/*=========================================
    Start Timer
=========================================*/

function startTimer(callback, time) {

    stopTimer();

    GameTimer = setTimeout(() => {

        GameTimer = null;

        if (typeof callback === "function") {

            callback();

        }

    }, time);

}

/*=========================================
    Stop Timer
=========================================*/

function stopTimer() {

    if (GameTimer !== null) {

        clearTimeout(GameTimer);

        GameTimer = null;

    }

}

/*=========================================
    Is Timer Running
=========================================*/

function isTimerRunning() {

    return GameTimer !== null;

}

/*=========================================
    Get Elapsed Time
=========================================*/

function getElapsedTime() {

    if (!Game.startedAt) {

        return 0;

    }

    const endTime =

        Game.finishedAt ||

        Date.now();

    return endTime - Game.startedAt;

}

/*=========================================
    Reset Game Data
=========================================*/

function clearGame() {

    stopTimer();

    initializeGame();

    resetRoomGame();

}

/*=========================================
    Get Progress
=========================================*/

function getProgress() {

    if (Game.totalRounds === 0) {

        return 0;

    }

    return Math.round(

        ((Game.round + 1)

        /

        Game.totalRounds)

        * 100

    );

}

/*=========================================
    Is Finished
=========================================*/

function isGameFinished() {

    return (

        Game.state ===

        GameState.FINISH

    );

}

/*=========================================
    Save Game
=========================================*/

function saveGame() {

    if (!Room) return;

    saveRoom();

}

/*=========================================
    Load Game
=========================================*/

function loadGame() {

    if (!Room) {

        return false;

    }

    Game.totalRounds =

        getQuestionCount();

    Game.round =

        getCurrentQuestionIndex();

    return true;

}

/*=========================================
    Initialize
=========================================*/

initializeGame();
```
