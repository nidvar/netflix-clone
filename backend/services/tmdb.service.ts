import dotenv from 'dotenv';
dotenv.config();

export const fetchData = async (customURL?: string) => {
    let url = customURL || 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.API_Read_Access_Token
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}