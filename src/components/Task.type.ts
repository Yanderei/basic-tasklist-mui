import { useId } from "react";

export enum StatusLevels{
    NA = "N/A",
    PENDING = "Pending",
    PROGRESS = "In Progress", 
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}

export enum PrioLevels{
    NA = "N/A",
    HIGH = "High",
    MEDIUM = "Medium",
    LOW = "Low"
}


export interface TaskInterface{
    id: string;
    title:string;
    description: string;
    due_date: Date;
    status: StatusLevels,
    assignee: string;
    prio_level: PrioLevels,
    notes: string;

}

export const dummyTaskList : TaskInterface[] =[{
    id: "3f5b4d60-2f96-4c0a-b65a-61a3bfeef0s5",
    title: "Do Coding Interview",
    description: "Interview task for Medial Health",
    due_date: new Date(),
    status: StatusLevels.PENDING,
    assignee: "Rei",
    prio_level: PrioLevels.LOW,
    notes: "test note",
}]

export enum PageTypeEnum{
    list,
    add,
    edit,
}