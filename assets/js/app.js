function bigbangQuestion(qstn, answrs, rightA) {
    this.question = qstn;
    this.answers = answrs;
    this.ansLength = answrs.length;
    this.rightA = rightA;

    this.createHtmlContent = function() {
        // create a div for the question and answers
        var contentDiv = $("<div class='content-div'>");
        // create a div for the question
        var questionDiv = $("<div class='question-div'>").text(this.question);
        // append the question to the content div
        contentDiv.append(questionDiv);
        // create divs for the answers
        for (var i = 0; i < this.ansLength; i++) {
            // append the answer to the content div
            contentDiv.append(
                '<div class="answers" value="' +
                    i +
                    '" id="answer-' +
                    i +
                    '">' +
                    this.answers[i]
            );
        }
        // return the content div
        return contentDiv;
    };
}

var intervalID;
var time = 25;
var questionIndex = 0;

var bigbangQList = [
    new bigbangQuestion(
        "Penny gives Sheldon and Leonard a toy. Sheldon breaks the toy. What was the toy?",
        [
            "Batman's utility belt",
            "Star Trek transporter",
            "Game of Thrones sword",
            "Gameboy"
        ],
        1
    ),
    new bigbangQuestion(
        "How did Sheldon end up meeting Amy?",
        [
            "While working at the university",
            "In the comic book store",
            "Through a dating app",
            "At a science fair"
        ],
        2
    ),
    new bigbangQuestion(
        "Where does Leonard and Sheldon work?",
        ["MIT", "Caltech", "Harvard", "Yale"],
        1
    ),
    new bigbangQuestion(
        "What type of scientist is Raj?",
        [
            "Chemist",
            "Experimental Physicist",
            "Microbiologist",
            "Astrophysicist"
        ],
        3
    ),
    new bigbangQuestion(
        "Who does Sheldon recruit to start his own Comicon?",
        ["Carrie Fisher", "Leonard Nimoy", "Bill Gates", "James Earl Jones"],
        3
    )
];

window.onload = function() {
    var startBtn = $("<button class='start'>").text("Start");
    $("section").append(startBtn);

    $(".start").on("click", gameInit);
    $(".answers").on("click", chooseAnswer);
    // $(".answers").on("click", ???);
};

function gameInit() {
    countdown();
    var contentDiv = bigbangQList[questionIndex].createHtmlContent();
    $("section").append(contentDiv);
}

function countdown() {
    // add the countdown to the div
    var countdownDiv = $("<div class='countdown'>");
    $("section").append(countdownDiv);
    //create the interval and time and decrease the time every second
    intervalID = setInterval(function() {
        $(".countdown").html("<h1>" + time + "</h1>");
        time--;
        
        if (time < 0) {
            clearCountdown();
            time = 25;
        }
        // capture the answer the user clicks on
    }, 1000);
}

function chooseAnswer() {
    var elementValue = $(this).attr("value");
    console.log(elementValue);
    clearCountdown();
}

function clearCountdown() {
    // clear the interval
    clearInterval(intervalID);
    // wait 5 secs and increase to the next question
    setTimeout(function() {
        console.log("game over");
        $("section").empty();
        if (questionIndex < bigbangQList.length - 1) {
            questionIndex++;
        } else {
            console.log("you win");
            return false;
        }
        //initialize the game again
        gameInit();
    }, 5000);
}

// initialize the game for the first time
gameInit();
