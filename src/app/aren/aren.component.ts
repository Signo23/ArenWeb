import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ElementBehaviorSubject} from "../controller/element-behavior-subject";
import {ElementInfo} from "../model/element-info";

@Component({
  selector: 'arn-aren',
  standalone: true,
  templateUrl: './aren.component.html',
  styleUrl: './aren.component.css'
})
export class ArenComponent implements OnInit{
  @Input()playerListener!: ElementBehaviorSubject;
  @ViewChild('ply') player: ElementRef | undefined;

  ngOnInit() {
    this.playerListener
        .subscribe((res: ElementInfo) =>{
          this.updatePlayerPosition(res.x, res.y);
          this.updatePlayerDimension(this.player?.nativeElement.getBoundingClientRect(), res);
        });
  }
  private updatePlayerPosition(x: number, y: number){
    if(this.player != null){
      this.player!.nativeElement.style.left = `${x}px`;
      this.player!.nativeElement.style.top = `${y}px`;
    }
  }
  private updatePlayerDimension(position:DOMRect, info: ElementInfo): void{
    if(position != null){
      if(position.width != info.width ||
          position.height != info.height){
        this.playerListener.next({
          ...info,
          width: position.width,
          height: position.height,
        })
      }
    }
  }
}
