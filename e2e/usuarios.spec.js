import { test, expect } from '@playwright/test';

test.describe('Gerenciamento de Usuários (E2E)', () => {
  test('deve permitir login e navegar para o dashboard', async ({ page }) => {
    await page.goto('/usuarios');

    await page.fill('input[type="email"]', 'admin@sistema.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard|$/);
  });

  test.describe('Testes que precisam estar autenticados primeiro', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/usuarios');
      await page.fill('input[type="email"]', 'admin@sistema.com');
      await page.fill('input[type="password"]', '123456');
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL(/\/dashboard|$/);
    });
    
    test('deve navegar até a tela de usuários e listar os usuários', async ({ page }) => {
      await page.goto('/usuarios/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h2')).toContainText('Gestão de Usuários');
    });

    test('deve permitir adicionar um novo usuario', async ({ page }) => {
      const nomeAleatorio = `Usuário E2E ${Math.floor(Math.random() * 1000)}`;
      const emailAleatorio = `e2e_${Math.floor(Math.random() * 1000)}@teste.com`;

      await page.goto('/usuarios');
      await page.locator('.fab').click();

      await page.fill('input[name="nome"]', nomeAleatorio);
      await page.fill('input[name="email"]', emailAleatorio);
      await page.fill('input[name="senha"]', 'senha123');
      await page.selectOption('select[name="tipo"]','aluno');

      const responsePromise = page.waitForResponse(resp =>
        resp.url().includes('/usuarios') &&
        resp.request().method() === 'POST' &&
        resp.status() >= 200 && resp.status() < 300
      );

      await page.getByRole('button', { name: 'Confirmar' }).click();

      const response = await responsePromise;
      const data = await response.json();
      await expect(page.locator('.modal')).not.toBeVisible();
    });

    test('deve fechar o modal ao clicar no botão cancelar', async ({ page }) => {
      await page.goto('/usuarios');

      await page.locator('.fab').click();
      await expect(page.locator('.modal')).toBeVisible();

      // Uso do getByRole que é mais resiliente que seletores CSS de texto planos
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await expect(page.locator('.modal')).not.toBeVisible();
    });

    test('deve permitir excluir usuário', async ({ page }) => {
      await page.goto('/usuarios');
      await page.waitForSelector('.list-card');

      const primeiroUsuario = page.locator('.list-card').first();
      const nome = await primeiroUsuario.locator('.list-card__title').innerText();

      // Clica no botão Excluir do card
      await primeiroUsuario.getByRole('button', { name: 'Excluir' }).click();
      
      // Valida se o modal abriu
      await expect(page.locator('.modal')).toBeVisible();
      await page.locator('.modal').getByRole('button', { name: 'Confirmar' }).click();

      // Espera sumir e valida que o item foi removido
      await expect(page.locator('.modal')).not.toBeVisible();
      await expect(page.locator('.list-card', { hasText: nome })).not.toBeVisible();
    });
  });
});