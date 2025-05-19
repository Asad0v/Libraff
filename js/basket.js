import { patchSold } from "./service.js";

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
  
});

const basketCards = document.getElementById('basketCards');
const totalPriceDiv = document.getElementById('totalPriceDiv');

window.printBasket = function () {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    console.log(basket);
    
    if (basket.length === 0) {
        basketCards.innerHTML = "<p class='text-center text-[24px] font-extrabold text-red-500'><i>Səbət boşdur.</i></p>";
        return;
    }

    basketCards.innerHTML = "";
    let totalPrice = 0
    basket.forEach(item => {
        const rawPrice = parseFloat(item.price.replace("₼", "").trim());
        const discountedPrice = rawPrice * 0.8;
        const total = (discountedPrice * item.quantity).toFixed(2);
        const numericPrice = parseFloat(item.price.replace("₼", "").trim()) * 0.8;
                totalPrice += numericPrice * item.quantity;

        const card = `
            <div class="flex justify-between items-center mb-4">
                <div class="flex justify-start items-center gap-10 w-[70%]">
                    <div class="h-[200px] w-[200px]">
                        <img class="w-full h-full" src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="group">
                        <p class="hover:text-[#FF2B40] flex gap-5 justify-start items-center">
                            ${item.author} - ${item.name}
                            <span class="text-[#FF2B40] rounded-full text-sm cursor-pointer">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </span>
                        </p>
                        <p>Kod: ${item.code || "Yoxdur"}</p>
                    </div>
                </div>
                <div class="w-[10%]">
                    <p ><span class="line-through text-sm">${rawPrice.toFixed(2)}₼</span> <span class="text-black font-semibold">${discountedPrice.toFixed(2)}₼</span></p>
                </div>
                <div class="w-[10%]">
                    <div class="w-[100px] px-3 py-2 border rounded-2xl text-center">${item.quantity}</div>
                </div>
                <div class="w-[10%]">
                    <div class="font-bold">${total}₼</div>
                </div>
            </div>
        `;

        basketCards.innerHTML += card;
        totalPriceDiv.innerHTML     = `<hr class="w-[98%] bg-[#d6d1d1d3]  mx-auto border-0 h-[1px] mt-2">
                                        <div class="flex justify-end  text-2xl gap-8 pr-12 pt-5">
                                            <p class="text-[#A2A3AB]">Cəm Məbləğ(₼)</p>
                                            <p class="text-black font-medium">${totalPrice.toFixed(2)}</p>
                                        </div>`
    });
};

printBasket();

document.getElementById('clearBasketBtn').addEventListener('click', function () {
    // localStorage-dan səbəti sil
    localStorage.removeItem('basket');

    // HTML-dən səbət kartlarını təmizlə
    basketCards.innerHTML = "<p class='text-center text-[24px]'>Səbət boşdur.</p>";
    printBasket()
});


window.toMainPage = () =>{
    window.location.href = `http://127.0.0.1:5500/index.htm`
}

window.confirmOrder = async function () {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    for (const item of basket) {
        const updatedSoldCount = item.soldCount ? item.soldCount + item.quantity : item.quantity;

        const obj = {
            soldCount: updatedSoldCount
        };

        const result = await patchSold(item.id, obj)

    //    const result = await patchSold(item.id, obj); // yalnız dəyişəcək sahə göndərilir
       console.log(result);
       
    }

    // Səbəti təmizləyirik
    localStorage.removeItem("basket");

    printBasket()
    // Uğur mesajı
    alert("Sifariş təsdiqləndi!");
};
