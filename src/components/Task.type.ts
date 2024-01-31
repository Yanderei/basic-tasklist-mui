

export enum StatusLevels{
    NA = "N/A",
    PENDING = "pending",
    PROGRESS = "in progress", 
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}

export enum PrioLevels{
    NA = "N/A",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}


export interface AssigneeInterface{
    userId:string;
    displayName:string;
}

export interface TaskInterface{
    id: string;
    title:string;
    description: string;
    dueDate: Date;
    status: StatusLevels,
    assignee: AssigneeInterface;
    priorityLevel: PrioLevels,
    notes: string;

}

export const dummyTaskList : TaskInterface[] =[{
    id: "3f5b4d60-2f96-4c0a-b65a-61a3bfeef0s5",
    title: "Do Coding Interview",
    description: "Interview task for Medial Health",
    dueDate: new Date(),
    status: StatusLevels.PENDING,
    assignee: {
        userId: "1",
        displayName:"John Doe"
    },
    priorityLevel: PrioLevels.LOW,
    notes: "test note",
}]

export enum PageTypeEnum{
    list,
    add,
    edit,
}