/*
=========================================
 Percent Balloon v2
 host_editor.js
 完成版 Part1
=========================================
*/

/*=========================================
    DOM
=========================================*/

const EditorUI = {

    roomName:
        document.getElementById("roomName"),

    questionInput:
        document.getElementById("questionInput"),

    answerInput:
        document.getElementById("answerInput"),

    addButton:
        document.getElementById("addQuestionButton"),

    questionList:
        document.getElementById("questionList"),

    saveButton:
        document.getElementById("saveButton"),

    startButton:
        document.getElementById("startButton"),

    homeButton:
        document.getElementById("homeButton")

};

/*=========================================
    Current Room
=========================================*/

let CurrentRoom = null;

/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initEditor

);

function initEditor() {

    loadRoom();

    renderRoomInfo();

    renderQuestionList();

    bindEvents();

}

/*=========================================
    Load Room
=========================================*/

function loadRoom() {

    const roomId = localStorage.getItem(

        "editingRoom"

    );

    CurrentRoom = RoomManager.getRoom(

        roomId

    );

    if (!CurrentRoom) {

        alert("ルームが見つかりません。");

        location.href = "host.html";

        return;

    }

}

/*=========================================
    Render Room
=========================================*/

function renderRoomInfo() {

    EditorUI.roomName.textContent =

        CurrentRoom.name;

}

/*=========================================
    Render Question List
=========================================*/

function renderQuestionList() {

    EditorUI.questionList.innerHTML = "";

    if (CurrentRoom.questions.length === 0) {

        const p = document.createElement("p");

        p.textContent = "問題がありません。";

        EditorUI.questionList.appendChild(p);

        return;

    }

    CurrentRoom.questions.forEach(function (q, index) {

        const card = document.createElement("div");

        card.className = "questionCard";

        const text = document.createElement("span");

        text.textContent =
            (index + 1) +
            ". " +
            q.text +
            "（" +
            q.answer +
            "%）";

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "削除";

        deleteButton.onclick = function () {

            if (confirm("この問題を削除しますか？")) {

                CurrentRoom.questions.splice(index, 1);

                RoomManager.saveRoom(CurrentRoom);

                renderQuestionList();

            }

        };

        card.appendChild(text);

        card.appendChild(deleteButton);

        EditorUI.questionList.appendChild(card);

    });

}

/*=========================================
    Add Question
=========================================*/

function addQuestion() {

    const text =

        EditorUI.questionInput.value.trim();

    const answer = Number(

        EditorUI.answerInput.value

    );

    if (

        !RoomManager.validateQuestion(

            text,

            answer

        )

    ) {

        alert("問題文と答えを正しく入力してください。");

        return;

    }

    CurrentRoom.questions.push({

        id: Date.now().toString(),

        text: text,

        answer: answer

    });

    RoomManager.saveRoom(CurrentRoom);

    EditorUI.questionInput.value = "";

    EditorUI.answerInput.value = "";

    renderQuestionList();

}

/*=========================================
    Save Room
=========================================*/

function saveRoom() {

    RoomManager.saveRoom(CurrentRoom);

    alert("保存しました。");

}

/*=========================================
    Start Game
=========================================*/

function startGame() {

    if (CurrentRoom.questions.length === 0) {

        alert("問題を1問以上追加してください。");

        return;

    }

    RoomManager.startGame(CurrentRoom.id);

    location.href = "play.html";

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    EditorUI.addButton.onclick = addQuestion;

    EditorUI.saveButton.onclick = saveRoom;

    EditorUI.startButton.onclick = startGame;

    EditorUI.homeButton.onclick = function () {

        RoomManager.saveRoom(CurrentRoom);

        location.href = "host.html";

    };

}

/*=========================================
    Refresh
=========================================*/

function refreshEditor() {

    CurrentRoom = RoomManager.getRoom(

        CurrentRoom.id

    );

    if (!CurrentRoom) {

        alert("ルームが削除されました。");

        location.href = "host.html";

        return;

    }

    renderRoomInfo();

    renderQuestionList();

}

/*=========================================
    Auto Refresh
=========================================*/

function startAutoRefresh() {

    setInterval(function () {

        refreshEditor();

    }, 1000);

}

/*=========================================
    Initialize
=========================================*/

const _initEditor = initEditor;

initEditor = function () {

    _initEditor();

    startAutoRefresh();

};

