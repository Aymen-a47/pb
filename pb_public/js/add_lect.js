async function addLecture(event){
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const pdf_lec = formData.get('pdf_lec');

    // التحقق من التوكن واستخراج prof_id
    const userData = checkToken();
    if (!userData) {

        return; // إذا كان التوكن غير صالح، يتم الخروج من الدالة
   
      }

    const prof_id = userData.id;

    try {
        // إرسال البيانات إلى PocketBase
        const record = await pb.collection('Lectures').create({
            title,
            description,
            prof_id, // يتم تعيينه تلقائيًا
            pdf_lec,
            Subject: userData.Subject,
        });

        alert('تمت إضافة المحاضرة بنجاح!');
        fetchLectures(); // تحديث قائمة المحاضرات
        event.target.reset(); // مسح النموذج
    } catch (error) {
        console.error('فشل في إضافة المحاضرة:', error);
        alert('حدث خطأ أثناء إضافة المحاضرة.');
    }
}

// إضافة حدث للنموذج عند الإرسال
document.getElementById('addLectureForm').addEventListener('submit', addLecture);