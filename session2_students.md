# Git Workshop — Session 2 Student Guide

## How to use this guide

For each section:
1. Read the goal
2. Follow the steps in order
3. Pause at the checkpoint
4. Answer the reflection questions before moving on

This session uses a brand-new Python repo created during class.
You will work in pairs, and both students will use the same GitHub repository.

---

# Section 1 — Create a new local repo and publish it

## Goal
Create a new local Git repo, publish it to GitHub, and connect both partners to the same remote.

## What you are learning
- local vs remote repository
- what `origin` means
- how the first push works
- how a collaborator joins the same repo

## Part A — Student A creates the project and GitHub repo

### Step 1 — Create a new project folder
```bash
mkdir session2-collab
cd session2-collab
```

### Step 2 — Create `app.py`
Create `app.py` with this content:
```python
print("Hello from Session 2")
```

### Step 3 — Initialize Git
```bash
git init
git branch -M main
```

### Step 4 — Make the first commit
```bash
git add app.py
git commit -m "feat: start Session 2 app"
```

### Step 5 — Create an empty GitHub repository
On GitHub:
- create a new repository
- do not initialize it with a README
- copy the repository URL

### Step 6 — Add the remote
Replace the URL below with your own:
```bash
git remote add origin https://github.com/YOU/session2-collab.git
git remote -v
```

### Step 7 — If you are using HTTPS, authenticate Git first
Use GitHub CLI so Git can push over HTTPS.

**Windows PowerShell**
If `gh` is not installed:
```powershell
winget install GitHub.cli
```
If PowerShell still cannot find `gh` in the current window:
```powershell
$env:Path += ";C:\Program Files\GitHub CLI"
```
Then run:
```powershell
gh auth login
```

**macOS**
If needed:
```bash
brew install gh
```
Then run:
```bash
gh auth login
```

**Linux**
If needed:
```bash
sudo apt install gh
```
Then run:
```bash
gh auth login
```

When `gh auth login` asks questions, choose:
- `GitHub.com`
- `HTTPS`
- `Login with a web browser`
- `Yes` when it asks to authenticate Git with your GitHub credentials

### Step 8 — Push `main`
```bash
git push -u origin main
```

### Step 9 — Invite Student B as a collaborator
On GitHub:
- open repository settings
- go to collaborators
- invite your partner

## Part B — Student B joins the shared repo

### Step 10 — Accept the collaborator invite
On GitHub:
- accept the invitation from Student A

### Step 11 — Clone the shared repo
Student B runs:
```bash
git clone https://github.com/YOU/session2-collab.git
cd session2-collab
```

### Step 12 — Verify both students are on `main`
Both students run:
```bash
git branch
git remote -v
```

## Checkpoint
You should now have:
- one shared GitHub repository
- two local clones, one on each machine
- `main` connected to `origin/main`

## Reflection questions
- What existed before the GitHub repo was created?
- What did the first push change?
- Why did Student B clone instead of copying the folder manually?

---

# Section 2 — Remote basics in the shared repo

## Goal
Understand what `push`, `fetch`, and `pull` each do.

## What you are learning
- how one partner publishes changes
- how the other partner downloads updates safely
- why `fetch` and `pull` are not the same

## Part A — Student A pushes, Student B fetches and pulls

### Step 1 — Student A edits `app.py`
Student A changes `app.py` to:
```python
print("Hello from Student A")
```

Then Student A runs:
```bash
git add app.py
git commit -m "feat: update greeting from Student A"
git push
```

### Step 2 — Student B fetches remote updates
Student B runs:
```bash
git fetch
```

### Step 3 — Student B inspects the remote-tracking branch
Student B runs:
```bash
git log --oneline origin/main -3
```

### Step 4 — Student B pulls the change
Student B runs:
```bash
git pull
```

## Part B — Reverse roles

### Step 5 — Student B edits `app.py`
Student B changes `app.py` to:
```python
print("Hello from Student B")
```

Then Student B runs:
```bash
git add app.py
git commit -m "feat: update greeting from Student B"
git push
```

### Step 6 — Student A fetches and pulls
Student A runs:
```bash
git fetch
git log --oneline origin/main -3
git pull
```

## Checkpoint
Both students should now have:
- the same content in `app.py`
- the same recent commits on `main`
- a clear difference between `fetch` and `pull`

## Reflection questions
- What changed after `git fetch`?
- What changed after `git pull`?
- Why is `fetch` the safer first step?

---

# Section 3 — Feature branch workflow and pull requests

## Goal
Practice the normal team workflow using feature branches and pull requests.

## What you are learning
- why work starts on a branch
- how to push a feature branch
- how pull requests support review

## Part A — Student A creates a feature branch

