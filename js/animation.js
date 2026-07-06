/*
=========================================
 Percent Balloon v2
 animation.js
 Part1
 基本アニメーション制御
=========================================
*/

/*=========================================
    Animation State
=========================================*/

let Animation = {

    state: "idle",

    current: 0,

    target: 0,

    speed: 0,

    timer: null

};

/*=========================================
    Start Animation
=========================================*/

function startAnimation(target) {

    stopAnimation();

    Animation.target = clampPercent(target);

    Animation.state = "chaos";

    Animation.current = 0;

    Animation.speed = 0;

    runAnimation();

}

/*=========================================
    Stop Animation
=========================================*/

function stopAnimation() {

    if (Animation.timer) {

        clearInterval(Animation.timer);

        Animation.timer = null;

    }

    Animation.state = "idle";

}

/*=========================================
    Set Current Value
=========================================*/

function setAnimationValue(value) {

    Animation.current = clampPercent(value);

    showCurrentMarkerUI(Animation.current);

}

/*=========================================
    Get Current Value
=========================================*/

function getAnimationValue() {

    return Animation.current;

}

/*=========================================
    Is Running
=========================================*/

function isAnimationRunning() {

    return Animation.timer !== null;

}

/*=========================================
    Run Core Loop
=========================================*/

function runAnimation() {

    if (Animation.timer) {

        clearInterval(Animation.timer);

    }

    Animation.timer = setInterval(() => {

        if (Animation.state === "idle") {

            stopAnimation();

            return;

        }

        updateAnimation();

    }, 50);

}

/*=========================================
    Update Animation (dispatcher)
=========================================*/

function updateAnimation() {

    // この後 Part2〜で中身を追加

}
/*
=========================================
 Percent Balloon v2
 animation.js
 Part2
 カオスフェーズ（暴走）
=========================================
*/

/*=========================================
    Chaos Phase
=========================================*/

function chaosPhase() {

    Animation.state = "chaos";

    Animation.speed = 25;

}

/*=========================================
    Chaos Update
=========================================*/

function updateChaos() {

    // ランダムに0〜100を大きく飛ぶ

    const jump = Math.random() * 100;

    setAnimationValue(jump);

    // たまに大きく振れる演出（強調）

    if (Math.random() < 0.15) {

        const burst = Math.random() * 100;

        setAnimationValue(burst);

    }

    // ある程度進んだらドリフトへ

    if (Math.random() < 0.03) {

        driftPhase();

    }

}

/*=========================================
    Burst Effect (visual spike)
=========================================*/

function burstEffect() {

    const offset = (Math.random() - 0.5) * 40;

    let value = Animation.current + offset;

    value = clampPercent(value);

    setAnimationValue(value);

}

/*=========================================
    Chaos Trigger
=========================================*/

function triggerChaos() {

    chaosPhase();

}
/*
=========================================
 Percent Balloon v2
 animation.js
 Part3
 ドリフトフェーズ（収束）
=========================================
*/

/*=========================================
    Drift Phase
=========================================*/

function driftPhase() {

    Animation.state = "drift";

    Animation.speed = 12;

}

/*=========================================
    Drift Update
=========================================*/

function updateDrift() {

    const diff = Animation.target - Animation.current;

    // 距離に応じてスピード変化（遠いほど速い）

    const step = Math.max(

        1,

        Math.abs(diff) * 0.08

    );

    // 徐々に近づく

    if (Math.abs(diff) > 15) {

        Animation.current +=

            diff > 0 ? step : -step;

    } else {

        // 近づいたらテンションへ

        tensionPhase();

        return;

    }

    // ゆらぎ（ネプリーグっぽいブレ）

    if (Math.random() < 0.2) {

        Animation.current +=

            (Math.random() - 0.5) * 6;

    }

    Animation.current = clampPercent(Animation.current);

    setAnimationValue(Animation.current);

}

/*=========================================
    Soft Drift (微調整)
=========================================*/

function softDrift() {

    const diff = Animation.target - Animation.current;

    Animation.current += diff * 0.15;

    Animation.current = clampPercent(Animation.current);

    setAnimationValue(Animation.current);

}

/*=========================================
    Enter Drift
=========================================*/

function enterDrift() {

    driftPhase();

}
/*
=========================================
 Percent Balloon v2
 animation.js
 Part4
 テンションフェーズ（1%刻み）
=========================================
*/

/*=========================================
    Tension Phase
=========================================*/

function tensionPhase() {

    Animation.state = "tension";

    Animation.speed = 80;

}

/*=========================================
    Tension Update
=========================================*/

function updateTension() {

    const diff = Animation.target - Animation.current;

    // 1%刻みでじわじわ動く

    if (Math.abs(diff) > 1) {

        Animation.current +=

            diff > 0 ? 1 : -1;

    } else {

        // 最終フェーズへ

        stopPhase();

        return;

    }

    // 緊張演出（止まりそうで止まらない）

    if (Math.random() < 0.25) {

        Animation.current +=

            (Math.random() - 0.5) * 1.5;

    }

    Animation.current = clampPercent(Animation.current);

    setAnimationValue(Animation.current);

    // UIテンション演出

    if (Math.abs(diff) < 10) {

        setTensionMode(true);

    }

}

/*=========================================
    Enter Tension
=========================================*/

function enterTension() {

    tensionPhase();

}
/*
=========================================
 Percent Balloon v2
 animation.js
 Part5
 ストップ演出（完成）
=========================================
*/

/*=========================================
    Stop Phase
=========================================*/

function stopPhase() {

    Animation.state = "stop";

    Animation.speed = 0;

    setAnimationValue(Animation.target);

    setTensionMode(false);

    showStopEffect();

    // 少し間を置いて次処理へ
    setTimeout(() => {

        onAnimationComplete();

    }, CONFIG.ANIMATION.STOP_DELAY);

}

/*=========================================
    Snap Stop（即停止）
=========================================*/

function snapStop() {

    Animation.current = Animation.target;

    setAnimationValue(Animation.current);

    stopPhase();

}

/*=========================================
    Slow Stop（ため停止）
=========================================*/

function slowStop() {

    Animation.state = "slowStop";

    let steps = 10;

    const diff = Animation.target - Animation.current;

    const step = diff / steps;

    const timer = setInterval(() => {

        Animation.current += step;

        Animation.current = clampPercent(Animation.current);

        setAnimationValue(Animation.current);

        steps--;

        if (steps <= 0) {

            clearInterval(timer);

            stopPhase();

        }

    }, 120);

}

/*=========================================
    Show Stop Effect
=========================================*/

function showStopEffect() {

    const marker = document.getElementById("currentMarker");

    if (marker) {

        marker.classList.add("pop");

        marker.classList.add("flash");

    }

}

/*=========================================
    Animation Complete Callback
=========================================*/

function onAnimationComplete() {

    // UI更新（差・スコアなど）

    const diff = Math.abs(

        Game.userAnswer - Animation.target

    );

    Game.difference = diff;

    calculateDifference();

    addScore();

    showDifferenceUI(diff);

    showScoreUI(Game.score);

    // 次ラウンドへ

    setTimeout(() => {

        nextRound();

        startAnimation(0);

    }, CONFIG.GAME.AUTO_NEXT_TIME);

}

/*=========================================
    Dispatcher Update（完成）
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
        default:
            break;

    }

}
