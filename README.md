# LLS — Language Learning Subtitles

**LLS** is a free, open-source Chrome extension for learning languages through subtitles.  
Highlight words and phrases while watching videos (like YouTube or Netflix), see translations instantly, and build your own personalized word bank to look back on later.

Planning Document is here: https://docs.google.com/document/d/1UO2vKFcx9XFlMEN_ec5uRU0OsGKuAFmRz8oopyK5JGY/edit?usp=sharing

Language Learning Community (LLC) Discord server is here: https://docs.google.com/document/d/1UO2vKFcx9XFlMEN_ec5uRU0OsGKuAFmRz8oopyK5JGY/edit?usp=sharing
---

## 💰 Costs

The intent is for the product to be **free to use** for all main features. The extension is open-source and will be available for free download, and won't integrate third-party paid resources for the core features.

Some future features may leverage **LLMs** (large language models) or other AI-powered tools, and these will most likely incur costs. API keys will need to be provided by the user to activate these features, so the cost will depend on that API endpoint's billing structure. 

- Example: translating several thousand words with an LLM costs roughly **$1**, which is much cheaper than paid platforms (who mark up prices to profit).
- Users will be able to **enter their own API key** (e.g. OpenAI, Anthropic, etc.).  
  No API calls will pass through LLS servers--because there are none!

Core functionality (highlighting, translating, saving words, exporting, flashcards) will **remain free**.

---

## 🪶 Open-Source Philosophy & Hosting

This is intended to be an **open-source, community-driven** project. Anyone can contribute or fork the project to take it in a different direction. 

**Anyone** should be able to download and run the extension without paying or signing up. Hosted databases or servers should not be required for basic functionality--although they can be optional features to enhance the project.

- Licensed freely, likely **non-commercial**.
- **No central servers** or hosted databases.
- **No account systems** — local-first design.
- The goal is to make setup **as easy as possible**, even for non-technical users.

### 🧠 Storage Options

1. **Local** — via `chrome.storage` API or `IndexedDB`  
   - Simple, zero setup.  
   - May be wiped by user actions or browser resets.

2. **User-provided backend (optional)** — e.g. **Google Drive**, **Supabase**  
   - Users can enter their own endpoint to sync data.  
   - Communities could host shared databases for their members.  
   - Google authentication or Google Drive integration could be used for convenience.

---

## ⚙️ Opt-In Features

Optional integrations users can enable:
- **AI tooling** (via personal LLM API key)
   - could enhance the translations and provide additional context, etc
- **External data storage** (Supabase, Google Drive, etc.)
   - allows data sharing across devices 

---

## 🌐 Translations

A big part of this extension is the ability to easily translate words you see and save them for review later. However there are no free APIs that do this. There are a few ways to keep translations free in this product though:

### Google Translate API
Google Translate has a free tier that allows you to use their basic service for 500,000 free characters a month. That is probably 100k words monthly, which is more than enough for personal use. The caveat here is you need to set up a few things to get your API key. (https://cloud.google.com/translate/pricing#basic-pricing)

### Offloading to Google Translate 
Instead of integrating it directly into our product, we could instead leverage the existing, free, Google Translate browser extension or website. Users could click on words to highlight them, which should bring up the Google Translate icon, which they can click on for an extension. We could instead make it open a new tab with the translation details in the URL, so the page has the translation. And then either A. allow users to manually enter translations (which may be good for learning...) or B. use our extension and content scripts to auto-read the translation output.

### Creating an LLS Server
We could create an alternate piece of software for the LSS project that spins up an API endpoint. This could host something like LibreTranslate, a free translation tool, which our extension could query. When the product expands, things like whisper.cpp could be run on this server for speech-to-text transcriptions. This could be hosted locally by a user, or could be hosted for communities (so individual users don't have to set up a local server).

### Current Stance
It makes sense to do as little work as possible to get this working, so the LSS server should be a last resort. Including instructions for getting a Google Translate API key should be good enough for now.

---

## 🎬 Supported Platforms

Works on websites where subtitles are rendered in the HTML:
- **YouTube**
- **Netflix**
- more to come

---

## 🧰 Tech Stack

The initial build aims to stay **simple, accessible, and beginner-friendly**.

### Proposed Stack
- **HTML + CSS + JavaScript** — core technologies
- **JS Modules** — for clean, modular structure
- **theme.css** — global styles, variables, and color presets
- **page-specific CSS files** — one per major UI (pages, popup, content script)

> We aim to keep it simple for early contributors. Expansion to frameworks like React can come later if needed.

---

## 💡 Feature Roadmap

Ideas are sorted into four stages of development.

### 🧩 Mandatory (MVP)
- Click or highlight words/phrases directly in subtitles  
- Show accurate translations on hover
- Handle multi-word phrases (e.g., phrasal verbs, reflexive verbs, compound characters)
- Manually select multiple words for translation
- Save words to user-defined lists  
- Each word entry includes translation, timestamp, and source link  
- Choose a “primary” translation for testing or display  
- Export word lists (`.csv`, `.txt`, `.xlsx`)  
- Flashcard mode for practice and review

---

### 🌿 Nice-to-Haves
- Add contextual info to translations  
- Save full sentences for reference  
- Sidebar transcript view  
- Dual subtitles (native + learning language) / custom subs

---

### 🚀 Stretch Goals
- Auto-generate subtitles for videos without captions (voice-to-text) 
- Export transcripts with highlights and annotations  
- Share word banks between users via CSV import/export
- LLM features:
   - Explain tone, register, or nuance  
   - Suggest alternative phrasings  
   - Generate example sentences for saved words

---

### 💭 Miscellaneous Ideas
To be categorized later — open area for brainstorming and community input.

---

## 🧑‍🤝‍🧑 Community

Built by members of the **Language Learning Community (LLC)** Discord [insert link here].  

---

## 📜 License

Open-source, free to use.  
Likely licensed under a **non-commercial** license (TBD).
