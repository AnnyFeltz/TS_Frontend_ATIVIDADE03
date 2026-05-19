# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: livros.spec.js >> Gerenciamento de Livros (E2E) >> Testes que precisam estar autenticados primeiro >> deve permitir excluir livro
- Location: e2e\livros.spec.js:74:5

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator: locator('.list-card').filter({ hasText: 'Livro de Teste' })
Expected: not visible
Error: strict mode violation: locator('.list-card').filter({ hasText: 'Livro de Teste' }) resolved to 4 elements:
    1) <div class="list-card">…</div> aka getByText('Livro de Teste para MultaAutor de Teste#4Disponível para empréstimo em breve.')
    2) <div class="list-card">…</div> aka getByText('Livro de Teste para MultaAutor de Teste#5Disponível para empréstimo em breve.')
    3) <div class="list-card">…</div> aka getByText('Livro de Teste para MultaAutor de Teste#6Disponível para empréstimo em breve.')
    4) <div class="list-card">…</div> aka getByText('Livro de Teste para MultaAutor de Teste#7Disponível para empréstimo em breve.')

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('.list-card').filter({ hasText: 'Livro de Teste' })

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
      - textbox "Buscar por ID..." [ref=e21]
      - button [ref=e22] [cursor=pointer]:
        - img [ref=e23]
    - generic [ref=e26]:
      - generic [ref=e27]:
        - generic [ref=e28]:
          - generic [ref=e29]:
            - heading "Novo Nome" [level=3] [ref=e30]
            - generic [ref=e31]:
              - img [ref=e32]
              - text: Autor de Teste
          - generic [ref=e35]: "#2"
        - generic [ref=e37]: Disponível para empréstimo em breve.
        - generic [ref=e38]:
          - button "Editar" [ref=e39] [cursor=pointer]:
            - img [ref=e40]
            - text: Editar
          - button "Excluir" [ref=e42] [cursor=pointer]:
            - img [ref=e43]
            - text: Excluir
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]:
            - heading "Livro de Teste para Multa" [level=3] [ref=e49]
            - generic [ref=e50]:
              - img [ref=e51]
              - text: Autor de Teste
          - generic [ref=e54]: "#4"
        - generic [ref=e56]: Disponível para empréstimo em breve.
        - generic [ref=e57]:
          - button "Editar" [ref=e58] [cursor=pointer]:
            - img [ref=e59]
            - text: Editar
          - button "Excluir" [ref=e61] [cursor=pointer]:
            - img [ref=e62]
            - text: Excluir
      - generic [ref=e65]:
        - generic [ref=e66]:
          - generic [ref=e67]:
            - heading "Livro de Teste para Multa" [level=3] [ref=e68]
            - generic [ref=e69]:
              - img [ref=e70]
              - text: Autor de Teste
          - generic [ref=e73]: "#5"
        - generic [ref=e75]: Disponível para empréstimo em breve.
        - generic [ref=e76]:
          - button "Editar" [ref=e77] [cursor=pointer]:
            - img [ref=e78]
            - text: Editar
          - button "Excluir" [ref=e80] [cursor=pointer]:
            - img [ref=e81]
            - text: Excluir
      - generic [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e86]:
            - heading "Livro de Teste para Multa" [level=3] [ref=e87]
            - generic [ref=e88]:
              - img [ref=e89]
              - text: Autor de Teste
          - generic [ref=e92]: "#6"
        - generic [ref=e94]: Disponível para empréstimo em breve.
        - generic [ref=e95]:
          - button "Editar" [ref=e96] [cursor=pointer]:
            - img [ref=e97]
            - text: Editar
          - button "Excluir" [ref=e99] [cursor=pointer]:
            - img [ref=e100]
            - text: Excluir
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]:
            - heading "Livro de Teste para Multa" [level=3] [ref=e106]
            - generic [ref=e107]:
              - img [ref=e108]
              - text: Autor de Teste
          - generic [ref=e111]: "#7"
        - generic [ref=e113]: Disponível para empréstimo em breve.
        - generic [ref=e114]:
          - button "Editar" [ref=e115] [cursor=pointer]:
            - img [ref=e116]
            - text: Editar
          - button "Excluir" [ref=e118] [cursor=pointer]:
            - img [ref=e119]
            - text: Excluir
    - generic [ref=e122]:
      - button [disabled] [ref=e123] [cursor=pointer]:
        - img [ref=e124]
      - generic [ref=e126]: Página 1 de 12
      - button [ref=e127] [cursor=pointer]:
        - img [ref=e128]
    - button [ref=e130] [cursor=pointer]:
      - img [ref=e131]
  - navigation "Navegação principal" [ref=e132]:
    - generic [ref=e133]:
      - link "Livros" [ref=e134] [cursor=pointer]:
        - /url: /livros
        - img [ref=e136]
        - generic [ref=e138]: Livros
      - link "Empréstimos" [ref=e139] [cursor=pointer]:
        - /url: /emprestimos
        - img [ref=e141]
        - generic [ref=e144]: Empréstimos
      - link "Início" [ref=e145] [cursor=pointer]:
        - /url: /
        - img [ref=e147]
        - generic [ref=e150]: Início
      - link "Multas" [ref=e151] [cursor=pointer]:
        - /url: /multas
        - img [ref=e153]
        - generic [ref=e155]: Multas
      - link "Equipe" [ref=e156] [cursor=pointer]:
        - /url: /usuarios
        - img [ref=e158]
        - generic [ref=e163]: Equipe
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
  41 |       const responsePromise = page.waitForResponse(resp =>
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
  86 |       
  87 |       // CORREÇÃO: '.mosal' alterado para '.modal' e clique usando o escopo correto
  88 |       await page.locator('.modal').getByRole('button', { name: 'Excluir' }).click();
  89 | 
  90 |       // Espera sumir e valida que o item foi removido
  91 |       await expect(page.locator('.modal')).not.toBeVisible();
> 92 |       await expect(page.locator('.list-card', { hasText: titulo })).not.toBeVisible();
     |                                                                         ^ Error: expect(locator).not.toBeVisible() failed
  93 |     });
  94 |   });
  95 | });
```