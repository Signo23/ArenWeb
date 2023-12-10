import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly playerInfo: BehaviorSubject<{x: number, y: number}>;
  constructor() {
    this.playerInfo = new BehaviorSubject<{x: number; y: number}>({x:0, y:0});
  }

  public getPlayerInfo(): Observable<{x: number, y: number}>{
    return this.playerInfo;
  }
  public setX(x: number): void{
    this.playerInfo.next({
        ...this.playerInfo.value,
        x: x,
    });
  }
  public setY(y: number): void{
    this.playerInfo.next({
        ...this.playerInfo.value,
        y: y,
    });
  }
}
