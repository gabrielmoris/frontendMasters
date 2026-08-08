#!/bin/bash
# typecheck-gate.sh
# Blocks git commit commands if npm run typecheck fails

# Read the Bash tool-call payload from stdin
payload=$(cat)

# Extract the command from the JSON payload
# The payload format is: {"command": "git commit...", ...}
command=$(echo "$payload" | jq -r '.command // empty')

# Check if this is a git commit command
if [[ "$command" == *"git commit"* ]]; then
  # Run typecheck in the project directory
  npm run typecheck > /dev/null 2>&1
  typecheck_status=$?

  if [ $typecheck_status -ne 0 ]; then
    # Typecheck failed - deny the commit and show errors
    echo "Typecheck failed. Run 'npm run typecheck' to see errors."
    npm run typecheck
    echo '{"allow": false, "message": "Commit blocked: typecheck failed"}'
    exit 1
  fi
fi

# Allow the command to proceed
echo '{"allow": true}'
exit 0
