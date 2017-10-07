import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Board} from '../model/board'
import {SubTask} from '../model/subtask';
import {Task} from '../model/task'
import{BoardService} from '../services/trello.service'


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  boards: Board[];
  errorMessage: string;

  constructor(private _boardService:BoardService,private _router: Router) { }

  ngOnInit() {
    this.boards =[];

    this._boardService.getBoards()
                .subscribe(boards => this.boards = boards,
                           error => this.errorMessage = <any>error);

    //this.boards.push (this.seedData());
    //this.boards.push (this.seedData());
    
  }
public addBoard(){
    console.log('Adding new board');
    let newBoard:Board= new Board;
    newBoard.id = this.boards.length + 1
    newBoard.task = Array();
    newBoard.title = "New Board";
    this.boards.push(newBoard);
      //  this._router.navigate(['/board',{id: newBoard.id}]);
        console.log('new board added');
  
  }
  seedData(){
    let temptask: Task = new Task();
    let tempTaskHeader:SubTask =  new SubTask();
    let board:Board=  new Board();

    temptask.id = 1;
    temptask.title = "Hello Task!!";
    temptask.taskheaderId = "1";
   // temptask.boardId = "1";
    
    //tempTaskHeader.boardId="1";
    tempTaskHeader.id="1";
    tempTaskHeader.title = "Hello Task Header!!";

    temptask.subtask = Array();
    temptask.subtask.push(tempTaskHeader);

    board.id=1;
    board.task = new Array();
    board.task.push(temptask);
    //board.taskHeader = new Array();
    //board.taskHeader.push(tempTaskHeader);
    board.title = "Hello Seed Board";

    return board;
    
  }
}
