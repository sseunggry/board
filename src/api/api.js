import axios from "axios";

// export const getMovies = async () => {
//     const response = await axios.get('http://localhost:3001/movies');
//     return response.data;
// };

export const getMovies = async () => {
    const response = await fetch('http://localhost:3001/movies');
    return response.json();
};