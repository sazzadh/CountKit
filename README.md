# CountKit.js

Beautiful embeddable countdown timers.

CountKit is a lightweight zero-dependency countdown timer widget that works with a single script tag.

---

# Features

- Multiple timers support
- Unique isolated instances
- Responsive controls
- Mobile customization
- Auto-hide on expiry
- Expired text replacement
- External element hiding
- Mutation observer support
- Dynamic content support
- Public JS API
- Custom events
- Zero dependencies
- CDN ready

---

# Installation

```html
<div
  class="countkit"
  data-date="2026-05-10"
  data-time="23:59:59"
></div>

<script src="https://cdn.jsdelivr.net/gh/sazzadh/countkit/dist/countkit.min.js"></script>
```

---

# Basic Example

```html
<div
  class="countkit"
  data-date="2026-12-31"
  data-time="23:59:59"
></div>
```

---

# Responsive Example

```html
<div
  class="countkit"

  data-date="2026-12-31"
  data-time="23:59:59"

  data-number-size="72px"
  data-label-size="14px"
  data-gap="24px"
  data-divider-height="80px"

  data-mobile-number-size="28px"
  data-mobile-label-size="9px"
  data-mobile-gap="8px"
  data-mobile-divider-height="30px"
></div>
```


---

# Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <title>CountKit Demo</title>
</head>
<body>

  <!-- COUNTKIT TIMER -->
  <div
    class="countkit"

    data-date="2026-12-31"
    data-time="23:59:59"

    data-timezone="America/Los_Angeles"

    data-number-size="72px"
    data-label-size="14px"
    data-gap="24px"
    data-divider-height="80px"

    data-mobile-number-size="28px"
    data-mobile-label-size="9px"
    data-mobile-gap="8px"
    data-mobile-divider-height="30px"

    data-text-color="#111111"
    data-label-color="#777777"
    data-divider-color="rgba(0,0,0,.2)"

    data-show-labels="true"

    data-hide-on-end="true"

    data-expired-text="Offer Ended"

    data-hide-ids="#hero-banner,#popup"

    data-on-expire="timerExpired"
  ></div>

  <!-- EXTERNAL ELEMENTS -->
  <div id="hero-banner">
    Hero Banner
  </div>

  <div id="popup">
    Popup Content
  </div>

  <!-- COUNTKIT -->
  <script src="https://cdn.jsdelivr.net/gh/sazzadh/countkit/dist/countkit.min.js"></script>

  <!-- CALLBACK -->
  <script>

    function timerExpired(timer){

      console.log(
        "Timer expired:",
        timer
      );

    }

    // CountKit Events
    document.addEventListener(
      "countkit:init",
      (e) => {

        console.log(
          "Initialized:",
          e.detail
        );

      }
    );

    document.addEventListener(
      "countkit:tick",
      (e) => {

        console.log(
          "Tick:",
          e.detail
        );

      }
    );

    document.addEventListener(
      "countkit:expired",
      (e) => {

        console.log(
          "Expired:",
          e.detail
        );

      }
    );

  </script>

</body>
</html>
```

---

# What This Example Shows

- Responsive timer
- Desktop/mobile customization
- Multiple style controls
- Expired text replacement
- External element hiding
- Expiration callback
- CountKit events
- CDN usage
- Production-ready setup

---

# Options

| Attribute | Description |
|---|---|
| data-date | Target date |
| data-time | Target time |
| data-timezone | Timezone |
| data-number-size | Desktop number size |
| data-label-size | Desktop label size |
| data-gap | Desktop gap |
| data-divider-height | Desktop divider height |
| data-mobile-number-size | Mobile number size |
| data-mobile-label-size | Mobile label size |
| data-mobile-gap | Mobile gap |
| data-mobile-divider-height | Mobile divider height |
| data-text-color | Number color |
| data-label-color | Label color |
| data-divider-color | Divider color |
| data-hide-on-end | Hide timer on expiry |
| data-expired-text | Replace timer text |
| data-hide-ids | Hide external elements |
| data-show-labels | Toggle labels |
| data-on-expire | Expired callback |

---

# API

```js
CountKit.init();
CountKit.refresh();
CountKit.destroy(id);
```

---

# Events

```js
document.addEventListener(
  "countkit:init",
  (e) => console.log(e.detail)
);

document.addEventListener(
  "countkit:tick",
  (e) => console.log(e.detail)
);

document.addEventListener(
  "countkit:expired",
  (e) => console.log(e.detail)
);
```

---

# License

MIT License

Copyright (c) 2025 Sazzad Hussain  
https://sazzadh.com