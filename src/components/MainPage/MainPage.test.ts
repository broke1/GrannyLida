import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MainPage from './MainPage.vue'
import '@/mockTest/mockIntersectionObserver'

vi.mock('vue3-carousel', () =>({ // делаем мок карусели
  Carousel: {
    template: '<div>Mock Carousel Component</div>'
  },
  Slide: {
    template: '<div>Mock Slide Component</div>'
  }
}))

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