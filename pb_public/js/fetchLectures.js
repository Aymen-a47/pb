async function fetchLectures() {
    const lecturesList = document.getElementById('lecturesList');
    lecturesList.innerHTML = ''; // مسح القائمة الحالية

    try {
        // التحقق من التوكن واستخراج prof_id
        const userData = checkToken();
        if (!userData) {
            return; // إذا كان التوكن غير صالح، يتم الخروج من الدالة
        }

        const prof_id = userData.id;

        // جلب المحاضرات الخاصة بالمستخدم الحالي
        const records = await pb.collection('Lectures').getFullList({
            filter: `prof_id = '${prof_id}'`, // تصفية حسب المستخدم الحالي
            sort: '-created', // ترتيب حسب التاريخ (الأحدث أولاً)
        });

        // عرض البيانات في القائمة
        records.forEach((lecture) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${lecture.title}</strong> - ${lecture.description}
                <button onclick="viewPdf('${pb.files.getUrl(lecture, lecture.pdf_lec)}')">عرض المحاضرة</button>
                <button onclick="openEditForm('${lecture.id}')">تعديل المحاضرة</button>
                <button onclick="deleteLecture('${lecture.id}')">حذف المحاضرة</button>
            `;
            lecturesList.appendChild(li);
        });
    } catch (error) {
        console.error('فشل في جلب المحاضرات:', error);
        lecturesList.innerHTML = '<li>حدث خطأ أثناء جلب المحاضرات.</li>';
    }
}

function viewPdf(pdfUrl) {
    document.getElementById('pdfFrame').src = pdfUrl; // عرض الملف في iframe
}