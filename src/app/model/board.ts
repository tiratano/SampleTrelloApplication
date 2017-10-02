import {TaskHeader} from './taskheader';
import {Task} from './task'

export class Board {
    id: string;
    title: string;
    taskHeader: TaskHeader[];
    task: Task[];
}