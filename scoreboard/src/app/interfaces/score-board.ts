import {Team} from './team'
import {Game} from './game'
export interface ScoreBoard{

  games: Game[]

  startGame(localTeam:Team, awayTeam:Team):void
  finishGame(game:Game):void
  updateScore(localTeamScore:number,awayTeamScore:number):void
  getGamesSummary():string
}
