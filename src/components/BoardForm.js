import {useState} from "react";
import {URL_PATH} from "../api/api";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function BoardForm({btnName="제출"}){
    const [newData, setNewData] = useState([]);
    const navigate = useNavigate();

    const postData = async (newData) => {
        try{
            const { data } = await axios.post(`${URL_PATH}/movies`, newData);
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
            "btn" : true
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        postData(newData);
        navigate("/");
    }
    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-box">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" onChange={onChange} required />
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