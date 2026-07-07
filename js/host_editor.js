/*
=========================================
 Percent Balloon v2
 host_editor.js
 問題編集
=========================================
*/

/*=========================================
    Load Room
=========================================*/

function loadEditorRoom() {

    const roomId = localStorage.getItem("editingRoom");

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    CurrentRoom = rooms[roomId];

    if (!CurrentRoom) {

        location.href = "host.html";

        return;

    }

}

/*
=========================================
 Percent Balloon v2
 host_editor.js
 Part1
=========================================
*/

const EditorUI = {

    roomName: document.getElementById("roomName"),

    questionInput: document.getElementById("questionInput"),

    answerInput: document.getElementById("answerInput"),

    questionList: document.getElementById("questionList"),

    addButton: document.getElementById("addQuestionButton"),

    saveButton: document.getElementById("saveButton"),

    startButton: document.getElementById("startButton"),

    homeButton: document.getElementById("homeButton")

};


/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initEditor

);

function initEditor() {

    loadRoom();

    renderRoom();

    renderQuestionList();

    bindEvents();

}

function loadRoom() {

    const roomId = localStorage.getItem("editingRoom");

    CurrentRoom = getRoom(roomId);

    if (!CurrentRoom) {

        alert("ルームが見つかりません。");

        location.href = "host.html";

        return;

    }

}

/*=========================================
    Render Room
=========================================*/

function renderRoom() {

    EditorUI.roomName.textContent =

        CurrentRoom.name;

}

/*=========================================
    Render Question List
=========================================*/

function renderQuestionList() {

    EditorUI.questionList.innerHTML = "";

    CurrentRoom.questions.forEach(function (question, index) {

        const div = document.createElement("div");

        div.className = "questionCard";

        const text = document.createElement("span");

        text.textContent =
            (index + 1) +
            ". " +
            question.text +
            "（" +
            question.answer +
            "%）";

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "削除";

        deleteButton.onclick = function () {

            deleteQuestion(index);

        };

        div.appendChild(text);

        div.appendChild(deleteButton);

        EditorUI.questionList.appendChild(div);

    });

}

/*=========================================
    Add Question
=========================================*/

function addQuestion() {

    const text = EditorUI.questionInput.value.trim();

    const answer = Number(

        EditorUI.answerInput.value

    );

    if (text === "") {

        alert("問題文を入力してください。");

        return;

    }

    if (isNaN(answer) || answer < 0 || answer > 100) {

        alert("答えは0～100で入力してください。");

        return;

    }

    CurrentRoom.questions.push({

        text: text,

        answer: answer

    });

    EditorUI.questionInput.value = "";

    EditorUI.answerInput.value = "";

    renderQuestionList();

}

/*=========================================
    Delete Question
=========================================*/

function deleteQuestion(index) {

    if (!confirm("この問題を削除しますか？")) {

        return;

    }

    CurrentRoom.questions.splice(index, 1);

    renderQuestionList();

}

/*=========================================
    Save Room
=========================================*/

function saveRoom() {

    saveRoomData(CurrentRoom);

    alert("保存しました。");

}

/*=========================================
    Start Game
=========================================*/

function startGame() {

    if (CurrentRoom.questions.length === 0) {

        alert("問題を追加してください。");

        return;

    }

    CurrentRoom.currentQuestion = 0;

    CurrentRoom.state = "waiting";

    saveRoomData(CurrentRoom);

    localStorage.setItem(

        "currentRoomId",

        CurrentRoom.id

    );

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

    saveRoomData(CurrentRoom);

    location.href = "host.html";

};

}