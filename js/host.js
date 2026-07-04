/*
=========================================
 Percent Balloon v2
 host.js
 Part1
 初期化・DOM・ルーム作成
=========================================
*/

/*=========================================
    DOM
=========================================*/

const HostUI = {

    roomId: document.getElementById("roomId"),

    questionInput: document.getElementById("questionInput"),

    answerInput: document.getElementById("answerInput"),

    questionList: document.getElementById("questionList"),

    addButton: document.getElementById("addQuestionButton"),

    saveButton: document.getElementById("saveButton"),

    startButton: document.getElementById("startButton"),

    homeButton: document.getElementById("homeButton")

};

/*=========================================
    Room
=========================================*/

let HostRoom = null;

/*=========================================
    Generate Room ID
=========================================*/

function generateRoomId() {

    return Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

}

/*=========================================
    Create Room
=========================================*/

function createRoom() {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    let id;

    do {

        id = generateRoomId();

    } while (rooms[id]);

    HostRoom = {

        id: id,

        questions: [],

        currentQuestion: 0,

        state: "waiting"

    };

    rooms[id] = HostRoom;

    localStorage.setItem(

        "rooms",

        JSON.stringify(rooms)

    );

}

/*=========================================
    Save Room
=========================================*/

function saveHostRoom() {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    rooms[HostRoom.id] = HostRoom;

    localStorage.setItem(

        "rooms",

        JSON.stringify(rooms)

    );

}

/*=========================================
    Initialize
=========================================*/

function initHost() {

    createRoom();

    HostUI.roomId.textContent = HostRoom.id;

}


/*
=========================================
 Percent Balloon v2
 host.js
 Part2
 問題追加・一覧表示
=========================================
*/

/*=========================================
    Validate
=========================================*/

function validateQuestion(text, answer) {

    if (text.trim() === "") return false;

    if (isNaN(answer)) return false;

    if (answer < 0 || answer > 100) return false;

    return true;

}

/*=========================================
    Render Question List
=========================================*/

function renderQuestionList() {

    HostUI.questionList.innerHTML = "";

    HostRoom.questions.forEach((q, i) => {

        const div = document.createElement("div");

        div.className = "hostQuestion";

        div.textContent =
            (i + 1) +
            ". " +
            q.text +
            " (" +
            q.answer +
            "%)";

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "削除";

        deleteButton.onclick = function () {

            HostRoom.questions.splice(i, 1);

            saveHostRoom();

            renderQuestionList();

        };

        div.appendChild(deleteButton);

        HostUI.questionList.appendChild(div);

    });

}

/*=========================================
    Add Question
=========================================*/

function addQuestion() {

    const text = HostUI.questionInput.value;

    const answer = Number(

        HostUI.answerInput.value

    );

    if (!validateQuestion(text, answer)) {

        alert("問題文と0〜100の答えを入力してください。");

        return;

    }

    HostRoom.questions.push({

        text: text.trim(),

        answer: answer

    });

    saveHostRoom();

    renderQuestionList();

    HostUI.questionInput.value = "";

    HostUI.answerInput.value = "";

}



/*
=========================================
 Percent Balloon v2
 host.js
 Part3
 ボタンイベント・ゲーム開始・初期化
=========================================
*/

/*=========================================
    Start Game
=========================================*/

function startGame() {

    if (HostRoom.questions.length === 0) {

        alert("問題を1問以上追加してください。");

        return;

    }

    HostRoom.currentQuestion = 0;

    HostRoom.state = "running";

    saveHostRoom();

    localStorage.setItem(

        "currentRoomId",

        HostRoom.id

    );

    location.href = "play.html";

}

/*=========================================
    Save Button
=========================================*/

function saveRoom() {

    saveHostRoom();

    alert("保存しました。");

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    HostUI.addButton.onclick = addQuestion;

    HostUI.saveButton.onclick = saveRoom;

    HostUI.startButton.onclick = startGame;

    HostUI.homeButton.onclick = function () {

        location.href = "index.html";

    };

}

/*=========================================
    Initialize App
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        initHost();

        bindEvents();

        renderQuestionList();

    }

);


