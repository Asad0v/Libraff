import { BASE_URL, COMMENTS_URL, SLIDER_URL } from "./config.js";

async function getAllBooks() {
    try {
        const res = await fetch(BASE_URL.GET)
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function getSlider() {
    try {
        const res = await fetch(SLIDER_URL.GET)
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function getComments() {
    try {
        const res = await fetch(COMMENTS_URL.GET)
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function deleteBookById(id) {
    try {
        const res = await fetch(`${BASE_URL.DELETE}/${id}`,{
            method: 'DELETE'
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function createBooks(book) {
    try {
        const res = await fetch(`${BASE_URL.POST}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `);
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function updateBooks(id,book) {
    try {
        const res = await fetch(`${BASE_URL.PUT}/${id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book )
        })
        if(!res.ok){
            throw new Error(`${res.status} xeta bas verdi `) 
        }
        const data  = await  res.json()
        return data
    } catch (error) {
        console.log(error.message);
    }
}
async function patchSold(id, updatedObj) {
    try {
        const res = await fetch(`${BASE_URL.PUT}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedObj)
        });

        if (!res.ok) {
            throw new Error(`${res.status} xəta baş verdi`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Xəta:", error.message);
    }
}

export{
    getAllBooks,
    getSlider,
    deleteBookById,
    updateBooks,
    createBooks,
    getComments,
    patchSold
}