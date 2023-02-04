//create firebase reference
var dbRef = new Firebase("https://ldc-maintenance.firebaseio.com/");
var contactsRef = dbRef.child('Logs');
var cardRef = dbRef.child('Logs');
var cardId;

var parent = document.getElementById("jobCardsList");
var allJobCards = document.getElementById('contacts');
var detailedJobCard = document.getElementById('details');
var inProgressJobCard = document.getElementById('in-progress');
var onHoldJobCard = document.getElementById('on-hold');
var completedJobCard = document.getElementById('completed-jobs');
var requestedJobCard = document.getElementById('requested-jobs');

var pageId;
var newJobNumber;
var newId;




//load all ordered jobs as well as any newly added one... *****************************************
function getAllJobs(){
    
    // get all jobs list sort by date descending
    contactsRef.on("child_added", function (snap) {
        // creat new li element
          var newLi = document.createElement("li");
          
          // give new id to new li
          newLi.id = parseInt(snap.val().jobnumber);
          
          //get parent ul element
          var ulList = document.getElementById("contacts");
          
          // get existing li child element by id
          //var child = document.getElementById(newLi.id-1);
          
          // Insert <li> before the first child of <ul>
          ulList.insertBefore(newLi,ulList.childNodes[0]);
    //document.getElementById(newLi.id).innerHTML += (inProgressJobCards(snap.val())); 
    document.getElementById(newLi.id).innerHTML += (listJobCards(snap.val())); 
});
    
    
    // to set sort list by date option
    /*document.getElementById("sort-by").addEventListener("change", function()
        { var selected = document.getElementById("sort-by").value;
  
    switch (selected) {
        case "Ascending" :
            
            contactsRef.on("child_added", function (snap) {
            newStatus = snap.val().status; //Get contact.status value
            //priority = snap.val().priority; //Get contact.priority value

            // creat new li element
            var newLi = document.createElement("li");

            // give new id to new li
            newLi.id = parseInt(snap.val().jobnumber);

            //get parent ul element
            var ulList = document.getElementById("contacts");

            // get existing li child element by id
            //var child = document.getElementById(newLi.id-1);

            // Insert <li> before the first child of <ul>
            ulList.insertBefore(newLi, ulList.childNodes[0]);

            //document.getElementById(newLi.id).innerHTML += (contactHtmlFromObject(snap.val())); 
            document.getElementById(newLi.id).innerHTML += (listJobCards(snap.val()));
        });
                break;
            
        case "Descending":
            contactsRef.on("child_added", function (snap) {
            document.querySelector('#contacts').innerHTML += (listJobCards(snap.val()));
            });
            break;
    }
    
    });*/


pageId = 1;
document.getElementById("contacts").style.cursor = "pointer"; // change cursor pointer style

}


function saveNewJob(){
    
    var priority;
    
    switch (document.getElementById("confirm-new-priority").value){
        
        case "Low priority - long term":    priority = "1";
                                            break;
        case "Normal priority - in the following days": priority = "2";
                                                        break;
        case "High priority - right now!":  priority = "3";
                                            break;
    }
    contactsRef
      .push({
          date: document.getElementById('confirm-new-job-date').innerHTML,
          details: document.getElementById('confirm-new-details').value,
          id: newId,
          job: document.getElementById('confirm-new-job').value,
          jobnumber: document.getElementById('confirm-new-job-number').innerHTML,
          name: document.getElementById('confirm-new-location').value,
          note: "There is no note, yet.",
          priority: priority,
          status: "Requested",
          user: document.getElementById('confirm-new-job-by-user').innerHTML
      });
    
    // Reset request form
    document.getElementById("contactForm").reset();
}



function newJobConfirm(){
    
    document.getElementById("confirm-new-job").value = document.getElementById("new-job").value;
    document.getElementById("confirm-new-details").value = document.getElementById("new-details").value;
    document.getElementById("confirm-new-location").value = document.getElementById("new-location").value;
    document.getElementById("confirm-new-priority").value = document.getElementById("new-priority").value;
    
    document.getElementById("confirm-new-job-number").innerHTML = document.getElementById("new-job-number").innerHTML;
    document.getElementById("confirm-new-job-date").innerHTML = document.getElementById("new-job-date").innerHTML;
    document.getElementById("confirm-new-job-by-user").innerHTML = document.getElementById("new-job-by-user").innerHTML;
   
}



