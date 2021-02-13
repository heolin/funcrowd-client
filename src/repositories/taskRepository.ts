import Task, { ITask } from "../models/task/task";
import TaskProgress, { ITaskProgress } from "../models/task/taskProgress";
import SessionManager from "../session/sessionManager";


/**
 * 
 */
export default class TaskRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     * @param missionId 
     */
    async list(missionId: number): Promise<Task[]> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/tasks/");

        let tasks: Task[] = response.data.map(
            (data: Object) => Task.fromJson(data as ITask));
        return tasks;
    }

    /**
     * 
     * @param taskId 
     */
    async get(taskId: number): Promise<Task> {
        const response = await this._sessionManager.get(
            "tasks/" + taskId + "/");

        let task = Task.fromJson(response.data);
        return task;
    }

    /**
     * 
     * @param missionId 
     */
    async progressList(missionId: number): Promise<TaskProgress[]> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/tasks/progress");

        let tasks: TaskProgress[] = response.data.map(
            (data: Object) => TaskProgress.fromJson(data as ITaskProgress));
        return tasks;
    }

    /**
     * 
     * @param taskId 
     */
    async progress(taskId: number): Promise<TaskProgress> {
        const response = await this._sessionManager.get(
            "tasks/" + taskId + "/progress/");

        let task = TaskProgress.fromJson(response.data);
        return task;
    }
}
