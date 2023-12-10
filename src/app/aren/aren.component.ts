import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {PlayerService} from "../player.service";

@Component({
  selector: 'arn-aren',
  standalone: true,
  templateUrl: './aren.component.html',
  styleUrl: './aren.component.css'
})
export class ArenComponent implements OnInit{
  @Input()keyListener: Observable<KeyboardEvent>;
  @ViewChild('ply') player: ElementRef | undefined;
  private readonly VELOCITY: number = 10;
  private xLimit = 1;
  private yLimit = 1;
  private plyX = 1;
  private plyY = 1;
  private x = 0;
  private y= 0;

  constructor(private plyServ: PlayerService) {
    this.keyListener = new Observable<KeyboardEvent>();
  }
  @HostListener('window:resize', ['$event'])
  @HostListener('document:DOMContentLoaded', ['$event'])
  updateScreenLimits(): void{
    let x = this.x * 100 / this.xLimit;
    let y = this.y * 100 / this.yLimit;
    this.xLimit = window.innerWidth;
    this.yLimit = window.innerHeight;
    let newX = this.xLimit * x / 100;
    let newY = this.yLimit * y / 100;
    this.updatePlayerPosition(newX, newY);
    console.log("Proportion", x, y, newX, newY);
    this.updatePlayerDimension(this.player?.nativeElement.getBoundingClientRect());
  }

  private updatePlayerDimension(position:DOMRect): void{
    if(position != null){
      this.plyX = position.width;
      this.plyY = position.height;
    }
  }

  ngOnInit() {
    this.keyListener
      .subscribe((e:KeyboardEvent)=> {
        let position:DOMRect = this.player!.nativeElement.getBoundingClientRect();
        let delta: number = this.VELOCITY;
        let x = position.left;
        let y = position.top;
        if(e.code == "KeyA" || e.code == "KeyW"){
          delta = delta * -1;
        }
        if(e.code == "KeyD" || e.code == "KeyA"){
          x += delta;
          x = x < 0 ? position.left : (x > this.xLimit - this.plyX ? position.left : x);
        }
        if(e.code == "KeyW" || e.code == "KeyS"){
          y += delta;
          y = y < 0 ? position.top : y > this.yLimit - this.plyY ? position.top : y;
        }
        this.updatePlayerPosition(x, y);
      });
  }
  private updatePlayerPosition(x: number, y: number){
    if(this.player != null){
      this.plyServ.setX(x);
      this.plyServ.setY(y);
      this.x = x;
      this.y = y;
      this.player!.nativeElement.style.left = `${x}px`;
      this.player!.nativeElement.style.top = `${y}px`;
    }
  }
}
