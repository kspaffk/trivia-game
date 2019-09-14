

var zombieQuestion = {
    question: "",
    answer: [],

    createHtmlContent: function(question) {
        var contentDiv = $("<div>").addClass("content-div");
        var questionDiv = $("div").addClass("question-div").text(question);
        contentDiv.append(questionDiv);
        for(var i = 0; i < answer.length; i++) {
            var answer = $("<div>")
                .attr("id", "answer-" + (i + 1))
                .text(function(i) {
                    return answer[i];
                });
            contentDiv.append(answer);
        }
    }

}
