# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: livros.spec.js >> Gerenciamento de Livros (E2E) >> deve navegar até a tela de livros e listar o acervo
- Location: e2e\livros.spec.js:17:3

# Error details

```
Error: page.goto: Page crashed
Call log:
  - navigating to "http://localhost:5173/livros", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Gerenciamento de Livros (E2E)', () => {
  4  |   // test('deve permitir login e navegar para o dashboard', async ({ page }) => {
  5  |   //   // 1. Vai para a página inicial (Login)
  6  |   //   await page.goto('/livros');
  7  | 
  8  |   //   // 2. Realiza o login (usando os dados do nosso mock de admin)
  9  |   //   await page.fill('input[type="email"]', 'admin@sistema.com');
  10 |   //   await page.fill('input[type="password"]', '123456');
  11 |   //   await page.click('button[type="submit"]');
  12 | 
  13 |   //   // 3. Espera chegar no Dashboard (garante que logou)
  14 |   //   await expect(page).toHaveURL(/\/dashboard|$/);
  15 |   // });
  16 | 
  17 |   test('deve navegar até a tela de livros e listar o acervo', async ({ page }) => {
  18 |     // 1. Navega para livros a partir do menu ou via URL
> 19 |     await page.goto('/livros', { waitUntil: 'domcontentloaded' });
     |                ^ Error: page.goto: Page crashed
  20 | 
  21 |     // 2. Verifica se o título da página está correto
  22 |     await expect(page.locator('h2')).toContainText('Acervo de Livros');
  23 |   });
  24 | 
  25 | //   test('deve permitir adicionar um novo livro e encontrá-lo na lista', async ({ page }) => {
  26 | //     const tituloAleatorio = `Livro E2E ${Math.floor(Math.random() * 1000)}`;
  27 | 
  28 | //     await page.goto('/livros');
  29 | 
  30 | //     // 1. Clicar no FAB (+) para abrir o modal
  31 | //     await page.locator('.fab').click();
  32 | 
  33 | //     // 2. Preencher o formulário no modal
  34 | //     await page.fill('input[name="titulo"]', tituloAleatorio);
  35 | //     await page.fill('input[name="autor"]', 'Automação Playwright');
  36 | 
  37 | //     // 3. Salvar
  38 | //     await page.click('button[type="submit"]');
  39 | 
  40 | //     // 4. Verificar se o novo livro aparece na lista
  41 | //     await expect(page.getByText(tituloAleatorio)).toBeVisible();
  42 | //   });
  43 | 
  44 | //   test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
  45 | //     await page.goto('/livros');
  46 | 
  47 | //     await page.locator('.fab').click();
  48 | //     await expect(page.locator('.modal')).toBeVisible();
  49 | 
  50 | //     await page.click('button:has-text("Cancelar")');
  51 | //     await expect(page.locator('.modal')).not.toBeVisible();
  52 | //   });
  53 | });
```