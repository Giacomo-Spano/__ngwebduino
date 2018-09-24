import { Component, OnInit, Input } from '@angular/core';
//import { Input } from '@angular/directives';
import { Alertmessage } from '../../../alertmessage';

@Component({
  selector: 'ngx-alertmessage',
  templateUrl: './alertmessage.component.html',
  styleUrls: ['./alertmessage.component.scss'],
})
export class AlertmessageComponent implements OnInit {

  @Input() alertmessage: Alertmessage = {
      show: false,
      name: 'Windstorm'
  };

  constructor() { 
    //this.alertmessage.show = false;
  }

  ngOnInit() {
    
  }

}
