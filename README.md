## Tavily MCP Server

This repository contains a simple MCP server that uses the Tavily API to answer questions. The project is bare bone and is intended to showcase base MCP capabilities for Cursor IDE.


First setup dependencies using `pnpm`:

```bash
pnpm i
```

then run the build:

```bash
pnpm run build
```

then prepare your wrapper script:

```bash
wrapper_script.sh
```

Finally, provide path to the wrapper in Cursor settings (provide full path for command to work)


E.g.,

```bash
/path/to/wrapper_script.sh
```


For debugging, you can use the following command:

```bash
debug_script.sh
```


