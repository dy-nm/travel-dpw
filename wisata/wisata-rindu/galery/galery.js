let currentZoom = 1;
const ZOOM_INCREMENT = 0.2;

function openModal(imageSrc, title, description) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    
    modal.style.display = "block";
    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    currentZoom = 1;
    modalImg.style.transform = `scale(${currentZoom})`;

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}