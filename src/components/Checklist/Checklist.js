import React, { Component } from 'react';
import Listitems from '../Listitems/Listitems';
import './checklist.css';


class Checklist extends Component {
    state = {
        tasks: [],
        isAddingNewTask: false,
        newTask: ""
    }

    componentDidMount() {
        this.getTasks();
    }

    handleClearList() {
        fetch("http://localhost:8080/deleteAll", {
            method: "DELETE"
        })
        .then(res => {
            console.log(res);
            this.getTasks();
        })
        .catch(err => console.log(err));
    }

    getTasks = () => {
        fetch("http://localhost:8080/getChecklist")
        .then(res => {
            return res.json();
        })
        .then(data => {
            this.setState({ tasks: data })
        })
        .catch(err => console.log(err))
    }

    handleAddNewSave(newTask) {
        fetch("http://localhost:8080/addTask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                taskName: newTask
            })
        })
        .then(res => {
            console.log(res);
            this.setState(
                { 
                    isAddingNewTask: false,
                    newTask: ""
                }
            );
            this.getTasks();
        })
        .catch(err => console.log(err));
    }

    handleAddNewClick() {
        this.setState({ isAddingNewTask: true });
    }

    handleChange = (event) => {
        this.setState({ newTask: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <ul className="list-group col-md-6 offset-md-3">
                    {this.state.tasks.map((task) => (
                        <Listitems task={task} key={task.id} getTasks={this.getTasks}/>
                    ))}
                    </ul>
                </div>
                <div className="row btnRow">
                    {
                        (this.state.isAddingNewTask) ?
                        (
                        <span className="addingTaskInput">
                            <input type="text" value={this.state.newTask} className="form-control" onChange={this.handleChange}></input>
                            <button type="submit" className="btn btn-dark" onClick={() => this.handleAddNewSave(this.state.newTask)}>Save</button>
                        </span>
                        )
                        :
                        (
                            <button type="button" className="btn btn-dark checklistBtns" onClick={() => this.handleAddNewClick()}>Add Task</button>
                        )
                    }
                    <br />
                    <button type="button" className="btn btn-dark checklistBtns clrBtn" onClick={() => this.handleClearList()}>Clear List</button>
                </div>
            </div>
        )
    }
}

export default Checklist;