/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const getInputMock = jest.spyOn(core, 'getInput')
const setFailedMock = jest.spyOn(core, 'setFailed')
const setOutputMock = jest.spyOn(core, 'setOutput')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle empty arrays for entity names and values', async () => {
    // Mock the inputs with empty arrays
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'file-path':
          return 'file.json'
        case 'entity-names':
          return ''
        case 'entity-values':
          return ''
        default:
          return ''
      }
    })

    // Call the action's main function
    await main.run()

    // Verify that core functions were called as expected
    expect(getInputMock).toHaveBeenCalledWith('entity-names')
    expect(getInputMock).toHaveBeenCalledWith('entity-values')
    expect(setFailedMock).toHaveBeenCalledWith(
      'The names and values must not be empty'
    )
    expect(debugMock).not.toHaveBeenCalled()
  })

  it('should handle errors when writing to the file', async () => {
    // Mock the inputs
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'file-path':
          return 'invalid/path/file.json'
        case 'entity-names':
          return 'name1,name2,name3'
        case 'entity-values':
          return 'value1,value2,value3'
        default:
          return ''
      }
    })

    // Mock fs.writeFile to simulate an error
    const writeFileMock = jest
      .spyOn(require('node:fs'), 'writeFile')
      .mockImplementation((path, data, callback: any) => {
        callback(new Error('File write error'))
      })

    // Call the action's main function
    await main.run()

    // Verify that core functions were called as expected
    expect(getInputMock).toHaveBeenCalledWith('file-path')
    expect(getInputMock).toHaveBeenCalledWith('entity-names')
    expect(getInputMock).toHaveBeenCalledWith('entity-values')
    expect(setFailedMock).toHaveBeenCalledWith('File write error')
    // Verify that fs.writeFile was called with the correct arguments
    expect(writeFileMock).toHaveBeenCalledWith(
      'invalid/path/file.json',
      '{"name1":"value1","name2":"value2","name3":"value3"}',
      expect.any(Function)
    )
  })

  it('should handle an invalid number of names and values', async () => {
    // Mock the inputs
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'file-path':
          return 'file.json'
        case 'entity-names':
          return 'name1,name2,name3'
        case 'entity-values':
          return 'value1,value2'
        default:
          return ''
      }
    })

    // Call the action's main function
    await main.run()

    // Verify that core functions were called as expected
    expect(getInputMock).toHaveBeenCalledWith('entity-names')
    expect(getInputMock).toHaveBeenCalledWith('entity-values')
    expect(setFailedMock).toHaveBeenCalledWith(
      'The number of names and values must be the same'
    )
    expect(debugMock).not.toHaveBeenCalled()
  })

  it('should log when finished', async () => {
    // Mock the inputs
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'file-path':
          return 'file.json'
        case 'entity-names':
          return 'name1,name2,name3'
        case 'entity-values':
          return 'value1,value2,value3'
        default:
          return ''
      }
    })

    // Mock fs.writeFile to simulate a successful write
    const writeFileMock = jest
      .spyOn(require('node:fs'), 'writeFile')
      .mockImplementation((path, data, callback: any) => {
        callback(null)
      })

    // Call the action's main function
    await main.run()

    // Verify that core functions were called as expected
    expect(getInputMock).toHaveBeenCalledWith('entity-names')
    expect(getInputMock).toHaveBeenCalledWith('entity-values')
    expect(debugMock).toHaveBeenCalledWith('Created file at file.json')
    // Verify that fs.writeFile was called with the correct arguments
    expect(writeFileMock).toHaveBeenCalledWith(
      'file.json',
      '{"name1":"value1","name2":"value2","name3":"value3"}',
      expect.any(Function)
    )
  })
})
