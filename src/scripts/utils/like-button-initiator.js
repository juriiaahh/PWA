/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line linebreak-style
import FavoriteRestaurantIdb from '../data/favorite-restaurant-db';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant, favoriteRestaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoritesRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    
    if (await this._isrestaurantExist(id)) {
      
      this._renderLiked();
    } else {
      
      this._renderLike();
    }
  },
  
  async _isrestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    // return restaurant;
    // const restaurant = await this._favoritesRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      // await this._favoritesRestaurant.putRestaurant(this._restaurant);
    
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();
    
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      // await this._favoritesRestaurant.deleteRestaurant(this._restaurant.id);
 
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
