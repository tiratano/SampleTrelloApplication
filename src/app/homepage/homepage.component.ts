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

   /* this._boardService.getBoards()
                .subscribe(boards => this.boards = boards,
                           error => this.errorMessage = <any>error);
*/
    this.boards.push (this._boardService.seedData());
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
  
}
