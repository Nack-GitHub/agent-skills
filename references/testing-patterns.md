# Testing Patterns Reference

Quick reference for common testing patterns across the stack. Use alongside the `test-driven-development` skill.

## Table of Contents

- [Test Structure (Arrange-Act-Assert)](#test-structure-arrange-act-assert)
- [Test Naming Conventions](#test-naming-conventions)
- [Common Assertions](#common-assertions)
- [Mocking Patterns](#mocking-patterns)
- [React/Component Testing](#reactcomponent-testing)
- [API / Integration Testing](#api--integration-testing)
- [E2E Testing (Playwright)](#e2e-testing-playwright)
- [Test Anti-Patterns](#test-anti-patterns)
- [Black-Box Code-Level Design Techniques](#black-box-code-level-design-techniques)

## Test Structure (Arrange-Act-Assert)

```typescript
it('describes expected behavior', () => {
  // Arrange: Set up test data and preconditions
  const input = { title: 'Test Task', priority: 'high' };

  // Act: Perform the action being tested
  const result = createTask(input);

  // Assert: Verify the outcome
  expect(result.title).toBe('Test Task');
  expect(result.priority).toBe('high');
  expect(result.status).toBe('pending');
});
```

## Test Naming Conventions

```typescript
// Pattern: [unit] [expected behavior] [condition]
describe('TaskService.createTask', () => {
  it('creates a task with default pending status', () => {});
  it('throws ValidationError when title is empty', () => {});
  it('trims whitespace from title', () => {});
  it('generates a unique ID for each task', () => {});
});
```

## Common Assertions

```typescript
// Equality
expect(result).toBe(expected);           // Strict equality (===)
expect(result).toEqual(expected);        // Deep equality (objects/arrays)
expect(result).toStrictEqual(expected);  // Deep equality + type matching

// Truthiness
expect(result).toBeTruthy();
expect(result).toBeFalsy();
expect(result).toBeNull();
expect(result).toBeDefined();
expect(result).toBeUndefined();

// Numbers
expect(result).toBeGreaterThan(5);
expect(result).toBeLessThanOrEqual(10);
expect(result).toBeCloseTo(0.3, 5);      // Floating point

// Strings
expect(result).toMatch(/pattern/);
expect(result).toContain('substring');

// Arrays / Objects
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(object).toHaveProperty('key', 'value');

// Errors
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(ValidationError);
expect(() => fn()).toThrow('specific message');

// Async
await expect(asyncFn()).resolves.toBe(value);
await expect(asyncFn()).rejects.toThrow(Error);
```

## Mocking Patterns

### Mock Functions

```typescript
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: 'test' });
mockFn.mockImplementation((x) => x * 2);

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(3);
```

### Mock Modules

```typescript
// Mock an entire module
jest.mock('./database', () => ({
  query: jest.fn().mockResolvedValue([{ id: 1, title: 'Test' }]),
}));

// Mock specific exports
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  generateId: jest.fn().mockReturnValue('test-id'),
}));
```

### Mock at Boundaries Only

```
Mock these:                    Don't mock these:
├── Database calls             ├── Internal utility functions
├── HTTP requests              ├── Business logic
├── File system operations     ├── Data transformations
├── External API calls         ├── Validation functions
└── Time/Date (when needed)    └── Pure functions
```

## React/Component Testing

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('TaskForm', () => {
  it('submits the form with entered data', async () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    // Find elements by accessible role/label (not test IDs)
    await screen.findByRole('textbox', { name: /title/i });
    fireEvent.change(screen.getByRole('textbox', { name: /title/i }), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ title: 'New Task' });
    });
  });

  it('shows validation error for empty title', async () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });
});
```

## API / Integration Testing

```typescript
import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/tasks', () => {
  it('creates a task and returns 201', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .set('Authorization', `Bearer ${testToken}`)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      title: 'Test Task',
      status: 'pending',
    });
  });

  it('returns 422 for invalid input', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: '' })
      .set('Authorization', `Bearer ${testToken}`)
      .expect(422);

    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 401 without authentication', async () => {
    await request(app)
      .post('/api/tasks')
      .send({ title: 'Test' })
      .expect(401);
  });
});
```

## E2E Testing (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('user can create and complete a task', async ({ page }) => {
  // Navigate and authenticate
  await page.goto('/');
  await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
  await page.getByLabel(/password/i).fill('testpass123');
  await page.getByRole('button', { name: /log in/i }).click();

  // Create a task
  await page.getByRole('button', { name: /new task/i }).click();
  await page.getByRole('textbox', { name: /title/i }).fill('Buy groceries');
  await page.getByRole('button', { name: /create/i }).click();

  // Verify task appears
  const task = page.getByRole('listitem', { name: /buy groceries/i });
  await expect(task).toBeVisible();

  // Complete the task
  await task.getByRole('checkbox', { name: /complete buy groceries/i }).check();
  await expect(task).toHaveCSS('text-decoration-line', 'line-through');
});
```

## Test Anti-Patterns

