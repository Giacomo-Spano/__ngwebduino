import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { ProvaComponent } from './prova/prova.component';

const routes: Routes = [{
  path: '',
  component: FormsComponent,
  children: [{
    path: 'inputs',
    component: FormInputsComponent,
  }, {
    path: 'layouts',
    component: FormLayoutsComponent,
  }, {
    path: 'prova',
    component: ProvaComponent,
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
export class FormsRoutingModule {

}

export const routedComponents = [
  FormsComponent,
  FormInputsComponent,
  FormLayoutsComponent,
  ProvaComponent,
];
