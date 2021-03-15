let fields = document.getElementsByClassName("Edit");
let edit_button = document.getElementById("begin-edit");
let done_button = document.getElementById("end-edit");
let cancel_button = document.getElementById("cancel");

// gross global variable but needed to save values
// at least for now
let backupArray = new Array();

// add all the values into place holders?
edit_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].contentEditable = 'true';
        fields[i].style.backgroundColor = "black";
        backupArray[i] = fields[i].textContent;
        // console.log(backupArray[i]);
    }
    console.log(backupArray);
})

done_button.addEventListener("click", function(){

    for(let i = 0; i < fields.length; i++){
        fields[i].contentEditable = 'false';
        backupArray[i] = fields[i].textContent;
        // console.log(backupArray[i]);

        // do something here to go to endpoint that updates database

    }
})

cancel_button.addEventListener("click", function(){
    for(let i = 0; i < fields.length; i++){
        fields[i].textContent = backupArray[i];
        fields[i].contentEditable = 'false';

    }
})