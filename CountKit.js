/*!
 * CountKit.js v1.1.0
 * Beautiful embeddable countdown timers
 *
 * MIT License
 *
 * Copyright (c) 2025 Sazzad Hussain
 * https://sazzadh.com
 */

(function () {

  "use strict";

  // ======================================================
  // PREVENT DOUBLE INITIALIZATION
  // ======================================================
  if (window.CountKitInitialized) return;

  window.CountKitInitialized = true;

  // ======================================================
  // GLOBAL STORE
  // ======================================================
  const CountKitStore = new Map();

  // ======================================================
  // STYLE INJECTION
  // ======================================================
  const style = document.createElement("style");

  style.innerHTML = `

    .countkit{
      display:flex;
      align-items:center;
      justify-content:center;

      width:fit-content;

      gap:var(--ck-gap);

      font-family:Arial,sans-serif;
    }

    .countkit *{
      box-sizing:border-box;
    }

    .countkit.hidden{
      display:none !important;
    }

    .countkit .ck-time-box{
      display:flex;
      flex-direction:column;
      align-items:center;
      line-height:1;
    }

    .countkit .ck-number{
      font-size:var(--ck-number-size);
      font-weight:700;
      color:var(--ck-text-color);
    }

    .countkit .ck-label{
      margin-top:8px;

      font-size:var(--ck-label-size);
      font-weight:500;

      letter-spacing:2px;
      text-transform:lowercase;

      color:var(--ck-label-color);
    }

    .countkit .ck-divider{
      width:1px;
      height:var(--ck-divider-height);

      background:var(--ck-divider-color);

      transform:rotate(12deg);
    }

    @media(max-width:768px){

      .countkit{
        gap:var(--ck-mobile-gap);
      }

      .countkit .ck-number{
        font-size:var(--ck-mobile-number-size);
      }

      .countkit .ck-label{
        font-size:var(--ck-mobile-label-size);
      }

      .countkit .ck-divider{
        height:var(--ck-mobile-divider-height);
      }

    }

  `;

  document.head.appendChild(style);

  // ======================================================
  // UTILITIES
  // ======================================================
  function uniqueId() {

    return (
      "ck_" +
      Math.random()
        .toString(36)
        .substring(2, 10)
    );

  }

  function emitEvent(name, detail = {}) {

    document.dispatchEvent(
      new CustomEvent(name, {
        detail
      })
    );

  }

  // ======================================================
  // CREATE TIMER HTML
  // ======================================================
  function createTimerHTML(showLabels = true) {

    return `

      <div class="ck-time-box">
        <span class="ck-number ck-days">00</span>
        ${
          showLabels
            ? `<small class="ck-label">days</small>`
            : ""
        }
      </div>

      <div class="ck-divider"></div>

      <div class="ck-time-box">
        <span class="ck-number ck-hours">00</span>
        ${
          showLabels
            ? `<small class="ck-label">hrs</small>`
            : ""
        }
      </div>

      <div class="ck-divider"></div>

      <div class="ck-time-box">
        <span class="ck-number ck-minutes">00</span>
        ${
          showLabels
            ? `<small class="ck-label">min</small>`
            : ""
        }
      </div>

      <div class="ck-divider"></div>

      <div class="ck-time-box">
        <span class="ck-number ck-seconds">00</span>
        ${
          showLabels
            ? `<small class="ck-label">sec</small>`
            : ""
        }
      </div>

    `;

  }

  // ======================================================
  // INIT SINGLE TIMER
  // ======================================================
  function initTimer(timer) {

    // Already initialized
    if (timer.dataset.ckInitialized === "true") {
      return;
    }

    timer.dataset.ckInitialized = "true";

    // ======================================================
    // UNIQUE ID
    // ======================================================
    const id = uniqueId();

    timer.dataset.countkitId = id;

    // ======================================================
    // CONFIG
    // ======================================================
    const config = {

      // Date & Time
      date:
        timer.dataset.date ||
        "2026-12-31",

      time:
        timer.dataset.time ||
        "23:59:59",

      timezone:
        timer.dataset.timezone ||
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone,

      // Desktop
      numberSize:
        timer.dataset.numberSize || "52px",

      labelSize:
        timer.dataset.labelSize || "12px",

      dividerHeight:
        timer.dataset.dividerHeight || "60px",

      gap:
        timer.dataset.gap || "18px",

      // Mobile
      mobileNumberSize:
        timer.dataset.mobileNumberSize || "36px",

      mobileLabelSize:
        timer.dataset.mobileLabelSize || "10px",

      mobileDividerHeight:
        timer.dataset.mobileDividerHeight || "40px",

      mobileGap:
        timer.dataset.mobileGap || "12px",

      // Colors
      textColor:
        timer.dataset.textColor || "#222",

      labelColor:
        timer.dataset.labelColor || "#777",

      dividerColor:
        timer.dataset.dividerColor ||
        "rgba(0,0,0,.15)",

      // Features
      showLabels:
        timer.dataset.showLabels !== "false",

      hideOnEnd:
        timer.dataset.hideOnEnd !== "false",

      expiredText:
        timer.dataset.expiredText || "",

      hideIds:
        timer.dataset.hideIds
          ? timer.dataset.hideIds
              .split(",")
          : [],

      onExpire:
        timer.dataset.onExpire || null

    };

    // ======================================================
    // APPLY CSS VARIABLES
    // ======================================================
    timer.style.setProperty(
      "--ck-number-size",
      config.numberSize
    );

    timer.style.setProperty(
      "--ck-label-size",
      config.labelSize
    );

    timer.style.setProperty(
      "--ck-divider-height",
      config.dividerHeight
    );

    timer.style.setProperty(
      "--ck-gap",
      config.gap
    );

    timer.style.setProperty(
      "--ck-mobile-number-size",
      config.mobileNumberSize
    );

    timer.style.setProperty(
      "--ck-mobile-label-size",
      config.mobileLabelSize
    );

    timer.style.setProperty(
      "--ck-mobile-divider-height",
      config.mobileDividerHeight
    );

    timer.style.setProperty(
      "--ck-mobile-gap",
      config.mobileGap
    );

    timer.style.setProperty(
      "--ck-text-color",
      config.textColor
    );

    timer.style.setProperty(
      "--ck-label-color",
      config.labelColor
    );

    timer.style.setProperty(
      "--ck-divider-color",
      config.dividerColor
    );

    // ======================================================
    // RENDER HTML
    // ======================================================
    timer.innerHTML =
      createTimerHTML(
        config.showLabels
      );

    // ======================================================
    // TARGET DATE
    // ======================================================
    const targetDate = new Date(
      config.date + "T" + config.time
    );

    let interval;

    // ======================================================
    // UPDATE FUNCTION
    // ======================================================
    function updateTimer() {

      const now = new Date();

      const distance =
        targetDate.getTime() -
        now.getTime();

      // ======================================================
      // EXPIRED
      // ======================================================
      if (distance <= 0) {

        timer.querySelector(".ck-days")
          .textContent = "00";

        timer.querySelector(".ck-hours")
          .textContent = "00";

        timer.querySelector(".ck-minutes")
          .textContent = "00";

        timer.querySelector(".ck-seconds")
          .textContent = "00";

        // Expired text
        if (
          config.expiredText
        ) {

          timer.innerHTML =
            config.expiredText;

        }

        // Hide timer
        else if (
          config.hideOnEnd
        ) {

          timer.classList.add(
            "hidden"
          );

        }

        // Hide external elements
        config.hideIds.forEach(
          (selector) => {

            const el =
              document.querySelector(
                selector.trim()
              );

            if (el) {
              el.classList.add(
                "hidden"
              );
            }

          }
        );

        // Custom callback
        if (
          config.onExpire &&
          typeof window[
            config.onExpire
          ] === "function"
        ) {

          window[
            config.onExpire
          ](timer);

        }

        // Emit event
        emitEvent(
          "countkit:expired",
          {
            id,
            timer
          }
        );

        // Clear interval
        clearInterval(interval);

        return;
      }

      // ======================================================
      // TIME CALCULATIONS
      // ======================================================
      const totalSeconds =
        Math.floor(
          distance / 1000
        );

      const days =
        Math.floor(
          totalSeconds / 86400
        )
          .toString()
          .padStart(2, "0");

      const hours =
        Math.floor(
          (
            totalSeconds % 86400
          ) / 3600
        )
          .toString()
          .padStart(2, "0");

      const minutes =
        Math.floor(
          (
            totalSeconds % 3600
          ) / 60
        )
          .toString()
          .padStart(2, "0");

      const seconds =
        Math.floor(
          totalSeconds % 60
        )
          .toString()
          .padStart(2, "0");

      // ======================================================
      // UPDATE UI
      // ======================================================
      timer.querySelector(".ck-days")
        .textContent = days;

      timer.querySelector(".ck-hours")
        .textContent = hours;

      timer.querySelector(".ck-minutes")
        .textContent = minutes;

      timer.querySelector(".ck-seconds")
        .textContent = seconds;

      // ======================================================
      // TICK EVENT
      // ======================================================
      emitEvent(
        "countkit:tick",
        {
          id,
          days,
          hours,
          minutes,
          seconds
        }
      );

    }

    // ======================================================
    // START
    // ======================================================
    interval =
      setInterval(
        updateTimer,
        1000
      );

    updateTimer();

    // ======================================================
    // STORE INSTANCE
    // ======================================================
    CountKitStore.set(id, {
      timer,
      interval,
      config
    });

    // ======================================================
    // INIT EVENT
    // ======================================================
    emitEvent(
      "countkit:init",
      {
        id,
        timer
      }
    );

  }

  // ======================================================
  // INIT ALL TIMERS
  // ======================================================
  function initAllTimers() {

    document
      .querySelectorAll(".countkit")
      .forEach(initTimer);

  }

  // ======================================================
  // MUTATION OBSERVER
  // ======================================================
  const observer =
    new MutationObserver(() => {

      initAllTimers();

    });

  observer.observe(
    document.body,
    {
      childList: true,
      subtree: true
    }
  );

  // ======================================================
  // PUBLIC API
  // ======================================================
  window.CountKit = {

    version: "1.1.0",

    init() {

      initAllTimers();

    },

    refresh() {

      initAllTimers();

    },

    destroy(id) {

      const instance =
        CountKitStore.get(id);

      if (!instance) return;

      clearInterval(
        instance.interval
      );

      instance.timer.innerHTML =
        "";

      CountKitStore.delete(id);

    }

  };

  // ======================================================
  // AUTO INIT
  // ======================================================
  initAllTimers();

  // ======================================================
  // CREDIT
  // ======================================================
  console.log(
    "%cCountKit.js v1.1.0 by Sazzad Hussain — https://sazzadh.com",
    "font-weight:bold;color:#555;"
  );

})();
