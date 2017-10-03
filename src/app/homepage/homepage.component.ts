import { Component, OnInit } from '@angular/core';

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

  constructor(private _boardService:BoardService) { }

  ngOnInit() {
    this.boards =[];

    this._boardService.getBoards()
                .subscribe(boards => this.boards = boards,
                           error => this.errorMessage = <any>error);

    //this.boards.push (this.seedData());
    //this.boards.push (this.seedData());
    setTimeout(function() {
      document.getElementById('content-wrapper').style.backgroundColor = "";
    }, 100);
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

    board.id="1";
    board.task = new Array();
    board.task.push(temptask);
    //board.taskHeader = new Array();
    //board.taskHeader.push(tempTaskHeader);
    board.title = "Hello Board";

    return board;
    
  }
}
