const url = 'http://localhost:3000/notes/'
const form = document.querySelector('#noteForm')
const noteList = document.querySelector('#note-list')

//----------this gets my data from my server----------//
fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        for (let note of data) {
            renderNoteItem(note)
            // createDeleteButton(deleteButton)
        }
    })
//----------this gets my data from my server--------------//


//----------this responds to my submit button----------//
form.addEventListener('submit', function (event) {
    event.preventDefault()
    const newNote = document.querySelector('#note-text').value
    createNote(newNote)

})
//----------this responds to my submit button----------//


//--------this sends my data to my server--------//
function createNote(newNote) {
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: newNote
            })
        })
        .then(res => res.json())
        .then(data => {
            renderNoteItem(data)
            // createDeleteButton(deleteButton)

        })
}
//---------this sends my data to my server---------//


//---------this puts my data(note) in a list on my page-----------//
function renderNoteItem(noteObj) {
    const noteEl = document.createElement('li')
    noteEl.innerText = noteObj.item
    noteList.appendChild(noteEl)
}
//---------this puts my data(note) in a list on my page----------//


//---------Adds delete button to elements----------//

todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
      deleteNote(event,target)
    }




function createDeleteButton(element) {
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    noteList.appendChild(deleteButton)
    
  }


function deleteNote(id) {
    console.log(eventTarget.parentElement)
    const noteId = eventTarget.parentElement.id


    fetch(`http://localhost:3000/notes/${noteId}`, {
            method: 'DELETE'
        })
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
        })

}
})


