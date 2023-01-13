import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    function removeTask(todolistsId: string, id: string) {
        let filteredTasks = {...tasks, [todolistsId] : [...tasks[todolistsId].filter((i) =>
            i.id !== id
            )]};
        setTasks(filteredTasks);
    }

    function addTask(title: string, todolistsId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistsId] : [...tasks[todolistsId], task]};
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistsId: string) {
        let task = tasks[todolistsId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }




    function changeFilter(value: FilterValuesType,  todolistId: string) {
         setTodolists([...todolists.map((i)=> i.id === todolistId ? {...i , filter: value} : i)])

    }


    return (
        <div className="App">
            {todolists.map((i)=>{
                let tasksForTodolist = tasks[i.id];

                if (i.filter === "active") {
                    tasksForTodolist = tasks[i.id].filter(t => t.isDone === false);
                }
                if (i.filter === "completed") {
                    tasksForTodolist = tasks[i.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist title="What to learn"
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={i.filter}
                              todolistsId={i.id}
                    />
                )
            })}

        </div>
    );
}

export default App;
