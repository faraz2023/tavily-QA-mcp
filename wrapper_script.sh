#!/bin/bash

# Load all environment variables from .env file
curr_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ -f "$curr_dir/.env" ]; then
    export $(cat "$curr_dir/.env" | grep -v '^#' | xargs)
    echo "Loaded environment variables: $TAVILY_API_KEY"
else
    echo "Error: .env file not found"
    exit 1
fi

# Get the directory where the wrapper script is located
full_path="$curr_dir/dist/index.js"
echo "Executing $full_path"
node "$full_path"