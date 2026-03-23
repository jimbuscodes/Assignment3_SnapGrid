// ============================================================
//  solutions.js — SnapGrid Social Media Dashboard
//  Assignment 3: JavaScript DOM Manipulation & Event Handling
//
//  Name:   ___________________________
//  Date:   ___________________________
// ============================================================
//
//  INSTRUCTIONS:
//  • Write all your code in this file — do not modify index.html or styles.css
//  • Test each task in the browser before moving on
//  • Recommended order: Tasks 1 → 2 → 4 → 3 → 5
//    (Task 3's Post Composer calls Task 4's attachLikeListeners(),
//     so it helps to have Task 4 written first)
// ============================================================

// ============================================================
//  TASK 1 — Dark / Light Mode Toggle  (3 points)
//
//  TODO:
//  1. Select #themeToggleBtn, #themeIcon, and #themeLabel
//  2. Declare:  let isDark = true
//  3. Add a 'click' event listener to the button
//  4. Inside the listener:
//     a. Flip isDark using !isDark
//     b. If isDark is now true:
//          - document.documentElement.setAttribute('data-theme', 'dark')
//          - Set #themeIcon text to '🌙'
//          - Set #themeLabel text to 'Dark Mode'
//     c. If isDark is now false:
//          - Set data-theme attribute to 'light'
//          - Set #themeIcon text to '☀️'
//          - Set #themeLabel text to 'Light Mode'
// ============================================================

// YOUR CODE HERE

const themeBtn = document.getElementById("themeToggleBtn");
let isDark = true;
themeBtn.addEventListener("click", () => {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("themeIcon").textContent = "🌙";
    document.getElementById("themeLabel").textContent = "Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.getElementById("themeIcon").textContent = "☀️";
    document.getElementById("themeLabel").textContent = "Light Mode";
  }
});
// ============================================================
//  TASK 2 — Follow / Unfollow with Live Counter  (4 points)
//
//  TODO:
//  1. Select #followBtn, #followBtnText, and #followerCount
//  2. Declare:  let isFollowing = false
//              let followers   = 1284
//  3. Add a 'click' event listener to #followBtn
//  4. Inside the listener:
//     a. Flip isFollowing
//     b. If now following:
//          - followers++
//          - Set #followBtnText to '✅ Following'
//          - Add class 'following' to #followBtn
//     c. If now unfollowed:
//          - followers--
//          - Set #followBtnText to '➕ Follow'
//          - Remove class 'following' from #followBtn
//     d. In both cases, update #followerCount.textContent
//        to followers.toLocaleString()
// ============================================================

// YOUR CODE HERE

const followBtn = document.getElementById("followBtn");
let isFollowing = false;
let followers = 1284;
followBtn.addEventListener("click", () => {
  isFollowing = !isFollowing;
  if (isFollowing) {
    followers++;
    document.getElementById("followBtnText").textContent = "✅ Following";
    followBtn.classList.add("following");
  } else {
    followers--;
    document.getElementById("followBtnText").textContent = "➕ Follow";
    followBtn.classList.remove("following");
  }
  document.getElementById("followerCount").textContent =
    followers.toLocaleString();
});

// ============================================================
//  TASK 3 — Live Post Composer  (5 points)
//  ⭐ Tip: Complete Task 4 first — you need to call
//     attachLikeListeners() inside this task.
//
//  TODO:
//  1. Select #composerTextarea, #charCounter, #postBtn,
//     #postFeed, and #postCount
//
//  2. Add an 'input' event listener to #composerTextarea:
//     a. remaining = 280 - textarea.value.length
//     b. Update #charCounter text to "X characters remaining"
//     c. If remaining < 20, add class 'counter-warning'
//        to #charCounter; otherwise remove it
//     d. Disable #postBtn if textarea value is empty (after trim);
//        enable it otherwise
//
//  3. Add a 'click' event listener to #postBtn:
//     a. Get postText = composerTextarea.value.trim()
//     b. Create a new <article> element (document.createElement)
//        - Add classes:  post-card  new-post
//        - Set data-tags attribute (extract hashtags from text or leave "")
//     c. Set its innerHTML using the template from the task instructions
//        (remember to drop postText into the <p class="post-body">)
//     d. postFeed.prepend(newPost)
//     e. Call attachLikeListeners() so the new heart button works
//     f. Reset the textarea, counter text, remove counter-warning,
//        disable the post button
//     g. Increment and update #postCount
// ============================================================

// YOUR CODE HERE

const composerTextarea = document.getElementById("composerTextarea");
const charCounter = document.getElementById("charCounter");
const postBtn = document.getElementById("postBtn");
const postFeed = document.getElementById("postFeed");
const postCount = document.getElementById("postCount");

composerTextarea.addEventListener("input", () => {
  const remaining = 280 - composerTextarea.value.length;
  charCounter.textContent = `${remaining} characters remaining`;
  if (remaining < 20) {
    charCounter.classList.add("counter-warning");
  } else {
    charCounter.classList.remove("counter-warning");
  }
  postBtn.disabled = composerTextarea.value.trim() === "";
});

