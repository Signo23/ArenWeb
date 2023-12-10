import {BehaviorSubject, Observer, Subscription} from "rxjs";
import {ElementInfo} from "../model/element-info";

export class ElementBehaviorSubject extends BehaviorSubject<ElementInfo>{
    constructor(element?: ElementInfo) {
        super(element == null ? new ElementInfo() : element);
    }

    public setNewPosition(x: number, y: number){
      this.next(new ElementInfo(x, y));
    }

    public updatePositionByCurrentScreenSize(oldWidth: number, oldHeight: number){
      let xRatio = this.value.x * 100 / oldWidth;
      let yRatio = this.value.y * 100 / oldHeight;
      let newX = window.innerWidth * xRatio / 100;
      let newY = window.innerHeight * yRatio / 100;
      this.next(new ElementInfo(newX, newY, this.value.visible));
    }
}
