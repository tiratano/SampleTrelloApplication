import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {TrelloService} from './trello.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';


import { Board } from '../model/board';
import { Task } from '../model/task';
import { SubTask } from '../model/subtask';

describe('Trell HTTP Service',() =>{
    let trelloService: TrelloService;
    let mockHTTP;
    let fakeBoards:Board[];
    
    beforeEach(()=>{
        mockHTTP = jasmine.createSpyObj('mockHTTP',['get']);
        trelloService = new TrelloService(mockHTTP);
    });

    describe('fetch board' , ()=>{

        it('get Boards undefined',()=>{
            mockHTTP.get.and.returnValue(Observable.of(fakeBoards));
            trelloService.getBoardsWithPromises().then(boards => this.boards = boards);

            expect(fakeBoards).toBeUndefined();

        });
        it('get Boards',()=>{
            trelloService.Boards = new Array();
            trelloService.Boards.push({
                id:0,
                title:'Test Board',
                task:[]
            });
            mockHTTP.get.and.returnValue(Observable.of(trelloService.Boards));
            console.log('2: ' + trelloService.Boards);
            trelloService.getBoardsWithPromises().then(boards => {
                fakeBoards = boards;
                expect(fakeBoards).toBeDefined();
                expect(fakeBoards[0].title).toEqual('Test Board');
            });            
        })
    });

});