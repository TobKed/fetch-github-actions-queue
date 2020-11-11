# Fetch GitHub Action Queue

<p><a href="https://github.com/TobKed/label-when-approved-action/actions">
<img alt="label-when-approved-action status"
    src="https://github.com/TobKed/label-when-approved-action/workflows/Test%20the%20build/badge.svg"></a>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Context and motivation](#context-and-motivation)
- [Inputs and outputs](#inputs-and-outputs)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Examples](#examples)
    - [Fetch GitHub Action queue](#fetch-github-action-queue)
- [Development environment](#development-environment)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Context and motivation

Since GItHub provide very poor or zero statistics about GitHub Actions this
action was created to make "snapshots" for current queue and running job for later analysis.

# Inputs and outputs

## Inputs

| Input                         | Required | Example                         | Comment                                                       |
|-------------------------------|----------|---------------------------------|---------------------------------------------------------------|
| `token`                       | yes      | `${{ secrets.GITHUB_TOKEN }}`   | The github token passed from `${{ secrets.GITHUB_TOKEN }}`    |
| `repository`                  | yes      | `apache/beam`                   | Respository                                                   |

## Outputs

| Output             |                                                                                                                                                  |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `workflowRuns`     | A list of workflow runs ([payloads](https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#list-workflow-runs-for-a-repository)) |
| `nrOfWorkflowRuns` | A number of fetched workflow runs                                                                                                                |

# Examples

### Fetch GitHub Action queue

```yaml
name: Fetch GitHub Actions queue
on:  # yamllint disable-line rule:truthy
  push:
  schedule:
    - cron: '*/5 * * * *'
  workflow_dispatch:
    inputs:

jobs:

  github-actions-fetch-queue-apache-repo:
    name: "Github Action fetch queue ${{ matrix.organisation }}/${{ matrix.repository }}"
    runs-on: ubuntu-latest
    needs: check_gcp_variables
    strategy:
      matrix:
        organisation: ["apache"]
        repository: ["airflow", "beam"]
    steps:
    - name: Fetch GitHub Action queue
      uses: TobKed/fetch-github-actions-queue@develop
      id: fetch-queue
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        repository: "${{ matrix.organisation }}/${{ matrix.repository }}"
    - name: Save to JSON and CSV
      run: |
        TIMESTAMP=`date --utc +%Y%m%d_%H%M%SZ`
        TIMESTAMP_ISO8601=`date --utc +%FT%T%Z`
        JSON_FILE="${TIMESTAMP}.json"
        echo ${{ toJson(steps.fetch-queue.outputs.workflowRuns) }} > "${JSON_FILE}"
        python json_to_csv.py -i $JSON_FILE -o "${TIMESTAMP}.csv" -a "{\"write_timestamp\":\"${TIMESTAMP_ISO8601}\"}"
    - name: Upload artifacts
      uses: actions/upload-artifact@v2
      with:
        name: ${{ matrix.repository }}-${{ matrix.repository }}-queue
        path: |
          *.json
          *.csv
```

# Development environment

It is highly recommended tu use [pre commit](https://pre-commit.com). The pre-commits
installed via pre-commit tool handle automatically linting (including automated fixes) as well
as building and packaging Javascript index.js from the main.ts Typescript code, so you do not have
to run it yourself.

# License
[MIT License](LICENSE) covers the scripts and documentation in this project.
