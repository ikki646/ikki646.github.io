let targetTime = 24;

function CountdownTracker(label, value) {
  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML =
    '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
    '<span class="flip-clock__slot">' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
    bottom = el.querySelector('.card__bottom'),
    back = el.querySelector('.card__back'),
    backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function (val) {
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {
      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth; // Trigger reflow to enable CSS animation
      this.el.classList.add('flip');
    }
  };

  this.update(value);
}

// Function to get remaining time
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Minutes': Math.floor((t / 1000 / 60) % 60),
    'Seconds': Math.floor((t / 1000) % 60)
  };
}

function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'Hours': t.getHours() % 12,
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

function Clock(startTime, callback) {
  startTime = startTime ? new Date(Date.parse(startTime)) : new Date();
  callback = callback || function () { };

  function getTimeElapsed(start) {
    const now = new Date();
    const elapsed = now - start;
    return {
      Total: elapsed,
      Hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((elapsed / (1000 * 60)) % 60),
      Seconds: Math.floor((elapsed / 1000) % 60),
      Milliseconds: Math.floor(elapsed % 1000)
    };
  }

  const targetDuration = targetTime * 60 * 60 * 1000;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  const trackers = {};
  const updateFn = getTimeElapsed;
  const initialTime = updateFn(this.startTime);
  let timeinterval;

  // Initialize time trackers
  for (let key in initialTime) {
    if (key === 'Total') { continue; }
    trackers[key] = new CountdownTracker(key, initialTime[key]);
    this.el.appendChild(trackers[key].el);
  }

  let i = 0;

  this.updateClock = function () {
    timeinterval = requestAnimationFrame(this.updateClock.bind(this));

    // Throttle updates to reduce rendering frequency
    if (i++ % 10) { return; }

    const elapsed = updateFn(this.startTime);

    // Stop if elapsed time exceeds the target duration
    if (elapsed.Total >= targetDuration) {
      cancelAnimationFrame(timeinterval);
      for (let key in trackers) {
        trackers[key].update((key == 'Hours') ? targetTime : 0);
      }
      callback(); // Trigger callback if provided
      return;
    }

    // Update the trackers with the current elapsed time
    for (let key in trackers) {
      trackers[key].update(elapsed[key]);
    }
  };

  this.start = function () {
    this.updateClock();
  }
}

// Function to start the countdown
function startCountdown() {
  var deadline = new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
  sessionStorage.setItem('countdownEndTime', deadline); // Save end time to session storage
  return deadline;
}

function createClock() {
  var clock = new Clock(null, function () { 
      const element = document.querySelector('.hidden-pyro');
      if (element) element.classList.replace('hidden-pyro', 'pyro');
   });
  document.body.appendChild(clock.el);
  return clock;
}

async function updateClock() {
  try {
    console.log("updating")
    const response = await fetch('https://hallebardiers-warmste-week.onrender.com/start-time/');
    const data = await response.json();
    let timestampString = data.timestamp;
    let timestamp = new Date(timestampString);
    console.log("startTimestamp ", timestamp);

    if (timestamp) clock.startTime = timestamp;
  } catch (error) {
    console.error('Error fetching time data:', error);
  }
}

let clock = createClock();
clock.start();

updateClock();
setInterval(updateClock, 10000);