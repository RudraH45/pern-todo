import React from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = React.useState([]);

    const deleteTodos = async (id) => {    // function to delete a todo based on its id
        try {
            const deleteTodo = await fetch (`http://localhost:5000/todos/${id}`, {
                method: "DELETE"    // specifying the method as DELETE to delete a resource on the server
            });
            console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id !== id));   // updating the todos state by filtering out the deleted todo(this removes the deleted todo from the UI without refreshing the page)
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos"); // fetch by default calles GET method
            const jsonData = await response.json(); // parsing the response data to json format, 
            //creating a variable jsonData and storing the response data as json in it

            setTodos(jsonData); // setting the fetched data to todos state
        } catch (err) {
            console.error(err.message);
        }
    }

    React.useEffect(() => {
        getTodos();
    }, []);


    return (
        <main>
            <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {todos.map(todo => (
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><EditTodo todo = {todo}/></td>
                    <td><button className="btn btn-danger" onClick = {() => deleteTodos(todo.todo_id)}>Delete</button></td>  {/* / calling deleteTodos func with the id(as parameter) of the todo to be deleted */}
                </tr>
            ))}
        </tbody>
      </table>      
        </main>
    );
}

export default ListTodo;