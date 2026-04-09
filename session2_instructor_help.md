# Git Workshop — Session 2 Instructor Support Guide

## How to use this guide

This file is a support document for each section with:

- concept goals
- key messages
- common mistakes
- questions to ask
- what to demo slowly
- when to pause

The main rule for the session:

> Always explain the collaboration problem before the command.

---

# Section 1 — Recap and shift to remotes

## Concept goal
Students must understand that Session 2 is about shared workflow, not more local Git mechanics.

## Core messages
- Session 1 was about your own history
- Session 2 is about shared repositories
- we are starting a new repo on purpose

## What to emphasize
- do not get pulled into re-teaching merge
- the project is new, but the Git ideas build on Session 1
- both students will actively collaborate, not just watch

## Good questions to ask
- What was Git protecting in Session 1?
- What new problem appears when two people share one repo?

## Common mistakes
- students think a new repo means “starting over”
- students expect today to be mostly GitHub clicks instead of Git workflow

## Pause point
Ask:
- what do we need from Git once another human is involved?

---

# Section 2 — Create a new local repo and publish it

## Concept goal
Students must understand how a local repo becomes a shared remote repo.

## Core messages
- local repo exists before GitHub
- GitHub is a hosting and collaboration layer
- `origin` is just the name of a remote
- pushing publishes existing commits
- for HTTPS, Git needs authentication and different machines may already have cached credentials

## What to emphasize
- create the first local commit before making the remote connection
- if needed, normalize the branch name with `git branch -M main`
- default to HTTPS for the workshop
- default to `gh auth login` as the easiest cross-platform setup
- invite collaborator before moving on

## Good questions to ask
- What existed after `git init` but before GitHub?
- What did `git push -u origin main` do?
- Why does Student B clone instead of copying files manually?

## Common mistakes
- students create the GitHub repo with an auto-generated README and accidentally create unrelated history
- students forget to accept the collaborator invite
- students copy the wrong repo URL
- students expect a GitHub password prompt, but in this workshop they should use GitHub CLI login instead
- Windows may need a fresh PowerShell session or a temporary PATH fix before `gh` works

## What to watch for
- Git identity may still be missing on some machines
- some students may have `master` instead of `main`
- invite emails may take a moment to arrive
- some students may already be authenticated, so push works without any prompt

## Recommended HTTPS auth flow for class
- Windows:
  - install with `winget install GitHub.cli` if needed
  - if `gh` is missing in the current PowerShell window, use `$env:Path += ";C:\Program Files\GitHub CLI"`
  - run `gh auth login`
- macOS:
  - install with `brew install gh` if needed
  - run `gh auth login`
- Linux:
  - install with `sudo apt install gh` if needed
  - run `gh auth login`

Use these answers in `gh auth login`:
- `GitHub.com`
- `HTTPS`
- `Login with a web browser`
- `Yes` to authenticate Git with GitHub credentials

## What to demo slowly
Show the difference between:
- local repo on disk
- empty GitHub repo in browser
- shared state after the first push
- one machine that is already authenticated vs one machine that still needs login

## Pause point
Before Student B clones, ask:
- why not just zip the folder or copy it on USB?

---

# Section 3 — Remote basics in the shared repo

## Concept goal
Students must separate `push`, `fetch`, and `pull`.

## Core messages
- `push` uploads your commits
- `fetch` downloads remote information only
- `pull` integrates remote changes into your local branch
- `origin/main` is a remote-tracking branch, not your working branch

## What to emphasize
- use fetch as the safe inspection step
- make one student push while the other stays still
- inspect before integrating

## Good questions to ask
- What changed after `git fetch`?
- Did the file change yet?
- What changed after `git pull`?

## Common mistakes
- students think fetch updates the working directory
- students skip inspection and go straight to pull
- students confuse `main` with `origin/main`

## What to demo slowly
Run:
1. Student A pushes
2. Student B runs `git fetch`
3. Student B inspects `git log --oneline origin/main`
4. Student B runs `git pull`

## Pause point
Ask:
- which command updated knowledge, and which command updated files?

---

# Section 4 — Feature branches and pull requests

## Concept goal
Students must understand the team-safe default workflow.

## Core messages
- do work on a branch, not on shared `main`
- PRs are for communication and review
- commits inside a PR can be iterative
- merge when the branch is ready

## What to emphasize
- each student should create a separate branch
- keep changes tiny so review stays readable
- do one follow-up commit after a reviewer comment so students can see the same PR update live

## Good questions to ask
- Why not commit directly to `main`?
- What does the PR add that a push alone does not?
- Why is squash merge often a reasonable default here?

## Common mistakes
- students push to `main` out of habit
- students think one PR must contain one perfect commit
- students merge before the partner has looked
- students think a new commit requires opening a new PR

