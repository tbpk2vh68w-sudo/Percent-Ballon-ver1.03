/*
=========================================
 Percent Balloon v2
 play.js
 完成版 Part1
=========================================
*/

/*=========================================
    Play Data
=========================================*/

const Play = {

    room: null,

    question: null,

    answer: null

};

/*=========================================
    DOM
=========================================*/

const PlayUI = {

    questionTitle:
        document.getElementById("questionTitle"),

    question:
        document.getElementById("question"),

    answerInput:
        document.getElementById("answerInput"),

    submitButton:
        document.getElementById("submitButton"),

    homeButton:
        document.getElementById("homeButton")

};

/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initPlay

);

function initPlay() {

    loadRoom();

    bindEvents();

    showQuestion();

}

/*=========================================
    Load Room
=========================================*/

function loadRoom() {

    const roomId = localStorage.getItem(

        "currentRoomId"

    );

    Play.room = RoomManager.getRoom(

        roomId

    );

    if (!Play.room) {

        alert("ゲームが開始されていません。");

        location.href = "index.html";

        return;

    }

}
/*=========================================
    Get Current Question
=========================================*/

function getCurrentQuestion() {

    if (!Play.room) {

        return null;

    }

    return Play.room.questions[
        Play.room.currentQuestion
    ] || null;

}

/*=========================================
    Show Question
=========================================*/

function showQuestion() {

    const question = getCurrentQuestion();

    if (!question) {

        PlayUI.questionTitle.textContent =
            "ゲーム終了";

        PlayUI.question.textContent =
            "すべての問題が終了しました。";

        PlayUI.submitButton.disabled = true;

        return;

    }

    Play.question = question;

    PlayUI.questionTitle.textContent =
        "問題 " +
        (Play.room.currentQuestion + 1);

    PlayUI.question.textContent =
        question.text;

    PlayUI.answerInput.value = "";

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    PlayUI.submitButton.onclick = function () {

        submitAnswer();

    };

    PlayUI.homeButton.onclick = function () {

        location.href = "index.html";

    };

}

/*=========================================
    Submit Answer
=========================================*/

function submitAnswer() {

    if (!Play.question) {

        return;

    }

    const value = Number(

        PlayUI.answerInput.value

    );

    if (

        isNaN(value) ||

        value < 0 ||

        value > 100

    ) {

        alert("0～100を入力してください。");

        return;

    }

    Play.answer = value;

    PlayUI.submitButton.disabled = true;

    showAnswerMarkerUI(value);

    if (

        typeof startAnimation === "function"

    ) {

        startAnimation(

            Play.question.answer,

            onAnimationFinished

        );

    } else {

        onAnimationFinished();

    }

}

/*=========================================
    Animation Finished
=========================================*/

function onAnimationFinished() {
showCorrectMarkerUI(

    Play.question.answer

);
    const diff = Math.abs(

        Play.answer -

        Play.question.answer

    );
    GameManager.addGameScore(diff);

    const differenceText =

        document.getElementById(

            "differenceText"

        );

    const scoreText =

        document.getElementById(

            "scoreText"

        );

    if (differenceText) {

        differenceText.textContent =

            "差：" + diff + "%";

    }

    if (scoreText) {

        const score = GameManager.calculateScore(diff);

scoreText.textContent =

    "スコア：" +

    score;

    }

    setTimeout(

        nextQuestion,

        2000

    );

}

/*=========================================
    Next Question
=========================================*/

function nextQuestion() {

    Play.room.currentQuestion++;

    if (

        Play.room.currentQuestion >=

        Play.room.questions.length

    ) {

        finishGame();

        return;

    }

    RoomManager.saveRoom(

        Play.room

    );

    Play.question = null;

    Play.answer = null;

    PlayUI.submitButton.disabled = false;

    showQuestion();

}

/*=========================================
    Finish Game
=========================================*/

function finishGame() {

    Play.room.state = "finished";

    RoomManager.saveRoom(

        Play.room

    );

    PlayUI.questionTitle.textContent =

        "ゲーム終了";

   PlayUI.question.textContent =

    "合計スコア：" +

    GameManager.getGameScore();

    PlayUI.submitButton.disabled = true;

}

/*=========================================
    Auto Sync
=========================================*/

function startSync() {

    setInterval(function () {

        const room = RoomManager.getRoom(

            Play.room.id

        );

        if (!room) {

            return;

        }

        Play.room = room;

    }, 1000);

}

/*=========================================
    Extend Initialize
=========================================*/

const _initPlay = initPlay;

initPlay = function () {

    _initPlay();

    startSync();

};