import React from "react";

const EditTodo = ({todo}) => {
    const [description, setDescription] = React.useState(todo.description);

    const updateDescription = async (e) => {
        e.preventDefault();

        try {
            const body = {description};

            const updateTodo = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(updateTodo);
            window.location = "/";  // refreshing the page to show the updated todo

        } catch (err) {
            console.error(err.message);
        }

        }

    return (
        <main>
            <button type="button" 
            class="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`} 
            onClick = {e => setDescription(todo.description)}
            >
              Edit
            </button>

<div class="modal" id={`id${todo.todo_id}`}>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header ">
        <h4 class="modal-title">Edit your todo</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <div class="modal-body">
        <input type="text" className="form-control" value={description} onChange = {(e) => setDescription(e.target.value)} />
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={updateDescription}>Edit</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> 
      </div>

    </div>
  </div>
</div>
        </main>
    )
}

export default EditTodo;