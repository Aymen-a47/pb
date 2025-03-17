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
        const records = await pb.collection('Students').getFullList(200, {
            filter: `email="${email}"`, // تصفية النتائج بناءً على البريد الإلكتروني
        });

        // إذا لم يتم العثور على أي سجلات
        if (records.length === 0) {
            alert('البريد الإلكتروني غير موجود.'); // عرض رسالة خطأ باستخدام alert
            return;
        }

        // تحقق من كلمة المرور
        const student = records[0];
        if (student.password === password) {
            console.log('تم تسجيل الدخول بنجاح:', student);

            // توليد التوكن وتخزينه في الكوكيز
            const token = generateToken(student); // توليد التوكن
            document.cookie = `auth_token=${token}; path=/; max-age=3600;` // تخزين التوكن في الكوكيز لمدة ساعة

            // توجيه المستخدم إلى الصفحة الرئيسية
            window.location.href = 'Home.html';
        } else {
            alert('كلمة المرور غير صحيحة.'); // عرض رسالة خطأ باستخدام alert
        }
    } catch (error) {
        console.error('فشل تسجيل الدخول:', error);
        alert('حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.'); // عرض رسالة خطأ باستخدام alert
    }
});

// دالة لتوليد التوكن (مثال بسيط)
function generateToken(student) {
    // إنشاء بيانات التوكن
    const tokenData = {
        id: student.id, 
        name: student.name, 
        email: student.email, 
        stage: student.stage, 
        deparment: student.deparment, 
    };

    // تحويل البيانات إلى نص مشفر باستخدام base64
    return btoa(JSON.stringify(tokenData));
}