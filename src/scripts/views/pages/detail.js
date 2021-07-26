/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-db';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
     // lazy load font awesome
     let scriptElement = document.querySelector(
      'script[src="https://use.fontawesome.com/b070c8f1df.js"]',
    );

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://use.fontawesome.com/b070c8f1df.js';
      document.body.appendChild(scriptElement);
    }

    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);

    const restaurantContainer = document.querySelector('#restaurant');

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      FavoriteRestaurantIdb: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        city: restaurant.restaurant.city,
        rating: restaurant.restaurant.rating,
        pictureId: restaurant.restaurant.pictureId,
      },
    });
  },
};

export default Detail;
