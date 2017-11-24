import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { Observable } from 'rxjs/Observable';
import {TrelloService} from '../services/trello.service';
import 'rxjs/add/operator/toPromise';


describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    const mockTrelloService = {getBoardsWithPromises: () => Observable.of([]).toPromise()};
    TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [RouterModule.forRoot([])],
      providers: [{provide: APP_BASE_HREF, useValue: '/'},
                  {provide: TrelloService, useValue: mockTrelloService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should have 2 boards', () => {
    component.boards = new Array();
    component.boards.push({
        id: 1,
        task: [],
        title: 'Board 1'
        },
      {
        id: 2,
        task: [],
        title: 'Board 2'
      })

      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const title = compiled.querySelectorAll('.title') ;

      expect(title[0].textContent).toContain('Board 1');
      expect(title[1].textContent).toContain('Board 2');

      expect(component.boards.length).toBe(2);
  });

  it('create a new board', () => {

    component.addBoard();
    fixture.detectChanges();
    expect(component.boards.length).toBe(1);

    const compiled = fixture.debugElement.nativeElement;
    const title = compiled.querySelectorAll('.title') ;
    expect(title.length).toBe(2);

    expect(title[0].textContent).toContain('New Board');

  });

});
