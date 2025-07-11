// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('loading');
    }
    
    // Initialize page-specific functionality
    initializePage();
    
    // Add smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Add loading states for images
    initializeImageLoading();
    
    // Initialize navigation highlighting
    initializeNavigation();
});

// Initialize page-specific functionality
function initializePage() {
    // Check if we're on the resume page and initialize lightbox
    if (document.querySelector('.resume-gallery')) {
        initializeLightbox();
    }
    
    // Add any other page-specific initializations here
}

// Lightbox functionality for resume page
let currentImageIndex = 0;
const resumeImages = [
    'images/resume_page1.jpg',
    'images/resume_page2.jpg',
    'images/resume_page3.jpg',
    'images/resume_page4.jpg'
];

function initializeLightbox() {
    // Create lightbox HTML if it doesn't exist
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
                    <img id="lightbox-image" src="" alt="Resume Page">
                    <button class="lightbox-nav lightbox-prev" onclick="prevImage()">&lt;</button>
                    <button class="lightbox-nav lightbox-next" onclick="nextImage()">&gt;</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
    
    // Close lightbox when clicking outside image
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = resumeImages[currentImageIndex];
        lightboxImage.alt = `Resume Page ${currentImageIndex + 1}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in effect for the image
        lightboxImage.style.opacity = '0';
        lightboxImage.onload = function() {
            this.style.opacity = '1';
        };
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % resumeImages.length;
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightboxImage) {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = resumeImages[currentImageIndex];
            lightboxImage.alt = `Resume Page ${currentImageIndex + 1}`;
        }, 150);
    }
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + resumeImages.length) % resumeImages.length;
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightboxImage) {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = resumeImages[currentImageIndex];
            lightboxImage.alt = `Resume Page ${currentImageIndex + 1}`;
        }, 150);
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Handle load event
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle error event
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Image could not be loaded';
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Navigation highlighting
function initializeNavigation() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if this link matches the current page
        const linkPage = link.