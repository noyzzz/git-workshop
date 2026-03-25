# Git Workshop — Session 1 Instructor Support Guide

## How to use this guide

This file is not a script to read word-for-word. It is a support document for each section with:

- concept goals
- key messages
- common mistakes
- questions to ask
- what to demo slowly
- when to pause

The main rule for the session:

> Always explain the concept before the command.

---

# Section 1 — First repository

## Concept goal
Students must understand:
- repository
- staging
- commit
- file states

## Core messages
- A Git repository is a project tracked by Git
- `.git` stores Git metadata and history
- A commit is a snapshot of the project
- Staging is choosing what goes into the next commit

Use this phrasing:
> Git stores a snapshot of the entire project at each commit, while internally reusing unchanged data to remain efficient.

## What to emphasize
- `git init` creates local tracking, not a GitHub repo
- `git add` prepares content for the next commit
- `git commit` saves a snapshot into repository history

## Good questions to ask
- What changed after `git init`?
- What is the difference between untracked and staged?
- Why stage only one file first?

## Common mistakes
- students think `git init` uploads something
- students think `git add` is the same as commit
- students assume all current files automatically become part of a commit

## What to watch for
- some machines may default to a branch name warning; do not let that derail the flow
- if commit fails due to missing username/email, fix that once for the group

## Pause point
Before the first commit, ask:
- what exactly is about to be saved?
- which files are included, and which are not?

---

# Section 2 — Inspect changes with diff

## Concept goal
Students must understand that Git compares states.

## Core messages
- `git diff` compares working directory to staging area
- `git diff --staged` compares staging area to last commit
- staging changes what Git compares

## What to emphasize
- the same file can exist in different states across Git’s areas
- `git diff` is not “show all changes everywhere”

## Good questions to ask
- Why did `git diff` show output before staging?
- Why did it stop showing output after staging?
- What is `git diff --staged` now showing?

## Common mistakes
- students expect `git diff` to always show the edited file
- students forget which area they are looking at

## What to demo slowly
Run:
1. `git diff`
2. `git add file`
3. `git diff`
4. `git diff --staged`

Do not rush. This is where many mental models lock in.

## Pause point
Ask:
- which area changed when we staged the file?

---

# Section 3 — Branching

## Concept goal
Students must understand that a branch is a pointer to a commit, not a folder.

## Core messages
- a branch is a reference to a commit
- HEAD tells Git where the user currently is
- switching branches updates the working directory to match that branch’s snapshot

## What to emphasize
Draw a tiny commit graph before typing commands.

Example:
`A → B → C`
`main → C`

Then:
`feature/header → C`

After a commit:
`feature/header → D`

## Good questions to ask
- Did Git duplicate the whole repository here?
- Why did `header.html` disappear after switching back to `main`?
- Is the file lost?

## Common mistakes
- students think branches are copies of folders
- students panic when files “disappear” after switching
- students confuse HEAD with the current file system state only

## What to watch for
If students have uncommitted changes and try switching, Git may block the switch. If that happens, use it as a teaching moment:
- Git protects them from overwriting uncommitted work

## Pause point
Before switching back to main, ask students to predict what will happen to the new file.

---

# Section 4 — Merge and conflict

## Concept goal
Students must understand:
- fast-forward merge
- non-fast-forward merge
- conflict conditions
- conflict markers

## Core messages
- a fast-forward merge just moves a branch pointer
- a real merge combines histories
- conflicts happen when Git cannot decide between competing changes

## What to emphasize
Use two separate examples:
1. clean merge
2. deliberate conflict

Do not combine explanation too quickly.

## Good questions to ask
- Why did the first merge not create a separate merge commit?
- What condition created the conflict?
- What do `HEAD` and the incoming branch represent in the conflict markers?

## Common mistakes
- students think all merges create merge commits
- students think conflict means the repository is broken
- students delete the wrong lines or leave markers behind

## What to demo slowly
When showing the conflicted file, point to:
- current branch block
- separator
- incoming branch block

Make them state which side is which before resolving.

## What to watch for
After resolving, students may forget:
- `git add app.js`
- `git merge --continue`

## Pause point
Before opening the file, ask:
- what do you expect Git put inside the file?

---

# Section 5 — Undoing things

## Concept goal
Students must separate kinds of undo instead of treating “undo” as one operation.

## Core messages
- `git restore file` affects working directory changes
- `git restore --staged file` affects staging area
- `git reset HEAD~1` moves the current branch pointer backward

## What to emphasize
Use the three-area model constantly:
- Which area changed?
- Which area did not change?

## Good questions to ask
- Which area did `git restore README.md` affect?
- Why does `git restore --staged` keep the content but remove it from staging?
- Why is `git reset` conceptually different?

## Common mistakes
- students think restore and reset are interchangeable
- students use “delete” language even when the change still exists somewhere
- students think reset destroys data immediately in all cases

## What to demo slowly
For `git reset HEAD~1`:
- show the commit exists
- run reset
- show the commit disappears from `git log`
- show the file changes remain in status

## Important boundary
Do not make `reflog` a normal student task here.
Keep it as:
- reassurance
- short recovery demo

## Pause point
After each undo command, ask:
- what changed?
- in which Git area did it change?

---

# Section 6 — GitHub and remotes

## Concept goal
Students must understand local vs remote clearly.

## Core messages
- Git and GitHub are not the same thing
- local branch and remote-tracking branch are different
- `push` uploads local commits
- `fetch` downloads remote updates only
- `pull` downloads and integrates

## What to emphasize
Use simple language:
- local repo = on your machine
- remote repo = on GitHub
- `origin` is just a name for the remote

## Good questions to ask
- What is the difference between `main` and `origin/main`?
- Why is `fetch` often safer before `pull`?
- What does `-u` do when pushing for the first time?

## Common mistakes
- students think GitHub is required for Git
- students think `origin/main` is their current branch
- students do not understand that `pull` changes local history

## What to watch for
Authentication issues may slow the section down. Be ready for:
- HTTPS sign-in prompts
- SSH not being configured
- personal access token confusion

If that happens, keep the conceptual explanation moving while helping students in parallel.

## What to demo slowly
After `git fetch`, explicitly compare:
- `git log --oneline main`
- `git log --oneline origin/main`

This helps students see the difference.

## Pause point
Before `git pull`, ask:
- what do you think will happen to local `main`?

---

# Reflog demo support

## Purpose
This is not a workflow skill for today. It is a confidence-building recovery demo.

## Demo sequence
1. Create an “important” commit
2. Run a destructive reset
3. Show that `git log` no longer displays the commit
4. Run `git reflog`
5. Recover the commit

## Key message
- Git often remembers more than students expect
- mistakes are often recoverable
- recovery tools should be used deliberately

## Do not over-explain
Avoid deep internals here unless students ask.
The point is reassurance, not mastery.

---

# Time management notes

## Protect these sections
If time gets tight, preserve depth in:
1. Section 1
2. Section 3
3. Section 4
4. Section 6

These carry the core mental model.

## What can be compressed
- shorten Section 5 hands-on
- keep reflog as a 3–5 minute demo
- reduce open-ended discussion if the room is behind

---

# Red flags during the session

Watch for these phrases from students:

- “So staging is basically saving, right?”
- “Branches are like folders?”
- “Why did my file disappear?”
- “Did merge break everything?”
- “Is GitHub the same as Git?”

These indicate the exact conceptual gaps you need to correct.

---

# End-of-session instructor check

Before ending, ask students to explain in their own words:

- what a commit is
- what staging is
- what a branch is
- what a merge does
- what `fetch`, `pull`, and `push` do

If they can answer those clearly, the session worked.
