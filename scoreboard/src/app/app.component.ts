import { Component, OnInit } from '@angular/core';
import { Game } from './interfaces/game';
import { GameImpl } from './models/gameImpl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'scoreboard';

  // Raw Data
  data = [
    "Mexico - Canada: 0 - 5",
    "Spain - Brazil: 10 - 2",
    "Germany - France: 2 - 2",
    "Uruguay - Italy: 6 - 6",
    "Argentina - Australia: 3 - 1 "
  ]

  // Array of Games loaded from raw data
  games: Game[] = []

  public ngOnInit(): void {
      this.loadGames()
  }

  /**
   * Populate Games
   */
  private loadGames():void{
    for(const line of this.data){
      this.games.push(this.readGameFromSystemData(line))
    }
  }

  /**
   * Given a formatted text entry with the following shape:
   * <local-team-name> - <away-team-name> : <local-team-score> - <away-team-score>
   *
   * Read values and assign to a 'Game' object
   * @param systemEntry A formatted string which holds a Game object
   * @returns A Game object
   */
  private readGameFromSystemData(systemEntry:string): Game{
    const errorMessage: string = "Error reading data"

    // PreProcess string
    const separatedData: string[]= systemEntry.split(":")
    if (separatedData.length != 2) throw(errorMessage)

    const teamNames: string[] = separatedData[0].split("-")
    if (teamNames.length != 2) throw(errorMessage)

    const scores: string[] = separatedData[1].split("-")
    if (scores.length != 2) throw(errorMessage)

    // Assign variables
    const localTeamName:string = teamNames[0].trim()
    const awayTeamName:string = teamNames[1].trim()
    const localTeamScore:number = Number(scores[0].trim())
    const awayTeamScore:number = Number(scores[1].trim())

    // Create object
    const game: Game = new GameImpl({name:localTeamName},{name:awayTeamName})
    game.updateScore(localTeamScore,awayTeamScore)

    return game
  }
}
