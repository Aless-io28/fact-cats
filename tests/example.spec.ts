import { test, expect } from "@playwright/test";

const LOCAL_SERVER = "http://localhost:5173/";
const API_SERVER = "https://cataas.com/cat/says/";

test("app shows facts and image", async ({ page }) => {
  await page.goto(LOCAL_SERVER);

  const text = await page.getByRole("paragraph");
  const img = await page.getByRole("img");

  await page.waitForFunction(async () => {
    const txtContent = await text.textContent();
    return txtContent !== "";
  });

  const txtContent = await text.textContent();
  const imgContent = await img.getAttribute("src");

  await expect(txtContent?.length).toBeGreaterThan(0);
  await expect(imgContent?.startsWith(API_SERVER)).toBeTruthy();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
