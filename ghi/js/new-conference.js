console.log('new-conference.js loaded');

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/locations/'
  const response = await fetch(url);

  try {
    
    if (!response.ok) {
      throw new Error('Response not ok');
    } else {
      const data = await response.json()
      console.log(data)

      const selectTag = document.querySelector('#location')

      for (let location of data.locations) {
        const option = document.createElement('option')
        option.value = location.id
        option.innerText = location.name
        selectTag.appendChild(option)
      }

      const formTag = document.getElementById('create-conference-form')
      formTag.addEventListener('submit', async(event) => {
      event.preventDefault()
      console.log('Form submitted')
      
      const formData = new FormData(formTag)
      const json = JSON.stringify(Object.fromEntries(formData))
      console.log(json)
      
      const conferenceUrl = 'http://localhost:8000/api/conferences/'
      const fetchConfig = {
          method: "POST",
          body: json,
          headers: {
              'Content-Type': 'application/json',
            },
          }
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            formTag.reset()
            const newConference = await response.json()
            console.log(newConference)
          }
          
          })


    }
  } catch (e) {
    console.log(e);

    const alertPlaceholder = document.getElementById('alert')
      
      const wrapper = document.createElement('alert')
      wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">Invalid URL<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
          
      alertPlaceholder.append(wrapper);
  }
});