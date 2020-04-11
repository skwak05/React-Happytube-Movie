import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment/Comment";
import LikeDislikes from './Sections/LikeDislikes';

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId;

    const variable = {
        videoId: videoId
    };

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);

    let src = process.env.NODE_ENV === "development"
        ? `http://localhost:5000/${VideoDetail.filePath}`
        : `https://react-happytube.herokuapp.com/${VideoDetail.filePath}`;

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert("Failed to get video information");
                }
            })

        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert("Failed to bring comment's info.");
                }
            })
    }, []);

    const refreshFunction = newComment => {
        setComments(Comments.concat(newComment));
    };

    if(VideoDetail.writer) {
        const subscribeButton = VideoDetail.writer._id !== 
        localStorage.getItem('userId') && (
            <Subscribe 
                userTo={VideoDetail.writer._id} 
                userFrom={localStorage.getItem('userId')} 
            />
        );

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding:'3rem 4rem' }}>
                        <video style={{ width: '100%'}} 
                                src={src} 
                                controls 
                        />
    
                        <List.Item 
                            actions={[
                                        <LikeDislikes 
                                            video 
                                            userId={localStorage.getItem('userId')} 
                                            videoId={videoId} 
                                        />, 
                                        subscribeButton 
                                    ]}
                        >
                            <List.Item.Meta 
                                avatar={<Avatar src={VideoDetail.writer.image} />} 
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
    
                        {/* Comments */}
                        <Comment commentLists={Comments} videoId={videoId} refreshFunction={refreshFunction} />
    
                    </div>
                </Col>
                
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>...Loading</div>
        )
    }
    
}

export default VideoDetailPage
