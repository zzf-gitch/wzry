const hourHandle = document.querySelector(".handle.hour");
const minuteHandle = document.querySelector(".handle.minute");
const secondHandle = document.querySelector(".handle.second");

updateClock();

function updateClock() {
  const date = new Date();
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const secondsDegree = 360 / 60 * seconds;
  secondHandle.style.transform = `rotate(${secondsDegree}deg)`;

  const minutesDegree = (360 / 60 * minutes) + (secondsDegree / 60);
  minuteHandle.style.transform = `rotate(${minutesDegree}deg)`;

  const hoursDegree = (360 / 12 * hours) + (minutesDegree / 60)
  hourHandle.style.transform = `rotate(${hoursDegree}deg)`;

  window.requestAnimationFrame(updateClock);
}