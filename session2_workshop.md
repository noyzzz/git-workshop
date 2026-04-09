# Git Workshop — Session 2 Runbook

## Session goal

Students should leave understanding how to work with another person in a shared GitHub repository without overwriting each other's work.

The ideas that matter most:

1. A remote repository is a shared place for collaboration
2. `push`, `fetch`, and `pull` solve different problems
3. Branches and pull requests protect `main`
4. Conflicts are normal and resolvable
5. Git history helps teams understand what happened

---

## Overall flow

- Brief recap only; do not continue the Session 1 project
- Use a brand-new Python repo for Session 2
- One shared GitHub repo per pair
- Hands-on Labs 1–6 are the core session
- Lab 7 is bonus only if time allows

---

# Part 1 — Opening recap and shift to remotes (about 10 min)

## Objective
Quickly reconnect Session 1 ideas to collaboration work.

## Instructor flow

### 1. Recap Session 1 at a high level
Remind students:
- local repository
- commits
- branches
- merges
- conflicts

Keep this brief. Do not re-teach merge mechanics.

### 2. Introduce the new problem
Say something like:

> Last time Git helped you manage your own work. Today we care about a different problem: how do two people work in the same project without stepping on each other?

### 3. Make the local vs remote shift explicit
Say:

> Today we start a brand-new project because the goal is not local history anymore. The goal is shared collaboration.

### 4. Set the room expectations
Tell them:
- one shared repo per pair
- both people will push
- both people will hit a real conflict
- both people will resolve one themselves

---

# Part 2 — Lab 1: Create a new local repo and publish it

## Concepts to explain before starting
- local repository
- remote repository
- Git vs GitHub
- `origin`
- first push

## Learning objective
Students can create a local repo, create the matching GitHub repo, and connect the two.

## Suggested steps
1. Create a new project folder
2. Add a tiny `app.py`
3. Run `git init`
4. Commit the starting file
5. Create an empty GitHub repo
6. Add it as `origin`
7. Authenticate Git for HTTPS
8. Push local `main`
9. Invite partner as collaborator
10. Partner accepts and clones the repo

## What to emphasize
- Git and GitHub are not the same thing
- `origin` is just a name
- HTTPS requires authentication through GitHub CLI in this workshop
- the first push publishes existing local history
- the shared repo is now the collaboration point for both students

## Questions to ask
- What existed before we created the GitHub repo?
- What changed after we pushed?
- Why do both students need their own local clone?

## Common confusion
- students think `git init` already created something on GitHub
- students think `origin` is special magic instead of just a default name
- students mix up collaborator invitation with cloning
- students are confused when one machine prompts for auth and another one does not because credentials may already be stored

## Success criteria
Students can explain:
- what is local and what is remote
- what `origin` refers to
- why HTTPS auth behavior may differ between machines
- what the first push actually did

---

# Part 3 — Lab 2: Remote basics in the shared repo

## Concepts to explain before starting
- `push`
- `fetch`
- `pull`
- local branch vs remote-tracking branch

## Learning objective
Students understand the difference between downloading updates and integrating updates.

## Suggested steps
1. Student A changes `app.py`, commits, and pushes
2. Student B runs `git fetch`
3. Student B inspects `origin/main`
4. Student B runs `git pull`
5. Reverse roles and repeat once

## What to emphasize
- `push` uploads commits
- `fetch` updates your knowledge of the remote
- `pull` changes your local branch and working files
- `origin/main` is not the same thing as local `main`

## Questions to ask
- Why is `fetch` often safer before `pull`?
- What changed after `fetch`?
- What changed after `pull`?

## Common confusion
- students assume `fetch` changes files
- students think `origin/main` is another local branch
- students use `pull` without understanding that it integrates changes

## Success criteria
Students can explain:
- `push` vs `fetch` vs `pull`
- why `fetch` is a safer inspection step
- the difference between `main` and `origin/main`

---

# Part 4 — Lab 3: Feature branch workflow and pull requests

## Concepts to explain before starting
- feature branch
- pull request
- review
- keeping `main` stable

## Learning objective
Students understand the normal team workflow for contributing changes safely.

## Suggested steps
1. Each student creates their own feature branch
2. Make a small Python change
3. Commit and push the branch
4. Open a pull request
5. Partner leaves a review comment on the PR
6. Author pushes a follow-up commit to the same branch
7. Reviewer reopens the same PR and sees the new commit and updated diff there
8. Merge with squash

## What to emphasize
- branch first, then change code
- PRs are communication, not just merging
- review is part of the workflow
- new commits pushed to the same branch appear on the same PR
- `main` should stay stable

## Questions to ask
- Why not make these changes directly on `main`?
- Why push the branch before opening the PR?
- Why might a second commit on the PR be normal?

## Common confusion
- students think a PR is only for large teams
- students think one PR must equal one commit
- students confuse branch names with PR titles

## Success criteria
Students can explain:
- why feature branches exist
- what a PR is for
- why `main` should remain stable

---

# Part 5 — Lab 4: Conflict simulation, round 1

## Concepts to explain before starting
- push rejection
- out-of-date local branch
- conflict markers

## Learning objective
Student B experiences a rejected push and resolves the resulting conflict.

## Suggested steps
1. Both students sync to latest `main`
2. Both edit the exact same line in `app.py`
3. Student A commits and pushes first
4. Student B commits and tries to push
5. Student B gets rejected
6. Student B runs `git pull --no-rebase`, gets conflict markers, resolves, commits, and pushes

