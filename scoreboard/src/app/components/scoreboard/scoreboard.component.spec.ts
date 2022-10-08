import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
