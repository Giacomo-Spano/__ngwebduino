import { Scenario } from "./scenario";
import { Sensor } from "./sensor";
//import { Zone } from "./zone";
import { Service } from "./service";
import { Zone } from "./zone";

export class Webduinosystem {
    id: number;
    name: string;
    type: string;
    enabled: boolean;
    scenarios: Scenario[];
    actuators: Sensor[];
    zones: Zone[];
    services: Service[];
  }
