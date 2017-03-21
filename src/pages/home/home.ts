import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation,
        GoogleMap,
        GoogleMapsAnimation,
        GoogleMapsEvent,
        GoogleMapsLatLng } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public coords: any;
  public isActive: boolean = false;
  private map: GoogleMap;
  private location: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.platform.ready().then(() => 
    {
      GoogleMap.isAvailable().then((isAvailable: boolean) => {
        if (!isAvailable) {
          console.log('GoogleMap plugin is NOT available');
        } else {
          console.log('GoogleMap plugin is available');
          // Geolocation.getCurrentPosition().then((resp) => {
            this.coords = {
              // lat: resp.coords.latitude,
              // lng: resp.coords.longitude
              lat: -7.800726,
              lng: 110.395915
            };
            this.isActive = true;
            this.location = new GoogleMapsLatLng(this.coords.lat, this.coords.lng);
            // this.location = new GoogleMapsLatLng(-7.800726, 110.395915);
            this.map = new GoogleMap('map', {
              'backgroundColor': 'white',
              'controls': {
                'compass': true,
                'indoorPicker': true,
                'zoom': true
              },
              'camera': {
                'latLng': this.location,
                'tilt': 90,
                'zoom': 12,
                'bearing': 50
              },
              'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
              }
            });

            this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
              console.log('Map is ready!');
              this.listLocation();
            });
          // }).catch((error) => {
          //   console.dir(error);
          // });
        }
      });
      // Geolocation.getCurrentPosition().then((resp) => {
        // this.coords = {
        //   lat: resp.coords.latitude,
        //   lng: resp.coords.longitude
        // };
      //   this.isActive = true;
      // })
      // .catch((error) => {
      //   console.dir(error);
      // });
    });
  }

  listLocation() {
    let title = `Your current location\n\nLatitude: ${this.coords.lat}\nLongitude: ${this.coords.lng}`;
    this.map.addMarker({
      'position': this.location,
      'title': title,
      animation: GoogleMapsAnimation.DROP,
      'styles': {
        'text-align': 'right',
        'color': 'grey'
      }
    });
  }

}
