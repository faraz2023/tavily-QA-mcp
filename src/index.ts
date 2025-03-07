#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { tavily, TavilyResult } from "@tavily/core";

// Create an MCP server
const server = new McpServer({
  name: "Faraz's MCP Server",
  version: "1.0.0",
});

// Check for required environment variables
if (!process.env.TAVILY_API_KEY) {
  console.error('Error: TAVILY_API_KEY environment variable is not set');
  process.exit(1);
}

// Initialize Tavily client
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

server.tool(
  "tavily-question-answer",
  "This tool is used to answer questions using Tavily",
  {question: z.string().describe("The question to answer")},
  async (params) => {
    try {
      const { question } = params;
      
      // Execute the search query using Tavily
      const response = await tvly.search(question);
      
      // Combine all results content
      const combinedContent = response.results
        .map((r: TavilyResult) => r.content)
        .filter((content: string | null): content is string => content !== null)
        .join('\n\n');
      
      // Return the combined content
      return {
        content: [{ 
          type: "text", 
          text: combinedContent || "No relevant information found."
        }],
      };
    } catch (error: any) {
      console.error('Tavily API Error:', error);
      return {
        content: [{ type: "text", text: `Error: ${error?.message || 'Unknown error occurred'}` }],
      };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
