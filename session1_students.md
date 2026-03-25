# Git Workshop — Session 1 Student Guide

## How to use this guide

For each section:
1. Read the goal
2. Follow the steps in order
3. Pause at the checkpoint
4. Ask yourself the reflection questions before moving on

Do not rush to the next command. The goal is to understand what changed and why.

---

# Section 1 — First repository

## Goal
Create a Git repository, add files, and make your first commits.

## What you are learning
- what a repository is
- what staging does
- what a commit is
- the difference between untracked, staged, and committed files

## Steps

### Step 1 — Create a new project folder
```bash
mkdir my-first-repo
cd my-first-repo
```

### Step 2 — Initialize Git
```bash
git init
```

### Step 3 — Create a few files

**Create `README.md`** with this content:
```
# My Project
```

**Create `app.js`** with this content:
```javascript
console.log('hello');
```

### Step 4 — Check Git status
```bash
git status
```

Look for:
- untracked files
- file names in red

### Step 5 — Stage only the README
```bash
git add README.md
git status
```

Look for:
- `README.md` staged
- the other files still untracked

### Step 6 — Commit the README
```bash
git commit -m "docs: add README"
```

### Step 7 — Stage and commit `app.js`
```bash
git add app.js
git commit -m "feat: initial app entry point"
```

### Step 8 — View the history
```bash
git log --oneline
```

## Checkpoint
You should now have:
- a `.git` directory
- two commits
- a clean working tree

Check:
```bash
git status
```

## Reflection questions
- Why did we not stage everything at once?
- What is the difference between creating a file and committing it?
- What does `git status` tell you?

---

# Section 2 — Inspect changes with diff

## Goal
Understand the difference between unstaged changes and staged changes.

## What you are learning
- what `git diff` shows
- what `git diff --staged` shows
- how Git compares different areas

## Steps

### Step 1 — Edit `app.js`

Open `app.js` in your editor and add this line at the end:
```javascript
console.log('world');
```

### Step 2 — View the unstaged diff
```bash
git diff
```

### Step 3 — Stage the file
```bash
git add app.js
```

### Step 4 — Run `git diff` again
```bash
git diff
```

Notice:
- it should now show nothing

### Step 5 — View the staged diff
```bash
git diff --staged
```

### Step 6 — Commit the change
```bash
git commit -m "feat: add world log"
```

## Checkpoint
Run:
```bash
git status
```

You should see a clean working tree.

## Reflection questions
- Why did `git diff` stop showing the change after staging?
- What is `git diff --staged` comparing?

---

# Section 3 — Branching

## Goal
Create a branch, work on it, and observe how branches isolate work.

## What you are learning
- what a branch is
- how switching branches affects files
- what HEAD means in practice

## Steps

### Step 1 — Create and switch to a new branch
```bash
git switch -c feature/header
```

### Step 2 — Confirm your current branch
```bash
git branch
```

Look for:
- the asterisk `*`

### Step 3 — Create a new file on this branch

**Create `header.html`** with this content:
```html
<h1>My App</h1>
```

Then:
```bash
git add header.html
git commit -m "feat: add header component"
```

### Step 4 — Switch back to main
```bash
git switch main
```

Observe:
- `header.html` should no longer be present in your working directory

### Step 5 — Create a second branch
```bash
git switch -c feature/footer
```

### Step 6 — Add another file

**Create `footer.html`** with this content:
```html
<footer>© 2026</footer>
```

Then:
```bash
git add footer.html
git commit -m "feat: add footer component"
```

### Step 7 — View all branches and history
```bash
git log --oneline --graph --all --decorate
```

## Checkpoint
You should now have:
- `main`
- `feature/header`
- `feature/footer`

## Reflection questions
- Why did `header.html` disappear when you switched back to `main`?
- Did Git copy the whole project when the branch was created?
- What does the asterisk in `git branch` mean?

---

# Section 4 — Merge and conflict

## Goal
Perform a merge, then create and resolve a merge conflict.

## What you are learning
- what a merge does
- what a fast-forward merge is
- why conflicts happen
- how to resolve conflict markers

## Part A — Clean merge

### Step 1 — Switch to main
```bash
git switch main
```

### Step 2 — Merge `feature/header`
```bash
git merge feature/header
```

### Step 3 — Inspect history
```bash
git log --oneline --graph --all --decorate
```

## Part B — Create a conflict

### Step 4 — On main, change `app.js`

Open `app.js` and replace the content with:
```javascript
console.log('Hello from main!');
```

