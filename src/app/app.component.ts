import {Component} from '@angular/core';
import * as L from 'leaflet';
import {IPortfolioData} from '../services/portfolio-data';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    audio = new Audio('https://freesound.org/data/previews/266/266753_3726544-lq.mp3');

    constructor(public dataService: DataService) {

    }

    ngOnInit() {
        this.setMap();
        this.dataService.activeMapLocation.subscribe((response)=>{
            if(response && response.hasOwnProperty('x')){
                this.glitchPanActiveLocation({
                  x: response.x,
                  y: response.y
                })
            }
        })
    }

    mapObject;
    mapPlacesObj = {};
    myPlaces = IPortfolioData;

    setMap() {
      this.mapObject = L.map('world').setView([31.505, -0.09], 3);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.mapObject);
      this.invalidateSize();

      for (let i = 0; i < Object.keys(this.myPlaces).length; i++) {
        this.mapPlacesObj[Object.keys(this.myPlaces)[i]] = L.circle(this.myPlaces[Object.keys(this.myPlaces)[i]].coor, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500,
          weight: 10
        }).addTo(this.mapObject);
      }
    }

    invalidateSize() {
      if (this.mapObject) {
        setTimeout(() => {
          this.mapObject.invalidateSize(true);
        }, 100);
      }
    }

    isOverlayActive: boolean = false;

    actionOnOverlay($event) {
      //this.isOverlayActive = !this.isOverlayActive;
      debugger;
      //this.mapObject.flyTo([37.35, -121.95], 8);
      if ($event.type === 'to-city') {
        this.glitchPan($event.id);
      }
    }

    glitchPan(id) {
      let flightPath = [];

      while (flightPath.length < 6) {
        flightPath.push(this.myPlaces[id].coor[0] - 1);
      }
      let animationInterval = setInterval(() => {
        let popedVar = flightPath.pop() + 0.70;
        if (flightPath.length !== 5) {
          this.mapObject.flyTo([popedVar, this.myPlaces[id].coor[1]], 8 - flightPath.length);
        } else {
          this.mapObject.setView([popedVar, this.myPlaces[id].coor[1]], 8 - flightPath.length);
        }

        this.audio.currentTime = 0;
        this.audio.play();
        if (!flightPath.length) {
          clearInterval(animationInterval);
        }
      }, 800);
    }

    glitchPanActiveLocation(location){
        let flightPath = [];

        while (flightPath.length < 6) {
            flightPath.push(+location.x - 1);
        }

        let animationInterval = setInterval(() => {
            let popedVar = flightPath.pop() + 0.70;
            if (flightPath.length !== 5) {
                this.mapObject.flyTo([popedVar, +location.y], 8 - flightPath.length);
            } else {
                this.mapObject.setView([popedVar, +location.y], 8 - flightPath.length);
            }

            this.audio.currentTime = 0;
            this.audio.play();
            if (!flightPath.length) {
                clearInterval(animationInterval);
            }
        }, 800);
    }
}
