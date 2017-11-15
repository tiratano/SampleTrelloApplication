import {TrelloService} from './trello.service';
import { Observable } from 'rxjs/Observable';

import { Board } from '../model/board';

describe('Trello HTTP Service', () => {
    let trelloService: TrelloService;
    let mockHTTP;
    let fakeBoards: Board[];

    beforeEach(() => {
        mockHTTP = jasmine.createSpyObj('mockHTTP', ['get']);
        trelloService = new TrelloService(mockHTTP);
    });

        it('get Boards undefined', () => {
            fakeBoards =  new Array();
            mockHTTP.get.and.returnValue(Observable.of(fakeBoards));
            trelloService.getBoardsWithPromises().then(boards => this.boards = boards);

            expect(fakeBoards).toBeDefined();

        });
    it('get Boards', () => {
        trelloService.Boards = new Array();
        trelloService.Boards.push({
            id: 0,
            title: 'Test Board',
            task: []
        });
        mockHTTP.get.and.returnValue(Observable.of(trelloService.Boards));
        trelloService.getBoardsWithPromises().then(boards => {
            fakeBoards = boards;
            expect(fakeBoards).toBeDefined();
            expect(fakeBoards[0].title).toEqual('Test Board');
        });
    })


});
