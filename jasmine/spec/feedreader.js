/* feedreader.js
 * Spec file for testing code in app.js file
 */
$(function() {
    describe('RSS Feeds', function() {
        /*
         * Test suite to ensure allFeeds variable is defined
         * and not empty.
         */
         it('are defined', function() {                       //Declaration of test
            expect(allFeeds).toBeDefined();                   //Is the array allFeeds actually defined?
            expect(allFeeds.length).not.toBe(0);              //Is the allFeeds array populated with elements?
        });
        /* Test loops through each feed.  Ensure each url
         * is defined and not empty
         */
         it('URLs are defined and not empty.', function() {   //Declaration of test
          for(var i = 0; i < allFeeds.length; i++) {          //for loop--loops through allFeeds array
            expect(allFeeds[i].url).toBeDefined();            //Is each url element defined?
            expect((allFeeds[i].url).length).not.toBe(0);     //Are the urls NOT empty?
          }
         });
        /* Test loops through each feed.  Ensure each name
         * is defined and not empty
         */
         it('Names are defined and not empty.', function() {  //Declaration of test
          for(var i = 0; i < allFeeds.length; i++) {          //for Loop--Loops through allFeeds aray
            expect(allFeeds[i].name).toBeDefined();           //Is each name element defined?
            expect((allFeeds[i].name).length).not.toBe(0);    //Are the name elements NOT empty?
          }
         });
    });

    /* New test suite used to test funcitonality of menu in webpage */
    describe('The menu', function() {                         //Declaration of new test suite

       /* Test ensures the menu element is hidden by default*/
       it('Menu is hidden by default', function() {           //Declaration of new test
         var body = $('body');                                //Links var bady to its declaration in app.js
         expect(body.hasClass('menu-hidden')).toBe(true);     //At page load does body have class menu-hidden?
       });
       /* Test ensures menu Visibility alternates between visible and hidden when clicked
        */
       it('Visibility toggles on and off', function() {       //Declaration of new test
         var body = $('body');                                //Variable linked to body as defined in app.js
         var menuIcon = $('.menu-icon-link');                 //Variable linked to the menu icon
         menuIcon.trigger('click');                           //trigger used with 'click' to initiate a click on the menu icon
         expect(body.hasClass('menu-hidden')).toBe(false); //trigger click changes state to visibile--'menu-hidden' should NOT be present
         menuIcon.trigger('click');                        //trigger used with 'click' to initiate a click on the menu icon
         expect(body.hasClass('menu-hidden')).toBe(true); //trigger click changes state to hidden--'menu-hidden' SHOULD be present
        });
      });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {                //Declaration of new Test Suite
      /* Tests whether single element is loadded itno  .feed container*/
      beforeEach(function(done) {                           //Asynchronous will require use of before each and done
            loadFeed(0, done);                              //app.js function which loads assumed defined elements to allFeeds--done included in function call                                             //Tell test suite this stage is completed.
        });

      it('At least a single .entry elemnt exist within .feed when loadFeed completes', function(done) { //Declaration of new test
        var feedEntryLength = $('.feed .entry').length      //variable linked to length property of html element bearing parent-child classes of .feed .entry
        expect(feedEntryLength).toBeGreaterThan(0);         //Test checks if the entry has been succesfully loaded and thereby of length greater than zero
        done();                                             //Tell test suite this stage is completed
        });
    });

    /* New test suite targeting chaning <h1> content */
    describe('New Feed Selection', function() {             //Declaration of new Test Suite
      /* Test ensures content in <h1> tags is actually changing
       */
       var originalContent;                                //Variable representing any initial value loaded--Test for changed value made against this state
       var newContent;                                     //Variable representing any new value loaded--Compared to previous state to ensure value was updated
       beforeEach(function (done) {
         loadFeed(0, function () {                        //Nested Async Func layer 1--Loads first element by way of loadFeed()
                originalContent = $('.feed').text();      //Defines first test value with data loaded at layer 1 of loadFeed() call
                loadFeed(1, function () {                 //Nested Async func layer 2--Loads second element by way of LoadFeed()
                    newContent = $('.feed').text();       //Defines second test avlue with data Loaded at Layer 2 of LoadFeed() call
                    done();                               //Tell test suite this stage is completed
                });
            });

        });
        it('Content changes when new feed loads', function(done) { //Decalre new test
          expect(originalContent).not.toBe(newContent);     //Test whether <h1> tag updated based upon value of testPass variable
          done();                                           //Tell test sutie thsi stage is completed
        });
    });
}());