### Step 1 — Create and switch to a branch
Student A runs:
```bash
git switch -c feature/greeting-a
```

### Step 2 — Add a small function
Student A changes `app.py` to:
```python
def greet(name):
    return f"Hello, {name}"


print(greet("Student A"))
```

### Step 3 — Commit and push the branch
```bash
git add app.py
git commit -m "feat: add greeting function"
git push -u origin feature/greeting-a
```

### Step 4 — Open a pull request
On GitHub:
- open a PR from `feature/greeting-a` into `main`

### Step 5 — Student B reviews the PR and leaves a comment
Student B:
- reads the diff
- leaves one comment or suggestion on the PR

### Step 6 — Student A updates the same PR
Student A reads the comment, then makes a tiny follow-up change on the same branch.

Example:
```python
def greet(name):
    return f"Hello there, {name}"


print(greet("Student A"))
```

Then:
```bash
git add app.py
git commit -m "refactor: refine greeting message"
git push
```

### Step 7 — Student B checks the same PR again
On GitHub:
- return to the same PR
- notice the new commit is now attached to that PR
- review the updated diff and confirm the change is visible there

### Step 8 — Merge with squash
On GitHub:
- merge the PR with squash

## Part B — Student B repeats the workflow

### Step 9 — Sync `main`
Both students run:
```bash
git switch main
git pull
```

### Step 10 — Student B creates a branch
Student B runs:
```bash
git switch -c feature/greeting-b
```

### Step 11 — Student B makes a small change
Student B updates the printed name or message in `app.py`, then runs:
```bash
git add app.py
git commit -m "feat: personalize greeting output"
git push -u origin feature/greeting-b
```

### Step 12 — Repeat the same review loop with roles reversed
This time:
- Student A opens the PR review and leaves a comment
- Student B updates the same PR with another commit
- Student A returns to that same PR and sees the new changes there
- then Student B merges it

## Checkpoint
You should now have:
- at least two merged pull requests
- branch names that describe the work
- experience reviewing a teammate's change
- experience seeing new commits appear on the same PR

## Reflection questions
- Why work on a branch instead of directly on `main`?
- What did the pull request add to the workflow?
- Why did the updated code appear on the same PR instead of a new PR?
- Why was a second commit on the PR normal?

---

# Section 4 — Conflict simulation, round 1

## Goal
Student B experiences a rejected push and resolves a real conflict.

## What you are learning
- why a push gets rejected
- how to read conflict markers
- how to decide the final code manually

### Step 1 — Sync both students to the latest `main`
Both students run:
```bash
git switch main
git pull --no-rebase
```

### Step 2 — Both students edit the same line
Both students change `app.py` so the final print line is different.

Student A uses:
```python
def greet(name):
    return f"Hello there, {name}"


print("Message from Student A")
```

Student B uses:
```python
def greet(name):
    return f"Hello there, {name}"


print("Message from Student B")
```

### Step 3 — Student A commits and pushes first
Student A runs:
```bash
git add app.py
git commit -m "feat: update shared message from A"
git push
```

### Step 4 — Student B commits and tries to push
Student B runs:
```bash
git add app.py
git commit -m "feat: update shared message from B"
git push
```

Student B should see a rejection.

### Step 5 — Student B pulls and gets a conflict
Student B runs:
```bash
git pull --no-rebase
```

We use `--no-rebase` here so Git shows the merge-based conflict flow we are practicing.

Open `app.py`.
You should see conflict markers.

### Step 6 — Student B resolves the conflict
Edit `app.py` so it contains one final version with no markers.

Example:
```python
def greet(name):
    return f"Hello there, {name}"


print("Message from Student A and Student B")
```

### Step 7 — Student B commits and pushes the resolution
```bash
git add app.py
git commit -m "fix: resolve conflict between A and B messages"
git push
```

## Checkpoint
Student B should now have:
- one rejected push
- one resolved conflict
- one successful push after resolution

## Reflection questions
- Why did Git reject the push?
- What were the conflict markers showing?
- How did you decide the final code?

---

# Section 5 — Conflict simulation, round 2

## Goal
Student A now experiences the same rejection and resolution flow.

## What you are learning
- how repeated conflict resolution becomes more manageable
- why both collaborators need hands-on practice

### Step 1 — Sync both students again
Both students run:
```bash
git switch main
git pull --no-rebase
```

### Step 2 — Both students edit the same function differently
Both students edit the same return line in `greet`.

Student A uses:
```python
def greet(name):
    return f"Hello from A, {name}"


print("Message from Student A and Student B")
```

Student B uses:
```python
def greet(name):
    return f"Hello from B, {name}"


print("Message from Student A and Student B")
```

### Step 3 — Student B pushes first
Student B runs:
```bash
git add app.py
git commit -m "refactor: update greet from B"
git push
```

