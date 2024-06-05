import {useEffect, useState} from "react";
import {BASE_PATH} from "../api/api";
import axios from "axios";
import {popupClose, popupOpen} from "../js/commonFn";
import {useNavigate, useParams} from "react-router-dom";

export default function Comment(){
    const params = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState();
    const [editComment, setEditComment] = useState();
    const [input, setInput] = useState('');
    const [inputText, setInputText] = useState('');
    const [deleteBtn, setDeleteBtn] = useState(0);

    const getData = async () => {
        try{
            const { data } = await axios.get(`${BASE_PATH}/comment`);
            setComment(data?.filter((el) => el.sort === params.id));
        } catch(e){
            console.log(e);
        }
    }
    const postData = async (newData) => {
        try{
            const { data } = await axios.post(`${BASE_PATH}/comment`, newData);
            setComment((prev) => [...prev, data]);
        } catch(e) {
            console.log(e);
        }
    }
    const putData = async (targetId) => {
        try{
            const { data } = await axios.put(`${BASE_PATH}/comment/${targetId}`, editComment);
            setEditComment(data);
        } catch(e) {
            console.log(e);
        }
    }
    const deleteData = async (targetId) => {
        try{
            await axios.delete(`${BASE_PATH}/comment/${targetId}`);
        } catch(e) {
            console.log(e);
        }
    }

    const onChange = (e) => {
        const {value, name} = e.target;

        setNewComment({
            ...newComment,
            "sort": params.id,
            [name] : value,
            "btn" : true
        });
        setInput(value);
    }

    const onChangeModify = (e) => {
        const {value, name} = e.target;

        setEditComment({
           ...editComment,
            "sort": params.id,
           [name] : value,
            "btn" : true
        });
        setInputText(value);
    }

    const onClickModify = (e) => {
        popupOpen('popCommentModify');
        const targetId = e.target.parentNode.parentNode.id;
        navigate(`/board/${params.id}/${targetId}`);

        let targetText = comment.filter((el) => el.id === targetId);
        setEditComment(...targetText);
        setInputText(targetText[0]?.text);
    }

    const onClickDelete = (e) => {
        const targetId = e.target.parentNode.parentNode.id;
        setDeleteBtn((prev) => (prev+1));
        deleteData(targetId);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        postData(newComment);
        setInput('');
    }

    const onClickCommentModify = (e) => {
        putData(params.commentId);
        popupClose(e);
        navigate(`/board/${params.id}`);
    }

    useEffect(() => {
        getData();
    }, [editComment, deleteBtn]);

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
                        <div className="comment-box" key={idx} id={el.id} >
                            <p className="text">{el.text}</p>
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
            <div className="popup-wrap" data-pop="popCommentModify">
                <div className="popup-inner">
                    <div className="popup-con">
                        <input type="text" className="input-text" name="text" value={inputText} onChange={onChangeModify} />
                        <div className="popup-btn">
                            <button type="button" className="btn" onClick={onClickCommentModify}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}