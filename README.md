# Angular Flash Cards

Interactive flash cards to help you study written in AngularJS. 

* Angular 1.6 (AngularJS)
* SASS
* NodeJS / Express web server
* HTML5

## How to use this repo
1. Clone the repo to your local directory
2. Install dependencies by running `npm install`
3. Make sure you have nodemon installed by running `npm install -g nodemon`
4. Start server by running `nodemon server.js`
5. Open browser to http://localhost:3000


**This project uses ejs for templating:**
* You can update the main view by editing `views/page/index.ejs`
* Stylesheets are loaded in `views/partials/header.ejs`
* `app.js` and `angular.js` script tags are located in `views/partials/footer.ejs`

**About the AngularJS application**
* controllers are located in `src/app/controllers`
* modules are located in `src/app/modules`
* `app.js` is located in `src/app` root folder and references all aspects of the Application

**Grunt**

Grunt compiles JavaScript and SCSS files to our `public_html` folder. To track changes actively open a new console window and run `grunt watcher` (This requires you to be in the angular_flash_cards root directory).
