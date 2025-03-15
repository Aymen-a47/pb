// الاتصال بـ PocketBase
const pb = new PocketBase('http://127.0.0.1:8090'); // تأكد من تغيير الرابط إذا كان مختلفًا

// دالة لجلب المحاضرات وعرضها
async function fetchLectures() {
    const lecturesList = document.getElementById('lecturesList');
    lecturesList.innerHTML = ''; // مسح القائمة الحالية

    try {
        // جلب البيانات من جدول lectures
        const records = await pb.collection('lectures').getFullList({
            sort: '-created', // ترتيب حسب التاريخ (الأحدث أولاً)
        });

        // عرض البيانات في القائمة
        records.forEach((lecture) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${lecture.title}</strong> - ${lecture.description}
                <button onclick="viewPdf('${pb.files.getUrl(lecture, lecture.pdf_lec)}')">عرض المحاضرة</button>
            `;
            lecturesList.appendChild(li);
        });
    } catch (error) {
        console.error('فشل في جلب المحاضرات:', error);
    }
}

// دالة لعرض ملف PDF
function viewPdf(pdfUrl) {
    document.getElementById('pdfFrame').src = pdfUrl;
}

// دالة لإضافة محاضرة جديدة
async function addLecture(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const prof_id = formData.get('prof_id');
    const pdf_lec = formData.get('pdf_lec');

    try {
        // إرسال البيانات إلى PocketBase
        const record = await pb.collection('lectures').create({
            title,
            description,
            prof_id,
            pdf_lec,
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

// جلب المحاضرات عند تحميل الصفحة
window.onload = fetchLectures;