// Get last job number and set the next one, get actual date in format dd/mm/yyyy, get user name by logged in user
function getNewJobNumber(){
    
    
    //get last job number and incrase by 1
    contactsRef.orderByChild("jobnumber").limitToLast(1).on("child_added", function(snap) {
        
    newJobNumber = parseInt(snap.val().jobnumber) +1;
    newId = parseInt(snap.val().id) - 1;

    document.getElementById("new-job-number").innerHTML = newJobNumber.toString();});
    document.getElementById("new-job-date").innerHTML = getNewDate();
    //Must set after Login page set up !!!!!!!
    document.getElementById("new-job-by-user").innerHTML = "setwhenloginpagedon@merlinetertainment.biz";
    
}


// get actual date in format dd/mm/yyyy
function getNewDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
//document.write(today);
}


/* *********************************************************************************************** */

//load specific detailed job card by job number **********************************************
function getJobDetails(cardId){ 
    
    cardRef.orderByChild("jobnumber").equalTo(cardId).on("child_added", function(snap) {
    document.querySelector('#details').innerHTML += (detailedJobcard(snap.val())); 
});

    switch (pageId){
        case 1: parent.removeChild(allJobCards); //remove all job cards element
            break;
        case 2:parent.removeChild(inProgressJobCard); //remove in progress job cards element
            break;
        case 3:parent.removeChild(onHoldJobCard); //remove in progress job cards element
            break;
        case 4:parent.removeChild(completedJobCard); //remove in progress job cards element
            break;
        case 5:parent.removeChild(requestedJobCard); //remove in progress job cards element
            break;
    }
    
    window.scrollTo(0, 0); //scroll to top of the page
    document.getElementById("details").style.cursor = "pointer"; //change cursor style
    
}

//load jobs in progress as well as any newly added one... *****************************************
function getInProgress(){ 
    
    // to sort by date ascending
            cardRef.orderByChild("status").equalTo("in progress").on("child_added", function(snap) {
            document.querySelector('#in-progress').innerHTML += (listJobCards(snap.val())); 
        });
    
    
    // to sort by date descending
    /*cardRef.orderByChild("status").equalTo("in progress").on("child_added", function(snap) {
        // creat new li element
          var newLi = document.createElement("li");
          
          // give new id to new li
          newLi.id = parseInt(snap.val().jobnumber);
          console.log(newLi.id);
          
          //get parent ul element
          var ulList = document.getElementById("in-progress");
          
          // get existing li child element by id
          //var child = document.getElementById(newLi.id-1);
          
          // Insert <li> before the first child of <ul>
          ulList.insertBefore(newLi,ulList.childNodes[0]);
    //document.getElementById(newLi.id).innerHTML += (inProgressJobCards(snap.val())); 
    document.getElementById(newLi.id).innerHTML += (listJobCards(snap.val())); 
});*/
    pageId = 2;
    document.getElementById("in-progress").style.cursor = "pointer"; //change cursor style
    
}

//load jobs on hold as well as any newly added one... *****************************************
function getOnHold(){ 
    
    // to sort by date ascending
            cardRef.orderByChild("status").equalTo("on hold").on("child_added", function(snap) {
            document.querySelector('#on-hold').innerHTML += (listJobCards(snap.val())); 
        });
    
    /*cardRef.orderByChild("status").equalTo("on hold").on("child_added", function(snap) {
    // creat new li element
          var newLi = document.createElement("li");
          
          // give new id to new li
          newLi.id = parseInt(snap.val().jobnumber);
          
          //get parent ul element
          var ulList = document.getElementById("on-hold");
          
          // get existing li child element by id
          //var child = document.getElementById(newLi.id-1);
          
          // Insert <li> before the first child of <ul>
          ulList.insertBefore(newLi,ulList.childNodes[0]);
          
  //document.getElementById(newLi.id).innerHTML += (contactHtmlFromObject(snap.val())); 
  document.getElementById(newLi.id).innerHTML += (listJobCards(snap.val())); 
});*/
    pageId = 3;
    document.getElementById("on-hold").style.cursor = "pointer"; //change cursor style
    
}

