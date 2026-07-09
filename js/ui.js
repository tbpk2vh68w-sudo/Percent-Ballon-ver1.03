/*
=========================================
 Percent Balloon v2
 ui.js
 完成版 Part1
=========================================
*/

/*=========================================
    DOM
=========================================*/

const UI = {

    questionTitle:
        document.getElementById("questionTitle"),

    question:
        document.getElementById("question"),

    answerInput:
        document.getElementById("answerInput"),

    submitButton:
        document.getElementById("submitButton"),

    currentMarker:
        document.getElementById("currentMarker"),

    answerMarker:
        document.getElementById("answerMarker"),

    correctMarker:
        document.getElementById("correctMarker"),

    fillBar:
        document.getElementById("fillBar"),

    differenceText:
        document.getElementById("differenceText"),

    scoreText:
        document.getElementById("scoreText")

};

/*=========================================
    Question
=========================================*/

function showQuestionUI(question) {

    if (!UI.question) return;

    UI.question.textContent = question.text;

}

/*=========================================
    Question Title
=========================================*/

function showQuestionTitleUI(title) {

    if (!UI.questionTitle) return;

    UI.questionTitle.textContent = title;

}

/*=========================================
    Submit Button
=========================================*/

function setSubmitButtonState(enable) {

    if (!UI.submitButton) return;

    UI.submitButton.disabled = !enable;

}

/*=========================================
    Reset Input
=========================================*/

function resetInputUI() {

    if (!UI.answerInput) return;

    UI.answerInput.value = "";

}

/*=========================================
    Current Marker
=========================================*/

function showCurrentMarkerUI(percent) {

    percent = Math.max(
        0,
        Math.min(100, percent)
    );

    if (UI.fillBar) {

        UI.fillBar.style.width =
            percent + "%";

    }

    if (UI.currentMarker) {

        UI.currentMarker.style.left =
            percent + "%";

    }

}

/*=========================================
    Answer Marker
=========================================*/

function showAnswerMarkerUI(percent){

    if(!UI.answerMarker) return;

    UI.answerMarker.style.display="flex";

    UI.answerMarker.style.left=percent+"%";

    UI.answerMarker.innerHTML=

        '<div class="triangle"></div>'+

        '<div class="value">'+

        percent+

        '%</div>';

}


function showCorrectMarkerUI(percent){

    if(!UI.correctMarker) return;

    UI.correctMarker.style.display="flex";

    UI.correctMarker.style.left=percent+"%";

    UI.correctMarker.innerHTML=

        '<div class="triangle"></div>'+

        '<div class="value">'+

        percent+

        '%</div>';

}

/*=========================================
    Difference
=========================================*/

function showDifferenceUI(diff) {

    if (!UI.differenceText) return;

    UI.differenceText.textContent =
        "差：" + diff + "%";

}

/*=========================================
    Score
=========================================*/

function showScoreUI(score) {

    if (!UI.scoreText) return;

    UI.scoreText.textContent =
        "スコア：" + score;

}

/*=========================================
    Reset Result
=========================================*/

function resetResultUI() {

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

}

/*=========================================
    Reset UI
=========================================*/

function resetUI() {

    resetInputUI();

    if (UI.answerInput) {

        UI.answerInput.disabled = false;

    }

    if (UI.submitButton) {

        UI.submitButton.disabled = false;

    }

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

    if (UI.answerMarker) {

        UI.answerMarker.style.display = "none";

        UI.answerMarker.innerHTML = "";

    }

    if (UI.correctMarker) {

        UI.correctMarker.style.display = "none";

        UI.correctMarker.innerHTML = "";

    }

    showCurrentMarkerUI(0);

}

/*=========================================
    Tension Mode
=========================================*/

function setTensionMode(enable) {

    const bar = document.getElementById("percentBar");

    if (!bar) return;

    if (enable) {

        bar.classList.add("tension");

    } else {

        bar.classList.remove("tension");

    }

}

/*=========================================
    Marker Visible
=========================================*/

function showMarkers() {

    if (UI.currentMarker) {

        UI.currentMarker.style.display = "block";

    }

    if (UI.answerMarker) {

        UI.answerMarker.style.display = "block";

    }

}

/*=========================================
    Marker Hidden
=========================================*/

function hideMarkers() {

    if (UI.currentMarker) {

        UI.currentMarker.style.display = "none";

    }

    if (UI.answerMarker) {

        UI.answerMarker.style.display = "none";

    }

}

/*=========================================
    Enable Input
=========================================*/

function enableInput() {

    if (UI.answerInput) {

        UI.answerInput.disabled = false;

    }

    setSubmitButtonState(true);

}

/*=========================================
    Disable Input
=========================================*/

function disableInput() {

    if (UI.answerInput) {

        UI.answerInput.disabled = true;

    }

    setSubmitButtonState(false);

}

/*=========================================
    Create Percent Scale
=========================================*/

function createPercentScale() {

    const container =

        document.getElementById(

            "tickContainer"

        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    for (
    let i = 0;
    i <= 100;
    i++
) {

        const tick = document.createElement("div");

tick.className = "tick";

if (i % 10 === 0) {

    tick.classList.add("majorTick");

} else {

    tick.classList.add("minorTick");

}

tick.style.left = i + "%";

        const label = document.createElement("span");

label.className = "tickLabel";

if (i % 10 === 0) {

    label.textContent = i + "%";

}

tick.appendChild(label);

container.appendChild(tick);

    }

}

/*=========================================
    Initialize UI
=========================================*/

function initUI() {

    createPercentScale();

    resetUI();

    showMarkers();

}

/*=========================================
    Auto Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initUI

);

window.UIManager = {

    showQuestionUI,

    showQuestionTitleUI,

    showCurrentMarkerUI,

    showAnswerMarkerUI,

    showCorrectMarkerUI,

    showDifferenceUI,

    showScoreUI,

    setSubmitButtonState,

    setTensionMode,

    enableInput,

    disableInput,

    resetUI,

    showMarkers,

    hideMarkers

};