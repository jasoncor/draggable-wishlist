/// <reference types="vitest" />
import '@testing-library/jest-dom';

// Extend Vitest's expect method with jest-dom matchers
declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
  interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
}