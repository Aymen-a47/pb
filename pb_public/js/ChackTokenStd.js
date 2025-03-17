
// دالة لاستخراج التوكن من الكوكيز
function getTokenFromCookies(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null; // إذا لم يتم العثور على التوكن
}

// دالة للتحقق من التوكن
function checkToken() {
    const token = getTokenFromCookies('auth_token'); // استخراج التوكن من الكوكيز

    if (!token) {
        window.location.href = 'LogInAsStudent.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
        return null;
    }

    try {
        // فك تشفير التوكن (تحويله من base64 إلى JSON)
        const tokenData = JSON.parse(atob(token));

        // التحقق من أن التوكن يحتوي على البيانات المطلوبة
        if (!tokenData.id || !tokenData.email) {
            throw new Error('التوكن غير صالح.');
        }

        // إرجاع بيانات المستخدم
        return tokenData;
    } catch (error) {
        console.error('فشل في تحقق من التوكن:', error);
        alert('التوكن غير صالح، يرجى تسجيل الدخول مرة أخرى.');
        window.location.href = 'LogInAsStudent.html';
        return null;
    }
}

// تشغيل التحقق من التوكن عند تحميل الصفحة
window.onload = function () {
    const userData = checkToken();

};