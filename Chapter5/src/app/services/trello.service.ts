import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';



import { Board } from '../model/board';
import { Task } from '../model/task';
import { SubTask } from '../model/subtask';


@Injectable()
export class TrelloService {
    public Boards: Board[];
    constructor(private _http: Http) {}
    public seedData(){
        const temptask: Task = new Task();
        const tempSubTask: SubTask =  new SubTask();
        const board: Board =  new Board();

        temptask.id = 1;
        temptask.title = 'Hello 작업!!';
        temptask.taskheaderId = '1';

        tempSubTask.id = '1';
        tempSubTask.title = 'Hello 작업 헤더!!';

        temptask.subtask = Array();
        temptask.subtask.push(tempSubTask);

        board.id = 1;
        board.title = 'Hello 보드';
        board.task = new Array();
        board.task.push(temptask);


        this.Boards = new Array();
        this.Boards.push(board);

        return board;

      }

}

