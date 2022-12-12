import { VerticalAlignBottomOutlined,  ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import {  message, Image as AntdImage } from "antd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';

import { useDropzone } from "react-dropzone";
import { Typography } from 'antd';

import './Uploader.css';
import colorPickerIcon from '@/assets/icons/color-picker-icon.svg';


const { Title } = Typography;

const Uploader = ({...params}) => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const passedImage = params.image;
    const colors = ['transparent','#ffffff','#000000','#d291ff','#de3163','#eaddca','other'] as string[]


    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [resultImage, setResultImage] = useState('');
    const [tabIndex, setTabIndex] = useState(1);
    const [color, setColor] = useState('');
    const [backgroundUrl, setBackgroundUrl] = useState('src/assets/checkerboard.png') 

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
            message.error('Tụi mình chỉ hỗ trợ xử lý ảnh thôi bạn nhé!');
        }
        
        // You can remove this validation if you want
        const isLt5M = file.size / 1024 / 1024 < 25;
        if (!isLt5M) {
            message.error('Ảnh nên nhỏ hơn 25MB!');
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
                setBackgroundUrl('src/assets/checkerboard.png')
                break;
            }
            case 2: {
                setColor(colors[1]);
                break;
            }
            case 3: {
                setColor(colors[2]);
                break;
            }
            case 4: {
                setColor(colors[3]);
                break;
            }
            case 5: {
                setColor(colors[4]);
                break;
            }
            case 6: {
                setColor(colors[5]);
                break;
            }
            case 7: {
                const colorInput = document.getElementById('color-picker-input') as HTMLInputElement;
                setColor(colorInput.value || '#000000')
                colorInput?.click();
                break;
            }
            case 8: {
                setColor('other');
                break;
            }
        }
    }

    const onChangePicker = (event: any) => {
        setColor(event.target.value)
    }

    const uploadBackground = () => {
        pickColor(8);
        const uploadBackgroundInput = document.getElementById("upload-background") as HTMLInputElement;
        uploadBackgroundInput.click();
    }

    const handleUploadNewBackground = (e: any) => {
        const file = e.target.files[0]
        if (beforeUpload(file))
            setBackgroundUrl(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <div className="upload-section">
            <Title>Xóa ảnh nền miễn phí cho bạn 👇</Title>
            <div className="upload-container">
                
                {/* header section */}
                {resultImage && <div className="action-container">
                    <div className="action-row">
                        <div className={("color-circle transparent ") + (color === 'transparent' ? 'color-active' : '')} onClick={() => pickColor(1)}></div>
                        <div className={("color-circle white ") + (color === colors[1] ? 'color-active' : '')} onClick={() => pickColor(2)}></div>
                        <div className={("color-circle black ") + (color === colors[2] ? 'color-active' : '')} onClick={() => pickColor(3)}></div>
                        <div className={("color-circle purple ") + (color === colors[3] ? 'color-active' : '')} onClick={() => pickColor(4)}></div>
                        <div className={("color-circle pink ") + (color === colors[4] ? 'color-active' : '')} onClick={() => pickColor(5)}></div>
                        <div className={("color-circle yellow ") + (color === colors[5] ? 'color-active' : '')} onClick={() => pickColor(6)}></div>
                        <div className={("color-circle picker ") + (!colors.includes(color) ? 'color-active' : '')} onClick={() => pickColor(7)}>
                            <img src={colorPickerIcon} alt="icon" style={{
                                width: '15px',
                                height: '15px'
                            }}/>
                            <input type="color" id="color-picker-input" name="head"
                            style={{zIndex: -1, 
                                top: '-20px',
                                position: 'absolute', width: '0', height: '5px'}}
                            value={color}
                            onChange={(value) => onChangePicker(value)}
                            ></input>
                        </div>

                        <div className={"color-circle picker add-background " + (color == 'other' ? 'color-active' : '')} onClick={() => uploadBackground()}>
                            <input type="file" id="upload-background" 
                            onChange={handleUploadNewBackground}
                            style={{display: 'none'}} />
                            <PlusOutlined/>
                        </div>
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
                style={{background: !(['other', 'transparent'].includes(color)) ? color : `url(${backgroundUrl})`}}>
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