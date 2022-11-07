import { Col, Row, Card, Button, Typography, Avatar} from "antd";
import './Home.css'
import demoImage from '@/assets/demo-image.png'
import curveArrow from '@/assets/icons/curve-arrow.svg'
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const Home = () => {
    const navigate = useNavigate();

    const demoImageUrl = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg",
    "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/08/Pictures/_6bda0940-b9ad-11e9-98cb-e738ad509720.jpg"]

    const onDrop = useCallback((acceptedFiles: any) => {
        navigate('/upload', {state: acceptedFiles})
      }, [])
    const {getRootProps, getInputProps } = useDropzone({onDrop})
    const onNavigateUpload = () => {
        navigate('/upload');
    }


    const loadImage = (url: string) => {
        axios.defaults.responseType = "blob"
        axios.get(url).then((response: any) => {
            return response.data;
        }).then((blob) =>
        {
            const file = new File([blob], "image.png",{
                type: "image/png",
                lastModified: Date.now()
              });
            navigate('/upload', {state: [file]})
        });
    }


    return (
        <div className="home-page">
            <Row style={{padding: '3rem', margin: 'auto', justifyContent: 'center', alignItems: 'center'}} className="row">
                <Col className="column" >
                    <h1>Công cụ xóa ảnh nền cho bạn</h1>
                    <p className="lead">Tách nền xóa phông cực đỉnh, 100%
                    <span style={{fontWeight: '700', marginLeft: 10, position: 'relative'}}>
                        Miễn Phí
                        <span style={{height: '4px', background: 'rgb(147, 227, 192)', position: 'absolute', left: '0px', bottom: '-4px', right: '0px', }}></span>
                    </span>
                    </p>
                    <div className="background-image-container">
                         <img className="demo-image" src={demoImage} alt="demo image" />
                    </div>
                </Col>
                <Col  className="column icon-column" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '20px'}}>
                    <img src={curveArrow} alt="curve arrow icon" style={{color: '#93e3c0 !important'}}/>
                </Col>
                <Col  className="column upload-column" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Card className="upload-card" bodyStyle={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <PlusCircleOutlined className="upload-card-icon" />
                            <Button 
                            onClick={onNavigateUpload}
                            type="primary" shape="round" icon={<UploadOutlined />} size='large'>
                                Tải ảnh lên
                            </Button>
                            <Typography.Text style={{marginTop: '10px'}}>hoặc thả ảnh vào đây</Typography.Text>
                        </Card>
                    </div>

                    <Row style={{marginTop: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <Col style={{lineHeight: '20px', fontSize: '700'}}>
                            <p className="demo-text">Không có ảnh?</p>
                            <p className="demo-text">Dùng thử nhé:</p>
                        </Col>
                        <Col style={{marginLeft: '10px'}}>
                            <Row style={{display: 'flex', gap: '5px'}}>
                                {demoImageUrl.map(url => <Avatar
                                    onClick={() => loadImage(url)}
                                    shape="square" src={url} />)}
                            </Row>                        
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )

}

export default Home;