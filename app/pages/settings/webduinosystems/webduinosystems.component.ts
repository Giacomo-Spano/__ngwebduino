import { Component, OnInit } from '@angular/core';
import { WebduinosystemService } from '../../../webduinosystem.service';
import { Webduinosystem } from '../../../webduinosystem';

import { LocalDataSource } from 'ng2-smart-table';

import {Router} from "@angular/router";

@Component({
  selector: 'ngx-webduinosystems',
  styleUrls: ['./webduinosystems.component.scss'],
  templateUrl: './webduinosystems.component.html',
})

export class WebduinosystemsComponent implements OnInit {

  starRate = 2;
  heartRate = 4;
  webduinosystems: Webduinosystem[];

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
        editable: false
      },
      name: {
        title: 'Nome',
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
          /*config: {
            true: 'Abilitato',
            false: 'Disabilitato',
          },*/
        },
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  onEditConfirm(event): void {

    /*if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }*/

    console.log(event);
    this.webduinosystemService.updateWebduinosystem(event.newData)
      .subscribe(webduinosystem => {
        this.webduinosystems.push(webduinosystem);
      });   

    event.confirm.resolve(event.newData);
    
  }

  onCreateConfirm(event): void {

    event.newData.id = 0;
    console.log(event);
    this.webduinosystemService.updateWebduinosystem(event.newData)
      .subscribe(webduinosystem => {
        this.webduinosystems.push(webduinosystem);
      });   

    event.confirm.resolve(event.newData);
    
  }

  onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(['./pages/settings/webduinosystem/'], 
              { queryParams: { id: event.selected[0].id } }); 
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  constructor(private webduinosystemService: WebduinosystemService, private router: Router) {
    
   }

  ngOnInit() {
    this.getWebduinosystems();
  }

  getWebduinosystems(): void {
    this.webduinosystemService.getWebduinosystems()
    .subscribe(webduinosystems => 
      {
        this.webduinosystems = webduinosystems
        const data = webduinosystems;
        this.source.load(data);
      });
  }

  save(webduinosystem: Webduinosystem): void {
    this.webduinosystemService.updateWebduinosystem(webduinosystem)
      .subscribe(webduinosystem => {
        this.webduinosystems.push(webduinosystem);
      });
  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.webduinosystemService.addWebduinosystem({ name } as Webduinosystem)
      .subscribe(webduinosystem => {
        this.webduinosystems.push(webduinosystem);
      });
  }

  delete(webduinosystem: Webduinosystem): void {
    this.webduinosystems = this.webduinosystems.filter(h => h !== webduinosystem);
    this.webduinosystemService.deleteWebduinosystem(webduinosystem).subscribe();
  }

}
