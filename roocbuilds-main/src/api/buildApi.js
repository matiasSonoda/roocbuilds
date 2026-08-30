export async function getHome(){
    const url = "http://localhost:8080/api/v1/builds";
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error.message);
        return [];
    }
}