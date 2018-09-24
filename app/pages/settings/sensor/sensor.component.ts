import { Component, OnInit } from '@angular/core';
import { WebduinosystemService } from '../../../webduinosystem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sensor } from '../../../sensor';

@Component({
  selector: 'ngx-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {

  id: number;
  sensor: Sensor;

  constructor(private webduinosystemService: WebduinosystemService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    ) 
    {
      //this.alertmessage.show = false;
    }

  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.id = +params['id'] || 0;
    });

    this.getSensor(this.id);
  }

  getSensor(id: number): void {
    this.webduinosystemService.getSensor(id)
    .subscribe(sensor => 
      {
        this.sensor = sensor
      });
  }
}
