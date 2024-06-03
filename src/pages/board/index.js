import BoardList from "../../components/BoardList";

export default function BoardPage(){
    return (
        <section className="contents">
            <h2 className="page-title">게시판</h2>
            <BoardList />
        </section>
    )
}