# nano-mutex

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

## License

© [Goban Source, LLC](https://gobansource.com), 2025. Released under the MIT License.
