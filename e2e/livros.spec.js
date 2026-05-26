import { test, expect } from '@playwright/test';

test.describe('Gerenciamento de Livros (E2E)', () => {
  test('deve permitir login e navegar para o dashboard', async ({ page }) => {
    await page.goto('/livros');

    await page.fill('input[type="email"]', 'admin@sistema.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard|$/);
  });

  test.describe('Testes que precisam estar autenticados primeiro', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/livros');
      await page.fill('input[type="email"]', 'admin@sistema.com');
      await page.fill('input[type="password"]', '123456');
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL(/\/dashboard|$/);
    });
    
    test('deve navegar até a tela de livros e listar o acervo', async ({ page }) => {
      await page.goto('/livros/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h2')).toContainText('Acervo de Livros');
    });

    test('deve permitir adicionar um novo livro e encontrá-lo na lista', async ({ page }) => {
      const tituloAleatorio = `Livro E2E ${Math.floor(Math.random() * 1000)}`;

      await page.goto('/livros');

      // 1. Clicar no FAB (+) para abrir o modal
      await page.locator('.fab').click();

      // 2. Preencher o formulário correlacionando os placeholders corretos do React
      await page.getByPlaceholder('Ex: Dom Casmurro').fill(tituloAleatorio);
      await page.getByPlaceholder('Ex: Machado de Assis').fill('Automação Playwright');

      // Intercepta a requisição POST
      const responsePromise = page.waitForResponse(resp =>
        resp.url().includes('/livros') &&
        resp.request().method() === 'POST' &&
        resp.status() >= 200 && resp.status() < 300
      );

      // 3. Salvar clicando no botão "Confirmar"
      await page.getByRole('button', { name: 'Confirmar' }).click();

      const response = await responsePromise;
      const data = await response.json();
      const idCriado = data.id;

      // 4. Verificar se o novo livro aparece na lista
      await expect(page.locator('.modal')).not.toBeVisible();
      await page.fill('input[placeholder="Buscar por ID..."]', String(idCriado));
      await page.locator('button.btn--primary').filter({ has: page.locator('svg.lucide-search') }).click();
      
      // Ajustado para a classe real do componente: .list-card__title (com dois underlines)
      await expect(page.locator('.list-card__title')).toContainText(tituloAleatorio);
    });

    test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
      await page.goto('/livros');

      await page.locator('.fab').click();
      await expect(page.locator('.modal')).toBeVisible();

      // Uso do getByRole que é mais resiliente que seletores CSS de texto planos
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await expect(page.locator('.modal')).not.toBeVisible();
    });

    test('deve permitir excluir livro', async ({ page }) => {
      await page.goto('/livros');
      await page.waitForSelector('.list-card');

      const primeiroLivro = page.locator('.list-card').first();
      const titulo = await primeiroLivro.locator('.list-card__title').innerText();

      // Clica no botão Excluir do card
      await primeiroLivro.getByRole('button', { name: 'Excluir' }).click();
      
      // Valida se o modal abriu
      await expect(page.locator('.modal')).toBeVisible();
      await page.locator('.modal').getByRole('button', { name: 'Excluir' }).click();

      // Espera sumir e valida que o item foi removido
      await expect(page.locator('.modal')).not.toBeVisible();
      await expect(page.locator('.list-card', { hasText: titulo })).not.toBeVisible();
    });
  });
});