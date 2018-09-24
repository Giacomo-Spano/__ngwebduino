import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Sensor } from '../../../../../sensor';
import { WebduinosystemService } from '../../../../../webduinosystem.service';
import { MessageService } from '../../../../../message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebduinosystemActuator } from '../../../../../webduinosystemactuator';
import { Actuator } from './actuator';
import { CustomRenderComponent } from './custom-render.component';

@Component({
  selector: 'ngx-webduinosystemactuators',
  templateUrl: './webduinosystemactuators.component.html',
  styleUrls: ['./webduinosystemactuators.component.scss']
})
export class WebduinosystemactuatorsComponent implements OnInit {

  actuators: WebduinosystemActuator[];
  //actuators: Actuator[];
  sensors: Sensor[];
  webduinosystemid: number;
  
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
        width: '10%',
        editable: false,
      },
      /*webduinosystemid: {
        title: 'WebduinoSystemID',
        type: 'number',
        editable: false,
      },*/
      name: {
        title: 'Nome',
        type: 'text',
        renderComponent: CustomRenderComponent,
      },
      /*sensorid: {
        title: 'SensorID',
        type: 'text',
        renderComponent: CustomRenderComponent,
        editor: {
          type: 'list',
          config: {
            list: []
          },
        },
      },*/
      sensor: {
        title: 'sensor',
        type: 'html', 
        editor: {
          type: 'list',
          config: { 
            list: [/*{ value: '<div val="1" style="display: none;"><div>1ant</div>', title: 'Antonette' }, { value: '2bret', title: 'Bret' }, { 
              value: '3sam', 
              title: 'Samantha', 
            }*/], 
          },
        },      
      },
    }
  };

  //source: LocalDataSource = new LocalDataSource();

  source = [
    /*{
      id: 1,
      name: "Leanne Graham",
      sensorid: 1,
    },
    {
      id: 2,
      name: "Ervin Howell",
      sensorid: 2
    },*/
  ];
  
  constructor(private webduinosystemService: WebduinosystemService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.webduinosystemid = +params['id'] || 0;
      });

    //this.getWebduinosystemActuators(this.webduinosystemid);
    this.getSensors();
  }

  /*onEdit(event): void {
    var val = event;
  }*/

  onEditConfirm(event): void {

    /*if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }*/
    var actuatorid = this.getVal(event.newData.sensor);
    for (var actuator of this.actuators) {
      if (actuator.id == event.newData.id) {
        actuator.actuatorid = actuatorid;
        this.webduinosystemService.updateWebduinosystemActuator(actuator)
          .subscribe(actuator => {
            event.confirm.resolve(event.newData);
          });
        break;
      }
    }  
  }

  getVal(str: string): number {
    var index1 = str.indexOf('val="');
    index1 += 5;
    var index2 = str.indexOf('"',index1); 
    var val = +str.substring(index1,index2);
    return val;
  }

  onCreateConfirm(event): void {

    //event.newData.id = 0;
    var actuatorid = this.getVal(event.newData.sensor);
    var webduinosystemactuator: WebduinosystemActuator = {
      id: 0,
      webduinosystemid: this.webduinosystemid,
      actuatorid: actuatorid,
      name: event.newData.name,
    }

    //console.log(event);
    this.webduinosystemService.updateWebduinosystemActuator(webduinosystemactuator)
      .subscribe(webduinosystemactuator => {
        this.actuators.push(webduinosystemactuator);
      });   
    event.confirm.resolve(event.newData);
  }

  onUserRowSelect(event): void {
    //console.log(event);
    /*this.router.navigate(['./pages/settings/sensor/'], 
              { queryParams: { id: event.selected[0].id } }); */

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getWebduinosystemActuators(id: number): void {
    this.webduinosystemService.getWebduinosystem(id)
    .subscribe(webduinosystem => 
      {
        this.actuators = webduinosystem.actuators;
        for (var actuator of webduinosystem.actuators) {
          var item : Actuator;
          item = {
                  id: actuator.id,
                  name: actuator.name,
                  //sensorid: actuator.actuatorid,
                  sensor: this.getSensorItem(actuator.actuatorid)/*'<div val="' + actuator.actuatorid + '" style="display: none;"></div><div>' 
                          + '[' + actuator.actuatorid + ']' 
                          + this.getSensorFromId(actuator.actuatorid).name
                          + '</div>'*/
          }
          this.source.push(item);  
        }  
        //this.source.load(this.actuators);
      });      
  }

  getSensorItem(sensorid: number): string {
    var str: string;
    /*str = '<div val="' + sensorid + '" style="display: none;"></div><div>' 
          + '[' + sensorid + '] ' 
          + this.getSensorFromId(sensorid).name
          + '</div>';*/

    str = '<div val="' + sensorid + '" style="display: none;"></div><a href="' 
          + './#/pages/settings/sensor?id=' + sensorid + '">' 
          + '[' + sensorid + '] ' 
          + this.getSensorFromId(sensorid).name
          + '</a>';


    return str;
  }

  getSensorFromId(id: number): Sensor {
    for (var sensor of this.sensors) {
      if (sensor.id == id)
        return sensor;
    }
    return null;
  }  

  getSensors(): void {
    this.webduinosystemService.getSensors()
    .subscribe(sensors => 
      {
        this.sensors = sensors;
        for (var sensor of sensors) {
          var item = { value: '' + sensor.id, title: sensor.name };
          //this.settings.columns.sensorid.editor.config.list.push(item); 

          var sensoritem = { 
                            value: this.getSensorItem(sensor.id)/*'<div val="' + sensor.id + '" style="display: none;"></div><div>' 
                            + sensor.name
                            + '</div>'*/,
                             title: sensor.name };
          this.settings.columns.sensor.editor.config.list.push(sensoritem); 

          this.getWebduinosystemActuators(this.webduinosystemid);
        }      
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

