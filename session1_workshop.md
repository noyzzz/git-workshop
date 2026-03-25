# Git Workshop — Session 1 Runbook

## Session goal

Students should leave with a real mental model of Git, not just a list of commands.

The four ideas that matter most:

1. A commit is a snapshot of the project
2. Staging is choosing what goes into the next snapshot
3. A branch is a pointer to a commit
4. A merge combines histories

---

## Overall flow

- Slides: 15 minutes
- Hands-on Labs 1–6
- Reflog: instructor demo only, not student exercise
- Keep one continuous project story where possible

---

# Part 1 — Opening slides (about 15 min)

## Objective
Create the need for Git before naming the tool.

## Instructor flow

### 1. Start with a realistic scenario
Say something like:

> Imagine we are building a game. On day 1 we create a feature and it works. On day 2 we add something new and break the old feature. How do we go back?

Pause and get answers.

Expected student answers:
- copy folders
- rename files
- keep backups
- undo manually

### 2. Show why the naive approach fails
Discuss problems:
- hard to know which version is correct
- difficult to experiment safely
- collaboration becomes messy
- manual backup systems do not scale

### 3. Introduce the requirements
Say:

> We need a system that can save history, let us go back, support experimentation, and help multiple people work on the same project.

### 4. Introduce Git
Use the more accurate phrasing:

> Git stores a snapshot of the entire project at each commit, while internally reusing unchanged data to remain efficient.

### 5. Introduce the three-area model
Draw and explain:

`Working Directory → Staging Area → Repository`

Do not move on until this is clear.

---

# Part 2 — Lab 1: First repository

## Concepts to explain before starting
- repository
- `.git`
- commit
- staging
- untracked / staged / committed

## Learning objective
Students understand the path:
`edit → stage → commit`

## Suggested steps
1. Create a project folder
2. Run `git init`
3. Create a few files
4. Run `git status`
5. Stage only one file
6. Commit it
7. Repeat with other files as separate logical commits

## What to emphasize
- selective staging
- commit messages should describe intent
- not every change should be committed together

## Questions to ask
- Why did we stage only one file?
- What is the difference between creating a file and committing it?
- What does `git status` tell us?

## Common confusion
- students think `git init` uploads something somewhere
- students think `git add` means “save forever”
- students confuse staging with committing

## Success criteria
Students can explain:
- what `.git` is
- what staging does
- what a commit represents

---

# Part 3 — Lab 2: Modify files and inspect changes

## Concepts to explain before starting
- Git tracks differences between states
- `git diff`
- `git diff --staged`

## Learning objective
Students understand the difference between:
- working directory changes
- staged changes
- committed history

## Suggested steps
1. Edit a tracked file
2. Run `git diff`
3. Stage the file
4. Run `git diff` again
5. Run `git diff --staged`
6. Commit the change

## What to emphasize
- `git diff` changes meaning depending on state
- Git compares areas, not just files

## Questions to ask
- Why did `git diff` change after staging?
- What exactly is being compared by `git diff --staged`?

## Common confusion
- students expect `git diff` to always show everything
- students do not realize staging changes what is being compared

## Success criteria
Students can say:
- what `git diff` shows
- what `git diff --staged` shows

---

# Part 4 — Lab 3: Branching

## Concepts to explain before starting
- commit graph
- branch as pointer
- HEAD
- switching branches updates working files

## Learning objective
Students understand that a branch is not a copied folder.

## Suggested steps
1. Show small commit graph on slides or whiteboard
2. Create a branch with `git switch -c`
3. Add a new file and commit on that branch
4. Switch back to `main`
5. Observe that the branch-specific file disappears
6. Switch again and confirm it returns

## What to emphasize
- branch = pointer to a commit
- HEAD indicates where you currently are
- switching branches changes visible files because Git checks out a different snapshot

## Questions to ask
- Did we duplicate the whole repository?
- Why did the file disappear when we switched back?
- Where is that work stored now?

## Common confusion
- students think branches are folders
- students think deleted-looking files are “lost”

## Success criteria
Students can explain:
- what a branch is
- what HEAD is in simple terms
- why branch-specific files appear and disappear

---

# Part 5 — Lab 4: Merge and conflict

## Concepts to explain before starting
- merge
- fast-forward
- diverged histories
- conflict conditions

## Learning objective
Students understand what Git is doing during a merge and why conflicts happen.

