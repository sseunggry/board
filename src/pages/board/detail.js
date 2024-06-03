import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useQuery} from "react-query";
import {getMovies} from "../../api/api";

export default function BoardDetail() {
    const params = useParams();
    const {data, isLoading} = useQuery(["movies"], () => getMovies());
    const movie = params.id && data?.filter((movie) => movie.id === params.id)[0];

    return (
        <section className="contents">
            <div className="board-detail">
                {isLoading ? 'Loading' : (
                    <div className="item">
                        <p className="title">{movie.title}</p>
                        <p className="overview">{movie.overview}</p>
                        <p className="date">{movie.release_date}</p>
                        <div className="img-box">
                            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt=""/>
                        </div>
                    </div>
                )}
            </div>
            <div className="comment">
                <form className="comment-form">
                    <div className="form-box">
                        <label htmlFor="comment">댓글 작성</label>
                        <textarea name="comment" id="comment"></textarea>
                    </div>
                    <button type="submit" className="btn btn-submit line">입력</button>
                </form>
                <div className="comment-list">
                    <div className="comment-box">
                        <div className="info">
                            <p className="name">asdf</p>
                            <p className="date">2024.06.01</p>
                            <div className="btn-box">
                                <button type="button" className="btn-text">수정</button>
                                <button type="button" className="btn-text">삭제</button>
                            </div>
                        </div>
                        <div className="text">asdfasf</div>
                    </div>
                </div>
            </div>
            <Link to="/board" className="btn btn-page btn-list">목록으로</Link>
        </section>
    )
}