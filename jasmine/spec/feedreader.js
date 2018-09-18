/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
         it('are defined', function() {                       //Declaration of test
            expect(allFeeds).toBeDefined();                   //Is the array allFeeds actually defined?
            expect(allFeeds.length).not.toBe(0);              //Is the allFeeds array populated with elements?
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined and not empty.', function() {   //Declaration of test
          for(var i = 0; i < allFeeds.length; i++) {          //for loop--loops through allFeeds array
            expect(allFeeds[i].url).toBeDefined();            //Is each url element defined?
            expect(allFeeds[i].url).not.toBeNull();           //Are the urls NOT empty?
          }
         });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined and not empty.', function() {  //Declaration of test
          for(var i = 0; i < allFeeds.length; i++) {          //for Loop--Loops through allFeeds aray
            expect(allFeeds[i].name).toBeDefined();           //Is each name element defined?
            expect(allFeeds[i].name).not.toBeNull();          //Are the name elements NOT empty?
          }
         });
    });
        /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {                         //Declaration of new test suite
        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
       it('Menu is hidden by default', function() {           //Declaration of new test
         var body = $('body');                                //Links var bady to its declaration in app.js
         expect(body.hasClass('menu-hidden')).toBe(true);     //At page load does body have class menu-hidden?
       });
       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
       it('Visibility toggles on and off', function() {       //Declaration of new test
         var body = $('body');                                //Links var body to its delcaration in app.js
         var counter = 0;                                     //Initialization of a counter for clicks
         var menuClicked = document.getElementsByClassName('menu-icon-link'); //Links variable to menu icon declaration in app.js
         if(menuClicked.clicked === true) {                   //Has the user clicked the manue icon on the html page?
           ++counter;                                         //Incriment counter once for each click of the icon
         }
         if(counter % 2 === 0) {                              //Checks whether menu icon was clicked in multiples of 2--On and then off
           expect(body.hasClass('menu-hidden')).toBe(true);   //If clicked in multiple of 2 menu should be returned to hidden and have class menu-hidden
         } else {
           expect(body.hasClass('menu-hidden')).toBe(false);  //Menu clicked into open position-- the class menu-hidden should not be present.
         }
       });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {                //Declaration of new Test Suite
      /* TODO: Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
      beforeEach(function(done) {                           //Asynchronous will require use of before each and done
            loadFeed(0);                                    //app.js function which loads assumed defined elements to allFeeds
            done();                                         //Tell test suite this stage is completed.
        });

      it('At least a single .entry elemnt exist within .feed when loadFeed completes', function(done) { //Declaration of new test
        var entry = document.getElementsByClassName('entry'); //Link variable to class name
        var feed = $('.feed');                              //Link variable to class as defined in app.js
        expect(feed).not.toBeNull();                        //Has loadFeed(0) placed an entry into its container?
        expect(entry).not.toBeNull();                       //Is that entry NOT null?
        done();                                             //Tell test suite this stage is completed
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {             //Declaration of new Test Suite
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
        var currentContent = document.getElementsByClassName('header-title'); //Link variable to element with class name header-title, contains header info from loadFeed()
            //Must compare data loaded into the page before and after each user clicks links
        var originalContent;                                //Variable representing any initial value loaded--Test for changed value made against this state
        var newContent;                                     //Variable representing any new value loaded--Compared to previous state to ensure value was updated
        var testPass;                                       //Variable will be used as a Boolean to ascertain whether <h1> header element is changing
        beforeEach(function(done){                          //Asynchronous function requires use of beforeEach() function to check the value of informaiton loaded to the <h1> tag before the next information is loaded
          loadFeed(0);                                      //app.js function which loads assumed defined elements to allFeeds
          originalContent = currentContent[0].innerText;    //Instantiate the variable with the loaded value in the <h1> tag which was loaded by loadFeed();
          done();                                           //Tell test suite this stage is completed
        });
            //Data must now be re-evalutated after a new load is initiated
        afterEach(function(done){                           //Asynchronous function will require use of afterEach() to check value of data after changes are initiated
          newContent = currentContent[0].innerText;         //Instantiate the variable with the loadded value in the <h1> tag which was loaded by loadFeed() after a change
          done();                                           //Tell test suite this stage is completed
        });

        it('Content changes when new feed loads', function(done) { //Decalre new test
          if(originalContent === newContent){               //Check if the value of <h1> tag was updated--If equal the test failed
            testPass = false;                               //Test failed--Set test pass parameter to false
          } else {
            testPass = true;                                //If values are different test passed--Set test pass parameter to true
          }
          expect(testPass).toBe(true);                      //Test whether <h1> tag updated based upon value of testPass variable
          done();                                           //Tell test sutie thsi stage is completed
        });
    });
}());
