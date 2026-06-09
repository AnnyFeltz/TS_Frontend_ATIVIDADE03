# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emprestimos.spec.js >> Gerenciamento de Empréstimos (E2E) >> deve abrir e fechar o modal de novo empréstimo
- Location: e2e\emprestimos.spec.js:29:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.fab')

```

# Test source

```ts
  1 | 
    |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
```