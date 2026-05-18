---
name: ralph
description: Activate, check, or stop the Ralph autonomous iteration loop. Ralph keeps Codex working on a task across multiple turns until a completion promise is found, without the user needing to re-prompt. Use when starting a long task that should run autonomously (e.g. "implement feature X end-to-end"). Commands: start <task>, status, stop.
user-invocable: true
allowed-tools: Read, Write, Bash
argument-hint: start <task description> | status | stop
---

# Ralph — Autonomous Iteration Loop

Action: $ARGUMENTS

## What Ralph Is

Ralph is the autonomous iteration loop. When active, it intercepts Codex's Stop event and re-feeds the task prompt, keeping Codex working until it outputs a completion promise tag. Think of it as "set it and forget it" for long multi-step tasks.

**The loop:** Codex works → tries to stop → Ralph checks for promise → not found → re-injects prompt → Codex keeps working → eventually outputs `<promise>PROMISE_TAG</promise>` → Ralph detects it → loop ends cleanly.

**State file:** `.Codex/ralph/state.json` — exists = loop active, deleted = loop inactive.

## Commands

Parse the action from `$ARGUMENTS`:

### `start <task description>`

If the argument begins with "start", activate the Ralph loop:

1. Extract the task description (everything after "start ")
2. Generate a unique completion promise tag: `RALPH_<UPPERCASE_FIRST_3_WORDS>_COMPLETE`
3. Create `.Codex/ralph/state.json` with:
   ```json
   {
     "prompt": "<full task description>",
     "completion_promise": "RALPH_<TAG>_COMPLETE",
     "max_iterations": 12,
     "current_iteration": 0
   }
   ```
4. Create `.Codex/ralph/NOW.md` with the initial task state:
   ```markdown
   # Current State
   Task: <one-line task description>
   Iteration: 0/<max_iterations>
   Branch: <current git branch>

   ## Completed
   (none yet)

   ## In Progress
   - Starting: <first planned subtask>

   ## Decisions Made
   (none yet)

   ## Next Steps
   - <outline of planned approach>

   ## Blocked
   (none)
   ```
5. Ask the user for confirmation of the max_iterations (default 12, suggest 8 for small tasks, 20 for large)
6. Report to the user:
   - What Ralph will work on
   - The completion promise tag they'll see when done
   - How to check status (`/ralph status`) or stop early (`/ralph stop`)
   - That Codex will now begin working autonomously

**After creating the state file, immediately begin working on the task.**

Example:
```
/ralph start implement full SEO Cloudflare Workers integration with pixel injection and route setup
```

Creates state with prompt, promise tag `RALPH_IMPLEMENT_FULL_COMPLETE`, max_iterations 25.

### `status`

If the argument is "status" or empty:

1. Check if `.Codex/ralph/state.json` exists
2. If not: report "Ralph loop is not active."
3. If yes: read and display:
   - Task: the prompt
   - Promise tag to watch for
   - Current iteration / max iterations
   - How long it's been running (if you can derive from git log)

### `stop`

If the argument is "stop":

1. Check if `.Codex/ralph/state.json` exists
2. If not: report "Ralph loop is not active — nothing to stop."
3. If yes:
   - Delete `.Codex/ralph/state.json`
   - Delete `.Codex/ralph/NOW.md` (if it exists)
   - Report that the loop has been stopped
   - Show the last iteration count from the file before deleting
   - Remind user to run `/wrap-up` if there's committed work to document

## The Completion Promise

When Ralph is active, every response should work toward the task. When ALL criteria are met, output exactly:

```
<promise>RALPH_<TAG>_COMPLETE</promise>
```

Ralph's stop hook scans for this tag. Finding it → Ralph deletes the state file and lets Codex exit normally.

**Promise placement:** Always output the promise as the LAST line of your response when done, wrapped in `<promise>` tags. Never output it until the task is genuinely complete.

## Stuck Rule

If you've made 3+ attempts on the same subtask and it's still failing:
- Document the specific blocker in the response
- Move to a different subtask
- Note: "BLOCKED on X — moving to Y, will return"

After 3 consecutive blocked subtasks, stop the loop and report to user.

## NOW.md Maintenance

`.Codex/ralph/NOW.md` is a live scratchpad that survives context compression. Update it at these moments:

**a. START of each iteration** — update "In Progress" with the current subtask you're about to work on.

**b. After COMPLETING a subtask** — move the item from "In Progress" to "Completed". Add any relevant outcome note.

**c. When making a KEY DECISION** — append to "Decisions Made" with a one-line rationale (e.g. "Used Write instead of Edit — file had 3+ separate insertion points").

**d. When BLOCKED** — append to "Blocked" with the specific error or constraint. Be precise: include the error message or the exact constraint that's blocking.

**e. Every 3rd iteration** — re-read NOW.md fully and verify it matches actual git state. Run `git log --oneline -5` and compare to "Completed". Fix any drift before continuing.

Update NOW.md with `Write` tool (always write the full file — it's short and atomic).

## What Makes a Good Ralph Task

**Good fit:**
- Multi-file feature implementation (5+ files)
- Iterative work: implement → test → fix → repeat
- Tasks where you need to check git state between iterations
- Long pipelines where you'd otherwise need to keep re-prompting

**Not a good fit:**
- Simple single-file changes (just do it directly)
- Tasks requiring user decisions mid-stream (Ralph can't ask questions)
- Work that depends on external validation (deploy + verify)

## Example Session

```
User: /ralph start implement the full SEO crawl improvements — add BFS depth tracking, better link discovery, and dedup by canonical URL

Ralph creates state.json with:
  prompt: "implement the full SEO crawl improvements..."
  completion_promise: "RALPH_IMPLEMENT_THE_COMPLETE"
  max_iterations: 25

Ralph creates NOW.md with initial state.

Codex begins working immediately...
[Works across multiple turns, updating NOW.md each iteration]
[Eventually outputs: <promise>RALPH_IMPLEMENT_THE_COMPLETE</promise>]

Ralph stop hook detects promise → deletes state.json + NOW.md → Codex exits normally
```
