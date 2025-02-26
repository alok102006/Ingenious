// document.addEventListener('DOMContentLoaded', function() {
//     // Mobile Navigation Toggle
//     const navToggle = document.getElementById('navToggle');
//     const navLinks = document.getElementById('navLinks');
    
//     if (navToggle && navLinks) {
//         navToggle.addEventListener('click', function() {
//             navToggle.classList.toggle('active');
//             navLinks.classList.toggle('active');
//         });
//     }

//     // Countdown Timer
//     const countdownElement = document.querySelector('.countdown');
//     if (countdownElement) {
//         const competitionDate = new Date('May 15, 2025 09:00:00').getTime();
        
//         function updateCountdown() {
//             const now = new Date().getTime();
//             const distance = competitionDate - now;

//             const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//             const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//             countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//             if (distance < 0) {
//                 clearInterval(countdownInterval);
//                 countdownElement.innerHTML = "EXPIRED";
//             }
//         }

//         const countdownInterval = setInterval(updateCountdown, 1000);
//         updateCountdown();
//     }
// });