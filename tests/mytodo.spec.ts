import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc')
})

const todoItems = ['hello', 'just for testing', 'blablabla']

test.describe('Create new TODO', () => {
  test('can create a todo list', async ({ page }) => {
    const newToDo = page.getByPlaceholder('What needs to be done?')

    await newToDo.fill(todoItems[0])
    await newToDo.press('Enter')

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0]])

    await newToDo.fill(todoItems[1])
    await newToDo.press('Enter')

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0], todoItems[1]])

    await checkNumberOfTodosInLocalStorage(page, 2)
  })
})

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?')

  for (const item of todoItems) {
    await newTodo.fill(item)
    await newTodo.press('Enter')
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage['react-todos']).length === e
  }, expected)
}

async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e
  }, expected)
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction((t) => {
    return JSON.parse(localStorage['react-todos'])
      .map((todo: any) => todo.title)
      .includes(t)
  }, title)
}
