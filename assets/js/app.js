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

var intervalID;
var time = 25;
var questionIndex = 0;
var correctResponses = 0;

window.onload = function() {
    var startBtn = $("<button class='start'>").text("Start");
    $(".countdown").append(startBtn);
    $(".start").on("click", gameInit);
    $(".click-answers").on("click", chooseAnswer);
};

function gameInit() {
    questionIndex = 0;
    correctResponses = 0;
    $(".start").hide();
    countdown();
}

function countdown() {
    // insert the question content to the screen
    var content = bigbangQList[questionIndex].createContent();
    $("section").append(content);
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
}

function chooseAnswer() {
    // get the value of the item clicked on
    var elementValue = $(this).attr("value");
    $(".answers").removeClass("click-answers");
    // see if item clicked on is right answer
    if (parseInt(elementValue) === bigbangQList[questionIndex].rightA) {
        correctResponses++;
        $(".countdown").html("You are right! You have now answered " + correctResponses + " questions correctly.");
    } 
    // its not the correct answer
    else {
        console.log("answer is not correct")
        $(".countdown").html('Wrong! "Dolphins ... might be smarter than <em>some</em> people." -Leonard');
        $("#answer-" + elementValue).addClass("answer-wrong");
    }
    clearCountdown();
}

function clearCountdown() {
    // clear the interval
    clearInterval(intervalID);
    time = 25;
    // highlight the correct answer
    $("#answer-" + bigbangQList[questionIndex].rightA).addClass("answer-correct");
    // wait 5 secs and increase to the next question
    setTimeout(function() {
        console.log("question answered");
        // get the next question
        if (questionIndex < bigbangQList.length - 1) {
            questionIndex++;
        // end of questions - go to the end game screen
        } else {
            console.log("end of question list");
            endGame();
            return false;
        }
        $(".answers").removeClass("answer-correct answer-wrong");
        $(".answers").addClass("click-answers");
        //initialize the game again
        countdown();
    }, 2000);
}

function endGame() {
    // clear out the answers divs for end game
    $(".answers").removeClass("answer-correct answer-wrong");
    $(".answers").empty();
    // replace questions div with winning statement
    if (correctResponses < 15) {
        $(".question").html("You correctly answered <span class='number-correct'>" + correctResponses + "</span> questions out of 25. Would you care for a Milk Dud?");
    } else if (correctResponses < 20) {
        $(".question").html("You correctly answered <span class='number-correct'>" + correctResponses + "</span> questions out of 25. You can use Sheldon's parking spot!")
    } else {
        $(".question").html("You correctly answered <span class='number-correct'>" + correctResponses + "</span> questions out of 25. Sheldon honors you with a napkin with the DNA of Lenord Nimoy!")
    }
    $(".start").show().text("Restart");
}