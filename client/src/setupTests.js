import '@testing-library/jest-dom';

// Mock window.confirm globally
Object.defineProperty(window, 'confirm', {
  value: jest.fn(() => true),
  writable: true
});

// Mock window.alert
Object.defineProperty(window, 'alert', {
  value: jest.fn(),
  writable: true
});
