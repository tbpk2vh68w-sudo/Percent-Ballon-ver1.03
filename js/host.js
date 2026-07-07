/*
=========================================
 Percent Balloon v2
 host.js
 ルーム管理
=========================================
*/

const HostUI = {

    roomNameInput: document.getElementById("roomNameInput"),

    roomList: document.getElementById("roomList"),

    createRoomButton: document.getElementById("createRoomButton"),

    homeButton: document.getElementById("homeButton")

};

/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initHost

);

function initHost() {

    renderRoomList();

    bindEvents();

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    HostUI.createRoomButton.onclick = createRoom;

    HostUI.homeButton.onclick = function () {

        location.href = "index.html";

    };

}

HostUI.createRoomButton.onclick = function () {

    const roomName =

        HostUI.roomNameInput.value.trim();

    if (roomName === "") {

        alert("ルーム名を入力してください。");

        return;

    }

    createRoom(roomName);

    HostUI.roomNameInput.value = "";

    renderRoomList();

};

function renderRoomList() {

    const rooms = getRooms();

    HostUI.roomList.innerHTML = "";

    Object.values(rooms).forEach(function (room) {

        const card = document.createElement("div");

        card.className = "roomCard";

        const title = document.createElement("h3");

        title.textContent = room.name;

        const id = document.createElement("p");

        id.textContent =

            "ルームID : " + room.id;

        const editButton =

            document.createElement("button");

        editButton.textContent = "編集";

        editButton.onclick = function () {

            localStorage.setItem(

                "editingRoom",

                room.id

            );

            location.href =

                "host_editor.html";

        };

        const deleteButton =

            document.createElement("button");

        deleteButton.textContent = "削除";

        deleteButton.onclick = function () {

            if (

                confirm(

                    "このルームを削除しますか？"

                )

            ) {

                deleteRoom(room.id);

                renderRoomList();

            }

        };

        card.appendChild(title);

        card.appendChild(id);

        card.appendChild(editButton);

        card.appendChild(deleteButton);

        HostUI.roomList.appendChild(card);

    });

}



/*=========================================
    Get Room
=========================================*/

function getRoom(roomId) {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    return rooms[roomId] || null;

}

/*=========================================
    Get All Rooms
=========================================*/

function getAllRooms() {

    const rooms = JSON.parse(

        localStorage.getItem("rooms") || "{}"

    );

    return Object.values(rooms);

}

