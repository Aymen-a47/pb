async function deleteLecture(lectureId) {
    if (confirm('هل أنت متأكد من حذف هذه المحاضرة؟')) {
        try {
            await pb.collection('Lectures').delete(lectureId);
            alert('تم حذف المحاضرة بنجاح!');
            fetchLectures(); // تحديث قائمة المحاضرات
        } catch (error) {
            console.error('فشل في حذف المحاضرة:', error);
            alert('حدث خطأ أثناء حذف المحاضرة.');
        }
    }
}