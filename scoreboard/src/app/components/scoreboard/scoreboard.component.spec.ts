import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameImpl } from 'src/app/models/gameImpl';
import { Game } from '../../interfaces/game'
import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  const data: Game[] = [
    new GameImpl({name:'Mexico'},{name:'Canada'}),
    new GameImpl({name:'Spain'},{name:'Brazil'}),
    new GameImpl({name:'Germany'},{name:'France'}),
    new GameImpl({name:'Uruguay'},{name:'Italy'}),
    new GameImpl({name:'Argentina'},{name:'Australia'})
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to start a game, adding it to its list of games', () => {
    const game: Game = data[0]
    component.startGame(game.localTeam,game.awayTeam)
    expect(component.games.length).toEqual(1)
    expect(component.games[0].localTeam.name).toEqual(game.localTeam.name)
    expect(component.games[0].awayTeam.name).toEqual(game.awayTeam.name)
    expect(component.games[0].awayTeamScore).toEqual(0)
    expect(component.games[0].localTeamScore).toEqual(0)
  })

  it('should be able to create several games', () => {
    for(const game of data){
      component.startGame(game.localTeam,game.awayTeam)
    }
    expect(component.games.length).toEqual(data.length)
  })

  it('should update the score of a game',() => {
    component.startGame(data[0].localTeam,data[0].awayTeam)
    const gameToUpdate = component.games[0]
    component.updateScore(1,2,gameToUpdate)
    expect(component.games[0].localTeamScore).toEqual(1)
    expect(component.games[0].awayTeamScore).toEqual(2)
  })

  it('should update the score of a game, even with multiple games in list',() => {
    for(const game of data){
      component.startGame(game.localTeam,game.awayTeam)
    }
    const gameToUpdate = component.games[1]
    component.updateScore(1,2,gameToUpdate)
    expect(gameToUpdate.localTeamScore).toEqual(1)
    expect(gameToUpdate.awayTeamScore).toEqual(2)
  })

  it('should throw an error if game is not in the list',() => {
    const gameToUpdate = new GameImpl(data[0].localTeam,data[0].awayTeam)
    expect(() => component.updateScore(1,2,gameToUpdate)).toThrow()
  })

  it('should remove a game from the list when requested', () =>{
    expect(component.games.length).toEqual(0)
    component.startGame(data[0].localTeam,data[0].awayTeam)
    expect(component.games.length).toEqual(1)
    component.finishGame(component.games[0])
    expect(component.games.length).toEqual(0)
  })

  it('should remove a game from the list when requested, even if it is in the middle of the list', () =>{
    const gameToFinish = new GameImpl({name:'Spain'},{name:'Brazil'})
    expect(component.games.length).toEqual(0)
    for(const game of data){
      component.startGame(game.localTeam,game.awayTeam)
    }
    expect(component.games.length).toEqual(data.length)

    component.finishGame(gameToFinish)
    expect(component.games.length).toEqual(data.length-1)
  })

  it('should return a summary of the games, ordered first by total score, then by addition order', () =>{
    for(const game of data){
      component.startGame(game.localTeam,game.awayTeam)
    }
    component.updateScore(0,5,data[0])
    component.updateScore(10,2,data[1])
    component.updateScore(2,2,data[2])
    component.updateScore(6,6,data[3])
    component.updateScore(3,1,data[4])

    const summary: Game[] = component.getGamesSummary()
    expect(summary[0]).toEqual(data[3])
    expect(summary[1]).toEqual(data[1])
    expect(summary[2]).toEqual(data[0])
    expect(summary[3]).toEqual(data[4])
    expect(summary[4]).toEqual(data[2])

  })
});

