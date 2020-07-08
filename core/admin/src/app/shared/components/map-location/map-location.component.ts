import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

declare const google;

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.scss']
})
export class MapLocationComponent implements OnInit {
  @Input() location: any;
  @Output() locationParams = new EventEmitter<any>();

  map: any;
  address: any = {};
  invalidAddress: boolean = false;
  locationOutOfBounds: boolean = true;

  @ViewChild('mapElement', { static: false }) mapElement;

  constructor() { }

  ngOnInit() {
    this.location = this.location || {
      lat: 41.708605,
      lng: 44.787659,
      zoom: 16,
    };

    setTimeout(() => {
      this.createMap(this.location);
    }, 500);
  }

  createMap(location) {
    let center = new google.maps.LatLng(location.lat, location.lng);
    let mapOptions = {
      zoom: this.location.zoom,
      zoomControl: true,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      center: center,
      draggable: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      position: center,
      map: this.map,
    });

    google.maps.event.addListener(this.map, 'dragend', () => this.updateLocation());
    google.maps.event.addListener(this.map, 'zoom', () => this.updateLocation());
    google.maps.event.addListener(this.map, 'drag', () => marker.setPosition(this.map.getCenter().toJSON()));
  }

  updateLocation() {
    return this.map.getCenter().toJSON();
  }

  handleLocationChangeSuccess(result) {
    this.invalidAddress = false;
    this.address.location = result.formatted_address;
    this.address.placId = result.place_id;
    this.address.longitude = result.geometry.location.lng();
    this.address.latitude = result.geometry.location.lat();
    this.address.country = (result.address_components.filter(({ types }) => types.includes('country'))[0] || {}).long_name;
    this.address.city = (result.address_components.filter(({ types }) => types.includes('locality'))[0] || {}).long_name;
    this.address.street = (result.address_components.filter(({ types }) => types.includes('route'))[0] || {}).long_name;
  }

  handleLocationChangeFail() {
    this.invalidAddress = true;
    this.locationOutOfBounds = false;
  }

  onSubmitLocation() {
    console.log('location from map component: ', this.updateLocation());
    this.locationParams.emit(this.updateLocation());
  }
}
