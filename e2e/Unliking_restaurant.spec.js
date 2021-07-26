const assert = require('assert');

Feature('Unliking Restaurants');

Before(() => {
  const { I } = inject();
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', () => {
  const { I } = inject();
  I.seeElement('#query');
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
});

Scenario('unliking one restaurant', async () => {
  const { I } = inject();
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const firstLikedRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  assert.strictEqual(firstRestaurantTitle, firstLikedRestaurantTitle);
  I.click(firstRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
});
