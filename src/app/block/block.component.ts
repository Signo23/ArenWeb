import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {ElementInfo} from "../model/element-info";

@Component({
  selector: 'arn-block',
  standalone: true,
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css'
})
export class BlockComponent{
  @ViewChild('block') block: ElementRef | undefined;
  @Input()blockInfo!: ElementInfo;

  @HostListener('document:DOMContentLoaded', ['$event']) draw(){
    if(this.blockInfo.visible){
      this.block!.nativeElement.style.left = `${this.blockInfo.x}px`;
      this.block!.nativeElement.style.top = `${this.blockInfo.y}px`;
      this.block!.nativeElement.style.width = `${this.blockInfo.width}px`;
      this.block!.nativeElement.style.height = `${this.blockInfo.height}px`;
      this.block!.nativeElement.style.background = "black";
    }
  }

}
