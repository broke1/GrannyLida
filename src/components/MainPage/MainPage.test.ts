import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MainPage from './MainPage.vue'
import '@/mockTest/mockIntersectionObserver'

describe('MainPage test', () => {

  it('Should be in document', () => {
    const wrapper = mount(MainPage,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент
    const container = wrapper.find('[data-testid=MainPage]') // ищем элемент по data-testid
    expect(container).not.toEqual({}) // проверяем что он есть в дереве
  })
})