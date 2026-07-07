/*
=========================================
 Percent Balloon v2
 host.js
 完成版 Part1
=========================================
*/

/*=========================================
    DOM
=========================================*/

const HostUI = {

    roomNameInput:
        document.getElementById("roomNameInput"),

    createRoomButton:
        document.getElementById("createRoomButton"),

    roomList:
        document.getElementById("roomList"),

    homeButton:
        document.getElementById("homeButton")

};

/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initHost

);

function initHost() {

    bindEvents();

    renderRoomList();

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    HostUI.createRoomButton.onclick =
        onCreateRoom;

    HostUI.homeButton.onclick =
        function () {

            location.href = "index.html";

        };

}

/*=========================================
    Create Room Button
=========================================*/

function onCreateRoom() {

    const name =

        HostUI.roomNameInput.value.trim();

    if (

        !RoomManager.validateRoomName(name)

    ) {

        alert("ルーム名を入力してください。");

        return;

    }

    RoomManager.createRoom(name);

    HostUI.roomNameInput.value = "";

    renderRoomList();

}

/*=========================================
    Render Room List
=========================================*/

function renderRoomList() {

    const rooms = RoomManager.getRoomList();

    HostUI.roomList.innerHTML = "";

    if (rooms.length === 0) {

        const p = document.createElement("p");

        p.textContent = "保存されたルームはありません。";

        HostUI.roomList.appendChild(p);

        return;

    }

    rooms.forEach(function (room) {

        const card = document.createElement("div");

        card.className = "roomCard";

        const title = document.createElement("h3");

        title.textContent = room.name;

        const info = document.createElement("p");

        info.textContent =
            "ルームID：" + room.id;

        const buttonArea =
            document.createElement("div");

        buttonArea.className =
            "roomButtonArea";

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

                    "「" +
                    room.name +
                    "」を削除しますか？"

                )

            ) {

                RoomManager.deleteRoom(

                    room.id

                );

                renderRoomList();

            }

        };

        buttonArea.appendChild(editButton);

        buttonArea.appendChild(deleteButton);

        card.appendChild(title);

card.appendChild(info);

renderUpdatedTime(card, room);

card.appendChild(buttonArea);

HostUI.roomList.appendChild(card);

    });

}

/*=========================================
    Update Room List
=========================================*/

function refreshRoomList() {

    renderRoomList();

}

/*=========================================
    Format Date
=========================================*/

function formatDate(time) {

    if (!time) {

        return "----/--/-- --:--";

    }

    const date = new Date(time);

    const y = date.getFullYear();

    const m = String(

        date.getMonth() + 1

    ).padStart(2, "0");

    const d = String(

        date.getDate()

    ).padStart(2, "0");

    const h = String(

        date.getHours()

    ).padStart(2, "0");

    const min = String(

        date.getMinutes()

    ).padStart(2, "0");

    return (

        y +

        "/" +

        m +

        "/" +

        d +

        " " +

        h +

        ":" +

        min

    );

}

/*=========================================
    Update Room Cards
=========================================*/

function updateRoomCards() {

    const cards =

        document.querySelectorAll(

            ".roomCard"

        );

    cards.forEach(function(card){

        card.style.cursor = "default";

    });

}

/*=========================================
    Refresh Screen
=========================================*/

function refreshScreen() {

    refreshRoomList();

    updateRoomCards();

}

/*=========================================
    Render Updated Time
=========================================*/

function renderUpdatedTime(card, room) {

    const updated = document.createElement("p");

    updated.className = "roomUpdated";

    updated.textContent =
        "最終更新 : " +
        formatDate(room.updatedAt);

    card.appendChild(updated);

}

/*=========================================
    Auto Refresh
=========================================*/

function startAutoRefresh() {

    setInterval(function () {

        refreshScreen();

    }, 1000);

}

/*=========================================
    Final Initialize
=========================================*/

const _initHost = initHost;

initHost = function () {

    _initHost();

    startAutoRefresh();

};