## What to watch for
- GitHub UI can tempt students into merging too early
- some students may forget which branch they are on
- some students may not notice that GitHub automatically adds the new commit to the existing PR

## Pause point
Before opening the PR, ask:
- what are we asking the reviewer to understand?

---

# Section 5 — Conflict simulation, round 1

## Concept goal
Students must experience that a rejected push is protective, not hostile.

## Core messages
- the remote moved ahead
- Git will not let you overwrite someone else's work silently
- conflicts happen when both versions need human judgment

## What to emphasize
- both students must start from the same latest `main`
- both must edit the exact same line
- Student B should do the rejected push and recovery
- use `git pull --no-rebase` so Git does not stop and ask how to reconcile divergent branches

## Good questions to ask
- Why did Git reject Student B?
- What did Git know that Student B's local repo did not?
- What are the conflict markers showing?

## Common mistakes
- students edit different lines and no conflict happens
- students run plain `git pull` and Git asks them to choose merge vs rebase
- students pull before committing and the scenario changes
- students leave conflict markers in the file

## What to demo slowly
Show the rejected push message and name it clearly:
- this is protection
- not failure

When opening the conflicted file, point to:
- current branch version
- separator
- incoming change

## Pause point
Before resolving, ask:
- what final code do we actually want?

---

# Section 6 — Conflict simulation, round 2

## Concept goal
Both students need the muscle memory, not just the explanation.

## Core messages
- watching a partner resolve is not enough
- the second round should feel more normal and less scary

## What to emphasize
- switch who pushes first
- use a different line or small function
- require the second student to narrate what each command is doing
- keep using `git pull --no-rebase` in the second round for the same merge-based flow

## Good questions to ask
- What felt easier the second time?
- What would you do first now if your push is rejected?

## Common mistakes
- students want to skip this round
- students resolve locally but forget the final push

## Pause point
After the second resolution, ask:
- does conflict now feel like failure or like a normal part of teamwork?

---

# Section 7 — Reading history and context switching

## Concept goal
Students must see Git as a tool for understanding shared code and handling interruption.

## Core messages
- Git history answers team questions
- `git blame` means authorship tracing, not judgment
- stash is for temporary interruption
- after a hotfix, feature work must resync with updated `main`
- after `git stash pop`, the restored feature edits are ordinary local changes again
- once the restored feature work is committed, merging `main` may still create a real conflict if both branches changed the same file

## What to emphasize
- ask real investigative questions before running commands
- keep the stash scenario simple and believable
- use merge-based sync as the default student path
- commit the restored feature work before merging `main`, otherwise Git will block the merge
- if `git merge main` creates a conflict, that is normal and should be resolved like the earlier conflict labs

## Good questions to ask
- Which commit changed this line?
- Who last touched this function?
- Why was stash useful here instead of committing half-done work?
- Why sync with `main` before continuing?

## Common mistakes
- students think stash is long-term storage
- students forget what was stashed
- students resume feature work without integrating the hotfix
- students run `git merge main` immediately after `git stash pop` and Git refuses because `app.py` has local changes
- students think a conflict at this stage means they did the stash flow incorrectly

## What to demo slowly
For history:
1. `git log --oneline --graph`
2. `git log -- app.py`
3. `git show <hash>`
4. `git blame app.py`

For interruption:
1. make an unfinished change
2. stash it
3. switch to fix branch
4. merge fix
5. return and pop stash
6. commit the restored feature work
7. merge main
8. resolve conflict if one appears

## Pause point
Before `git stash`, ask:
- what problem are we solving here?

---

# Section 8 — Bonus CI with GitHub Actions

## Concept goal
Students should see CI as an added safety net on top of human workflow.

## Core messages
- CI automates repeatable checks
- green does not mean perfect
- CI belongs after PR workflow in the mental model

## What to emphasize
- keep the workflow file tiny
- show one pass and one fail
- skip without guilt if the core labs take the full session

## Good questions to ask
- What kind of mistakes can CI catch quickly?
- Why run checks before merge?

## Common mistakes
- students think CI replaces code review
- students get lost in YAML details instead of the concept

## Pause point
Ask:
- what part of the team workflow is now automatic?

---

# Instructor priorities if time gets tight

## Preserve at all costs
- Lab 1: create and publish the repo
- Lab 2: fetch vs pull
- Lab 3: feature branch and PR
- Labs 4 and 5: both conflict rounds

## Compress if needed
- history exploration can be shorter
- context switch can be instructor-led instead of full pair exploration

## Cut first
- CI bonus lab

---

# End-of-session message

Students should leave able to say:

- I can create a shared GitHub repo with a partner
- I understand the normal branch and PR workflow
- I know what to do when my push is rejected
- I can read history to understand team changes
- I can pause one task and switch to another safely
