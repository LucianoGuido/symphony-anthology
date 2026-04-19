# Anthology MCP

`anthology-mcp` is the MCP layer for Symphony Anthology.

It gives Claude Code and other MCP-compatible clients direct access to Anthology's machine-readable contract instead of relying on free-form prompt memory.

## Current status

Today it exists in this repo as the local, publish-ready package [`@symphonyui/anthology-mcp`](../packages/anthology-mcp/README.md).

It is not published yet from this environment.

This repo also includes shared Claude Code project config:

- [../.mcp.json](../.mcp.json) registers the `anthology` server for the repository
- [../.claude/settings.json](../.claude/settings.json) auto-approves that project MCP server and allows the shipped Anthology MCP tools
- `.claude/settings.local.json` stays available for personal overrides and is gitignored

## What it exposes

### Resources

- `anthology://tokens`
- `anthology://schema`
- `anthology://schema-presets`
- `anthology://recipes`
- `anthology://recipes/<slug>`
- `anthology://verify/checks`

### Tools

- `anthology_get_tokens`
- `anthology_get_schema`
- `anthology_list_recipes`
- `anthology_get_recipe`
- `anthology_verify_path`
- `anthology_suggest_fix`

## Local usage

Run the server:

```bash
node packages/anthology-mcp/bin/anthology-mcp.mjs
```

Example Claude Code config:

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

In this repository, most developers should not need to add that manually because the shared `.mcp.json` already does it.

## Why this matters

- models can read Anthology tokens and schema directly
- recipes become addressable implementation knowledge instead of loose markdown links
- verify findings can map to stable Anthology-native repair guidance
- Claude Code can work against the same contract your team uses in docs and code review

## Position in the Symphony ecosystem

Anthology MCP is the Anthology-specific MCP layer. It gives coding agents and developer tools direct access to Anthology's implementation contract.

It is separate from Duet MCP, which is the higher-level Symphony orchestration layer in development for coordinating design context, model workflows, Anthology implementation contracts, Conservatory findings, and controlled shipping actions. Duet MCP lives above the Anthology contract rather than replacing it.

In short:

- Anthology MCP exposes the Anthology contract
- Duet MCP orchestrates cross-product workflows across Symphony

## Current boundary

This preview server is intentionally narrow:

- stdio MCP only
- Anthology resources and tools only
- `anthology_verify_path` is limited to files inside the current project
- no auto schema injection
- no framework adapters package family
- npm publishing is still a separate release step
