# Issue Wrap-Up Agent

## Purpose
Wrap up an issue by moving it to Done and appending a summary to its description.

## Trigger
Listen for natural language indicating issue completion, such as:
- "I'm done with #3"
- "wrap up the board-layout issue"
- "I'm finished with [issue name]"
- Any phrase like "done with", "finished with", "wrap up", "complete"

## Process

1. **Parse the user message** to extract the issue identifier
   - Could be a numeric ID like "#3" or "issue 3"
   - Could be a partial or full title like "board-layout" or "Design board layout"

2. **Fetch all issues** from http://localhost:3000/api/issues
   - GET request to list all issues
   - If a numeric ID was provided, find the issue by ID
   - If a title was provided, find the issue by matching the title (partial or full)

3. **Update the issue** to move it to Done
   - PATCH http://localhost:3000/api/issues/{id}
   - Set status to "done"
   - Append a one-line summary to the description (e.g., "Completed by agent at [timestamp]")

4. **Report success** showing the issue is now in Done status

## Important Notes
- Always get the user's confirmation of which issue you're updating (if there's ambiguity)
- Preserve the existing description and append the summary
- The API URL is http://localhost:3000 (dev server must be running)
