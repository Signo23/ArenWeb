import {Component, HostListener} from '@angular/core';
import {ArenComponent} from "../aren/aren.component";
import {ElementBehaviorSubject} from "../../controller/element-behavior-subject";
import {ElementInfo, ElementInfos} from "../../model/element-info";
import {BlockComponent} from "../block/block.component";

@Component({
  selector: 'arn-level',
  standalone: true,
  imports: [
    ArenComponent,
    BlockComponent
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent {
  private readonly VELOCITY: number = 15;
  protected player: ElementBehaviorSubject;
  protected blocks: ElementInfo[];
  private screenDimension: {x: number, y: number};
  constructor() {
    this.player = new ElementBehaviorSubject();
    this.screenDimension = {x:1, y: 1};
    this.blocks = [{x: 100, y: 100, width: 10, height: 10, visible: true}];
  }
  @HostListener('document:keydown', ['$event'])
  test(e:KeyboardEvent){
    console.log(e.code);
    const position: ElementInfo = this.player.value;
    let delta: number = this.VELOCITY;
    let x = position.x;
    let y = position.y;
    if(e.code == "KeyA" || e.code == "KeyW"){
      delta = delta * -1;
    }
    if(e.code == "KeyD" || e.code == "KeyA"){
      x += delta;
      x = x < 0 ? position.x : (x > this.screenDimension.x - position.width ? position.x : x);
    }
    if(e.code == "KeyW" || e.code == "KeyS"){
      y += delta;
      y = y < 0 ? position.y : y > this.screenDimension.y - position.height ? position.y : y;
    }
    const interacts = this.blocks
        .filter(block => ElementInfos.interacts({
          ...this.player.value,
          x: x,
          y: y,
        }, block)).length > 0;
    if(!interacts){
      this.player.setX(x);
      this.player.setY(y);
    }
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('document:DOMContentLoaded', ['$event'])
  updateScreenLimits(): void{
    let x = this.player.value.x * 100 / this.screenDimension.x;
    let y = this.player.value.y * 100 / this.screenDimension.y;
    this.screenDimension.x = window.innerWidth;
    this.screenDimension.y = window.innerHeight;
    let newX = this.screenDimension.x * x / 100;
    let newY = this.screenDimension.y * y / 100;
    this.player.setX(newX);
    this.player.setY(newY);
  }
}
