document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");
    
    const pb = new PocketBase("http://localhost:8090"); // تأكد من تغيير الرابط إلى عنوان السيرفر الخاص بك

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const newUser = await pb.collection("users").create({
                email: email,
                password: password,
                passwordConfirm: password, // PocketBase يتطلب تأكيد الباسورد عند الإنشاء
            });
            
            alert("تم إنشاء الحساب بنجاح!");
            window.location.href = "/pb_public/html/Home.html"; // غير الرابط حسب الحاجة
        } catch (error) {
            errorMessage.textContent = "فشل في إنشاء الحساب: " + error.message;
        }
    });
});