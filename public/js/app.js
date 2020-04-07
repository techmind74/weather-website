// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })
//dddd
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading forecast...';
    messageTwo.textContent = '';
   // console.log(location);

    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
             //   console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.summary + ' It is currently ' + data.forecast.temperature + ' degrees out. There is a ' + data.forecast.precip + '% chance of rain.';
                console.log(data.forecast);
            }
        })
    })

});