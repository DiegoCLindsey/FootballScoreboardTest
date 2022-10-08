import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GameComponent } from './components/game/game.component';
import { TeamGoalsComponent } from './components/team-goals/team-goals.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    GameComponent,
    TeamGoalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
