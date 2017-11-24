import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';


import { Board } from '../model/board';
import { Task } from '../model/task';
import { SubTask } from '../model/subtask';


@Injectable()
export class TrelloService {
    private _boardUrl = 'api/board/boards.json';
    public Boards: Board[];
    constructor(private _http: Http) {}

    getBoards(): Observable<Board[]> {
        if (this.Boards == undefined){
        return this._http.get(this._boardUrl)
            .map((response: Response) => <Board[]> response.json())
            .do(data => this.Boards = data )
            .catch(this.handleError);
        }
        else {
            return Observable.of(this.Boards);
        }
    }



    getBoardsWithPromises(): Promise<Board[]> {
        if (this.Boards == undefined){
        return this._http.get(this._boardUrl).toPromise()
            .then((response: Response) => {
                this.Boards = <Board[]>response.json();
                return <Board[]> response.json()   ;       } );

        }
        else {
            return Promise.resolve(this.Boards);
        }
    }

    getTask(id: string): Observable<Task> {
        return this._http.get(this._boardUrl)
            .map((response: Response) => <Board[]> response.json())
            //.filter(data => data[0].task[0].id === id)
            .do(data => console.log('All123: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error('dd');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    public seedData(){
        const temptask: Task = new Task();
        const tempSubTask: SubTask =  new SubTask();
        const board: Board =  new Board();

        temptask.id = 1;
        temptask.title = 'Hello Task!!';
        temptask.taskheaderId = '1';

        tempSubTask.id = '1';
        tempSubTask.title = 'Hello Task Header!!';

        temptask.subtask = Array();
        temptask.subtask.push(tempSubTask);

        board.id = 1;
        board.title = 'Hello Seed Board';
        board.task = new Array();
        board.task.push(temptask);


        this.Boards = new Array();
        this.Boards.push(board);

        return board;

      }

}

