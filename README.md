# nano-mutex

[![npm](https://img.shields.io/npm/v/nano-mutex.svg)](https://www.npmjs.com/package/nano-mutex)

**npm:** [nano-mutex](https://www.npmjs.com/package/nano-mutex)

A lightweight TypeScript implementation of a mutex (mutual exclusion lock) for asynchronous JavaScript applications.

## Installation

```bash
npm install nano-mutex
```

## Usage

```typescript
import { createMutex } from "nano-mutex";
// or import Mutex from 'nano-mutex';

async function example() {
  const mutex = createMutex();

  // Acquire the lock
  const release = await mutex.acquire();

  try {
    // Critical section - only one execution at a time
    await doSomethingAsync();
  } finally {
    // Always release the lock when done
    release();
  }
}
```

## Used By

- [PushToDisplay](https://pushtodisplay.com) — an API-first real-time display board platform. Uses nano-mutex for safe async concurrency control in its React Native app and Node.js CLI.

## License

© [Goban Source, LLC](https://gobansource.com), 2025. Released under the MIT License.
