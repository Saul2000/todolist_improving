import axios from "axios"

const fetchUrl = "https://todolist-improving.herokuapp.com/api/task";

export const fetchAllTodos = async () => {
    try {
        const { data } = await axios.get(fetchUrl);
        return data;
    } catch (error) {
        console.log(error)
    } 
}