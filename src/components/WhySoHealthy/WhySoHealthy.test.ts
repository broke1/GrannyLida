import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WhySoHealthy from './WhySoHealthy.vue'
import { mainStore } from '@/store/Store'


describe('WhySoHealthy test', () => {

  it('При изменении переменной, элемент появляется на странице', async () => {
    const wrapper = mount(WhySoHealthy,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const store = mainStore() // монтируюм хранилище

    const container = wrapper.find('[data-testid=whySoHealthyTestId]') // ищем элемент по data-testid
    
    store.showWhySoHealthy = true // меняем  значение в хранилище

    await wrapper.vm.$nextTick() // ждем обновления dom

    expect(container.classes()).toContain('why-so-healthy-container_block__show') // ожидаем что класс появится
    
  })
})