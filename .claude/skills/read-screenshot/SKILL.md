---
name: read-screenshot
description: Use when the user says "reference this", "look at this", "check this screenshot", "see attached", "look at the image", "see this file", "reference the screenshot", or implies they have an image or file to share without providing an explicit path. Automatically finds the most recent file in ~/Downloads or ~/Desktop and reads it.
---

# Read Screenshot / Reference File

**Announce:** "Looking for your file in Downloads and Desktop..."

When the user references a screenshot, image, or file without an explicit path, find it automatically — never ask "where is the file?" before checking.

## Step 1: Find the File

Use python3 — zsh brace globs break when any extension has no matches, and python handles spaces and AM/PM filenames correctly:

```bash
python3 -c "
import os, glob
dirs = [os.path.expanduser('~/Downloads'), os.path.expanduser('~/Desktop')]
exts = ('.png','.jpg','.jpeg','.gif','.webp','.pdf','.svg')
files = [(os.path.getmtime(f), f) for d in dirs for f in glob.glob(d+'/*') if f.lower().endswith(exts)]
files.sort(reverse=True)
for _, f in files[:5]: print(f)
"
```

**Selection logic:**
- Pick the **most recently modified** file across both locations
- If the user named it (e.g., "the screenshot of the dashboard", "the error image"), match by name fragment case-insensitively
- If multiple files exist and it's ambiguous, list the top 3 (name + location) and ask which one

> **macOS note**: Downloads is always readable. Desktop files are blocked by macOS TCC privacy — the tool can list Desktop but cannot open individual files from it. If the most recent file is on the Desktop, try the next Downloads file, or ask the user to move it to Downloads.

## Step 2: Read the File

Use the `Read` tool with the **full absolute path** returned by the python command above.

Codex renders images visually when read — AM/PM in filenames and spaces both work fine.

## Step 3: Confirm and Proceed

State which file was found before analyzing:

> "Found: `/Users/Humberto/Downloads/Screenshot 2026-03-04 at 4.59.46 PM.jpg` — analyzing now."

Then proceed with whatever the user asked you to do with it.

## Fallback

If no files are found, or Desktop-only files are blocked:
1. Ask the user to move the file to `~/Downloads`
2. Or drag the file directly into the chat
3. Or paste a screenshot directly into the chat (Codex supports this)
