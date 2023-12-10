import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ArenComponent} from "./aren/aren.component";
import {LevelComponent} from "./level/level.component";

@Component({
  selector: 'arn-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ArenComponent, LevelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{}
