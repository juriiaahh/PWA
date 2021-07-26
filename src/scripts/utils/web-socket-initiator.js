/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const restaurant = JSON.parse(message.data);
    console.log(restaurant);
    // eslint-disable-next-line no-trailing-spaces
    
    NotificationHelper.sendNotification({
      name: `${restaurant.title} is on your city!`,
      options: {
        body: restaurant.overview,
        image: `${CONFIG.BASE_IMAGE_URL + restaurant.poster_path}`,
      },
    });
  },
};

export default WebSocketInitiator;
