/*
=========================================
 Percent Balloon v2
 game.js
 完成版
=========================================
*/

/*=========================================
    Game
=========================================*/

const Game = {

    score: 0,

    totalQuestions: 0,

    currentQuestion: 0

};

/*=========================================
    Reset Game
=========================================*/

function resetGame() {

    Game.score = 0;

    Game.currentQuestion = 0;

    Game.totalQuestions = 0;

}

/*=========================================
    Set Question Count
=========================================*/

function setQuestionCount(count) {

    Game.totalQuestions = count;

}

/*=========================================
    Next Question
=========================================*/

function nextGameQuestion() {

    Game.currentQuestion++;

}

/*=========================================
    Get Progress
=========================================*/

function getGameProgress() {

    if (Game.totalQuestions === 0) {

        return 0;

    }

    return (

        Game.currentQuestion /

        Game.totalQuestions

    );

}

/*=========================================
    Score
=========================================*/

function calculateScore(diff) {

    diff = Math.abs(diff);

    if (diff === 0) return 100;

    if (diff <= 2) return 90;

    if (diff <= 5) return 80;

    if (diff <= 10) return 70;

    if (diff <= 20) return 50;

    if (diff <= 30) return 30;

    return 10;

}

/*=========================================
    Add Score
=========================================*/

function addGameScore(diff) {

    Game.score +=

        calculateScore(diff);

}

/*=========================================
    Get Score
=========================================*/

function getGameScore() {

    return Game.score;

}

/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        resetGame();

    }

);

/*=========================================
    Export
=========================================*/

window.GameManager = {

    resetGame,

    setQuestionCount,

    nextGameQuestion,

    getGameProgress,

    calculateScore,

    addGameScore,

    getGameScore

};

