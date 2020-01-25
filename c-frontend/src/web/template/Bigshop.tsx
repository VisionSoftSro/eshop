import '../assets/style.css';
import 'react-toastify/dist/ReactToastify.css';

// @ts-ignore
import '../assets/js/default/classy-nav.min.js';
import * as BigShop from '../assets/js/default/active.js';

export const init = () => {
  BigShop.initBigShop();
};