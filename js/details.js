import { getAllBooks, getComments } from "./service.js";

let data;
let commentData
async function getData() {
    data = await getAllBooks()
    console.log(data);
    commentData = await getComments()
    console.log(commentData);

    printDet()
    printDetBotMob()
    await printDetBotDesk()
    const defaultElem = document.querySelector("p[onclick*='content']");

    printDetBotDesk(defaultElem, 'content');
}
getData()


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

    $('#descSec, #specialSec, #commentSec').hide();
    $('#description span, #features span, #userReviews span').text('+');

    function toggleSection(headerId, contentId) {
        $(`#${headerId}`).click(function () {
            $(`#${contentId}`).slideToggle(500);
            const span = $(this).find('span');
            span.text(span.text() === '+' ? '-' : '+');
            $('html, body').animate({
                scrollTop: $(`#${headerId}`).offset().top - 70
            }, 300);
        });

    }

    toggleSection('description', 'descSec');
    toggleSection('features', 'specialSec');
    toggleSection('userReviews', 'commentSec');
    $('#firstBaskSec').hide()
    $('#overlay2').hide()
    $('#overlay2').click(function () {
        $('#firstBaskSec').hide()
        $('#overlay2').hide()
        
    })

});

const detPagetop = document.getElementById('detPagetop')
const detPageBottom = document.getElementById('detPageBottom')
const descSec = document.getElementById('descSec')
const specialSec = document.getElementById('specialSec')
const commentSec = document.getElementById('commentSec')


const query = window.location.search
const params = new URLSearchParams(query)
const id = params.get('id')


