// ==========================================
// Portfolio Data Management
// ==========================================

// Initialize portfolio data from localStorage or use default
let portfolioData = {
    profile: {
        name: '𝐼𝑇𝑆𝐴𝑌𝑂𝑈𝐵',
        title: 'Video Editor',
        image: 'https://via.placeholder.com/200/FCBF0B/1a1a1a?text=Profile',
        about: 'مرحباً! أنا مصمم فيديوهات محترف متخصص في إنشاء محتوى مرئي إبداعي وجذاب. أقدم خدمات المونتاج، تصميم الموشن جرافيك، والتأثيرات البصرية الاحترافية.'
    },
    contact: {
        phone: '+966 XX XXX XXXX',
        whatsapp: '#',
        facebook: '#',
        instagram: '#'
    },
    works: [
        {
            id: 1,
            title: 'مشروع إعلاني',
            description: 'فيديو إعلاني احترافي للترويج للمنتجات',
            thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/FCBF0B?text=Video+Project+1',
            videoUrl: '#'
        },
        {
            id: 2,
            title: 'موشن جرافيك',
            description: 'تصميم موشن جرافيك متحرك ومبتكر',
            thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/FCBF0B?text=Video+Project+2',
            videoUrl: '#'
        },
        {
            id: 3,
            title: 'مونتاج إبداعي',
            description: 'مونتاج احترافي مع تأثيرات بصرية مذهلة',
            thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/FCBF0B?text=Video+Project+3',
            videoUrl: '#'
        }
    ]
};

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
    }
    updateUI();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// Update UI with current data
function updateUI() {
    // Update profile image
    document.getElementById('profileImage').src = portfolioData.profile.image;
    
    // Update about section
    document.getElementById('aboutDisplay').innerHTML = `<p>${portfolioData.profile.about}</p>`;
    document.getElementById('aboutTextarea').value = portfolioData.profile.about;
    
    // Update contact information
    document.getElementById('phoneDisplay').textContent = portfolioData.contact.phone;
    document.getElementById('phoneInput').value = portfolioData.contact.phone;
    
    // Update social links
    updateSocialLink('whatsapp', portfolioData.contact.whatsapp);
    updateSocialLink('facebook', portfolioData.contact.facebook);
    updateSocialLink('instagram', portfolioData.contact.instagram);
    
    // Update portfolio grid
    renderPortfolioGrid();
}

function updateSocialLink(platform, url) {
    const link = document.getElementById(`${platform}Link`);
    const input = document.getElementById(`${platform}Input`);
    
    link.href = url;
    input.value = url;
    
    // Disable link if URL is not set
    if (url === '#' || url === '') {
        link.style.opacity = '0.5';
        link.style.pointerEvents = 'none';
    } else {
        link.style.opacity = '1';
        link.style.pointerEvents = 'auto';
    }
}

// ==========================================
// Profile Picture Management
// ==========================================

document.getElementById('profileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.getElementById('profileImage').src = imageUrl;
            portfolioData.profile.image = imageUrl;
            saveData();
            
            // Show success animation
            showNotification('تم تحديث صورة البروفيل بنجاح!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// ==========================================
// About Section Management
// ==========================================

function toggleEditAbout() {
    const display = document.getElementById('aboutDisplay');
    const textarea = document.getElementById('aboutTextarea');
    const controls = document.getElementById('aboutEditControls');
    
    display.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
    controls.classList.toggle('hidden');
    
    if (!textarea.classList.contains('hidden')) {
        textarea.focus();
    }
}

function saveAbout() {
    const newAbout = document.getElementById('aboutTextarea').value.trim();
    if (newAbout) {
        portfolioData.profile.about = newAbout;
        saveData();
        updateUI();
        toggleEditAbout();
        showNotification('تم حفظ النبذة بنجاح!', 'success');
    } else {
        showNotification('الرجاء كتابة نبذة عنك', 'error');
    }
}

function cancelEditAbout() {
    document.getElementById('aboutTextarea').value = portfolioData.profile.about;
    toggleEditAbout();
}

// ==========================================
// Contact Section Management
// ==========================================

function toggleEditContact() {
    const display = document.getElementById('contactDisplay');
    const edit = document.getElementById('contactEdit');
    
    display.classList.toggle('hidden');
    edit.classList.toggle('hidden');
}

function saveContact() {
    const phone = document.getElementById('phoneInput').value.trim();
    const whatsapp = document.getElementById('whatsappInput').value.trim();
    const facebook = document.getElementById('facebookInput').value.trim();
    const instagram = document.getElementById('instagramInput').value.trim();
    
    if (!phone) {
        showNotification('الرجاء إدخال رقم الهاتف', 'error');
        return;
    }
    
    portfolioData.contact = {
        phone: phone,
        whatsapp: whatsapp || '#',
        facebook: facebook || '#',
        instagram: instagram || '#'
    };
    
    saveData();
    updateUI();
    toggleEditContact();
    showNotification('تم حفظ معلومات التواصل بنجاح!', 'success');
}

function cancelEditContact() {
    updateUI();
    toggleEditContact();
}

// ==========================================
// Portfolio Grid Management
// ==========================================

function renderPortfolioGrid() {
    const grid = document.getElementById('portfolioGrid');
    grid.innerHTML = '';
    
    portfolioData.works.forEach(work => {
        const workItem = createWorkItem(work);
        grid.appendChild(workItem);
    });
}

function createWorkItem(work) {
    const div = document.createElement('div');
    div.className = 'work-item';
    div.dataset.id = work.id;
    
    div.innerHTML = `
        <div class="work-thumbnail">
            <img src="${work.thumbnail}" alt="${work.title}">
            <div class="work-overlay">
                <button class="play-btn" onclick="playVideo(${work.id})"><i class="fas fa-play"></i></button>
                <button class="delete-work-btn" onclick="deleteWork(${work.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="work-info">
            <h3>${work.title}</h3>
            <p>${work.description}</p>
        </div>
    `;
    
    return div;
}

function playVideo(workId) {
    const work = portfolioData.works.find(w => w.id === workId);
    if (work && work.videoUrl && work.videoUrl !== '#') {
        window.open(work.videoUrl, '_blank');
    } else {
        showNotification('لم يتم إضافة رابط الفيديو لهذا العمل', 'error');
    }
}

function deleteWork(workId) {
    if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
        portfolioData.works = portfolioData.works.filter(w => w.id !== workId);
        saveData();
        renderPortfolioGrid();
        showNotification('تم حذف العمل بنجاح!', 'success');
    }
}

// ==========================================
// Add Work Modal Management
// ==========================================

function openAddWorkModal() {
    const modal = document.getElementById('addWorkModal');
    modal.classList.add('active');
    document.getElementById('addWorkForm').reset();
}

function closeAddWorkModal() {
    const modal = document.getElementById('addWorkModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('addWorkModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAddWorkModal();
    }
});

