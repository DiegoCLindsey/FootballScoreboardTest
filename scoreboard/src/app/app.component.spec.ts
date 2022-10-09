import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load all raw data when ngOnInit is executed', () =>
  {
    app.ngOnInit()
    expect(app.games.length).toEqual(5)
  })

  it('should fail reading a line if data is not separed with ":" ', () =>{
    app.data.push( "Mexico - Canada - 0 - 5")
    expect(() => {app.ngOnInit()}).toThrow()
  })

  it('should fail reading a line if data is not separed with "-" (teams) ', () =>{
    app.data.push( "Mexico, Canada : 0 - 5")
    expect(() => {app.ngOnInit()}).toThrow()
  })

  it('should fail reading a line if data is not separed with "-" (score)', () =>{
    app.data.push( "Mexico - Canada : 0 , 5")
    expect(() => {app.ngOnInit()}).toThrow()
  })

});
