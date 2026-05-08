# CountKit

Beautiful embeddable countdown timers for any website.

CountKit is a lightweight zero-dependency countdown widget that works with a single script tag.

---

# Features

- Easy embed
- Zero dependencies
- Auto-injected styles
- Responsive layout
- Multiple timers supported
- Custom colors
- Custom sizing
- Auto-hide on expiry
- Lightweight
- CDN ready

---

# Installation

Add this anywhere on your website:

```html
<div
  class="countkit"
  data-date="2026-05-10"
  data-time="23:59:59"
></div>

<script src="https://cdn.jsdelivr.net/gh/sazzadh/CountKit@1.0/CountKit.min.js"></script>
```

---

# Basic Usage

```html
<div
  class="countkit"
  data-date="2026-12-31"
  data-time="23:59:59"
></div>
```

---

# Options

| Attribute | Description | Example |
|---|---|---|
| `data-date` | Target date | `2026-12-31` |
| `data-time` | Target time | `23:59:59` |
| `data-text-color` | Number color | `#222222` |
| `data-label-color` | Label color | `#777777` |
| `data-divider-color` | Divider color | `rgba(0,0,0,.15)` |
| `data-number-size` | Number font size | `52` |
| `data-label-size` | Label font size | `12` |
| `data-gap` | Space between items | `18` |
| `data-hide-on-end` | Hide timer on expiry | `true` |
| `data-hide-ids` | Hide elements on expiry | `#hero,#banner` |

---

# Advanced Example

```html
<div
  class="countkit"

  data-date="2026-05-10"
  data-time="23:59:59"

  data-text-color="#000"
  data-label-color="#888"

  data-number-size="60"
  data-label-size="14"

  data-gap="24"

  data-hide-on-end="true"
  data-hide-ids="#hero,#popup"
></div>

<script src="https://cdn.jsdelivr.net/gh/sazzadh/CountKit@1.0/CountKit.min.js"></script>
```

---

# CDN Usage

```html
<script src="https://cdn.jsdelivr.net/gh/sazzadh/CountKit/CountKit.min.js"></script>
```

---

# Versioned CDN

```html
<script src="https://cdn.jsdelivr.net/gh/sazzadh/CountKit@1.0/CountKit.min.js"></script>
```

---

# Browser Support

- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

---

# License

MIT License
