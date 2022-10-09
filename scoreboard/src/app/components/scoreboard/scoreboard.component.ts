import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { Team } from 'src/app/interfaces/team';
import { GameImpl } from 'src/app/models/gameImpl';
import {ScoreBoard} from '../../interfaces/score-board'

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, ScoreBoard{


  @Input() games : Game[] = []

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Given the teams involved in a game, creates the game and adds it to the game list
   * @param localTeam Local team of game
   * @param awayTeam Away team of game
   */
  public startGame(localTeam: Team, awayTeam: Team): void {
    const newGame: Game = new GameImpl(localTeam, awayTeam)
    this.games.push(newGame)
  }

  public finishGame(game: Game): void {

  }

  /**
   * Finds a game in the game list and updates its score
   * @param localTeamScore
   * @param awayTeamScore
   * @param game
   */
  public updateScore(localTeamScore: number, awayTeamScore: number, game:Game): void {
    const filteredGame = this.games.find((filteredGame:Game) => {
      return filteredGame.awayTeam == game.awayTeam && filteredGame.localTeam == game.localTeam
    })

    // If the game exists, update score.
    if(filteredGame){
      filteredGame?.updateScore(localTeamScore,awayTeamScore)
    } else{
      throw("Error: Can't find requested game")
    }


  }

  getGamesSummary(): string {
      return ''
  }

}
