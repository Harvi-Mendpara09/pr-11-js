function fetchData() {
    fetch('https://api.rootnet.in/covid19-in/stats/latest')
        .then(response => response.json())
        .then(data => {
            updateSummary(data.data.summary);
            updateRegional(data.data.regional);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateSummary(summary) {
    const summaryElement = document.getElementById('summary');
    summaryElement.innerHTML = `
      <h4>Summary</h4>
      <p>Total Cases: ${summary.total}</p>
      <p>Confirmed Cases (Indian): ${summary.confirmedCasesIndian}</p>
      <p>Confirmed Cases (Foreign): ${summary.confirmedCasesForeign}</p>
      <p>Discharged: ${summary.discharged}</p>
      <p>Deaths: ${summary.deaths}</p>
      <p>Confirmed But Location Unidentified: ${summary.confirmedButLocationUnidentified}</p>
    `;
}

function updateRegional(regionalData) {
    const regionalElement = document.getElementById('regional');
    regionalElement.innerHTML = `
      <h4>Regional Data</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Confirmed Cases (Indian)</th>
            <th>Confirmed Cases (Foreign)</th>
            <th>Discharged</th>
            <th>Deaths</th>
            <th>Total Confirmed</th>
          </tr>
        </thead>
        <tbody>
          ${regionalData.map(region => `
            <tr>
              <td>${region.loc}</td>
              <td>${region.confirmedCasesIndian}</td>
              <td>${region.confirmedCasesForeign}</td>
              <td>${region.discharged}</td>
              <td>${region.deaths}</td>
              <td>${region.totalConfirmed}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
}

window.onload = fetchData;