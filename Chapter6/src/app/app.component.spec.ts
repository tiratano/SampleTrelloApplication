import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterModule.forRoot([])], // add the router module here as well,
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]


    }).compileComponents();
  }));
});
