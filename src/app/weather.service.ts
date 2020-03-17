import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
   apikey = "f4ea07977ce77ff5e7c169327b40b222";
  constructor(public _http : HttpClient) { }

  searchWeatherDataByLocation(cityName): Observable<any> {
   const reqUrl  = "https://api.openweathermap.org/data/2.5/find?q="+ cityName + "&cnt=10&APPID=" + this.apikey;
    return this._http.get(reqUrl);
  }

  getCurrentWeatherData(id: number): Observable<any> {
   const reqUrl = "https://api.openweathermap.org/data/2.5/weather/?appid=" + this.apikey + "&id=" + id + "&units=metric";
   return this._http.get(reqUrl);
  }

  gethourlyWeatherData(id: number): Observable<any> {
    const reqUrl = "https://api.openweathermap.org/data/2.5/forecast/?appid=" + this.apikey  + "&id=" + id + "&units=metric";
    return this._http.get(reqUrl);
  }

 

}
