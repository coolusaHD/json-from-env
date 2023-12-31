# JSON from Environment Variables GitHub Action

[![GitHub Super-Linter](https://github.com/coolusaHD/json-from-env/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/coolusaHD/json-from-env/actions/workflows/ci.yml/badge.svg)
![version](https://img.shields.io/github/v/release/coolusaHD/json-from-env)

This GitHub Action creates a JSON file from environment variables.

## Inputs

### `file-path` (required)

File path ending with the new generated file `.json`.

### `entity-names` (required)

Comma-separated string of entity names.

### `entity-values` (required)

Comma-separated string of entity values.

## Usage

Change `[version]` to the latest version of this GitHub Action.

```yaml
name: Generate JSON

on:
  push:
    branches:
      - main

jobs:
  generate-json:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Generate JSON
        id: generate-json
        uses: coolusaHD/json-from-env@[version]
        with:
          file-path: 'output.json'
          entity-names: 'name1,NAME_2,NAME_3'
          entity-values: 'value1,VALUE_2,${{ secrets.NAME_3 }}'

      - name: Upload JSON Artifact
        uses: actions/upload-artifact@v3
        with:
          name: generated-json
          path: output.json
```

## Example Workflow

The example workflow demonstrates how to use this GitHub Action to generate a
JSON file based on your environment variables.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Contribution

Contributions are welcome! Create a fork of this project, commit your changes
and open a pull request.