## Suggested steps
1. Start with a clean merge example
2. Merge a branch that can be fast-forwarded
3. Show the result in the log graph
4. Then create a deliberate conflict by editing the same line differently on two branches
5. Attempt merge
6. Open the conflicted file
7. Explain conflict markers
8. Resolve and complete merge

## What to emphasize
- fast-forward is just moving a pointer
- a real merge combines histories
- conflict does not mean Git failed; it means Git needs human intent

## Questions to ask
- Why was the first merge easy?
- Why could Git not decide during the conflict?
- What do the conflict markers represent?

## Common confusion
- students think merge always creates a merge commit
- students panic when they see conflict markers

## Success criteria
Students can explain:
- what a fast-forward merge is
- why conflicts happen
- how conflict markers are interpreted

---

# Part 6 — Lab 5: Undoing things

## Concepts to explain before starting
Separate undo into categories.

### Category A — safer
- `git restore file`
- `git restore --staged file`

### Category B — more dangerous
- `git reset`
- mention `--hard` carefully

## Learning objective
Students understand that “undo” in Git is not one thing.

## Suggested steps
1. Make an unstaged edit
2. Use `git restore file`
3. Make another edit
4. Stage it
5. Use `git restore --staged file`
6. Show a simple `git reset HEAD~1` example
7. Keep reflog as instructor demo only

## What to emphasize
- restoring a file affects working directory
- restoring with `--staged` affects staging area
- reset moves history references

## Questions to ask
- Which area changed when we used `git restore file`?
- Which area changed when we used `git restore --staged`?
- Why is `git reset` more powerful and more dangerous?

## Common confusion
- students assume all undo commands are equivalent
- students use “delete” language instead of “move branch pointer” or “remove from stage”

## Success criteria
Students can distinguish:
- undo working changes
- undo staging
- undo commits

---

# Part 7 — Reflog demo only

## Why demo only
At this stage, reflog is better shown as recovery from a failure scenario rather than treated as a normal workflow command.

## Demo structure
1. Make an important commit
2. Run a destructive reset
3. Show that normal log no longer shows the commit
4. Introduce `git reflog`
5. Recover the commit by hash or create a recovery branch

## Message to students
- Git mistakes are often recoverable
- but recovery tools are not daily workflow tools

---

# Part 8 — Lab 6: First remote / GitHub

## Concepts to explain before starting
- local repository
- remote repository
- `origin`
- local branch vs remote-tracking branch
- `push`, `fetch`, `pull`

## Learning objective
Students understand the relationship between local Git and GitHub.

## Suggested steps
1. Create a repository on GitHub
2. Add it as `origin`
3. Verify with `git remote -v`
4. Push local `main`
5. Make a change on GitHub directly
6. Run `git fetch`
7. Inspect `origin/main`
8. Run `git pull`

## What to emphasize
- `push` uploads commits
- `fetch` downloads remote updates without integrating them
- `pull` changes local history because it integrates

## Questions to ask
- What does `fetch` do that `pull` does not?
- Why might `fetch` be safer as a first step?
- What is the difference between `main` and `origin/main`?

## Common confusion
- students think GitHub and Git are the same thing
- students think `origin/main` is just another local branch
- students use pull without understanding integration

## Success criteria
Students can explain:
- local vs remote
- fetch vs pull vs push
- why `origin/main` exists

---

# Suggested timing

## Slides
- 15 min

## Labs
- Lab 1: 20 min
- Lab 2: 15 min
- Lab 3: 20 min
- Lab 4: 25 min
- Lab 5: 20 min
- Reflog demo: 5–8 min
- Lab 6: 20 min

Adjust in real time based on questions.
If time gets tight:
- shorten Lab 5 hands-on
- keep reflog demo brief
- preserve Lab 1, 3, 4, and 6

---

# Instructor principles during the session

## 1. Always concept before command
Do not introduce commands before the underlying idea.

## 2. Keep asking “which area changed?”
This reinforces the three-area model constantly.

## 3. Use one story project
Do not let the labs feel disconnected.

## 4. Prefer understanding over coverage
If students truly understand commits, staging, branches, and merge, the session succeeded.

## 5. Normalize confusion around merge
Students often feel merge conflicts mean disaster. Show that they are normal.

---

# End-of-session summary

By the end of Session 1, students should be able to say:

- Git stores project snapshots as commits
- Staging selects what goes into the next commit
- Branches are pointers to commits
- Merging combines histories
- GitHub is a remote, not Git itself
