import { mount } from "@vue/test-utils"
import UsersTable from "../src/components/UsersTable"

describe('UsersTable', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof UsersTable.data).toBe('function')
  })
})

