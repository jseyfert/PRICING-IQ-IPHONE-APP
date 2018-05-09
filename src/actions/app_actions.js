//fix SocketRocket: In debug mode.  Allowing connection to any root cert

import firebase from 'firebase';
import parseDomain from 'parse-domain';
import validator from 'validator';
import _ from 'lodash';

import {
  ITEM_CHANGED,
  AMAZON_PRICE_CHANGED,
  THIRD_PARTY_PRICE_NEW_CHANGED,
  THIRD_PARTY_PRICE_USED_CHANGED,

  URL_TRACKED,
  ASIN_TRACKED,
  AMAZON_PRICE_TRACKED,
  THIRD_PARTY_PRICE_NEW_TRACKED,
  THIRD_PARTY_PRICE_USED_TRACKED,

  TRACK_ITEM_SUCCESS,
  TRACK_ITEM_ERROR,
 } from './types'

 export const detailUrlChanged = (text) => {
   return {
     type: ITEM_CHANGED,
     payload: text
   };
 };
 export const amazonPriceChanged = (text) => {
   return {
     type: AMAZON_PRICE_CHANGED,
     payload: text
   };
 };
 export const thirdPartyNewChanged = (text) => {
   return {
     type: THIRD_PARTY_PRICE_NEW_CHANGED,
     payload: text
   };
 };
 export const thirdPartyUsedChanged = (text) => {
   return {
     type: THIRD_PARTY_PRICE_USED_CHANGED,
     payload: text
   };
 };

export const removeItem = (userLocal) => async dispatch => {
  await firebase.database().ref('users/' + userLocal.uid).remove()
  // finish remove item
}

export const startTrackingButton = ({
  item, priceAmazon, priceThirdNew, priceThirdUsed, userLocal
}) => async dispatch => {

  if (_.isNull(item)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
  }

  if (_.isNull(priceAmazon) && _.isNull(priceThirdNew) && _.isNull(priceThirdUsed)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'You must enter at least one price to track!' });
  }

  if ( _.isNull(priceAmazon) === false && isNaN(priceAmazon)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'Amazon price is not valid!' });
  }

  if ( _.isNull(priceThirdNew) === false && isNaN(priceThirdNew)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: '3rd Party New price is not valid!' });
  }

  if ( _.isNull(priceThirdUsed) === false && isNaN(priceThirdUsed)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: '3rd Party Used price is not valid!' });
  }

  item = item.trim()
  const isUrl = parseDomain(item);
  const re = /^\w{7,13}$/i;
  const isAsin = item.match(re);

  if (isUrl) {
    const isAmazon = isUrl.domain === 'amazon'
    if (isAmazon) {
      firebase.database().ref('users/' + userLocal.uid).set({
        url_t: item,
        asin_t: null,
        priceAmazon_t: priceAmazon,
        priceThirdNew_t: priceThirdNew,
        priceThirdUsed_t: priceThirdUsed,
      });
      dispatch({ type: TRACK_ITEM_SUCCESS });
      dispatch({ type: URL_TRACKED, payload: item });
      dispatch({ type: AMAZON_PRICE_TRACKED, payload: priceAmazon });
      dispatch({ type: THIRD_PARTY_PRICE_NEW_TRACKED, payload: priceThirdNew });
      dispatch({ type: THIRD_PARTY_PRICE_USED_TRACKED, payload: priceThirdUsed });

    } else {
      dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
    }
  } else if (isAsin) {
    firebase.database().ref('users/' + userLocal.uid).set({
      url_t: null,
      asin_t: item,
      priceAmazon_t: priceAmazon,
      priceThirdNew_t: priceThirdNew,
      priceThirdUsed_t: priceThirdUsed,
    });
    dispatch({ type: TRACK_ITEM_SUCCESS });
    dispatch({ type: ASIN_TRACKED, payload: item });
    dispatch({ type: AMAZON_PRICE_TRACKED, payload: priceAmazon });
    dispatch({ type: THIRD_PARTY_PRICE_NEW_TRACKED, payload: priceThirdNew });
    dispatch({ type: THIRD_PARTY_PRICE_USED_TRACKED, payload: priceThirdUsed });
  } else {
    dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
  }
}
