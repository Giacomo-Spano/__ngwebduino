import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsRoutingModule, routedComponents } from './settings-routing.module';
import { AlertmessageComponent } from './alertmessage/alertmessage.component';
import { SensorComponent } from './sensor/sensor.component';
import { ZoneComponent } from './zone/zone.component';
import { ServiceComponent } from './service/service.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { SensorsComponent } from './sensors/sensors.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { ZonesComponent } from './zones/zones.component';
import { ServicesComponent } from './services/services.component';
import { WebduinosystemactuatorsComponent } from './webduinosystems/webduinosystem/webduinosystemactuators/webduinosystemactuators.component';
import { CustomRenderComponent } from './webduinosystems/webduinosystem/webduinosystemactuators/custom-render.component';
import { CustomEditorComponent } from './webduinosystems/webduinosystem/webduinosystemactuators/custom-editor.component';



@NgModule({
  imports: [
    ThemeModule,
    SettingsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    AlertmessageComponent,
    SensorComponent,
    ZoneComponent,
    ServiceComponent,
    ScenarioComponent,
    SensorsComponent,
    ScenariosComponent,
    ZonesComponent,
    ServicesComponent,
    WebduinosystemactuatorsComponent,
    CustomRenderComponent,
    CustomEditorComponent,
  ],
  entryComponents: [
    CustomRenderComponent,
    CustomEditorComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SettingsModule { }
