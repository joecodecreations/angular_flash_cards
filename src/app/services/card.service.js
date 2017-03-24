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
