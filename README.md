<div style="text-align: center;">

# ✅ Helm Values Validator

*Cette outils vous permet de valider le format de vos values helm a l'aide un [JsonSchema](https://json-schema.org/) avec les hook helm `pre-install` & `pre-upgrade`*


</div>

![helm-3.14.0](https://img.shields.io/badge/helm-3.14.0-informational?style=flat-square)
![jsonschema-1.4.2](https://img.shields.io/badge/jsonschema-1.4.2-informational?style=flat-square)
![distroless~150mo](https://img.shields.io/badge/distroless-~150mo-informational?style=flat-square)

---

## 🚀 Installation

Pour implémenter votre Helm Values Validator:

- Copier/Coller le fichier [`exemple/templates/tests/helm-values-validator.yaml`](exemple/templates/tests/helm-values-validator.yaml) dans votre stack helm.
- Ajouter votre `schema.json` à la racine de votre HELM (méme niveau que le `values.yaml`)

## 📝 Logs

Pour voir l'erreur des validation vous pouvez utiliser :

```shell
# Les logs
kubectl logs release-name-helm-values-validator

# Les terminated messages
kubectl get pod  -n demo-test test-demo-helm-values-validator -o go-template="{{range .status.containerStatuses}}{{.state.terminated.message}}{{end}}"
```

> Vous pouvez ajouter ces info a votre fichier `NOTES.txt`

## 🧑‍🔧 Execution manuel
Si vous voulez executer manuelment la validation sans lancer d'instalation helm.
Vous pouvez executer le container avec les fichier et variables comme dans la commande si dessou.

```bash
 docker run -it -v $(pwd)/values.json:/values.json -v $(pwd)/schema.json:/schema.json -e SCHEMA_FILE=/schema.json -e VALUES_FILE=/values.json franckrst/helm-values-validator:0.0.0-alpha
```

