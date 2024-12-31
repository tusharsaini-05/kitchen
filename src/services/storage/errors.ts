export class StorageError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'StorageError';
  }
}

export const handleStorageError = (error: any): null => {
  console.error('Storage operation failed:', error);
  return null;
};