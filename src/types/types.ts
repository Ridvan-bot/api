// Define the type for the in-memory fallback store
export type InMemoryStoreEntry = {
    count: number;
    resetTime: number;
  };

// Type for the id.json file
// IdData is an object with string keys and number values
// Example: { id: 1, groupId: 2 }
export  type IdData = {
    [key: string]: number;
  };
  