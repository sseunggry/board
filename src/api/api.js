import axios from "axios";

export const URL_PATH = 'http://localhost:3001';

// export const getMovies = async () => {
//     const response = await axios.get('http://localhost:3001/movies');
//     return response.data;
// };

export const getMovies = async () => {
    const response = await fetch(URL_PATH);
    return response.json();
};

export const getMovieData = async () => {
    const response = await axios.get(URL_PATH);
    return response.data;
};
