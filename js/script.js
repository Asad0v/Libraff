import { getAllBooks, getSlider , patchSold } from "./service.js";

const mobNav = document.getElementById('mobNav')

// mobNav.onclick = function handelMobNav() {

// }
$(document).ready(function () {
    $('#mobileMenu').css('left', '-100%');
    // Menyunu aç
    $('#mobNav').click(function () {
        $('#mobileMenu').css('left', '0');
    });

    // Menyunu bağla
    $('#closeMenu').click(function () {
        $('#mobileMenu').css('left', '-100%');
    });

    $('#hyphen1').click(() => {
        $('#mainLink').slideToggle('slow', function () {
            // Açılıb ya da bağlandıqdan sonra callback içində yoxlanılır
            if ($('#mainLink').is(':visible')) {
                $('#hyphen1')
                    .text("−")
                    .css('color', 'gray')
            } else {
                $('#hyphen1').text("+")
                    .css('color', 'black')
            }
        });
    });
    // $('#mainLink2').hide()
    $('#hyphen2').click(() => {
        $('#mainLink2').slideToggle('slow', function () {
            // Açılıb ya da bağlandıqdan sonra callback içində yoxlanılır
            if ($('#mainLink2').is(':visible')) {
                $('#hyphen2')
                    .text("−")
                    .css('color', 'gray')
            } else {
                $('#hyphen2').text("+")
                    .css('color', 'black')
            }
        });
    });
    $('#hyphen3').click(() => {
        $('#mainLink3').slideToggle('slow', function () {
            // Açılıb ya da bağlandıqdan sonra callback içində yoxlanılır
            if ($('#mainLink3').is(':visible')) {
                $('#hyphen3').text("−")
                    .css('color', 'gray')
            } else {
                $('#hyphen3').text("+")
                    .css('color', 'black')
            }
        });
    });
    $('#ktlqDiv, #overlay').hide(); // Başda gizlət

    $('#clickKtlq').click(() => {
        const icon = $('#iconktlq'); // ikon element
        const currentHTML = icon.html().trim(); // innerHTML

        if (currentHTML === '<i class="fa-solid fa-border-all"></i>') {
            icon.html('<i class="fa-solid fa-x"></i>');
        } else {
            icon.html('<i class="fa-solid fa-border-all"></i>');
        }

        const isVisible = $('#ktlqDiv').is(':visible');

        if (!isVisible) {
            $('#overlay').fadeIn();
            $('#ktlqDiv').fadeIn();
            $('body').css('background-color', 'rgba(0, 0, 0, 0.5)');
        } else {
            $('#overlay').fadeOut();
            $('#ktlqDiv').fadeOut();
            $('body').css('background-color', '');
        }
    });

    $('#overlay').click(() => {
        const icon = $('#iconktlq'); // ikon element
        const currentHTML = icon.html().trim();

        icon.html('<i class="fa-solid fa-border-all"></i>');
        $('#overlay').fadeOut();
        $('#ktlqDiv').fadeOut();
        $('body').css('background-color', '');
    });



});


