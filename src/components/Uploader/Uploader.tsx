import { DeleteOutlined, DeliveredProcedureOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Card, Image, UploadProps } from "antd";
import { RcFile } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";
import { render } from "react-dom";

const Uploader = () => {
    const [image, setImage] = useState('');
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };


    const props: UploadProps = {
        name: 'image',
        multiple: false,
        showUploadList: false,
        action: 'https://api.imgbb.com/1/upload?expiration=600&key=e92e12605699a5941dd435e2cca7ea88',
        onChange(info) {
            if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setImage(url);
            });
            }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    const renderCard = () => {
        if (!image) return (
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
        )
        else if (image) return (
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
                    style={{color: 'red', borderColor: 'red', marginTop: '20px'}}
                    icon={<DeleteOutlined />}
                    onClick={() => setImage('')}
                    />
                    <Button 
                    style={{color: '#93e3c0', borderColor: '#93e3c0', marginTop: '20px', marginLeft: '20px'}}
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => null}
                    />
                </div>
            </div>
        )
    }
    return (
        <Card style={{borderRadius: '30px'}}>
            {renderCard()}
        </Card>
    )
};

export default Uploader;