/**
 * Simple mutex implementation for locking using functional programming approach
 */
import { type Mutex } from "./types";

/**
 * Creates a mutex (mutual exclusion lock)
 */
export const createMutex = (): Mutex => {
  // Internal state
  let locked = false;
  const queue: Array<() => void> = [];

  /**
   * Release function that unlocks the mutex
   */
  const release = (): void => {
    if (queue.length > 0) {
      const next = queue.shift();
      if (next) {
        next();
      }
    } else {
      locked = false;
    }
  };

  /**
   * Acquires the mutex lock
   * @returns A promise that resolves to a release function
   */
  const acquire = (): Promise<() => void> => {
    return new Promise<() => void>((resolve) => {
      if (!locked) {
        locked = true;
        resolve(release);
      } else {
        queue.push(() => {
          resolve(release);
        });
      }
    });
  };

  return {
    acquire,
  };
};

// For backward compatibility with default export
export default {
  createMutex,
};

// Re-export types
export * from "./types";
