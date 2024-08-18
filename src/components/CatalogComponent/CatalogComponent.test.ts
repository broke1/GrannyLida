import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CatalogComponent from './CatalogComponent.vue'
import { mainStore } from '@/store/Store'
import catalogMock from '@/store/mock.ts'
import '@/mockTest/mockIntersectionObserver'


vi.mock('vue3-carousel', () =>({ // делаем мок карусели
  Carousel: {
    template: '<div>Mock Carousel Component</div>'
  },
  Slide: {
    template: '<div>Mock Slide Component</div>'
  }
}))

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

  it('При запросе каталога должен наполнится массив и при нажатии на карточку торта должно открыть модальное окно', async () => {
    const wrapper = mount(CatalogComponent,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const getCatalogList = vi.spyOn(store,'getCatalogList') // мокаем метод получения каталога тортов

    getCatalogList.mockImplementationOnce(() => { // подменяем метод так, чтобы он вернул список так же как в реальности
      return new Promise( (resolve) => {
        store.catalogList = catalogMock
        resolve()
      })
    }) 

    store.getCatalogList() // вызываем метод напрямую

    expect(store.catalogList.length).toBeGreaterThan(0) // ожидаем что список тортов поменялся

    await wrapper.vm.$nextTick() // ждем обновления dom

    const indexItemCatalog = 0 // индекс элемента каталога тортов

    const catalogItem = wrapper.findAll('.catalog-container_block_body_item')[indexItemCatalog] // получаем карточку торта

    catalogItem.trigger('click') // если по ней нажать

    expect(store.catalogModal).toEqual({show: true, index: indexItemCatalog}) // то должны поменяться значения в сторе 
    
  })

})