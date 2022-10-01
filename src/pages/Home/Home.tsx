import { Col, Row, Card, Button, Typography} from "antd";
import './Home.css'
import demoImage from '@/assets/demo-image.png'
import curveArrow from '@/assets/icons/curve-arrow.svg'
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const Home = () => {
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: any) => {
        navigate('/upload', {state: acceptedFiles})
      }, [])
    const {getRootProps, getInputProps } = useDropzone({onDrop})
    const onNavigateUpload = () => {
        navigate('/upload');
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
                <Col  className="column icon-column" style={{display: 'flex', alignItems: 'center'}}>
                    <img src={curveArrow} alt="curve arrow icon" style={{color: '#93e3c0 !important'}}/>
                </Col>
                <Col  className="column upload-column" style={{display: 'flex', alignItems: 'center'}}>
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
                </Col>
            </Row>
        </div>
    )

}

export default Home;