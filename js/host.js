```javascript id="host_p1_01"
/*
=========================================
 Percent Balloon v2
 host.js
 Part1
 ルーム作成・初期化
=========================================
*/

/*=========================================
    DOM
=========================================*/

const HostUI = {

    roomId: document.getElementById("roomId"),

    list: document.getElementById("list"),

    qText: document.getElementById("qText"),

    qAnswer: document.getElementById("qAnswer")

};

/*=========================================
    Current Room
=========================================*/

let HostRoom = null;

/*=========================================
    Initialize Host
=========================================*/

function initHost() {

    createOrLoadRoom();

    renderRoomInfo();

    bindHostEvents();

}

/*=========================================
    Create or Load Room
=========================================*/

function createOrLoadRoom() {

    const id = generateRoomId();

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    if (rooms[id]) {

        HostRoom = rooms[id];

    } else {

        HostRoom = {

            id: id,

            questions: []

        };

        rooms[id] = HostRoom;

        localStorage.setItem(

            "rooms",

            JSON.stringify(rooms)

        );

    }

}

/*=========================================
    Render Room Info
=========================================*/

function renderRoomInfo() {

    if (!HostUI.roomId) return;

    HostUI.roomId.textContent = HostRoom.id;

}
`
function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/*
=========================================
 Percent Balloon v2
 host.js
 Part2
 問題作成・編集・削除
=========================================
*/

/*=========================================
    Add Question
=========================================*/

function addQuestionHost() {

    const text = HostUI.qText.value;

    const answer = Number(HostUI.qAnswer.value);

    if (!validateQuestion(text, answer)) {

        return;

    }

    HostRoom.questions.push({

        id: Date.now().toString(),

        text: text.trim(),

        answer: answer

    });

    saveHostRoom();

    renderQuestionList();

    clearInputs();

}

/*=========================================
    Delete Question
=========================================*/

function deleteQuestionHost(index) {

    if (!HostRoom) return;

    HostRoom.questions.splice(index, 1);

    saveHostRoom();

    renderQuestionList();

}

/*=========================================
    Render Question List
=========================================*/

function renderQuestionList() {

    if (!HostUI.list) return;

    HostUI.list.innerHTML = "";

    HostRoom.questions.forEach((q, i) => {

        const item = document.createElement("div");

        item.className = "host-question";

        item.textContent = `${i + 1}. ${q.text} (${q.answer}%)`;

        item.onclick = () => {

            deleteQuestionHost(i);

        };

        HostUI.list.appendChild(item);

    });

}

/*=========================================
    Clear Inputs
=========================================*/

function clearInputs() {

    HostUI.qText.value = "";

    HostUI.qAnswer.value = "";

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
```

/*
=========================================
 Percent Balloon v2
 host.js
 Part3
 ゲーム制御（開始・進行・同期）
=========================================
*/

/*=========================================
    Start Game
=========================================*/

function startHostGame() {

    if (!HostRoom || HostRoom.questions.length === 0) {

        return;

    }

    HostRoom.state = "running";

    HostRoom.currentQuestion = 0;

    saveHostRoom();

    broadcastState();

    location.href = "play.html";

}

/*=========================================
    Next Question
=========================================*/

function nextHostQuestion() {

    if (!HostRoom) return;

    if (HostRoom.currentQuestion < HostRoom.questions.length - 1) {

        HostRoom.currentQuestion++;

    } else {

        HostRoom.state = "finished";

    }

    saveHostRoom();

    broadcastState();

}

/*=========================================
    Reset Game
=========================================*/

function resetHostGame() {

    if (!HostRoom) return;

    HostRoom.state = "waiting";

    HostRoom.currentQuestion = 0;

    saveHostRoom();

    broadcastState();

}

/*=========================================
    Broadcast State (擬似同期)
=========================================*/

function broadcastState() {

    localStorage.setItem(

        "currentRoomId",

        HostRoom.id

    );

    localStorage.setItem(

        "hostState",

        JSON.stringify({

            state: HostRoom.state,

            currentQuestion: HostRoom.currentQuestion

        })

    );

}

/*=========================================
    Get Current Question
=========================================*/

function getHostCurrentQuestion() {

    return HostRoom.questions[HostRoom.currentQuestion] || null;

}
`
/*
=========================================
 Percent Balloon v2
 host.js
 Part4
 UI連携・イベント・初期化
=========================================
*/

/*=========================================
    Bind Events
=========================================*/

function bindHostEvents() {

    const addBtn = document.getElementById("addBtn");
    const saveBtn = document.getElementById("saveBtn");
    const startBtn = document.getElementById("startBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (addBtn) addBtn.onclick = addQuestionHost;

    if (saveBtn) saveBtn.onclick = saveHostRoom;

    if (startBtn) startBtn.onclick = startHostGame;

    if (nextBtn) nextBtn.onclick = nextHostQuestion;

    if (resetBtn) resetBtn.onclick = resetHostGame;

}

/*=========================================
    Update UI Loop
=========================================*/

function updateHostUI() {

    renderQuestionList();

    renderRoomInfo();

}

/*=========================================
    Render Question List (safe refresh)
=========================================*/

function renderQuestionListSafe() {

    if (!HostRoom) return;

    if (!HostUI.list) return;

    HostUI.list.innerHTML = "";

    HostRoom.questions.forEach((q, i) => {

        const div = document.createElement("div");

        div.className = "host-question";

       div.textContent =
    i + 1 + ". " +
    q.text +
    " (" + q.answer + "%)";

        div.onclick = () => deleteQuestionHost(i);

        HostUI.list.appendChild(div);

    });

}

/*=========================================
    Auto Sync (polling)
=========================================*/

function startHostSync() {

    setInterval(() => {

        const rooms = JSON.parse(

            localStorage.getItem("rooms") || "{}"

        );

        const updated = rooms[HostRoom.id];

        if (updated) {

            HostRoom = updated;

            updateHostUI();

        }

    }, 1000);

}

/*=========================================
    Initialize Host App
=========================================*/

function initHostApp() {

    initHost();

    updateHostUI();

    startHostSync();

}

/*=========================================
    Start on Load
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initHostApp();

});

function addQ() {
    addQuestionHost();
}

function saveRoom() {
    saveHostRoom();
}