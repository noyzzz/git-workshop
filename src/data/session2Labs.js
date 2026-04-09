export const session2Labs = [
  {
    id: 1,
    title: 'Create & Publish a Repo',
    emoji: '🚀',
    goal: 'Create a brand-new local repo, publish it to GitHub, and connect both partners to the same remote.',
    learning: [
      'local vs remote repository',
      'what `origin` means',
      'how the first push works',
      'how a collaborator joins the same repo',
    ],
    parts: [
      {
        title: 'Part A — Student A creates the repo',
        steps: [
          {
            id: 's2-1-1',
            title: 'Create a new project folder',
            type: 'bash',
            code: 'mkdir session2-collab\ncd session2-collab',
          },
          {
            id: 's2-1-2',
            title: 'Create app.py',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("Hello from Session 2")',
          },
          {
            id: 's2-1-3',
            title: 'Initialize Git and normalize the branch name',
            type: 'bash',
            code: 'git init\ngit branch -M main',
          },
          {
            id: 's2-1-4',
            title: 'Make the first commit',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: start Session 2 app"',
          },
          {
            id: 's2-1-5',
            title: 'Create an empty GitHub repository',
            type: 'text',
            content:
              'On GitHub:\n• Create a new repository\n• Do NOT initialize it with a README\n• Copy the repository URL',
          },
          {
            id: 's2-1-6',
            title: 'Add the remote and verify it',
            type: 'bash',
            code: 'git remote add origin https://github.com/YOU/session2-collab.git\ngit remote -v',
          },
          {
            id: 's2-1-7',
            title: 'Authenticate Git for HTTPS',
            type: 'text',
            content:
              'Use GitHub CLI for HTTPS login.\n\nWindows PowerShell:\n• If needed: winget install GitHub.cli\n• If gh is still missing in the current window: $env:Path += ";C:\\Program Files\\GitHub CLI"\n• Then run: gh auth login\n\nmacOS:\n• If needed: brew install gh\n• Then run: gh auth login\n\nLinux:\n• If needed: sudo apt install gh\n• Then run: gh auth login\n\nWhen gh auth login asks questions, choose:\n• GitHub.com\n• HTTPS\n• Login with a web browser\n• Yes to authenticate Git with your GitHub credentials',
          },
          {
            id: 's2-1-8',
            title: 'Push main to GitHub',
            type: 'bash',
            code: 'git push -u origin main',
          },
          {
            id: 's2-1-9',
            title: 'Invite Student B as collaborator',
            type: 'text',
            content:
              'On GitHub:\n• Open repository settings\n• Go to collaborators\n• Invite your partner',
          },
        ],
      },
      {
        title: 'Part B — Student B joins the shared repo',
        steps: [
          {
            id: 's2-1-10',
            title: 'Accept the collaborator invite',
            type: 'text',
            content:
              'On GitHub:\n• Accept the invitation from Student A',
          },
          {
            id: 's2-1-11',
            title: 'Clone the shared repo',
            type: 'bash',
            code: 'git clone https://github.com/YOU/session2-collab.git\ncd session2-collab',
          },
          {
            id: 's2-1-12',
            title: 'Verify both students are on main',
            type: 'bash',
            code: 'git branch\ngit remote -v',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now have:',
      items: [
        'one shared GitHub repository',
        'two local clones, one on each machine',
        'main connected to origin/main',
      ],
      verify: 'git status',
    },
    reflection: [
      'What existed before the GitHub repo was created?',
      'What did the first push change?',
      'Why did Student B clone instead of copying the folder manually?',
    ],
  },
  {
    id: 2,
    title: 'Remote Basics',
    emoji: '🌐',
    goal: 'Understand what push, fetch, and pull each do in a shared repo.',
    learning: [
      'how one partner publishes changes',
      'how the other partner downloads updates safely',
      'why `fetch` and `pull` are not the same',
    ],
    parts: [
      {
        title: 'Part A — Student A pushes first',
        steps: [
          {
            id: 's2-2-1',
            title: 'Student A edits app.py',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("Hello from Student A")',
          },
          {
            id: 's2-2-2',
            title: 'Student A commits and pushes',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: update greeting from Student A"\ngit push',
          },
          {
            id: 's2-2-3',
            title: 'Student B fetches remote updates',
            type: 'bash',
            code: 'git fetch',
          },
          {
            id: 's2-2-4',
            title: 'Student B inspects origin/main',
            type: 'bash',
            code: 'git log --oneline origin/main -3',
          },
          {
            id: 's2-2-5',
            title: 'Student B pulls the change',
            type: 'bash',
            code: 'git pull',
          },
        ],
      },
      {
        title: 'Part B — Reverse roles',
        steps: [
          {
            id: 's2-2-6',
            title: 'Student B edits app.py',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("Hello from Student B")',
          },
          {
            id: 's2-2-7',
            title: 'Student B commits and pushes',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: update greeting from Student B"\ngit push',
          },
          {
            id: 's2-2-8',
            title: 'Student A fetches, inspects, and pulls',
            type: 'bash',
            code: 'git fetch\ngit log --oneline origin/main -3\ngit pull',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'Both students should now have:',
      items: [
        'the same content in app.py',
        'the same recent commits on main',
        'a clear difference between fetch and pull',
      ],
      verify: 'git log --oneline -3',
    },
    reflection: [
      'What changed after git fetch?',
      'What changed after git pull?',
      'Why is fetch the safer first step?',
    ],
  },
  {
    id: 3,
    title: 'Feature Branches & PRs',
    emoji: '🌿',
    goal: 'Practice the normal team workflow using feature branches and pull requests.',
    learning: [
      'why work starts on a branch',
      'how to push a feature branch',
      'how pull requests support review',
    ],
    parts: [
      {
        title: 'Part A — Student A opens a PR',
        steps: [
          {
            id: 's2-3-1',
            title: 'Create and switch to a branch',
            type: 'bash',
            code: 'git switch -c feature/greeting-a',
          },
          {
            id: 's2-3-2',
            title: 'Add a small function',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello, {name}"\n\n\nprint(greet("Student A"))',
          },
          {
            id: 's2-3-3',
            title: 'Commit and push the branch',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: add greeting function"\ngit push -u origin feature/greeting-a',
          },
          {
            id: 's2-3-4',
            title: 'Open a pull request',
            type: 'text',
            content:
              'On GitHub:\n• Open a PR from feature/greeting-a into main',
          },
          {
            id: 's2-3-5',
            title: 'Student B reviews the PR and leaves a comment',
            type: 'text',
            content:
              'Student B:\n• Read the diff\n• Leave one comment or suggestion on the PR',
          },
          {
            id: 's2-3-6',
            title: 'Student A updates the same PR',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello there, {name}"\n\n\nprint(greet("Student A"))',
            note: 'Student A should read the PR comment first, then make this update on the same branch.',
          },
          {
            id: 's2-3-7',
            title: 'Push the update to the same branch',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "refactor: refine greeting message"\ngit push',
          },
          {
            id: 's2-3-8',
            title: 'Student B checks the same PR again',
            type: 'text',
            content:
              'On GitHub:\n• Return to the same PR\n• Notice the new commit is attached to that PR\n• Review the updated diff there',
          },
          {
            id: 's2-3-9',
            title: 'Merge the PR with squash',
            type: 'text',
            content:
              'On GitHub:\n• Merge the PR with squash',
          },
        ],
      },
      {
        title: 'Part B — Student B repeats the workflow',
        steps: [
          {
            id: 's2-3-10',
            title: 'Sync main before the second PR',
            type: 'bash',
            code: 'git switch main\ngit pull',
          },
          {
            id: 's2-3-11',
            title: 'Student B creates a new branch',
            type: 'bash',
            code: 'git switch -c feature/greeting-b',
          },
          {
            id: 's2-3-12',
            title: 'Student B makes a small change',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello there, {name}"\n\n\nprint(greet("Student B"))',
          },
          {
            id: 's2-3-13',
            title: 'Commit and push the branch',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: personalize greeting output"\ngit push -u origin feature/greeting-b',
          },
          {
            id: 's2-3-14',
            title: 'Repeat the same review loop with roles reversed',
            type: 'text',
            content:
              'On GitHub:\n• Open a PR from feature/greeting-b into main\n• Student A leaves a comment on that PR\n• Student B pushes an update to the same branch\n• Student A returns to the same PR and sees the new changes there\n• Then merge the PR',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now have:',
      items: [
        'at least two merged pull requests',
        'branch names that describe the work',
        'experience reviewing a teammate’s change',
        'experience seeing new commits appear on the same PR',
      ],
      verify: 'git log --oneline --graph --all --decorate',
    },
    reflection: [
      'Why work on a branch instead of directly on main?',
      'What did the pull request add to the workflow?',
      'Why did the updated code appear on the same PR instead of a new PR?',
      'Why was a second commit on the PR normal?',
    ],
  },
  {
    id: 4,
    title: 'Conflict Simulation — Round 1',
    emoji: '⚔️',
    goal: 'Student B experiences a rejected push and resolves a real conflict.',
    learning: [
      'why a push gets rejected',
      'how to read conflict markers',
      'how to decide the final code manually',
    ],
    parts: [
      {
        steps: [
          {
            id: 's2-4-1',
            title: 'Sync both students to the latest main',
            type: 'bash',
            code: 'git switch main\ngit pull --no-rebase',
          },
          {
            id: 's2-4-2',
            title: 'Student A edits the same final print line',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello there, {name}"\n\n\nprint("Message from Student A")',
          },
          {
            id: 's2-4-3',
            title: 'Student B edits that exact same line differently',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello there, {name}"\n\n\nprint("Message from Student B")',
          },
          {
            id: 's2-4-4',
            title: 'Student A commits and pushes first',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: update shared message from A"\ngit push',
          },
          {
            id: 's2-4-5',
            title: 'Student B commits and hits the rejected push',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: update shared message from B"\ngit push',
            observe: ['Git should reject the push because the remote moved ahead first'],
          },
          {
            id: 's2-4-6',
            title: 'Student B pulls and sees conflict markers',
            type: 'bash',
            code: 'git pull --no-rebase',
            note: 'We use --no-rebase here so Git shows the merge-based conflict flow for this workshop.',
          },
          {
            id: 's2-4-7',
            title: 'Example of the conflicted area',
            type: 'conflict-example',
            head: 'print("Message from Student B")',
            theirs: 'print("Message from Student A")',
          },
          {
            id: 's2-4-8',
            title: 'Resolve the conflict with one final message',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello there, {name}"\n\n\nprint("Message from Student A and Student B")',
          },
          {
            id: 's2-4-9',
            title: 'Commit and push the resolution',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "fix: resolve conflict between A and B messages"\ngit push',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'Student B should now have:',
      items: [
        'one rejected push',
        'one resolved conflict',
        'one successful push after resolution',
      ],
      verify: 'git log --oneline -4',
    },
    reflection: [
      'Why did Git reject the push?',
      'What were the conflict markers showing?',
      'How did you decide the final code?',
    ],
  },
  {
    id: 5,
    title: 'Conflict Simulation — Round 2',
    emoji: '🧩',
    goal: 'Student A now experiences the same rejection and resolution flow.',
    learning: [
      'how repeated conflict resolution becomes more manageable',
      'why both collaborators need hands-on practice',
    ],
    parts: [
      {
        steps: [
          {
            id: 's2-5-1',
            title: 'Sync both students again',
            type: 'bash',
            code: 'git switch main\ngit pull --no-rebase',
          },
          {
            id: 's2-5-2',
            title: 'Student A edits the greet function one way',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello from A, {name}"\n\n\nprint("Message from Student A and Student B")',
          },
          {
            id: 's2-5-3',
            title: 'Student B edits the same return line differently',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello from B, {name}"\n\n\nprint("Message from Student A and Student B")',
          },
          {
            id: 's2-5-4',
            title: 'Student B commits and pushes first',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "refactor: update greet from B"\ngit push',
          },
          {
            id: 's2-5-5',
            title: 'Student A commits and gets the rejection',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "refactor: update greet from A"\ngit push',
          },
          {
            id: 's2-5-6',
            title: 'Student A pulls and resolves the conflict',
            type: 'bash',
            code: 'git pull --no-rebase',
            note: 'Again, use --no-rebase so the conflict appears in the same merge-based workflow.',
          },
          {
            id: 's2-5-7',
            title: 'Keep one final team version',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello from the team, {name}"\n\n\nprint("Message from Student A and Student B")',
          },
          {
            id: 's2-5-8',
            title: 'Commit and push the final resolution',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "fix: resolve greet conflict"\ngit push',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'Both students should now have personally:',
      items: [
        'hit a rejected push',
        'opened a conflicted file',
        'resolved the conflict',
        'pushed the final result',
      ],
      verify: 'git log --oneline -5',
    },
    reflection: [
      'What felt easier the second time?',
      'What should you do now if your push is rejected?',
      'Why is conflict a normal collaboration event?',
    ],
  },
  {
    id: 6,
    title: 'History & Context Switching',
    emoji: '🕰️',
    goal: 'Use Git to understand team changes and safely switch to an urgent fix.',
    learning: [
      'how to inspect history',
      'how to answer who changed what',
      'how git stash helps during interruption',
    ],
    parts: [
      {
        title: 'Part A — Read the history',
        steps: [
          {
            id: 's2-6-1',
            title: 'View the commit graph',
            type: 'bash',
            code: 'git log --oneline --graph --all --decorate',
          },
          {
            id: 's2-6-2',
            title: 'View history for app.py',
            type: 'bash',
            code: 'git log -- app.py',
          },
          {
            id: 's2-6-3',
            title: 'Inspect one specific commit',
            type: 'bash',
            code: 'git show <hash>',
            note: 'Replace <hash> with a real commit hash from your log.',
          },
          {
            id: 's2-6-4',
            title: 'See who last changed each line',
            type: 'bash',
            code: 'git blame app.py',
          },
        ],
      },
      {
        title: 'Part B — Context switch with stash',
        steps: [
          {
            id: 's2-6-5',
            title: 'Start a feature branch',
            type: 'bash',
            code: 'git switch -c feature/search',
          },
          {
            id: 's2-6-6',
            title: 'Make an unfinished change',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello from the team, {name}"\n\n\ndef search():\n    return "searching..."\n\n\nprint("Message from Student A and Student B")',
          },
          {
            id: 's2-6-7',
            title: 'Stash the unfinished work',
            type: 'bash',
            code: 'git stash',
          },
          {
            id: 's2-6-8',
            title: 'Switch to main and create a fix branch',
            type: 'bash',
            code: 'git switch main\ngit pull\ngit switch -c fix/bug',
          },
          {
            id: 's2-6-9',
            title: 'Apply the bug fix',
            type: 'create-file',
            filename: 'app.py',
            content: 'def greet(name):\n    return f"Hello from the team, {name}"\n\n\nprint("Fixed bug")',
          },
          {
            id: 's2-6-10',
            title: 'Commit the fix and merge it into main',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "fix: update app output"\ngit switch main\ngit merge fix/bug',
          },
          {
            id: 's2-6-11',
            title: 'Return to the feature and restore the stash',
            type: 'bash',
            code: 'git switch feature/search\ngit stash pop',
          },
          {
            id: 's2-6-12',
            title: 'Commit the restored feature work',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: start search feature"',
            note: 'After stash pop, your feature changes are back as normal local edits. Commit them before merging main.',
          },
          {
            id: 's2-6-13',
            title: 'Sync the feature branch with updated main',
            type: 'bash',
            code: 'git merge main',
            note: 'This merge may create a conflict because both branches changed app.py. That is normal.',
          },
          {
            id: 's2-6-14',
            title: 'If needed, resolve the final merge conflict',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "merge: resolve feature/search with updated main"',
            note: 'If Git reports a conflict, open app.py first, choose the final combined version, then run these commands.',
          },
          {
            id: 's2-6-15',
            title: 'Inspect the final result',
            type: 'bash',
            code: 'git status\ngit log --oneline --graph --all --decorate',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now have:',
      items: [
        'used history to inspect earlier work',
        'stashed unfinished work',
        'switched to a bugfix',
        'returned to the feature safely',
      ],
      verify: 'git stash list',
    },
    reflection: [
      'What question did git blame answer?',
      'Why use git stash instead of committing unfinished work?',
      'Why did you need to commit after git stash pop before merging main?',
      'Why might git merge main still create a conflict after that?',
      'Why did feature/search need to sync with main?',
    ],
  },
  {
    id: 7,
    title: 'Bonus — CI With GitHub Actions',
    emoji: '✅',
    goal: 'See how GitHub can run automated checks on shared code.',
    learning: [
      'what CI does',
      'how checks appear on GitHub',
      'why teams like automated safety checks',
    ],
    parts: [
      {
        steps: [
          {
            id: 's2-7-1',
            title: 'Create the workflow file',
            type: 'create-file',
            filename: '.github/workflows/ci.yml',
            content: 'name: CI\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.x"\n      - run: python app.py',
          },
          {
            id: 's2-7-2',
            title: 'Commit and push the workflow',
            type: 'bash',
            code: 'git add .github/workflows/ci.yml\ngit commit -m "ci: add basic Python workflow"\ngit push',
          },
          {
            id: 's2-7-3',
            title: 'Check the passing workflow on GitHub',
            type: 'text',
            content:
              'On GitHub:\n• Open the Actions tab\n• Wait for the workflow to pass',
          },
          {
            id: 's2-7-4',
            title: 'Break the code on a branch',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("broken"',
          },
          {
            id: 's2-7-5',
            title: 'Push the failing change on a branch',
            type: 'bash',
            code: 'git switch -c test/ci-failure\ngit add app.py\ngit commit -m "test: trigger CI failure"\ngit push -u origin test/ci-failure',
            note: 'Open a pull request and observe the failing check on GitHub.',
          },
          {
            id: 's2-7-6',
            title: 'Fix the code and push again',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("fixed again")',
          },
          {
            id: 's2-7-7',
            title: 'Commit the fix and watch the check recover',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "fix: restore valid Python syntax"\ngit push',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'If you completed this bonus lab, you have now seen:',
      items: [
        'one passing CI run',
        'one failing CI run',
        'one fixed CI run',
      ],
      verify: 'Open the GitHub Actions tab',
    },
    reflection: [
      'What was GitHub checking for you?',
      'Why is CI useful on pull requests?',
      'Why does passing CI still not replace human review?',
    ],
  },
]
