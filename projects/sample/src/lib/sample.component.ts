import { Component, Input, OnChanges, ViewEncapsulation, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {SampleService } from './sample.service';
@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SampleComponent implements OnChanges {
  @Input('location') location:string | undefined;
  @Input('unit') unit:string | undefined;
  public errText: string = '';
  public weathersubscription: any;
  public temp:number=0;
  public desc: string='';
  public weatherico: string='';
  public country: string='';
  public city: string='';
  public dt: Date= new Date();
  constructor(
    public _ws: SampleService
  ) { }

  renderWeather() {
    this.weathersubscription = this._ws.getWeather(this.location, this.unit).subscribe((data) => {
      this.errText = '';
      this.temp = Math.round(data.main.temp);
      this.desc = data.weather[0].description;
      this.weatherico = 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
      this.city = data.name;
      this.country = data.sys.country;
      this.getLocalTime(data.coord.lat, data.coord.lon);

    }, error => {
      this.errText = error;
    })
  }

  getLocalTime(lat:any, long:any) {
    this._ws.getLocalTime(lat, long).subscribe((data) => {
      this.dt = data.time;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['location'] || changes['unit']){
      if(this.weathersubscription) {
        this.weathersubscription.unsubscribe();
      }
      this.renderWeather();
    }

  }


}