// Handle form submission
document.getElementById('addWorkForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('workTitle').value.trim();
    const description = document.getElementById('workDescription').value.trim();
    const videoUrl = document.getElementById('workVideoUrl').value.trim();
    const thumbnailFile = document.getElementById('workThumbnail').files[0];
    
    if (!title || !description) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Generate new ID
    const newId = portfolioData.works.length > 0 
        ? Math.max(...portfolioData.works.map(w => w.id)) + 1 
        : 1;
    
    const newWork = {
        id: newId,
        title: title,
        description: description,
        videoUrl: videoUrl || '#',
        thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/FCBF0B?text=' + encodeURIComponent(title)
    };
    
    // If thumbnail file is provided, read it
    if (thumbnailFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newWork.thumbnail = event.target.result;
            addWorkToPortfolio(newWork);
        };
        reader.readAsDataURL(thumbnailFile);
    } else {
        addWorkToPortfolio(newWork);
    }
});

function addWorkToPortfolio(work) {
    portfolioData.works.push(work);
    saveData();
    renderPortfolioGrid();
    closeAddWorkModal();
    showNotification('تم إضافة العمل بنجاح!', 'success');
}

// ==========================================
// Notification System
// ==========================================

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'linear-gradient(135deg, #f44336 0%, #da190b 100%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '16px',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'Cairo, sans-serif'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Keyboard Shortcuts
// ==========================================

document.addEventListener('keydown', function(e) {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('addWorkModal');
        if (modal.classList.contains('active')) {
            closeAddWorkModal();
        }
    }
    
    // Ctrl/Cmd + S to save (prevent default save dialog)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        
        // Save whichever section is being edited
        if (!document.getElementById('aboutTextarea').classList.contains('hidden')) {
            saveAbout();
        } else if (!document.getElementById('contactEdit').classList.contains('hidden')) {
            saveContact();
        }
    }
});

// ==========================================
// Smooth Scroll Animation
// ==========================================

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

// ==========================================
// Initialize on Page Load
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Add entrance animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .work-item').forEach(el => {
        observer.observe(el);
    });
    
    console.log('%c𝐼𝑇𝑆𝐴𝑌𝑂𝑈𝐵 Portfolio', 'color: #FCBF0B; font-size: 24px; font-weight: bold;');
    console.log('%cVideo Editor Portfolio - Ready! ✨', 'color: #666; font-size: 14px;');
});

// ==========================================
// Export/Import Data (Advanced Feature)
// ==========================================

function exportData() {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    link.click();
    URL.revokeObjectURL(url);
    showNotification('تم تصدير البيانات بنجاح!', 'success');
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            portfolioData = data;
            saveData();
            updateUI();
            showNotification('تم استيراد البيانات بنجاح!', 'success');
        } catch (error) {
            showNotification('خطأ في استيراد البيانات', 'error');
        }
    };
    reader.readAsText(file);
}

// Make functions globally accessible
window.toggleEditAbout = toggleEditAbout;
window.saveAbout = saveAbout;
window.cancelEditAbout = cancelEditAbout;
window.toggleEditContact = toggleEditContact;
window.saveContact = saveContact;
window.cancelEditContact = cancelEditContact;
window.openAddWorkModal = openAddWorkModal;
window.closeAddWorkModal = closeAddWorkModal;
window.deleteWork = deleteWork;
window.playVideo = playVideo;
window.exportData = exportData;
window.importData = importData;