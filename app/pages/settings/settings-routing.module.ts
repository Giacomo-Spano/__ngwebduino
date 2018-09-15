import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { WebduinosystemsComponent } from './webduinosystems//webduinosystems.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { WebduinosystemComponent } from './webduinosystem/webduinosystem.component';

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
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SettingsRoutingModule {

}

export const routedComponents = [
  SettingsComponent,
  WebduinosystemsComponent,
  FormLayoutsComponent,
  WebduinosystemComponent,
];
