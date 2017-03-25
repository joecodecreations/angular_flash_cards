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

        deckInfo = {
            title: "this is my deck title",
            route: "kslfjasoifjdaifjaosdifjsd",
            backgroundColor: "orange",
            canSkipQuestions: true,
            alexa: 'the roof is red'
        };

        var res = $http.post('/api/decks', deckInfo);
        res.success(function (data, status, headers, config) {
            $scope.message = data;
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });

        //
        // $http({
        //     method: 'POST',
        //     url: 'https://flashcardquiz.com/api/decks/',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     // transformRequest: function (deckInfo) {
        //     //     var str = [];
        //     //     for (var p in deckInfo)
        //     //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        //     //     return str.join("&");
        //     // }
        //
        //     data: [{
        //         title: "this is my title",
        //         route: "lklsdjfalskfjalkdfj",
        //         backgroundColor: "orange",
        //         canSkipQuestions: true,
        //         alexa: "the roof is red"
        //     }]
        // }).then(function successCallback(response) {
        //     ctrl.test = "working";
        //     console.log(response);
        // }, function errorCallback(errorResponse) {
        //     console.log("error")
        //     console.log(errorResponse);
        //     console.log(errorResponse.data);
        // });

        //For each card in there we need to add it to the deck
    };

    //initiate grabbing the first question in the list
    updateCards.calculateQuestions($scope, questions);
    //Grab Next Question
    card.nextQuestion($scope, questions);
}
