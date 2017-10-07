import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { BoardService } from '../services/trello.service'
import { Task } from '../model/task'
import { Board } from '../model/board'

declare var jQuery: any;
var curYPos = 0,
  curXPos = 0,
  curDown = false;
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  task: Task;
  boards: Board[];
  board: Board = new Board;
  errorMessage: string;
  addColumnText: string;
  addingColumn = false;
  boardWidth: number;
  columnsAdded: number = 0;

  editingTilte = false;
  currentTitle: string;

  constructor(public el: ElementRef, private _route: ActivatedRoute, private _boardService: BoardService) { }

  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
    console.log(boardId);
    this.boards = this._boardService.Boards;
    console.log(this.boards);
    for (let v of this.boards) {
      if (v.id == boardId) {
        this.board = v;
        break;
      }
    }
  // this.bindPane();
    
    //  this.updateBoardWidth();

    /*this._boardService.getBoards()
                .subscribe(boards => this.boards = boards,
                           error => this.errorMessage = <any>error);*/

  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTilte = true;

    let input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  enableAddColumn() {
    this.addingColumn = true;
    let input = this.el.nativeElement
      .getElementsByClassName('add-column')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);

  }
  updateBoard() {

    this.editingTilte = false;
    document.title = this.board.title + " | Generic Task Manager";
    this._boardService.Boards.find(x=>x.id == this.board.id).title = this.board.title;
  }
  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }
  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddColumn();
    }
  }
  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }
  addColumn() {
    let newID = this.board.task.length + 1;
    let newColumn = <Task>{
      title: this.addColumnText,
      id: newID
      // order: (this.board.task.length + 1) * 1000,
      //boardId: this.board.id
    };
    this.board.task.push(newColumn);
    this.updateBoardWidth();
    this.addColumnText = '';

  }
  updateBoardWidth() {
    // this.boardWidth = ((this.board.task.length + (this.columnsAdded > 0 ? 1 : 2)) * 280) + 10;
    this.boardWidth = ((this.board.task.length + 1) * 280) + 10;

    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if (this.columnsAdded > 0) {
      let wrapper = document.getElementById('content-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }

    this.columnsAdded++;
  }
  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }
    bindPane() {
    let el = document.getElementById('content-wrapper');
    el.addEventListener('mousemove', function (e) {
      e.preventDefault();
      if (curDown === true) {
        el.scrollLeft += (curXPos - e.pageX) * .25;// x > 0 ? x : 0;
        el.scrollTop += (curYPos - e.pageY) * .25;// y > 0 ? y : 0;
      }
    });

    el.addEventListener('mousedown', function (e) {
      if (e.srcElement.id === 'main' || e.srcElement.id === 'content-wrapper') {
        curDown = true;
      }
      curYPos = e.pageY; curXPos = e.pageX;
    });
    el.addEventListener('mouseup', function (e) {
      curDown = false;
    });
  }
}
