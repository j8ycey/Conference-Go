function createCard(name, description, pictureUrl, newStartDate, newEndDate, location) {
  return `
  <div class="col">
    <div class="card shadow-lg p-3 mb-5 bg-body rounded">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="blockquote-footer">
        <small class="text-muted"> ${newStartDate} - ${newEndDate} </small>
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
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name;

                    let startDate = details.conference.starts;
                    let d1 = new Date(startDate)
                    let newStartDate = (d1.getMonth()+1) + "/" + d1.getDate() + "/" + d1.getFullYear()
                    let endDate = details.conference.ends;
                    let ld = new Date(endDate)
                    let newEndDate = (ld.getMonth()+1) + "/" + ld.getDate() + "/" + ld.getFullYear()

                    const html = createCard(name, description, pictureUrl, newStartDate, newEndDate, location);
                    
                    const column = document.querySelector(`.row`);
                    column.innerHTML += html;
                }
            }

        }
    } catch (e) {
        console.error('error', e)
    }

});