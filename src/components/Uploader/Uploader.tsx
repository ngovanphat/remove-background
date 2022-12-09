import { VerticalAlignBottomOutlined,  ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import {  message, Image as AntdImage } from "antd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';

import { useDropzone } from "react-dropzone";
import { Typography } from 'antd';

import './Uploader.css';


const { Title } = Typography;

const Uploader = ({...params}) => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const passedImage = params.image;

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [resultImage, setResultImage] = useState('');
    const [tabIndex, setTabIndex] = useState(1);
    const [color, setColor] = useState('');

    const imageSize ={
        width: 500,
        height: 500,
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        handleDrop(acceptedFiles[0]);
      }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    useEffect(() => {
        if(passedImage) {
            deleteImage();
            handleDrop(passedImage[0])
        };
    }, [passedImage])
   
    const handleDrop = (file: any) => {
        if (beforeUpload(file)) {
            setImage(URL.createObjectURL(file));
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
            const image = await fetchImage(file) as Blob;
            setResultImage(URL.createObjectURL(image));
            pickColor(1);
            setLoading(false);
        } catch(e) {
            message.error(e as any);
        }
    };

    const fetchImage = async (file: any) => {
        const fileFormData = new FormData();
        fileFormData.append('file', file)
        axios.defaults.responseType = "blob"
        const image = await axios.post(apiURL, fileFormData);
        return image.data;
    }

    const download = async () => {
        const divElement = document.getElementById('result-image');
        const canvas = await html2canvas(divElement!)
        const link = document.createElement('a');
        link.download = `file-${Date.now()}.png`;
        link.href = canvas.toDataURL('png');
        link.click();
    }

    const deleteImage = () => {
        setImage('');
        setResultImage('');
    }

    const pickColor = (colorNumber: number)  => {
        setTabIndex(2);
        switch (colorNumber) {
            case 1: {
                setColor('transparent');
                break;
            }
            case 2: {
                setColor('white');
                break;
            }
            case 3: {
                setColor('black');
                break;
            }
            case 4: {
                setColor('purple');
                break;
            }
            case 5: {
                setColor('pink');
                break;
            }
            case 6: {
                setColor('yellow');
                break;
            }
            case 7: {
                setColor('picker');
                break;
            }
        }
    }
    return (
        <div className="upload-section">
            <Title>Xóa ảnh nền miễn phí cho bạn 👇</Title>
            <div className="upload-container">
                
                {/* header section */}
                {resultImage && <div className="action-container">
                    <div className="action-row">
                        <div className={("color-circle transparent ") + (color === 'transparent' ? 'color-active' : '')} onClick={() => pickColor(1)}></div>
                        <div className={("color-circle white ") + (color === 'white' ? 'color-active' : '')} onClick={() => pickColor(2)}></div>
                        <div className={("color-circle black ") + (color === 'black' ? 'color-active' : '')} onClick={() => pickColor(3)}></div>
                        <div className={("color-circle purple ") + (color === 'purple' ? 'color-active' : '')} onClick={() => pickColor(4)}></div>
                        <div className={("color-circle pink ") + (color === 'pink' ? 'color-active' : '')} onClick={() => pickColor(5)}></div>
                        <div className={("color-circle yellow ") + (color === 'yellow' ? 'color-active' : '')} onClick={() => pickColor(6)}></div>
                        <div className={("color-circle picker ") + (color === 'picker' ? 'color-active' : '')} onClick={() => pickColor(7)}></div>
                    </div>
                    <div className="action-row">
                        <div className="tab-controller">
                            <p className={"tab " + (tabIndex === 1 ? 'tab-active' : '')} onClick={() => setTabIndex(1)}>Trước</p>
                            <p className={"tab " + (tabIndex === 2 ? 'tab-active' : '')} onClick={() => setTabIndex(2)}>Sau</p>
                        </div>
                        <button className="refresh-button" onClick={() => deleteImage()}>
                            <ReloadOutlined />
                        </button>
                    </div>
                </div>}
                {loading && <div className="loading-container">
                    <div className="loader"></div>
                </div>}
                {/* //upload section */}
                {!image && <div 
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button className="button">
                    <PlusOutlined style={{marginRight: '10px'}}/>
                        Tải ảnh lên</button>
                    <p className="ant-upload-text">hoặc thả ảnh của bạn vào</p>
                </div>}

                {/* result section */}
                {(image && (tabIndex === 1 || loading)) && <AntdImage
                    className={(loading ? 'opacity' : '')}
                    style={{maxWidth: '600px', maxHeight: '500px'}}
                    src={image}
                    preview={false}
                />}
                {(resultImage && tabIndex === 2) && (<div 
                id="result-image"
                className={(color)}>
                    <AntdImage
                    style={{maxWidth: '600px', maxHeight: '500px'}}
                    src={resultImage}
                    preview={false}
                />
                </div>)}

                
            </div>
            {/* bottom section */}
            {resultImage && <button className="button download-button" onClick={() => download()}>
                <VerticalAlignBottomOutlined style={{marginRight: '20px'}}/>
                Tải ảnh
            </button>}
        </div>       
    )
};

export default Uploader;