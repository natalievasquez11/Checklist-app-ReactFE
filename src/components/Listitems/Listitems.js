import React, { Component } from 'react';
import './listitems.css';

class Listitems extends Component {
    state = {
        isBeingUpdated: false,
        updatedTask: "",
        isCompleted: true
    }

    handleUpdateTask(task) {
        if(this.state.updatedTask !== "") {
            task.taskName = this.state.updatedTask;
            fetch("http://localhost:8080/updateTask/" + task.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(task)
            })
            .then(res => {
                console.log(res);
                this.setState({isBeingUpdated: false});
                this.props.getTasks();
            })
            .catch(err => console.log(err));
        } else {
            this.setState({isBeingUpdated: false });
        }
    }

    handleDelete(taskId) {
        fetch("http://localhost:8080/deleteTask/" + taskId, {
            method: "DELETE"
        })
        .then(res => {
            console.log(res);
            this.props.getTasks();
        })
        .catch(err => console.log(err));
    }

    handleChange = (event) => {
        this.setState({ updatedTask: event.target.value });
    }

    handleEditClick() {
        this.setState({ isBeingUpdated: true });
    }

    handleCheckbox = (event) => {
        this.setState({ isCompleted: !this.state.isCompleted });
        this.props.task.taskCompleted = this.state.isCompleted;

        fetch("http://localhost:8080/updateTask/" + this.props.task.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(this.props.task)
        })
        .then(res => {
            console.log(res);
            this.props.getTasks();
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <li className="list-group-item" >
                {
                    (!this.state.isBeingUpdated) ? (
                        <div className="updateDiv">
                            <span style={!this.state.isCompleted ? {'textDecoration': 'line-through'} : {'textDecoration': 'none'}}>
                                <input 
                                type="checkbox" 
                                onChange={this.handleCheckbox} 
                                value={this.props.task.id} ></input> 
                                {this.props.task.taskName}
                            </span>
                        
                            <span className="listItemBtns">
                                <button 
                                    type="button" 
                                    className="btn btn-dark" 
                                    onClick={() => this.handleEditClick()}>
                                        Edit
                                </button>

                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={() => this.handleDelete(this.props.task.id)}>
                                        Delete
                                </button>
                            </span>
                        </div>
                    )
                    : (
                        <span className="updateDiv">
                            <input type="text" value={this.state.updatedTask} className="form-control" placeholder={this.props.task.taskName} onChange={this.handleChange}></input>
                            <button type="button" className="btn btn-warning" onClick={() => this.handleUpdateTask(this.props.task)}>Save</button>
                        </span>
                    )
                }
            </li>
        )
    }
}

export default Listitems;