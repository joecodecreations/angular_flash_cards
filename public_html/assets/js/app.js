(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Third Party Applications **/




/* Main Application */
require('./modules/app.module.js');

/* Controllers */
require('./controllers/navigation.controller.js');
require('./controllers/flashcards.controller.js');

/* Services */
require('./services/card.service.js');
require('./services/updateCards.service.js');
//add card form validation reset
require('./services/resetValidation.service.js');


/* Custom Directives */
require('./directives/insertCard.directive.js');

},{"./controllers/flashcards.controller.js":2,"./controllers/navigation.controller.js":3,"./directives/insertCard.directive.js":4,"./modules/app.module.js":5,"./services/card.service.js":6,"./services/resetValidation.service.js":7,"./services/updateCards.service.js":8}],2:[function(require,module,exports){
angular.module('app').controller('flashcards', flashCardsController);

function flashCardsController($scope, $http, card, resetValidationService, updateCards) {
    var ctrl = $scope;

    /* Default states */
    ctrl.quizTitle = "Front End Web Development";
    ctrl.currentQuestion = 0; // Holds current question we are on
    ctrl.flip = false; // Holds bool for flipped card
    ctrl.firstcard = true; // Is this the first card ? (blank back etc)
    ctrl.addCardShow = false;

    /*Adding a new Card */
    ctrl.cardAdded = false;

    /* Form max and mins */
    ctrl.subjectLength = 26;
    ctrl.answerLength = 250;
    ctrl.questionLength = 250;
    ctrl.minCharacters = 10; //min form input chrt count
    ctrl.maxCharactersSubject = 26;




    //ctrl.test = globalFunctions.test();
    /* set the questions and categories */
    var questions = [{
            'question': "How do you change font color using css?",
            'answer': "Answer: Use the color attribute",
            'category': "CSS"
        }, {
            'question': "How do you declare a number input?",
            'answer': 'Answer: Update the type attribute of the input to use "number" i.e <input type="number">',
            'category': "HTML5"
        },
        {
            'question': "In css how do you change the font size?",
            'answer': "Answer: Use the font-size attribute",
            'category': "CSS"
        }
    ];

    /* Closes Card Added! and allows additional input */
    ctrl.addAnotherCard = function () {
        ctrl.cardAdded = false;
    };

    /* Closes Card Added! and allows additional input */
    ctrl.returnToDeck = function () {
        ctrl.closeWindow();

    };

    /* Shows Interface for Adding New Cards */
    ctrl.showAddCardInterface = function () {
        ctrl.addCardShow = true;
    };

    //Reset The Form Validation Errors From Start
    resetValidationService.reset(ctrl);
    //Calculate Amount of Cards/Questions
    updateCards.calculateQuestions($scope, questions);

    function resetAddCardInputs() {
        // Reset Form Input Values
        ctrl.newQuestion = "";
        ctrl.newAnswer = "";
        ctrl.newCategory = "";
    }


    /* Grabs the next question in the list */
    card.nextQuestion($scope, questions);

    ctrl.showAnswerButton = function () {
        ctrl.flip = true; //flip the card
        ctrl.answerquestionCategory = questions[ctrl.currentQuestion - 1].category;
        ctrl.answer = questions[(ctrl.currentQuestion - 1)].answer;
    };

    ctrl.nextQuestionButton = function () {
        //Grab Next Card
        card.nextQuestion($scope, questions);
    };

    ctrl.closeWindow = function () {
        ctrl.addCardShow = false; //hide add card menu
        ctrl.cardAdded = false; //hide secondary add card menu (success)
        resetValidationService.reset(ctrl);
        resetAddCardInputs();
    };

    ctrl.addNewCard = function () {
        card.add($scope, resetValidationService, updateCards, questions);
    };

    ctrl.shareDeck = function () {

        deckInfo = [{
            'title': "this is my deck title",
            'route': "kslfjasoifjdaifjaosdifjsd",
            'backgroundColor': "orange",
            'canSkipQuestions': true,
            'alexa': 'the roof is red'
        }];
        //Create deck into database
        $http({
            method: 'POST',
            url: 'https://flashcardquiz.com/api/decks/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // transformRequest: function (deckInfo) {
            //     var str = [];
            //     for (var p in deckInfo)
            //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //     return str.join("&");
            // }

            data: {
                title: "this is my title",
                route: "lklsdjfalskfjalkdfj",
                backgroundColor: "orange",
                canSkipQuestions: true,
                alexa: "the roof is red"
            }
        }).then(function successCallback(response) {
            ctrl.test = "working";
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });

        //For each card in there we need to add it to the deck
    };

    //initiate grabbing the first question in the list
    updateCards.calculateQuestions($scope, questions);
    //Grab Next Question
    card.nextQuestion($scope, questions);
}

},{}],3:[function(require,module,exports){
angular.module('app').controller('navigation', navigationController);

function navigationController($scope) {
    var ctrl = $scope;

    ctrl.title = 'Flash Card Quiz';

    ctrl.navButtons = [{

            'heading': 'Add Card',
            'titleTag': 'Add a new card',
            'action': function () {
                ctrl.showAddCardInterface();
            }
        },
        {
            'heading': 'Share Deck',
            'titleTag': 'Share this deck with friends',
            'action': function () {
                ctrl.shareDeck();

            }
        }
    ];


}

},{}],4:[function(require,module,exports){
angular.module('app').directive('insertCard', insertCardDirective);

function insertCardDirective() {
    return {
        restrict: "EA",
        scope: {
            addCardShow: '@'
        },
        //template: '<span class="jackson">{{ test }} Billy</span>',
        templateUrl: '/insertDirective',
    };
}

},{}],5:[function(require,module,exports){
angular.module('app', ['ngAnimate']);

},{}],6:[function(require,module,exports){
angular.module('app').service('card', cardService);

function cardService() {
    var vm = this;

    /* Add a new card */
    vm.add = function ($scope, resetValidationService, updateCards, questions) {
        var ctrl = $scope;
        /* Validate Form */
        var passValidation = true;
        //reset validation
        resetValidationService.reset(ctrl);

        if (typeof ctrl.newQuestion === "undefined" || ctrl.newQuestion.length < ctrl.minCharacters) {
            passValidation = false;
            ctrl.QuestionError = true;
            ctrl.QuestionErrorMessage = "* This field requires at least 10 characters";
        } else {
            if (ctrl.newQuestion.length > ctrl.questionLength) {
                ctrl.QuestionError = true;
                ctrl.QuestionErrorMessage = "* Too many characters";
                passValidation = false;
            }
        }

        if (typeof ctrl.newAnswer === "undefined" || ctrl.newAnswer.length < ctrl.minCharacters) {

            ctrl.AnswerError = true;
            passValidation = false;
            ctrl.AnswerErrorMessage = "* This field requires at least 10 characters";
        } else {
            if (ctrl.newAnswer.length > ctrl.answerLength) {
                ctrl.AnswerError = true;
                ctrl.QuestionErrorMessage = "* Too many characters";
                passValidation = false;
            }
        }

        if (typeof ctrl.newCategory !== "undefined" && ctrl.newCategory.length > ctrl.maxCharactersSubject) {
            ctrl.CategoryError = true;
            ctrl.CategoryErrorMessage = "* Too many characters in category";
            passValidation = false;

        }

        /* if we pass validation, submt new card */
        if (passValidation) {


            //create new card for injection into array
            var newCard = {
                'question': ctrl.newQuestion,
                'answer': ctrl.newAnswer,
                'category': ctrl.newCategory
            };

            //reset the form
            ctrl.newQuestion = "";
            ctrl.newAnswer = "";
            ctrl.newCategory = "";
            //Add new question to array
            questions.push(newCard);
            //Reset card Count
            updateCards.calculateQuestions($scope, questions);
            ctrl.cardAdded = true;
        }
    };

    /* Grabs the Next Question in the list */
    vm.nextQuestion = function ($scope, questions) {
        var ctrl = $scope;
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
    };
}

},{}],7:[function(require,module,exports){
angular.module('app').service('resetValidationService', resetValidationService);

function resetValidationService() {
    var vm = this;
    vm.reset = function ($scope) {
        var ctrl = $scope;

        //Reset Validation
        ctrl.QuestionError = false;
        ctrl.AnswerError = false;
        ctrl.SubjectError = false;
        ctrl.QuestionErrorMessage = "";
        ctrl.AnswerErrorMessage = "";
        ctrl.SubjectErrorMessage = "";


        //reset the form
        ctrl.cardAdded = false;


        return true;
    };
}

},{}],8:[function(require,module,exports){
/* This will count the cards in our deck */

angular.module('app').service('updateCards', updateCards);

function updateCards() {
    var vm = this;

    vm.calculateQuestions = function ($scope, questions) {
        var ctrl = $scope;
        ctrl.totalQuestions = questions.length;
        return true;
    };


}

},{}]},{},[1]);
