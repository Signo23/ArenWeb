import {BehaviorSubject} from "rxjs";
import {ElementInfo} from "../model/element-info";

export class ElementBehaviorSubject extends BehaviorSubject<ElementInfo>{
    constructor() {
        super(new ElementInfo());
    }
    public setX(x: number): void{
        this.next({
            ...this.value,
            x: x,
        });
    }
    public setY(y: number): void{
        this.next({
            ...this.value,
            y: y,
        });
    }

    public setWidth(width: number): void{
        this.next({
            ...this.value,
            width: width,
        });
    }

    public setHeight(height: number): void{
        this.next({
            ...this.value,
            height: height,
        });
    }
}
