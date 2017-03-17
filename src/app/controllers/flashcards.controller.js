angular.module('app').controller('flashcards', flashCardsController);

function flashCardsController($scope) {
    var ctrl = $scope;

    /* Default states */
    ctrl.title = "Angular Flash Card Demonstration";

    ctrl.quizTitle = "Front End Web Development";
    ctrl.currentQuestion = 0; // Holds current question we are on
    ctrl.flip = false; // Holds bool for flipped card
    ctrl.firstcard = true; // Is this the first card ? (blank back etc)

    /* set the questions and categories */
    var questions = [{
            question: "How do you change font color using css?",
            answer: "Answer: Use the color attribute",
            category: "CSS"
        }, {
            question: "How do you declare a number input?",
            answer: 'Answer: Update the type attribute of the input to use "number" i.e <input type="number">',
            category: "HTML5"
        },
        {
            question: "In css how do you change the font size?",
            answer: "Answer: Use the font-size attribute",
            category: "CSS"
        }
    ];


    ctrl.totalQuestions = questions.length;

    /* Grabs the next question in the list */
    function nextQuestion() {
        if (ctrl.firstcard) {

            //write the contents of the card
            ctrl.question = questions[ctrl.currentQuestion].question;
            ctrl.answer = questions[ctrl.currentQuestion].answer;
            ctrl.questionCategory = questions[ctrl.currentQuestion].category;
            ctrl.currentQuestion++;
            //don't change the state until we show the first card
            setTimeout(function () {
                ctrl.firstcard = false;
            }, 1000);

        } else {

            if (ctrl.flip === true) {
                ctrl.flip = false;
            }

            /* if we reach the last question start over */
            if (ctrl.currentQuestion >= questions.length) {
                ctrl.currentQuestion = 0;
            }
            //write the contents of the card
            ctrl.question = questions[ctrl.currentQuestion].question;
            ctrl.questionCategory = questions[ctrl.currentQuestion].category;
            ctrl.currentQuestion++;

        }

    }

    ctrl.showAnswerButton = function () {
        ctrl.flip = true; //flip the card
        ctrl.answerquestionCategory = questions[ctrl.currentQuestion - 1].category;
        ctrl.answer = questions[(ctrl.currentQuestion - 1)].answer;
    };

    ctrl.nextQuestionButton = function () {
        nextQuestion();
    };

    //initiate grabbing the first question in the list
    nextQuestion();

}
