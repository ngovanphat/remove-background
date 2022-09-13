import { Col, message, Row, UploadProps, Image, Card, Button, Upload } from "antd";
import './Home.css'
import demoImage from '@/assets/demo-image.png'
import curveArrow from '@/assets/icons/curve-arrow.svg'
import Dragger from "antd/lib/upload/Dragger";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import DeliveredProcedureOutlined from "@ant-design/icons/lib/icons/DeliveredProcedureOutlined";

import Uploader from "@/components/Uploader/Uploader";
const Home = () => {
    return (
        <div className="home-page">
        <Row style={{padding: '3rem', margin: 'auto'}}>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                <h1>Remove Image Background</h1>
                <p className="lead">100% Automatically and
                <span style={{fontWeight: '700', marginLeft: 10, position: 'relative'}}>
                    Free
                    <span style={{height: '4px', background: 'rgb(147, 227, 192)', position: 'absolute', left: '0px', bottom: '-4px', right: '0px', }}></span>
                </span>
                </p>
                <img className="demo-image" src={demoImage} alt="demo image" />
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={4} style={{display: 'flex', alignItems: 'center'}}>
                <img src={curveArrow} alt="curve arrow icon" style={{color: '#93e3c0 !important'}}/>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10} style={{display: 'flex', alignItems: 'center'}}>
                <Uploader />
            </Col>
        </Row>
           
        </div>
    )

}

export default Home;