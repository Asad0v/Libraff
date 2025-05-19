import { getAllBooks, deleteBookById, updateBooks, createBooks } from "./service.js";
let data;
async function getData() {
    data = await getAllBooks()
    console.log(data);
    printTable()
}
getData()

const tbody = document.querySelector('tbody')

function printTable() {
    tbody.innerHTML = ""
    data.forEach(item => {
        // console.log(item.author);
        
        tbody.innerHTML +=
            `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                 <th class="w-[150px] ">
                    <img class="w-full h-[150px] object-cover" src="${item.img}"  />
                
                </th>
                <td scope="row" class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${item.name}
                </td>
                <td class="px-6 py-1">
                    ${item.author}
                </td>
                <td class="px-6 py-1">
                    ${item.price}
                </td>
                <td class="px-6 py-1">
                    ${item.category}
                </td>
                <td class="px-6 py-1">
                    ${item.subcategory}
                </td>
                
                <td class="px-6 py-1">
                    ${item.language}
                </td>
                <td class="px-6 py-1">
                    ${item.stockCount},${item.soldCount}
                </td>
                <td class="px-6 py-1">
                    ${item.view}
                </td>
                <td class="px-6 py-1 flex justify-center items-center pt-16 gap-2">
                    <i  onclick ="  handleModal(${true} , ${item.id})"   class="text-[20px] cursor-pointer  text-[green] fa-solid fa-pen-to-square"></i>
                    <i onclick="handleDelete('${item.id}')" class="text-[20px] cursor-pointer  text-[red] fa-solid fa-trash-can"></i>
                </td>

                </tr>`
            });
        }   

window.handleDelete = async function (id) {
    await deleteBookById(id)
     data = data.filter(item => item.id != id)
     printTable()
    
}

const editModal = document.getElementById('editModal')
const subcategorySec = document.getElementById('subcategorySec')
const categorySec = document.getElementById('categorySec')
const languageSec = document.getElementById('languageSec')
const featureSec = document.getElementById('featureSec')
const soldCount = document.getElementById('soldCount')
const content = document.getElementById('content')
const form = document.querySelectorAll('#form input' )
const editInps = document.querySelectorAll('#editModal input')
// function parseLanguages(input) {
//   // Sətirdən boşluq, vergül, nöqtəli vergül və s. ilə ayrılmış sözləri al
//   return input
//     .split(/[\s,;]+/)       // boşluq, vergül və ya ; ilə split
//     .map(lang => lang.trim()) // baş/son boşluqları sil
//     .filter(Boolean);         // boş elementləri sil
// }
// parseLanguages(languageSec.value)    


function getVal(){
    const book = {
        name: form[0].value,
        author : form[1].value,
        price : form[2].value,
        category: JSON.parse(categorySec.value),
        subcategory: JSON.parse(subcategorySec.value),
        language:  JSON.parse(languageSec.value),
        stockCount: form[6].value,
        soldCount: form[7].value,
        view: form[8].value,
        img: form[9].value,
        content: content.value,
        featureSec: JSON.parse(featureSec.value)
    }
    return book
    // console.log(book);
    
}
window.handlePost =  async () =>{

    const book = getVal()
    console.log(book);
    const newBook = await createBooks(book)
     if(newBook){
        data.push(newBook)
     }
     printTable()

}
function getVal2(){
    const editBooks = {
        name: editInps[0].value,
        author : editInps[1].value,
        price : editInps[2].value,
        category: JSON.parse(editInps[3].value),
        subcategory: JSON.parse(editInps[4].value) ,
        language: JSON.parse(editInps[5].value) ,
        stockCount: editInps[6].value,
        soldCount: editInps[7].value,
        view: editInps[8].value,
        img: editInps[9].value,

    }
    return editBooks
}
let editId 
window.handleEdit = async () =>{
    editModal.style.display = 'none '
    const editObj = getVal2()
    console.log(editObj);
    // await updateBooks(editId, editObj)
    // await getData()
    data = data.filter(item => item.id != editId)
   const  editNews = await updateBooks(editId, editObj)
     if(editNews){
        data.push(editNews)
    }
    printTable()
}

window.handleModal = (status, id) => {

  window.scrollTo(0, 0);
  editId = id;

  if (status) {
    editModal.classList.remove("hidden");
    editModal.style.display = "flex";

    const elem = data.find(item => item.id == id);
    if (elem) {
      editInps[0].value = elem.name;
      editInps[1].value = elem.author;
      editInps[2].value = parseFloat(elem.price);
      editInps[3].value = JSON.stringify(elem.category);
      editInps[4].value = JSON.stringify(elem.subcategory) ;
      editInps[5].value = JSON.stringify(elem.language) ;
      editInps[6].value = elem.stockCount;
      editInps[7].value = elem.soldCount;
      editInps[8].value = elem.view;
      editInps[9].value = elem.img;
    }

  } else {
    editModal.style.display = "none";
    editModal.classList.add("hidden");
  }
};







