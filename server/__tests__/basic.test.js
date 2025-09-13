// Basic test to ensure Jest is working
describe('Basic Test Suite', () => {
  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should verify Node.js environment', () => {
    expect(typeof process).toBe('object');
    expect(process.env.NODE_ENV).toBeDefined();
  });
});
