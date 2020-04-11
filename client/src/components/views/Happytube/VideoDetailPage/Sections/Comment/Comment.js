import React, { useState } from 'react';
import Axios from 'axios';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

function Comment(props) {
    const user = useSelector(state => state.user);
    
    const [CommentValue, setCommentValue] = useState("");

    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            videoId: props.videoId
        };

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert("Failed to save a comment");
                }
            });
    };

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} videoId={props.videoId} refreshFunction={props.refreshFunction} />
                        <ReplyComment parentCommentId={comment._id} videoId={props.videoId} commentLists={props.commentLists} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <TextArea 
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="Please write a comment." 
                />
                
                <br />

                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment
