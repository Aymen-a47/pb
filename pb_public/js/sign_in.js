document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
  
    // إنشاء مثيل من PocketBase
    const pb = new PocketBase('http://127.0.0.1:8090'); // استبدل بعنوان URL الخاص بك
  
    try {
      // تسجيل الدخول
      const authData = await pb.collection('Students').authWithPassword(email, password);
  
      // إذا نجح تسجيل الدخول
      console.log('تم تسجيل الدخول بنجاح:', authData);
      errorMessage.textContent = 'تم تسجيل الدخول بنجاح!';
      errorMessage.style.color = 'green';
  
      // توجيه المستخدم إلى صفحة أخرى (اختياري)
      window.location.href = '/dashboard'; // استبدل بالصفحة التي تريد توجيه المستخدم إليها
    } catch (error) {
      // إذا فشل تسجيل الدخول
      console.error('فشل تسجيل الدخول:', error.message);
      errorMessage.textContent = 'فشل تسجيل الدخول: بريد إلكتروني أو كلمة مرور خاطئة.';
      errorMessage.style.color = 'red';
    }
  });