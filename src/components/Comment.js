import {useEffect, useState} from "react";
import {URL_PATH} from "../api/api";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Comment(){
    const params = useParams();
    const [comment, setComment] = useState();
    const [newComment, setNewComment] = useState();
    const [editComment, setEditComment] = useState();
    const [input, setInput] = useState();

    const getData = async () => {
        try{
            const { data } = await axios.get(`${URL_PATH}/comment`);
            if(data){
                setComment(data?.filter((el) => el.sort === params.id));
            }
            // setEditComment(data.text);
        } catch(e){
            console.log(e);
        }
    }

    const postData = async (newData) => {
        try{
            const { data } = await axios.post(`${URL_PATH}/comment`, newData);
            setNewComment(data);
        } catch(e) {
            console.log(e);
        }
    }
    const putData = async (targetId) => {
        try{
            const { data } = await axios.put(`${URL_PATH}/comment/${targetId}`, editComment);
            // setEditComment(data);
        } catch(e) {
            console.log(e);
        }
    }
    const deleteData = async (targetId) => {
        try{
            await axios.delete(`${URL_PATH}/comment/${targetId}`);
        } catch(e) {
            console.log(e);
        }
    }

    const onChange = (e) => {
        const {value, name} = e.target;

        setNewComment({
            sort: params.id,
            id : params.id+input,
            [name] : value,
            "btn" : true
        });
        setInput(value);
    }

    const onClickModify = (e) => {
        const commentInput = e.target.parentNode.previousSibling;
        const targetId = e.target.parentNode.parentNode.id;

        commentInput.readOnly = false;
        commentInput.focus();
        putData(targetId);
    }

    const onClickDelete = (e) => {
        e.preventDefault();
        const targetId = e.target.parentNode.parentNode.id;
        deleteData(targetId);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        postData(newComment);
        setInput('');
    }

    useEffect(() => {
        getData();
    }, [newComment, comment]);

    return (
        <>
            <div className="comment">
                <form className="comment-form" onSubmit={onSubmit}>
                    <div className="form-box">
                        <label htmlFor="text">댓글 작성</label>
                        <textarea name="text" id="text" onChange={onChange} value={input} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-submit line">작성하기</button>
                </form>
                <div className="comment-list">
                    {comment && comment?.map((el, idx) => (
                        <div className="comment-box" key={idx} id={el.id}>
                            <input type="text" className="text" value={el?.text} readOnly />
                            {/*<p className="text">{el.text}</p>*/}
                            {el.btn && (
                                <div className="btn-box">
                                    <button type="button" className="btn-text" onClick={onClickModify}>수정</button>
                                    <button type="button" className="btn-text" onClick={onClickDelete}>삭제</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}