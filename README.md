# 🎵 TikToks Showtime — Trendy Memory Game

A branded, browser-based memory card game built for **TikTok Showtime** events. Players match pairs of TikTok trend posters against the clock, finishing on a congratulations screen that shows their final score.

---

## 📁 Project Structure

```
TIKTOKS SHOWTIME/
└── TIKTOKS SHWO/
    ├── home.html              # Landing / start screen
    ├── congraulation.html     # Win screen (shows moves & time)
    ├── style.css              # Global styles
    ├── script.js              # Shared game logic
    ├── Memory Game/
    │   ├── index.html         # In-game board
    │   ├── script.js          # Card flip & match logic
    │   ├── style.css          # Board & card styles
    │   └── images/            # Card face images (image1–8 + default)
    ├── Logos/                 # TikTok Showtime logo (black & white)
    ├── Posters/               # A4 trend poster JPGs (used as card faces)
    ├── Stickers/              # SVG sticker assets (FIRE, CUTE, LOVE, etc.)
    └── Tipo/                  # TikTok Sans Display fonts (Bold & Black)
```

> There is also a `Memory Game-2/` folder at the root level — an earlier iteration of the game, kept for reference.

---

## 🎮 How It Works

| Screen | File | Description |
|---|---|---|
| **Home** | `home.html` | Shows the title, a fanned card preview, and a **¡Juega!** (Play!) button |
| **Game Board** | `Memory Game/index.html` | 4×4 grid of 16 face-down cards (8 pairs); tracks moves and elapsed seconds |
| **Win Screen** | `congraulation.html` | Displays the fire sticker, a congratulations message, and the player's final moves + time |

### Game Flow
1. Player lands on `home.html` and clicks **¡Juega!**
2. Redirects to `Memory Game/index.html`, where the board is shuffled and the timer starts.
3. Player clicks cards to flip them. Matching pairs stay revealed; mismatches flip back after 1 second.
4. When all 8 pairs are matched, score is saved to `localStorage` and the player is sent to `congraulation.html`.
5. Clicking **Play Again** returns to `home.html`.

---

## 🚀 Getting Started

No build step required — this is pure HTML/CSS/JS.

```bash
# Clone the repo
git clone https://github.com/your-org/tiktoks-showtime.git
cd tiktoks-showtime

# Open the entry point in your browser
open "TIKTOKS SHOWTIME/TIKTOKS SHWO/home.html"
```

Or serve it with any static file server to avoid local path issues:

```bash
# Using Python
python3 -m http.server 8080
# Then visit: http://localhost:8080/TIKTOKS%20SHOWTIME/TIKTOKS%20SHWO/home.html

# Using Node (npx)
npx serve .
```

---

## 🖼️ Assets

| Folder | Contents |
|---|---|
| `Posters/` | 7 × TikTok trend A4 posters (`Tiktok_posters_A4_1–7.jpg`) + a back-of-card image |
| `Stickers/` | 5 × branded SVG stickers — CUTE, FIRE, LOVE (YELLOW), MAIN CHARACTER, VIBEY-RAZZ |
| `Logos/` | TikTok Showtime logo in white and black PNG |
| `Tipo/` | `TikTok-Sans-Display-Black.otf` and `TikTok-Sans-Display-Bold.otf` |

---

## 🔧 Customisation

**Swap the card images** — replace the files in `Memory Game/images/` (keep filenames `image1.jpg` … `image8.png`) or update the `cardsData` array in `Memory Game/script.js`.

**Change the number of pairs** — add more entries to `cardsData` in `script.js` and adjust the CSS grid columns in `style.css` accordingly.

**Localisation** — all user-facing text is in Spanish (`es`). Update the HTML strings in `home.html`, `index.html`, and `congraulation.html` to switch language.

---

## 🌐 Browser Support

Works in any modern browser (Chrome, Firefox, Safari, Edge). No external dependencies beyond a [Meyer CSS reset](https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css) loaded via CDN on the game board screen.

> **Note:** The win screen reads scores from `localStorage`. If opened directly as a `file://` URL in some browsers, `localStorage` may be restricted — use a local server (see above) for the full experience.

---

## 📄 License

Assets (logos, posters, stickers, fonts) are property of **TikTok / ByteDance** and are included here for event use only. Game code is available under the [MIT License](LICENSE).

