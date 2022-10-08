import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, Game {

  @Input() localTeam!: Team;
  @Input() awayTeam!: Team;
  localTeamScore: number;
  awayTeamScore: number;

  /**
   *
   */
  constructor() {
    this.localTeamScore = 0
    this.awayTeamScore = 0
   }

  ngOnInit(): void {
  }

  /**
   * Updates the game score
   * @param localTeamScore goals of local team
   * @param awayTeamScore goals of away team
   */
  public updateScore(localTeamScore: number, awayTeamScore: number): void {
      this.localTeamScore = localTeamScore
      this.awayTeamScore = awayTeamScore
  }

}
