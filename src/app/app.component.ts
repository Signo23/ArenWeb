import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {fromEvent, Observable} from "rxjs";
import {ArenComponent} from "./aren/aren.component";
import {PlayerService} from "./player.service";

@Component({
  selector: 'arn-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ArenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  subscription: Observable<KeyboardEvent>;
  protected playerInfo: { x: number, y: number };

  constructor(private playerService: PlayerService) {
    this.playerInfo = {x:0, y: 0};
    this.subscription = fromEvent(document, 'keydown') as Observable<KeyboardEvent>;
    this.playerService.getPlayerInfo()
        .subscribe((res) => this.playerInfo = res);
  }
}
