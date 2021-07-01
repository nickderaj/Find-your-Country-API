'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}m people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

/////////// FUNCTIONAL CODE //////////
// const locateMe = function () {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       const coords = [latitude.toFixed(2), longitude.toFixed(2)];
//       console.log(coords);
//       whereAmI(coords[0], coords[1]);
//       btn.removeEventListener('click', locateMe);
//     },
//     function () {
//       throw new Error('Could not get current location');
//     }
//   );
// };
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=110098686723014e15740532x43974 `
//   )
//     .then(response => {
//       if (!response.ok) throw new Error('too many requests');
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('country not found');
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err =>
//       countriesContainer.insertAdjacentText(
//         'beforeend',
//         `Something went wrong, ${err.message}. Try again!`
//       )
//     )
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', locateMe);

/////////// PROMISIFYING //////////

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=110098686723014e15740532x43974 `
      );
    })
    .then(response => {
      if (!response.ok) throw new Error('too many requests');
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error('country not found');
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err =>
      countriesContainer.insertAdjacentText(
        'beforeend',
        `Something went wrong, ${err.message}. Try again!`
      )
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);

/////////// TEST CODE /////////////

/*

const getJSON = function (url, errorMsg = 'Somethign went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error(': No neighbour found');

      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err =>
      renderError(`Something went wrong ${err.message}. Try again!`)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('malaysia');
});



// Testing asynchronous:
console.log('Test start'); // 1
setTimeout(() => console.log('0 sec timer'), 0); // 4
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3
console.log('test end'); // 2

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000; i++) {}
  console.log(res);
});


const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You LOSE 😢'));
    }
  }, 2000);
});

lotteryPromise
  .then(resolve => console.log(resolve))
  .catch(err => console.log(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1).then(() => {
    console.log('I waited another second');
    return wait(1);
  });
});

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('def')).catch(x => console.error(x));
*/