### Step 4 — Student A commits and hits the rejection
Student A runs:
```bash
git add app.py
git commit -m "refactor: update greet from A"
git push
```

### Step 5 — Student A pulls, resolves, and pushes
Student A runs:
```bash
git pull --no-rebase
```

Again, we use `--no-rebase` so the conflict appears in the same merge-based workflow.

Edit `app.py` to keep one final version.

Example:
```python
def greet(name):
    return f"Hello from the team, {name}"


print("Message from Student A and Student B")
```

Then:
```bash
git add app.py
git commit -m "fix: resolve greet conflict"
git push
```

## Checkpoint
Both students should now have personally:
- hit a rejected push
- opened a conflicted file
- resolved the conflict
- pushed the final result

## Reflection questions
- What felt easier the second time?
- What should you do now if your push is rejected?
- Why is conflict a normal collaboration event?

---

# Section 6 — Reading history and context switching

## Goal
Use Git to understand changes and safely switch to an urgent fix.

## What you are learning
- how to inspect history
- how to answer who changed what
- how `git stash` helps during interruption

## Part A — Read the history

### Step 1 — View the commit graph
Both students run:
```bash
git log --oneline --graph --all --decorate
```

### Step 2 — View history for `app.py`
```bash
git log -- app.py
```

### Step 3 — Inspect one specific commit
Replace `<hash>` with a real commit hash from your log:
```bash
git show <hash>
```

### Step 4 — See who last changed each line
```bash
git blame app.py
```

Pause and answer:
- who changed the `greet` function
- which commit added the current print line

## Part B — Context switch with stash

### Step 5 — Start a feature branch
```bash
git switch -c feature/search
```

### Step 6 — Make an unfinished change
Change `app.py` to:
```python
def greet(name):
    return f"Hello from the team, {name}"


def search():
    return "searching..."


print("Message from Student A and Student B")
```

Do not commit yet.

### Step 7 — Stash the unfinished work
```bash
git stash
```

### Step 8 — Switch to `main` and create a fix branch
```bash
git switch main
git pull
git switch -c fix/bug
```

### Step 9 — Apply the bug fix
Change `app.py` to:
```python
def greet(name):
    return f"Hello from the team, {name}"


print("Fixed bug")
```

Then run:
```bash
git add app.py
git commit -m "fix: update app output"
git switch main
git merge fix/bug
```

### Step 10 — Return to the feature and restore the stash
```bash
git switch feature/search
git stash pop
```

### Step 11 — Commit the restored feature work
After `git stash pop`, your unfinished feature work is back in `app.py`.

Run:
```bash
git add app.py
git commit -m "feat: start search feature"
```

### Step 12 — Sync the feature branch with updated `main`
```bash
git merge main
```

If Git reports a conflict, open `app.py`, choose the final combined version you want, then run:
```bash
git add app.py
git commit -m "merge: resolve feature/search with updated main"
```

### Step 13 — Inspect the final result
```bash
git status
git log --oneline --graph --all --decorate
```

## Checkpoint
You should now have:
- used history to inspect earlier work
- stashed unfinished work
- switched to a bugfix
- returned to the feature safely

## Reflection questions
- What question did `git blame` answer?
- Why use `git stash` instead of committing unfinished work?
- Why did you need to commit after `git stash pop` before merging `main`?
- Why might `git merge main` still create a conflict after that?
- Why did `feature/search` need to sync with `main`?

---

# Section 7 — Bonus lab: CI with GitHub Actions

## Goal
See how GitHub can run automated checks on shared code.

## What you are learning
- what CI does
- how checks appear on GitHub
- why teams like automated safety checks

### Step 1 — Create the workflow file
Create `.github/workflows/ci.yml` with this content:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.x'
      - run: python app.py
```

### Step 2 — Commit and push the workflow
```bash
git add .github/workflows/ci.yml
git commit -m "ci: add basic Python workflow"
git push
```

### Step 3 — Check GitHub Actions
On GitHub:
- open the Actions tab
- wait for the workflow to pass

### Step 4 — Break the code on a branch
Create a branch and break `app.py`.

Example:
```python
print("broken"
```

Then:
```bash
git switch -c test/ci-failure
git add app.py
git commit -m "test: trigger CI failure"
git push -u origin test/ci-failure
```

Open a PR and observe the failing check.

### Step 5 — Fix the code and push again
Restore valid Python, then:
```bash
git add app.py
git commit -m "fix: restore valid Python syntax"
git push
```

Observe the check turn green.

## Checkpoint
If you completed this section, you have now seen:
- one passing CI run
- one failing CI run
- one fixed CI run

## Reflection questions
- What was GitHub checking for you?
- Why is CI useful on pull requests?
- Why does passing CI still not replace human review?
