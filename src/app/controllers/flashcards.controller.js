angular.module('app').controller('flashcards', flashCardsController);

function flashCardsController($scope, card, resetValidationService, updateCards) {
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

    //initiate grabbing the first question in the list
    updateCards.calculateQuestions($scope, questions);
    //Grab Next Question
    card.nextQuestion($scope, questions);
}
