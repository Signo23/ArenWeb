import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ElementInfo} from "../../model/element-info";
import {ElementBehaviorSubject} from "../../controller/element-behavior-subject";

@Component({
  selector: 'arn-block',
  standalone: true,
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css'
})
export class BlockComponent implements OnInit{
  @ViewChild('block') block: ElementRef | undefined;
  @Input()blockInfo!: ElementBehaviorSubject;

  ngOnInit() {

  }

  @HostListener('document:DOMContentLoaded', ['$event']) draw(){
    this.blockInfo.subscribe(blockInfo => {
      console.log("draw", blockInfo);
      if(blockInfo.visible){
        this.block!.nativeElement.style.left = `${blockInfo.x}px`;
        this.block!.nativeElement.style.top = `${blockInfo.y}px`;
        this.block!.nativeElement.style.width = `${blockInfo.getWidth()}px`;
        this.block!.nativeElement.style.height = `${blockInfo.getHeight()}px`;
        this.block!.nativeElement.style.background = "black";
      }
    })
  }

}
