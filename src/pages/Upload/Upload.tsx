import Layout from "antd/lib/layout/layout";

import './Upload.css'
import Uploader from "@/components/Uploader/Uploader";
import { useLocation } from "react-router-dom";

const Upload = () => {
    const location = useLocation();
    return (
        <Layout 
        className="upload-page">
            <Uploader 
            image={location.state}
            style={{marginTop: '50px'}} />
        </Layout>
    )
};

export default Upload;
