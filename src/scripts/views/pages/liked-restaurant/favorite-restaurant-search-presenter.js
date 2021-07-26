/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurants, view }) {
      this._view = view;
      this._listenToSearchRequestByUser();
      this._favoriteRestaurants = favoriteRestaurants;
    }
  
    _listenToSearchRequestByUser() {
      this._view.runWhenUserIsSearching((latestQuery) => {
        this._searchRestaurants(latestQuery);
      });
    }
  
    async _searchRestaurants(latestQuery) {
      this._latestQuery = latestQuery.trim();
  
      let foundRestaurants;
      if (this.latestQuery.length > 0) {
        // eslint-disable-next-line indent
        foundRestaurants = await this._favoriteRestaurants.searchRestaurants(
          this.latestQuery,
        );
      } else {
        foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
      }
  
      this._showFoundRestaurants(foundRestaurants);
    }
  
    _showFoundRestaurants(restaurants) {
      this._view.showFavoriteRestaurants(restaurants);
    }
  
    get latestQuery() {
      return this._latestQuery;
    }
  }
  
  // eslint-disable-next-line eol-last
  export default FavoriteRestaurantSearchPresenter;