import { test } from "vitest";

test.describe(' gestao de Multas (E2E)', () => {
    test.beforeEach(async ({ page }) => {

test.('setup: deve preparar os dados (usuario, livro, emprestimo) pela UI', async ({ page }) => {


test('deve navegar ate a tela de multas e encontra-la na lista', async ({ page }) => {


test ('deve permitir adicionar uma nova multa e encontra-la na lista', async({page}) => { 
const empPromise = page.waitForResponse(resp => resp.url().includes('/multas'));
    await page.goto('/multas');
    await empPromise;

    await page.locator('.fab').click();
    await expect(page.locator('.modal')).toBeVisible();
    
    const selectedEmprestimo = await page.locator('select[name="emprestimo_id"]');
    await expect(selectedEmprestimo.locator('option')).toHaveCount(0);

    const selectEmprestimo = await page.locator('option').Count();
    if (countOptions > 1) await selectEmprestimo.selectOption({ index: 1 });

    await page.selectOption('select[name="Tipo"]','Atraso na Devolução');
    await page.fill('input[name="Valor"]', '25.50');
    await page.fill('input[name="obs"]', 'bem observado');

    const responsePromise = page.waitForResponse( resp => resp.url().includes('/multas') 
    && resp.url().includes('/multas') && resp.request().method() === 'POST');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await responsePromise;
});

test('deve fechar a modal ao clicar no botao cancelar', async ({ page }) => {
    await page.goto('/multas');
    await page.locator('.fab').click();
    expect(page.locator('.modal')).toBeVisible();

    await page.click('button:has-text("Cancelar")');
    awaitexpect(page.locator('.modal')).not.toBeVisible();

});

test('deve permitir editar uma multa', async ({ page }) => {
    await page.goto('/multas');
    await page.waitForSelector('.list-card');

    const primeiraMulta = page.locator('.list-card').first();

    await primeiraMulta.locator('button:has-text("Editar")').click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.fill('input[name="obs"]', 'bem observado EDITADO');

    const responsePromise = page.waitForResponse( resp => resp.url().includes('/multas') 
    && resp.url().includes('/multas') && resp.request().method() === 'PUT');

    await page.getByRole('button', { name: 'Confirmar' }).click();
    await responsePromise;
});

test('deve permitir quitar uma multa', async ({ page }) => {
    await page.goto('/multas');

    const multaPendente = page.locator('.list-card').filter({ hasText: 'Quitar Multa' }).first();

    if (await multaPendente.isVisible()) {
        await multaPendente.locator('button:has-text("Quitar Multa")').click();
        await expect(page.locator('.modal:has-text("confirmação")')).toBeVisible();

        const responsePromise = page.waitForResponse( resp => resp.url().includes('/multas') 
        && resp.url().includes('/multas') && resp.request().method() === 'PATCH'
        || resp.request().method() === 'PUT');

        await page.click('.modal button:has-text("Sim,Confirmar")');
        await responsePromise;
    }
});

test('deve permitir excluir uma multa', async ({ page }) => {
    await page.goto('/multas');
    const primeiraMulta = page.locator ('.list-card').first();

    await primeiraMulta.locator('button:has-text("Excluir")').click();
    await expect(page.locator('.modal:has-text("confirmação")')).toBeVisible();

    const responsePromise = page.waitForResponse( resp => resp.url().includes('/multas') 
    && resp.url().includes('/multas') && resp.request().method() === 'DELETE');

    await page.click('.modal button:has-text("Sim,Confirmar")');
    await responsePromise;
});
    })