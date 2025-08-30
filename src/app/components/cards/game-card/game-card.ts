import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  @Input() backgroundGradient: string = 'from-pink-500 to-purple-600';
  @Input() gameIcon: string = '👾';
  @Input() gameImageUrl: string = '';
  @Input() gameTitle: string = 'ALIENS ATTACK';
  @Input() gameDescription: string = 'Save the city from the invasion!';
  @Input() playCount: string = '2,206,927 PLAYS';
  @Input() trophyUrl: string = '';
  @Input() cardUrl: string = '';
}
