import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DeliveryComponent from './DeliveryComponent.vue'
import { mainStore } from '@/store/Store'
import '@/mockTest/mockIntersectionObserver'

describe('DeliveryComponent test', () => {

  it('При изменении переменной, элемент появляется на странице', async () => {
    const wrapper = mount(DeliveryComponent,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=deliveryTestId]') // ищем элемент по data-testid
    
    store.showDelivery = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('delivery-container_block__show') // ожидаем что класс появится
    
  })
})