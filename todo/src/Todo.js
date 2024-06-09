import React, { useEffect, useState } from "react";
import "./todo.css";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const apiUrl = "http://localhost:5000";

  const handleSubmit = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos([...todos, newTodo]);
          setTitle("");
          setDescription("");
          setMessage("Item added successfully");
          setTimeout(() => {
            setMessage("");
          }, 2500);
        })
        .catch((error) => {
          setMessage("Failed to add item");
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todo")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  const handleUpdate = () => {
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/todos/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          const updatedTodos = todos.map((item) =>
            item._id === editId ? updatedTodo : item
          );
          setTodos(updatedTodos);
          setMessage("Item updated successfully");
          setTimeout(() => {
            setMessage("");
          }, 2500);
          setEditId(-1);
        })
        .catch((error) => {
          setMessage("Failed to update item");
          console.error("Error:", error);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(apiUrl + "/todos/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            const updatedTodos = todos.filter((item) => item._id !== id);
            setTodos(updatedTodos);
            setMessage("Item deleted successfully");
            setTimeout(() => {
              setMessage("");
            }, 2500);
          } else {
            setMessage("Failed to delete item");
          }
        })
        .catch((error) => {
          setMessage("Failed to delete item");
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="row p-1 text-light">
        <h1>TODO APP</h1>
      </div>
      <div className="row1">
        <h4>Add Items</h4>
        <div className="form-group d-flex gap-2">
          <input
            placeholder="Enter Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Enter Todo Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            type="text"
          />
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {message && <p className="text-primary mt-4">{message}</p>}

        <div className="row2 mt-4">
          <h4>Tasks</h4>
          <ul className="list-group">
            {todos.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex justify-content-between bg-light align-items-center my-2 border border-info shadow-sm"
              >
                <div className="d-flex flex-column me-2">
                  {editId === -1 || editId !== item._id ? (
                    <>
                      <span className="fw-bold"> {item.title}</span>
                      <span>{item.description}</span>
                    </>
                  ) : (
                    <div className="form-group d-flex gap-2">
                      <input
                        placeholder="Enter Todo Title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="form-control"
                        type="text"
                      />
                      <input
                        placeholder="Enter Todo Description"
                        onChange={(e) => setEditDescription(e.target.value)}
                        value={editDescription}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  )}
                </div>
                <div className="d-flex gap-3">
                  {editId === -1 || editId !== item._id ? (
                    <button className="btn btn-warning" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-warning" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                  {editId === -1 || editId !== item._id ? (
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  ) : (
                    <button className="btn btn-secondary" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;
