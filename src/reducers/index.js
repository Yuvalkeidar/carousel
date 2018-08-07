import { combineReducers } from 'redux';
import carouselReducer from './carouselContainer_reducer';

const rootReducer = combineReducers({
  images:carouselReducer
});

export default rootReducer;
