import { Team } from "./team";

export interface Game{
  awayTeam: Team
  localTeam: Team
  awayTeamScore: number
  localTeamScore: number
  updateScore(localTeamScore:number,awayTeamScore:number): void
  getTotalScore(): number
}
