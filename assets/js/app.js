function bigbangQuestion(qstn, answrs, rightA) {
    this.question = qstn;
    this.answers = answrs;
    this.ansLength = answrs.length;
    this.rightA = rightA;

    this.createContent = function() {
        // insert question text
        $(".question").text(this.question);
        // insert answer text
        for (var i = 0; i < this.ansLength; i++) {
            $("#answer-" + i).text(this.answers[i]);
        }
    };
}

var bigbangQList = [
    new bigbangQuestion(
        "Penny gave Sheldon and Leonard a toy. Sheldon broke his toy. What was the toy?",
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

var intervalID;
var time = 25;
var questionIndex = 0;
var correctResponses = 0;

window.onload = function() {
    $(".content").hide();
    var startBtn = $("<button class='start'>").text("Start");
    $(".countdown").append(startBtn);
    $(".start").on("click", gameInit);
};

function gameInit() {
    $(".content").show();
    $(".countdown").empty();
    $(".start").off();
    questionIndex = 0;
    correctResponses = 0;
    countdown();
}

function countdown() {
    // insert the question content to the screen
    var content = bigbangQList[questionIndex].createContent();
    $("section").append(content);
    $(".answers").addClass("hover");
    $(".countdown").html("You have " + time + " seconds remaining.");
    //create the interval and time and decrease the time every second
    intervalID = setInterval(function() {
        time--;
        $(".countdown").html("You have " + time + " seconds remaining.");

        if (time < 0) {
            clearCountdown();
            time = 25;
            $(".countdown").html("You ran out of time!");
        }
        // capture the answer the user clicks on
    }, 1000);
    $(".click-answers").on("click", chooseAnswer);
}

function chooseAnswer() {
    // get the value of the item clicked on
    var elementValue = $(this).attr("value");
    // see if item clicked on is right answer
    if (parseInt(elementValue) === bigbangQList[questionIndex].rightA) {
        correctResponses++;
        $(".countdown").html("You are right! You have now answered " + correctResponses + " questions correctly.");
    } 
    // its not the correct answer
    else {
        $(".countdown").html('Wrong! "Dolphins ... might be smarter than <em>some</em> people." -Leonard');
        $("#answer-" + elementValue).addClass("answer-wrong");
    }
    clearCountdown();
}

function clearCountdown() {
    $(".click-answers").off("click");
    $(".answers").removeClass("hover");
    // clear the interval
    clearInterval(intervalID);
    time = 25;
    // highlight the correct answer
    $("#answer-" + bigbangQList[questionIndex].rightA).addClass("answer-correct");
    // wait 5 secs and increase to the next question
    setTimeout(function() {
        // get the next question
        if (questionIndex < bigbangQList.length - 1) {
            questionIndex++;
        // end of questions - go to the end game screen
        } else {
            endGame();
            return false;
        }
        // remove the correct/wrong answer coloring for next question
        $(".answers").removeClass("answer-correct answer-wrong");
        //initialize the game again
        countdown();
    }, 2500);
}

function endGame() {
    // clear out the countdown statement counter put in the restart button
    $(".countdown").empty();
    var restartBtn = $("<button class='start'>").text("Restart");
    $(".countdown").append(restartBtn);
    // clear out the answers
    $(".answers").removeClass("answer-correct answer-wrong");
    $(".answers").empty();
    // replace question div with winning statement
    if (correctResponses < 15) {
        $(".question").html("You correctly answered <span class='number-correct'>" + correctResponses + "</span> questions out of " + bigbangQList.length + ". Would you care for a Milk Dud?");
    } else if (correctResponses < 20) {
        $(".question").html("You correctly answered <span class='number-correct'>" + correctResponses + "</span> questions out of " + bigbangQList.length + ". You can use Sheldon's parking spot!")
    } else {
        $(".question").html("You correctly answered <span class='number-correct'>" + correctResponses + "</span> questions out of " + bigbangQList.length + ". Sheldon honors you with a napkin with the DNA of Lenord Nimoy!")
    }
    $(".start").on("click", gameInit);
}