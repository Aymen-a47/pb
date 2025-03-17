// تهيئة PocketBase
const pb = new PocketBase('http://localhost:8090'); // الاتصال بالنسخة المحلية
const loginForm = document.getElementById('loginForm'); // النموذج الخاص بتسجيل الدخول

// التعامل مع تسجيل الدخول
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // الحصول على قيم البريد الإلكتروني وكلمة المرور من النموذج
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // البحث عن الأستاذ باستخدام البريد الإلكتروني في جدول Professors
        const records = await pb.collection('Professors').getFullList(200, {
            filter: `email="${email}"`, // تصفية النتائج بناءً على البريد الإلكتروني
        });

        // إذا لم يتم العثور على أي سجلات
        if (records.length === 0) {
            alert('البريد الإلكتروني غير موجود.'); // عرض رسالة خطأ باستخدام alert
            return;
        }

        // تحقق من كلمة المرور
        const professor = records[0];
        if (professor.password === password) {
            console.log('تم تسجيل الدخول بنجاح:', professor);

            // توليد التوكن وتخزينه في الكوكيز
            const token = generateToken(professor); // توليد التوكن
            document.cookie = `auth_token=${token}; path=/; max-age=3600;` // تخزين التوكن في الكوكيز لمدة ساعة

            // توجيه المستخدم إلى الصفحة الرئيسية
            window.location.href = 'Prof_Edit_dishbord.html';
        } else {
            alert('كلمة المرور غير صحيحة.'); // عرض رسالة خطأ باستخدام alert
        }
    } catch (error) {
        console.error('فشل تسجيل الدخول:', error);
        alert('حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.'); // عرض رسالة خطأ باستخدام alert
    }
});

// دالة لتوليد التوكن (مثال بسيط)
function generateToken(professor) {
    // إنشاء بيانات التوكن
    const tokenData = {
        id: professor.id, // معرف الأستاذ
        name: professor.name, // اسم الأستاذ
        email: professor.email, // البريد الإلكتروني
        positon: 'teacher', // المنصب
        Subject: professor.subject, // المادة الدراسية
    };

    // تحويل البيانات إلى نص مشفر باستخدام base64
    return btoa(JSON.stringify(tokenData));
}