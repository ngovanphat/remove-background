import { Avatar, Typography } from "antd";
import Layout from "antd/lib/layout/layout";

import './About.css'
import authorAvatar1 from '@/assets/logo.svg';

const About = () => {
    const authorList = [
        {
            fullName: "Bùi Minh Nguyên",
            avatar: authorAvatar1,
            bio: "Graduted from University of Science. Major: Computer Science. Author"
        },
        {
            fullName: "Ngô Văn Phát",
            avatar: authorAvatar1,
            bio: 'Graduted from University of Science. Major: Software Engineer. Author'
        }
    ]
    return (
        <Layout style={{backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row',
        }}>
            {authorList.map(author => (
                <div className="information-author">
                    <Avatar src={author.avatar} style={{ width: '150px', height: '150px', marginBottom: '30px'}}/>
                    <Typography.Title level={5}>{author.fullName}</Typography.Title>
                    <Typography.Text italic>{author.bio}</Typography.Text>
                </div>
            ))}
        </Layout>
    )
};

export default About;
