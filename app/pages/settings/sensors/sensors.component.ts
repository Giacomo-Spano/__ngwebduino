import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Sensor } from '../../../sensor';
import { SensorType } from '../../../sensortype';
import { WebduinosystemService } from '../../../webduinosystem.service';
import { MessageService } from '../../../message.service';
import { Router } from '@angular/router';
import { Webduinosystem } from '../../../webduinosystem';

@Component({
  selector: 'ngx-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  sensors: Sensor[];
  sensortypes: SensorType[];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      mode: 'inline',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
      },
      shieldid: {
        title: 'ShieldID',
        type: 'number',
        editable: false,
      },
      parentid: {
        title: 'ParentID',
        type: 'number',
        editable: false,
      },
      subaddress: {
        title: 'Subaddress',
        type: 'string',
      },
      name: {
        title: 'Nome',
        type: 'string',
      },
      description: {
        title: 'Descrizione',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: [{value: 'value1', title: 'Title1' },{value: 'value2', title: 'Title2' }]
          },
        },
      },
      enabled: {
        title: 'Abilitato',
        type: 'boolean',
        editor: {
          type: 'checkbox',
        },
      },
      pin: {
        title: 'Pin',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: [{value: 'value1', title: 'Title1' },{value: 'value2', title: 'Title2' }]
          },
        },
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private webduinosystemService: WebduinosystemService,
    private messageService: MessageService,
    private router: Router) {

  }

  ngOnInit() {
    this.getSensors();
    this.getSensorTypes();
  }

  onEditConfirm(event): void {

    /*if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }*/

    //console.log(event);
    /*this.webduinosystemService.updateSensor(event.newData)
      .subscribe(webduinosystem => {
        this.webduinosystems.push(webduinosystem);
      });
    event.confirm.resolve(event.newData);*/
  }

  onCreateConfirm(event): void {

    event.newData.id = 0;
    //console.log(event);
    this.webduinosystemService.updateWebduinosystem(event.newData)
      .subscribe(webduinosystem => {
        this.sensors.push(webduinosystem);
      });   

    event.confirm.resolve(event.newData);

  }

  onUserRowSelect(event): void {
    //console.log(event);
    this.router.navigate(['./pages/settings/sensor/'], 
              { queryParams: { id: event.selected[0].id } }); 

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getSensorTypes(): void {
    this.webduinosystemService.getSensorTypes()
    .subscribe(sensortypes => 
      {
        this.sensortypes = sensortypes;
      });
  }

  getSensors(): void {
    this.webduinosystemService.getSensors()
    .subscribe(sensors => 
      {
        this.sensors = sensors
        this.source.load(sensors);
      });
  }

  save(sensor: Sensor): void {
    this.webduinosystemService.updateSensor(sensor)
      .subscribe(sensor => {
        this.sensors.push(sensor);
      });
  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.webduinosystemService.addSensor({ name } as Sensor)
      .subscribe(sensor => {
        this.sensors.push(sensor);
      });
  }

  delete(sensor: Sensor): void {
    this.sensors = this.sensors.filter(h => h !== sensor);
    this.webduinosystemService.deleteSensor(sensor).subscribe();
  }

}
