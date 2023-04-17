import React, { Component } from 'react';
import axios from 'axios';

export class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfStudent: '',
      ageOfStudent: '',
      addressOfStudent: '',
      secction:'A',
    };
  }

  nameChangeHandler = (event) => {
    this.setState({
      nameOfStudent: event.target.value,
    });
  };

  ageChangeHandler = (event) => {
    this.setState({
      ageOfStudent: event.target.value,
    });
  };

  addressChangeHandler = (event) => {
    this.setState({
      addressOfStudent: event.target.value,
    });
  };

  sectionChangeHandler = (event) => {
    this.setState({
      section: event.target.value,
    });
  };

  handleSubmit = (event) => {

    const { nameOfStudent, ageOfStudent, addressOfStudent, section } = this.state;
    alert(`Name: ${nameOfStudent}\nAge: ${ageOfStudent}\nAddress: ${addressOfStudent}\nSection: ${section}`);
    event.preventDefault()
    console.log(this.state);
    axios
      .post('https://jsonplaceholder.typicode.com/posts',this.state)
        .then(response =>{
        console.log(response)
          })
      .catch(error =>{
      console.log(error)
        })
  };
  render() {
    const { nameOfStudent, ageOfStudent, addressOfStudent,section } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={nameOfStudent} onChange={this.nameChangeHandler} />
        </div>
        <div>
          <label>Age</label>
          <input type="number" value={ageOfStudent} onChange={this.ageChangeHandler} />
        </div>
        <div>
          <label>Address</label>
          <textarea value={addressOfStudent} onChange={this.addressChangeHandler} />
        </div>
        <div>
          <label>Section</label>
          <select value={section} onChange={this.sectionChangeHandler}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    );
  }
}

export default FormComponent;