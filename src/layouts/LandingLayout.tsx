import CustomFooter from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Layout } from 'antd';
import styles from './LandingLayout.module.css'
const { Content } = Layout;

interface Props {
    children: React.ReactNode
}
  
const LandingLayout = (props: Props) => {
   return (
        <Layout className={styles.landingPageLayout}>
            <Header></Header>
            <Content style={{minHeight: 'max-content'}}>
                {props.children}
            </Content>
            <CustomFooter />
        </Layout>
    )
};

export default LandingLayout;