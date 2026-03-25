# Git Workshop — Session 1 Slides

## Slide 1 — Title
**Git Workshop: Session 1 — Understanding Git Before GitHub**

- Focus: understanding Git deeply, not memorizing commands
- Today: local Git first, GitHub only at the end

---

## Slide 2 — Start with the problem
**Imagine you are building a game**

Day 1:
- You create the basic movement system
- It works

Day 2:
- You add enemies
- Something breaks

Question for the room:
- How would you go back to the working version?

---

## Slide 3 — What people do without Git
**Naive solutions**

- Copy the folder
- Rename files
- Save backups manually

Examples:
- `game_v1`
- `game_v2`
- `game_final`
- `game_final_REAL`
- `game_final_REAL2`

Question:
- What problems do you see with this?

---

## Slide 4 — The real problems
**What do we actually need?**

We need a system that lets us:

- save project history
- go back to earlier working states
- try risky changes safely
- work on separate ideas without breaking stable work
- collaborate without chaos

---

## Slide 5 — Now introduce Git
**Git is a version control system**

Git helps manage the history of a project.

Core idea:

> Git stores a snapshot of the entire project at each commit, while internally reusing unchanged data to remain efficient.

---

## Slide 6 — The core mental model
**Three areas**

`Working Directory → Staging Area → Repository`

- **Working Directory**: your files right now
- **Staging Area**: what you choose for the next commit
- **Repository**: saved commit history

Important:
- not every edit becomes a commit
- you choose what goes into the next snapshot

---

## Slide 7 — Repository and commit
**What is a repository?**
- a project tracked by Git
- contains a hidden `.git` directory

**What is a commit?**
- a saved snapshot of the project
- includes a message
- becomes part of project history

---

## Slide 8 — File states
**Basic file lifecycle**

`Untracked → Staged → Committed`

Explain:
- Untracked: Git sees the file for the first time
- Staged: selected for next commit
- Committed: saved in repository history

---

## Slide 9 — Before Lab 1
**What students should watch for**

While doing the lab, keep asking:

- What is in the working directory?
- What is staged?
- What is already committed?

---

## Slide 10 — Before Lab 2
**Git tracks changes between states**

Two important comparisons:

- `git diff` → working directory vs staging area
- `git diff --staged` → staging area vs last commit

Key idea:
- Git compares states, not just filenames

---

## Slide 11 — Before Lab 3
**Branching mental model**

Commit chain:

`A → B → C`

A branch is a **pointer** to a commit.

Example:

- `main → C`

Creating a branch does not copy the whole project.
It creates another pointer.

---

## Slide 12 — HEAD
**What is HEAD?**

HEAD tells Git:
- where you currently are
- which branch / commit you are working on

When you switch branches:
- HEAD moves
- your working files update to match that branch

---

## Slide 13 — Before Lab 4
**What is a merge?**

A merge combines histories.

Two cases:

### Fast-forward
`main: A → B`
`feature: A → B → C`

Result:
`main: A → B → C`

### Diverged history
`main:    A → B → D`
`feature: A → B → C`

Now Git must combine both lines of development.

---

## Slide 14 — Merge conflicts
**Why conflicts happen**

A conflict happens when:
- the same part of the project was changed differently
- Git cannot decide which version you want

Conflict markers show:
- current branch version
- incoming branch version

Developer must choose and resolve

---

## Slide 15 — Before Lab 5
**Undoing: separate safe from risky**

### Safer operations
- `git restore file`
- `git restore --staged file`

### More dangerous operations
- `git reset`
- `git reset --hard`

Key point:
- not all undo commands behave the same way

---

## Slide 16 — Recovery concept
**Most mistakes are recoverable**

Important message:
- Git is usually safer than beginners think
- but recovery tools should be used deliberately

Instructor note:
- reflog will be demoed, not practiced

---

## Slide 17 — Before Lab 6
**Local vs remote**

Your laptop:
- local repository

GitHub:
- remote repository

Common names:
- `main` = local branch
- `origin/main` = remote-tracking branch

---

## Slide 18 — Fetch, pull, push
**Basic remote operations**

- `push` = upload local commits
- `fetch` = download remote updates only
- `pull` = fetch + integrate

Important:
- `fetch` is safer to inspect first
- `pull` changes your local branch

---

## Slide 19 — Session summary
By the end of Session 1, students should understand:

- commit = snapshot of project
- staging = selecting what goes into the next snapshot
- branch = pointer to a commit
- merge = combining histories
- local vs remote basics

---

## Slide 20 — Transition to hands-on
**During the labs, focus on meaning**

Do not just run commands.
For every command, ask:

- What changed?
- In which area did it change?
- Why are we doing this now?
