import { Game } from "../interfaces/game";
import { Team } from "../interfaces/team";

export class GameImpl implements Game{
  awayTeamScore: number = 0
  localTeamScore: number = 0
  awayTeam:Team
  localTeam:Team

  constructor(localTeam:Team,awayTeam:Team){
    this.awayTeam = awayTeam
    this.localTeam = localTeam
  }

  updateScore(localTeamScore: number, awayTeamScore: number): void {
      this.localTeamScore = localTeamScore
      this.awayTeamScore = awayTeamScore
  }

  getTotalScore(): number{
    return this.awayTeamScore + this.localTeamScore
  }
}
