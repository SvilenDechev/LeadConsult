import { Locator } from 'playwright-core';
import { expect, Page } from '@playwright/test';
import { expectVisible } from './globals';

 interface ElementsSnapshotComparisonOptions {
  page: Page; 
  testTitle: string; 
  elements: Locator[]; 
  threshold?: number; 
  timeout?: number; 
}

const DEFAULT_TIMEOUT = 1000;

export async function elementsSnapshotComparison({page, testTitle, elements, threshold = 0.2,timeout = DEFAULT_TIMEOUT}: ElementsSnapshotComparisonOptions) {
  console.log(`>>>>> snapshot comparison for element(s) in test "${testTitle}" STARTED <<<<<`);
  if (timeout > 0) {
    await page.waitForTimeout(timeout);
  };
  for (const element of elements) {
    expect(await element.isVisible()).toBeTruthy();
    expect(await element.screenshot()).toMatchSnapshot({  threshold  })
  };
  console.log(`>>>>> snapshot comparison for element(s) in test "${testTitle}" FINISH <<<<<`);
};
