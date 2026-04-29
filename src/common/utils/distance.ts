import { isNilOrEmpty } from '..';
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

export const isAddressMatched = (minDistance: number, coor1: LatLngLiteral, coor2?: LatLngLiteral): boolean => {
  if (isNilOrEmpty(coor2)) {
    return false;
  }

  const distance = getDistanceFromLatLonInMeters(coor1.lat, coor1.lng, coor2.lat, coor2.lng);
  // compare the event geolocation and the user address geocode (within 100m)
  return distance <= minDistance ? true : false;
};

export const getDistanceFromLatLonInMeters = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  // Just a formula so shut up eslint :)
   
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
   
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  const result = toMeters(d);
  return result;
};

export const deg2rad = (deg: number): number => {
  // Just a formula so shut up eslint :)
   
  return deg * (Math.PI / 180);
};

export const toMeters = (km: number): number => {
  // Just a formula so shut up eslint :)
   
  return km * 1000;
};
