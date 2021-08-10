 var hour = document.querySelector(".hour");
 var min = document.querySelector(".min");
 var seconds = document.querySelector(".sec");
 var circle = document.querySelector(".circle");
 var text = document.querySelector(".text");
 var loading = document.querySelector(".loading");
 var submit_btn = document.querySelector(".submit-btn");
 const audio = document.querySelector(".audio");
 const audio_btn = document.querySelector(".audio-btn");
 const timer_btn = document.querySelector(".timer-btn");

 function checkTimer() {
     var checkhour = hour.value;
     var checkmin = min.value;
     var checksec = seconds.value;
     if (checkmin > 60 || checksec > 60) {
         alert("Max input data is 60 for minutes or seconds");
     } else if (checkhour > 99) {
         alert("Max input is 99 for hour field");
     } else {
         updateTimer(checkhour, checkmin, checksec);
     }
 }

 function updateTimer(hour, min, second) {
     var currenthour = hour;
     var currentmin = min;
     var currentsec = second;
     console.info(hour.value);
     //console.log(time.value.slice(6, 8));
     // get total current seconds
     var sec = Number(currentsec) + Number(currenthour * 60 * 60) + Number(currentmin * 60);
     //  var sec = totaltodaysecs - sec;
     const diffMultiply = 209 / sec;
     var reRunFunction = setInterval(setTimer, 1000);

     function setTimer() {
         var percent = (sec * diffMultiply);
         //console.log(percent);
         if (percent >= 105) {
             circle.style.strokeDasharray = percent + "%";
             circle.style.strokeDashoffset = "0%";
         } else {
             percent = 210 - percent;
             circle.style.strokeDasharray = "209%";
             circle.style.strokeDashoffset = percent + "%";
         }
         text.innerHTML = sec + " sec / " + percent + "%";
         if (currentsec == 0) {
             if (currentmin == 0) {
                 if (currentsec == 0 && currenthour == 0 && currentmin == 0) {
                     playAudio();
                     loading.innerHTML = `${currenthour} Hr ${currentmin} Min ${currentsec} Sec`;
                     clearInterval(reRunFunction);
                 } else if (currenthour != 0 && currentsec == 0) {
                     currentsec = 59;
                     currenthour = currenthour - 1;
                     currentmin = 59;
                     loading.innerHTML = `${currenthour} Hr ${currentmin} Min ${currentsec} Sec`;
                 } else {
                     loading.innerHTML = `${currenthour} Hr ${currentmin} Min ${currentsec} Sec`;
                 }
             } else {
                 currentmin = currentmin - 1;
                 loading.innerHTML = `${currenthour} Hr ${currentmin} Min ${currentsec} Sec`;
                 currentsec = 60;
             }
         } else {
             loading.innerHTML = `${currenthour} Hr ${currentmin} Min ${currentsec} Sec`;
         }
         currentsec = currentsec - 1;
         sec = sec - 1;
     }

     function pauseTimer() {
         if (timer_btn.innerHTML == "Pause Timer") {
             clearInterval(reRunFunction);
             timer_btn.innerHTML = "Resume Timer";
         } else {
             setInterval(setTimer, 1000);
             timer_btn.innerHTML = "Pause Timer";
         }
     }

     function playAudio() {
         var audio_recurrsive = setInterval(function() {
             audio.play();
         }, 1000);

         function pauseAudio() {
             clearInterval(audio_recurrsive);
         }
         audio_btn.addEventListener("click", pauseAudio);
     }
     timer_btn.addEventListener("click", pauseTimer);
 }
 submit_btn.addEventListener("click", checkTimer);