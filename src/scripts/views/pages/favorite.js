/* eslint-disable linebreak-style */
/* eslint-disable no-new */
/* eslint-disable linebreak-style */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-db';
import FavoriteRestaurantSearchView from './liked-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    // return `
    //     <section id="content" class="content">
    //         <h1 class="content-heading">Favorite Restaurant</h1>
    //         <div id="restaurants" class="restaurants"></div>
    //     </section>
    //     `;
    return view.getTemplate();
  },

  async afterRender() {
    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    // const restaurantsContainer = document.querySelector('#restaurants');
    // restaurants.forEach((restaurant) => {
    //   restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    // });

    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
  },
};

export default Favorite;
