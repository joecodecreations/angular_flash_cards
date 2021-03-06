angular.module('app').service('card', cardService);

function cardService($http) {
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
      ctrl.QuestionErrorMessage = "* This field requires 10 characters";
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
      ctrl.AnswerErrorMessage = "* This field requires 10 characters";
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

      ctrl.showCardHeader = true; //make sure the card header is now active
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
      ctrl.firstcard = false;
    }
  };

  /* Grabs the Next Question in the list */
  vm.nextQuestion = function ($scope, questions) {
    //console.log("next question hit");
    var ctrl = $scope;
    //console.log("Length: " + questions.length);
    //console.log("current: " + ctrl.currentQuestion);
    /* if we reach the last question start over */
    if (ctrl.currentQuestion && questions.length) {
      if (ctrl.currentQuestion >= questions.length) {
        ctrl.currentQuestion = 0;
        //  console.log("lowered to zero");
      }

    }


    //as long as we have questions
    if (questions[ctrl.currentQuestion]) {
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

        // console.log("currentQ: " + ctrl.currentQuestion);
        // console.log("currentLength: " + questions.length);

        //write the contents of the card
        ctrl.question = questions[ctrl.currentQuestion].question;
        ctrl.questionCategory = questions[ctrl.currentQuestion].category;
        ctrl.currentQuestion++;

      }
    }
  };


  /* Grabs the Next Question in the list */
  vm.saveCard = function (data) {

    $http({
      method: 'POST',
      url: '/api/cards',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {
      //console.log("Card Created!");
      //console.log(response.data);
    }, function errorCallback(errorResponse) {
      // console.log("Could not save card");
      // console.log(errorResponse);
      // console.log(errorResponse.data);
    });

  };
}
