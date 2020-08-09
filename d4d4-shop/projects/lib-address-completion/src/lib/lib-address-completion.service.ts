/// <reference types="googlemaps"/>
import {Injectable} from '@angular/core';

export type AutocompletePrediction = google.maps.places.AutocompletePrediction;
export type AutocompletionRequest = google.maps.places.AutocompletionRequest;
export type PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;
export type PlaceResult = google.maps.places.PlaceResult;
export type PlacesServiceStatus = google.maps.places.PlacesServiceStatus;

@Injectable({
  providedIn: 'root'
})
export class LibAddressCompletionService {

  constructor() {
  }

  public getAutocompleteService(): google.maps.places.AutocompleteService {
    return new google.maps.places.AutocompleteService();
  }

  public getMap(ele: Element): google.maps.Map {
    return new google.maps.Map(ele, {});
  }

  public getPlacesService(map: google.maps.Map): google.maps.places.PlacesService {
    return new google.maps.places.PlacesService(map);
  }

  public getPlacesServiceStatusOK(): google.maps.places.PlacesServiceStatus {
    return google.maps.places.PlacesServiceStatus.OK;
  }

}
