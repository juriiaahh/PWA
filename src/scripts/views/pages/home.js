/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="hero">
            <div class="hero-inner">
                <h1 class="hero_title">You Hungry</h1>
                <p class="hero_tagline">
                Enjoy your relaxing time at our Restaurant.
                </p>
            </div>
        </div>
        <section id="content" class="content">
            <h1 class="content-heading">Explore Restaurant</h1>
            <div id="restaurants" class="restaurants"></div>
        </section>
        `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.restaurantsList();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
