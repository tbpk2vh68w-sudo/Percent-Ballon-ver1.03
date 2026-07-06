/*=========================================
 Percent Balloon v2
 play.js
 Part1
初期化・ルーム接続
=========================================*/

/*=========================================
    Play State
=========================================*/

let Play = {

    room: null,

    question: null,

    initialized: false

};

/*=========================================
    Load Room
=========================================*/

function loadPlayRoom() {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    const roomId = prompt("ルームIDを入力してください");

    if (!rooms[roomId]) {

        alert("ルームが見つかりません");

        location.href = "index.html";

        return;

    }

    Play.room = rooms[roomId];

    localStorage.setItem("currentRoomId", roomId);

}

/*=========================================
    Initialize Play
=========================================*/

function initPlay() {

    loadPlayRoom();

    if (!Play.room) return;

    Play.question = null;

    Play.initialized = true;

    initializeUI();

    setWaitingUI();

}
/*
=========================================
 Percent Balloon v2
 play.js
 Part2
 ゲーム開始・問題表示・入力制御
=========================================
*/

/*=========================================
    Get Current Question
=========================================*/

function getCurrentQuestion() {

    if (!Play.room) return null;

    const index = Play.room.currentQuestion || 0;

    return Play.room.questions[index] || null;

}

/*=========================================
    Show Question
=========================================*/

function showPlayQuestion() {

    const q = getCurrentQuestion();

    if (!q) return;

    Play.question = q;

    showQuestionUI(q);

    setSubmitButtonState(true);

}

/*=========================================
    Start Game Flow
=========================================*/

function startPlayGame() {

    if (!Play.room) return;

    Play.room.state = "running";

    savePlayRoom();

    showPlayQuestion();

    resetUI();

}

/*=========================================
    Reset Play UI
=========================================*/

function resetPlayState() {

    resetUI();

    setAnimationValue(0);

    showCurrentMarkerUI(0);

    showAnswerMarkerUI(0);

}

/*=========================================
    Submit Answer Handler
=========================================*/

function onPlaySubmit(value) {

    if (!Play.question) return;

    Play.userAnswer = value;

    showAnswerMarkerUI(value);

    startAnimation(Play.question.answer);

}
/*
=========================================
 Percent Balloon v2
 play.js
 Part3
 回答処理・判定・スコア計算
=========================================
*/

/*=========================================
    Calculate Difference
=========================================*/

function calculateDifferencePlay() {

    if (!Play.question) return 0;

    const diff = Math.abs(

        Play.userAnswer - Play.question.answer

    );

    return diff;

}

/*=========================================
    Add Score
=========================================*/

function addScorePlay() {

    const diff = calculateDifferencePlay();

    let point = 0;

    if (diff <= 1) point = 100;

    else if (diff <= 5) point = 80;

    else if (diff <= 10) point = 50;

    else if (diff <= 20) point = 30;

    else point = Math.max(0, 100 - diff);

    Play.score = (Play.score || 0) + point;

    return point;

}

/*=========================================
    Show Result
=========================================*/

function showResultPlay() {

    const diff = calculateDifferencePlay();

    const point = addScorePlay();

    showDifferenceUI(diff);

    showScoreUI(Play.score);

    flashUI(document.getElementById("differenceText"));

}

/*=========================================
    Validate Answer
=========================================*/

function validateAnswer(value) {

    return !isNaN(value) && value >= 0 && value <= 100;

}

/*=========================================
    Submit Flow Wrapper
=========================================*/

function handleSubmitAnswer(value) {

    if (!validateAnswer(value)) {

        alert("0〜100の数字を入力してください");

        return;

    }

    Play.userAnswer = value;

    showAnswerMarkerUI(value);

    startAnimation(Play.question.answer);

}
/*
=========================================
 Percent Balloon v2
 play.js
 Part4
 アニメーション連携・停止処理
=========================================
*/

/*=========================================
    Start Animation Wrapper
=========================================*/

function startPlayAnimation() {

    if (!Play.question) return;

    const target = Play.question.answer;

    startAnimation(target);

}

/*=========================================
    Animation Complete Callback
=========================================*/

function onAnimationCompletePlay() {

    showResultPlay();

    setTimeout(() => {

        nextQuestionPlay();

    }, 1200);

}

/*=========================================
    Stop Animation Manually
=========================================*/

function forceStopAnimation() {

    stopAnimation();

    showCurrentMarkerUI(Play.question.answer);

    showAnswerMarkerUI(Play.question.answer);

    showResultPlay();

}

/*=========================================
    Animation Event Hook
=========================================*/

function hookAnimationEvents() {

    window.onAnimationComplete = onAnimationCompletePlay;

}
/*
=========================================
 Percent Balloon v2
 play.js
 Part5
 ループ・終了・最終統合
=========================================
*/

/*=========================================
    Next Question
=========================================*/

function nextQuestionPlay() {

    if (!Play.room) return;

    const next = (Play.room.currentQuestion || 0) + 1;

    if (next >= Play.room.questions.length) {

        endPlayGame();

        return;

    }

    Play.room.currentQuestion = next;

    savePlayRoom();

    resetPlayState();

    showPlayQuestion();

}

/*=========================================
    End Game
=========================================*/

function endPlayGame() {

    Play.room.state = "finished";

    savePlayRoom();

    showGameOverUI({

        score: Play.score || 0,

        average: calculateAverageDiff(),

        rank: getRank(Play.score || 0)

    });

}

/*=========================================
    Calculate Average Difference
=========================================*/

function calculateAverageDiff() {

    if (!Play.room || !Play.room.questions.length) return 0;

    return Math.round(

        (Play.totalDiff || 0) /

        Play.room.questions.length

    );

}

/*=========================================
    Get Rank
=========================================*/

function getRank(score) {

    if (score >= 300) return "S";

    if (score >= 200) return "A";

    if (score >= 120) return "B";

    if (score >= 60) return "C";

    return "D";

}

/*=========================================
    Save Room (Play Side)
=========================================*/

function savePlayRoom() {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    if (!Play.room) return;

    rooms[Play.room.id] = Play.room;

    localStorage.setItem(

        "rooms",

        JSON.stringify(rooms)

    );

}

/*=========================================
    Initialize Play App
=========================================*/

function initPlayApp() {

    initPlay();

    hookAnimationEvents();

    showWaitingUI?.();

}

/*=========================================
    Auto Start
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initPlayApp();

});
