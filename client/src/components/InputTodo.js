import React from 'react';

const InputTodo =  () => {
    const [description, setDescription] = React.useState("");

    const onSubmitForm = async (e) => {
    e.preventDefault();  // prevent the default behavior of form submission which causes a page reload
    try {
    const body = {description};  // creating a js object with description property to send to the server

    const response = await fetch("http://localhost:5000/todos", {
        method: "POST",  // specifying the method as POST to create a new resource on the server
        headers: {"Content-Type": "application/json"},  // informing the server that the data being sent is in json format
        body: JSON.stringify(body), // converting js object body to json string
    })
    console.log(response);

    window.location = "/";  // this line refreshes the page after adding a new todo to show the updated list
    } catch (err) {
        console.error(err.message);
    }
}
    return (
        <main>
            <h1>Hello from Input Todo</h1>
            <form className="d-flex mt-5 justify-content-center" onSubmit = {onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </main>
    );
}

export default InputTodo;
