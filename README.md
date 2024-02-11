# 👌 Helm Values Validator

**Helm values format validation tool**

This tool allows you to validate the format of your [Helm](https://helm.sh/docs/) values using
a [JSONSchema](https://json-schema.org/) with the Helm `pre-install` & `pre-upgrade hooks.

[![helm-3.14.0](https://img.shields.io/badge/helm-3.14.0-informational?style=flat-square)](https://helm.sh/docs/)
[![jsonschema-1.4.2](https://img.shields.io/badge/jsonschema-1.4.2-informational?style=flat-square)](https://json-schema.org/)
[![distroless~60mo](https://img.shields.io/badge/🥑%20distroless-~60mo-informational?style=flat-square)](https://github.com/GoogleContainerTools/distroless)
[![linux/amd64,linux/arm64,linux/arm/v7](https://img.shields.io/badge/🐳%20container-amd64%20arm64%20arm/v7-informational?style=flat-square)](https://hub.docker.com/r/franckrst/helm-values-validator)

*[French Readme](./README-FR.md) - [English Readme](./README.md)*

> **Features**
> * Helm values format validation
> * Display error messages in case of problems
> * Manual execution possible

---

## 🚀 Installation

1. Copy the `example/templates/tests/helm-values-validator.yaml` file to your Helm stack.
2. Add your `schema.json` to the root of your Helm chart (same level as the values.yaml).
3. Install the Helm chart with the `helm install` command.
4. (Optional) Convert your `values.yaml` file to `JSONSchema`
   on [jsonformater.org](https://jsonformatter.org/yaml-to-jsonschema)

## 📝 Logs

To see the validation error messages, you can use the following commands:

```shell
# Logs
kubectl logs release-name-helm-values-validator

# Error messages
kubectl get pod release-name-helm-values-validator -o go-template="{{range .status.containerStatuses}}{{.state.terminated.message}}{{end}}"
```

## 🧑‍🔧 Manual execution

If you want to run the validation without installing Helm, you can run the container with the files and variables as in
the following command:

```bash
docker run -it -v $(pwd)/values.json:/values.json -v $(pwd)/schema.json:/schema.json -e SCHEMA_FILE=/schema.json -e VALUES_FILE=/values.json franckrst/helm-values-validator:0.0.0-alpha
```

## 📐 Architecture

A simple Helm pre-install and pre-upgrade hook that deploys:

- A ConfigMap containing the schema.json file and a values.json file that contains the .Values variable.
- A Pod that launches the validation container in which the ConfigMap is mounted.

## License

MIT

## Thx

- [Github Action multiarch docker](https://dev.to/cloudx/multi-arch-docker-images-the-easy-way-with-github-actions-4k54)
