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
