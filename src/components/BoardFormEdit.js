import {useEffect, useState} from "react";
import {BASE_PATH} from "../api/api";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function BoardFormEdit(){
    const params = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editData, setEditData] = useState();
    const navigate = useNavigate();

    const putData = async () => {
        try{
            const { data } = await axios.put(`${BASE_PATH}/movies/${params.id}`, editData);
            setEditData(data);
        } catch(e) {
            console.log(e);
        }
    }
    const getData = async () => {
        try{
            const { data } = await axios.get(`${BASE_PATH}/movies/${params.id}`);
            setTitle(data.title);
            setContent(data.content);
            setEditData(data);
        } catch(e) {
            console.log(e);
        }
    }
    const onChange = (e) => {
        const {value, name} = e.target;

        setEditData({
            ...editData,
            [name] : value,
            "btn": true
        });
        if(name === 'title') {
            setTitle(value);
        }
        if(name === 'content') {
            setContent(value);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        putData(editData);
        navigate(`/board/${params.id}`);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-box">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" onChange={onChange} value={title} required />
                </div>
                <div className="form-box">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" onChange={onChange} value={content} required ></textarea>
                </div>
                <button type="submit" className="btn btn-page">수정</button>
            </form>
        </>
    )
}