const ktlqData = {
    "kitab": {
        'Bədii ədəbiyyat': [
            'Antologiya',
            'Bioqrafiya, avtobioqrafiya & Xatirə',
            'Detektiv',
            'Elmi-fantastika & Fantaziya',
            'Fəlsəfə',
            'Hekayələr & Oçerklər',
            'Kino və teatr'
        ],
        "Qeyri-bədii ədəbiyyat": [
            'Ailə',
            'Akademik',
            'Aşpazlıq',
            'Astronomiya',
            'Bağbanlıq',
            'Bioqrafiya, avtobioqrafiya & Xatirə',
            'Biznes & İqtisadiyyat'
        ],
        "Bədii uşaq ədəbiyyatı": [
            '3D Kitab',
            'Detektiv',
            'Elmi-fantastika & Fantaziya',
            'Hekayələr & Oçerklər',
            'Heyvanlar',
            'Klassik poemalar',
            'Klassiklər'
        ],
        "Qeyri-bədii uşaq ədəbiyyatı": [
            '3D Kitab',
            'Ailə',
            'Aşpazlıq',
            'Astronomiya',
            'Bioqrafiya, avtobioqrafiya & Xatirə',
            'Biznes & İqtisadiyyat ',
            'Dini'
        ]
    }
}
const ktlqList2 = document.getElementById('ktlqList2')
const ktlqList3 = document.getElementById('ktlqList3')
let default2List;
let default3List;
window.printKtlq = function () {

    const mobKtlqMenu = document.getElementById('mobKtlqMenu')
    const ctgList = document.getElementById('ctgList')
    const ktlqList = document.getElementById('ktlqList')

    // console.log(ktlqData.kitab);

    for (const category in ktlqData.kitab) {
        const subcategories = ktlqData.kitab[category]
            .map(sub => `<li class="hover:underline">- ${sub.trim()}</li>`)
            .join('');
        // console.log(ktlqData.kitab[category]    );

        mobKtlqMenu.innerHTML += `
        <li id="ctgList" class="text-md hover:text-gray-500 hover:cursor-pointer">
            ${category}
            <ul class="pl-2 text-sm text-black ">
                ${subcategories}
            </ul>
        </li>
    `;
        ktlqList.innerHTML += `<li  onmouseover="print2List('${category}')" onmouseout="reset2List()" class="hover:bg-[#F5F5F7] flex justify-between items-center hover:*:last:text-red-500 cursor-pointer p-2 px-3">
                                ${category}
                                <i class="fa-solid fa-chevron-right text-gray-300 "></i>
                            </li>
                            `
        ktlqList2.innerHTML += `<li onmouseover="print3List('${category}')" onmouseout="reset3List()"  class=" hover:bg-[#fff] p-3 hover:*:last:text-red-500 cursor-pointer  flex justify-between items-center"> 
                                ${category} <i class="fa-solid fa-chevron-right text-gray-300 "></i>
                            </li>
                            
                        `

    }

    ktlqData.kitab['Bədii ədəbiyyat'].forEach(subctg => {

        ktlqList3.innerHTML += `<li  class=" hover:bg-[#fff] p-2 px-3">    ${subctg}</li>`
    })
    console.log();
    default2List = ktlqList2.innerHTML;
    default3List = ktlqList3.innerHTML;

}
printKtlq()

window.reset2List = function () {
    ktlqList2.innerHTML = default2List;

}
window.reset3List = function () {
    ktlqList3.innerHTML = default3List;

}
window.print2List = function (ctg) {
    const subcategories = ktlqData.kitab[ctg]
        .map(sub => `<li  class=" hover:bg-[#fff] p-2 px-3"> ${sub.trim()}</li>
                        
                        `)
        .join('');
    ktlqList2.innerHTML = subcategories
    ktlqList3.innerHTML = ''


}
window.print3List = function (ctg) {
    const subcategories = ktlqData.kitab[ctg]
        .map(sub => `<li  class=" hover:bg-[#fff] p-2 px-3"> ${sub.trim()}</li>
                        
                        `)
        .join('');
    ktlqList3.innerHTML = subcategories
}
let data;
let sliderData;
async function getData() {
    data = await getAllBooks()
    console.log(data);
    printBestSel()
    printBasCount()
    printMostView()
    highlightFavorites()
}
getData()
async function getSlData() {
    sliderData = await getSlider()
    // console.log(sliderData);
    printSLider()
    // printSwiper()

}
getSlData()
const sliderSw = document.getElementById('sliderSw')
// console.log(sliderSw);   
const wrapper = document.querySelectorAll('.swiper-slide');
// console.log(wrapper);



// function printSLider() {
//     wrapper.forEach(slide => {
//      sliderData.forEach(img=> {
//         slide.innerHTML += `<img src="${img}" alt="sekil" />`
//      })

//     });
// }
function printSLider() {
    sliderSw.innerHTML = '';

    sliderData.forEach(url => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `<img src="${url}" alt="slider image" />`;
        sliderSw.appendChild(slide);
    });
}

const userMenuBtn = document.getElementById("userMenuButton");
const userMenu = document.getElementById("userMenuDropdown")
userMenuBtn.addEventListener("click", function (e) {
    userMenu.classList.toggle("hidden");
    e.stopPropagation();
});

document.addEventListener("click", function () {
    userMenu.classList.add("hidden");
});

// Əvvəlcə wrapper təmizlənir (əgər içində əvvəlki slidelar varsa)
// function printSwiper() {
//     wrapper.innerHTML = '';

//     // Slider array-i içində gəzirik
//     sliderData.forEach(obj => {
//         const url = Object.values(obj)[0]; // obyektin içindəki URL dəyərini alırıq

//         const slide = document.createElement('div');
//         slide.className = 'swiper-slide';

//         const img = document.createElement('img');
//         img.src = url;
//         img.alt = 'Slider image';
//         img.style.width = '100%'; // İstəyə uyğun dəyişə bilərsən

//         slide.appendChild(img);
//         wrapper.appendChild(slide);
//     });
// }
const mostView = document.getElementById('mostView')

