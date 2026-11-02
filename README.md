# The Archive of Us

A vintage-inspired Next.js starter with:
- Secret entrance and wax-seal-inspired design
- Three cards only
- Video edits section
- Audio recordings section
- Link to your published Canva love-letter website
- Responsive layout and gentle animations

## Run it on your laptop

1. Install Node.js if needed.
2. Extract this folder.
3. Open a terminal inside `archive-of-us`.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Important: set your passcode and Canva link

Open `app/page.tsx` and change:

```ts
const PASSCODE = "moonlight";
const CANVA_URL = "PASTE_YOUR_PUBLISHED_CANVA_WEBSITE_URL_HERE";
```

Use your preferred passcode and paste the published Canva website URL.

## Add your media

- Put video files in `public/videos/`.
- Put audio files in `public/audio/`.

The media sections currently show starter placeholders. To make each video or recording playable, add `<video controls src="/videos/your-video.mp4" />` or `<audio controls src="/audio/your-recording.mp3" />` in the relevant modal in `app/page.tsx`.

## Security note

The passcode in this starter is checked in browser code. It is suitable only as a visual prototype, not for genuinely private content. Anyone who can inspect the site's JavaScript could discover the passcode. Before publishing sensitive/private content, move passcode verification and protected media behind a server-side password/session gate.

## Deploy

You can deploy the project to a Next.js-compatible hosting service. Add the final Canva URL and media files before deployment.

## Included media
The current starter package includes:
- `public/videos/little-moment-01.mp4`
- `public/videos/little-moment-02.mp4`
- `public/audio/a-voice-to-keep.ogg`

The cinema and voice sections use native browser players inside vintage-styled paper panels. To add future files, copy them into the matching folder and add an entry to `VIDEOS` or `AUDIO` in `app/page.tsx`.

**Important:** update `CANVA_URL` in `app/page.tsx` with the actual published Canva website URL. The passcode in this starter is a front-end demo, not secure access control for private content.


## Small update in this version
- Added a fourth homepage card, **The Little Surprise You Left Unfinished**, linking to `https://psynie.github.io/error_del/` in a new tab.
- Updated only the homepage component and styles for a more decorative vintage scrapbook feel; the passcode and other existing sections remain as before.
- Added photo placeholders between the two current videos in the cinema section. Add images to `public/photos` and change the empty `src` values in `CINEMA_ITEMS` in `app/page.tsx` to paths such as `/photos/photo-01.jpg`.
- The Canva URL is still a placeholder in `app/page.tsx`; replace it with the published Canva website URL when available.
