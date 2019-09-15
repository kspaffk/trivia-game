function bigbangQuestion(qstn, answrs, rightA) {
    this.question = qstn;
    this.answers = answrs;
    this.ansLength = answrs.length;
    this.rightA = rightA;

    this.createHtmlContent = function() {
        var contentDiv = $("<div class='content-div'>");
        var questionDiv = $("<div class='question-div'>").text(this.question);
        contentDiv.append(questionDiv);
        var formDiv = $("<form>");
        for (var i = 0; i < this.ansLength; i++) {
            formDiv.append('<input type="radio" name="answer" value="' 
                + i + '" id="answer-' + i + '">' + this.answers[i] + '<br>');
        }
        contentDiv.append(formDiv);
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

$(document).ready(function() {
    function gameInit() {
        countdown();
        var contentDiv = bigbangQList[questionIndex].createHtmlContent();
        $("section").append(contentDiv);
    }

    function countdown() {
        var countdownDiv = $("<div class='countdown'>");
        $("section").append(countdownDiv);
        intervalID = setInterval(function() {
            $(".countdown").html("<h1>" + time + "</h1>");
            time--;

            if (time < 0) {
                clearCountdown();
                time = 25;
            }
        }, 1000);
    }

    function clearCountdown() {
        clearInterval(intervalID);

        setTimeout(function() {
            console.log("game over");
            $("section").empty();
            if (questionIndex < bigbangQList.length - 1) {
                questionIndex++;
            } else {
                console.log("you win");
                return false;
            }

            gameInit();
        }
        , 5000);
    }

    gameInit();
});
