import { Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export async function fill(element: Locator, value: any ) {
  if (!value) return;
  if (value === process.env.PASSWORD) {
    console.log(`Try to fill ******** in ${element}`);
  } else console.log(`Try to fill ${value} in ${element}`);
  await element.first().fill(value);
  console.log(`Value filled`);
};

export async function click(element: Locator) {
  console.log(`Try to click on ${element}`);
  await element.first().click();
  console.log(`Element clicked`);
};

export async function expectVisible(...elements: Locator[]) {
  for (const element of elements) {
    await expect(element.first()).toBeVisible();
  };
};

export async function expectText(element: Locator, expectedText: string) {
  const elementText = await element.textContent();
  const normalizedElementText = elementText?.trim().replace(/\s+/g, ' '); 
  
  expect(normalizedElementText).toEqual(expectedText);
};




