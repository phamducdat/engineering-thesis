import {CustomAxiosRequestConfig, DP_keycloakAxios } from "../../../custom/axios"

export const copyBrowserAuthentication = async (newName: string) => {
    const config: CustomAxiosRequestConfig = {disableMessage: true}
    const response = await DP_keycloakAxios.post("/admin/realms/master/authentication/flows/browser/copy", {
        newName: newName
    }, config)
    return response.data || []
}

export const getExecutionsByFlowAlias = async (flowAlias: string) => {
    const config: CustomAxiosRequestConfig = {disableMessage: true}
    const response = await DP_keycloakAxios.get(`/admin/realms/master/authentication/flows/${flowAlias}/executions`, config)
    return response.data || []
}


export const addExecution = async (newName: string) => {
    const config: CustomAxiosRequestConfig = {captureLocationHeader: true, disableMessage: true}
    const response = await DP_keycloakAxios.post(`/admin/realms/master/authentication/flows/${newName}/executions/execution`, {
        provider: "auth-x509-client-username-form"
    }, config)
    return response.data || []
}


export const raisePriorityExecution = async (executionId: string) => {
    const config: CustomAxiosRequestConfig = {
        customMessage: {
            type: "success",
            message: "Cập nhật thành công"
        }
    }
    const response = await DP_keycloakAxios.post(`/admin/realms/master/authentication/executions/${executionId}/raise-priority`,
        {"realm": "master", "execution": executionId}, config)
    return response.data || []
}

export const lowerPriorityExecution = async (executionId: string) => {
    const config: CustomAxiosRequestConfig = {
        customMessage: {
            type: "success",
            message: "Cập nhật thành công"
        }
    }
    const response = await DP_keycloakAxios.post(`/admin/realms/master/authentication/executions/${executionId}/lower-priority`,
        {"realm": "master", "execution": executionId}, config)
    return response.data || []
}

export const getExecutionById = async (executionId: string) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/master/authentication/executions/${executionId}`)
    return response.data || []
}

export const getConfigAuthenticationById = async (authenticationId: string) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/master/authentication/config/${authenticationId}`)
    return response.data || []

}

export const createConfigAuthentication = async (executionId: string,
                                                 configAlias: string) => {
    const config: CustomAxiosRequestConfig = {captureLocationHeader: true, disableMessage: true}
    const response = await DP_keycloakAxios.post(`/admin/realms/master/authentication/executions/${executionId}/config`,
        {
            "config": {
                "x509-cert-auth.mapping-source-selection": "Subject's e-mail",
                "x509-cert-auth.canonical-dn-enabled": "false",
                "x509-cert-auth.serialnumber-hex-enabled": "false",
                "x509-cert-auth.regular-expression": "(.*?)(?:$)",
                "x509-cert-auth.mapper-selection": "Username or Email",
                "x509-cert-auth.mapper-selection.user-attribute-name": "usercertificate",
                "x509-cert-auth.timestamp-validation-enabled": "true",
                "x509-cert-auth.crl-checking-enabled": "",
                "x509-cert-auth.crldp-checking-enabled": "false",
                "x509-cert-auth.crl-relative-path": "crl.pem",
                "x509-cert-auth.ocsp-checking-enabled": "",
                "x509-cert-auth.ocsp-fail-open": "false",
                "x509-cert-auth.confirmation-page-disallowed": "",
                "x509-cert-auth.revalidate-certificate-enabled": "",
                "x509-cert-auth.certificate-policy-mode": "All"
            }, "alias": configAlias
        }, config)
    return response.data || []
}

export const updateConfigAuthentication = async (configId: string,
                                                 data:any) => {
    const response = await DP_keycloakAxios.put(`/admin/realms/master/authentication/config/${configId}`,
        data)
    return response.data || []
}

export const updateExecutionById = async (flowName: string,
                                          executionId: string,
                                          requirement: string,
                                          disableMessage: boolean = false
) => {
    const config: CustomAxiosRequestConfig = {disableMessage: disableMessage}
    const response = await DP_keycloakAxios.put(`/admin/realms/master/authentication/flows/${flowName}/executions`, {
        id: executionId,
        requirement: requirement
    }, config)
    return response.data || []
}

export const updateConfigOTP = async (data: any) => {
    const config: CustomAxiosRequestConfig = {disableMessage: true}
    const response = await DP_keycloakAxios.put(`/admin/realms/master/authentication/required-actions/CONFIGURE_TOTP`, data, config)
    return response.data || []
}