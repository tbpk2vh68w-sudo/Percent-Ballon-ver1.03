```javascript id="ui_p1_01"
/*
=========================================
 Percent Balloon v2
 ui.js
 Part1
 DOM・初期化・基本UI
=========================================
*/

/*=========================================
    DOM
=========================================*/

const UI = {

    question: document.getElementById("question"),

    questionTitle: document.getElementById("questionTitle"),

    answerInput: document.getElementById("answerInput"),

    submitButton: document.getElementById("submitButton"),

    fillBar: document.getElementById("fillBar"),

    markerLayer: document.getElementById("markerLayer"),

    tickContainer: document.getElementById("tickContainer"),

    differenceText: document.getElementById("differenceText"),

    scoreText: document.getElementById("scoreText")

};

/*=========================================
    Initialize UI
=========================================*/

function initializeUI() {

    createTicks();

    bindEvents();

    setHomeButton();

    resetUI();

}

/*=========================================
    Create 0-100 ticks
=========================================*/

function createTicks() {

    if (!UI.tickContainer) return;

    UI.tickContainer.innerHTML = "";

    for (let i = 0; i <= 100; i++) {

        const tick = document.createElement("div");

        tick.className = "tick";

        if (i % 10 === 0) {

            tick.classList.add("major");

            const label = document.createElement("span");

            label.textContent = i;

            tick.appendChild(label);

        }

        UI.tickContainer.appendChild(tick);

    }

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    if (!UI.submitButton) return;

    UI.submitButton.addEventListener("click", () => {

        const value = Number(UI.answerInput.value);

        if (isNaN(value)) return;

        setUserAnswer(value);

        onSubmitAnswer(value);

    });

}

/*=========================================
    Home Button
=========================================*/

function setHomeButton() {

    const btn = document.getElementById("homeBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        location.href = "index.html";

    });

}

/*=========================================
    Reset UI
=========================================*/

function resetUI() {

    if (UI.answerInput) {

        UI.answerInput.value = "";

    }

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

    clearMarkers();

}

/*=========================================
    Clear Markers
=========================================*/

function clearMarkers() {

    if (!UI.markerLayer) return;

    UI.markerLayer.innerHTML = "";

}
```
```javascript id="ui_p2_01"
/*
=========================================
 Percent Balloon v2
 ui.js
 Part2
 ゲーム画面表示（問題・バー・マーカー）
=========================================
*/

/*=========================================
    Show Question
=========================================*/

function showQuestionUI(question) {

    if (!UI.question) return;

    UI.question.textContent = question?.text || "";

}

/*=========================================
    Show Answer Input
=========================================*/

function setAnswerInput(value) {

    if (!UI.answerInput) return;

    UI.answerInput.value = value ?? "";

}

/*=========================================
    Update Fill Bar
=========================================*/

function updateFillBar(percent) {

    if (!UI.fillBar) return;

    const p = clampPercent(percent);

    UI.fillBar.style.width = p + "%";

}

/*=========================================
    Show Current Marker
=========================================*/

function showCurrentMarkerUI(percent) {

    if (!UI.markerLayer) return;

    let marker = document.getElementById("currentMarker");

    if (!marker) {

        marker = document.createElement("div");

        marker.id = "currentMarker";

        marker.className = "currentMarker";

        UI.markerLayer.appendChild(marker);

    }

    const p = clampPercent(percent);

    marker.style.left = p + "%";

    updateFillBar(p);

}

/*=========================================
    Show Answer Marker
=========================================*/

function showAnswerMarkerUI(percent) {

    if (!UI.markerLayer) return;

    const old = document.querySelector(".answerMarker");

    if (old) old.remove();

    const marker = document.createElement("div");

    marker.className = "answerMarker";

    const triangle = document.createElement("div");

    triangle.className = "triangle";

    const value = document.createElement("div");

    value.className = "value";

    value.textContent = Math.round(percent);

    marker.appendChild(triangle);

    marker.appendChild(value);

    marker.style.left = percent + "%";

    UI.markerLayer.appendChild(marker);

}

/*=========================================
    Clamp
=========================================*/

function clampPercent(value) {

    return Math.max(0, Math.min(100, value));

}
```

/*
=========================================
 Percent Balloon v2
 ui.js
 Part3
 結果表示・スコア・状態UI
=========================================
*/

/*=========================================
    Show Difference
=========================================*/

function showDifferenceUI(diff) {

    if (!UI.differenceText) return;

    if (diff === null || diff === undefined) {

        UI.differenceText.textContent = "";

        return;

    }

    UI.differenceText.textContent = `差：${Math.round(diff)}%`;

}

/*=========================================
    Show Score
=========================================*/

function showScoreUI(score) {

    if (!UI.scoreText) return;

    UI.scoreText.textContent = `スコア：${score}`;

}

/*=========================================
    Show Round Info
=========================================*/

function showRoundUI(round, total) {

    const title = UI.questionTitle;

    if (!title) return;

    title.textContent = `問題 ${round + 1} / ${total}`;

}

/*=========================================
    Set Button State
=========================================*/

function setSubmitButtonState(enabled) {

    if (!UI.submitButton) return;

    UI.submitButton.disabled = !enabled;

}

/*=========================================
    Show Game Over
=========================================*/

function showGameOverUI(result) {

    if (UI.question) {

        UI.question.textContent = "ゲーム終了";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent =

            `最終スコア：${result.score}（ランク：${result.rank}）`;

    }

    if (UI.differenceText) {

        UI.differenceText.textContent =

            `平均：${result.average}%`;

    }

}

/*=========================================
    Set Waiting State
=========================================*/

function setWaitingUI() {

    if (UI.question) {

        UI.question.textContent = "開始待機中";

    }

    setSubmitButtonState(true);

}

/*=========================================
    Set Playing State
=========================================*/

function setPlayingUI() {

    setSubmitButtonState(true);

}

```javascript id="ui_p4_01"
/*
=========================================
 Percent Balloon v2
 ui.js
 Part4
 演出・リセット・初期化
=========================================
*/

/*=========================================
    Add Class
=========================================*/

function addClass(el, className) {

    if (!el) return;

    el.classList.add(className);

}

/*=========================================
    Remove Class
=========================================*/

function removeClass(el, className) {

    if (!el) return;

    el.classList.remove(className);

}

/*=========================================
    Flash Effect
=========================================*/

function flashUI(element) {

    if (!element) return;

    element.classList.remove("flash");

    void element.offsetWidth;

    element.classList.add("flash");

}

/*=========================================
    Shake Effect
=========================================*/

function shakeUI(element) {

    if (!element) return;

    element.classList.remove("shake");

    void element.offsetWidth;

    element.classList.add("shake");

}

/*=========================================
    Pop Effect
=========================================*/

function popUI(element) {

    if (!element) return;

    element.classList.remove("pop");

    void element.offsetWidth;

    element.classList.add("pop");

}

/*=========================================
    Set Tension Mode
=========================================*/

function setTensionMode(enabled) {

    const game = document.getElementById("game");

    if (!game) return;

    if (enabled) {

        game.classList.add("tension");

    } else {

        game.classList.remove("tension");

    }

}

/*=========================================
    Reset All UI
=========================================*/

function resetUI() {

    if (UI.answerInput) {

        UI.answerInput.value = "";

    }

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

    clearMarkers();

    setTensionMode(false);

}

/*=========================================
    Initialize UI System
=========================================*/

function initUI() {

    initializeUI();

    setWaitingUI();

}
```
