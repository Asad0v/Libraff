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

const wishlistCards = document.getElementById('wishlistCards')
function printWishList(){
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    wishlistCards.innerHTML =""
    if(favorites.length == 0){
        wishlistCards.innerHTML =`<h2 class="flex justify-center items-center text-2xl font-bold pt-20" >Bəyəndiyiniz Kitab yoxdur...</h2>`
    }
    console.log(favorites);
    favorites.forEach(item => {
        
        wishlistCards.innerHTML += `<div class="w-[325px] relative  max-w-[329px] p-2 rounded-2xl group hover:[box-shadow:0_6px_18px_0_rgba(0,0,0,0.3)] ">
                                        <span id="heartI" onclick="this, likeBtn(${item.id})" class="absolute  top-6 right-6 bg-gray-200 p-1 rounded-3xl text-white bg-opacity-25 opacity-75  hover:opacity-100 text-2xl cursor-pointer">
                                        <i title="sil" id="heart-${item.id}" class="fa-solid  fa-circle-xmark"></i>
                                    </span>
                                        <div  class="bg-[#F6F6F8] w-full h-[450px] flex justify-center items-center rounded-md">
                                            <img onclick="showDet(${item.id})" src="${item.img}" alt="" class="object-cover cursor-pointer object-center w-[80%]  h-[85%]  bg-[#F6F6F8]">
                                        </div>
                                        <div class="mt-6 mb-2">
                                            <span class="block text-lg font-normal tracking-widest ">${item.name}</span>
                                            <h2 class="text-xl font-semibold tracking-wide">${(parseFloat(item.price.replace("₼", "").trim()) * 0.8).toFixed(2)} ₼ <span class="text-sm line-through font-light">${item.price}</span> </h2>
                                        </div>
                                    </div>`
    });
    highlightFavorites()
}
printWishList()

window.likeBtn = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const icon = document.getElementById(`heart-${id}`);

    const isFavorited = favorites.some(item => item.id == id);

    if (isFavorited) {
        favorites = favorites.filter(item => item.id != id);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "white";
        }
    } 

    printWishList()
    
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