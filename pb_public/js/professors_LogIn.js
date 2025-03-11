
const pb = new PocketBase('http://127.0.0.1:8090');

// دالة لتسجيل الدخول
async function loginStudent(email, password) {
    try {

        const authData = await pb.collection('Professors').authWithPassword(
            email,
            password,
        );

        if (authData) {
            console.log('تم تسجيل الدخول بنجاح:', authData);
            // تحويل المستخدم إلى صفحة الرئيسية
            alert('تم تسجيل الدخول بنجاح');
            window.location.href = 'home.html';
        }

    } catch (error) {
        // حدث خطأ أثناء تسجيل الدخول
        alert('حدث خطأ أثناء تسجيل الدخول');
        console.error('حدث خطأ أثناء تسجيل الدخول:', error);
    }
}

// الحصول على البيانات من واجهة المستخدم
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const email = document.getElementById('email').value; // الحصول على البريد الإلكتروني
    const password = document.getElementById('password').value; // الحصول على كلمة المرور

    // تسجيل الدخول باستخدام البيانات المدخلة
    loginStudent(email, password);
});