function printDet() {

    const obj = data.find(item => item.id == id)
    const commentObj = commentData.find(item => item.id == id)
    // console.log(obj);
    detPagetop.innerHTML = `<div class="w-full md:w-[60%] flex justify-center shadow-sm ">
                            <img src="${obj.img}"
                                alt="">
                        </div>
                        <div class="w-full md:w-[40%] flex flex-col justify-center items-start gap-2   p-2">
                            <p onclick="copyLink()" class="cursor-pointer text-blue-600 text-sm underline">
                                <i class="fa-solid fa-copy"></i> Məhsulun kodunu kopyala
                                </p>
                            <div class="flex flex-col justify-start items-start  text-left">
                                <h2 class="text-xl font-medium md:text-2xl">${obj.author}</h2>
                                <h2 class="text-2xl font-bold md:text-3xl">${obj.name}</h2>
                                <h4 class="text-md md:text-lg">${obj.author}</h4>
                            </div>
                            <p class="text-2xl font-semibold">${(parseFloat(obj.price.replace("₼", "").trim()) * 0.8).toFixed(2)} ₼</p>
                            <div class="flex justify-center items-center gap-3 ">
                                <p class="line-through ">${obj.price}</p>
                                <div class="bg-[#FF2B40] rounded-lg text-white p-[5px_10px]">Qənaət <span>20</span>%</div>
                            </div>
                            <button onclick="addToBasket(${obj.id})"
                                class="w-[90%] cursor-pointer flex justify-center gap-2 mt-2 items-center text-white font-semibold bg-[#FF2B40] py-2 rounded-md md:rounded-2xl"><i
                                    class="fa-solid fa-cart-shopping"></i>Səbətə əlavə et</button>
                            <div class="w-full flex justify-between pt-5 ">
                                <div class="flex justify-center items-center gap-2"><i class="fa-regular fa-heart"></i> Seçilmişlər</div>
                                <div class="flex justify-center items-center gap-2"><i class="fa-solid fa-comment"></i>Sizə necə kömək edə bilərəm?</div>
                            </div>
                            <hr class="w-full border-gray-300 border-2">
                            <div class="flex flex-col justify-center items-left text-start gap-2  text-gray-500">
                                <p># Çatdırılma haqqında</p>
                                <p>Bakı şahəri üçün təxmini müddət və qiymətlər:</p>
                                <p >- <i class="fa-solid fa-shop"></i> Mağazadan təhvil alma — <strong>pulsuz</strong>.</p>
                                <p>- <i class="fa-solid fa-motorcycle"></i> Kuryer ilə — operator təsdiqindən sonra <strong>24 saat</strong> ərzində. 30 AZN və yuxarı
                                    sifarişlərdə — <strong>pulsuz</strong>.</p>
                                <hr class="border-dashed border-gray-300 my-4 border-2 w-full">
                                <p>Bölgələrə çatdırılma <strong>3-5 iş günü</strong> ərzində.</p>
                            </div>
                        </div>`



}
const firstBaskSec = document.getElementById('firstBaskSec')
window.addToBasket = function (id) {
    // data massivindən məhsulu tapırıq
    const book = data.find(item => item.id == id);
    if (!book) {
        console.error("Məhsul tapılmadı!");
        return;
    }

    // localStorage-dan sebeti alırıq və ya boş massiv kimi götürürük
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    // sebetdə məhsul var mı axtarırıq
    const index = basket.findIndex(item => item.id == id);

    if (index > -1) {
        // varsa, quantity artırırıq
        basket[index].quantity = (basket[index].quantity || 1) + 1;
    } else {
        // yoxdursa, quantity sahəsini əlavə edib basketə qoyuruq
        basket.push({ ...book, quantity: 1 });
    }

    // yenilənmiş basketi localStorage-a yazırıq
    localStorage.setItem('basket', JSON.stringify(basket));
   

    console.log("Səbət yeniləndi:", basket);
    
   let n = 0;
let totalPrice = 0;

// Ümumi qiyməti və ümumi ədəd sayını hesablayırıq
basket.forEach(item => {
    const numericPrice = parseFloat(item.price.replace("₼", "").trim()) * 0.8;
    totalPrice += numericPrice * item.quantity;
    n += item.quantity;
});

// Son əlavə olunan məhsulu göstərmək üçün:
const lastItem = basket[basket.length - 1];
const lastItemPrice = parseFloat(lastItem.price.replace("₼", "").trim()) * 0.8;

firstBaskSec.innerHTML = `
    <div class="w-full flex justify-between items-center gap-[10%]">
        <p>Məhsul səbətə əlavə edilmişdir.</p>
        <span id="closePopUp" class="cursor-pointer"><i class="fa-solid fa-xmark"></i></span>
    </div>
    <hr class="border-1 opacity-20 w-full">
    <div class="flex justify-between items-center gap-[10%]">
        <div class="flex">
            <img class="w-20 h-20" src="${lastItem.img}" alt="">
            <p class="flex items-center">${lastItem.author} - ${lastItem.name}</p>
        </div>
        <p> 1 * ${lastItemPrice.toFixed(2)} ₼</p>
    </div>
    <hr class="border-1 opacity-20 w-full">
    <div class="flex justify-between items-center gap-[10%]">
        <p>Səbətdə ${n} ədəd məhsul var</p>
        <p>Səbətin ilkin dəyəri ${totalPrice.toFixed(2)} ₼</p>
    </div>
    <hr class="border-1 opacity-20 w-full">
    <div class="flex justify-between items-center gap-[10%]">
        <button id="continueToShop" class="cursor-pointer rounded-xl font-semibold p-3 bg-black text-white">Alış-verişə davam et</button>
        <button onclick="showBasketPage()" class="cursor-pointer rounded-xl font-semibold p-3 bg-[#FF2B40] text-white">Səbətə keç</button>
    </div>
`;

    $(() => {

        $('#firstBaskSec').show()
        $('#overlay2').show()
        $('#closePopUp , #continueToShop').click(function () {
            $('#firstBaskSec').hide()
            $('#overlay2').hide()

        })

    })
};


