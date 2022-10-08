import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { Team } from 'src/app/interfaces/team';
import {ScoreBoard} from '../../interfaces/score-board'

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, ScoreBoard{


  @Input games : Game[]

  constructor() { }

  ngOnInit(): void {
  }

  public startGame(localTeam: Team, awayTeam: Team): void {

  }

  public finishGame(game: Game): void {

  }

  public updateScore(localTeamScore: number, awayTeamScore: number, game:Game): void {

  }

  getGamesSummary(): string {
      return ''
  }

}
