document.getElementById('btn-jokes').addEventListener('click', getJokes);
// UI
const numberDOM = document.getElementById('number'),
      jokesWrapper = document.querySelector('.jokes');

function getJokes (e) {
  e.preventDefault(); // just in case
  let number  = numberDOM.value; // input value
  if (number > 0) {
    // Ajax Request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`); 
    xhr.onload = function () {
      if (this.status === 200) {
        let jokes = JSON.parse(this.responseText),
            output = '';
        // if the type is success loop it, if not, show error    
        jokes.type === 'success' ? jokes.value.map(obj => output += `<li>${obj.joke}</li>`) : output += '<li>Something went wrong!</li>';
        // finally output the data
        jokesWrapper.innerHTML = output;
      }  
    } // finish onload function
    xhr.send(); // send request
  } else {
    alert('Please write a number greater than 0');
  }
}