/* eslint-disable linebreak-style */
/* eslint-disable no-useless-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
 
const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    await runtime.register();
    return;
  }
};
 
export default swRegister;
