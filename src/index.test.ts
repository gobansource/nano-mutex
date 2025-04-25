import { createMutex, type Mutex } from "./index";

describe("Mutex", () => {
  test("createMutex should return a mutex object with acquire method", () => {
    const mutex = createMutex();
    expect(mutex).toBeDefined();
    expect(typeof mutex.acquire).toBe("function");
  });

  test("acquire should return a release function", async () => {
    const mutex = createMutex();
    const release = await mutex.acquire();
    expect(typeof release).toBe("function");
    release();
  });

  test("mutex should prevent concurrent access", async () => {
    const mutex = createMutex();
    const executionOrder: number[] = [];

    // Create a helper function that simulates async work
    const doWork = async (id: number, delay: number) => {
      const release = await mutex.acquire();
      executionOrder.push(id);
      await new Promise((resolve) => setTimeout(resolve, delay));
      executionOrder.push(id);
      release();
    };

    // Start multiple concurrent operations
    const op1 = doWork(1, 50);
    const op2 = doWork(2, 10);

    // Wait for all operations to complete
    await Promise.all([op1, op2]);

    // Check that operations ran sequentially, not interleaved
    expect(executionOrder).toEqual([1, 1, 2, 2]);
  });

  test("release should process next queued operation", async () => {
    const mutex = createMutex();
    const executionOrder: number[] = [];

    // Acquire first lock
    const release1 = await mutex.acquire();
    executionOrder.push(1);

    // Try to acquire second lock (will be queued)
    const acquirePromise = mutex.acquire().then((release) => {
      executionOrder.push(2);
      release();
      executionOrder.push(3);
    });

    // Short delay to ensure the second acquire is queued
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Release the first lock
    release1();

    // Wait for the second operation to complete
    await acquirePromise;

    // Check the execution order
    expect(executionOrder).toEqual([1, 2, 3]);
  });
});
