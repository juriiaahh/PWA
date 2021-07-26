import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
 
let favoriteRestaurants = [];
 
const FavoriteRestaurantArray = {
 
  getRestaurant(id) {
    if (!id) {
      return;
    }
 
    return favoriteRestaurants.find((Restaurant) => Restaurant.id == id);
  },
 
  getAllRestaurants() {
    return favoriteRestaurants;
  },
 
  putRestaurant(Restaurant) {
    if (!Restaurant.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getRestaurant(Restaurant.id)) {
      return;
    }
 
    favoriteRestaurants.push(Restaurant);
  },
 
  deleteRestaurant(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestaurants = favoriteRestaurants.filter((Restaurant) => Restaurant.id != id);
  },
};
 
describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurants = []);
 
  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});