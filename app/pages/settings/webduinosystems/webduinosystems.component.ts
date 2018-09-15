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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'First Name',
        type: 'string',
      },
      type: {
        title: 'Last Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(['./pages/settings/webduinosystem']); 
    
  }

  /*constructor(private service: SmartTableService) {
    const data = this.service.getData();
    this.source.load(data);
  }*/

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
    
    //data = this.webduinosystems;
    //const data = this.webduinosystems;

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
