import Layout from "antd/lib/layout/layout";

import './Upload.css'
import Uploader from "@/components/Uploader/Uploader";

const Upload = () => {
    return (
        <Layout 
        className="upload-page">
            <Uploader style={{marginTop: '50px'}} />
        </Layout>
    )
};

export default Upload;
