import CustomFooter from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { InboxOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import styles from './LandingLayout.module.css'
const { Content } = Layout;

interface Props {
    children: React.ReactNode
}
  
const LandingLayout = (props: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();
    const onDrop = useCallback((acceptedFiles: any) => {
        setIsDragging(false);
        navigate('/upload', {state: acceptedFiles})
      }, [])
    const {getRootProps, getInputProps } = useDropzone({onDrop})
    const handleDragEnter = () => {
        setIsDragging(true);
    }
    const onMouseLeave = (e: any) => {
         setIsDragging(false);
    }
   return (
        <Layout 
        onDragEnterCapture={handleDragEnter}
        className={styles.landingPageLayout}>
            {isDragging && 
            <Layout
            onMouseLeave={onMouseLeave}
            style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, zIndex: 10, height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <div 
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100%'}}
                    {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{fontSize: '40px'}}/>
                        </p>
                        <p className="ant-upload-text">Nhấn vào hoặc thả ảnh của bạn vào</p>
                </div>
            </Layout>}
            <Header></Header>
            <Content style={{minHeight: 'max-content'}}>
                {props.children}
            </Content>
            <CustomFooter />
        </Layout>
    )
};

export default LandingLayout;