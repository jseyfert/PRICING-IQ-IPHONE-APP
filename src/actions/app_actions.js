//fix SocketRocket: In debug mode.  Allowing connection to any root cert

import firebase from 'firebase';
import parseDomain from 'parse-domain';
import validator from 'validator';
import _ from 'lodash';

import {
  DETAIL_URL_CHANGED,
  AMAZON_PRICE_CHANGED,
  THIRD_PARTY_PRICE_NEW_CHANGED,
  THIRD_PARTY_PRICE_USED_CHANGED,
  TRACK_ITEM_SUCCESS,
  TRACK_ITEM_ERROR,
 } from './types'

 export const detailUrlChanged = (text) => {
   return {
     type: DETAIL_URL_CHANGED,
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

export const startTrackingButton = ({
  itemToTrack, desiredPriceAmazon, desiredPriceThirdNew, desiredPriceThirdUsed, userLocal
}) => async dispatch => {

  if (_.isNull(itemToTrack)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
  }

  if (_.isNull(desiredPriceAmazon) && _.isNull(desiredPriceThirdNew) && _.isNull(desiredPriceThirdUsed)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'You must enter at least one price to track!' });
  }

  if ( _.isNull(desiredPriceAmazon) === false && isNaN(desiredPriceAmazon)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'Amazon price is not valid!' });
  }

  if ( _.isNull(desiredPriceThirdNew) === false && isNaN(desiredPriceThirdNew)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: '3rd Party New price is not valid!' });
  }

  if ( _.isNull(desiredPriceThirdUsed) === false && isNaN(desiredPriceThirdUsed)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: '3rd Party Used price is not valid!' });
  }

  itemToTrack = itemToTrack.trim()
  const isUrl = parseDomain(itemToTrack);
  const re = /^\w{7,13}$/i;
  const isAsin = itemToTrack.match(re);

  if (isUrl) {
    const isAmazon = isUrl.domain === 'amazon'
    if (isAmazon) {

      console.log('is Amazon URL');
      firebase.database().ref('users/' + userLocal.uid).set({
        urlsToTrack: itemToTrack,
        asinsToTrack: null,
        desiredPriceAmazon: desiredPriceAmazon,
        desiredPriceThirdNew : desiredPriceThirdNew,
        desiredPriceThirdUsed : desiredPriceThirdUsed,
      });
      dispatch({ type: TRACK_ITEM_SUCCESS, payload: itemToTrack });

    } else {
      dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
    }
  } else if (isAsin) {

    console.log('is isAsin');
    firebase.database().ref('users/' + userLocal.uid).set({
      urlsToTrack: null,
      asinsToTrack: itemToTrack,
      desiredPriceAmazon: desiredPriceAmazon,
      desiredPriceThirdNew : desiredPriceThirdNew,
      desiredPriceThirdUsed : desiredPriceThirdUsed,
    });
    dispatch({ type: TRACK_ITEM_SUCCESS, payload: itemToTrack });

  } else {
    dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
  }
}
