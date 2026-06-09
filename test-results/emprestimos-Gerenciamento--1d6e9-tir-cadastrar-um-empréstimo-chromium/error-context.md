# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emprestimos.spec.js >> Gerenciamento de Empréstimos (E2E) >> deve permitir cadastrar um empréstimo
- Location: e2e\emprestimos.spec.js:32:3

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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Gerenciamento de Empréstimos (E2E)', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   | 
  7   |     await page.fill('input[type="email"]', 'admin@sistema.com');
  8   |     await page.fill('input[type="password"]', '123456');
  9   |     await page.click('button[type="submit"]');
  10  | 
  11  |     await expect(page).toHaveURL(/\/dashboard|$/);
  12  |   });
  13  | 
  14  |   test('deve navegar para a tela de empréstimos', async ({ page }) => {
  15  |     await page.goto('/emprestimos');
  16  | 
  17  |     await expect(page.locator('h2')).toContainText('Empréstimos');
  18  |   });
  19  | 
  20  |   test('deve abrir e fechar o modal de novo empréstimo', async ({ page }) => {
  21  |     await page.goto('/emprestimos');
  22  | 
  23  |     await page.locator('.fab').click();
  24  | 
  25  |     await expect(page.locator('.modal')).toBeVisible();
  26  | 
  27  |     await page.click('button:has-text("Cancelar")');
  28  | 
  29  |     await expect(page.locator('.modal')).not.toBeVisible();
  30  |   });
  31  | 
  32  |   test('deve permitir cadastrar um empréstimo', async ({ page }) => {
  33  |     await page.goto('/emprestimos');
  34  | 
> 35  |     await page.locator('.fab').click();
      |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  36  | 
  37  |     const quantidade = await page
  38  |     .locator('select[name="livro_id"] option')
  39  |     .count();
  40  | 
  41  |     console.log('Quantidade:', quantidade);
  42  | 
  43  |     await page.selectOption('select[name="livro_id"]', { index: 1 });
  44  | 
  45  |     await page.selectOption('select[name="usuario_id"]', { index: 1 });
  46  | 
  47  |     const data = new Date();
  48  |     data.setDate(data.getDate() + 7);
  49  | 
  50  |     const dataFormatada = data.toISOString().split('T')[0];
  51  | 
  52  |     await page.fill(
  53  |       'input[name="data_devolucao_prevista"]',
  54  |       dataFormatada
  55  |     );
  56  | 
  57  |     const responsePromise = page.waitForResponse(
  58  |       resp =>
  59  |         resp.url().includes('/emprestimos') &&
  60  |         resp.request().method() === 'POST' &&
  61  |         resp.status() >= 200 &&
  62  |         resp.status() < 300
  63  |     );
  64  | 
  65  |     await page.getByRole('button', {
  66  |       name: 'Confirmar',
  67  |     }).click();
  68  | 
  69  |     await responsePromise;
  70  | 
  71  |     await expect(page.locator('.modal')).not.toBeVisible();
  72  |   });
  73  | 
  74  |   test('deve permitir editar um empréstimo', async ({ page }) => {
  75  |     await page.goto('/emprestimos');
  76  | 
  77  |     await page.waitForSelector('.list-card');
  78  | 
  79  |     const primeiroCard = page.locator('.list-card').first();
  80  | 
  81  |     await primeiroCard
  82  |       .locator('.btn--secondary')
  83  |       .click();
  84  | 
  85  |     await expect(page.locator('.modal')).toBeVisible();
  86  | 
  87  |     const novaData = new Date();
  88  |     novaData.setDate(novaData.getDate() + 15);
  89  | 
  90  |     await page.fill(
  91  |       'input[name="data_devolucao_prevista"]',
  92  |       novaData.toISOString().split('T')[0]
  93  |     );
  94  | 
  95  |     const responsePromise = page.waitForResponse(
  96  |       resp =>
  97  |         resp.url().includes('/emprestimos') &&
  98  |         resp.request().method() === 'PUT' &&
  99  |         resp.status() >= 200 &&
  100 |         resp.status() < 300
  101 |     );
  102 | 
  103 |     await page.getByRole('button', {
  104 |       name: 'Confirmar',
  105 |     }).click();
  106 | 
  107 |     await responsePromise;
  108 | 
  109 |     await expect(page.locator('.modal')).not.toBeVisible();
  110 |   });
  111 | 
  112 |   test('deve permitir registrar devolução', async ({ page }) => {
  113 |     await page.goto('/emprestimos');
  114 | 
  115 |     const botaoDevolver = page
  116 |       .locator('button:has-text("Devolver")')
  117 |       .first();
  118 | 
  119 |     if (await botaoDevolver.count()) {
  120 |       await botaoDevolver.click();
  121 | 
  122 |       await expect(page.locator('.modal')).toBeVisible();
  123 | 
  124 |       const responsePromise = page.waitForResponse(
  125 |         resp =>
  126 |           resp.url().includes('/emprestimos') &&
  127 |           ['PUT', 'PATCH'].includes(resp.request().method()) &&
  128 |           resp.status() >= 200 &&
  129 |           resp.status() < 300
  130 |       );
  131 | 
  132 |       await page.click('.modal button:has-text("Confirmar")');
  133 | 
  134 |       await responsePromise;
  135 | 
```