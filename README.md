# LFetch GitHub Action Queue

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
    - [Workflow Run event](#workflow-run-event)
- [Development environment](#development-environment)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Context and motivation


# Inputs and outputs

## Inputs

| Input                         | Required | Example                         | Comment                                                       |
|-------------------------------|----------|---------------------------------|---------------------------------------------------------------|
| `token`                       | yes      | `${{ secrets.GITHUB_TOKEN }}`   | The github token passed from `${{ secrets.GITHUB_TOKEN }}`    |
| `repository`                  | yes      | `apache/beam`                   | Respository                                                   |

## Outputs

| Output         |                              |
|----------------|------------------------------|
| `todo`   | `todo`   |

# Examples

### Workflow Run event

```yaml
```

# Development environment

It is highly recommended tu use [pre commit](https://pre-commit.com). The pre-commits
installed via pre-commit tool handle automatically linting (including automated fixes) as well
as building and packaging Javascript index.js from the main.ts Typescript code, so you do not have
to run it yourself.

# License
[MIT License](LICENSE) covers the scripts and documentation in this project.
