import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
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

  it('При вводе пользователем в поля формы, ожидаем увидеть это же в форме', async () => {
    const wrapper = mount(ContactsForm,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const name = wrapper.find('[data-testid=NameFormTestId]') // ищем элемент по data-testid

    await name.setValue('Kitty') // устанавливаем значение

    expect((name.element as HTMLInputElement).value).toBe('Kitty')// ожидаем что значение будет именно тем что установили

    const comments = wrapper.find('[data-testid=CommentsFormTestId]') // ищем элемент по data-testid

    await comments.setValue('Hello Kitty') // устанавливаем значение

    expect((comments.element as HTMLInputElement).value).toBe('Hello Kitty')// ожидаем что значение будет именно тем что установили

    const agrement = wrapper.find('[data-testid=AgrementFormTestId]') // ищем элемент по data-testid

    await agrement.setValue(true) // устанавливаем значение

    expect((agrement.element as HTMLInputElement).value).toBeTruthy()// ожидаем что значение будет именно тем что установили
    
  })

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

  it('При не усмешной отправки формы ', async () => {
    const wrapper = mount(ContactsForm,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const sendOrder = vi.spyOn(store,'sendOrder') // мокаем метод отправки формы

    sendOrder.mockImplementationOnce(() => { // подменяем метод так, чтобы он поменял объект в хранилище
      return new Promise( (reject) => {
        store.contactsForm.warning = {
          success: false,
          text: 'К сожалению, письмо отправить не удалось. Попробуйте еще раз.',
          show: true
        }
        reject()
      })
    }) 

    const orderBtn = wrapper.find('.contacts-form_block_order_btn') // ищем кнопку отправки формы

    orderBtn.trigger('click') // если по ней нажать

    await wrapper.vm.$nextTick() // ждем обновления dom

    const warning = wrapper.find('[data-testid=WarningFormTestId]') // ищем элемент по data-testid

    expect(warning.classes()).toContain('contacts-form_block_warning__show') // ожидаем что класс появится

    expect(warning.text()).toBe('К сожалению, письмо отправить не удалось. Попробуйте еще раз.') // ожидаем что текст внутри компонента поменяется
    
  })

})