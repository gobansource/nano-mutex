/**
 * Mutex type definition
 */
export type Mutex = {
  /**
   * Acquires exclusive access to a resource
   * @returns A promise that resolves to a release function
   */
  acquire(): Promise<() => void>;
};
