document.addEventListener('DOMContentLoaded', function() {
    // Initialize with default FAQs if empty
    initializeFAQs();
    
    // Load existing FAQs
    loadFAQs();
    
    // Form submission handler
    document.getElementById('faqForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;
        
        if (question && answer) {
            addFAQ(question, answer);
            document.getElementById('faqForm').reset();
        }
    });
});

// Initialize with default FAQs if empty
function initializeFAQs() {
    const defaultFAQs = [
        {
            question: "Apa isi dari website ini?",
            answer: "Website ini menyediakan informasi, ulasan, dan rekomendasi tempat-tempat wisata populer maupun tersembunyi di berbagai daerah."
        },
        {
            question: "Apakah informasi wisata di website ini akurat dan terbaru?",
            answer: "Kami berusaha menyajikan informasi yang akurat dan diperbarui secara berkala. Namun, sebaiknya cek juga informasi resmi dari destinasi terkait sebelum berkunjung."
        },
        {
            question: "Bagaimana cara menghubungi tim admin atau customer service?",
            answer: "Silakan kunjungi halaman Kontak Kami dan kirim pesan melalui formulir atau email resmi kami."
        }
    ];

    // Check if FAQs exist in localStorage
    if (!localStorage.getItem('faqs')) {
        localStorage.setItem('faqs', JSON.stringify(defaultFAQs));
    } else {
        // Merge default FAQs with existing ones, avoiding duplicates
        const existingFAQs = JSON.parse(localStorage.getItem('faqs'));
        const defaultQuestions = defaultFAQs.map(faq => faq.question);
        
        // Add only default FAQs that don't already exist
        defaultFAQs.forEach(defaultFAQ => {
            if (!existingFAQs.some(faq => faq.question === defaultFAQ.question)) {
                existingFAQs.unshift(defaultFAQ); // Add at beginning
            }
        });
        
        localStorage.setItem('faqs', JSON.stringify(existingFAQs));
    }
}

function loadFAQs() {
    const faqs = JSON.parse(localStorage.getItem('faqs'));
    const container = document.getElementById('faqsContainer');
    container.innerHTML = '';
    
    faqs.forEach((faq, index) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        faqElement.innerHTML = `
            <h4>${faq.question}</h4>
            <p>${faq.answer}</p>
            <button class="delete-btn" onclick="deleteFAQ(${index})">×</button>
        `;
        container.appendChild(faqElement);
    });
}

function addFAQ(question, answer) {
    let faqs = JSON.parse(localStorage.getItem('faqs'));
    faqs.push({ question, answer });
    localStorage.setItem('faqs', JSON.stringify(faqs));
    loadFAQs();
}

function deleteFAQ(index) {
    let faqs = JSON.parse(localStorage.getItem('faqs'));
    
    // Prevent deletion of default FAQs
    const defaultQuestions = [
        "Apa isi dari website ini?",
        "Apakah informasi wisata di website ini akurat dan terbaru?",
        "Bagaimana cara menghubungi tim admin atau customer service?"
    ];
    
    if (defaultQuestions.includes(faqs[index].question)) {
        alert("FAQ default tidak dapat dihapus!");
        return;
    }
    
    faqs.splice(index, 1);
    localStorage.setItem('faqs', JSON.stringify(faqs));
    loadFAQs();
}

// Update the main FAQ page with the stored FAQs
function updateMainFAQPage() {
    const faqs = JSON.parse(localStorage.getItem('faqs'));
    const faqContainer = document.querySelector('.content');
    
    if (faqContainer) {
        faqContainer.innerHTML = '';
        faqs.forEach(faq => {
            const faqElement = document.createElement('div');
            faqElement.className = 'faq';
            faqElement.innerHTML = `
                <h2>${faq.question}</h2>
                <p>${faq.answer}</p>
            `;
            faqContainer.appendChild(faqElement);
        });
    }
}

// Call this function when the main FAQ page loads
if (document.querySelector('.content')) {
    updateMainFAQPage();
}