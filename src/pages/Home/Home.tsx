import { Col, Row, Card, Button, Typography, Avatar, Tabs, Image} from "antd";
import './Home.css'
import demoImage from '@/assets/demo-image.png'
import curveArrow from '@/assets/icons/curve-arrow.svg'
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Title from "antd/lib/typography/Title";
const Home = () => {
    const navigate = useNavigate();

    const demoImageUrl = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg",
    "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/08/Pictures/_6bda0940-b9ad-11e9-98cb-e738ad509720.jpg"]

    const changeBackgroundTitle = [
        {
            title: "Con người",
            images: [
               "https://i.ibb.co/88cbKw0/people1.png",
                "https://i.ibb.co/P52n2H7/people2.png",
                "https://i.ibb.co/yRxxgN8/people3.png",
                "https://i.ibb.co/SNBJndK/people4.png",
                "https://i.ibb.co/9sZNPBT/people5.png"
            ]
        },
        {
            title: "Sản phẩm",
            images: [
                "https://i.ibb.co/JWTg06G/product1.png",
                "https://i.ibb.co/f8jfxL9/product2.png",
                "https://i.ibb.co/JBKXp59/product3.png",
                "https://i.ibb.co/JpMqp1d/product4.png",
                "https://i.ibb.co/s2bnsYd/product5.png",
            ]
        },
        {
            title: "Động vật",
            images: [
               "https://i.ibb.co/ZB7cLM6/animal1.png",
               "https://i.ibb.co/c125CvJ/animal2.png",
               "https://i.ibb.co/M1pqLP4/animal3.png",
               "https://i.ibb.co/VHqqnVx/animal4.png",
               "https://i.ibb.co/HCTG58q/animal5.png",
            ]
        },
        {
            title: "Xe cộ",
            images: [
                "https://i.ibb.co/2gbPvKL/car1.png",
                "https://i.ibb.co/bsLshGF/car2.png",
                "https://i.ibb.co/rdCPCdR/car3.png",
                "https://i.ibb.co/9pnwXsG/car4.png",
                "https://i.ibb.co/fCmMGNy/car5.png",
            ]
        },
]

    const renderChangeBackground = () => {
        return changeBackgroundTitle.map((item, index) => ({
            label: item.title,
            key: index.toString(),
            children: (<Row style={{flexWrap: 'nowrap'}}>
              {item.images.map((image, i) => <div className={`change-bg-img-${i}`}><Image
                    width={220}
                    height={147}
                    preview={false}
                    placeholder
                    src={image}
                />
               {(i === 0 || i ===1) && <img src={curveArrow} alt="curve arrow icon" style={{color: '#93e3c0 !important'}} className={`arrow-transition-${i}`}/>}
                </div>)}
            
            </Row>)
        }))
    }

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
                                    style={{cursor: 'pointer'}}
                                    onClick={() => loadImage(url)}
                                    shape="square" src={url} />)}
                            </Row>                        
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Col style={{padding: '3rem', margin: 'auto', textAlign: 'center', height: "500px", width: '1000px'}}>
                <Title style={{width: '1000px'}}>Thay đổi ảnh nền cho bạn!</Title>
                <Tabs
                    style={{width: '1000px'}}
                    defaultActiveKey="0"
                    centered
                    items={renderChangeBackground()}
                />
            </Col>
        </div>
    )

}

export default Home;