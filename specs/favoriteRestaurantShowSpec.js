import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-db';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const FavoriteRestaurantIdb = spyOnAllFunctions(FavoriteRestaurant);

      new FavoriteRestaurantShowPresenter({
        view,
        FavoriteRestaurantIdb,
      });

      expect(FavoriteRestaurantIdb.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length,
          ).toEqual(1);

          done();
        });

      const FavoriteRestaurantIdb = spyOnAllFunctions(FavoriteRestaurant);
      FavoriteRestaurantIdb.getAllRestaurants.and.returnValues([]);

      new FavoriteRestaurantShowPresenter({
        view,
        FavoriteRestaurantIdb,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            2,
          );
          done();
        });

      const FavoriteRestaurantIdb = spyOnAllFunctions(FavoriteRestaurant);
      FavoriteRestaurantIdb.getAllRestaurants.and.returnValues([
        {
          id: 11,
          name: 'A',
          vote_average: 3,
          overview: 'Sebuah restaurant A',
        },
        {
          id: 22,
          name: 'B',
          vote_average: 4,
          overview: 'Sebuah restaurant B',
        },
      ]);

      new FavoriteRestaurantShowPresenter({
        view,
        FavoriteRestaurantIdb,
      });
    });
  });
});
