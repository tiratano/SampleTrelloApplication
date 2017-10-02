import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


import { Board } from '../model/board';
import { Task } from '../model/task';


@Injectable()
export class BoardService {
    private _boardUrl = 'api/board/boards.json';
    public _data: Board[] = new Array();
    constructor(private _http: Http) {}

    getBoards(): Observable<Board[]> {
        return this._http.get(this._boardUrl)
            .map((response: Response) => <Board[]> response.json())
            .do(data => this._data = data )
            .catch(this.handleError);
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