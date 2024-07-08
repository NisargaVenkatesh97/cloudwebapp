import * as k8s from '@kubernetes/client-node'
import appConfig from '../../configs/app.config'

const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sCustomApi = kc.makeApiClient(k8s.CustomObjectsApi)

const createCustomResourceBody = ({
  id,
  name,
  url,
  retries,
  res_code = 200,
}) => {
  return {
    apiVersion: `${appConfig.K8S_GROUP}/${appConfig.K8S_API_VERSION}`,
    kind: appConfig.K8S_CR_KIND,
    metadata: {
      // labels: [
      //   'app.kubernetes.io/name: cron:',
      //   'app.kubernetes.io/instance: cron-sample',
      //   'app.kubernetes.io/part-of: test-operator',
      //   'app.kubernetes.io/managed-by: kustomize',
      //   'app.kubernetes.io/created-by: test-operator',
      // ],
      name: id,
    },
    spec: {
      http_check_id: id,
      name,
      url,
      retries,
      res_code,
      broker_0: appConfig.K8S_BROKER_0,
      broker_1: appConfig.K8S_BROKER_1,
      broker_2: appConfig.K8S_BROKER_2,
      client_id: appConfig.K8S_CLIENT_ID,
      dockerConfigJSON: appConfig.K8S_DOCKER_CONFIG_JSON,
      topic: appConfig.K8S_TOPIC,
      schedule: '* * * * *',
    },
  }
}

export const createCustomResource = (params) => {
  const body = createCustomResourceBody(params)

  k8sCustomApi
    .createNamespacedCustomObject(
      appConfig.K8S_GROUP,
      appConfig.K8S_API_VERSION,
      appConfig.K8S_NAMESPACE,
      appConfig.K8S_CR_KIND_PLURAL,
      body
    )
    .then((res) => {
      console.log('createNamespacedCustomObject res:', JSON.stringify(res))
    })
    .catch((err) => {
      console.log('createNamespacedCustomObject err:', JSON.stringify(err))
    })
}

export const patchCustomResource = (cr_name, params) => {
  const options = {
    headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH },
  }
  const body = createCustomResourceBody({ ...params })
  const patch = [
    {
      op: 'replace',
      path: '/spec',
      value: { ...body.spec },
    },
  ]

  k8sCustomApi
    .patchNamespacedCustomObject(
      appConfig.K8S_GROUP,
      appConfig.K8S_API_VERSION,
      appConfig.K8S_NAMESPACE,
      appConfig.K8S_CR_KIND_PLURAL,
      cr_name,
      patch,
      undefined,
      undefined,
      undefined,
      options
    )
    .then((res) => {
      console.log('patchNamespacedCustomObject res:', JSON.stringify(res))
    })
    .catch((err) => {
      console.log('patchNamespacedCustomObject err:', JSON.stringify(err))
    })
}

export const deleteCustomResource = (name) => {
  k8sCustomApi
    .deleteNamespacedCustomObject(
      appConfig.K8S_GROUP,
      appConfig.K8S_API_VERSION,
      appConfig.K8S_NAMESPACE,
      appConfig.K8S_CR_KIND_PLURAL,
      name
    )
    .then((res) => {
      console.log('deleteNamespacedCustomObject res:', JSON.stringify(res))
    })
    .catch((err) => {
      console.log('deleteNamespacedCustomObject err:', JSON.stringify(err))
    })
}
