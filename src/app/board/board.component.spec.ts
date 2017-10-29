import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Board } from '../model/board'


describe('BoardComponent', () => {
  //let component: BoardComponent;
  //let fixture: ComponentFixture<BoardComponent>;
  let boardComponent: BoardComponent;
  let mockElementRef,mockRoute,mockTrelloService;

 /* beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));*/

  beforeEach(() => {
  //  fixture = TestBed.createComponent(BoardComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
    boardComponent = new BoardComponent(mockElementRef, mockRoute, mockTrelloService);
  });

  it('should be created', () => {
    //expect(component).toBeTruthy();
  });

  it('test add new task to existing task',()=>{
    boardComponent.addtaskText = "Test task";
    boardComponent.board = new Board();
    boardComponent.board.id = 1;
    boardComponent.board.title = "Board 1";
    boardComponent.board.task =  new Array();
    boardComponent.board.task.push({
                id:1,
                title:'task1',
                subtask: [],
                taskheaderId:"1"});

    boardComponent.addtask();

    expect(boardComponent.board.task.length).toBe(2);
  });


  it('test add first task ',()=>{
    boardComponent.addtaskText = "Test task";
    boardComponent.board = new Board();
    boardComponent.board.id = 1;
    boardComponent.board.title = "Board 1";
    boardComponent.board.task =  new Array();
    
    boardComponent.addtask();

    expect(boardComponent.board.task.length).toBe(1);
    expect(boardComponent.board.task[0].id).toBe(1);
    expect(boardComponent.board.task[0].title).toBe('Test task');
  });
});