| Anti-Pattern | Problem | Better Approach |
|---|---|---|
| Testing implementation details | Breaks on refactor | Test inputs/outputs |
| Snapshot everything | No one reviews snapshot diffs | Assert specific values |
| Shared mutable state | Tests pollute each other | Setup/teardown per test |
| Testing third-party code | Wastes time, not your bug | Mock the boundary |
| Skipping tests to pass CI | Hides real bugs | Fix or delete the test |
| Using `test.skip` permanently | Dead code | Remove or fix it |
| Overly broad assertions | Doesn't catch regressions | Be specific |
| No async error handling | Swallowed errors, false passes | Always `await` async tests |

## Black-Box Code-Level Design Techniques

Apply these 4 black-box techniques when designing unit tests to ensure robust and comprehensive input coverage.

### 1. Equivalence Partitioning (EP)

Divide input domain data into partition classes of valid and invalid values. Test one representative value from each class.

```typescript
// System under test: validates percentage value (0 to 100)
function validatePercentage(value: number): boolean {
  if (value < 0 || value > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }
  return true;
}

describe('validatePercentage - Equivalence Partitioning', () => {
  // Partition 1: Valid values [0, 100] -> Representative: 50
  it('accepts a representative valid percentage', () => {
    expect(validatePercentage(50)).toBe(true);
  });

  // Partition 2: Invalid low values (< 0) -> Representative: -15
  it('rejects a representative negative percentage', () => {
    expect(() => validatePercentage(-15)).toThrow();
  });

  // Partition 3: Invalid high values (> 100) -> Representative: 120
  it('rejects a representative percentage above 100', () => {
    expect(() => validatePercentage(120)).toThrow();
  });
});
```

### 2. Boundary Value Analysis (BVA)

Test the extreme boundaries of input domains. For any boundary \( B \), test \( B \), \( B - 1 \), and \( B + 1 \).

```typescript
// System under test: checks if user is of legal age (18 or older)
function isLegalAge(age: number): boolean {
  return age >= 18;
}

describe('isLegalAge - Boundary Value Analysis', () => {
  // Boundary value: 18
  
  it('verifies exact boundary (18)', () => {
    expect(isLegalAge(18)).toBe(true); // On boundary
  });

  it('verifies just below boundary (17)', () => {
    expect(isLegalAge(17)).toBe(false); // Boundary - 1
  });

  it('verifies just above boundary (19)', () => {
    expect(isLegalAge(19)).toBe(true); // Boundary + 1
  });
});
```

### 3. Decision Table Testing

Map all true/false input combinations to capture complex business logic rules.

```typescript
// System under test: Loan approval rules
// Rule 1: High income && High credit score -> Approved
// Rule 2: Low income && High credit score && Co-signer -> Approved
// Otherwise: Rejected
interface LoanApplication {
  highIncome: boolean;
  highCreditScore: boolean;
  hasCosigner: boolean;
}

function approveLoan(app: LoanApplication): boolean {
  if (app.highIncome && app.highCreditScore) return true;
  if (!app.highIncome && app.highCreditScore && app.hasCosigner) return true;
  return false;
}

describe('approveLoan - Decision Table Testing', () => {
  // Map combinations of: [highIncome, highCreditScore, hasCosigner]
  
  it('Rule 1: Approved with high income and high credit score', () => {
    expect(approveLoan({ highIncome: true, highCreditScore: true, hasCosigner: false })).toBe(true);
  });

  it('Rule 2: Approved with low income, high credit, and co-signer', () => {
    expect(approveLoan({ highIncome: false, highCreditScore: true, hasCosigner: true })).toBe(true);
  });

  it('Rule 3: Rejected with low income, high credit, but no co-signer', () => {
    expect(approveLoan({ highIncome: false, highCreditScore: true, hasCosigner: false })).toBe(false);
  });

  it('Rule 4: Rejected with high income, low credit, and no co-signer', () => {
    expect(approveLoan({ highIncome: true, highCreditScore: false, hasCosigner: false })).toBe(false);
  });
});
```

### 4. State Transition Testing

Test stateful transitions by verifying valid state changes and checking that invalid transitions are blocked.

```typescript
// System under test: Order status state machine
// Transitions: PENDING -> SHIPPED -> DELIVERED
// CANCELLED can only transition from PENDING
enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  CANCELLED
}

class Order {
  public state: OrderStatus = OrderStatus.PENDING;

  ship() {
    if (this.state !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be shipped');
    }
    this.state = OrderStatus.SHIPPED;
  }

  cancel() {
    if (this.state !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be cancelled');
    }
    this.state = OrderStatus.CANCELLED;
  }
}

describe('Order State Transitions', () => {
  it('transitions successfully from PENDING to SHIPPED', () => {
    const order = new Order();
    order.ship();
    expect(order.state).toBe(OrderStatus.SHIPPED);
  });

  it('blocks invalid transition from SHIPPED to CANCELLED', () => {
    const order = new Order();
    order.ship();
    expect(() => order.cancel()).toThrow('Only pending orders can be cancelled');
    expect(order.state).toBe(OrderStatus.SHIPPED); // State remains SHIPPED
  });
});
```
