import $ from 'jquery' 
import React from 'react'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      successMeg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // reset state 
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // submit info to server
  handleSubmit(event) {
    event.preventDefault();
    this.sendRequest(); 
  }

  // function that use ajax to send out POST/GET request 
  sendRequest() {
    var message = {
      name: this.state.name,
      message: this.state.message
    };

    $.ajax({
      url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
        this.setState({
          successMeg: data 
        })
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });     
  }

  // render function 
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <p>Server Response:{this.state.successMeg}</p>
        <label>
          Name:
          <input type="text" name='name' onChange={this.handleChange} />
        </label>
         <label> 
           Message:
           <input type='text' name='message' onChange={this.handleChange} />
        </label>
        <input type="submit" value="Send Message"  />
      </form>
      </div>
    );
  }
}
export default App;
