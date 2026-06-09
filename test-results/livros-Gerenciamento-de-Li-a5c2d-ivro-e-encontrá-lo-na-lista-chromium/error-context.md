# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: livros.spec.js >> Gerenciamento de Livros (E2E) >> Testes que precisam estar autenticados primeiro >> deve permitir adicionar um novo livro e encontrá-lo na lista
- Location: e2e\livros.spec.js:28:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 30000ms exceeded.
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
      - heading "Acervo de Livros" [level=2] [ref=e17]
      - paragraph [ref=e18]: Gerenciamento completo da biblioteca
    - generic [ref=e19]:
      - generic [ref=e20]: Erro ao salvar o livro.
      - button [ref=e21] [cursor=pointer]:
        - img [ref=e22]
    - generic [ref=e25]:
      - textbox "Buscar por ID..." [ref=e27]
      - button [ref=e28] [cursor=pointer]:
        - img [ref=e29]
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - heading [level=3]
          - img [ref=e37]
        - generic [ref=e40]: "#"
      - generic [ref=e42]: Disponível para empréstimo em breve.
      - generic [ref=e43]:
        - button "Editar" [ref=e44] [cursor=pointer]:
          - img [ref=e45]
          - text: Editar
        - button "Excluir" [ref=e47] [cursor=pointer]:
          - img [ref=e48]
          - text: Excluir
    - button [ref=e51] [cursor=pointer]:
      - img [ref=e52]
    - generic [ref=e54]:
      - generic [ref=e55]:
        - heading "Novo Livro" [level=3] [ref=e56]
        - button [ref=e57] [cursor=pointer]:
          - img [ref=e58]
      - generic [ref=e61]:
        - generic [ref=e62]:
          - generic [ref=e63]:
            - generic [ref=e64]: Título do Livro
            - 'textbox "Ex: Dom Casmurro" [ref=e65]': Livro E2E 260
          - generic [ref=e66]:
            - generic [ref=e67]: Autor
            - 'textbox "Ex: Machado de Assis" [ref=e68]': Automação Playwright
        - generic [ref=e69]:
          - button "Cancelar" [ref=e70] [cursor=pointer]
          - button "Confirmar" [ref=e71] [cursor=pointer]
  - navigation "Navegação principal" [ref=e72]:
    - generic [ref=e73]:
      - link "Livros" [ref=e74] [cursor=pointer]:
        - /url: /livros
        - img [ref=e76]
        - generic [ref=e78]: Livros
      - link "Empréstimos" [ref=e79] [cursor=pointer]:
        - /url: /emprestimos
        - img [ref=e81]
        - generic [ref=e84]: Empréstimos
      - link "Início" [ref=e85] [cursor=pointer]:
        - /url: /
        - img [ref=e87]
        - generic [ref=e90]: Início
      - link "Multas" [ref=e91] [cursor=pointer]:
        - /url: /multas
        - img [ref=e93]
        - generic [ref=e95]: Multas
      - link "Equipe" [ref=e96] [cursor=pointer]:
        - /url: /usuarios
        - img [ref=e98]
        - generic [ref=e103]: Equipe
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Gerenciamento de Livros (E2E)', () => {
  4  |   test('deve permitir login e navegar para o dashboard', async ({ page }) => {
  5  |     await page.goto('/livros');
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
  16 |       await page.goto('/livros');
  17 |       await page.fill('input[type="email"]', 'admin@sistema.com');
  18 |       await page.fill('input[type="password"]', '123456');
  19 |       await page.click('button[type="submit"]');
  20 |       await expect(page).toHaveURL(/\/dashboard|$/);
  21 |     });
  22 |     
  23 |     test('deve navegar até a tela de livros e listar o acervo', async ({ page }) => {
  24 |       await page.goto('/livros/', { waitUntil: 'domcontentloaded' });
  25 |       await expect(page.locator('h2')).toContainText('Acervo de Livros');
  26 |     });
  27 | 
  28 |     test('deve permitir adicionar um novo livro e encontrá-lo na lista', async ({ page }) => {
  29 |       const tituloAleatorio = `Livro E2E ${Math.floor(Math.random() * 1000)}`;
  30 | 
  31 |       await page.goto('/livros');
  32 | 
  33 |       // 1. Clicar no FAB (+) para abrir o modal
  34 |       await page.locator('.fab').click();
  35 | 
  36 |       // 2. Preencher o formulário correlacionando os placeholders corretos do React
  37 |       await page.getByPlaceholder('Ex: Dom Casmurro').fill(tituloAleatorio);
  38 |       await page.getByPlaceholder('Ex: Machado de Assis').fill('Automação Playwright');
  39 | 
  40 |       // Intercepta a requisição POST
> 41 |       const responsePromise = page.waitForResponse(resp =>
     |                                    ^ Error: page.waitForResponse: Test timeout of 30000ms exceeded.
  42 |         resp.url().includes('/livros') &&
  43 |         resp.request().method() === 'POST' &&
  44 |         resp.status() >= 200 && resp.status() < 300
  45 |       );
  46 | 
  47 |       // 3. Salvar clicando no botão "Confirmar"
  48 |       await page.getByRole('button', { name: 'Confirmar' }).click();
  49 | 
  50 |       const response = await responsePromise;
  51 |       const data = await response.json();
  52 |       const idCriado = data.id;
  53 | 
  54 |       // 4. Verificar se o novo livro aparece na lista
  55 |       await expect(page.locator('.modal')).not.toBeVisible();
  56 |       await page.fill('input[placeholder="Buscar por ID..."]', String(idCriado));
  57 |       await page.locator('button.btn--primary').filter({ has: page.locator('svg.lucide-search') }).click();
  58 |       
  59 |       // Ajustado para a classe real do componente: .list-card__title (com dois underlines)
  60 |       await expect(page.locator('.list-card__title')).toContainText(tituloAleatorio);
  61 |     });
  62 | 
  63 |     test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
  64 |       await page.goto('/livros');
  65 | 
  66 |       await page.locator('.fab').click();
  67 |       await expect(page.locator('.modal')).toBeVisible();
  68 | 
  69 |       // Uso do getByRole que é mais resiliente que seletores CSS de texto planos
  70 |       await page.getByRole('button', { name: 'Cancelar' }).click();
  71 |       await expect(page.locator('.modal')).not.toBeVisible();
  72 |     });
  73 | 
  74 |     test('deve permitir excluir livro', async ({ page }) => {
  75 |       await page.goto('/livros');
  76 |       await page.waitForSelector('.list-card');
  77 | 
  78 |       const primeiroLivro = page.locator('.list-card').first();
  79 |       const titulo = await primeiroLivro.locator('.list-card__title').innerText();
  80 | 
  81 |       // Clica no botão Excluir do card
  82 |       await primeiroLivro.getByRole('button', { name: 'Excluir' }).click();
  83 |       
  84 |       // Valida se o modal abriu
  85 |       await expect(page.locator('.modal')).toBeVisible();
  86 |       await page.locator('.modal').getByRole('button', { name: 'Excluir' }).click();
  87 | 
  88 |       // Espera sumir e valida que o item foi removido
  89 |       await expect(page.locator('.modal')).not.toBeVisible();
  90 |       await expect(page.locator('.list-card', { hasText: titulo })).not.toBeVisible();
  91 |     });
  92 |   });
  93 | });
```