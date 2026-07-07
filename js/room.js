/*
=========================================
 Percent Balloon v2
 room.js
 完成版 Part1
=========================================
*/

/*=========================================
    Current Room
=========================================*/

let Room = null;

/*=========================================
    Get All Rooms
=========================================*/

function getRooms() {

    return JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

}

/*=========================================
    Save All Rooms
=========================================*/

function saveRooms(rooms) {

    localStorage.setItem(

        "rooms",

        JSON.stringify(rooms)

    );

}

/*=========================================
    Generate Room ID
=========================================*/

function generateRoomId() {

    const chars =

        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    const rooms = getRooms();

    let id = "";

    do {

        id = "";

        for (let i = 0; i < 6; i++) {

            id += chars.charAt(

                Math.floor(

                    Math.random() * chars.length

                )

            );

        }

    } while (rooms[id]);

    return id;

}

/*=========================================
    Create Room
=========================================*/

function createRoom(name) {

    const rooms = getRooms();

    const room = {

        id: generateRoomId(),

        name: name,

        questions: [],

        currentQuestion: 0,

        state: "waiting",

        createdAt: Date.now(),

        updatedAt: Date.now()

    };

    rooms[room.id] = room;

    saveRooms(rooms);

    return room;

}

/*=========================================
    Get Room
=========================================*/

function getRoom(roomId) {

    const rooms = getRooms();

    return rooms[roomId] || null;

}

/*=========================================
    Save Room
=========================================*/

function saveRoom(room) {

    const rooms = getRooms();

    room.updatedAt = Date.now();

    rooms[room.id] = room;

    saveRooms(rooms);

}

/*=========================================
    Delete Room
=========================================*/

function deleteRoom(roomId) {

    const rooms = getRooms();

    if (!rooms[roomId]) {

        return false;

    }

    delete rooms[roomId];

    saveRooms(rooms);

    if (Room && Room.id === roomId) {

        Room = null;

    }

    return true;

}

/*=========================================
    Set Current Room
=========================================*/

function setCurrentRoom(room) {

    Room = room;

}

/*=========================================
    Get Current Room
=========================================*/

function getCurrentRoom() {

    return Room;

}

/*=========================================
    Load Current Room
=========================================*/

function loadCurrentRoom() {

    const roomId = localStorage.getItem(

        "currentRoomId"

    );

    if (!roomId) {

        return null;

    }

    Room = getRoom(roomId);

    return Room;

}

/*=========================================
    Save Current Room
=========================================*/

function saveCurrentRoom() {

    if (!Room) {

        return;

    }

    saveRoom(Room);

}

/*=========================================
    Add Question
=========================================*/

function addQuestion(roomId, text, answer) {

    const room = getRoom(roomId);

    if (!room) {

        return false;

    }

    room.questions.push({

        id: Date.now().toString(),

        text: text,

        answer: Number(answer)

    });

    saveRoom(room);

    return true;

}

/*=========================================
    Delete Question
=========================================*/

function deleteQuestion(roomId, index) {

    const room = getRoom(roomId);

    if (!room) {

        return false;

    }

    if (

        index < 0 ||

        index >= room.questions.length

    ) {

        return false;

    }

    room.questions.splice(index, 1);

    saveRoom(room);

    return true;

}

/*=========================================
    Update Question
=========================================*/

function updateQuestion(

    roomId,

    index,

    text,

    answer

) {

    const room = getRoom(roomId);

    if (!room) {

        return false;

    }

    if (

        index < 0 ||

        index >= room.questions.length

    ) {

        return false;

    }

    room.questions[index].text = text;

    room.questions[index].answer = Number(answer);

    saveRoom(room);

    return true;

}

/*=========================================
    Get Question
=========================================*/

function getQuestion(

    roomId,

    index

) {

    const room = getRoom(roomId);

    if (!room) {

        return null;

    }

    return room.questions[index] || null;

}

/*=========================================
    Get Question Count
=========================================*/

function getQuestionCount(roomId) {

    const room = getRoom(roomId);

    if (!room) {

        return 0;

    }

    return room.questions.length;

}

/*=========================================
    Start Game
=========================================*/

function startGame(roomId) {

    const room = getRoom(roomId);

    if (!room) {

        return false;

    }

    room.currentQuestion = 0;

    room.state = "running";

    saveRoom(room);

    localStorage.setItem(

        "currentRoomId",

        room.id

    );

    return true;

}

/*=========================================
    Finish Game
=========================================*/

function finishGame(roomId) {

    const room = getRoom(roomId);

    if (!room) {

        return false;

    }

    room.state = "finished";

    saveRoom(room);

    return true;

}

/*=========================================
    Next Question
=========================================*/

function nextQuestion(roomId) {

    const room = getRoom(roomId);

    if (!room) {

        return null;

    }

    if (

        room.currentQuestion <

        room.questions.length - 1

    ) {

        room.currentQuestion++;

        saveRoom(room);

        return room.questions[

            room.currentQuestion

        ];

    }

    finishGame(roomId);

    return null;

}

/*=========================================
    Current Question
=========================================*/

function getCurrentQuestion(roomId) {

    const room = getRoom(roomId);

    if (!room) {

        return null;

    }

    return room.questions[

        room.currentQuestion

    ] || null;

}

/*=========================================
    Reset Game
=========================================*/

function resetGame(roomId) {

    const room = getRoom(roomId);

    if (!room) {

        return false;

    }

    room.currentQuestion = 0;

    room.state = "waiting";

    saveRoom(room);

    return true;

}

/*=========================================
    Room Exists
=========================================*/

function roomExists(roomId) {

    const rooms = getRooms();

    return Object.prototype.hasOwnProperty.call(

        rooms,

        roomId

    );

}

/*=========================================
    Get Room List
=========================================*/

function getRoomList() {

    const rooms = getRooms();

    return Object.values(rooms).sort(

        function (a, b) {

            return b.updatedAt - a.updatedAt;

        }

    );

}

/*=========================================
    Validate Question
=========================================*/

function validateQuestion(text, answer) {

    if (typeof text !== "string") {

        return false;

    }

    text = text.trim();

    if (text.length === 0) {

        return false;

    }

    if (text.length > 200) {

        return false;

    }

    if (

        isNaN(answer) ||

        answer < 0 ||

        answer > 100

    ) {

        return false;

    }

    return true;

}

/*=========================================
    Validate Room Name
=========================================*/

function validateRoomName(name) {

    if (typeof name !== "string") {

        return false;

    }

    name = name.trim();

    return name.length > 0;

}

/*=========================================
    Clear Current Room
=========================================*/

function clearCurrentRoom() {

    Room = null;

    localStorage.removeItem(

        "currentRoomId"

    );

}

/*=========================================
    Export
=========================================*/

window.RoomManager = {

    getRooms,

    getRoom,

    getRoomList,

    createRoom,

    saveRoom,

    deleteRoom,

    roomExists,

    addQuestion,

    deleteQuestion,

    updateQuestion,

    getQuestion,

    getQuestionCount,

    getCurrentQuestion,

    startGame,

    nextQuestion,

    finishGame,

    resetGame,

    validateQuestion,

    validateRoomName,

    setCurrentRoom,

    getCurrentRoom,

    loadCurrentRoom,

    saveCurrentRoom,

    clearCurrentRoom

};