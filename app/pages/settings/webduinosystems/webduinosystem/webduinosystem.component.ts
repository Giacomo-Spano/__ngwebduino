import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { WebduinosystemService } from '../../../../webduinosystem.service';
import { Webduinosystem } from '../../../../webduinosystem';
import { WebduinosystemType } from '../../../../webduinosystemtype';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../ui-features/modals/modal/modal.component';
import { Alertmessage } from '../../../../alertmessage';

@Component({
  selector: 'ngx-webduinosystem',
  styleUrls: ['./webduinosystem.component.scss'],
  templateUrl: './webduinosystem.component.html',
})

export class WebduinosystemComponent {

  starRate = 2;
  heartRate = 4;
  webduinosystem: Webduinosystem;
  id: number;
  webduinosystemtypes: WebduinosystemType[];
  dataerror: boolean = true;
  //selectedMessage : MessagesComponent;
  alertmessage: Alertmessage = {
    show: false,
    name: 'Windstorm2'
  };  

  actuatorsettings = {
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
        title: 'Nome',
        type: 'string',
      },
    },
  };

  zonesettings = {
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
        title: 'Nome',
        type: 'string',
      },
    },
  };

  servicesettings = {
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
        title: 'Nome',
        type: 'string',
      },
    },
  };

  scenariosettings = {
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
        editable: false,
      },
      name: {
        title: 'Nome',
        type: 'string',
      }
    },
  };

  actuatorsource: LocalDataSource = new LocalDataSource();
  zonesource: LocalDataSource = new LocalDataSource();
  servicesource: LocalDataSource = new LocalDataSource();
  scenariosource: LocalDataSource = new LocalDataSource();

  onUserRowSelect(event): void {
    //console.log(event);
    this.router.navigate(['./pages/settings/webduinosystem']);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  constructor(private webduinosystemService: WebduinosystemService,
                private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                ) 
                {
                  this.alertmessage.show = false;
                }

 ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = +params['id'] || 0;
      });

    this.getWebduinosystem(this.id);
    this.getWebduinosystemtypes();
  }

  onSave(): void {
   
    this.webduinosystemService.updateWebduinosystem(this.webduinosystem)
    .subscribe(webduinosystemtypes =>
      {
        //this.showLargeModal(); 
        
        this.webduinosystemtypes = webduinosystemtypes;

        this.alertmessage.show = true;   
          
        //this.alertmessage.ngOnInit();

        this.ngOnInit();
            
      });    
  }

  showLargeModal(): void {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Largexx Modal';
  }

  onCancel(): void {
  }

  getWebduinosystemtypes(): void {
    this.webduinosystemService.getWebduinosystemTypes()
    .subscribe(webduinosystemtypes =>
      {
        this.webduinosystemtypes = webduinosystemtypes;
      });
  }

  getWebduinosystem(id: number): void {
    this.webduinosystemService.getWebduinosystem(id)
    .subscribe(webduinosystem => 
      {
        this.webduinosystem = webduinosystem
        const data = webduinosystem.scenarios;
        this.scenariosource.load(data);

        //this.actuatorsource.load(webduinosystem.actuators);
        this.zonesource.load(webduinosystem.zones);
        this.servicesource.load(webduinosystem.services);
      });
  }
}
