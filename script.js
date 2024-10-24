console.clear();

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

// Function to get current time
function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'Hours': t.getHours() % 12,
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

// Clock constructor
function Clock(countdown, callback) {
  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function () { };

  var updateFn = countdown ? getTimeRemaining : getTime;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
    t = updateFn(countdown),
    key, timeinterval;

  for (key in t) {
    if (key === 'Total') { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  this.updateClock = function () {
    timeinterval = requestAnimationFrame(this.updateClock.bind(this));

    // throttle so it's not constantly updating the time.
    if (i++ % 10) { return; }

    var t = updateFn(countdown);
    if (t.Total < 0) {
      cancelAnimationFrame(timeinterval);
      for (key in trackers) {
        trackers[key].update(0);
      }
      callback();
      return;
    }

    for (key in trackers) {
      trackers[key].update(t[key]);
    }
  };

  // Function to start the countdown
  this.start = function () {
    setTimeout(this.updateClock.bind(this), 500);
  };

  // Function to stop the countdown
  this.stop = function () {
    cancelAnimationFrame(timeinterval);
  };
}

// Function to start the countdown
function startCountdown() {
  var deadline = new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
  sessionStorage.setItem('countdownEndTime', deadline); // Save end time to session storage
  return deadline;
}

// Create buttons to control the timer
var startButton = document.createElement('button');
startButton.innerText = 'Start Countdown';
document.body.appendChild(startButton);

var resetButton = document.createElement('button');
resetButton.innerText = 'stop Countdown';
resetButton.disabled = true; // Initially disabled
document.body.appendChild(resetButton);

var c;

// Set up the button click events
startButton.onclick = function () {
  // Only create a new countdown if one isn't already running
  if (!c) {
    var endTime = sessionStorage.getItem('countdownEndTime');
    var deadline;

    // Check if we have a saved countdown in session storage
    if (endTime) {
      deadline = new Date(endTime);
    } else {
      deadline = startCountdown(); // Start a new countdown and save the end time
    }

    c = new Clock(deadline, function () { alert('Countdown complete'); });
    document.body.appendChild(c.el);
    c.start(); // Start the clock
    startButton.disabled = true; // Disable the button to prevent multiple clicks
    resetButton.disabled = false; // Enable the reset button
  }
};

resetButton.onclick = function () {
  if (c) {
    c.stop(); // Stop the countdown if running
    sessionStorage.removeItem('countdownEndTime'); // Clear session storage
    document.body.removeChild(c.el); // Remove the countdown display
    c = null; // Reset the clock variable
    startButton.disabled = false; // Enable the start button
    resetButton.disabled = true; // Disable the reset button
  }
};

// Start countdown if there's an existing session
if (sessionStorage.getItem('countdownEndTime')) {
  var savedEndTime = sessionStorage.getItem('countdownEndTime');
  var savedDeadline = new Date(savedEndTime);
  c = new Clock(savedDeadline, function () { alert('Countdown complete'); });
  document.body.appendChild(c.el);
  c.start(); // Start the clock
  startButton.disabled = true; // Disable the start button
  resetButton.disabled = false; // Enable the reset button
}