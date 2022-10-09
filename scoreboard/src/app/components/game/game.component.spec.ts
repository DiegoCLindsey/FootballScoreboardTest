import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Team } from 'src/app/interfaces/team';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    // Mock @Inputs() with away and local
    component.awayTeam = {name:"Away"} as Team
    component.localTeam = {name:"Local"} as Team
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set automatically scores to 0 when created', () => {
    expect(component.awayTeamScore).toEqual(0)
    expect(component.localTeamScore).toEqual(0)
  })

  it('should set the values for teams', () => {
    expect(component.awayTeam.name).toEqual("Away")
    expect(component.localTeam.name).toEqual("Local")
  })

  it('should update the scores of the game and return the total score correctly ', () => {
    expect(component.awayTeamScore).toEqual(0)
    expect(component.localTeamScore).toEqual(0)
    component.updateScore(1,2)
    expect(component.localTeamScore).toEqual(1)
    expect(component.awayTeamScore).toEqual(2)
    expect(component.getTotalScore()).toEqual(3)
  })
});