Then:
```bash
git add app.js
git commit -m "fix: update log message"
```

### Step 5 — Switch to `feature/footer`
```bash
git switch feature/footer
```

### Step 6 — Change the same line differently

Open `app.js` and replace the content with:
```javascript
console.log('Hello from footer branch!');
```

Then:
```bash
git add app.js
git commit -m "fix: update log in footer branch"
```

### Step 7 — Switch back to main and merge
```bash
git switch main
git merge feature/footer
```

You should now see a conflict.

### Step 8 — Open `app.js`
You should see markers similar to this:
```text
<<<<<<< HEAD
console.log('Hello from main!');
=======
console.log('Hello from footer branch!');
>>>>>>> feature/footer
```

### Step 9 — Resolve the conflict
Edit the file so it contains only the final version you want.

Example:
```javascript
console.log('Hello from main and footer branch!');
```

Remove all conflict markers.

### Step 10 — Stage the resolved file
```bash
git add app.js
```

### Step 11 — Complete the merge
```bash
git merge --continue
```

### Step 12 — Inspect history again
```bash
git log --oneline --graph --all --decorate
```

## Checkpoint
You should now have:
- one fast-forward merge
- one merge conflict resolved
- a merge commit in your history

## Reflection questions
- Why was the first merge easy?
- Why did the second merge create a conflict?
- What did the conflict markers represent?

---

# Section 5 — Undoing things

## Goal
Practice safer undo operations and understand what each one affects.

## What you are learning
- how to discard unstaged changes
- how to unstage changes
- how to undo the last commit while keeping work

## Part A — Discard an unstaged change

### Step 1 — Edit `README.md`

Open `README.md` and add this line at the end:
```
oops
```

### Step 2 — View the diff
```bash
git diff
```

### Step 3 — Restore the file
```bash
git restore README.md
```

### Step 4 — Confirm it is clean
```bash
git diff
```

## Part B — Unstage a file

### Step 5 — Make another change

Open `README.md` and add this line at the end:
```
something
```

Then:
```bash
git add README.md
git status
```

### Step 6 — Unstage it
```bash
git restore --staged README.md
git status
```

Observe:
- the change should still exist
- but it is no longer staged

## Part C — Undo the last commit but keep the changes

### Step 7 — Commit the change
```bash
git add README.md
git commit -m "wip: test"
```

### Step 8 — View recent history
```bash
git log --oneline -3
```

### Step 9 — Undo the last commit
```bash
git reset HEAD~1
```

### Step 10 — Check history and status
```bash
git log --oneline -3
git status
```

Observe:
- the commit is gone from the log
- the file changes are still in your working directory

## Checkpoint
You should now be able to tell the difference between:
- restoring a file
- unstaging a file
- resetting a commit

## Reflection questions
- What changed when you used `git restore README.md`?
- What changed when you used `git restore --staged README.md`?
- What changed when you used `git reset HEAD~1`?

---

# Section 6 — GitHub and remotes

## Goal
Connect your local repository to GitHub and understand fetch, pull, and push.

## What you are learning
- local vs remote repository
- what `origin` means
- the difference between `push`, `fetch`, and `pull`

## Steps

### Step 1 — Create an empty GitHub repository
On GitHub:
- create a new repository
- do not initialize it with a README
- copy the repository URL

### Step 2 — Add the remote
Replace the URL below with your own:
```bash
git remote add origin https://github.com/YOU/my-first-repo.git
```

### Step 3 — Verify the remote
```bash
git remote -v
```

### Step 4 — Push your local `main`
```bash
git push -u origin main
```

### Step 5 — Make a change directly on GitHub
On GitHub:
- open `README.md`
- edit it
- commit the change in the browser

### Step 6 — Fetch remote changes
```bash
git fetch
```

### Step 7 — Inspect the remote-tracking branch
```bash
git log --oneline origin/main
```

### Step 8 — Pull the change into local main
```bash
git pull
```

### Step 9 — Check history
```bash
git log --oneline --graph --all --decorate
```

## Checkpoint
You should now understand:
- `main` is your local branch
- `origin/main` is your remote-tracking branch
- `fetch` downloads without integrating
- `pull` downloads and integrates

## Reflection questions
- What does `fetch` do that `pull` does not?
- Why is `origin/main` not the same as `main`?
- What does `-u` do in `git push -u origin main`?

---

# Final self-check

By the end of this session, you should be able to explain:

- what a commit is
- what staging is
- what a branch is
- what a merge does
- what `fetch`, `pull`, and `push` do

If any of those are still unclear, ask before moving on.
