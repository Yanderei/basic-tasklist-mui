export interface TaskInterface{
    id: string;
    title:string;
    description: string;
    due_date: Date;
    status: string;

}

export const dummyTaskList : TaskInterface[] =[{
    id: new Date().toJSON().toString(),
    title: "Do Coding Interview",
    description: "Interview task for Medial Health",
    due_date: new Date(),
    status: "active"
}]

export enum PageTypeEnum{
    list,
    add,
}