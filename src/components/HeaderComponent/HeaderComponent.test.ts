import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HeaderComponent from './HeaderComponent.vue'
import { mainStore } from '@/store/Store'


describe('HeaderComponent test', () => {

  it('При изменении переменной логотипа, он появляется на странице', async () => {
    const wrapper = mount(HeaderComponent,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=logoTestId]') // ищем элемент по data-testid
    
    store.showLogo = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('header-container_logo__show') // ожидаем что класс появится
    
  })

  it.todo('При изменении переменной меню, оно появляется на странице', async () => {
    const wrapper = mount(HeaderComponent,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=menuTestId]') // ищем элемент по data-testid
    
    store.showMenu = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('header-container_menu__show') // ожидаем что класс появится
  })
})