/*!
 * CountKit.js
 * Beautiful embeddable countdown timers
 *
 * MIT License
 *
 * Copyright (c) 2025 Sazzad Hussain
 * https://sazzadh.com
 */

(function () {

  "use strict";

  // =========================================
  // AUTO-INJECT STYLES
  // =========================================
  const style = document.createElement("style");

  style.innerHTML = `

    .countkit{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:18px;

      width:fit-content;

      font-family:Arial,sans-serif;
    }

    .countkit *{
      box-sizing:border-box;
    }

    .countkit .ck-time-box{
      display:flex;
      flex-direction:column;
      align-items:center;
      line-height:1;
    }

    .countkit .ck-number{
      font-size:52px;
      font-weight:700;
      color:#222;
    }

    .countkit .ck-label{
      margin-top:8px;

      font-size:12px;
      font-weight:500;

      letter-spacing:2px;
      text-transform:lowercase;

      color:#777;
    }

    .countkit .ck-divider{
      width:1px;
      height:60px;

      background:rgba(0,0,0,.15);

      transform:rotate(12deg);
    }

    .countkit.hidden{
      display:none !important;
    }

    @media(max-width:768px){

      .countkit{
        gap:12px;
      }

      .countkit .ck-number{
        font-size:36px !important;
      }

      .countkit .ck-divider{
        height:40px !important;
      }

      .countkit .ck-label{
        font-size:10px !important;
      }

    }

  `;

  document.head.appendChild(style);

  // =========================================
  // INIT TIMERS
  // =========================================
  const timers = document.querySelectorAll(".countkit");

  timers.forEach((timer) => {

    // =========================================
    // CONFIG
    // =========================================
    const config = {

      // Date
      date: timer.dataset.date || "2026-12-31",

      // Time
      time: timer.dataset.time || "23:59:59",

      // Colors
      textColor: timer.dataset.textColor || "#222",
      labelColor: timer.dataset.labelColor || "#777",
      dividerColor: timer.dataset.dividerColor || "rgba(0,0,0,.15)",

      // Sizes
      numberSize: timer.dataset.numberSize || "52",
      labelSize: timer.dataset.labelSize || "12",
      gap: timer.dataset.gap || "18",

      // Expire
      hideOnEnd: timer.dataset.hideOnEnd !== "false",

      expiredText: timer.dataset.expiredText || "",

      // Hide elements
      hideIds: timer.dataset.hideIds
        ? timer.dataset.hideIds.split(",")
        : []

    };

    // =========================================
    // BUILD HTML
    // =========================================
    timer.innerHTML = `

      <div class="ck-time-box">
        <span class="ck-number ck-days">00</span>
        <small class="ck-label">days</small>
      </div>

      <div class="ck-divider"></div>

      <div class="ck-time-box">
        <span class="ck-number ck-hours">00</span>
        <small class="ck-label">hrs</small>
      </div>

      <div class="ck-divider"></div>

      <div class="ck-time-box">
        <span class="ck-number ck-minutes">00</span>
        <small class="ck-label">min</small>
      </div>

      <div class="ck-divider"></div>

      <div class="ck-time-box">
        <span class="ck-number ck-seconds">00</span>
        <small class="ck-label">sec</small>
      </div>

    `;

    // =========================================
    // APPLY CUSTOM STYLES
    // =========================================
    timer.style.gap = config.gap + "px";

    timer.querySelectorAll(".ck-number").forEach((el) => {

      el.style.fontSize = config.numberSize + "px";
      el.style.color = config.textColor;

    });

    timer.querySelectorAll(".ck-label").forEach((el) => {

      el.style.fontSize = config.labelSize + "px";
      el.style.color = config.labelColor;

    });

    timer.querySelectorAll(".ck-divider").forEach((el) => {

      el.style.height = config.numberSize + "px";
      el.style.background = config.dividerColor;

    });

    // =========================================
    // TARGET DATE
    // =========================================
    const targetDate = new Date(
      `${config.date}T${config.time}`
    );

    let timerInterval;

    // =========================================
    // UPDATE TIMER
    // =========================================
    function updateTimer() {

      const now = new Date();

      const distance = targetDate.getTime() - now.getTime();

      // =========================================
      // TIMER EXPIRED
      // =========================================
      if (distance <= 0) {

        timer.querySelector(".ck-days").textContent = "00";
        timer.querySelector(".ck-hours").textContent = "00";
        timer.querySelector(".ck-minutes").textContent = "00";
        timer.querySelector(".ck-seconds").textContent = "00";

        // Hide timer
        if (config.hideOnEnd) {

          if (config.expiredText) {

            timer.innerHTML = config.expiredText;

          } else {

            timer.classList.add("hidden");

          }

        }

        // Hide target elements
        config.hideIds.forEach((selector) => {

          const el = document.querySelector(selector.trim());

          if (el) {
            el.classList.add("hidden");
          }

        });

        // Clear interval safely
        if (timerInterval) {
          clearInterval(timerInterval);
        }

        return;
      }

      // =========================================
      // TIME CALCULATIONS
      // =========================================
      const totalSeconds = Math.floor(distance / 1000);

      const days = Math.floor(totalSeconds / 86400)
        .toString()
        .padStart(2, "0");

      const hours = Math.floor(
        (totalSeconds % 86400) / 3600
      )
        .toString()
        .padStart(2, "0");

      const minutes = Math.floor(
        (totalSeconds % 3600) / 60
      )
        .toString()
        .padStart(2, "0");

      const seconds = Math.floor(
        totalSeconds % 60
      )
        .toString()
        .padStart(2, "0");

      // =========================================
      // UPDATE UI
      // =========================================
      timer.querySelector(".ck-days").textContent = days;
      timer.querySelector(".ck-hours").textContent = hours;
      timer.querySelector(".ck-minutes").textContent = minutes;
      timer.querySelector(".ck-seconds").textContent = seconds;

    }

    // =========================================
    // START TIMER
    // =========================================
    timerInterval = setInterval(updateTimer, 1000);

    updateTimer();

  });

  // =========================================
  // CREDIT
  // =========================================
  console.log(
    "%cCountKit.js by Sazzad Hussain — https://sazzadh.com",
    "font-weight:bold;color:#555;"
  );

})();
