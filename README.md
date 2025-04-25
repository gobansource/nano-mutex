# simple-mutex

A lightweight TypeScript implementation of a mutex (mutual exclusion lock) for asynchronous JavaScript applications.

## Installation

```bash
npm install simple-mutex
```

## Usage

```typescript
import { createMutex } from "simple-mutex";
// or import Mutex from 'simple-mutex';

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

MIT
