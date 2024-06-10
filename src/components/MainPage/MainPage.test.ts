import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MainPage from './MainPage.vue'

describe('MainPage test', () => {

  it('Should be in document', () => {
    const wrapper = mount(MainPage) // монитруем компонент
    const container = wrapper.find('[data-testid=MainPage]') // ищем элемент по data-testid
    expect(container).not.toEqual({}) // проверяем что он есть в дереве
  })
})