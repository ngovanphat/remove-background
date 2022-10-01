import { DeleteOutlined, InboxOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Card, Image, message, Spin, Tabs, Divider } from "antd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import './Uploader.css'
import { useDropzone } from "react-dropzone";
interface ProcessImage {
    originalImage: string
    changedImage: string
    file: Blob | null
    loading: boolean
}
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
}
const Uploader = ({...params}) => {
    const [imageList, setImageList] = useState([] as ProcessImage[]);
    const [loading, setLoading] = useState(false);
    const forceUpdate = useForceUpdate();
    const passedImage = params.image;
   

    const onDrop = useCallback((acceptedFiles: any) => {
        handleDrop(acceptedFiles[0]);
      }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    useEffect(() => {
        if(passedImage) handleDrop(passedImage[0]);
    }, [passedImage])
   
    const handleDrop = (file: any) => {
        if (beforeUpload(file)) {
            customUpload(file);
        }
    }

    const beforeUpload = (file: any) => {
        const isImage = file.type.indexOf('image/') === 0;
        if (!isImage) {
            message.error('You can only upload image file!');
        }
        
        // You can remove this validation if you want
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Ảnh nên nhỏ hơn 5MB!');
        }
        return isImage && isLt5M;
    };

    const customUpload = async (file: any) => {
        try {
            setLoading(true)
            const result = {
                originalImage: URL.createObjectURL(file),
                changedImage: '',
                file: null,
                loading: true
            }
            imageList.push(result)
            setImageList(imageList);
            const image = await fetchImage(file) as Blob;
            result.changedImage = URL.createObjectURL(image);
            (result.file as any) = image;
            result.loading = false;
            imageList.pop()
            imageList.push(result)
            setImageList(imageList)
            setLoading(false);
        } catch(e) {
            message.error(e as any);
        }
    };

    const fetchImage = async (file: any) => {
        const fileFormData = new FormData();
        fileFormData.append('file', file)
        axios.defaults.responseType = "blob"
        const image = await axios.post('https://drab-pear-buffalo-belt.cyclic.app/upload-file', fileFormData);
        return image.data;
    }

    const download = async (file: Blob) => {
        const link = document.createElement('a');
        link.download = `file-${Date.now()}.png`;
        link.href = URL.createObjectURL(file!);
        link.click();
    }

    const deleteImage = (index: number) => {
        imageList.splice(index, 1);
        setImageList(imageList);
        forceUpdate();
    }


    const renderResult = () => {
        return (
            <div className="card-result-col">
            {imageList.map((image: any, index: number) => (
            <Card 
            key={index}
            style={{marginTop: '10px', width: '500px'}} loading={image.loading}>
                <Tabs defaultActiveKey="2">
                    <Tabs.TabPane tab="Ảnh gốc" key="1">
                        <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                            <Image
                                    width={400}
                                    src={image.originalImage}
                                    preview={{
                                    src: image.originalImage
                                    }}
                                />
                            <div style={{display: "flex", alignItems: 'center', flexDirection: 'row'}}>
                                <Button 
                                style={{color: 'red', borderColor: 'red', marginTop: '20px'}}
                                icon={<DeleteOutlined />}
                                onClick={() => deleteImage(index)}
                                />
                            </div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Ảnh xóa phông" key="2">
                        <div style={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                            <Image
                                    width={400}
                                    src={image.changedImage}
                                    preview={{
                                    src: image.changedImage
                                    }}
                                    className="checkboard-background"
                                />
                            <div style={{display: "flex", alignItems: 'center', flexDirection: 'row'}}>
                                <Button 
                                style={{marginTop: '20px', color: '#3590FF', borderColor: '#3590FF'}}
                                icon={<VerticalAlignBottomOutlined />}
                                onClick={() => download(image.file)}
                                />
                            </div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Card>
            ))}
            </div>
        )
    }

    return (
        <div className="upload-section">
                <div className="upload-drag-container">
                { loading && <div style={{
                    width: '100%', backgroundColor: 'white', position: 'absolute', top: 0, zIndex: 9, height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Spin size="large" />
                    </div>}
                    <div 
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                    {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{fontSize: '40px'}}/>
                        </p>
                        <p className="ant-upload-text">Nhấn vào hoặc thả ảnh của bạn vào</p>
                    </div>
                </div>
            <Divider />
            {imageList.length !== 0 && renderResult()}
        </div>
        
    )
};

export default Uploader;