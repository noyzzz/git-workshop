# Git Workshop — Session 2 Slides

## Slide 1 — Title
**Git Workshop: Session 2 — Working With Others Safely**

- Focus: collaboration workflow, not just commands
- Today: create a new repo, share it, and work in it together

---

## Slide 2 — Quick recap
**What we already know from Session 1**

- local repository
- commits
- branches
- merges
- conflicts

Transition:
- last time Git protected your own work
- today Git protects shared work

---

## Slide 3 — New problem
**What changes when another person joins?**

Now we need to:
- share a project
- publish changes
- inspect incoming work
- avoid overwriting each other
- review before merging

Question:
- what could go wrong if both people just keep pushing to `main`?

---

## Slide 4 — Why a new repo?
**Start clean for collaboration**

- new project
- new GitHub repo
- one shared remote per pair

Reason:
- the lesson is remote collaboration, not continuing old local history

---

## Slide 5 — Local vs remote
**Git is local. GitHub is shared.**

Your machine:
- local repository

GitHub:
- remote repository

Important:
- Git and GitHub are not the same thing
- `origin` is just the name of a remote

---

## Slide 6 — First publish
**How a local repo becomes shared**

Flow:
- create local repo
- commit `app.py`
- create empty GitHub repo
- add `origin`
- authenticate Git for HTTPS
- push `main`
- invite partner
- partner clones

Question:
- what existed before the first push?

---

## Slide 7 — HTTPS authentication
**What do students use to log in?**

- recommended: `gh auth login`

Class default:
- `GitHub.com`
- `HTTPS`
- browser login
- authenticate Git when prompted

---

## Slide 8 — Remote operations
**Push, fetch, pull**

- `git push` = upload local commits
- `git fetch` = download remote updates only
- `git pull` = fetch + integrate

Key idea:
- `fetch` is the safe inspection step

---

## Slide 9 — Remote-tracking branches
**`main` is not `origin/main`**

- `main` = your local branch
- `origin/main` = your latest known view of the remote branch

Important:
- fetch updates `origin/main`
- pull updates local `main`

---

## Slide 10 — Team-safe workflow
**Feature branches and pull requests**

Safer pattern:
- create a branch
- make the change
- push branch
- open PR
- review
- merge into `main`

Key idea:
- PR = communication, not just a button

---

## Slide 11 — Why PRs matter
**What pull requests add**

- visible diff
- discussion
- iterative commits
- review before merge
- safer `main`

Question:
- why not just push every change directly to `main`?

---

## Slide 12 — Push rejection
**When Git says no**

A rejected push usually means:
- someone else updated the remote first
- your local branch is behind

Important:
- Git is protecting shared work
- rejection is not failure

---

## Slide 13 — Conflict meaning
**What a conflict really is**

A conflict means:
- both versions matter
- Git cannot choose the final code alone

Key idea:
- conflict = ambiguity
- human decides the result

---

## Slide 14 — Conflict markers
**How Git shows the problem**

Example:
```text
<<<<<<< HEAD
print("Message from Student A")
=======
print("Message from Student B")
>>>>>>> incoming change
```

Your job:
- choose the final version
- remove markers
- commit the resolution

---

## Slide 15 — Reading history
**Git is also for understanding**

Useful questions:
- who changed this line?
- when did it change?
- which commit introduced it?

Commands:
- `git log --oneline --graph`
- `git log -- app.py`
- `git show <hash>`
- `git blame app.py`

---

## Slide 16 — Context switching
**What if a bug interrupts your feature?**

Flow:
- start a feature
- leave work uncommitted
- `git stash`
- switch to fix branch
- merge the fix
- return to feature
- `git stash pop`
- sync with `main`

Key idea:
- Git helps you pause safely

---

## Slide 17 — Bonus safety layer
**CI with GitHub Actions**

If time allows:
- run `python app.py` automatically
- see one passing check
- see one failing check

Important:
- CI adds safety
- CI does not replace human review

---

## Slide 18 — Session summary
By the end of Session 2, students should be able to say:

- I can create and publish a repo to GitHub
- I understand `push`, `fetch`, and `pull`
- I can collaborate using branches and pull requests
- I can resolve conflicts safely
- I can inspect history to understand team changes
- I can switch tasks without losing work
