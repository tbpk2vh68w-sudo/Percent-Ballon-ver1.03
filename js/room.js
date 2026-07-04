```javascript
/*
=========================================
 Percent Balloon v2
 room.js
 Part1
 ルーム管理
=========================================
*/

/*=========================================
    Room Object
=========================================*/

let Room = null;

/*=========================================
    Create Room
=========================================*/

function createRoom() {

    const id = generateRoomId();

    Room = {

        id: id,

        title: "Percent Balloon",

        host: "",

        state: GameState.WAITING,

        currentQuestion: 0,

        createdAt: Date.now(),

        updatedAt: Date.now(),

        settings: {

            animationMode: AnimationMode.DRAMATIC,

            stopMode: StopMode.AUTO,

            balloon: false,

            sound: false

        },

        questions: []

    };

    saveRoom();

    return Room;

}

/*=========================================
    Save Room
=========================================*/

function saveRoom() {

    if (!Room) return;

    Room.updatedAt = Date.now();

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    rooms[Room.id] = Room;

    localStorage.setItem(

        "rooms",

        JSON.stringify(rooms)

    );

}

/*=========================================
    Load Room
=========================================*/

function loadRoom(roomId) {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    if (!rooms[roomId]) {

        return null;

    }

    Room = rooms[roomId];

    return Room;

}

/*=========================================
    Delete Room
=========================================*/

function deleteRoom(roomId) {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    if (!rooms[roomId]) {

        return false;

    }

    delete rooms[roomId];

    localStorage.setItem(

        "rooms",

        JSON.stringify(rooms)

    );

    if (Room && Room.id === roomId) {

        Room = null;

    }

    return true;

}

/*=========================================
    Exists
=========================================*/

function roomExists(roomId) {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    return rooms.hasOwnProperty(roomId);

}

/*=========================================
    Generate Room ID
=========================================*/

function generateRoomId() {

    const chars =

        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let id = "";

    while (id.length < CONFIG.ROOM.ID_LENGTH) {

        id += chars.charAt(

            Math.floor(

                Math.random() * chars.length

            )

        );

    }

    return id;

}

/*=========================================
    Current Room
=========================================*/

function getRoom() {

    return Room;

}
```
```javascript id="5wqk8p"
/*
=========================================
 Percent Balloon v2
 room.js
 Part2
 問題管理
=========================================
*/

/*=========================================
    Add Question
=========================================*/

function addQuestion(question, answer) {

    if (!Room) return false;

    if (Room.questions.length >= CONFIG.ROOM.MAX_QUESTIONS) {

        return false;

    }

    const data = {

        id: Date.now().toString(),

        text: question.trim(),

        answer: Number(answer)

    };

    Room.questions.push(data);

    saveRoom();

    return true;

}

/*=========================================
    Update Question
=========================================*/

function updateQuestion(index, question, answer) {

    if (!Room) return false;

    if (index < 0 || index >= Room.questions.length) {

        return false;

    }

    Room.questions[index].text = question.trim();

    Room.questions[index].answer = Number(answer);

    saveRoom();

    return true;

}

/*=========================================
    Delete Question
=========================================*/

function deleteQuestion(index) {

    if (!Room) return false;

    if (index < 0 || index >= Room.questions.length) {

        return false;

    }

    Room.questions.splice(index, 1);

    if (Room.currentQuestion >= Room.questions.length) {

        Room.currentQuestion = Math.max(
            0,
            Room.questions.length - 1
        );

    }

    saveRoom();

    return true;

}

/*=========================================
    Get Question
=========================================*/

function getQuestion(index) {

    if (!Room) return null;

    if (index < 0 || index >= Room.questions.length) {

        return null;

    }

    return Room.questions[index];

}

/*=========================================
    Get All Questions
=========================================*/

function getQuestions() {

    if (!Room) return [];

    return Room.questions;

}

/*=========================================
    Question Count
=========================================*/

function getQuestionCount() {

    if (!Room) return 0;

    return Room.questions.length;

}

/*=========================================
    Move Question
=========================================*/

function moveQuestion(fromIndex, toIndex) {

    if (!Room) return false;

    if (
        fromIndex < 0 ||
        fromIndex >= Room.questions.length ||
        toIndex < 0 ||
        toIndex >= Room.questions.length
    ) {

        return false;

    }

    const item = Room.questions.splice(fromIndex, 1)[0];

    Room.questions.splice(toIndex, 0, item);

    saveRoom();

    return true;

}

/*=========================================
    Clear Questions
=========================================*/

function clearQuestions() {

    if (!Room) return;

    Room.questions = [];

    Room.currentQuestion = 0;

    saveRoom();

}
```
```javascript
/*
=========================================
 Percent Balloon v2
 room.js
 Part3
 ゲーム進行管理
=========================================
*/

/*=========================================
    Set Room State
=========================================*/

function setRoomState(state) {

    if (!Room) return false;

    Room.state = state;

    saveRoom();

    return true;

}

/*=========================================
    Get Room State
=========================================*/

function getRoomState() {

    if (!Room) return GameState.WAITING;

    return Room.state;

}

/*=========================================
    Set Current Question
=========================================*/

function setCurrentQuestion(index) {

    if (!Room) return false;

    if (
        index < 0 ||
        index >= Room.questions.length
    ) {

        return false;

    }

    Room.currentQuestion = index;

    saveRoom();

    return true;

}

/*=========================================
    Get Current Question Index
=========================================*/

function getCurrentQuestionIndex() {

    if (!Room) return 0;

    return Room.currentQuestion;

}

/*=========================================
    Get Current Question
=========================================*/

function getCurrentQuestion() {

    if (!Room) return null;

    if (Room.questions.length === 0) {

        return null;

    }

    return Room.questions[
        Room.currentQuestion
    ];

}

/*=========================================
    Next Question
=========================================*/

function nextQuestion() {

    if (!Room) return null;

    if (
        Room.currentQuestion
        <
        Room.questions.length - 1
    ) {

        Room.currentQuestion++;

        saveRoom();

        return getCurrentQuestion();

    }

    Room.state = GameState.FINISH;

    saveRoom();

    return null;

}

/*=========================================
    Previous Question
=========================================*/

function previousQuestion() {

    if (!Room) return null;

    if (Room.currentQuestion > 0) {

        Room.currentQuestion--;

        saveRoom();

    }

    return getCurrentQuestion();

}

/*=========================================
    Reset Game
=========================================*/

function resetRoomGame() {

    if (!Room) return;

    Room.currentQuestion = 0;

    Room.state = GameState.WAITING;

    saveRoom();

}

/*=========================================
    Is Last Question
=========================================*/

function isLastQuestion() {

    if (!Room) return false;

    return (

        Room.currentQuestion

        >=

        Room.questions.length - 1

    );

}

/*=========================================
    Has Questions
=========================================*/

function hasQuestions() {

    if (!Room) return false;

    return Room.questions.length > 0;

}
```
```javascript
/*
=========================================
 Percent Balloon v2
 room.js
 Part4
 補助関数・バリデーション・初期化
=========================================
*/

/*=========================================
    Get Room ID
=========================================*/

function getRoomId() {

    if (!Room) return "";

    return Room.id;

}

/*=========================================
    Get Room Title
=========================================*/

function getRoomTitle() {

    if (!Room) return "";

    return Room.title;

}

/*=========================================
    Set Room Title
=========================================*/

function setRoomTitle(title) {

    if (!Room) return false;

    Room.title = title.trim();

    saveRoom();

    return true;

}

/*=========================================
    Get Room Settings
=========================================*/

function getRoomSettings() {

    if (!Room) return null;

    return Room.settings;

}

/*=========================================
    Update Room Settings
=========================================*/

function updateRoomSettings(settings) {

    if (!Room) return false;

    Room.settings = {

        ...Room.settings,

        ...settings

    };

    saveRoom();

    return true;

}

/*=========================================
    Validate Question
=========================================*/

function validateQuestion(text, answer) {

    if (!text || text.trim() === "") {

        return false;

    }

    if (

        isNaN(answer)

    ) {

        return false;

    }

    if (

        answer < CONFIG.GAME.MIN_PERCENT ||

        answer > CONFIG.GAME.MAX_PERCENT

    ) {

        return false;

    }

    return true;

}

/*=========================================
    Export Room
=========================================*/

function exportRoom() {

    if (!Room) return "";

    return JSON.stringify(Room);

}

/*=========================================
    Import Room
=========================================*/

function importRoom(json) {

    try {

        const data = JSON.parse(json);

        Room = data;

        saveRoom();

        return true;

    }

    catch {

        return false;

    }

}

/*=========================================
    Clear Current Room
=========================================*/

function clearRoom() {

    Room = null;

}

/*=========================================
    Initialize
=========================================*/

function initializeRoom() {

    if (Room) return;

    Room = null;

}
```
