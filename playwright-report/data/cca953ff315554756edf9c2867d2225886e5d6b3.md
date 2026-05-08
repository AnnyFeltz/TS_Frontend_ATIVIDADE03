# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: livros.spec.js >> Gerenciamento de Livros (E2E) >> Testes que precisam estar autenticados primeiro >> deve permitir adicionar um novo livro e encontrá-lo na lista
- Location: e2e\livros.spec.js:34:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Livro E2E 813')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Livro E2E 813')

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
            - heading "Livro de Teste" [level=3] [ref=e30]
            - generic [ref=e31]:
              - img [ref=e32]
              - text: Autor de Teste
          - generic [ref=e35]: "#1"
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
            - heading "Novo Nome" [level=3] [ref=e49]
            - generic [ref=e50]:
              - img [ref=e51]
              - text: Autor de Teste
          - generic [ref=e54]: "#2"
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
          - generic [ref=e73]: "#4"
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
          - generic [ref=e92]: "#5"
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
          - generic [ref=e111]: "#6"
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
  5  |     // 1. Vai para a página inicial (Login)
  6  |     await page.goto('/livros');
  7  | 
  8  |     // 2. Realiza o login (usando os dados do nosso mock de admin)
  9  |     await page.fill('input[type="email"]', 'admin@sistema.com');
  10 |     await page.fill('input[type="password"]', '123456');
  11 |     await page.click('button[type="submit"]');
  12 | 
  13 |     // 3. Espera chegar no Dashboard (garante que logou)
  14 |     await expect(page).toHaveURL(/\/dashboard|$/);
  15 |   });
  16 | 
  17 |   test.describe('Testes que precisam estar autenticados primeiro', () => {
  18 |     test.beforeEach(async ({ page }) => {
  19 |       await page.goto('/livros');
  20 |       await page.fill('input[type="email"]', 'admin@sistema.com');
  21 |       await page.fill('input[type="password"]', '123456');
  22 |       await page.click('button[type="submit"]');
  23 |       await expect(page).toHaveURL(/\/dashboard|$/);
  24 |     });
  25 |     
  26 |     test('deve navegar até a tela de livros e listar o acervo', async ({ page }) => {
  27 |       // 1. Navega para livros a partir do menu ou via URL
  28 |       await page.goto('/livros/', { waitUntil: 'domcontentloaded' });
  29 | 
  30 |       // 2. Verifica se o título da página está correto
  31 |       await expect(page.locator('h2')).toContainText('Acervo de Livros');
  32 |     });
  33 | 
  34 |     test('deve permitir adicionar um novo livro e encontrá-lo na lista', async ({ page }) => {
  35 |       const tituloAleatorio = `Livro E2E ${Math.floor(Math.random() * 1000)}`;
  36 | 
  37 |       await page.goto('/livros');
  38 | 
  39 |       // 1. Clicar no FAB (+) para abrir o modal
  40 |       await page.locator('.fab').click();
  41 | 
  42 |       // 2. Preencher o formulário usando o Placeholder (já que não tem 'name')
  43 |       await page.getByPlaceholder('Ex: Dom Casmurro').fill(tituloAleatorio);
  44 |       await page.getByPlaceholder('Ex: Machado de Assis').fill('Automação Playwright');
  45 | 
  46 |       // 3. Salvar clicando no botão "Confirmar"
  47 |       await page.getByRole('button', { name: 'Confirmar' }).click();
  48 | 
  49 |       // 4. Verificar se o novo livro aparece na lista
> 50 |       await expect(page.getByText(tituloAleatorio)).toBeVisible({ timeout: 10000 });
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  51 |     });
  52 | 
  53 |     test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
  54 |       await page.goto('/livros');
  55 | 
  56 |       await page.locator('.fab').click();
  57 |       await expect(page.locator('.modal')).toBeVisible();
  58 | 
  59 |       await page.click('button:has-text("Cancelar")');
  60 |       await expect(page.locator('.modal')).not.toBeVisible();
  61 |     });
  62 |   });
  63 | });
```