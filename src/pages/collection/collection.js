import {
    message,
    Upload,
    Modal,
    Button,
    Space,
    Card,
    Form,
    Select, Input, Radio, Typography, Divider,
} from 'antd';
import {useRequest} from "ahooks";
import {apiSubmitCollectionForm} from "../../api/api";
import {AlertOutlined, DeleteOutlined, EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import uuid from 'react-uuid';
import {filetypes} from "compress-create-react-app/src/defaultConfig";

const getBase64 = (file =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
}));

const tabList = [
    {
        key: '核酸',
        tab: '核酸检测截图',
    },
    {
        key: '双码',
        tab: '健康码&行程卡截图',
    },
];

const validateMessages = {
    required: '${label} 为必填项',
};

export default () => {

    // API
    const {runAsync} = useRequest(apiSubmitCollectionForm, {manual: true});
    // 上传预览
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // 经纬度
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    // Form
    const [form] = Form.useForm();
    const [formType, setFormType] = useState('核酸');
    const [isInputName, setIsInputName] = useState(true);
    // 上传
    const [healthCodeFile, setHealthCodeFile] = useState([]);
    const [travelCodeFile, setTravelCodeFile] = useState([]);
    const [testScreenshotFile, setTestScreenshotFile] = useState([]);
    const [healthCodeFileId, setHealthCodeFileId] = useState('');
    const [travelCodeFileId, setTravelCodeFileId] = useState('');
    const [testScreenshotFileId, setTestScreenshotFileId] = useState('');

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
        values.position = [longitude, latitude];
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

    const healthCodeFileChange = ({fileList}) => {
        setHealthCodeFile(fileList);
        form.setFieldValue("healthCodeFile", healthCodeFileId);
        form.setFieldValue("healthCodeFileValue", "健康码-" + form.getFieldValue("name") + "-" + healthCodeFileId);
        form.setFieldValue("twoCodeFile", (form.getFieldValue("healthCodeFile") && form.getFieldValue("travelCodeFile")) ? [form.getFieldValue("healthCodeFile"), form.getFieldValue("travelCodeFile")] : "");
        console.log(form.getFieldValue("twoCodeFile"));
    }
    const travelCodeFileChange = ({fileList}) => {
        setTravelCodeFile(fileList);
        form.setFieldValue("travelCodeFile", travelCodeFileId);
        form.setFieldValue("travelCodeFileValue", "行程卡-" + form.getFieldValue("name") + "-" + travelCodeFileId);
        form.setFieldValue("twoCodeFile", (form.getFieldValue("healthCodeFile") && form.getFieldValue("travelCodeFile")) ? [form.getFieldValue("healthCodeFile"), form.getFieldValue("travelCodeFile")] : "");
        console.log(form.getFieldValue("twoCodeFile"));
    }
    const testScreenshotFileChange = ({fileList}) => {
        setTestScreenshotFile(fileList);
        form.setFieldValue("testScreenshotFile", testScreenshotFileId);
        form.setFieldValue("testScreenshotFileValue", "核酸检测截图-" + form.getFieldValue("name") + "-" + testScreenshotFileId);
    }

    const twoCodeUpload = (
        <Form.Item label="双码截图" name="twoCodeFile" rules={[{required: true}]} tooltip="先填写姓名才能上传">
            <Input value={form.getFieldValue("healthCodeFileValue")} style={{width: "100%"}} disabled />
            <Input value={form.getFieldValue("travelCodeFileValue")} style={{width: "100%"}} disabled />
            <Space align="end" style={{marginTop: 15}}>
                <Upload
                    beforeUpload={() => setHealthCodeFileId(uuid())}
                    data={{
                        formType: '双码',
                        fileType: '健康码',
                        name: form.getFieldValue("name"),
                        classNumber: form.getFieldValue("classNumber"),
                        fileId: healthCodeFileId
                    }}
                    action="http://ebai.cloud:9000/api/upload"
                    listType="picture-card"
                    fileList={healthCodeFile}
                    onPreview={handlePreview}
                    onChange={healthCodeFileChange}
                    disabled={isInputName}
                >
                    {healthCodeFile.length >= 1 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上传健康码</div>
                        </div>
                    )}
                </Upload>
                <Upload
                    beforeUpload={() => setTravelCodeFileId(uuid())}
                    data={{
                        formType: '双码',
                        fileType: '行程卡',
                        name: form.getFieldValue("name"),
                        classNumber: form.getFieldValue("classNumber"),
                        fileId: travelCodeFileId
                    }}
                    action="http://ebai.cloud:9000/api/upload"
                    listType="picture-card"
                    fileList={travelCodeFile}
                    onPreview={handlePreview}
                    onChange={travelCodeFileChange}
                    disabled={isInputName}
                >
                    {travelCodeFile.length >= 1 ? null :
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上传行程卡</div>
                        </div>
                    }
                </Upload>
                <Button shape="circle" onClick={() => {
                        setHealthCodeFile([]);
                        setTravelCodeFile([]);
                        form.resetFields([
                            "twoCodeFile",
                            "healthCodeFile",
                            "travelCodeFile",
                            "healthCodeFileValue",
                            "travelCodeFileValue"]);}}
                    icon={<DeleteOutlined />}
                    style={{marginBottom: 10}}
                />
            </Space>
        </Form.Item>
    )

    const testScreenshotUpload = (
        <Form.Item label="核酸检测截图" name="testScreenshotFile" rules={[{required: true}]} tooltip="先填写姓名才能上传">
            <Input value={form.getFieldValue("testScreenshotFileValue")} style={{width: "100%"}} disabled />
            <Space align="end" style={{marginTop: 15}}>
                <Upload
                    beforeUpload={() => setTestScreenshotFileId(uuid())}
                    data={{
                        formType: '核酸',
                        fileType: '核酸检测截图',
                        name: form.getFieldValue("name"),
                        classNumber: form.getFieldValue("classNumber"),
                        fileId: testScreenshotFileId
                    }}
                    action="http://ebai.cloud:9000/api/upload"
                    listType="picture-card"
                    fileList={testScreenshotFile}
                    onPreview={handlePreview}
                    onChange={testScreenshotFileChange}
                    disabled={isInputName}
                >
                    {testScreenshotFile.length >= 1 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上传核酸截图</div>
                        </div>
                    )}
                </Upload>
                <Button
                    shape="circle"
                    onClick={() => {
                        setTestScreenshotFile([]);
                        form.resetFields(["testScreenshotFile", "testScreenshotFileValue"])}}
                    icon={<DeleteOutlined />}
                    style={{marginBottom: 10}}
                />
            </Space>
        </Form.Item>
    )

    return (
        <Card
            style={{
                width: '100%',
                maxWidth: 700,
            }}
            tabList={tabList}
            activeTabKey={formType}
            tabBarExtraContent={<EllipsisOutlined />}
            onTabChange={(key) => setFormType(key)}
        >
            <Form
                labelCol={{span: 5}}
                initialValues={{
                    classNumber: "地科2班",
                    location: "在家",
                    healthCodeFileValue: "健康码截图: <待上传>",
                    travelCodeFileValue: "行程卡截图: <待上传>",
                    testScreenshotFileValue: "核酸检测截图: <待上传>"
                }}
                form={form}
                onFinish={submitForm}
                onValuesChange={() =>
                    setIsInputName(
                        form.getFieldValue("name") === '' ||
                        form.getFieldValue("name") === undefined ||
                        form.getFieldValue("name") === null)
                }
                validateMessages={{
                    required: '${label}为必填项',
                }}
            >
                <Form.Item label="姓名" name="name" rules={[{required: true}]}>
                    <Input style={{width: "100%"}} placeholder="请输入姓名后 再上传文件" />
                </Form.Item>
                <Form.Item label="班级" name="classNumber" rules={[{required: true}]}>
                    <Select
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: 8,
                                    }}
                                />
                                <Button type="text" icon={<AlertOutlined />} disabled>
                                    增加班级请联系 => 黄敏倩
                                </Button>
                            </>
                        )}>
                        <Select.Option value="地科1班">地科1班</Select.Option>
                        <Select.Option value="地科2班">地科2班</Select.Option>
                        <Select.Option value="小白云开发开发组">小白云开发开发组</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="居住情况" name="location" rules={[{required: true}]}>
                    <Radio.Group>
                        <Radio value="在校">在校</Radio>
                        <Radio value="在家">在家</Radio>
                        <Radio value="居无定所">居无定所</Radio>
                    </Radio.Group>
                </Form.Item>
                {formType === "双码" ? twoCodeUpload : testScreenshotUpload}
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <div style={{width: "100%", textAlign: "center"}}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{marginRight: 5, width: "70%"}}
                    >
                        提交
                    </Button>
                    <Button
                        htmlType="reset" onClick={() => {
                            setHealthCodeFile([]);
                            setTravelCodeFile([]);
                            setTestScreenshotFile([]);
                            form.resetFields();
                        }}
                        style={{marginLeft: 5, width: "20%"}}
                    >
                        重置
                    </Button>
                </div>
            </Form>
        </Card>
    )
};