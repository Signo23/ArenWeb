import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {ArenComponent} from "../aren/aren.component";
import {ElementBehaviorSubject} from "../../controller/element-behavior-subject";
import {ElementInfo} from "../../model/element-info";
import {BlockComponent} from "../block/block.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'arn-level',
  standalone: true,
  imports: [
    ArenComponent,
    BlockComponent,
    NgStyle
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent {
  @ViewChild('level') level: ElementRef | undefined;
  private readonly VELOCITY: number = 15;
  protected player: ElementBehaviorSubject;
  protected blocks: ElementBehaviorSubject[];
  protected image = "url('../../../assets/level-one.png')";
  private screenDimension: {x: number, y: number};
  constructor() {
    this.player = new ElementBehaviorSubject();
    this.screenDimension = {x:window.innerWidth, y: window.innerHeight};
    this.blocks = [new ElementBehaviorSubject(new ElementInfo(100, 100, true))];
  }
  @HostListener('document:keydown', ['$event']) test(e:KeyboardEvent){
    const position: ElementInfo = this.player.value;
    let delta: number = this.VELOCITY;
    let x = position.x;
    let y = position.y;
    if(e.code == "KeyA" || e.code == "KeyW"){
      delta = delta * -1;
    }
    if(e.code == "KeyD" || e.code == "KeyA"){
      x += delta;
      x = x < 0 ? position.x : (x > this.screenDimension.x - position.getWidth() ? position.x : x);
    }
    if(e.code == "KeyW" || e.code == "KeyS"){
      y += delta;
      y = y < 0 ? position.y : y > this.screenDimension.y - position.getHeight() ? position.y : y;
    }
    const interacts = this.blocks
        .filter(block => {
          return new ElementInfo(x, y).interacts(block.value)
        }).length > 0;
    if(!interacts){
      this.player.setNewPosition(x, y);
    }
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('document:DOMContentLoaded', ['$event'])
  updateScreenLimits(): void{
    this.player.updatePositionByCurrentScreenSize(this.screenDimension.x, this.screenDimension.y);
    this.blocks
      .forEach(block => block.updatePositionByCurrentScreenSize(this.screenDimension.x,
        this.screenDimension.y))
    this.screenDimension.x = window.innerWidth;
    this.screenDimension.y = window.innerHeight;
  }
}
