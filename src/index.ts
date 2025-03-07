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
  "faraz-feeling",
  "This tool is used to get Faraz's current feelings",
  {weather: z.string().describe("The current weather")},
  async (params) => {
    const { weather } = params;
    // faraz is happy when the weather is sunny
    const isSad = weather === "nuclear winter";
    return {
      content: [{ type: "text", text: `Faraz is feeling ${isSad ? "sad" : "happy"} in ${weather}` }],
    };
  }
);
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
