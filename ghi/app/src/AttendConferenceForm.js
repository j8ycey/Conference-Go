import React from 'react'

class AttendConferenceForm extends React.Component {
    constructor(props)  {
      super(props)
      this.state = {
        conferences: [],
        name: '',
        email: '',
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handleConferenceChange = this.handleConferenceChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
      event.preventDefault()
      const data = {...this.state}
      delete data.conferences
      delete data.success
      console.log(data)

      const url = `http://localhost:8001${data.conference}attendees/`
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
    }
      const response = await fetch(url, fetchConfig)
      if (response.ok) {
        const newAttendee = await response.json()
        console.log(newAttendee);
        const cleared = {
          name: '',
          email: '',
          conference: '',
        };
        this.setState(cleared);
        this.setState({success: true})
      }
    }

    async componentDidMount() {
      // Creates conference list dropdown
      const conferenceUrl = 'http://localhost:8000/api/conferences/'
      const response = await fetch(conferenceUrl)
      if (response.ok) {
        const data = await response.json()
        this.setState({conferences: data.conferences})
      }
    }

    handleNameChange(event) {
      this.setState({name: event.target.value})
      
    }

    handleEmailChange(event) {
      this.setState({email: event.target.value})
    }

    handleConferenceChange(event) {
      this.setState({conference: event.target.value})
    }

    render() {
      let spinnerClasses = "d-flex justify-content-center mb-3"
      let dropdownClasses = "form-select d-none"
      if (this.state.conferences.length > 0) {
        spinnerClasses = "d-flex jsutify-content-center mb-3 d-none"
        dropdownClasses = "form-select"
      }

      let successMessageClasses = "alert alert-success mb-0 d-none"
      let formClasses = ""
      if (this.state.success === true) {
        successMessageClasses = "alert alert-success mb-0"
        formClasses = "d-none"
      }


      return (<div className="my-5">	
      <div className="row">	
        <div className="col col-sm-auto">	
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />	
        </div>	
        <div className="col">	
          <div className="card shadow">	
            <div className="card-body">	
              <form onSubmit={this.handleSubmit} id="create-attendee-form" className={formClasses}>	
                <h1 className="card-title">It's Conference Time!</h1>	
                <p className="mb-3">	
                  Please choose which conference	
                  you'd like to attend.	
                </p>	
                <div className={spinnerClasses} id="loading-conference-spinner">	
                  <div className="spinner-grow text-secondary" role="status">	
                    <span className="visually-hidden">Loading...</span>	
                  </div>	
                </div>	
                <div className="mb-3">	
                  <select value={this.state.conference} onChange={this.handleConferenceChange} name="conference" id="conference" className={dropdownClasses} required>	
                    <option value="">Choose a conference</option>	
                    {this.state.conferences.map(conference => {	
                      return (	
                        <option key={conference.id} value={conference.href} >	
                          {conference.name}	
                        </option>	
                      )	
                    })}	
                  </select>	
                </div>	
                <p className="mb-3">	
                  Now, tell us about yourself.	
                </p>	
                <div className="row">	
                  <div className="col">	
                    <div className="form-floating mb-3">	
                      <input value={this.state.name} onChange={this.handleNameChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" />	
                      <label htmlFor="name">Your full name</label>	
                    </div>	
                  </div>	
                  <div className="col">	
                    <div className="form-floating mb-3">	
                      <input value={this.state.email} onChange={this.handleEmailChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" />	
                      <label htmlFor="email">Your email address</label>	
                    </div>	
                  </div>	
                </div>	
                <button className="btn btn-lg btn-primary">I'm going!</button>	
              </form>	
              <div className={successMessageClasses} id="success-message">	
                Congratulations! You're all signed up!
              </div>	
            </div>	
          </div>	
        </div>	
      </div>	
    </div>
      )
    } 
  }
export default AttendConferenceForm;