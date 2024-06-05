import {useEffect, useState} from "react";
import {BASE_PATH} from "../api/api";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function BoardForm({btnName="제출"}){
    const [newData, setNewData] = useState([]);
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const postData = async (newData) => {
        try{
            const { data } = await axios.post(`${BASE_PATH}/movies`, newData);
            setNewData(data);
        } catch(e) {
            console.log(e);
        }
    }
    const onChange = (e) => {
        const {value, name} = e.target;

        setNewData({
            ...newData,
            [name] : value,
            "date" : date,
            "btn" : true
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        postData(newData);
        navigate("/");
    }

    useEffect(() => {
        let today = new Date();

        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);

        let dateString = year + '-' + month  + '-' + day;

        setDate(dateString);

    }, []);

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-box">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" onChange={onChange} required />
                </div>
                <div className="form-box">
                    <label htmlFor="date">날짜</label>
                    <input type="text" name="date" id="date" value={date} readOnly />
                </div>
                <div className="form-box">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" onChange={onChange} required ></textarea>
                </div>
                <button type="submit" className="btn btn-page" >{btnName}</button>
            </form>
        </>
    )
}