import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ContactsComponent from './ContactsComponent.vue'
import { mainStore } from '@/store/Store'
import '@/mockTest/mockIntersectionObserver'

describe('ContactsComponent test', () => {

  it('При изменении переменной, элемент появляется на странице', async () => {
    const wrapper = mount(ContactsComponent,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=ContactsComponentTestId]') // ищем элемент по data-testid
    
    store.showContacts = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('contacts-container_block__show') // ожидаем что класс появится
    
  })
})