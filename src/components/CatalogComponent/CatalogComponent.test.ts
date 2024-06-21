import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CatalogComponent from './CatalogComponent.vue'
import { mainStore } from '@/store/Store'
import '@/mockTest/mockIntersectionObserver'

describe('CatalogComponent test', () => {

  it('При изменении переменной, элемент появляется на странице', async () => {
    const wrapper = mount(CatalogComponent,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=catalogTestId]') // ищем элемент по data-testid
    
    store.showCatalog = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('catalog-container_block__show') // ожидаем что класс появится
    
  })
})