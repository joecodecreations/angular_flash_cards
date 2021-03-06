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
require('./services/retrieve.service.js');
//add card form validation reset
require('./services/resetValidation.service.js');


/* Custom Directives */
require('./directives/insertCard.directive.js');

},{"./controllers/flashcards.controller.js":2,"./controllers/navigation.controller.js":3,"./directives/insertCard.directive.js":4,"./modules/app.module.js":5,"./services/card.service.js":6,"./services/resetValidation.service.js":7,"./services/retrieve.service.js":8,"./services/updateCards.service.js":9}],2:[function(require,module,exports){
flashCardsController.$inject = ["$scope", "$http", "retrieve", "card", "resetValidationService", "updateCards"];
angular.module('app').controller('flashcards', flashCardsController);

function flashCardsController($scope, $http, retrieve, card, resetValidationService, updateCards) {
  var ctrl = $scope;

  /* Default states */
  //  ctrl.quizTitle = "Front End Web Development";
  ctrl.currentQuestion = 0; // Holds current question we are on
  ctrl.flip = false; // Holds bool for flipped card
  ctrl.firstcard = true; // Is this the first card ? (blank back etc)
  ctrl.addCardShow = false;
  ctrl.mainWindow = false; //card deck preview
  ctrl.introCompleted = false;
  ctrl.showCardHeader = false;

  /*Adding a new Card */
  ctrl.cardAdded = false;
  ctrl.finished = false; //have we saved the data / also shows the final form.
  ctrl.hideButtons = true; // do buttons show

  /* Form max and mins */
  ctrl.subjectLength = 26;
  ctrl.answerLength = 250;
  ctrl.questionLength = 250;
  ctrl.minCharacters = 10; //min form input chrt count
  ctrl.maxCharactersSubject = 26;
  ctrl.alexaButtonState = "off";
  ctrl.questionoranswer = "Question"; //we always start off on a question
  ctrl.alexaBoolean = false;

  ctrl.editCard = function () {
    ctrl.liveEdit = true;
    //flip == false //question
    //flip == true //answer

    //add in latest answer and question
    ctrl.updatedAnswer = ctrl.answer;
    ctrl.updatedQuestion = ctrl.question;
    if (ctrl.flip) {
      //focus('liveEditAnswer');
    } else {
      //focus('liveEditQuestion');
    }


  };

  ctrl.doneEditing = function () {
    ctrl.liveEdit = false;
    // console.log('curr q' + ctrl.currentQuestion);
    // console.log("Question:" + questions[ctrl.currentQuestion - 1].answer);
    if (ctrl.flip) {
      questions[ctrl.currentQuestion - 1].answer = ctrl.updatedAnswer;
      ctrl.answer = ctrl.updatedAnswer;
      ctrl.questionOranswer = 'Answer';
    } else {
      questions[ctrl.currentQuestion - 1].question = ctrl.updatedQuestion;
      ctrl.question = ctrl.updatedQuestion;
      ctrl.questionOranswer = 'Question';
    }
  };
  ctrl.alexaButtonToggle = function () {
    if (ctrl.alexaButtonState == "off") {
      ctrl.alexaButtonState = "on";
      ctrl.alexaBoolean = true;
      ctrl.alexa = true;
    } else {
      ctrl.alexaButtonState = "off";
      ctrl.alexaBoolean = false;
      ctrl.alexa = false;
    }
  };
  //check for cards previously saved


  /* Navigation Button Functions */

  function closePopoverWindows() {
    console.log("closing popover");
    ctrl.popoverAlexa = false;
    ctrl.popoverShareCards = false;
    ctrl.popoverWindow = false;
    ctrl.popoverGiveFeedback = false;
    ctrl.popoverAbout = false;

  }

  ctrl.openContact = function () {
    console.log("contact");
    closePopoverWindows();
    ctrl.popoverWindow = true;
    ctrl.popoverGiveFeedback = true;
  };

  ctrl.openAlexa = function () {
    closePopoverWindows();
    ctrl.popoverAlexa = true;
    ctrl.popoverWindow = true;
  };
  ctrl.openShare = function () {
    closePopoverWindows();
    ctrl.popoverShareCards = true;
    ctrl.popoverWindow = true;
  };
  ctrl.openAbout = function () {
    closePopoverWindows();
    ctrl.popoverWindow = true;
    ctrl.popoverAbout = true;
  };



  ctrl.sendEmail = function () {
    ctrl.messageSent = true;
    var emailInfo = {
      email: ctrl.email,
      name: ctrl.name,
      message: ctrl.message
    }
    $http({
      method: 'POST',
      url: '/sendData',
      data: emailInfo,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {


    }, function errorCallback(errorResponse) {
      console.log("mail not sent");
      //console.log(errorResponse);
      //console.log(errorResponse.data);
    });
  }



  ctrl.buttonChange = "Ready?";

  ctrl.buttonHover = function () {
    ctrl.buttonChange = "GO!";
  };

  ctrl.buttonHoverOff = function () {
    ctrl.buttonChange = "Ready?";
  };

  function closeAllWindows() {
    ctrl.introductionCompletedTwo = true; //intro page
    ctrl.finished = false; //final page
    ctrl.shareWindow = false; // share this deck
    ctrl.addCardShow = false; //add card form

  }

  function hidePopContent(showThisSection) {
    ctrl.popoverWindow = true;
    //hide all
    ctrl.popoverAlexa = false;
    ctrl.popoverGiveFeedback = false;
    ctrl.popoverShareCards = false;
    //show only this
    ctrl[showThisSection] = true;

  }


  function createRoute(date) {
    /*take current time, base 64 it three times to get the output */
    var d = new Date();
    var n = d.getTime();
    var base = base64Encode(base64Encode(base64Encode(n)));
    var output = base.substring(0, base.length - 2);
    return output;
  }


  function base64Encode(input) {
    return btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }


  /* set the questions and categories */
  var questions = [];
  retrieve.deck($scope, questions);
  /* Closes Card Added! and allows additional input */
  ctrl.addAnotherCard = function () {

    ctrl.cardAdded = false;
  };

  /* Closes Card Added! and allows additional input */
  ctrl.returnToDeck = function () {
    ctrl.closeWindow();
  };

  ctrl.mobileMenuOpen = function () {
    ctrl.ShowMobileMenu = true;
  };

  ctrl.mobileMenuClose = function () {
    ctrl.ShowMobileMenu = false;
  };

  /* Shows Interface for Adding New Cards */
  ctrl.showAddCardInterface = function () {
    closeAllWindows();
    ctrl.addCardShow = true;
    ctrl.mainWindow = false;
  };

  ctrl.ready = function () {
    closeAllWindows();
    ctrl.introductionCompletedTwo = true;
    ctrl.addCardShow = true;
  };

  function resetAddCardInputs() {
    // Reset Form Input Values
    ctrl.newQuestion = "";
    ctrl.newAnswer = "";
    ctrl.newCategory = "";
  }

  ctrl.getStarted = function () {
    ctrl.introCompleted = true;
    ctrl.hideButtons = false;
  };
  /* Grabs the next question in the list */
  card.nextQuestion($scope, questions);

  ctrl.showAnswerButton = function () {

    if (!ctrl.liveEdit) {
      ctrl.questionoranswer = "Answer"; //update to show we are on a question now
      ctrl.flip = true; //flip the card
      if (questions[ctrl.currentQuestion - 1]) {
        ctrl.answerquestionCategory = questions[ctrl.currentQuestion - 1].category;
        ctrl.answer = questions[(ctrl.currentQuestion - 1)].answer;
      }
    }
  };

  ctrl.nextQuestionButton = function () {
    ctrl.clickToFlip = true; //before showing second card erase flip card here word
    if (!ctrl.liveEdit) {
      ctrl.questionoranswer = "Question"; //update to show we are on a question now
      //Grab Next Card
      card.nextQuestion($scope, questions);
    }
  };

  ctrl.closeWindow = function () {
    updateCards.calculateQuestions($scope, questions);
    //Grab Next Question
    if (ctrl.currentQuestion === 0) {
      card.nextQuestion($scope, questions);
    }
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
    closeAllWindows();
    ctrl.hideCardCount = true; //hide X out of X cards
    ctrl.mainWindow = false;
    ctrl.addCardShow = false;
    ctrl.shareWindow = true; //show share window

  };

  function resetShareForm() {
    ctrl.AlexaError = false;
    ctrl.TitleError = false;
    ctrl.TitleErrorMessage = "";
    ctrl.AlexaErrorMessage = "";
  }

  function countWords(phrase) {
    var wordCount = 0;
    if (phrase) {
      wordCount = phrase.split(" ").length;
    }
    //console.log(wordCount);
    return wordCount;

  }

  ctrl.createDeck = function () {
    console.log("creating deck");
    if (ctrl.alexaPhrase) {
      ctrl.alexaPhrase = ctrl.alexaPhrase.toLowerCase();
    }
    resetShareForm();
    var validation = true;
    if (ctrl.deckTitle === null || ctrl.deckTitle === undefined || ctrl.deckTitle.length < 0) {
      validation = false;
      ctrl.TitleError = true;
      ctrl.TitleErrorMessage = "* Your title cannot be blank";
    }
    if (ctrl.alexa === true && (ctrl.alexaPhrase < 0 || ctrl.alexaPhrase === undefined)) {
      ctrl.AlexaError = true;
      validation = false;
      ctrl.AlexaErrorMessage = "* You must enter a phrase to use alexa";
    } else {
      if (ctrl.alexa === true) {

        if (countWords(ctrl.alexaPhrase) <= 2) {
          validation = false;
          ctrl.AlexaError = true;
          ctrl.AlexaErrorMessage = "* Alexa Phrase must use three or more words";
        } else {

          //check to see if we have numbers in our alexa phrase
          var matches = ctrl.alexaPhrase.match(/\d+/g);
          if (matches !== null) {
            validation = false;
            ctrl.AlexaError = true;
            ctrl.AlexaErrorMessage = "* Write numbers ex:10 becomes ten)";
          }

          //check for unwanted characters

          var matchedCharacters = ctrl.alexaPhrase.match(/[^a-zA-Z0-9 ]+/);
          if (matchedCharacters !== null) {
            console.log("this shit was found");
            validation = false;
            ctrl.AlexaError = true;
            ctrl.AlexaErrorMessage = "* Remove special characters - use only words";
          }

        }

      }

    }
    /* Check alexa name */
    //if we have an alexa phrase
    if (validation) {

      console.log("phrase:" + ctrl.alexaPhrase);

      $http({
        method: 'GET',
        url: '/api/alexa/phrases/' + ctrl.alexaPhrase,
        //data: deckInfo,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {

        if (response.data.message == "Deck Found") {
          ctrl.AlexaError = true;
          ctrl.AlexaErrorMessage = "* This Alexa Phrase Is Already In Use";
        } else {
          //alexa phrases didn't match so let's go ahead and save the deck

          var deckRoute = createRoute(); //create our custom route
          ctrl.deckRoute = deckRoute;
          deckInfo = {
            title: ctrl.deckTitle,
            route: deckRoute,
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
            closeAllWindows();
            console.log("Deck Saved");
            ctrl.finished = true; //show the finished screen
            ctrl.shareWindow = false; //hide the share this
            ctrl.hideButtons = true;
          }, function errorCallback(errorResponse) {
            console.log("error");
            console.log(errorResponse);
            console.log(errorResponse.data);
          });

        }
      });
    }

  };

}

},{}],3:[function(require,module,exports){
navigationController.$inject = ["$scope"];
angular.module('app').controller('navigation', navigationController);


function navigationController($scope) {
  var ctrl = $scope;

  ctrl.title = 'Flashcard Quiz';

  ctrl.navButtons = [{
      'heading': 'Add Card',
      'titleTag': 'Add a new card',
      'hide': function () {
        ctrl.cardsLoaded === true;
      },
      'show': function () {
        ctrl.hideButtons === false;
      },
      'action': function () {
        ctrl.showAddCardInterface();
      }
    },
    {
      'heading': 'Share Deck',
      'titleTag': 'Share this deck with friends',
      'hide': function () {
        ctrl.cardsLoaded === true;
      },
      'show': function () {
        ctrl.hideButtons === false;
      },
      'action': function () {
        ctrl.shareDeck();
      }
    }
  ];

  ctrl.navButtonsLoaded = [{
    'heading': 'Create a Deck',
    'titleTag': 'Create your own flash card deck',
    'link': 'https://flashcardquiz.com',
    'action': function () {

    }
  }];

  ctrl.navButtonsAlwaysPresent = [{
      'heading': 'About',
      'titleTag': 'Share this deck with friends',
      'hide': function () {

      },
      'show': function () {

      },
      'action': function () {
        ctrl.openAbout();
      }
    },
    {
      'heading': 'Contact Us',
      'titleTag': 'Contact us with questions or comments',
      'hide': function () {

      },
      'show': function () {

      },
      'action': function () {
        ctrl.openContact();
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
cardService.$inject = ["$http"];
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
retrieveService.$inject = ["$rootScope", "$location", "$http", "card", "updateCards"];
angular.module('app').service('retrieve', retrieveService);

function retrieveService($rootScope, $location, $http, card, updateCards) {

  var vm = this;

  /* Add a new card */
  vm.deck = function ($scope, questions) {
    var ctrl = $scope;
    //grab url in browser bar
    var url = $location.absUrl();
    //strip out url and get only oken
    var token = url.replace("https://flashcardquiz.com/", "");
    //token = url.replace("http://localhost:3000/", "");

    //if we have a token let's grab the data if any
    if (token) {
      //  console.log('grabbing units');
      //hit the API
      $http({
        method: 'GET',
        url: '/api/gather/' + token,
        //data: deckInfo,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        if (response.data.message === "success") {

          ctrl.questions = response.data.cards;
          ctrl.deckTitle = response.data.title;
          ctrl.backgroundColor = response.data.backgroundColor;
          ctrl.canSkipQuestions = response.data.canSkipQuestions;
          if (response.data.alexa !== "") {
            ctrl.alexaPhrase = response.data.alexa;
          }
          ctrl.route = token;
          //console.log(ctrl.questions);

          ctrl.introductionCompletedTwo = true; //intro page
          ctrl.finished = false; //final page
          ctrl.shareWindow = false; // share this deck
          ctrl.addCardShow = false; //add card form
          ctrl.mainWindow = true;
          ctrl.cardsLoaded = true; //

          //console.log(ctrl.questions);

          var data = response.data.cards;

          for (var i in data) {

            var newCard = {
              'question': data[i].question,
              'answer': data[i].answer,
              'category': data[i].category
            };
            questions.push(newCard);
          }
          updateCards.calculateQuestions($scope, questions);
          card.nextQuestion($scope, questions);

        }

      });

    } else {
      console.log("We had no token to process");
    }


  };

}

},{}],9:[function(require,module,exports){
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
