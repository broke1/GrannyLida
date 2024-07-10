import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
// import { Carousel, Slide } from 'vue3-carousel'
import CatalogModal from './CatalogModal.vue'
import { mainStore } from '@/store/Store'
import '@/mockTest/mockIntersectionObserver'

vi.mock('vue3-carousel', () =>({ // делаем мок карусели
  Carousel: {
    template: '<div>Mock Carousel Component</div>'
  },
  Slide: {
    template: '<div>Mock Slide Component</div>'
  }
}))

describe('CatalogModal test', () => {

  it('При изменении переменной, элемент появляется на странице', async () => {

    const wrapper = mount(CatalogModal,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=catalogModalTestId]') // ищем элемент по data-testid
    
    store.catalogModal = {
      show: true,
      index: 1
    }  // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('catalog-modal-container__show') // ожидаем что класс появится
    
  })
})