//load jobs requested as well as any newly added one... *****************************************
/*function getRequested(){ 
    
    cardRef.orderByChild("status").equalTo("Requested").on("child_added", function(snap) {
    document.querySelector('#requested-jobs').innerHTML += (requestedJobCards(snap.val())); 
});
    pageId = 5;
    document.getElementById("requested-jobs").style.cursor = "pointer"; //change cursor style
    
}*/

//load jobs requested as well as any newly added one... *****************************************
function getRequested(){ 
    
    cardRef.orderByChild("status").equalTo("Requested").on("child_added", function(snap) {
        
          // creat new li element
          var newLi = document.createElement("li");
          
          // give new id to new li
          newLi.id = parseInt(snap.val().jobnumber);
          
          //get parent ul element
          var ulList = document.getElementById("requested-jobs");
          
          // get existing li child element by id
          //var child = document.getElementById(newLi.id-1);
          
          // Insert <li> before the first child of <ul>
          ulList.insertBefore(newLi,ulList.childNodes[0]);  
        
    //document.getElementById(newLi.id).innerHTML += (requestedJobCards(snap.val())); 
    document.getElementById(newLi.id).innerHTML += (listJobCards(snap.val())); 
});
    pageId = 5;
    document.getElementById("requested-jobs").style.cursor = "pointer"; //change cursor style
    
}



//load jobs completed as well as any newly added one... *****************************************
function getCompleted(){ 
    
    // to sort by date ascending
    cardRef.orderByChild("status").equalTo("completed").on("child_added", function(snap) {
    document.querySelector('#completed-jobs').innerHTML += (listJobCards(snap.val())); 
});
    pageId = 4;
    document.getElementById("completed-jobs").style.cursor = "pointer"; //change cursor style
    
}

/* **************************************************************************************** */


function listJobCards(jobCards){
          
  var html = '';
    html += '<div class="my-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    
    html += '<div class="well my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot-list" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    html += '</div>';
  return html;
}

/*function detailedJobCardSecond(jobCards){
    
    window.open("details.html", "_self");
    //Check if status is empty put "Requeste" in it
   console.log("Okkkkkkk");
  if (jobCards.status === ""){
              jobCards.status = "Requested";
          }
          
  var detailedJob = document.getElementById("detailedJob");
  var detailedDetails = document.getElementById("detailedDetails");
  var priorityDot = document.getElementById("priority-dot");
  var priority1 = document.getElementById("priority1");
  var priority2 = document.getElementById("priority2");
  var priority3 = document.getElementById("priority3");
  var detailedNote = document.getElementById("detailedNote");
  var detailedStatus = document.getElementById("detailedStatus");
  var detailedName = document.getElementById("detailedName");
  var detailedJobNumber = document.getElementById("detailedJobNumber");
  var detailedDate = document.getElementById("detailedDate");
  var detailedRequestedBy = document.getElementById("detailedRequestedBy");
  var detailedUser = document.getElementById("detailedUser");
  
  detailedJob.innerHTML = "jobCards.job";
  document.getElementById("detailedDetails").innerHTML = "jobCards.details";
  detailedNote.innerHTML = jobCards.note;
  detailedStatus.innerHTML = jobCards.status;
  detailedName.innerHTML = jobCards.name;
  detailedJobNumber.innerHTML = jobCards.jobNumber;
  detailedDate.innerHTML = jobCards.date;
  detailedRequestedBy.innerHTML = jobCards.user;
  detailedUser.innerHTML = jobCards.assigneduser;
    
}*/


