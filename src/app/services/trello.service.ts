import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';



import { Board } from '../model/board';
import { Task } from '../model/task';


@Injectable()
export class BoardService {
    private _boardUrl = 'api/board/boards.json';
    public Boards: Board[];
    constructor(private _http: Http) {}

    getBoards(): Observable<Board[]> {
        if(this.Boards == undefined){
        return this._http.get(this._boardUrl)
            .map((response: Response) => <Board[]> response.json())
            .do(data => this.Boards = data )
            .catch(this.handleError);
        }
        else {
            return Observable.of(this.Boards);
        }
    }

        getTask(id:string): Observable<Task> {
        return this._http.get(this._boardUrl)
            .map((response: Response) => <Board[]> response.json())
            //.filter(data => data[0].task[0].id === id)
            .do(data => console.log('All123: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error("dd");
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}