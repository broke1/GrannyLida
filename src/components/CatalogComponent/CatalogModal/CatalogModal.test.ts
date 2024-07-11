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

vi.useFakeTimers() // указываем что будем мокать setTimeOut

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

  it('При нажатии на крестик, модальное окно закрывается', async () => {

    const wrapper = mount(CatalogModal,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    store.catalogModal = {
      show: true,
      index: 1
    } // меняем значение модалки имитируя открытие
    
    const closeElem = wrapper.find('.catalog-modal-container_block_btn__close') // ищем кнопку закрытия формы

    closeElem.trigger('click') // если по ней нажать

    vi.advanceTimersByTime(500) // ждем две секунды так же как в компоненте

    expect(store.catalogModal).toEqual({show: false, index: -1})  // ожидаем что после закрытия модалки она исчезнет и индекс станет -1
    
  })

  it('При нажатии на кнопку заказать так же должно закрыться модальное окно', async () => {

    const wrapper = mount(CatalogModal,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    store.catalogModal = {
      show: true,
      index: 1
    } // меняем значение модалки имитируя открытие
    
    const closeElem = wrapper.find('.catalog-modal-container_block_footer__order') // ищем кнопку закрытия формы

    const handleClose = vi.spyOn((wrapper.vm as any),'handleCloseModal');

    closeElem.trigger('click') // если по ней нажать

    // (wrapper.vm as any).handleCloseModal()

    // console.log(wrapper.vm)

    expect(handleClose).toHaveBeenCalled()  // ожидаем что после закрытия модалки она исчезнет и индекс станет -1
    
  })

})