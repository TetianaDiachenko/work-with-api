const root = document.getElementById('root');
const btn = document.getElementById('search-btn');
const charactersWrap = document.getElementById('characters-wrap');
const more = document.querySelector('.load-more');

const fiveChar = [];

charactersWrap.classList = 'hide';
more.id = 'more';
more.classList = 'hide';

// Check input
function test() {
  let inputId = document.getElementById('search-input').value;
    try {
      let idCharecters = localStorage.getItem('idCharecters')
        ? localStorage.getItem('idCharecters')
        : '';
      /* eslint-disable no-magic-numbers */
      if (!inputId || inputId < 1 || inputId > 826 || isNaN(inputId)) {
        throw new Error('Character not found');
      }
      if (idCharecters.split('').includes(inputId)) {
        throw new Error('Character is already in the list');
      }

      charactersWrap.classList.remove('hide');
      result();

      idCharecters += ` ${inputId}`;
      localStorage.setItem('idCharecters', idCharecters);
      idCharecters = idCharecters.split(' ');
    } catch (e) {
        alert(e.message);
    }
}

btn.addEventListener('click', test);

// work with Api and create the Charecter by id
function result() {
  let inputId = document.getElementById('search-input').value;
    let reqUrl = 'https://rickandmortyapi.com/api/character' + '/' + inputId;
    
  fetch(reqUrl)
    .then((resp) => resp.json())
    .then((data) => {
      let character = data;
      let div = document.createElement('div');
      let img = document.createElement('img');
      img.src = character.image;
      img.alt = 'character image';
      charactersWrap.prepend(div);
      div.appendChild(img);

      fiveChar.push(character.image);

        if (fiveChar.length > 5) {
          const more = document.getElementById('more');
          more.classList.remove('hide');
        }     
    })
    .catch(function (error) {
      console.log(error);
    });
}
      // more.addEventListener('click', );


