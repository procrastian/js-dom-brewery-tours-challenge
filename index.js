// *** PLANNING

/*

1 - use insomnia to ensure I can access the data from the API
    - get familiar with the data structure returned, and which parts I might need
        - state.brewery_type

2 - create a local state array in my JS that I can store brewery information in
    - think about paths to getting to the parts of the data I want for rendering later
    - think about how I can filter by brewery types for rendering specified types

3 - be able to take the user input from the search bar
    - prevent default submit behaviour to avoid page reloading
        -set up an event listener for when the form is submitted 
    - use the user input to construct the FETCH GET for data that matches this
    - check the links using insomnia and console.log() what is returned to check it

4 - saving the fetched data to my local state
    - ensure the state is cleared for each search
    - push the retrieved data into my local state array

5 - render the state on the page
    - use the templates for the format of the HTML components to create dynamically
    - create a function that will make a list item forEach of the matching data in the local state

*/

// *** CODE

// * STATE

const state = {
    found: []
}

// * QUERY SELECTORS

const whichStateForm = document.querySelector('#select-state-form')
const whichStateInput = document.querySelector('#select-state')
const breweriesUL = document.querySelector('#breweries-list')

// * EVENT HANDLERS

//when search is clicked, don't reload the page
whichStateForm.addEventListener('submit', (event) => {
    console.log('search clicked')
    event.preventDefault()
    // take the user input - save to variable
    const newInput = whichStateInput.value
    console.log('what was inputted?', newInput)
    getData(newInput)
    whichStateForm.reset()
})

// * SERVER LOGIC

const homeURL = 'https://api.openbrewerydb.org/v1/breweries?by_state='

// use that URL for the fetch GET
function getData(searchedForState) {
    console.log('called: getData')
// use that variable to interpolate into URL
    const link = `${homeURL}${searchedForState}`
    console.log('what is link?', link)
fetch(link)
    .then(res => res.json())
    .then(data => {
        console.log('fetched:', data)
        // store the data fetched in the local state
        state.found = data
        console.log('what is in the state?', state)
        renderFoundBreweries()
    })
    .catch(error => {
        console.log('fetch error:', error)
    })
}

// * RENDER LOGIC

//render the found breweries based on the state.todo array
function renderFoundBreweries() {
    console.log('called: renderFoundBreweries')
    breweriesUL.innerHTML = ''
    state.found.forEach((brewery) => {
        console.log('what brewery are you lookign at?', brewery)
        const li = document.createElement('li')
        breweriesUL.append(li)
    })
}







// const h2 = document.createElement('h2')
        //     const breweryName = found.name
        //     console.log('what is breweryName?', breweryName)
        //     h2.innerText = `${breweryName}`

        // li.append(h2)