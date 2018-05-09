import {
  DETAIL_URL_CHANGED,
  AMAZON_PRICE_CHANGED,
  THIRD_PARTY_PRICE_NEW_CHANGED,
  THIRD_PARTY_PRICE_USED_CHANGED,
  TRACK_ITEM_SUCCESS,
  TRACK_ITEM_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  itemToTrack: null,
  itemTracking: null,

  desiredPriceAmazon: null,
  desiredPriceThirdNew: null,
  desiredPriceThirdUsed: null,

  appError: null,
};

export default function(state = INITIAL_STATE, action) {
    console.log('action in APP_REDUCER=', action);

    switch (action.type) {

      case DETAIL_URL_CHANGED:
        return { ...state, itemToTrack: action.payload };
      case AMAZON_PRICE_CHANGED:
        return { ...state, desiredPriceAmazon: action.payload };
      case THIRD_PARTY_PRICE_NEW_CHANGED:
        return { ...state, desiredPriceThirdNew: action.payload };
      case THIRD_PARTY_PRICE_USED_CHANGED:
        return { ...state, desiredPriceThirdUsed: action.payload };

      case TRACK_ITEM_ERROR:
        return { ...state, appError: action.payload};
      case TRACK_ITEM_SUCCESS:
        return { ...state, itemTracking: action.payload, appError: null };

      default:
        return state;

    }
}
