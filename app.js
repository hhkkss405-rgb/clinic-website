document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const status = document.getElementById('status');
    const btn = document.getElementById('submitBtn');
    
    status.textContent = "جارٍ إرسال طلب الحجز...";
    btn.disabled = true;

    const payload = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        clinic: document.getElementById('clinic').value,
        date: document.getElementById('date').value
    };

    // استبدل الرابط التالي برابط الـ Cloudflare Worker الخاص بك
    const WORKER_URL = "https://your-worker-name.workers.dev";

    try {
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            status.style.color = "green";
            status.textContent = "تم استلام طلبك بنجاح! سنتواصل معك قريباً.";
            e.target.reset();
        } else {
            throw new Error();
        }
    } catch (err) {
        status.style.color = "red";
        status.textContent = "حدث خطأ، حاول مرة أخرى أو تواصل معنا هاتفياً.";
    } finally {
        btn.disabled = false;
    }
});
