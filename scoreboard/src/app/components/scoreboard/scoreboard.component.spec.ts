import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameImpl } from 'src/app/models/gameImpl';
import { Game } from '../../interfaces/game'
import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

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
    component.startGame({name:'Mexico'},{name:'Canada'})
    expect(component.games.length).toEqual(1)
    expect(component.games[0].awayTeam.name).toEqual('Canada')
    expect(component.games[0].localTeam.name).toEqual('Mexico')
    expect(component.games[0].awayTeamScore).toEqual(0)
    expect(component.games[0].awayTeamScore).toEqual(0)
  })

  it('should be able to create several games', () => {
    component.startGame({name:'Mexico'},{name:'Canada'})
    component.startGame({name:'Spain'},{name:'Brazil'})
    component.startGame({name:'Germany'},{name:'France'})
    expect(component.games.length).toEqual(3)
  })

  it('should update the score of a game',() => {
    component.startGame({name:'Mexico'},{name:'Canada'})
    const gameToUpdate = component.games[0]
    component.updateScore(1,2,gameToUpdate)
    expect(component.games[0].localTeamScore).toEqual(1)
    expect(component.games[0].awayTeamScore).toEqual(2)
  })

  it('should update the score of a game, even with multiple games in list',() => {
    component.startGame({name:'Mexico'},{name:'Canada'})
    component.startGame({name:'Spain'},{name:'Brazil'})
    component.startGame({name:'Germany'},{name:'France'})
    const gameToUpdate = component.games[1]
    component.updateScore(1,2,gameToUpdate)
    expect(component.games[1].localTeamScore).toEqual(1)
    expect(component.games[1].awayTeamScore).toEqual(2)
  })

  it('should throw an error if game is not in the list',() => {
    const gameToUpdate = new GameImpl({name:'Mexico'},{name:'Canada'})
    expect(() => component.updateScore(1,2,gameToUpdate)).toThrow()
  })

  it('should remove a game from the list when requested', () =>{
    expect(component.games.length).toEqual(0)
    component.startGame({name:'Mexico'},{name:'Canada'})
    expect(component.games.length).toEqual(1)
    component.finishGame(component.games[0])
    expect(component.games.length).toEqual(0)
  })

  it('should remove a game from the list when requested, even if it is in the middle of the list', () =>{
    const gameToFinish = new GameImpl({name:'Spain'},{name:'Brazil'})
    expect(component.games.length).toEqual(0)
    component.startGame({name:'Mexico'},{name:'Canada'})
    component.startGame({name:gameToFinish.localTeam.name},{name: gameToFinish.awayTeam.name})
    component.startGame({name:'Germany'},{name:'France'})
    expect(component.games.length).toEqual(3)

    component.finishGame(gameToFinish)
    expect(component.games.length).toEqual(2)
  })
});
