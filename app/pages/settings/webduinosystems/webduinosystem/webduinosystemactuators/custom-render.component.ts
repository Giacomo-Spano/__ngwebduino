import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { WebduinosystemService } from '../../../../../webduinosystem.service';

//import { ViewCell } from '../../../../ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: /*string | */number;
  @Input() rowData: any;

  constructor(private webduinosystemService: WebduinosystemService) 
    {
    }

  ngOnInit() {


    this.webduinosystemService.getSensor(this.value)
    .subscribe(sensor => 
      {
        this.renderValue = sensor.name;//this.value.toString().toUpperCase();
        this.ngOnInit();
    });

    this.renderValue = this.value.toString().toUpperCase();

    
  }

}
