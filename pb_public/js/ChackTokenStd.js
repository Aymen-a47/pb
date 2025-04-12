// التحقق من وجود توكن المستخدم وعرض اسم المستخدم بدلاً من "التسجيل"
document.addEventListener('DOMContentLoaded', function() {
  // دالة للحصول على قيمة الكوكي حسب الاسم
  function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
  }

  // الحصول على التوكن من الكوكيز
  const token = getCookie('auth_token');
  
  // الحصول على عنصر تسجيل الدخول
  const loginElement = document.querySelector('.log-in');
  
  // إذا وجد التوكن، نقوم بفك تشفيره وعرض اسم المستخدم
  if (token) {
      try {
          // فك تشفير التوكن (base64)
          const tokenData = JSON.parse(atob(token));
          
          // تغيير كلاس العنصر لتنسيقه بشكل مختلف إذا لزم الأمر
          loginElement.className = 'user-logged-in';
          
          // تغيير محتوى عنصر التسجيل ليعرض فقط زر تسجيل الخروج
          loginElement.innerHTML = '';
          
          // إضافة زر تسجيل الخروج
          const logoutButton = document.createElement('a');
          logoutButton.href = "#";
          logoutButton.textContent = "تسجيل الخروج";
          logoutButton.addEventListener('click', function(e) {
              e.preventDefault();
              // حذف الكوكي عند تسجيل الخروج
              document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              // إعادة تحميل الصفحة
              window.location.href = 'LoginAsStudent.html';
          });
          
          // إضافة زر تسجيل الخروج إلى العنصر
          loginElement.appendChild(logoutButton);
          // نهاية كتلة if
      } catch (error) {
          console.error('خطأ في قراءة التوكن:', error);
          // إعادة تعيين الكوكي إذا كان هناك خطأ في قراءته
          document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
  }
});