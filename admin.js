const API_BASE = "ضع_رابط_الـ_WORKER_الخاص_بك_هنا"; 
const BOOKINGS_ENDPOINT = `${API_BASE}/admin/bookings`;

const loginView = document.getElementById("loginView");
const adminView = document.getElementById("adminView");
const loginForm = document.getElementById("loginForm");
const tableBody = document.getElementById("bookingsTbody");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;
    const authHeader = "Basic " + btoa(`${user}:${pass}`);

    try {
        const res = await fetch(BOOKINGS_ENDPOINT, {
            headers: { "Authorization": authHeader }
        });
        if (res.status === 401) throw new Error("خطأ في البيانات");
        const data = await res.json();
        renderBookings(data.items);
        loginView.classList.add("hidden");
        adminView.classList.remove("hidden");
    } catch (err) {
        alert(err.message);
    }
});

function renderBookings(items) {
    tableBody.innerHTML = items.map(b => `
        <tr>
            <td>${b.name}<br><small>${b.phone}</small></td>
            <td>${b.clinicName}</td>
            <td>${b.date}</td>
            <td>${b.slot}</td>
        </tr>
    `).join("");
}
