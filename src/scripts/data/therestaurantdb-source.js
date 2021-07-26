/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async restaurantsList() {
    const response = await fetch(API_ENDPOINT.RESTAURANTS_LIST);

    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default TheRestaurantDbSource;
