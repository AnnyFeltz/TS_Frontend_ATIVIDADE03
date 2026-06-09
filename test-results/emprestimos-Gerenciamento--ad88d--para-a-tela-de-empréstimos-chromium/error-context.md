# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emprestimos.spec.js >> Gerenciamento de Empréstimos (E2E) >> deve navegar para a tela de empréstimos
- Location: e2e\emprestimos.spec.js:21:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h2')
Expected substring: "Empréstimos"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h2')

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Gerenciamento de Empréstimos (E2E)', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   | 
  7   |     await page.fill('#login-email', 'admin@sistema.com');
  8   |     await page.fill('#login-senha', '123456');
  9   | 
  10  |     await page.getByRole('button', {
  11  |       name: 'Entrar',
  12  |     }).click();
  13  | 
  14  |     await page.waitForLoadState('networkidle');
  15  | 
  16  |     await expect(
  17  |       page.getByRole('button', { name: 'Entrar' })
  18  |     ).not.toBeVisible();
  19  |   });
  20  | 
  21  |   test('deve navegar para a tela de empréstimos', async ({ page }) => {
  22  |     await page.goto('/emprestimos');
  23  | 
> 24  |     await expect(page.locator('h2')).toContainText(
      |                                      ^ Error: expect(locator).toContainText(expected) failed
  25  |       'Empréstimos'
  26  |     );
  27  |   });
  28  | 
  29  |   test('deve abrir e fechar o modal de novo empréstimo', async ({
  30  |     page,
  31  |   }) => {
  32  |     await page.goto('/emprestimos');
  33  | 
  34  |     await page.locator('.fab').click();
  35  | 
  36  |     await expect(page.locator('.modal')).toBeVisible();
  37  | 
  38  |     await page.getByRole('button', {
  39  |       name: 'Cancelar',
  40  |     }).click();
  41  | 
  42  |     await expect(page.locator('.modal')).not.toBeVisible();
  43  |   });
  44  | 
  45  |   test('deve permitir cadastrar um empréstimo', async ({
  46  |     page,
  47  |   }) => {
  48  |     await page.goto('/emprestimos');
  49  | 
  50  |     await page.locator('.fab').click();
  51  | 
  52  |     await expect(page.locator('.modal')).toBeVisible();
  53  | 
  54  |     const livros = await page
  55  |       .locator('select[name="livro_id"] option')
  56  |       .count();
  57  | 
  58  |     const usuarios = await page
  59  |       .locator('select[name="usuario_id"] option')
  60  |       .count();
  61  | 
  62  |     expect(livros).toBeGreaterThan(1);
  63  |     expect(usuarios).toBeGreaterThan(1);
  64  | 
  65  |     await page.selectOption(
  66  |       'select[name="livro_id"]',
  67  |       { index: 1 }
  68  |     );
  69  | 
  70  |     await page.selectOption(
  71  |       'select[name="usuario_id"]',
  72  |       { index: 1 }
  73  |     );
  74  | 
  75  |     const data = new Date();
  76  |     data.setDate(data.getDate() + 7);
  77  | 
  78  |     await page.fill(
  79  |       'input[name="data_devolucao_prevista"]',
  80  |       data.toISOString().split('T')[0]
  81  |     );
  82  | 
  83  |     const responsePromise = page.waitForResponse(
  84  |       resp =>
  85  |         resp.url().includes('/emprestimos/criar') &&
  86  |         resp.request().method() === 'POST' &&
  87  |         resp.ok()
  88  |     );
  89  | 
  90  |     await page.getByRole('button', {
  91  |       name: 'Confirmar',
  92  |     }).click();
  93  | 
  94  |     await responsePromise;
  95  | 
  96  |     await expect(page.locator('.modal')).not.toBeVisible();
  97  |   });
  98  | 
  99  |   test('deve permitir editar um empréstimo', async ({
  100 |     page,
  101 |   }) => {
  102 |     await page.goto('/emprestimos');
  103 | 
  104 |     const cards = page.locator('.list-card');
  105 | 
  106 |     if ((await cards.count()) === 0) {
  107 |       test.skip();
  108 |       return;
  109 |     }
  110 | 
  111 |     const primeiroCard = cards.first();
  112 | 
  113 |     await primeiroCard
  114 |       .locator('.btn--secondary')
  115 |       .first()
  116 |       .click();
  117 | 
  118 |     await expect(page.locator('.modal')).toBeVisible();
  119 | 
  120 |     const novaData = new Date();
  121 |     novaData.setDate(novaData.getDate() + 15);
  122 | 
  123 |     await page.fill(
  124 |       'input[name="data_devolucao_prevista"]',
```