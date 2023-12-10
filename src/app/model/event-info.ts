import {ElementInfo} from "./element-info";

export class EventInfo {
  text: string;
  item?: ElementInfo;
  requirment?: EventInfo;
  runned: boolean

  constructor() {
    this.text = "";
    this.runned = false;
  }

}
