export const labs = [
  {
    id: 1,
    title: 'First Repository',
    emoji: '🌱',
    goal: 'Create a Git repository, add files, and make your first commits.',
    learning: [
      'what a repository is',
      'what staging does',
      'what a commit is',
      'the difference between untracked, staged, and committed files',
    ],
    parts: [
      {
        steps: [
          {
            id: '1-1',
            title: 'Create a new project folder',
            type: 'bash',
            code: 'mkdir my-first-repo\ncd my-first-repo',
          },
          {
            id: '1-2',
            title: 'Initialize Git',
            type: 'bash',
            code: 'git init',
          },
          {
            id: '1-3',
            title: 'Create README.md',
            type: 'create-file',
            filename: 'README.md',
            content: '# My Project',
          },
          {
            id: '1-4',
            title: 'Create app.py',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("hello")',
          },
          {
            id: '1-5',
            title: 'Check Git status',
            type: 'bash',
            code: 'git status',
            observe: ['untracked files listed', 'file names shown in red'],
          },
          {
            id: '1-6',
            title: 'Stage only the README',
            type: 'bash',
            code: 'git add README.md\ngit status',
            observe: ['README.md is now staged (green)', 'app.py is still untracked (red)'],
          },
          {
            id: '1-7',
            title: 'Commit the README',
            type: 'bash',
            code: 'git commit -m "docs: add README"',
          },
          {
            id: '1-8',
            title: 'Stage and commit app.py',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "feat: initial app entry point"',
          },
          {
            id: '1-9',
            title: 'View the commit history',
            type: 'bash',
            code: 'git log --oneline',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now have:',
      items: ['a .git directory (hidden)', 'two commits in history', 'a clean working tree'],
      verify: 'git status',
    },
    reflection: [
      'Why did we not stage everything at once?',
      'What is the difference between creating a file and committing it?',
      'What does `git status` tell you?',
    ],
  },
  {
    id: 2,
    title: 'Inspect Changes with Diff',
    emoji: '🔍',
    goal: 'Understand the difference between unstaged changes and staged changes.',
    learning: [
      'what `git diff` shows',
      'what `git diff --staged` shows',
      'how Git compares the three areas',
    ],
    parts: [
      {
        steps: [
          {
            id: '2-1',
            title: 'Edit app.py — add a second print',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("hello")\nprint("world")',
            note: 'Open app.py in your editor and add the second line at the end.',
          },
          {
            id: '2-2',
            title: 'View the unstaged diff',
            type: 'bash',
            code: 'git diff',
            note: 'This shows changes in the working directory that are NOT yet staged.',
          },
          {
            id: '2-3',
            title: 'Stage the file',
            type: 'bash',
            code: 'git add app.py',
          },
          {
            id: '2-4',
            title: 'Run git diff again',
            type: 'bash',
            code: 'git diff',
            observe: ['it should show nothing — the change is now staged, not unstaged'],
          },
          {
            id: '2-5',
            title: 'View the staged diff',
            type: 'bash',
            code: 'git diff --staged',
            note: 'This compares the staging area to the last commit.',
          },
          {
            id: '2-6',
            title: 'Commit the change',
            type: 'bash',
            code: 'git commit -m "feat: add world print"',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'Working tree should be clean:',
      items: ['no staged changes', 'no unstaged changes'],
      verify: 'git status',
    },
    reflection: [
      'Why did `git diff` stop showing the change after staging?',
      'What is `git diff --staged` comparing exactly?',
    ],
  },
  {
    id: 3,
    title: 'Branching',
    emoji: '🌿',
    goal: 'Create branches, work on them, and observe how branches isolate work.',
    learning: [
      'what a branch is',
      'how switching branches affects your working files',
      'what HEAD means in practice',
    ],
    parts: [
      {
        steps: [
          {
            id: '3-1',
            title: 'Create and switch to a new branch',
            type: 'bash',
            code: 'git switch -c feature/header',
            extras: [
              {
                type: 'legacy',
                title: 'Legacy: git checkout',
                content:
                  'Before `git switch` (added in Git 2.23, 2019), the traditional command was:\n\n`git checkout -b feature/header`\n\nYou will still see `git checkout` used for branching in many online tutorials and older documentation. It does the same thing but also does other things, which made it confusing for beginners. Prefer `git switch` when switching branches.',
              },
            ],
          },
          {
            id: '3-2',
            title: 'Confirm your current branch',
            type: 'bash',
            code: 'git branch',
            observe: ['the asterisk * marks the active branch'],
          },
          {
            id: '3-3',
            title: 'Create header.py on this branch',
            type: 'create-file',
            filename: 'header.py',
            content: 'print("<h1>My App</h1>")',
          },
          {
            id: '3-4',
            title: 'Stage and commit header.py',
            type: 'bash',
            code: 'git add header.py\ngit commit -m "feat: add header component"',
          },
          {
            id: '3-5',
            title: 'Switch back to main',
            type: 'bash',
            code: 'git switch main',
            observe: ['header.py should no longer be visible in your folder'],
          },
          {
            id: '3-6',
            title: 'Create a second branch',
            type: 'bash',
            code: 'git switch -c feature/footer',
          },
          {
            id: '3-7',
            title: 'Create footer.py on this branch',
            type: 'create-file',
            filename: 'footer.py',
            content: 'print("<footer>© 2026</footer>")',
          },
          {
            id: '3-8',
            title: 'Stage and commit footer.py',
            type: 'bash',
            code: 'git add footer.py\ngit commit -m "feat: add footer component"',
          },
          {
            id: '3-9',
            title: 'View all branches and history',
            type: 'bash',
            code: 'git log --oneline --graph --all --decorate',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now have three branches:',
      items: ['main', 'feature/header', 'feature/footer'],
      verify: 'git branch',
    },
    reflection: [
      'Why did header.py disappear when you switched back to main?',
      'Did Git copy the whole project when the branch was created?',
      'What does the asterisk in `git branch` mean?',
    ],
  },
  {
    id: 4,
    title: 'Merge & Conflict',
    emoji: '🔀',
    goal: 'Perform a merge, then create and resolve a merge conflict.',
    learning: [
      'what a merge does',
      'what a fast-forward merge is',
      'why conflicts happen',
      'how to resolve conflict markers',
    ],
    parts: [
      {
        title: 'Part A — Clean merge',
        steps: [
          {
            id: '4-1',
            title: 'Switch to main',
            type: 'bash',
            code: 'git switch main',
          },
          {
            id: '4-2',
            title: 'Merge feature/header into main',
            type: 'bash',
            code: 'git merge feature/header',
            note: 'This should be a fast-forward merge — no conflict.',
          },
          {
            id: '4-3',
            title: 'Inspect the history',
            type: 'bash',
            code: 'git log --oneline --graph --all --decorate',
          },
        ],
      },
      {
        title: 'Part B — Create a conflict',
        steps: [
          {
            id: '4-4',
            title: 'On main, change app.py',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("Hello from main!")',
            note: 'Replace the entire content of app.py with this single line.',
          },
          {
            id: '4-5',
            title: 'Stage and commit on main',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "fix: update print message"',
          },
          {
            id: '4-6',
            title: 'Switch to feature/footer',
            type: 'bash',
            code: 'git switch feature/footer',
          },
          {
            id: '4-7',
            title: 'Change app.py differently on this branch',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("Hello from footer branch!")',
            note: 'Replace the entire content of app.py with this single line.',
          },
          {
            id: '4-8',
            title: 'Stage and commit on feature/footer',
            type: 'bash',
            code: 'git add app.py\ngit commit -m "fix: update print in footer branch"',
          },
          {
            id: '4-9',
            title: 'Switch back to main and try to merge',
            type: 'bash',
            code: 'git switch main\ngit merge feature/footer',
            note: 'You should now see a CONFLICT message.',
          },
          {
            id: '4-10',
            title: 'Open app.py — you will see conflict markers',
            type: 'conflict-example',
            head: 'print("Hello from main!")',
            theirs: 'print("Hello from footer branch!")',
          },
          {
            id: '4-11',
            title: 'Resolve the conflict',
            type: 'create-file',
            filename: 'app.py',
            content: 'print("Hello from main and footer branch!")',
            note: 'Edit app.py to remove all conflict markers and keep only the final version you want.',
          },
          {
            id: '4-12',
            title: 'Stage the resolved file',
            type: 'bash',
            code: 'git add app.py',
          },
          {
            id: '4-13',
            title: 'Complete the merge',
            type: 'bash',
            code: 'git merge --continue',
          },
          {
            id: '4-14',
            title: 'Inspect the history again',
            type: 'bash',
            code: 'git log --oneline --graph --all --decorate',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now have:',
      items: [
        'one fast-forward merge',
        'one merge conflict, resolved',
        'a merge commit visible in history',
      ],
      verify: 'git log --oneline --graph --all',
    },
    reflection: [
      'Why was the first merge easy (fast-forward)?',
      'Why did the second merge create a conflict?',
      'What did the conflict markers <<<<<<< and >>>>>>> represent?',
    ],
  },
  {
    id: 5,
    title: 'Undoing Things',
    emoji: '↩️',
    goal: 'Practice safer undo operations and understand what each one affects.',
    learning: [
      'how to discard unstaged changes',
      'how to unstage a file',
      'how to undo the last commit while keeping work',
    ],
    parts: [
      {
        title: 'Part A — Discard an unstaged change',
        steps: [
          {
            id: '5-1',
            title: 'Edit README.md — add a typo',
            type: 'create-file',
            filename: 'README.md',
            content: '# My Project\noops',
            note: 'Open README.md and add "oops" as a new line at the end.',
          },
          {
            id: '5-2',
            title: 'View the diff',
            type: 'bash',
            code: 'git diff',
          },
          {
            id: '5-3',
            title: 'Restore the file (discard the change)',
            type: 'bash',
            code: 'git restore README.md',
          },
          {
            id: '5-4',
            title: 'Confirm the change is gone',
            type: 'bash',
            code: 'git diff',
            observe: ['no output — the change was discarded'],
          },
        ],
      },
      {
        title: 'Part B — Unstage a file',
        steps: [
          {
            id: '5-5',
            title: 'Edit README.md again',
            type: 'create-file',
            filename: 'README.md',
            content: '# My Project\nsomething',
            note: 'Open README.md and add "something" as a new line at the end.',
          },
          {
            id: '5-6',
            title: 'Stage the file',
            type: 'bash',
            code: 'git add README.md\ngit status',
          },
          {
            id: '5-7',
            title: 'Unstage it',
            type: 'bash',
            code: 'git restore --staged README.md\ngit status',
            observe: [
              'the change still exists in the working directory',
              'but it is no longer staged',
            ],
          },
        ],
      },
      {
        title: 'Part C — Undo the last commit (keep changes)',
        steps: [
          {
            id: '5-8',
            title: 'Commit the change',
            type: 'bash',
            code: 'git add README.md\ngit commit -m "wip: test"',
          },
          {
            id: '5-9',
            title: 'View recent history',
            type: 'bash',
            code: 'git log --oneline -3',
          },
          {
            id: '5-10',
            title: 'Undo the last commit (keep changes in working dir)',
            type: 'bash',
            code: 'git reset HEAD~1',
          },
          {
            id: '5-11',
            title: 'Check history and status',
            type: 'bash',
            code: 'git log --oneline -3\ngit status',
            observe: [
              'the commit is gone from the log',
              'the file changes are still in your working directory',
            ],
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now be able to tell the difference between:',
      items: [
        'restoring a file (discards unstaged changes)',
        'unstaging a file (removes from staging, keeps in working dir)',
        'resetting a commit (removes commit, keeps changes)',
      ],
      verify: 'git status',
    },
    reflection: [
      'What changed when you used `git restore README.md`?',
      'What changed when you used `git restore --staged README.md`?',
      'What changed when you used `git reset HEAD~1`?',
    ],
  },
  {
    id: 6,
    title: 'GitHub & Remotes',
    emoji: '🌐',
    goal: 'Connect your local repository to GitHub and understand fetch, pull, and push.',
    learning: [
      'local vs remote repository',
      'what `origin` means',
      'the difference between `push`, `fetch`, and `pull`',
    ],
    parts: [
      {
        steps: [
          {
            id: '6-1',
            title: 'Create an empty GitHub repository',
            type: 'text',
            content:
              'On GitHub:\n• Create a new repository\n• Do NOT initialize it with a README\n• Copy the repository URL',
          },
          {
            id: '6-2',
            title: 'Add the remote',
            type: 'bash',
            code: 'git remote add origin https://github.com/YOU/my-first-repo.git',
            note: 'Replace the URL with your own repository URL.',
          },
          {
            id: '6-3',
            title: 'Verify the remote',
            type: 'bash',
            code: 'git remote -v',
          },
          {
            id: '6-4',
            title: 'Push your local main',
            type: 'bash',
            code: 'git push -u origin main',
            note: 'The -u flag sets origin/main as the tracking branch for future git push / git pull.',
          },
          {
            id: '6-5',
            title: 'Make a change directly on GitHub',
            type: 'text',
            content:
              'On GitHub:\n• Open README.md\n• Click the pencil icon to edit\n• Add any text\n• Commit the change in the browser',
          },
          {
            id: '6-6',
            title: 'Fetch remote changes',
            type: 'bash',
            code: 'git fetch',
            note: 'fetch downloads the remote changes but does NOT merge them into your local branch yet.',
          },
          {
            id: '6-7',
            title: 'Inspect the remote-tracking branch',
            type: 'bash',
            code: 'git log --oneline origin/main',
          },
          {
            id: '6-8',
            title: 'Pull the change into local main',
            type: 'bash',
            code: 'git pull',
          },
          {
            id: '6-9',
            title: 'Check history',
            type: 'bash',
            code: 'git log --oneline --graph --all --decorate',
          },
        ],
      },
    ],
    checkpoint: {
      description: 'You should now understand:',
      items: [
        'main is your local branch',
        'origin/main is your remote-tracking branch',
        'fetch downloads without integrating',
        'pull downloads and integrates',
      ],
      verify: 'git log --oneline --graph --all --decorate',
    },
    reflection: [
      'What does `fetch` do that `pull` does not?',
      'Why is `origin/main` not the same as `main`?',
      'What does `-u` do in `git push -u origin main`?',
    ],
  },
]
