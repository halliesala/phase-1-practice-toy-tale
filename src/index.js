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

//     h2 tag with the toy's name
// img tag with the src of the toy's image attribute and the class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class "like-btn" and an id attribute set to the toy's id number
  })
})

function createToy(toyObject) {
  const newDiv = document.createElement(`div`)
    newDiv.setAttribute(`class`, `card`)
    const img = document.createElement('img');
    img.src = toyObject.image;
    img.style.height = `200px`;
    newDiv.append(img);
    toyDiv.appendChild(newDiv)
    const likes = document.createElement('p');
    likes.textContent = toyObject.likes;
    newDiv.appendChild(likes);
    const button = document.createElement('button');
    button.setAttribute('class', 'like-btn');
    button.textContent = 'Like ❤️';
    newDiv.appendChild(button);
    // ADD LIKE FUNCTIONALITY TO BUTTON
    button.addEventListener(`click`, () => {
      // const currentNumLikes = toyObject.likes;
      updateLikes(toyObject.id, ++toyObject.likes)
      likes.textContent = toyObject.likes
    })
}

function updateLikes(id, newNumberOfLikes) {
  const OPTIONS = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // "Accept": "application/json",
    },
    body: JSON.stringify({
     "likes": newNumberOfLikes
    })
  }
  fetch(`http://localhost:3000/toys/` + id, OPTIONS)
  .then(res => res.json())
  .then(data => {

  })

}
  // fetch(`http://localhost:3000/toys/:` + id, OPTIONS)
console.log(`http://localhost:3000/toys/:` + 1)
updateLikes(1, 500)



const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('I work!');
  const OPTIONS = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
    body: JSON.stringify({
      // ADD BODY
      name: e.target['name'].value,
      image: e.target['image'].value,
      likes: 0,
    })
  }
  fetch(`http://localhost:3000/toys`, OPTIONS)
  .then(res => res.json())
  .then(newToy => {
    console.log(newToy);
    createToy(newToy);
  })
})