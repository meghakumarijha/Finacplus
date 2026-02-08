const{test,expect}=require('@playwright/test');
const fs = require('fs');
let result = '';
test('locator',async({page})=>{
    await page.goto("https://demoqa.com/");
    await page.locator("//h5[text()='Book Store Application']").click();
    await page.locator("//button[@id='login']").click();
    await page.locator("//input[@id='userName']").fill("test");
    await page.locator("//input[@id='password']").fill("Test@123");
    await page.locator("//button[@id='login']").click();
    await expect(page.locator("//label[@class='form-label' and @id='userName-value']")).toHaveText('test');
    await expect(page.locator("//button[text()='Log out']")).toBeVisible();
    await page.locator("//span[text()='Book Store']").click();
    await page.locator("//input[@placeholder='Type to search']").fill("Learning JavaScript Design Patterns");
    const a=await page.locator("//span[contains(@id,'see')]/a").textContent();
    await expect(page.locator("//span[contains(@id,'see')]/a")).toHaveText('Learning JavaScript Design Patterns');
    const items = await page.locator("//span[contains(@id,'see')]/ancestor::div[@role='row']/div"); // matches 4 elements
    const count = await items.count();
    for (let i = 1; i < count; i++) {
        const text = await items.nth(i).innerText();
        result += text + '\n';
    }

    fs.writeFileSync('res.txt', result);

    await page.locator("//button[@id='submit']").click();
   
})