
//Current time 
//page load
const times = [
  '9am',
  '10am',
  '11am',
  '12pm',
  '13pm',
  '14pm',
  '15pm',
  '16pm',
  '17pm',
];

//Current time 
function clockTick() {
  var currentTime = new Date(),
    month = currentTime.getMonth() + 1,
    day = currentTime.getDate(),
    year = currentTime.getFullYear(),
    hours = currentTime.getHours(),
    minutes = currentTime.getMinutes(),
    seconds = currentTime.getSeconds(),
    text = ("Date : " + day + "-" + month + "-" + year + "    " + "Time: " + hours + ':' + minutes + ':' + seconds);
  // here we get the element with the id of "date" and change the content to the text variable we made above
  document.getElementById('currentDay').innerHTML = text;
}
// here we run the clockTick function every 1000ms (1 second)
setInterval(clockTick, 1000);



function saveNote(event) {
  //what happen when click on save button
  //grab the user input
  //save it to local storage 
  const button = event.target;
  //console.log(button);
  const buttonID = button.id;
  //this will split the button Id in 2 array button and time - I will be using time from the id so I can store the data in local storage
  const time = buttonID.split('-')[1];
  const targetTextArea = document.getElementById('textarea-' + time);

  console.log(targetTextArea);
  const userInput = targetTextArea.value;

  //Saving the null vallue as well because some time if user want to remove the value of the particular entry 

  // Save the data to local storage
  //get the localStorage either it has value or an empty
  const times = JSON.parse(localStorage.getItem('times')) || [];
  //find out the traget index
  const targetIndex = times.findIndex(function (item) {
    return item.time === time;
  });
  if (targetIndex === -1) {
    times.push({
      time: time,
      notes: userInput,
    })
  } else {
    times[targetIndex].notes = userInput;
  }
  localStorage.setItem('times', JSON.stringify(times));
}

function getValue() {
  //on page lode
  //retirve data in local storage 
  const times = JSON.parse(localStorage.getItem('times')) || [];
  //load it to text area
  for (let i = 0; i < times.length; i++) {
    const item = times[i];
    //find the target text are
    const textArea = document.getElementById('textarea-' + item.time)
    //console.log("test"+ item.time);
    textArea.value = item.notes;
  }
}

//*********creat colum  and row 
function creatTimeRow(time) {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  row.setAttribute("id", time);

  const timeCol = document.createElement('div');
  timeCol.setAttribute('class', 'col col-2');
  timeCol.textContent = time;
  //console.log(time)

  const textAreaCol = document.createElement('div')
  textAreaCol.setAttribute('class', 'col col-8');

  const textArea = document.createElement('textarea');
  textArea.setAttribute("id", "textarea-" + time);
  textAreaCol.appendChild(textArea);

  const buttonCol = document.createElement('div');
  buttonCol.setAttribute('class', 'col col-2 nopadding');
  const button = document.createElement('button');
  button.setAttribute('id', 'button-' + time);
  buttonCol.appendChild(button);
  button.innerHTML = "<i class='fas fa-save size=5x' onClick='saveNote'> </i>";
  button.addEventListener('click', saveNote);
 

  row.appendChild(timeCol);
  row.appendChild(textAreaCol);
  row.appendChild(buttonCol);

  return row;

}
const timeTrackerContainer = document.getElementById('time-tracker-container');
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const row = creatTimeRow(time);
  timeTrackerContainer.appendChild(row);
}


setInterval(checkTimeColor(), 60 * 60 * 1000);

function checkTimeColor() {
  //This will set the background cloro of the day scheduler depending on past preset or future 
  var currentHour = moment().hour();
  var timeColor = $(".row");


  for (var i = 0; i < timeColor.length; i++) {
    var time = timeColor[i];
    console.log(time);
    if (parseInt(time.id) < currentHour) {
      $(time).addClass("past");
    } else if (parseInt(time.id) === currentHour) {
      $(time).removeClass("past");
      $(time).addClass("present");
    } else {
      $(time).removeClass("past");
      $(time).removeClass("present");
      $(time).addClass("future");
    }
  }
}

//clear local storage 
function clearData() {
    //saveNote(event);
  
    localStorage.clear();
   window.location.reload();
    console.log("refresh");
}

getValue();