## What to emphasize
- Git is protecting shared work
- rejection is normal when your branch is behind
- conflict means Git needs human intent
- use `git pull --no-rebase` in this lab so Git follows the merge-based path explicitly

## Questions to ask
- Why did Git reject the push?
- What changed after Student A pushed?
- What do the conflict markers represent?

## Common confusion
- students think rejection means the repo is broken
- students panic at the conflict markers
- students forget to remove markers before committing

## Success criteria
Students can explain:
- why the push was rejected
- why Git could not auto-decide
- how the final conflict resolution was chosen

---

# Part 6 — Lab 5: Conflict simulation, round 2

## Concepts to explain before starting
- repetition builds confidence
- both sides of the workflow matter

## Learning objective
Student A now experiences the same rejection and resolution flow personally.

## Suggested steps
1. Sync both students back to latest `main`
2. Choose a different line or tiny function
3. Student B pushes first
4. Student A gets rejected
5. Student A runs `git pull --no-rebase`, resolves, commits, and pushes

## What to emphasize
- understanding is different from doing it yourself
- conflicts are common in team workflows
- both students must personally complete the recovery flow

## Questions to ask
- What felt easier the second time?
- What exactly caused the conflict again?
- What should you do before pushing when multiple people are active?

## Common confusion
- students treat the second round as optional
- students stop after resolving locally and forget the final push

## Success criteria
Both students have personally:
- received a push rejection
- opened a conflicted file
- resolved markers
- committed and pushed the resolution

---

# Part 7 — Lab 6: Reading history and real-world context switch

## Concepts to explain before starting
- history as a collaboration tool
- `git log`
- `git show`
- `git blame`
- `git stash`
- switching tasks safely

## Learning objective
Students can inspect team history and handle an interruption without losing work.

## Suggested steps
1. Use `git log --oneline --graph`
2. Use `git log -- app.py`
3. Use `git show <hash>`
4. Use `git blame app.py`
5. Start a feature change
6. Leave it uncommitted
7. Stash it
8. Switch to a bugfix branch
9. Fix the bug and merge
10. Return to the feature branch
11. Run `git stash pop`
12. Commit the restored feature work
13. Sync with updated `main`
14. If needed, resolve the final merge conflict and commit it

## What to emphasize
- Git history is for understanding, not just saving
- stash is for temporary context switching
- syncing with `main` matters after interrupts
- after `git stash pop`, the feature changes are back as normal uncommitted edits, so commit them before merging `main`
- use `git merge main` as the default sync method here
- even after that commit, merging `main` may still create a conflict if both branches changed `app.py`

## Questions to ask
- Which commit introduced this line?
- Who changed this function?
- Why was stash useful in this situation?
- What would go wrong if we ignored the updated `main`?

## Common confusion
- students think `git blame` is negative instead of informational
- students forget stash only helps if they actually had uncommitted work
- students jump back to feature work without syncing with `main`

## Success criteria
Students can explain:
- how to inspect who changed code and when
- why stash was useful
- why the feature branch needed to sync with `main`

---

# Part 8 — Lab 7: Bonus lab, CI with GitHub Actions

## Why bonus only
CI is useful, but it is not the core collaboration skill for Session 2.

## Concepts to explain before starting
- automated checks
- pull request checks
- pass vs fail signals

## Learning objective
Students see how automation adds another safety layer to team workflow.

## Suggested steps
1. Add a minimal workflow file
2. Run `python app.py` on `pull_request`
3. Show a passing run
4. Break the code
5. Show a failing run
6. Fix it and re-run

## What to emphasize
- CI is an automatic reviewer for basic checks
- a green check does not replace human review
- this is extra safety, not the core of collaboration

## Questions to ask
- What is CI protecting us from?
- Why run checks on a pull request?
- What can CI catch, and what can it not catch?

## Common confusion
- students think CI is only for advanced teams
- students think passing CI means code is automatically good

## Success criteria
If time allows, students can explain:
- what GitHub Actions did
- why teams use CI on shared repositories

---

# Suggested timing

## Core session
- Recap and setup framing: 10 min
- Lab 1: 30 min
- Lab 2: 20 min
- Lab 3: 35 min
- Lab 4: 15 min
- Lab 5: 15 min
- Lab 6: 35 min

## Bonus
- Lab 7: 20 min

Adjust in real time.
If time gets tight:
- preserve Labs 1–6
- shorten history exploration before cutting conflict time
- skip CI first

---

# Instructor principles during the session

## 1. Keep tying commands back to collaboration
Every command should answer:
How do teams avoid breaking each other's work?

## 2. Keep the Python tiny
One file and very small changes are enough.

## 3. Slow down for the first rejection and first conflict
That is the highest-value learning moment of the session.

## 4. Make both students do the hard part
Do not let one student become the keyboard owner for every recovery step.

## 5. Prefer safe defaults
Use merge-based syncing in the main flow.
Mention rebase only as an optional advanced note.

---

# End-of-session summary

By the end of Session 2, students should be able to say:

- I can create and publish a Git repo to GitHub
- I understand `push`, `fetch`, and `pull`
- I can collaborate using branches and pull requests
- I can resolve conflicts without panicking
- I can inspect Git history to understand team changes
- I can safely pause one task and switch to another
