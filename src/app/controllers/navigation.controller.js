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
    'heading': 'Create Deck',
    'titleTag': 'Create your own flash card deck',
    'link': 'https://flashcardquiz.com',
    'action': function () {
      ctrl.showAddCardInterface();
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
