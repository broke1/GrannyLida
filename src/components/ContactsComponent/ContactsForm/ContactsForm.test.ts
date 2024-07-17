import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ContactsForm from './ContactsForm.vue'
import { mainStore } from '@/store/Store'
import '@/mockTest/mockIntersectionObserver'

describe('ContactsForm test', () => {

  it('При изменении переменной, элемент появляется на странице', async () => {
    const wrapper = mount(ContactsForm,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=ContactsFormTestId]') // ищем элемент по data-testid
    
    store.showContacts = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('contacts-form_block__show') // ожидаем что класс появится
    
  })
})