//prepare detailed jobs' HTML *******************************************************
function detailedJobcard(jobCards){
   
  
  //Check if status is empty put "Requeste" in it
  if (jobCards.status === ""){
              jobCards.status = "Requested";
          }
          
  var html = '';
  
  //******************** 1st card  ******************************************
   html += '<li class="details">';
   
   html += '<div class="well my-box">';
      html += '<p  class="card-label">'+ "Work order : "+'</p>';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
    html +='</div>';
    
    html += '<div class="well my-box">';
      html += '<p class="card-label">' + "Details :"+'</p>';
      html += '<p id="details" class="card-data">'+jobCards.details+'</p>';
    html +='</div>';
    
    
    //priority
    html += '<div class="well my-box">';
      html += '<p class="card-label">Priority: </p><img id="priority" class="priority-dot" src="img/priority'+jobCards.priority+'.png"/>';
    html +='</div>';
    
    html += '<div class="well my-box">';
      html += '<p class="card-label">Change priority : </p><img class="priority-dot" onclick="changePriorityTo1()" src="img/priority1.png"/><img class="priority-dot" onclick="changePriorityTo2()"  src="img/priority2.png"/><img class="priority-dot" onclick="changePriorityTo3()"  src="img/priority3.png"/>';
    html +='</div>';
    
        // notes
        html += '<div class="well notes">';
            html += '<p class="card-label">' + "Notes : " + '</p>';
            html += '<p id="note" class="card-note">' + jobCards.note + '</p>';
            
             html += '<div class="add-note-btn">';
            html += '<a role="button" data-toggle="modal" data-target="#noteModal" onclick="addNote()"><img class="icon-image-note" src="img/add.png" /></a>';
            html += '</div>';
            
        html += '</div>';
        

    // status
    html += '<div class="well my-box">';
        html += '<p class="card-label">' + "Status : " + '</p>';
        html += '<p id="status" class="card-data">' + jobCards.status;
        
    html += '<div class="">';
    html += '<p class="card-label">' + "Change status" + '</p>';
        //html += '<a class="change-staus-icons" onclick="changeStatusToInProgress()"/>In progress</a>'+'<a class="change-staus-icons" onclick="changeStatusToOnHold()"/>On hold</a>'+'<a class="change-staus-icons" onclick="changeStatusToCompleted()"/>Completed</a>'+'</p>';
          html += '<button id="btnInProgress" class="change-staus-icons btn btn-sm" type="button" onclick="changeStatusToInProgress()">In progress</button>'+'<button id="btnOnHold" class="change-staus-icons btn btn-sm" type="button" onclick="changeStatusToOnHold()">On hold</button>'+'<button id="btnCompleted" class="change-staus-icons btn btn-sm" type="button" onclick="changeStatusToCompleted()">Completed</button>';
    html += '</div>';
    html += '</div>';
    
    
    html += '<div class="well my-box">';
        html += '<p class="card-label">' + "Location: " + '</p>';
        html += '<p id="name" class="card-data">' + jobCards.name + '</p>';
    html += '</div>';
   
   
   //******************* 2nd card  *****************************************
   
   
    html += '<div class="well my-box">';
      html += '<p class="card-label">'+"Job number: "+'</p>';
      html += '<p id="note" class="card-data">'+jobCards.jobnumber+'</p>';
   
      html += '<p class="card-label">'+"Date : "+'</p>';
      html += '<p id="priority" class="card-data">'+jobCards.date+'</p>';
    html += '</div>';
    
    
    html += '<div class="well my-box">';
      html += '<p class="card-label">'+"Requested by : "+'</p>';
      html += '<p id="status" class="card-data">'+jobCards.user+'</p>';
  
      html += '<p class="card-label">'+"Assigned by : "+'</p>';
      html += '<p id="user" class="card-data">'+jobCards.assigneduser+'</p>';
    html += '</div>';
    
  html += '<div class="well">';
    html += '</div>';
    
    html += '<div class="">';
    html += '<a class="btn btn-warning mybutton" onclick="reloadAllJobs()"><img class="icon-image" src="img/cancel.png" alt="Cancel"/></a>';
    html += '<a class="btn btn-info mybutton" onclick="refreshCard("' + jobCards.status + '")"><img class="icon-image" src="img/done.png" alt="Add"/></a>';
    html += '</div>';
  
  
    html += '</li>';
  return html;
  }
  
  function addNote(){
      
  }
  
  
  function reloadAllJobs(){
      location.reload();
  }
  
  
  function changeStatusToInProgress(){
      document.getElementById("status").innerHTML = "In progress";
  }
  
  
  function changeStatusToOnHold(){
      document.getElementById("status").innerHTML = "On hold";
      
  }
  
  function changeStatusToCompleted(){
      document.getElementById("status").innerHTML = "Completed";
      
  }
  
  function changePriorityTo1(){
      document.getElementById("priority").src = "img/priority1.png";
  }
  
  function changePriorityTo2(){
      document.getElementById("priority").src = "img/priority2.png";
  }
  
  function changePriorityTo3(){
      document.getElementById("priority").src = "img/priority3.png";
  }
  
  
  // Auth *************************************************************
  
  function newUserReg(){
  
  var email =  document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var passwordOk = false;
  
  // Password check
  if (password.length >= 6){
      passwordOk = true;
      alert("Password is OK!");
  }
  else{
      alert("Password is too short! Must be at least 6 characters!");
      document.getElementById("password").reset();
  }
  
  if (password === confirmPassword && passwordOk){
      alert("Password is match");
  }
  else {
      alert("Passwords do not match!!!!!!!");
  }
  
  
 /* firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});*/

}

