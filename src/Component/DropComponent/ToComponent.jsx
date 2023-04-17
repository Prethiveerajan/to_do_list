import React, { Component } from 'react';
class TodoList extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      newItem: ''
    };
  }

  addTodoItem = (event) => {
    event.preventDefault();
    const newItem = event.target.elements.newItem.value;
    const newId = this.state.todoItems.length + 1;
    const newTodoItem = { id: newId, text: newItem, color: '#ffffff' };
    this.setState({
      todoItems: [...this.state.todoItems, newTodoItem],
      newItem: ''
    });
    event.target.reset();
  }

  deleteTodoItem = (id) => {
    const filteredItems = this.state.todoItems.filter(item => item.id !== id);
    this.setState({ todoItems: filteredItems });
  }

  handleColorChange = (id, color) => {
    const updatedTodoItems = this.state.todoItems.map(item => {
      if (item.id === id) {
        return { ...item, color: color };
      }
      return item;
    });
    this.setState({ todoItems: updatedTodoItems });
  }

  handleEditItem = (id) => {
    const updatedTodoItems = this.state.todoItems.map(item => {
      if (item.id === id) {
        return { ...item, isEditing: true };
      }
      return item;
    });
    this.setState({ todoItems: updatedTodoItems });
  }

  handleSaveItem = (id, newText) => {
    const updatedTodoItems = this.state.todoItems.map(item => {
      if (item.id === id) {
        return { ...item, text: newText, isEditing: false };
      }
      return item;
    });
    this.setState({ todoItems: updatedTodoItems });
  }

  render() {
    return (
      <div>
        <h2>Todo List</h2>
        <form onSubmit={this.addTodoItem}>
          <input type="text" name="newItem" placeholder="Enter new task" />
          <button type="submit">Add</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Color</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todoItems.map(item => (
              <tr key={item.id} style={{ backgroundColor: item.color, color: item.color === "#ffffff" ? "#000000" : "#ffffff" }}>
                <td>
                  {item.isEditing ?
                    <form onSubmit={(event) => {
                      event.preventDefault();
                      const newText = event.target.elements.newText.value;
                      this.handleSaveItem(item.id, newText);
                    }}>
                      <input type="text" name="newText" defaultValue={item.text} />
                      <button type="submit">Save</button>
                    </form>
                    :
                    item.text
                  }
                </td>
                <td>
                  <select value={item.color} onChange={(event) => this.handleColorChange(item.id, event.target.value)}>
                    <option value="#ffffff">Recently Given</option>
                    <option value="#ffcccc">In Progress</option>
                    <option value="#ccffcc">Completed</option>
                  </select>
            </td>
            <td>
              {item.isEditing ?
                null
                :
                <button onClick={() => this.handleEditItem(item.id)}>Edit</button>
              }
            </td>
            <td><button onClick={() => this.deleteTodoItem(item.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    );
}
}

export default TodoList;