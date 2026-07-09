/*
=========================================
 Percent Balloon v2
 animation.js
 完成版 Part1
=========================================
*/

/*=========================================
    Animation
=========================================*/

const Animation = {

    timer: null,

    current: 0,

    target: 0,

    state: "idle",

    callback: null

};

/*=========================================
    Start
=========================================*/

function startAnimation(

    target,

    callback

) {

    stopAnimation();

    Animation.current = 0;

    Animation.target = clampPercent(target);

    Animation.callback = callback || null;

    Animation.state = "chaos";

    runAnimation();

}

/*=========================================
    Stop
=========================================*/

function stopAnimation() {

    if (Animation.timer) {

        clearInterval(

            Animation.timer

        );

    }

    Animation.timer = null;

    Animation.state = "idle";

}

/*=========================================
    Current Value
=========================================*/

function setAnimationValue(value) {

    Animation.current =

        clampPercent(value);

    if (

        typeof showCurrentMarkerUI ===

        "function"

    ) {

        showCurrentMarkerUI(

            Animation.current

        );

    }

}

/*=========================================
    Clamp
=========================================*/

function clampPercent(value) {

    value = Number(value);

    if (isNaN(value)) value = 0;

    if (value < 0) value = 0;

    if (value > 100) value = 100;

    return value;

}

/*=========================================
    Run Animation
=========================================*/

function runAnimation() {

    Animation.timer = setInterval(

        updateAnimation,

        40

    );

}

/*=========================================
    Update Animation
=========================================*/

function updateAnimation() {

    switch (Animation.state) {

        case "chaos":

            updateChaos();

            break;

        case "drift":

            updateDrift();

            break;

        case "tension":

            updateTension();

            break;

        case "stop":

            finishAnimation();

            break;

    }

}

/*=========================================
    Chaos
=========================================*/

function updateChaos() {

    setAnimationValue(

        Math.random() * 100

    );

    Animation.chaosCount =
        (Animation.chaosCount || 0) + 1;

    if (Animation.chaosCount > 35) {

        Animation.chaosCount = 0;

        Animation.state = "drift";

    }

}

/*=========================================
    Drift
=========================================*/

function updateDrift() {

    const diff =

        Animation.target -

        Animation.current;

    Animation.current +=

        diff * 0.07;

    setAnimationValue(

        Animation.current

    );

    if (

        Math.abs(diff) < 15

    ) {

        Animation.state =

            "tension";

    }

}

/*=========================================
    Tension
=========================================*/

function updateTension() {

    const diff =

        Animation.target -

        Animation.current;

    if (

        Math.abs(diff) <= 0.5

    ) {

        Animation.current =

            Animation.target;

        setAnimationValue(

            Animation.current

        );

        Animation.state =

            "stop";

        return;

    }

    const move =

        diff * 0.12 +

        (Math.random() - 0.5) * 0.7;

    Animation.current += move;

    setAnimationValue(

        Animation.current

    );

}

/*=========================================
    Finish Animation
=========================================*/

function finishAnimation() {

    stopAnimation();

    setAnimationValue(Animation.target);

    showStopEffect();

    const marker =
        document.getElementById("currentMarker");

    if (marker) {

        marker.classList.remove("success");

        void marker.offsetWidth; // 再描画を強制

        marker.classList.add("success");

        marker.addEventListener(
            "animationend",
            function () {
                marker.classList.remove("success");
            },
            { once: true }
        );
    }

    setTimeout(function () {

        if (typeof Animation.callback === "function") {

            Animation.callback();

        }

    }, 700);

}

/*=========================================
    Stop Effect
=========================================*/

function showStopEffect() {

    const marker =

        document.getElementById(

            "currentMarker"

        );

    if (!marker) {

        return;

    }

    marker.classList.add(

        "stopEffect"

    );

    setTimeout(function () {

        marker.classList.remove(

            "stopEffect"

        );

    }, 400);

}

/*=========================================
    Animation Running
=========================================*/

function isAnimationRunning() {

    return Animation.timer !== null;

}

/*=========================================
    Get Current Value
=========================================*/

function getAnimationValue() {

    return Animation.current;

}

/*=========================================
    Reset Animation
=========================================*/

function resetAnimation() {

    stopAnimation();

    Animation.current = 0;

    Animation.target = 0;

    Animation.callback = null;

    Animation.state = "idle";

    setAnimationValue(0);

}

/*=========================================
    Snap Stop
=========================================*/

function snapStop() {

    Animation.current =

        Animation.target;

    setAnimationValue(

        Animation.current

    );

    Animation.state = "stop";

}

/*=========================================
    Slow Stop
=========================================*/

function slowStop() {

    Animation.state =

        "tension";

}

/*=========================================
    Restart Animation
=========================================*/

function restartAnimation(

    target,

    callback

) {

    resetAnimation();

    startAnimation(

        target,

        callback

    );

}

/*=========================================
    Skip Animation
=========================================*/

function skipAnimation() {

    if (

        !isAnimationRunning()

    ) {

        return;

    }

    snapStop();

    finishAnimation();

}

/*=========================================
    Get Target Value
=========================================*/

function getAnimationTarget() {

    return Animation.target;

}

/*=========================================
    Initialize Animation
=========================================*/

function initAnimation() {

    resetAnimation();

}

/*=========================================
    Window Resize
=========================================*/

window.addEventListener(

    "resize",

    function () {

        setAnimationValue(

            Animation.current

        );

    }

);

/*=========================================
    Auto Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initAnimation

);

/*=========================================
    Export
=========================================*/

window.AnimationManager = {

    startAnimation,

    stopAnimation,

    restartAnimation,

    resetAnimation,

    skipAnimation,

    snapStop,

    slowStop,

    setAnimationValue,

    getAnimationValue,

    getAnimationTarget,

    isAnimationRunning

};