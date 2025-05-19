import { getAllBooks } from "./service.js";

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
let data;
async function getData() {
    data = await getAllBooks()
    console.log(data);
    printAuthors()
}
getData()

// const authorsDiv = document.getElementById('authorsDiv');
// let authorsLetter = []; // Hərfləri saxlayırıq

// window.printAuthors = () => {
//     data.forEach(item => {
//         const firstLetter = item.author[0].toUpperCase(); 
//         if (!authorsLetter.includes(firstLetter)) {
//             authorsLetter.push(firstLetter);
//         }
//     });

//     authorsLetter.sort();
    
//     // 3. HTML-ə yaz
//     authorsLetter.forEach(letter => {
//         // Bu hərf üçün olan müəllifləri tapırıq
//         const authorsOfLetter = data.filter(item => item.author[0].toUpperCase() === letter).map(item => item.author);
//         console.log(authorsOfLetter);
        
        
//         // Müəllifləri <li> ilə düzürük
//         const listItems = authorsOfLetter.map(authorItem => `<li>${authorItem.author}</li>`).join('');

//         // Bütün hissəni HTML-ə əlavə edirik
//         authorsDiv.innerHTML += `
//             <div class="letter-block border p-4 rounded-xl">
//                 <p class="text-center border p-3">${letter}</p>
//                 <ul class="border p-3">
//                     ${listItems}
//                 </ul>
//             </div>`;
//     });
// }




const authorsDiv = document.getElementById('authorsDiv');
let authorsLetter = [];

window.printAuthors = () => {
    // Hərfləri topla
    data.forEach(item => {
        const firstLetter = item.author[0].toUpperCase(); 
        if (!authorsLetter.includes(firstLetter)) {
            authorsLetter.push(firstLetter);
        }
    });

    authorsLetter.sort(); // İstəyə görə sırala

    authorsLetter.forEach(letter => {
        // Həmin hərflə başlayan müəllifləri tap
        const authorsOfLetter = data
            .filter(item => item.author[0].toUpperCase() === letter)
            .map(item => item.author);

        // Təkrarlanan müəllifləri sil (Set ilə və ya filter ilə)
        const uniqueAuthors = [...new Set(authorsOfLetter)];

        // <li> düzəlt
        const listItems = uniqueAuthors.map(author => `<li onclick="showKlassik('${author}')"  class="text-red-600 hover:underline cursor-pointer">${author}</li>`).join('');

        // HTML-ə əlavə et
        authorsDiv.innerHTML += `
            <div class="letter-block text-center w-[25%] flex flex-col gap-2">
            <p >${letter}</p>
           
                <ul>
                    ${listItems}
                </ul>
            </div>`;
    });
};

window.showKlassik = function(author) {
    
    window.location.href = `http://127.0.0.1:5500/klassikler.htm?author=${author}`
}
window.showBasketPage = ()=>{
        
 window.location.href =`http://127.0.0.1:5500/basket.htm`
}
