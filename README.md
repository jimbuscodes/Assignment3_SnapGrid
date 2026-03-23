# SnapGrid — Social Media Dashboard (Assignment 3)

## Files

- `index.html` — the app UI
- `styles.css` — styling for light/dark theme and layout
- `solutions.js` — where the assignment JavaScript is implemented

## Features implemented

- Theme toggle (Dark / Light mode)
- Follow / Unfollow with live follower counter
- Post composer with character counter and live posting
- Like / Unlike functionality for posts (counts and total)
- Hashtag filtering and basic hashtag styling for new posts

## How to run

1. Open `index.html` in your browser. On macOS you can double-click the file or serve it with a simple HTTP server.

   Example (from project folder):

   ```bash
   # using Python 3 built-in server
   python3 -m http.server 8000
   # then open http://localhost:8000 in your browser
   ```

2. Interact with the UI:
   - Toggle theme with the top-right button.
   - Click Follow to change follower count.
   - Compose a post and click Post to add a new post to the feed.
   - Click the heart on any post to like/unlike and update totals.
   - Click hashtag pills to filter posts by tag.

## Notes & testing tips

- New posts created via the composer are sanitized to prevent HTML injection and hashtags are wrapped in a `.hashtag` span for styling.
- If likes on newly-created posts don't respond, ensure `attachLikeListeners()` is being called after the post is inserted into the DOM.
- For quick development, use a browser devtools console to inspect elements or to call helper functions defined in `solutions.js`.