//prepare inProgress object's HTML
/*function inProgressJobCards(jobCards){
  
          
  var html = '';
  //html += '<li class="well card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    html += '<div class="well card-well" onclick="getJobDetails(this.id)">';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    
    html += '</div>';
  //html += '</li>';
  
  
  return html;
}*/

//prepare requestedJobs object's HTML
/*function requestedJobCards(jobCards){
    
  
  //Check if status is empty put "Requeste" in it
  if (jobCards.status === ""){
              jobCards.status = "Requested";
          }
         
  var html = '';
  html += '<li class="well card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    html += '<div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    
    html += '</div>';
  html += '</li>';
  
  
  return html;
}*/
                                                
// onHold object HTML
/*function onHoldJobCards(jobCards){
          
  var html = '';
  //html += '<li class="well card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    html += '<div card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    
    html += '</div>';
  //html += '</li>';
  
  
  return html;
}*/
                                                
//prepare allJobs object's HTML
/*function contactHtmlFromObject(jobCards){
    
  //console.log( contact );
  
  //Check if status is empty put "Requeste" in it
  if (jobCards.status === ""){
              jobCards.status = "Requested";
          }
          
  var html = '';
  //html += '<li class="well card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    html += '<div class="well card-well" onclick="getJobDetails(this.id)">';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    
    html += '</div>';
  //html += '</li>';
  
  
  return html;
}*/
                                                
//prepare requestedJobs object's HTML                              
/*function requestedJobCards(jobCards){
    
  
  //Check if status is empty put "Requeste" in it
  if (jobCards.status === ""){
              jobCards.status = "Requested";
          }
   
         
  var html = '';
 // html += '<li class="well card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    html += '<div class="well card-well" onclick="getJobDetails(this.id)">';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    
    html += '</div>';
  //html += '</li>';
  
  
  return html;
}*/
                                                
//prepare on hold object's HTML
/*function completedJobCards(jobCards){
          
  var html = '';
  html += '<li class="well card-well" id="'+ jobCards.jobnumber+'" onclick="getJobDetails(this.id)">';
    html += '<div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="job" class="card-data">' + jobCards.job + '</p>';
      html += '<p id="status" class="card-data">'+jobCards.status+'</p>';
      html += '<p id="priority" class="card-data">'+"Priority: "+'<img class="priority-dot" src="img/priority'+jobCards.priority+'.jpg"/>'+'</p>';
    html += '</div>';
    
    html += '<div class="well well-sm my-box">';
      html += '<p id="date" class="card-data">' + jobCards.date + '</p>';
      html += '<p id="name" class="card-data">'+jobCards.name+'</p>';
      html += '<p id="jobnumber" class="card-data">'+"#"+jobCards.jobnumber+'</p>';
      html += '</div>';
    
    html += '</div>';
  html += '</li>';
  
  
  return html;
}*/