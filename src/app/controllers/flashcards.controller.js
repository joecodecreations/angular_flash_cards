angular.module('app').controller('flashcards', flashCardsController);

function flashCardsController($scope, $http, card, resetValidationService, updateCards) {
    var ctrl = $scope;

    /* Default states */
    //  ctrl.quizTitle = "Front End Web Development";
    ctrl.currentQuestion = 0; // Holds current question we are on
    ctrl.flip = false; // Holds bool for flipped card
    ctrl.firstcard = true; // Is this the first card ? (blank back etc)
    ctrl.addCardShow = false;
    ctrl.mainWindow = false; //card deck preview
    ctrl.introCompleted = false;

    /*Adding a new Card */
    ctrl.cardAdded = false;
    ctrl.finished = false; //have we saved the data / also shows the final form.


    /* Form max and mins */
    ctrl.subjectLength = 26;
    ctrl.answerLength = 250;
    ctrl.questionLength = 250;
    ctrl.minCharacters = 10; //min form input chrt count
    ctrl.maxCharactersSubject = 26;





    /* set the questions and categories */
    var questions = [];

    /* Closes Card Added! and allows additional input */
    ctrl.addAnotherCard = function () {
        ctrl.cardAdded = false;
    };

    /* Closes Card Added! and allows additional input */
    ctrl.returnToDeck = function () {
        //initiate grabbing the first question in the list
        updateCards.calculateQuestions($scope, questions);
        //Grab Next Question
        card.nextQuestion($scope, questions);
        ctrl.closeWindow();


    };

    /* Shows Interface for Adding New Cards */
    ctrl.showAddCardInterface = function () {
        ctrl.addCardShow = true;
        ctrl.mainWindow = false;
    };



    function resetAddCardInputs() {
        // Reset Form Input Values
        ctrl.newQuestion = "";
        ctrl.newAnswer = "";
        ctrl.newCategory = "";
    }

    ctrl.getStarted = function () {
        ctrl.introCompleted = true;
        ctrl.addCardShow = true;
    }
    /* Grabs the next question in the list */
    card.nextQuestion($scope, questions);

    ctrl.showAnswerButton = function () {
        ctrl.flip = true; //flip the card
        if (questions[ctrl.currentQuestion - 1]) {
            ctrl.answerquestionCategory = questions[ctrl.currentQuestion - 1].category;
            ctrl.answer = questions[(ctrl.currentQuestion - 1)].answer;
        }
    };

    ctrl.nextQuestionButton = function () {
        //Grab Next Card
        card.nextQuestion($scope, questions);
    };

    ctrl.closeWindow = function () {
        ctrl.mainWindow = true;
        ctrl.addCardShow = false; //hide add card menu
        ctrl.cardAdded = false; //hide secondary add card menu (success)
        resetValidationService.reset(ctrl);
        resetAddCardInputs();
    };

    ctrl.addNewCard = function () {
        card.add($scope, resetValidationService, updateCards, questions);
        updateCards.calculateQuestions($scope, questions);
    };
    ctrl.shareDeck = function () {
        ctrl.mainWindow = false;
        ctrl.shareWindow = true;

    };

    function resetShareForm() {
        ctrl.AlexaError = false;
        ctrl.TitleError = false;
        ctrl.TitleErrorMessage = "";
        ctrl.AlexaErrorMessage = "";
    }

    function countWords(phrase) {
        var wordCount = phrase.split(" ").length;
        //console.log(wordCount);
        return wordCount;
    }

    ctrl.createDeck = function () {
        resetShareForm();
        var validation = true;
        if (ctrl.deckTitle === null || ctrl.deckTitle === undefined || ctrl.deckTitle.length < 0) {
            validation = false;
            ctrl.TitleError = true;
            ctrl.TitleErrorMessage = "* Your title cannot be blank"
        }
        if (ctrl.alexa == true && (ctrl.alexaPhrase < 0 || ctrl.alexaPhrase === undefined)) {
            ctrl.AlexaError = true;
            validation = false;
            ctrl.AlexaErrorMessage = "* You must enter a phrase to use alexa"
        } else {
            if (countWords(ctrl.alexaPhrase) < 3) {
                validation = false;
                ctrl.AlexaError = true;
                ctrl.AlexaErrorMessage = "* Alexa Phrase must be five words or more"
            }

        }

        if (validation) {
            deckInfo = {
                title: ctrl.deckTitle,
                route: "kslfjasoifjdaifjaosdifjsd",
                backgroundColor: "orange",
                canSkipQuestions: true,
                alexa: ctrl.alexaPhrase
            };

            $http({
                method: 'POST',
                url: '/api/decks',
                data: deckInfo,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                //console.log("Deck Created!");
                //console.log("Deck_id: " + response.data.id);
                //resonse.data.message
                //console.log("questions: " + questions);

                for (var cards in questions) {

                    console.log(questions[cards]);

                    cardInfo = {
                        'question': questions[cards].question,
                        'answer': questions[cards].answer,
                        'category': questions[cards].category,
                        'group_id': response.data.id
                    };

                    card.saveCard(cardInfo);

                }
                ctrl.finished = true; //show the finished screen
                ctrl.shareWindow = false; //hide the share this
            }, function errorCallback(errorResponse) {
                console.log("error");
                console.log(errorResponse);
                console.log(errorResponse.data);
            });
        }
    };

}
