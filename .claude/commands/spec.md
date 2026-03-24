---
description: Create a feature spec file from a short idea
argument-hint: Short feature description
allowed-tools: Read, Write, Glob
---

You are helping to spin up a new feature spec for this application from a short idea provided below. Always adhere to any rules or requirements set out in any CLAUDE.md files when responding.

User input: $ARGUMENTS

## High level behavior

Your job will be to turn the user input into:

- A human friendly feature title in Title Case
- A feature slug in kebab-case (e.g. world-map-bloc1)
- A detailed markdown spec file saved under \_specs/

Then save the spec file to disk and print a short summary of what you did.

## Step 1. Check for uncommitted work

Check the current Git status. If there are uncommitted, unstaged, or untracked files, warn the user and ask them to commit or stash before proceeding. Do NOT abort — just warn and continue if the user confirms.

## Step 2. Parse the arguments

From $ARGUMENTS, extract:

1. feature_title — short, human readable, Title Case. Example: "World Map Interactive Bloc 1"
2. feature_slug — lowercase, kebab-case, only a-z 0-9 and -, max 40 chars. Example: world-map-bloc1

If you cannot infer a sensible title and slug, ask the user to clarify.

## Step 3. Draft the spec

Create a markdown spec using the exact structure from @\_specs/template.md.
Save it as \_specs/<feature_slug>.md.

Rules:

- Maximum 40 lines total. If the feature requires more, it is too large — say so and suggest splitting.
- No code examples in the spec. Behavior only, not implementation.
- Stack constraints must be specific to this feature, not a repeat of CLAUDE.md globals.
- Out of scope must be explicit — list at least one item.

## Step 4. Output to the user

After saving, respond with exactly:

Spec file: \_specs/<feature_slug>.md  
Title: <feature_title>

Do not repeat the full spec in chat unless the user explicitly asks.
