async function openEditForm(lectureId) {
    try {
        // جلب بيانات المحاضرة
        const lecture = await pb.collection('Lectures').getOne(lectureId);

        // تعبئة النموذج بالبيانات الحالية
        document.getElementById('editTitle').value = lecture.title;
        document.getElementById('editDescription').value = lecture.description;

        // إظهار نموذج التعديل
        document.getElementById('editLectureForm').style.display = 'block';

        // إضافة حدث للنموذج عند الإرسال
        document.getElementById('editForm').onsubmit = async (e) => {
            e.preventDefault();
            await updateLecture(lectureId);
        };
    } catch (error) {
        console.error('فشل في جلب بيانات المحاضرة:', error);
        alert('حدث خطأ أثناء فتح نموذج التعديل.');
    }
}

async function updateLecture(lectureId) {
    const formData = new FormData(document.getElementById('editForm'));
    const title = formData.get('editTitle');
    const description = formData.get('editDescription');
    const pdf_lec = formData.get('editPdfLec');

    try {
        // تحديث البيانات في PocketBase
        await pb.collection('Lectures').update(lectureId, {
            title,
            description,
            pdf_lec,
        });

        alert('تم تعديل المحاضرة بنجاح!');
        fetchLectures(); // تحديث قائمة المحاضرات
        closeEditForm(); // إغلاق نموذج التعديل
    } catch (error) {
        console.error('فشل في تعديل المحاضرة:', error);
        alert('حدث خطأ أثناء تعديل المحاضرة.');
    }
}

function closeEditForm() {
    document.getElementById('editLectureForm').style.display = 'none';
}