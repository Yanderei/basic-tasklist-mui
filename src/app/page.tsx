
import { Main } from "@/components/Main";
import data from "../components/TaskList.json"
import { TaskInterface, PrioLevels, StatusLevels } from "@/components/Task.type";

function formatDateToLocal(date: Date): string {
  return date.toISOString().slice(0, -8);
}

function convertToDate(dateS:string):Date{
  return new Date(dateS);
}

export default function Page() {

  
  
  const transformedData = data.map(task => {
    const newTask : TaskInterface = {
      id: task.id,
    title: task.title,
    description: task.description,
    dueDate:  convertToDate(formatDateToLocal(new Date(task.dueDate))),
    assignee: task.assignee,
    priorityLevel: task.priorityLevel as PrioLevels,
    notes: task.notes,
    status: task.status as StatusLevels,
     };
    return newTask;
});
  return (
     <div> <Main data={transformedData}/> </div>
  );
}
