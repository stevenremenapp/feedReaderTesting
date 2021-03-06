// Run tests when the DOM is ready
$(function() {

    // Tests related to RSS Feeds

    describe('RSS Feeds', function() {
        // Test to ensure allFeeds variable is defined and not empty
        it('allFeeds should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test to ensure that all feed URLs are defined and not empty
        it('each feed URL within allFeeds should be defined', function() {
            allFeeds.forEach(function(feed) {
                // console.log(feed);
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });


        // Test to ensure that all feed names are defined and not empty
        it('each feed name within allFeeds should be defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    // Tests related to the nav menu

    describe('The menu', function() {
        let body;

        beforeEach(function() {
            body = document.querySelector('body');
        });

        // Test to ensure the menu is hidden by default
        it('should be hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        // Test to ensure that the menu opens and closes when clicked
        it('should change visibility when clicked', function() {
            let menu = document.querySelector('.menu-icon-link');
            // Open menu and test
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // Close menu and test
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // Test to make sure initial feed entries are completed when loadFeed runs

    describe('Initial Entries', function() {

        // Async!
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should load at least one entry', function(done) {
            let feedEntries = document.querySelector('.feed').querySelectorAll('.entry');
            // console.log(feedEntries);
            expect(feedEntries.length).toBeGreaterThan(0);
            done();
        });
    });

    // Test to ensure that the feed changes when a new source is requested

    describe('New Feed Selection', function() {
        let firstFeed,
            secondFeed;

        beforeEach(function(done) {
            //Changing id of feed changes the feed that's loaded
            loadFeed(0, function() {
                // Grab the article titles from first loaded feed
                firstFeed = document.querySelector('.feed').innerText;
                // console.log(firstFeed);
                loadFeed(3, function() {
                    // Grab the article titles from last loaded feed
                    secondFeed = document.querySelector('.feed').innerText;
                    // console.log(secondFeed);
                    done();
                });
            });            
        });

        it('should change content upon reloading feed', function(done) {
            expect(firstFeed).not.toMatch(secondFeed);
            done();
        });
    }); 
}());
