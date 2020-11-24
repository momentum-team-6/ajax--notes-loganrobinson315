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
    console.log(event.target.classList)
    if (event.target.classList.contains('update')){
        console.log('in submit.update-note')
        updateNote(noteText.value)
        
    } else {
        console.log('in submit.create-note')
        createNote(newNote)
    }
    
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
            

        })
}
//---------this sends my data to my server---------//


//---------this puts my data(note) in a list on my page-----------//
function renderNoteItem(noteObj) {
    const noteEl = document.createElement('li')
    noteEl.innerHTML = `<div id="note-${noteObj.id}-text">${noteObj.item}</div>`
    noteEl.id = noteObj.id
    noteList.appendChild(noteEl)
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    noteEl.appendChild(deleteButton)
    deleteButton.classList.add('delete')
    const updateButton = document.createElement('button')
    updateButton.innerText = 'update'
    noteEl.appendChild(updateButton)
    updateButton.classList.add('update')
}
//---------this puts my data(note) in a list on my page----------//


//---------Adds delete button to elements----------//

noteList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
      deleteNote(event.target)
    }




// function createDeleteButton(element) {
//     const deleteButton = document.createElement('button')
//     deleteButton.innerText = 'delete'
//     noteList.appendChild(deleteButton)
    
//   }


function deleteNote(element) {
    console.log(element)
    console.log(element.parentElement)
    const noteId = element.parentElement.id
    


    fetch(`http://localhost:3000/notes/${noteId}`, {
            method: 'DELETE'
        })
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
        })
        document.location.reload()
}
})


//---------Update note function---------//

noteList.addEventListener('click', function (event) {
    if (event.target.classList.contains('update')) {
      updateNote(event.target)
    }
})

function updateNote(element) {
    
    console.log(element)
    console.log(element.parentElement.innerText)
    const noteId = element.parentElement.id
    const noteText = document.querySelector(`#note-${noteId}-text`).innerText
    console.log(noteText)
    const saveButton = document.querySelector("#save-note")
    saveButton.classList.add("update")
    
    document.querySelector('#note-text').value = noteText
    // const note

    fetch(`http://localhost:3000/notes/${noteId}` , {
        method: 'PATCH' ,
        body: JSON.stringify({
            item: noteText.value
        })
        
    })
    .then(function (res) {
        return res.json()
     })
     .then(function(data){
         console.log(data)
        
    
    //     updateButton.classList.add('update')
    // }
        //   
         // reset the saveButton not to have the update class
        saveButton.classList.remove("update")
     })
    }

    noteList.addEventListener('edit', function (event) {
        console.log('in update')
        if (event.target.classList.contains('edit')) {
          updateNote(event.target)
        }
    })