window.copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => alert("Link kopyalandı!"))
        .catch(err => alert("Xəta baş verdi: " + err));
}
window.printDetBotMob = () => {
    const obj = data.find(item => item.id == id)
    const commentObj = commentData.find(item => item.id == id)

    //mobile üçün
    descSec.innerHTML = `<p>${obj.content}</p>`
    for (const key in obj.feature) {
        specialSec.innerHTML += `<p>${obj.feature[key]}</p>`

    }
    commentSec.innerHTML = `<p>${commentObj.comment}</p>`

}
window.printDetBotDesk = (elem, sec) => {
    // console.log(id);

    const obj = data.find(item => item.id == id)
    const commentObj = commentData.find(item => item.id == id)

    detPageBottom.innerHTML = ""

    // console.log("elem:", elem); // bu sətir əlavə olunsun
    // console.log("sec:", sec); 

    document.querySelectorAll('.border-b-4').forEach(el => {
        el.classList.remove('border-[#FF2B40]');
    });

    if (elem) {

        elem.classList.add('border-[#FF2B40]')
    }

    if (sec == 'content') {
        // elem.classList.add('border-[#FF2B40]')
        detPageBottom.innerHTML = `<p>${obj.content}</p>`
    }
    else if (sec == 'feature') {
        // elem.classList.add('border-[#FF2B40]')
        for (const key in obj.feature) {
            detPageBottom.innerHTML += `<p>${obj.feature[key]}</p>`
        }
    } else if (sec == 'comments') {
        // elem.classList.add('border-[#FF2B40]')
        detPageBottom.innerHTML = `<p class="flex gap-2 justify-start items-center"><i class="fa-solid fa-comment-dots"></i>${commentObj.comment}</p>`
    }

}
window.showKlassiks = () => {
    window.location.href = `https://my-libraff-byrashid.vercel.app/klassikler.htm`
}


window.showBasketPage = ()=>{
 window.location.href =`https://my-libraff-byrashid.vercel.app/basket.htm`
}







//elvinden sorus - - - - -  -- -  - --  - - -
//  let n = 0
    // basket.forEach(item => {
    //     let totalPrice = 0
    //     n += item.quantity 
    //     const numericPrice = parseFloat(item.price.replace("₼", "").trim()) * 0.8; // endirim varsa saxla
    //      totalPrice += numericPrice * item.quantity;
    //     // totalPrice = totalPrice + (item.price * item.quantity )
    //     // console.log(totalPrice);
        
    //     firstBaskSec.innerHTML = `<div class="w-full flex justify-between items-center gap-[10%]">
    //                             <p>Məhsul səbətə əlavə edilmişdir. </p>
    //                             <span id="closePopUp" class="cursor-pointer"><i class="fa-solid fa-xmark"></i></span>
    //                         </div>
    //                         <hr class="border-1 opacity-20 w-full">
    //                         <div class="flex justify-between items-center gap-[10%]">
    //                             <div class="flex">
    //                                 <img class="w-20 h-20" src="${lastItem.img}" alt="">
    //                                 <p class="flex items-center">${lastItem.author} - ${lastItem.name}</p>
    //                             </div>
    //                             <p> 1 * ${(parseFloat(lastItem.price.replace("₼", "").trim()) * 0.8).toFixed(2)} ₼</p>
    //                         </div>
    //                         <hr class="border-1 opacity-20 w-full">
    //                         <div class="flex justify-between items-center gap-[10%]">
    //                             <p>Səbətdə ${n} ədəd məhsul var</p>
    //                             <p>Səbətin ilkin dəyəri ${totalPrice.toFixed(2)} ₼</p>
    //                         </div>
    //                         <hr class="border-1 opacity-20 w-full">
    //                         <div class="flex justify-between items-center gap-[10%]">
    //                             <button id="continueToShop" class="cursor-pointer rounded-xl font-semibold p-3 bg-black text-white">Alış-verişə davam et</button>
    //                             <button class="cursor-pointer rounded-xl font-semibold p-3 bg-[#FF2B40] text-white">Alış-verişə davam et</button>
    //                         </div>`
    // })

