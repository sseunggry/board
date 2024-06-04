import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {URL_PATH} from "../../api/api";
import axios from "axios";
import Comment from "../../components/Comment";

export default function BoardDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        try{
            setIsLoading(true);
            const { data } = await axios.get(`${URL_PATH}/movies/${params.id}`);
            setData(data);
            setIsLoading(false);
        } catch(e) {
            console.log(e);
        }
    }
    const deleteData = async () => {
        try{
            const { data } = await axios.delete(`${URL_PATH}/movies/${params.id}`);
            setData(data);
        } catch(e) {
            console.log(e);
        }
    }
    const onClickDelete = () => {
        deleteData();
        navigate(`/board`);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="contents">
            <div className="board-detail">
                {isLoading ? 'Loading' : (
                    <div className="item">
                        <p className="title">{data?.title}</p>
                        <p className="overview">{data?.content}</p>
                        {data?.release_date && <p className="date">{data?.release_date}</p>}
                        {data?.btn && (
                            <div className="btn-box">
                                <Link to={`/board/edit/${data?.id}`} className="btn-text">수정</Link>
                                <button type="button" className="btn-text" onClick={onClickDelete}>삭제</button>
                            </div>
                        )}
                        {data?.backdrop_path && (
                            <div className="img-box">
                                <img src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`} alt=""/>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Comment />
            <Link to="/board" className="btn btn-page btn-list">목록으로</Link>
        </section>
    )
}