import {BASE_PATH} from "../api/api";
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
            const { data } = await axios.get(`${BASE_PATH}/movies`);

            setData(data);
            if(search) {
                setData((prev) => prev.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())));
            }
            setIsLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    const onChangeSortSelect = (e) => {
        const { value } = e.target;

        if(value === 'dateLasted'){
            const sortData = [...data].sort((a, b) => Number(b.date.replace(/[^0-9]/g, '')) - Number(a.date.replace(/[^0-9]/g, '')))
            setData(sortData);
        }
        if(value === 'dateLate'){
            const sortData = [...data].sort((a, b) => Number(a.date.replace(/[^0-9]/g, '')) - Number(b.date.replace(/[^0-9]/g, '')))
            setData(sortData);
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
                <div className="sort">
                    <label htmlFor="sort"><span className="blind">정렬</span></label>
                    <select name="sort" id="sort" onChange={onChangeSortSelect}>
                        <option value="default">정렬 선택</option>
                        <option value="dateLasted">최신 순</option>
                        <option value="dateLate">오래된 순</option>
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
                    {search && data.length === 0 ? <p className="no-data">검색 결과가 없습니다.</p> : ''}
                    {data && data.map(({id, title, content, backdrop_path, date}) => (
                        <Link to={`/board/${id}`} className="item" key={id}>
                            <p className="title">{title}</p>
                            <p className="overview">{content}</p>
                            <p className="date">{date}</p>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}