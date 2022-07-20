function createCard(name, description, duration, location, pictureUrl) {
  return `
    <div class="col">
      <div class="card shadow">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
          ${duration}
        </div>
      </div>
    </div>
  `;
}

function createPlaceHolder() {
  return `
    <div class="col">
      <div class="card shadow" aria-hidden="true">
        <img src="../images/gray.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title placeholder-glow"">
            <span class="placeholder col-6"></span>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted placeholder">
            <span class="placeholder col-7"></span>
          </h6>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
        </div>
        <div class="card-footer placeholder-glow">
          <span class="placeholder col-6"></span>
        </div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {
  
  const url = 'http://localhost:8000/api/conferences/';

  try {
      const response = await fetch(url);
  
      if (!response.ok) {
          throw new Error('Response not ok');
      } else {
          const data = await response.json();
          
          const column = document.querySelector('.row');

          for (let conference of data.conferences) {
              const detailURL = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailURL);
              if (detailResponse.ok) {
                  const placeholder = createPlaceHolder();
                  column.innerHTML += placeholder;
              }
          } 
          
          let allColumns = document.querySelectorAll(".col");
          let i = 0;
          for (let conference of data.conferences) {
              const detailURL = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailURL);
              if (detailResponse.ok) {
                  const details = await detailResponse.json();

                  const name = details.conference.name;
                  const description = details.conference.description;
                  const starts = new Date(details.conference.starts);
                  const ends = new Date(details.conference.ends);
                  const duration = `${starts.toLocaleDateString()} - ${ends.toLocaleDateString()}`
                  const location = details.conference.location.name;
                  const pictureUrl = details.conference.location.picture_url;
                  const html = createCard(name, description, duration, location, pictureUrl);

                  allColumns[i].innerHTML = html;
                  i++;
              }
          }
      }
  } catch (e) {
      const alertPlaceholder = document.getElementById('alert')
      
      const wrapper = document.createElement('alert')
      wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">Invalid URL<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
          
      alertPlaceholder.append(wrapper);
  }

});