import React from 'react'
import Nav from "./Nav";
import MainPage from './MainPage'
import AttendeesList from './AttendeesList'
import LocationForm from './LocationForm'
import ConferenceForm from './ConferenceForm'
import AttendConferenceForm from './AttendConferenceForm'
import PresentationForm from './PresentationForm'
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
    <Nav />
    <div className="container">
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
        <Route path="attendees/new" element={<AttendConferenceForm />} />
        <Route path="locations/new" element={<LocationForm />} />
        <Route path="conferences/new" element={<ConferenceForm />} />
        <Route path="presentations/new" element={<PresentationForm />} />
      </Routes>
    {/* <AttendConferenceForm />
    <AttendeesList attendees={props.attendees} />
    <LocationForm />
    <ConferenceForm />
    <PresentationForm /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;