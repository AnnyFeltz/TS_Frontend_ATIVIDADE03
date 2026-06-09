import { expect } from "vitest";

test('setup: deve preparar os dados (usuario e livros) pela IU ',async ({ page }) => {
    await page.goto('/usuarios');
    await page.locator('.fab').click();
    await page.getByPlaceholder('Ex: João Silva').fill('João Silva');
  expect(page.locator('.modal')).toBeVisible();

    await page.fill('input[name= "nome"]', 'usuario para empréstimos');
    await page.fill('input[name= "email"]', 'emp_user_${Date.now()}@test.com');
    await page.fill('input[name= "senha"]', '123456');
    await page.selectOption('select[name="tipo"]', 'aluno');

    let userResp = page.waitForResponse(resp => resp.url().includes('/usuarios')
    && resp.request().method() === 'POST'

    await page.click('button:has-text("Confirmar")');
    await userResp;

    await page.goto('/livros');
    await page.locator('.fab').click();
    expect(page.locator('.modal')).toBeVisible();

    await page.fill('input[name= "titulo"]', 'Livro Empréstimo ${Date.now()}');
    await page.fill('input[name= "autor"]', 'Autor teste');

    let livroResp = page.waitForResponse(resp => resp.url().includes('/livros')
    && resp.request().method() === 'POST');

    await page.click('button:has-text("Confirmar")');
    await livroResp;


    await page.goto('/emprestimos');

    await page.goto
  });

  
