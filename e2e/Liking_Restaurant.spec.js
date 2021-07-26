const assert = require('assert');

Feature('Liking Restaurant');

Before(() => {
    const { I } = inject();
    I.amOnPage('/#/favorite');
  });
  
  Scenario('showing empty liked restaurants', () => {
    const { I } = inject();
    I.seeElement('#query');
    I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
  });
  
  Scenario('liking one restaurant', async () => {
    const { I } = inject();
    I.see("Restaurant tidak ditemukan", ".restaurant-item__not__found");
    I.amOnPage("/");
  
    I.seeElement("restaurant-title a");
    const firstRestaurant = locate('.restaurant-title a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
  
    I.seeElement('#likeButton');
    I.click('#likeButton');
  
    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant-item');
    const firstLikedRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  
    assert.strictEqual(firstRestaurantTitle, firstLikedRestaurantTitle);
  });
  
  Scenario('searching restaurants', async () => {
    const { I } = inject();
    I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
  
    I.amOnPage('/');
  
    I.seeElement('.restaurant-title');
  
    const titles = [];
  
    for (let i = 1; i <= 3; i++) {
      I.click(locate('.restaurant-title').at(i));
      I.seeElement('#likeButton');
      I.click('#likeButton');
      titles.push(await I.grabTextFrom('.restaurant-title'));
      I.amOnPage('/');
    }
  
    I.amOnPage('/#/favorite');
    I.seeElement('#query');
  
    const searchQuery = titles[1].substring(1, 3);
    const matchingRestaurants = titles.filter(
      (title) => title.indexOf(searchQuery) !== -1,
    );
  
    I.fillField('#query', searchQuery);
    I.pressKey('Enter');
  
    const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
      '.restaurant-item',
    );
    assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);
  
    matchingRestaurants.forEach(async (title, index) => {
      const visibleTitle = await I.grabTextFrom(
        locate('.restaurant-title').at(index + 1),
      );
      assert.strictEqual(title, visibleTitle);
    });
  });
  