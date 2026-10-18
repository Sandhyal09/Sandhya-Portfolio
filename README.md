# Sandhya L — Portfolio

Clean, dark portfolio for **Sandhya L**, Senior Business Analyst (Banking, Healthcare & Insurance), inspired by a classic developer-portfolio layout and made more interactive.

## What's on the page

| Section | What it does |
|---|---|
| **Hero** | Round photo, big name, role, LinkedIn / email / résumé icons. Purple wave lines flow live in the background and bend toward the mouse. **Hear my intro** plays the AI voice with captions while the photo glows. |
| **Light / dark mode** | Sun / moon button top-left. The choice is remembered. |
| **Expertise** | Three columns (Business Analysis, Data Analysis & Quality, Reporting & Dashboards) with tool chips. |
| **Skills band** | Two rows of skill pills sliding sideways in opposite directions; they pause on hover. |
| **Career History** | Vertical timeline. The line fills as you scroll and the cards slide in from each side. |
| **Case Studies** | Three mini dashboard previews. Click one to open the full story (challenge, what I did, outcome). |
| **Education** | Both degrees. |
| **Contact Me** | A form that opens the visitor's email app with the message ready to send, plus email, phone (copy buttons) and LinkedIn. |
| **Cursor ball** | On laptops, a round ball follows the mouse and grows with a label over buttons and links. |

## Project structure

```
sandhya-portfolio/
├── index.html                  Page structure
├── css/styles.css              Colors (dark + light), fonts, layout, animations
├── js/data.js                  ✏️ Your words: intro script, jobs, case studies, skills pills, education, contact
├── js/app.js                   Waves, timeline, case studies, voice intro, form, cursor, expertise text
├── assets/
│   ├── sandhya.jpg             Your photo
│   ├── Sandhya_L_Resume.pdf    Résumé visitors download
│   └── intro.mp4               (optional) your video intro. Add it and "Watch my intro" plays it in a large player
├── .vscode/                    Live Server settings
└── package.json                `npm start` alternative
```

## Run it in VS Code

1. **File → Open Folder** → select the `sandhya-portfolio` folder that contains `index.html`.
2. Click **Go Live** (Live Server extension), or right-click `index.html` → **Open with Live Server**.

## Adding your video intro

1. Make your video (sitting on a desk, introducing yourself) and export it as **MP4**.
2. Name it exactly **`intro.mp4`** and put it in the `assets` folder.
3. The hero button changes to **Watch my intro** and plays it in a large player. Without the file, the button plays the AI voice intro instead.
4. Keep it under about 30 MB so it loads quickly (landscape 1920×1080 or 1280×720 works best).
5. On Vercel: upload `intro.mp4` into `assets` on GitHub and commit. Vercel redeploys automatically.

## Switch on the contact form and calendar (10 minutes)

Both are set in **`js/data.js`**, at the bottom.

**Contact form that sends to your inbox (Formspree, free plan):**
1. Go to **formspree.io**, sign up with `lsandhya0910@gmail.com`, and click **New Form** (name it "Portfolio").
2. Formspree shows an endpoint like `https://formspree.io/f/xyzabcd`. Copy only the last part (`xyzabcd`).
3. In `js/data.js` set: `const FORMSPREE_ID = "xyzabcd";`
4. Send yourself a test message from the live site. The first time, Formspree asks you to confirm by email.

Until this is set, the form opens the visitor's email app instead.

**"Book a 30-min chat" buttons (Calendly, free plan):**
1. Go to **calendly.com**, sign up, connect your Google calendar, and create a **15-minute** event (e.g. "Intro chat with Sandhya").
2. Copy the event link, e.g. `https://calendly.com/sandhya-l/15min`.
3. In `js/data.js` set: `const CALENDLY_URL = "https://calendly.com/sandhya-l/15min";`

The buttons appear in the hero and the contact section as soon as the link is set.

## Editing

| I want to change… | Where |
|---|---|
| What the voice says | `js/data.js` → `SCRIPT` |
| Timeline jobs | `js/data.js` → `JOBS` |
| Case studies | `js/data.js` → `CASES` |
| Scrolling skill pills | `js/data.js` → `SKILL_PILLS` |
| Expertise columns | `js/app.js` → `EXPERTISE` |
| Colors | `css/styles.css` → `:root` (dark) and `:root[data-theme="light"]` |
| Photo or résumé | replace the file in `assets/` with the same name |

## Publish free with GitHub Pages

1. Create a **public** GitHub repository named `sandhyal09.github.io`.
2. Upload everything in this folder (or in VS Code: **Source Control → Publish to GitHub**).
3. In the repo: **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
4. Your site goes live at **https://sandhyal09.github.io**.

> Publishing makes your email, phone and résumé public. Remove the phone from `js/data.js` first if you'd rather not share it.

© 2026 Sandhya L
