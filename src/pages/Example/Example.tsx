import {Col, Row, Image } from "antd";
import ImageCompare from "image-compare-viewer";

import Layout from "antd/lib/layout/layout";


import './Example.css'
import { FileProtectOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const Example = () => {

    const imageLinks = [
        {
            original: "https://i.ibb.co/y6tFq4q/car.png",
            removeBg: "https://i.ibb.co/vXvMRKb/car-rmbg.png",
        },
        {
            original: "https://i.ibb.co/87Z1Gkz/pocket-clock.png",
            removeBg: 'https://i.ibb.co/2qvxsfb/pocket-clock-rmbg.png'
        },
        {
            original: "https://i.ibb.co/BZ8Wv42/Group-28.png",
            removeBg: 'https://i.ibb.co/ckg4g0V/Group-31.png'
        },
        {
            original: "https://i.ibb.co/Q6fHKv8/Group-29.png",
            removeBg: 'https://i.ibb.co/FXMBZ86/Group-26.png'
        },  {
            original: " https://i.ibb.co/ZMTknRt/Group-27.png",
            removeBg: ' https://i.ibb.co/vjVcw9b/Group-30.png'
        },
   ]

    useEffect(() => {
        const options = {

            // UI Theme Defaults
          
            controlColor: "#FFFFFF",
            controlShadow: true,
            addCircle: false,
            addCircleBlur: true,
          
            // Label Defaults
          
            showLabels: false,
            labelOptions: {
              before: 'Before',
              after: 'After',
              onHover: false
            },
          
            // Smoothing
          
            smoothing: true,
            smoothingAmount: 100,
          
            // Other options
          
            hoverStart: false,
            verticalMode: false,
            startingPoint: 50,
            fluidMode: false
          };
          const viewers = document.querySelectorAll(".image-compare");
  
          viewers.forEach((element) => {
            let view = new ImageCompare(element, options).mount();
          });

          
    },[])


    return (
        <Layout style={{backgroundColor: 'white',
        width: '100%',
        height: '100%',
        }}>
            <Col className='header-title-gradient'>
                <h1 className="large-title title-white">
                    Một số ví dụ cho bạn
                </h1>
                <h3
                className="medium-title title-white"
                >Xem kết quả mà tachnen.org sẽ giúp bạn làm được</h3>
            </Col>
            <Row>
                <div className="green-tile"> 
                    <FileProtectOutlined style={{fontSize: '60px'}}/>
                    <h3 style={{marginLeft: '10px'}}>Toàn bộ hình ảnh dưới đây là kết quả được tạo ra từ tachnen.org</h3>
                </div>
            </Row>
            <Row style={{justifyContent: 'center', alignItems: 'flex-start', gap: '10px'}}>
                <Col>
                {imageLinks.map((image, index) => (index % 2 === 1) && (
                            <div className="image-compare" style={{maxWidth: '450px', marginTop: '10px'}}>
                                <Image
                                    preview={false}
                                    placeholder
                                    src={image.original}
                                />
                                <Image
                                    preview={false}
                                    placeholder
                                    src={image.removeBg}
                                />
                            </div>
                        ))}
                </Col>
                <Col>
                {imageLinks.map((image, index) => (index % 2 === 0) && (
                            <div className="image-compare" style={{maxWidth: '450px', marginTop: '10px'}}>
                                <Image
                                    preview={false}
                                    placeholder
                                    src={image.original}
                                />
                                <Image
                                    preview={false}
                                    placeholder
                                    src={image.removeBg}
                                />
                            </div>
                        ))}
                </Col>

            </Row>
           

        </Layout>
    )
};

export default Example;
