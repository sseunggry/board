import {getMovies, getMovieData, URL_PATH} from "../api/api";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

export default function BoardList(){
    const [activeTab, setActiveTab] = useState('list');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchInput = useRef();
    const [search, setSearch] = useState('');
    const searchOnClick = () => {
        setSearch(searchInput.current.value);
    };

    const getData = async () => {
        try{
            setIsLoading(true);
            const { data } = await axios.get(`${URL_PATH}/movies`);
            setData(data);

            if(search) {
                setData((prev) => prev.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())));
            }
            setIsLoading(false);
        } catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, [search]);

    return (
        <>
            <div className="sort-list-box">
                <div className="search">
                    <label htmlFor="search"><span className="blind">검색</span></label>
                    <input type="text" id="search" placeholder="검색" ref={searchInput} />
                    <button type="button" className="icon_search" onClick={searchOnClick}><span className="blind">검색</span></button>
                </div>
                <div className="filter">
                    <label htmlFor="filter">필터</label>
                    <select name="filter" id="filter">
                        <option value="openDate">개봉일</option>
                        <option value="rate">평점</option>
                        <option value="country">나라</option>
                    </select>
                </div>
                <div className="align">
                    <label htmlFor="align">정렬</label>
                    <select name="align" id="align">
                        <option value="openDateLasted">개봉일 빠른 순</option>
                        <option value="openDateLate">개봉일 늦은 순</option>
                        <option value="rateHigh">평점 높은 순</option>
                        <option value="rateLow">평점 낮은 순</option>
                    </select>
                </div>
            </div>
            <div className="btn-flex-box">
                <ul className="view-mode">
                    <li
                        className={activeTab === 'list' ? 'active' : ''}
                        onClick={() => setActiveTab('list')}
                    >
                        리스트형
                    </li>
                    <li
                        className={activeTab === 'card' ? 'active' : ''}
                        onClick={() => setActiveTab('card')}
                    >
                        카드형
                    </li>
                </ul>
                <Link to="/board/new" className="btn btn-write">글쓰기</Link>
            </div>
            {isLoading ? 'Loading' : (
                <div className={activeTab === 'list' ? 'board-list' : activeTab === 'card' ? 'board-card' : ''}>
                    {data && data.map(({id, title, content, backdrop_path, poster_path, vote_average, release_date}, idx) => (
                        <Link to={`/board/${id}`} className="item" key={id}>
                            <p className="title">{title}</p>
                            <p className="overview">{content}</p>
                            <p className="date">{release_date}</p>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}