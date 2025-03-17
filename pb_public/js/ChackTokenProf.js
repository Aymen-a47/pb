
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
        window.location.href = 'LogInAsProf.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
        return null;
    }

    try {
        // فك تشفير التوكن (تحويله من base64 إلى JSON)
        const tokenData = JSON.parse(atob(token));

        if (tokenData.positon !== 'teacher') {
            throw new Error('التوكن غير صالح.');
        }

        // إرجاع بيانات المستخدم
        return tokenData;
    } catch (error) {
        console.error('فشل في تحقق من التوكن:', error);
        alert('التوكن غير صالح، يرجى تسجيل الدخول مرة أخرى.');
        window.location.href = 'LogInAsProf.html';
        return null;
    }
}

// تشغيل التحقق من التوكن عند تحميل الصفحة
window.onload = function () {
    const userData = checkToken();

    if (userData) {
        console.log('بيانات المستخدم:', userData);
        fetchLectures(); // جلب المحاضرات إذا كان التوكن صالحًا
    }
};