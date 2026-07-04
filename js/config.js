```javascript
/*
=========================================
 Percent Balloon v2
 config.js
=========================================
*/

const CONFIG = {

    /*==============================
        GAME
    ==============================*/

    GAME:{

        MIN_PERCENT:0,

        MAX_PERCENT:100,

        DEFAULT_ROUND:10,

        AUTO_NEXT_TIME:3000

    },

    /*==============================
        BAR
    ==============================*/

    BAR:{

        TICK_COUNT:101,

        HEIGHT:48,

        MARKER_SIZE:34,

        FILL_SPEED:0.08

    },

    /*==============================
        ANIMATION
    ==============================*/

    ANIMATION:{

        MODE:"dramatic",

        CHAOS_COUNT:45,

        CHAOS_INTERVAL:50,

        DRIFT_INTERVAL:80,

        TENSION_INTERVAL:180,

        STOP_DELAY:500

    },

    /*==============================
        STOP MODE
    ==============================*/

    STOP:{

        MODE:"auto",

        WAIT_HOST:false

    },

    /*==============================
        EFFECT
    ==============================*/

    EFFECT:{

        SHAKE:true,

        FLASH:true,

        GLOW:true,

        SOUND:false

    },

    /*==============================
        BALLOON
    ==============================*/

    BALLOON:{

        ENABLE:false,

        POP_EFFECT:true

    },

    /*==============================
        ROOM
    ==============================*/

    ROOM:{

        ID_LENGTH:6,

        MAX_QUESTIONS:100

    },

    /*==============================
        COLOR
    ==============================*/

    COLOR:{

        BLUE:"#00B8FF",

        GREEN:"#00D95F",

        YELLOW:"#FFE600",

        ORANGE:"#FF9800",

        RED:"#FF4444",

        GRAY:"#BFBFBF"

    }

};

/*=========================================
    Animation Mode
=========================================*/

const AnimationMode={

    NORMAL:"normal",

    DRAMATIC:"dramatic",

    TENSION:"tension",

    RANDOM:"random"

};

/*=========================================
    Stop Mode
=========================================*/

const StopMode={

    AUTO:"auto",

    HOST:"host"

};

/*=========================================
    Game State
=========================================*/

const GameState={

    WAITING:"waiting",

    READY:"ready",

    QUESTION:"question",

    ANIMATION:"animation",

    RESULT:"result",

    FINISH:"finish"

};
```
