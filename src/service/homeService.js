import { ENDPOINTS } from "../config/apiConfig";
export const fetchGetAllBuildCharacters = async () => {
    try{
    const response = await fetch(ENDPOINTS.builds.getAll);

    if (!response.ok){
        throw new Error(`Error ${response.status}: No build was found`);
    }
    
    return await response.json();
    }
    catch(error){
        console.error(error.message);
        return [];
    }
}