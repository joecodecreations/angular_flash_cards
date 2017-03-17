(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Third Party Applications **/




/* Main Application */
require('./modules/app.module.js');

/* Controllers */
require('./controllers/flashcards.controller.js');

},{"./controllers/flashcards.controller.js":2,"./modules/app.module.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
angular.module('app', ['ngAnimate']);

},{}]},{},[1]);
