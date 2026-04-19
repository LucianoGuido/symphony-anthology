# @symphonyui/anthology-mcp Preview

`@symphonyui/anthology-mcp` is the MCP companion for Symphony Anthology.

It exposes the Anthology contract to Claude Code and other MCP-compatible clients through structured resources and tools instead of loose prompt memory.

## Current status

This package exists locally in the repo as a publish-ready package and is not published yet from this environment.

## What it exposes today

Resources:

- `anthology://tokens`
- `anthology://schema`
- `anthology://schema-presets`
- `anthology://recipes`
- `anthology://recipes/<slug>`
- `anthology://verify/checks`

Tools:

- `anthology_get_tokens`
- `anthology_get_schema`
- `anthology_list_recipes`
- `anthology_get_recipe`
- `anthology_verify_path`
- `anthology_suggest_fix`

## Local usage

Run the server locally:

```bash
node packages/anthology-mcp/bin/anthology-mcp.mjs
```

Claude Code config example:

```json
{
  "mcpServers": {
    "anthology": {
      "command": "node",
      "args": [
        "/absolute/path/to/symphony-anthology/packages/anthology-mcp/bin/anthology-mcp.mjs"
      ]
    }
  }
}
```

## Intended usage after publishing

```bash
npx @symphonyui/anthology-mcp
```

Point the MCP client at the server and let it read Anthology tokens, schema, recipes, and verify findings directly.
