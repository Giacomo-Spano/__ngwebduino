import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { WebduinosystemsComponent } from './webduinosystems//webduinosystems.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { WebduinosystemComponent } from './webduinosystems/webduinosystem/webduinosystem.component';
import { SensorComponent } from './sensor/sensor.component';

const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  children: [{
    path: 'webduinosystems',
    component: WebduinosystemsComponent,
  }, {
    path: 'layouts',
    component: FormLayoutsComponent,
  }, {
    path: 'webduinosystem',
    component: WebduinosystemComponent,
  }, {
    path: 'sensor',
    component: SensorComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SettingsRoutingModule {

}

export const routedComponents = [
  SettingsComponent,
  WebduinosystemsComponent,
  FormLayoutsComponent,
  WebduinosystemComponent,
];
