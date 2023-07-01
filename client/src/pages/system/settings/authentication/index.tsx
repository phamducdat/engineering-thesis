import React, {useEffect, useState} from 'react';
import {
    addExecution,
    configAuthentication,
    copyBrowserAuthentication,
    getExecutionsByFlowAlias,
    raisePriorityExecution,
    updateExecutionById
} from "../../../../api/system/authentication";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";
import {DP_Table} from "../../../../custom/data-display/table";
import {Checkbox} from "antd";


const requirementOptions = [
    {
        value: 'REQUIRED',
        label: 'Bắt buộc',
    },
    {
        value: 'ALTERNATIVE',
        label: 'Có thể thay thế',
    },
    {
        value: 'DISABLE',
        label: 'Không hoạt động',
    },
]

const CheckboxGroup = Checkbox.Group;
const Authentication: React.FC = () => {

    const alias = "DCX509"
    const configAlias = "CDCX509"

    const [dataSource, setDataSource] = useState<any []>([]);
    const [noDCX509Installed, setNoDCX509Installed] = useState(false)


    useEffect(() => {
        getExecutionsByFlowAlias(alias).then((response) => {
            setDataSource(response?.filter((element: any) =>
                element.displayName === "X509/Validate Usewrname Form"
                || element.displayName === "DCX509 forms"
            ))
        }).catch((error) => {
            if (error?.response?.status === 404) {
                setNoDCX509Installed(true)
                setDataSource([
                    {
                        displayName: "browser forms",
                        requirement: "REQUIRED"
                    },
                    {
                        displayName: "X509/Validate Username Form",
                        requirement: "DISABLE"
                    }
                ])
            }
        })

    }, [])


    const columns = [
        {
            title: "Loại xác thực",
            dataIndex: "displayName",
            key: "displayName",
            render: (text: string, record: any) => {
                if (text === "X509/Validate Username Form")
                    return "Chứng chỉ số"
                else
                    return "Tài khoản, mật khẩu"
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "requirement",
            key: "requirement",
            render: (text: string, record: any) => {
                return <CheckboxGroup options={requirementOptions} value={[text]}/>
            }
        }
    ]


    const createDigitalCertificate = () => {
        copyBrowserAuthentication(alias).then(() => {
            addExecution(alias).then((response) => {
                const location = response.location
                const executionId = location.substring(location.lastIndexOf('/') + 1)


                configAuthentication(executionId, configAlias).then((response) => {
                    const location = response.location
                    const configId = location.substring(location.lastIndexOf('/') + 1)

                })

                updateExecutionById(alias, executionId).then(() => {
                    raisePriorityExecution(executionId).then((response) => {

                    })
                })

                getRealmInfoByRealmId("master").then((response) => {
                    updateRealmByRealmId("master", {
                        ...response,
                        browserFlow: alias
                    }).then(r => {

                    })
                })
            })
        })
    }

    return (
        <div>
            {/*<Button onClick={createDigitalCertificate}>*/}
            {/*    Xác thực bằng chứng chỉ số*/}
            {/*</Button>*/}

            <DP_Table
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default Authentication;
