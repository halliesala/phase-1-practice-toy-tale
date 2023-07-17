let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

// Fetch Andy's Toys
// On the index.html page, there is a div with the id "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

const toyDiv = document.querySelector(`#toy-collection`);
fetch(`http://localhost:3000/toys`)
.then(res => res.json())
.then(data => {
  data.forEach(toyObject => {
    createToy(toyObject);
  });
});

function createToy(toyObject) {
  // Make the toy card
  const newDiv = document.createElement(`div`);
  newDiv.setAttribute(`class`, `card`);

  // Add name
  const newH2 = document.createElement('h2');
  newH2.textContent = toyObject.name;
  newDiv.appendChild(newH2);

  // Add image (and limit height!)
  const img = document.createElement('img');
  img.src = toyObject.image;
  img.style.height = `200px`;
  newDiv.append(img);

  // Add like count
  const likes = document.createElement('p');
  likes.textContent = toyObject.likes;
  newDiv.appendChild(likes);

  // Add like button ...
  const button = document.createElement('button');
  button.setAttribute('class', 'like-btn');
  button.textContent = 'Like ❤️';
  // ... and button functionality
  button.addEventListener(`click`, () => {
    updateLikes(toyObject.id, ++toyObject.likes);
    likes.textContent = toyObject.likes;
  })
  newDiv.appendChild(button);

  toyDiv.appendChild(newDiv)
}

function updateLikes(id, newNumberOfLikes) {
  const OPTIONS = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
     "likes": newNumberOfLikes
    })
  }
  fetch(`http://localhost:3000/toys/` + id, OPTIONS)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })

}

// Set up new toy form
const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const OPTIONS = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
    body: JSON.stringify({
      name: e.target['name'].value,
      image: e.target['image'].value,
      likes: 0,
    })
  };

  fetch(`http://localhost:3000/toys`, OPTIONS)
  .then(res => res.json())
  .then(newToy => {
    console.log(newToy);
    createToy(newToy);
  });
});