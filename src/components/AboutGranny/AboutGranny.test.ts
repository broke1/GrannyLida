import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AboutGranny from './AboutGranny.vue'

vi.useFakeTimers() // указываем что будем мокать setTimeOut

describe('AboutGranny test', () => {

  it('При изменении переменной, элемент появляется на странице и текст его равен тому что нужно', async () => {
    const wrapper = mount(AboutGranny,{
      global: {
        plugins: [createTestingPinia()],
      },
    }) // монитруем компонент

    const container = wrapper.find('[data-testid=aboutGrannyTestId]') // ищем элемент по data-testid

    vi.advanceTimersByTime(2000) // ждем две секунды так же как в компоненте

    await wrapper.vm.$nextTick() // ждем обновления dom
      
    expect(container.classes()).toContain('about-granny-container_block__show') // ожидаем что класс появится

    const text = wrapper.find('.about-granny-container_block_text_item__orange') // получаем компонент подсвеченный оранжевым 

    expect(text.text()).toContain('Бабушка Лида') // проверяем что он содержит текст
    
  })
})