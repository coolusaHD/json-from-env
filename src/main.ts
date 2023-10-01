import * as core from '@actions/core'
import * as fs from 'node:fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const entitiyNames: string = core.getInput('entity-names')
    const entitiyValues: string = core.getInput('entity-values')

    // check if the inputs are empty
    if (entitiyNames === '' || entitiyValues === '') {
      throw new Error('The names and values must not be empty')
    }

    const entitiyNamesArray = entitiyNames.split(',')
    const entitiyValuesArray = entitiyValues.split(',')

    // check if the number of names and values are the same
    if (entitiyNamesArray.length !== entitiyValuesArray.length) {
      throw new Error('The number of names and values must be the same')
    }

    // create a map of the names and values
    const entitiyMap = new Map<string, string>()
    entitiyNamesArray.forEach((name, index) => {
      core.debug(`Adding ${name}`)
      entitiyMap.set(name, entitiyValuesArray[index])
    })

    // create the file
    const filePath = core.getInput('file-path')

    fs.writeFile(
      filePath,
      JSON.stringify(Object.fromEntries(entitiyMap)),
      err => {
        if (err) throw err
      }
    )

    core.debug(`Created file at ${filePath}`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
