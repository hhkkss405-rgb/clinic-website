const form = document.getElementById("bookingForm");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

// ملاحظة: سنقوم بتغيير هذا الرابط لاحقاً بعد إنشاء الـ Worker
const WORKER_URL = "https://your-worker-name.workers.dev"; 

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // إظهار رسالة "جارٍ الإرسال"
    statusEl.textContent = "جارٍ إرسال طلبك...";
    statusEl.className = "status";
    submitBtn.disabled = true;

    const payload = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      clinic: document.getElementById("clinic").value,
      date: document.getElementById("date").value,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        statusEl.textContent = "تم استلام طلب الحجز بنجاح! سيتم التواصل معكم.";
        statusEl.className = "status ok";
        form.reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      statusEl.textContent = "عذراً، حدث خطأ. برجاء المحاولة لاحقاً.";
      statusEl.className = "status bad";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
