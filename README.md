Creating a comprehensive GitHub README for your GitHub Action is important for
user adoption and contribution. Here's a template you can use as a starting
point, including explanations, licensing, and contribution guidelines:

````markdown
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
        uses: actions/checkout@v2

      - name: Generate JSON
        id: generate-json
        uses: your-username/your-repo@v1
        with:
          file-path: 'output.json'
          entity-names: 'name1,name2,name3'
          entity-values: 'value1,value2,value3'

      - name: Upload JSON Artifact
        uses: actions/upload-artifact@v2
        with:
          name: generated-json
          path: output.json
```
````

## Example Workflow

The example workflow demonstrates how to use this GitHub Action to generate a
JSON file based on your environment variables.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Contribution

Contributions are welcome! Here's how you can get started:

1. Fork the repository.
2. Clone your forked repository locally.
3. Create a new branch for your feature or bug fix:
   `git checkout -b feature/my-feature`.
4. Make your changes and commit them with descriptive messages.
5. Push your changes to your fork on GitHub:
   `git push origin feature/my-feature`.
6. Open a pull request to the `main` branch of this repository.
7. Please make sure to update tests and documentation as necessary.
