// login.js - Emir Tarzı (DOMContentLoaded YOK)
// Akış: form submit -> doğrulama -> toast -> fetch(/api/login) ya da simülasyon

// Elemanlar
const form = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const toastElement = document.getElementById('liveToast');
const toastBody = toastElement ? toastElement.querySelector('.toast-body') : null;

// Basit e-posta kontrolü
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Tek noktadan toast göster
function showToast(state, message) {
    if (!toastElement || !toastBody) return; // toast yoksa sessiz düş
    // durum sınıflarını düz yönet
    toastElement.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning');
    if (state === 'success') toastElement.classList.add('text-bg-success');
    else if (state === 'error') toastElement.classList.add('text-bg-danger');
    else toastElement.classList.add('text-bg-warning');

    toastBody.textContent = message;
    new bootstrap.Toast(toastElement).show();
}

// Form submit
if (form && emailInput && passwordInput) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Boşluk ve basit validasyon
        if (email === '' || password === '') {
            showToast('error', 'E-posta ve parola boş olamaz');
            return;
        }
        if (!isValidEmail(email)) {
            showToast('error', 'Geçerli bir e-posta girin');
            return;
        }
        if (password.length < 4) {
            showToast('error', 'Parola en az 4 karakter olmalıdır');
            return;
        }

        showToast('warn', 'Giriş denemesi yapılıyor...');

        // Backend denemesi
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                showToast('success', 'Giriş başarılı, yönlendiriliyorsunuz...');
                setTimeout(() => {
                    window.location.href = '../dashboard/todo.html';
                }, 1000);
                return;
            }

            // 2xx değilse mesajı göster
            const data = await res.json().catch(() => null);
            showToast('error', (data && data.message) ? data.message : 'Giriş başarısız. Bilgileri kontrol edin.');
        } catch {
            // Backend yoksa simülasyon
            showToast('success', 'Backend yok, test modu: yönlendiriliyorsunuz...');
            setTimeout(() => {
                window.location.href = '../dashboard/todo.html';
            }, 900);
        }
    });

    // Enter ile submit (senin #task örneğindeki gibi)
    [emailInput, passwordInput].forEach((el) => {
        el.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                form.requestSubmit();
            }
        });
    });
}
