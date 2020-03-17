import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WeatherService } from '../weather.service';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [DatePipe]
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  hourlyWeatherData = null;
  currentWeatherData = null;
  locationId;
  submitted = false;
  constructor(public weatherService: WeatherService, public formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      cityName: ['pune', Validators.required]
    });
    this.onSearch();
  }


  onSearch() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.weatherForm.invalid) {
      return;
    }
    this.weatherService.searchWeatherDataByLocation(this.weatherForm.value.cityName).subscribe(response => {
      if (+response.cod === 200) {
        this.submitted = false;
        this.locationId = response.list[0].id;
        this.gethourlyWeatherData();
        this.getCurrentWeatherData();

      }
    });
  }
  // Get hourly weather forecasts
  gethourlyWeatherData(): void {
    this.weatherService.gethourlyWeatherData(this.locationId).subscribe(response => {
      response.list.forEach(element => {
        element.formated_date = this.datePipe.transform(element.dt_txt, 'yyyy-MM-dd');
      });
      const groups = _.groupBy(response.list, 'formated_date');
      const array = [];
      for (const el in groups) {
        if (groups.hasOwnProperty(el)) {
          array.push({
            date: el, list: groups[el]
          });
        }
      }
      this.hourlyWeatherData = array;
    });
  }

  // Current weather
  getCurrentWeatherData(): void {
    this.weatherService.getCurrentWeatherData(this.locationId).subscribe(response => {
      this.currentWeatherData = response;
    });
  }

  checkFormValue(cityName) {
    if (!cityName.length) {
      this.hourlyWeatherData = null;
      this.currentWeatherData = null;
      this.locationId;
    }
  }

}

