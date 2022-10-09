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


  /**
   * Removes a game from the list
   * @param game game to remove
   */
  public finishGame(game: Game): void {
    const gameToFinish = this.findGame(game);
    this.games.splice(this.games.indexOf(gameToFinish),1)
  }

  /**
   * Finds a game in the game list and updates its score
   * @param localTeamScore updated local team score
   * @param awayTeamScore updated away team score
   * @param game game to update
   */
  public updateScore(localTeamScore: number, awayTeamScore: number, game:Game): void {
    const filteredGame = this.findGame(game)
    filteredGame?.updateScore(localTeamScore,awayTeamScore)
  }

  /**
   * Searchs for a game in the game list. If the game is inside the list, returns it; Else it throws an error.
   * @param game Requested Game
   * @returns the instance of te described game which is inside the list
   */
  private findGame(game:Game):Game{
    const filteredGame = this.games.find((filteredGame:Game) => {
      return filteredGame.awayTeam.name == game.awayTeam.name && filteredGame.localTeam.name == game.localTeam.name
    })
    if(!filteredGame){
      throw("Error: Can't find requested game")
    }else{
      return filteredGame
    }
  }

  /**
   * @returns A list of games, sorted by the total score of the games and by reverse insertion order
   */
  getGamesSummary(): Game[] {
    const copy = new Array(this.games)
    this.games.reverse()
    return this.games.sort((gameA:Game, gameB:Game) => { return gameB.getTotalScore() - gameA.getTotalScore()})
  }

}
