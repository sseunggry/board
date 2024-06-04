import BoardForm from "../../components/BoardForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {URL_PATH} from "../../api/api";
import BoardFormEdit from "../../components/BoardFormEdit";

export default function BoardEdit() {
    // const params = useParams();
    // const [data, setData] = useState([]);
    //
    // const getData = async () => {
    //     try{
    //         const { data } = await axios.get(`${URL_PATH}/movies/${params.id}`);
    //         setData(data);
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }
    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <>
            <section className="contents">
                <BoardFormEdit />
            </section>
        </>
    )
}