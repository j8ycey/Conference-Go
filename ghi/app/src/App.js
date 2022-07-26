import React from 'react'
import Nav from "./Nav";
import AttendeesList from './AttendeesList'
import LocationForm from './LocationForm'
import ConferenceForm from './ConferenceForm'
import AttendConferenceForm from './AttendConferenceForm'
import PresentationForm from './PresentationForm'


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <Nav />
    <div className="container">
    {/* <LocationForm /> */}
    {/* <AttendeesList attendees={props.attendees} /> */}
    {/* <ConferenceForm /> */}
    {/* <AttendConferenceForm /> */}
    <PresentationForm />
    </div>
    </>
  );
}

export default App;