postBtn.addEventListener("click", () => {
  const postText = composerTextarea.value.trim();
  const newPost = document.createElement("article");
  newPost.classList.add("post-card", "new-post");
  const hashtags = postText.match(/#\w+/g);
  newPost.setAttribute("data-tags", hashtags ? hashtags.join(",") : "");
  newPost.innerHTML = `
  <div class="post-header">
    <div class="post-avatar">🧑‍💻</div>
    <div class="post-meta">
        <span class="post-author">Alex Rivera</span>
        <span class="post-time">Just Now</span>
    </div>
  </div>
    <p class="post-body">${postText}</p>
    <button class="like-btn" data-liked="false">
      <span class="like-icon">🤍</span>
      <span class="like-count">0</span>
    </button>
    
`;

  postFeed.prepend(newPost);
  attachLikeListeners();
  composerTextarea.value = "";
  charCounter.textContent = "280 characters remaining";
  charCounter.classList.remove("counter-warning");
  postBtn.disabled = true;
  postCount.textContent = parseInt(postCount.textContent, 10) + 1;
});

// ============================================================
//  TASK 4 — Like / Unlike Posts  (4 points)
//  ⭐ Write this as a NAMED FUNCTION — Task 3 calls it.
//
//  TODO:
//  1. Define:  function attachLikeListeners() { ... }
//  2. Inside it:
//     a. Select all .like-btn elements
//     b. Loop with forEach
//     c. For each btn, clone it to remove old listeners:
//          const fresh = btn.cloneNode(true);
//          btn.parentNode.replaceChild(fresh, btn);
//     d. Add a 'click' listener to 'fresh':
//          - Read liked state:
//            const alreadyLiked = fresh.getAttribute('data-liked') === 'true'
//          - Get count from .like-count span inside the button (parseInt)
//          - If alreadyLiked:
//              set data-liked to 'false', remove class 'liked',
//              icon → '🤍', count - 1
//          - Else:
//              set data-liked to 'true', add class 'liked',
//              icon → '❤️', count + 1
//          - Call updateTotalLikes()
//
//  3. Define:  function updateTotalLikes() { ... }
//     a. Count all .like-btn[data-liked="true"] elements
//     b. Update #totalLikedCount with that number
//
//  4. Call attachLikeListeners() at the bottom of this section
//     to wire up the initial posts.
// ============================================================

// YOUR CODE HERE
function attachLikeListeners() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((btn) => {
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener("click", () => {
      const alreadyLiked = fresh.getAttribute("data-liked") === "true";
      const likeCountSpan = fresh.querySelector(".like-count");
      const count = likeCountSpan
        ? parseInt(likeCountSpan.textContent, 10) || 0
        : 0;
      if (alreadyLiked) {
        fresh.setAttribute("data-liked", "false");
        fresh.classList.remove("liked");
        const icon = fresh.querySelector(".like-icon");
        if (icon) icon.textContent = "🤍";
        if (likeCountSpan) likeCountSpan.textContent = count - 1;
      } else {
        fresh.setAttribute("data-liked", "true");
        fresh.classList.add("liked");
        const icon = fresh.querySelector(".like-icon");
        if (icon) icon.textContent = "❤️";
        if (likeCountSpan) likeCountSpan.textContent = count + 1;
      }
      updateTotalLikes();
    });
  });
}

function updateTotalLikes() {
  const totalLiked = document.querySelectorAll(
    '.like-btn[data-liked="true"]',
  ).length;
  document.getElementById("totalLikedCount").textContent = totalLiked;
}

attachLikeListeners();

// ============================================================
//  TASK 5 — Hashtag Filter  (4 points)
//
//  TODO:
//  1. Select all .tag-pill elements and #filterResultMsg
//  2. Loop through the pills with forEach and add a 'click'
//     listener to each
//  3. Inside the listener:
//     a. Remove class 'active' from ALL pills, then add it to
//        the clicked one only
//     b. Get the tag: pill.getAttribute('data-tag')
//     c. Get all .post-card elements inside #postFeed
//        Use Array.from() so you can use .filter() later
//     d. Loop through posts:
//          - If tag === 'all': remove class 'hidden' from every post
//          - Otherwise: check if post's data-tags includes(tag)
//              yes → remove 'hidden'
//              no  → add 'hidden'
//     e. Count visible posts:
//          posts.filter(p => !p.classList.contains('hidden')).length
//     f. Update #filterResultMsg:
//          'all' tag   → "Showing all X posts"
//          other tags  → "X post(s) tagged #tagname"
// ============================================================

// YOUR CODE HERE

const tagPills = document.querySelectorAll(".tag-pill");
const filterResultMsg = document.getElementById("filterResultMsg");

tagPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    tagPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    const tag = pill.getAttribute("data-tag");
    const posts = Array.from(document.querySelectorAll("#postFeed .post-card"));
    posts.forEach((post) => {
      if (tag === "all") {
        post.classList.remove("hidden");
      } else {
        const postTags = post.getAttribute("data-tags").split(",");
        if (postTags.includes(tag)) {
          post.classList.remove("hidden");
        } else {
          post.classList.add("hidden");
        }
      }
    });
    const visibleCount = posts.filter(
      (p) => !p.classList.contains("hidden"),
    ).length;
    if (tag === "all") {
      filterResultMsg.textContent = `Showing all ${visibleCount} posts`;
    } else {
      filterResultMsg.textContent = `${visibleCount} post(s) tagged #${tag}`;
    }
  });
});
