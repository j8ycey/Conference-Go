window.addEventListener('DOMContentLoaded', async () => {
  
  const url = 'http://localhost:8000/api/conferences/'
  const response = await fetch(url)
  
  try {
  
  if (response.ok) {
    const data = await response.json()
    const selectTag = document.getElementById('conference')
    
    for (let conference of data.conferences) {
      const option = document.createElement('option')
      option.value = conference.href
      option.innerHTML = conference.name
      selectTag.appendChild(option)
    }
    const spinnerTag = document.getElementById('loading-conference-spinner')
    spinnerTag.classList.add("d-none")

    const conferenceTag = document.getElementById('conference')
    conferenceTag.classList.remove("d-none")

    const formTag = document.getElementById('create-attendee-form')
    formTag.addEventListener('submit', async(event) => {
      event.preventDefault()
      console.log('Form submitted')

      const formData = new FormData(formTag)
      const json = JSON.stringify(Object.fromEntries(formData))
      console.log(json)

      const attendeeUrl = `http://localhost:8001/api/attendees/`
      const fetchConfig = {
          method: "POST",
          body: json,
          headers: {
              'Content-Type': 'application/json',
            },
          }
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            formTag.reset()
            const newAttendee = await response.json()
            console.log(newAttendee)

            const alertTag = document.getElementById('success-message')
            alertTag.classList.remove("d-none")
            formTag.classList.add("d-none")
          }

    })
  }}
  catch (e) {
  console.log(e);

  const alertPlaceholder = document.getElementById('alert')
    
    const wrapper = document.createElement('alert')
    wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">Invalid URL<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        
    alertPlaceholder.append(wrapper);
}
});