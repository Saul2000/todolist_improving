import axios from "axios"

const fetchUrl = "http://localhost:5000/api/task";

export const fetchAllTodos = async () => {
    try {
        const { data } = await axios.get(fetchUrl);
        return data;
    } catch (error) {
        console.log(error)
    } 
}