import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import{BoardService} from '../services/trello.service'
import {Task} from '../model/task'
import {SubTask} from '../model/subtask'
import {Board} from '../model/board'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
 @Input()
  column: Task;
  @Input()
  cards: SubTask[];
  @Output()
  public onAddCard: EventEmitter<SubTask>;
  @Output() cardUpdate: EventEmitter<SubTask>;


 boards: Board[];
  board: Board = new Board;
  editingColumn = false;
  addingCard = false;
  addCardText: string;
  currentTitle: string;
  constructor(private el: ElementRef,private _route: ActivatedRoute,private _boardService:BoardService) { 
     this.onAddCard = new EventEmitter();
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
    console.log(boardId);
    this.boards = this._boardService._data;
    console.log(this.boards);
    for(let v of this.boards){
      if(v.id == boardId){
        this.board = v;
        break;
      }
    }
    
    this.cards =  this.column.subtask;
    
  }

    addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updateColumn();
    } else if (event.keyCode === 27) {
      this.cleadAddColumn();
    }
  }

    addCard() {
    this.cards = this.cards || [];
    let newCard = <SubTask>{
      title: this.addCardText
     // order: (this.cards.length + 1) * 1000,
      //columnId: this.column._id,
     // boardId: this.column.boardId
    };
     let selectedtask: Task;
      for(let v of this.board.task){
      if(v.id == this.column.id){
        selectedtask = v;
        break;
      }
    }
    if(selectedtask.subtask == undefined){
      selectedtask.subtask = new Array();
    }
    selectedtask.subtask.push(newCard);
    this.cards = selectedtask.subtask;
    //this._ws.addCard("123",newCard);
 //   this._cardService.post(newCard)
   //   .subscribe(card => {
     //   this.onAddCard.emit(card);
      //  this._ws.addCard(card.boardId, card);
      //});
  }

  addCardOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
      } else {
        this.clearAddCard();
      }
    } else if (event.keyCode === 27) {
      this.clearAddCard();
    }
  }
updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
     // this._columnService.put(this.column).then(res => {
       // this._ws.updateColumn(this.column.boardId, this.column);
      //});
      this.editingColumn = false;
    } else {
      this.cleadAddColumn();
    }
  }

  cleadAddColumn() {
    this.column.title = this.currentTitle;
    this.editingColumn = false;
  }

  editColumn() {
    this.currentTitle = this.column.title;
    this.editingColumn = true;
    let input = this.el.nativeElement
      .getElementsByClassName('column-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    let input = this.el.nativeElement
      .getElementsByClassName('add-card')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }


  updateColumnOnBlur() {
    if (this.editingColumn) {
      this.updateColumn();
      this.clearAddCard();
    }
  }


  addCardOnBlur() {
    if (this.addingCard) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.clearAddCard();
  }

  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }

  onCardUpdate(card: SubTask){
    this.cardUpdate.emit(card);
  }

}
