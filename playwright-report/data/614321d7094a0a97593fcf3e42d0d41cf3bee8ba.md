# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: usuarios.spec.js >> Gerenciamento de Usuários (E2E) >> Testes que precisam estar autenticados primeiro >> deve permitir excluir usuário
- Location: e2e\usuarios.spec.js:64:5

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('.list-card')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('.list-card')
    9 × locator resolved to <div class="list-card">…</div>
      - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - heading [level=1]
      - generic [ref=e6]:
        - button "Alternar tema" [ref=e7] [cursor=pointer]:
          - img [ref=e8]
        - button "Sair" [ref=e10] [cursor=pointer]:
          - img [ref=e11]
  - generic [ref=e15]:
    - generic [ref=e16]:
      - heading "Gestão de Usuários" [level=2] [ref=e17]
      - paragraph [ref=e18]: Controle de acesso e membros da biblioteca
    - generic [ref=e19]:
      - img [ref=e20]
      - generic [ref=e22]: Erro ao excluir usuário.
      - button [ref=e23] [cursor=pointer]:
        - img [ref=e24]
    - generic [ref=e28]:
      - generic [ref=e30]:
        - heading [level=3]
        - img [ref=e32]
      - generic [ref=e36]:
        - button "Editar" [ref=e37] [cursor=pointer]:
          - img [ref=e38]
          - text: Editar
        - button "Excluir" [ref=e40] [cursor=pointer]:
          - img [ref=e41]
          - text: Excluir
    - button [ref=e44] [cursor=pointer]:
      - img [ref=e45]
  - navigation "Navegação principal" [ref=e46]:
    - generic [ref=e47]:
      - link "Livros" [ref=e48] [cursor=pointer]:
        - /url: /livros
        - img [ref=e50]
        - generic [ref=e52]: Livros
      - link "Empréstimos" [ref=e53] [cursor=pointer]:
        - /url: /emprestimos
        - img [ref=e55]
        - generic [ref=e58]: Empréstimos
      - link "Início" [ref=e59] [cursor=pointer]:
        - /url: /
        - img [ref=e61]
        - generic [ref=e64]: Início
      - link "Multas" [ref=e65] [cursor=pointer]:
        - /url: /multas
        - img [ref=e67]
        - generic [ref=e69]: Multas
      - link "Equipe" [ref=e70] [cursor=pointer]:
        - /url: /usuarios
        - img [ref=e72]
        - generic [ref=e77]: Equipe
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Gerenciamento de Usuários (E2E)', () => {
  4  |   test('deve permitir login e navegar para o dashboard', async ({ page }) => {
  5  |     await page.goto('/usuarios');
  6  | 
  7  |     await page.fill('input[type="email"]', 'admin@sistema.com');
  8  |     await page.fill('input[type="password"]', '123456');
  9  |     await page.click('button[type="submit"]');
  10 | 
  11 |     await expect(page).toHaveURL(/\/dashboard|$/);
  12 |   });
  13 | 
  14 |   test.describe('Testes que precisam estar autenticados primeiro', () => {
  15 |     test.beforeEach(async ({ page }) => {
  16 |       await page.goto('/usuarios');
  17 |       await page.fill('input[type="email"]', 'admin@sistema.com');
  18 |       await page.fill('input[type="password"]', '123456');
  19 |       await page.click('button[type="submit"]');
  20 |       await expect(page).toHaveURL(/\/dashboard|$/);
  21 |     });
  22 |     
  23 |     test('deve navegar até a tela de usuários e listar os usuários', async ({ page }) => {
  24 |       await page.goto('/usuarios/', { waitUntil: 'domcontentloaded' });
  25 |       await expect(page.locator('h2')).toContainText('Gestão de Usuários');
  26 |     });
  27 | 
  28 |     test('deve permitir adicionar um novo usuario', async ({ page }) => {
  29 |       const nomeAleatorio = `Usuário E2E ${Math.floor(Math.random() * 1000)}`;
  30 |       const emailAleatorio = `e2e_${Math.floor(Math.random() * 1000)}@teste.com`;
  31 | 
  32 |       await page.goto('/usuarios');
  33 |       await page.locator('.fab').click();
  34 | 
  35 |       await page.fill('input[name="nome"]', nomeAleatorio);
  36 |       await page.fill('input[name="email"]', emailAleatorio);
  37 |       await page.fill('input[name="senha"]', 'senha123');
  38 |       await page.selectOption('select[name="tipo"]','aluno');
  39 | 
  40 |       const responsePromise = page.waitForResponse(resp =>
  41 |         resp.url().includes('/usuarios') &&
  42 |         resp.request().method() === 'POST' &&
  43 |         resp.status() >= 200 && resp.status() < 300
  44 |       );
  45 | 
  46 |       await page.getByRole('button', { name: 'Confirmar' }).click();
  47 | 
  48 |       const response = await responsePromise;
  49 |       const data = await response.json();
  50 |       await expect(page.locator('.modal')).not.toBeVisible();
  51 |     });
  52 | 
  53 |     test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
  54 |       await page.goto('/usuarios');
  55 | 
  56 |       await page.locator('.fab').click();
  57 |       await expect(page.locator('.modal')).toBeVisible();
  58 | 
  59 |       // Uso do getByRole que é mais resiliente que seletores CSS de texto planos
  60 |       await page.getByRole('button', { name: 'Cancelar' }).click();
  61 |       await expect(page.locator('.modal')).not.toBeVisible();
  62 |     });
  63 | 
  64 |     test('deve permitir excluir usuário', async ({ page }) => {
  65 |       await page.goto('/usuarios');
  66 |       await page.waitForSelector('.list-card');
  67 | 
  68 |       const primeiroUsuario = page.locator('.list-card').first();
  69 |       const nome = await primeiroUsuario.locator('.list-card__title').innerText();
  70 | 
  71 |       // Clica no botão Excluir do card
  72 |       await primeiroUsuario.getByRole('button', { name: 'Excluir' }).click();
  73 |       
  74 |       // Valida se o modal abriu
  75 |       await expect(page.locator('.modal')).toBeVisible();
  76 |       await page.locator('.modal').getByRole('button', { name: 'Confirmar' }).click();
  77 | 
  78 |       // Espera sumir e valida que o item foi removido
  79 |       await expect(page.locator('.modal')).not.toBeVisible();
> 80 |       await expect(page.locator('.list-card', { hasText: nome })).not.toBeVisible();
     |                                                                       ^ Error: expect(locator).not.toBeVisible() failed
  81 |     });
  82 |   });
  83 | });
```