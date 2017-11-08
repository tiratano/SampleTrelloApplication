import { CustomSort} from './custom-sort.pipe';
import { Task } from '../model/task';

describe('Custom Sort pipe', () => {
    let pipe: CustomSort;
    let tasks: Task[];
    beforeEach(() => {
        pipe = new CustomSort();
        tasks = [{title: 'Basic', id: 0, subtask: [], taskheaderId: '1'},
                {title: 'Advance', id: 0, subtask: [], taskheaderId: '1'},
                {title: 'Complex', id: 0, subtask: [], taskheaderId: '1'}];
    });
    it('should sort the task array', () => {
        const expectedTask: Task[] = [
                {title: 'Advance', id: 0, subtask: [], taskheaderId: '1'},
                {title: 'Basic', id: 0, subtask: [], taskheaderId: '1'},
                {title: 'Complex', id: 0, subtask: [], taskheaderId: '1'}]
        expect(pipe.transform(tasks, true)).toEqual(expectedTask);
    });
    it('should not sort the task array', () => {
        const expectedTask: Task[] = [
                {title: 'Basic', id: 0, subtask: [], taskheaderId: '1'},
                {title: 'Advance', id: 0, subtask: [], taskheaderId: '1'},
                {title: 'Complex', id: 0, subtask: [], taskheaderId: '1'}]
        expect(pipe.transform(tasks, false)).toEqual(expectedTask);
    });
});
