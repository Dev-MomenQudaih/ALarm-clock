const currentTime = document.querySelector("h1"),
  alarmImg = document.querySelector(".wrapper img"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector(".wrapper .btns .set"),
  stopAlarmBtn = document.querySelector(".wrapper .btns .stop"),
  deleteBtn = document.querySelector(".alarms .myList li .deleteBtn"),
  alarmList = document.querySelector(".alarms .myList");

let alarmTime = [],
  ringtone = new Audio("./myFiles/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// show current Time function(&& fixing the time format).
setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  // fixing the time format
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
  let now = `${h}:${m} ${ampm}`;

  //  check if the alarmList includes the current time => "now"
  //  if yes, ringtone => .play()
  if (alarmTime.includes(now)) {
    ringtone.play();
    ringtone.loop = true;
    alarmImg.classList.add("shake");
    removeAlarm(now); // delete the current alarm that ringing now.
    renderAlarms(); // Refresh alarms list that shown.
  }
});

// add the alarm to the array After validation.
setAlarm = () => {
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  )
    return alert("Please, select a valid time to set Alarm! 🫠");

  if (alarmTime.includes(time))
    return alert(`Alarm for ${time} was already set 👀`);

  alarmTime.push(time);
  // Reset the selection
  selectMenu.forEach((element) => {
    element.selectedIndex = 0;
  });
};

// (show alarms in the list) function.
renderAlarms = () => {
  alarmList.innerHTML = "";
  for (let i = 0; i < alarmTime.length; i++) {
    alarmList.innerHTML += `<li>
    <div class="info" id="${alarmTime[i]}">${alarmTime[i]}</div>
    <button class="deleteBtn" onclick = "removeAlarm(${i})">Delete</button>
  </li>`;
  }
  if (alarmTime.length === 0)
    alarmList.innerHTML = `<span class="noData">No alarms to show yet 😊</span>`;
};

// remove Alarm function.
removeAlarm = (indexTimeToRemove) => {
  alarmTime.splice(indexTimeToRemove, 1); // delete the clicked element.
  renderAlarms(); // Refresh the list after delete
};

// adding event listeners at buttons.
setAlarmBtn.addEventListener("click", setAlarm);
setAlarmBtn.addEventListener("click", renderAlarms);
stopAlarmBtn.addEventListener("click", () => {
  ringtone.pause();
  alarmImg.classList.remove("shake");
});
