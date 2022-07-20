console.log('new-location.js loaded');

window.addEventListener('DOMContentLoaded', async () => {

  const url = "http://localhost:8000/api/states/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Response not ok');
    } else {
      const data = await response.json()

      const selectTag = document.querySelector('#state')

      for (let state of data.states) {
        const option = document.createElement('option')
        option.value = state.abbreviation;
        option.innerText = state.name;
        selectTag.appendChild(option);
      }

      const formTag = document.getElementById('create-location-form')
      formTag.addEventListener('submit', async(event) => {
      event.preventDefault()
      console.log('Form submitted')
      
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData))
      console.log(json);
      
      const locationUrl = 'http://localhost:8000/api/locations/'
      const fetchConfig = {
          method: "post",
          body: json,
          headers: {
              'Content-Type': 'application/json',
            },
          };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation);
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