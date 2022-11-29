import { ProForm, ProFormRadio, ProFormSelect, ProFormText, CheckCard, ProCard} from '@ant-design/pro-components';
import {message, Upload, Modal, Button, Space} from 'antd';
import {useRequest} from "ahooks";
import {apiSubmitCollectionForm} from "../../api/api";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useRef, useState} from "react";
import uuid from 'react-uuid';

const getBase64 = (file =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
}));

export default () => {

    const {runAsync} = useRequest(apiSubmitCollectionForm, {manual: true});

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const [formType, setFormType] = useState('核酸');

    const [isInputName, setIsInputName] = useState(true);
    const [healthCodeFile, setHealthCodeFile] = useState([]);
    const [travelCodeFile, setTravelCodeFile] = useState([]);
    const [testScreenshotFile, setTestScreenshotFile] = useState([]);
    const [healthCodeFileId, setHealthCodeFileId] = useState('');
    const [travelCodeFileId, setTravelCodeFileId] = useState('');
    const [testScreenshotFileId, setTestScreenshotFileId] = useState('');

    const formRef = useRef({});


    useEffect(async () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLongitude(position.coords.longitude)//经度
                setLatitude(position.coords.latitude)//纬度
                // console.log(position.coords.longitude + ',' + position.coords.latitude)
                // message.success(position.coords.longitude + ',' + position.coords.latitude);
            // },
            // err => {
                // message.error(err.message);
            });
    }, []);

    const submitForm = async (values) => {
        values.formType = formType;
        values.position = longitude + ',' + latitude;
        values.healthCodeFileId = healthCodeFileId;
        values.travelCodeFileId = travelCodeFileId;
        values.testScreenshotFileId = testScreenshotFileId;
        runAsync(values).then((response) => {
            message.success(response.message);
        }).catch((e) => {
            message.error(e)
        });
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const healthCodeFileChange = ({fileList}) => setHealthCodeFile(fileList);
    const travelCodeFileChange = ({fileList}) => setTravelCodeFile(fileList);
    const testScreenshotFileChange = ({fileList}) => setTestScreenshotFile(fileList);

    const handleCancel = () => setPreviewOpen(false);

    const healthCodeData = () => {
        return {
            formType: '双码',
            fileType: '健康码',
            name: formRef.current.getFieldValue('name'),
            classNumber: formRef.current.getFieldValue('classNumber'),
            fileId: healthCodeFileId
        }
    }

    const travelCodeData = () => {
        return {
            formType: '双码',
            fileType: '行程卡',
            name: formRef.current.getFieldValue('name'),
            classNumber: formRef.current.getFieldValue('classNumber'),
            fileId: travelCodeFileId
        }
    }

    const testScreenshotData = () => {
        return {
            formType: '核酸',
            fileType: '核酸检测截图',
            name: formRef.current.getFieldValue('name'),
            classNumber: formRef.current.getFieldValue('classNumber'),
            fileId: testScreenshotFileId
        }
    }

    const beforeHealthCodeUpload = () => setHealthCodeFileId(uuid())

    const beforeTravelCodeUpload = () => setTravelCodeFileId(uuid())

    const beforeTestScreenshotUpload = () => setTestScreenshotFileId(uuid())

    const checkInputName = () => {
        setIsInputName(formRef.current.getFieldValue('name') === '');
    }

    const uploadHeathCode = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传健康码</div>
        </div>
    );

    const uploadTravelCode = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传行程卡</div>
        </div>
    );

    const uploadTestScreenshot = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传核酸截图</div>
        </div>
    );

    const twoCodeUpload = (
        <ProForm.Group style={{width: 328}}>
            <ProForm.Item label="健康码">
                <Upload
                    beforeUpload={beforeHealthCodeUpload}
                    data={healthCodeData}
                    action="http://ebai.cloud:9000/api/upload"
                    listType="picture-card"
                    fileList={healthCodeFile}
                    onPreview={handlePreview}
                    onChange={healthCodeFileChange}
                    disabled={isInputName}
                >
                    {healthCodeFile.length >= 1 ? null : uploadHeathCode}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </ProForm.Item>
            <ProForm.Item label="行程卡">
                <Space align="end">
                    <Upload
                        beforeUpload={beforeTravelCodeUpload}
                        data={travelCodeData}
                        action="http://ebai.cloud:9000/api/upload"
                        listType="picture-card"
                        fileList={travelCodeFile}
                        onPreview={handlePreview}
                        onChange={travelCodeFileChange}
                        disabled={isInputName}
                    >
                        {travelCodeFile.length >= 1 ? null : uploadTravelCode}
                    </Upload>
                    <Button shape="circle" onClick={() => {setHealthCodeFile([]);setTravelCodeFile([])}} icon={<DeleteOutlined />} style={{marginBottom: 10}}/>
                </Space>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </ProForm.Item>
        </ProForm.Group>
    )

    const testScreenshotUpload = (
        <ProForm.Item label="核酸检测截图" style={{width: 328}}>
            <Space align="end">
                <Upload
                    beforeUpload={beforeTestScreenshotUpload}
                    data={testScreenshotData}
                    action="http://ebai.cloud:9000/api/upload"
                    listType="picture-card"
                    fileList={testScreenshotFile}
                    onPreview={handlePreview}
                    onChange={testScreenshotFileChange}
                    disabled={isInputName}
                >
                    {testScreenshotFile.length >= 1 ? null : uploadTestScreenshot}
                </Upload>
                <Button shape="circle" onClick={() => {setTestScreenshotFile([])}} icon={<DeleteOutlined />} style={{marginBottom: 10}}/>
            </Space>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </ProForm.Item>
    )

    return (
        <div>
            <ProCard title="收集类型:" bordered layout={"center"}>
                <CheckCard.Group
                    onChange={(value) => {
                        setFormType(value)
                    }}
                    defaultValue="核酸"
                >
                    <CheckCard title="健康码&行程卡" description="每周一收集" value="双码" />
                    <CheckCard title="核酸检测截图" description="间隔一天收集" value="核酸" />

                </CheckCard.Group>
            </ProCard>
        <ProCard bordered title="填写信息:" style={{marginTop: 10}}>
            <ProForm

                onReset={() => {
                    setHealthCodeFile([]);
                    setTravelCodeFile([]);
                    setTestScreenshotFile([]);
                }}
                onFinish={submitForm}
                params={{}}
                submitter={false}
                formRef={formRef}
                request={async () => {
                return {
                    classNumber: '地科2班',
                    location: '在家',
                    name: ''
                };
            }}>
                <ProForm.Group>
                <ProFormSelect options={[
                    {
                        value: '地科1班',
                        label: '地科1班',
                    },
                    {
                        value: '地科2班',
                        label: '地科2班',
                    },
                ]} width="md" name="classNumber" label="班级"/>
                <ProFormText width="md" name="name" label="姓名" placeholder="请输入姓名后 再上传文件" onChange={checkInputName}/>
                </ProForm.Group>
                <ProForm.Group>
                    <div style={{width: 328}}>
                        <ProFormRadio.Group label="居住地" name="location" options={['在校', '在家', '居无定所']}/>
                    </div>
                    {formType === "双码" ? twoCodeUpload : testScreenshotUpload}
                </ProForm.Group>
                <ProForm.Item style={{textAlign: "center"}}>
                    <Button htmlType="submit" type="primary" style={{marginRight: 10, width: "70%"}}>
                        提交
                    </Button>
                    <Button htmlType="reset" onClick={() => {
                            setHealthCodeFile([]);
                            setTravelCodeFile([]);
                            setTestScreenshotFile([]);
                        }} style={{width: "20%"}}>
                        重置
                    </Button>
                </ProForm.Item>
            </ProForm>
        </ProCard>
        </div>
    );
};