function printMostView() {
    data
        .slice(0,6)
        .sort((a, b) => b.view - a.view)
        .forEach(item => {
            mostView.innerHTML += `<div class="w-[225px] relative  max-w-[229px] p-2 rounded-2xl group hover:[box-shadow:0_6px_18px_0_rgba(0,0,0,0.3)] ">
                                    
                                    <div  class="bg-[#F6F6F8] w-full h-[350px] flex justify-center items-center rounded-md">
                                        <img onclick="showDet(${item.id}, ${item.view})" src="${item.img}" alt="" class="object-cover cursor-pointer object-center w-[80%]  h-[85%]  bg-[#F6F6F8]">
                                    </div>
                                    <div class="mt-6 mb-2">
                                        <span class="block text-lg font-normal tracking-widest ">${item.name}</span>
                                        <h2 class="text-xl font-semibold tracking-wide">${(parseFloat(item.price.replace("₼", "").trim()) * 0.8).toFixed(2)} ₼ <span class="text-sm line-through font-light">${item.price}</span> </h2>
                                    </div>
                                </div>`
        })

}



const bestSelCard = document.getElementById('bestSelCard')

function printBestSel() {
    const monthNames = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
        "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];

    const date = new Date();
    const currentMonthName = monthNames[date.getMonth()];

    console.log("Hazırki ay:", currentMonthName);
    const monthH2 = document.getElementById('monthH2')
    monthH2.innerHTML = `${currentMonthName}ın`

    data
        .sort((a, b) => b.soldCount - a.soldCount)
        .forEach(item => {
            bestSelCard.innerHTML += `<div class="w-[225px] relative  max-w-[229px] p-2 rounded-2xl group hover:[box-shadow:0_6px_18px_0_rgba(0,0,0,0.3)] ">
                                    <span id="heartI" onclick="this, likeBtn(${item.id})" class="absolute  top-6 right-6 bg-gray-200 p-1 rounded-3xl text-white bg-opacity-25 opacity-75  hover:opacity-100 text-2xl cursor-pointer">
                                        <i id="heart-${item.id}" class="fa-solid fa-heart"></i>
                                    </span>
                                    <div  class="bg-[#F6F6F8] w-full h-[350px] flex justify-center items-center rounded-md">
                                        <img onclick="showDet(${item.id}, ${item.view})" src="${item.img}" alt="" class="object-cover cursor-pointer object-center w-[80%]  h-[85%]  bg-[#F6F6F8]">
                                    </div>
                                    <div class="mt-6 mb-2">
                                        <span class="block text-lg font-normal tracking-widest ">${item.name}</span>
                                        <h2 class="text-xl font-semibold tracking-wide">${(parseFloat(item.price.replace("₼", "").trim()) * 0.8).toFixed(2)} ₼ <span class="text-sm line-through font-light">${item.price}</span> </h2>
                                    </div>  
                                </div>`
        })

}

window.showDet  = async (id, num) => {
    console.log(id, num);
    
    let obj = {
        view: num += 1
    }
    await patchSold(id, obj)
    await getData()
    window.location.href = `http://127.0.0.1:5500/details.htm?id=${id}`
}
let status = false
const heartI = document.getElementById('heartI')
window.likeBtn = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const icon = document.getElementById(`heart-${id}`);

    const isFavorited = favorites.some(item => item.id == id);

    if (isFavorited) {
        // Sevimlidən çıxart
        favorites = favorites.filter(item => item.id != id);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "white";
        }
    } else {
        // Sevimlilərə əlavə et
        const item = data.find(book => book.id == id);
        if (item) {
            favorites.push(item);
            localStorage.setItem("favorites", JSON.stringify(favorites));

            if (icon) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                icon.style.color = "red";
            }
        }
    }
};

function highlightFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach(fav => {
        const icon = document.getElementById(`heart-${fav.id}`);
        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.style.color = "red";
        }
    });
}

window.showKlassiks = () => {
    window.location.href = `http://127.0.0.1:5500/klassikler.htm`
}
window.showBasketPage = ()=>{
 window.location.href =`http://127.0.0.1:5500/basket.htm`
}
window.showWishListpage = ()=>{
 window.location.href =`http://127.0.0.1:5500/wishlist.htm`
}
window.showAuthorsPage = () =>{
    window.location.href =`http://127.0.0.1:5500/authors.htm`
}

const basketCount = document.getElementById('basketCount')
window.printBasCount = () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    basketCount.innerHTML = basket.length
    console.log(basket.length);
    
}

// window.makeView = async function (num, id) {
//     console.log(num , id);

// }



