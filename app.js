const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const countryDetails = document.getElementById('country-details');
const errorDiv = document.getElementById('error');
const spinner = document.getElementById('spinner');

searchButton.addEventListener('click', function () {
    const search = searchInput.value;
    if (search === '') {
        errorDiv.innerText = 'Search field can not be empty';
        return;
    }
    //clear dom
  countryContainer.innerHTML = '';
  countryDetails.innerHTML = '';
  const url = `https://restcountries.eu/rest/v2/name/${search}`;
  spinner.classList.add('d-none');
    fetch(url)
        .then(res => res.json())
    .then(data => showData(data));
});

function showData(country) {
     
            //error handle 
            if (country.status === 404) {
                errorDiv.innerText = 'NO Found';
            } else {
                errorDiv.innerText = '';
            }
            country.forEach(item => {
                console.log(item);
                const div = document.createElement('div');
                div.classList.add('col-md-3');
              div.innerHTML = `
                <div class="rounded overflow-hidden border p-2">
            <img
              src="${item.flag}"class="w-100" alt=""/>
          </div>
          
          <div
            class=" py-2 d-flex justify-content-between align-items-center d-md-block  text-md-center " >
           
            <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
          </div>
                `;
                countryContainer.appendChild(div);    
            });     
}

function showDetails(alpha3Code) {
  fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then(res => res.json())
    .then(data => showCountryDetails(data));
  }

const showCountryDetails = countries => {
  console.log(countries);
  countryDetails.innerHTML = `
  <div class="col-md-12">
        <h1>country:${countries.name}</h1>
        <p>city:${countries.capital}</p>
        <p>nativeName:${countries.nativeName}</p>
        <p>native lan:${countries.languages[0].name}</p>     
  </div>
  `;
}

/*

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const errorDiv = document.getElementById('error');

searchButton.addEventListener('click', function () {
    const search = searchInput.value;
    if (search === '') {
        errorDiv.innerText = 'Search field can not be empty';
        return;
    }
    //clear dom
    countryContainer.innerHTML = '';
    const url = `https://restcountries.eu/rest/v2/name/${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //error handle 
            if (data.status === 404) {
                errorDiv.innerText = 'NO Found';
            } else {
                errorDiv.innerText = '';
            }
            data.forEach(item => {
                console.log(item);
                const div = document.createElement('div');
                div.classList.add('col-md-3');
                div.innerHTML = `
                <div class="rounded overflow-hidden border p-2">
            <img
              src="${item.flag}"
              class="w-100"
              alt=""
            />
          </div>
          
          <div
            class="
              py-2
              d-flex
              justify-content-between
              align-items-center
              d-md-block
              text-md-center
            "
          >
            <h1>${item.name}</h1>
            <p>${item.capital}</p>
            <button class="btn btn-dark">Learn More</button>
          </div>
                `;
                countryContainer.appendChild(div);


                
            });
        });
});







 //যদি ডেটা এরে টাইপ হয় তখন ফর লোপ হবে */