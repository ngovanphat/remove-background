import { DeleteOutlined, DeliveredProcedureOutlined, InboxOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Card, Image, message, UploadProps, Spin, Tabs } from "antd";
import { RcFile } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const Uploader = () => {
    const [image, setImage] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [loading, setLoading] = useState(false)
    const getBase64 = (img: File, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {  
                setOldImage(imageUrl)
                setImage(URL.createObjectURL(info.file.xhr.data))
                setLoading(false);
            });
        }
    };  
    const beforeUpload = (file: any) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
        message.error('You can only upload image file!');
    }
    
    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
    };

    const customUpload = async (options: any) => {
        // const storage = getStorage()
        // const metadata = {
        //     contentType: 'image/jpeg'
        // }
        // const storageRef = await ref(storage);
        // const imageName = `image-number-${Date.now()}`; //a unique name for the image
        // const imgFile = ref(storageRef, `Vince Wear/${imageName}.png`);
        try {
        //   const image = await uploadBytes(imgFile, options.file, metadata);
        const fileFormData = new FormData();
        fileFormData.append('file', options.file)
        axios.defaults.responseType = "blob"
        const image = await axios.post('http://118.69.190.178:5000/remove', fileFormData);
        options.onSuccess(null, image);
        } catch(e) {
            console.log(e)
           options.onError(e)
        }
    };

    const props: UploadProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        // action: 'https://api.imgbb.com/1/upload?expiration=600&key=e92e12605699a5941dd435e2cca7ea88',
        beforeUpload: beforeUpload,
        onChange: handleChange,
        customRequest: customUpload
    };
    useEffect(() => {
        console.log(loading)
    },[loading])

    const renderCard = () => {
        if (!image) return (
            <div style={{position: 'relative'}}>
               {loading && <div style={{width: '100%', backgroundColor: 'white', position: 'absolute', top: 0, zIndex: 10, height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <Spin size="large" />
                </div>}
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                    </p>
                </Dragger>
            </div>
        )
        else if (image && oldImage) return (
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Upload" key="1">
                    <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                        <Image
                                width={400}
                                src={oldImage}
                                preview={{
                                src: oldImage
                                }}
                            />
                        <div style={{display: "flex", alignItems: 'center', flexDirection: 'row'}}>
                            <Button 
                            style={{color: 'red', borderColor: 'red', marginTop: '20px'}}
                            icon={<DeleteOutlined />}
                            onClick={() => setImage('')}
                            />
                        </div>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Proccessed" key="2">
                    <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                        <Image
                                width={400}
                                src={image}
                                preview={{
                                src: image
                                }}
                            />
                        <div style={{display: "flex", alignItems: 'center', flexDirection: 'row'}}>
                            <Button 
                            style={{marginTop: '20px', color: '#3590FF', borderColor: '#3590FF'}}
                            icon={<VerticalAlignBottomOutlined />}
                            onClick={() => setImage('')}
                            />
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
            
        )
    }
    return (
        <Card style={{borderRadius: '30px', width: '100%'}}>
            {renderCard()}
        </Card>
    )
};

export default Uploader;