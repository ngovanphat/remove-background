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
        <Row style={{padding: '3rem', margin: 'auto'}} className="row">
            <Col className="column" >
                <h1>Remove Image Background</h1>
                <p className="lead">100% Automatically and
                <span style={{fontWeight: '700', marginLeft: 10, position: 'relative'}}>
                    Free
                    <span style={{height: '4px', background: 'rgb(147, 227, 192)', position: 'absolute', left: '0px', bottom: '-4px', right: '0px', }}></span>
                </span>
                </p>
                <img className="demo-image" src={demoImage} alt="demo image" style={{marginTop: '40px'}} />
            </Col>
            <Col  className="column icon-column" style={{display: 'flex', alignItems: 'center'}}>
                <img src={curveArrow} alt="curve arrow icon" style={{color: '#93e3c0 !important'}}/>
            </Col>
            <Col  className="column upload-column" style={{display: 'flex', alignItems: 'center'}}>
                <Uploader />
            </Col>
        </Row>
           
        </div>
    )

}

export default Home;