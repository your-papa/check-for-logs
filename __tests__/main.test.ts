import * as core from '@actions/core'
import * as main from '../src/main'

jest.mock('@actions/core')

describe('When running the action', () => {
  const fakeSetOutput = core.setOutput as jest.MockedFunction<
    typeof core.setOutput
  >

  test('should set output val', async () => {
    await main.run()
    expect(fakeSetOutput).toHaveBeenCalledWith(
      'log position',
      expect.anything()
    )
  })
})
