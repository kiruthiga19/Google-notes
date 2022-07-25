

    let text=true;

function colorred(){
    document.getElementById('text').style.background ="LightCoral";
    text=true;
}

function Colorblue(){
    text=false;
    document.getElementById('text1').style.background ="LightCoral";
    if(text=true){
        colorred();
    }
    else{
        Colorblue();
    }
}


const addBox =document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box");
closeIcon = popupBox.querySelector("header i");
titleTag = popupBox.querySelector("input"),
desTag = popupBox.querySelector(".des"),
addBtn = popupBox.querySelector("button");

// to get a data from server to user and it coverted string  to js object 
const notes =JSON.parse(localStorage.getItem("notes")||"[]"); 
let Updated =false, updateId;

// it is used to popup the title and description and button we are added
addBox.addEventListener("click",()=>{
   
    popupBox.classList.add("show");
});
 
// it is used to close the popup bex when we open it when refrese the page only it will close in that case we use remove function
closeIcon.addEventListener("click",()=>{
     

    // when we click add button after entering the value the title and text area should be ementy so that the reson to use it 
    titleTag.value ="";
    desTag.value ="";
   // remove the popup 
    popupBox.classList.remove("show");
});
// add button  
addBtn.addEventListener("click",values=>{

    // console.log("button clicked");

    // preventDefaut method is used to prevent the  data while trigerring
    values.preventDefault();

    // to get a value frome title while popup display so the value keyword is used 
    let noteTitle = titleTag.value,

    // this is used to get the description value and which is entered in text filed and stored in noteDesc 
    noteDesc =desTag.value;
    //console.log(noteTitle,noteDesc)

    if(noteTitle || noteDesc){
        // to concadinate in a single object
        let noteInfo ={
            title:noteTitle,description:noteDesc
        }
       if(!Updated){
        notes.push(noteInfo);
       }
       else{
        notes[updateId]=noteInfo;
       }
        
       //adding new note to notes

        //saving notes to localstorage 
        //setitem is used to set the data in local storage
        // stringify is used to set the user data in local storage  which is in js object to string 
        localStorage.setItem("notes",JSON.stringify(notes));


        // when we click on add button after entering the details it will close so we call a colseicon hear
        closeIcon.click();

        // to call the shownotes bex of updated value will be displayed in ui
        showNotes();
    }
        
    
})




// edit a note
function updateNote(noteId,title,desc){

    //console.log(noteId,title,desc)
    Updated =true;
     updateId=noteId; 
    // to make a edit on the add popup
    addBox.click();
    addBtn.innerText="updated note"
    // to display the entered value in title and description
    titleTag.value =title;
    desTag.value =desc;
    console.log(noteId,title,desc);
}

// to delete the note 
function deleteNote(noteId){
    //it is used to delete the note
    notes.splice(noteId,1);// removing an selected notes 

    // to also update on local storage 
    localStorage.setItem("notes",JSON.stringify(notes));

    // it is used to display the notes 
    showNotes();
}


// it is used to display the notes 
function showNotes(){
    // we totally remove the notes we entered  
    document.querySelectorAll(".note").forEach(note=>note.remove());

    // to get the note and display into ui 
    notes.forEach((note,index)=>{
          //console.log(note);

        // when using a template literal it is easy to concadinate(adding) a value easly
        let liTag=`<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
         
          <div class="settings">
            <i onclick="showMenu(this)">click</i>
            <ul class="menu">
              <li onclick ="updateNote(${index},'${note.title}','${note.description}')">
              <i class="uil uil-pen"></i>edit</li>
              <li onclick ="deleteNote(${index})"><i class="uil uil-trash"></i>delete</li>
            </ul>
          </div>
        </div>
      </li>`

      // it is used to display the entered value in text area in ui and to insert html code in specific position
      addBox.insertAdjacentHTML("afterend",liTag);
    });
}
showNotes();

// it is used to show the menu of edit and delete 
function showMenu(choose){
    //console.log(choose);

    // the menu will be called from a parentelement -> settings
    //The classList property returns the CSS classnames of an element.
    choose.parentElement.classList.add("show");
    document.addEventListener("click",event1 =>{


        // if it is an anonymous function or event is not clicked it will remove the menu list 
        if(event1.target.tagName !="I" || event1.target !=choose){

            // to remove the menu list
            choose.parentElement.classList.remove("show");
        }
    });
}




