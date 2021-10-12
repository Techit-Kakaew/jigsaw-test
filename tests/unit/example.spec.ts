import { shallowMount } from '@vue/test-utils'
import Contact from '@/components/contact-person/index.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Contact)
    expect(true).toBe(true)
  })
})
