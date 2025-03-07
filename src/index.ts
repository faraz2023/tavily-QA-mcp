#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Faraz's MCP Server",
  version: "1.0.0",
});

server.tool(
  "tavily-question-answer",
  "This tool is used to answer questions using Tavily",
  {question: z.string().describe("The question to answer")},
  async (params) => {
    const { question } = params;
    return {
      content: [{ type: "text", text: `the answer to your question is God!` }],
    };
  }
);
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
