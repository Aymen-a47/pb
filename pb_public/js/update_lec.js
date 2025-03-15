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
                        <button onclick="openEditForm('${lecture.id}')">تعديل المحاضرة</button>
                        <button onclick="deleteLecture('${lecture.id}')">حذف المحاضرة</button>
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

        // دالة لحذف محاضرة
        async function deleteLecture(lectureId) {
            if (confirm('هل أنت متأكد من حذف هذه المحاضرة؟')) {
                try {
                    // حذف المحاضرة من PocketBase
                    await pb.collection('lectures').delete(lectureId);
                    alert('تم حذف المحاضرة بنجاح!');
                    fetchLectures(); // تحديث قائمة المحاضرات
                } catch (error) {
                    console.error('فشل في حذف المحاضرة:', error);
                    alert('حدث خطأ أثناء حذف المحاضرة.');
                }
            }
        }

        // دالة لفتح نموذج التعديل
        async function openEditForm(lectureId) {
            try {
                // جلب بيانات المحاضرة
                const lecture = await pb.collection('lectures').getOne(lectureId);

                // تعبئة النموذج بالبيانات الحالية
                document.getElementById('editTitle').value = lecture.title;
                document.getElementById('editDescription').value = lecture.description;
                document.getElementById('editProfId').value = lecture.prof_id;

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

        // دالة لتحديث المحاضرة
        async function updateLecture(lectureId) {
            const formData = new FormData(document.getElementById('editForm'));
            const title = formData.get('editTitle');
            const description = formData.get('editDescription');
            const prof_id = formData.get('editProfId');
            const pdf_lec = formData.get('editPdfLec');

            try {
                // تحديث البيانات في PocketBase
                await pb.collection('lectures').update(lectureId, {
                    title,
                    description,
                    prof_id,
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

        // دالة لإغلاق نموذج التعديل
        function closeEditForm() {
            document.getElementById('editLectureForm').style.display = 'none';
        }

        // إضافة حدث للنموذج عند الإرسال
        document.getElementById('addLectureForm').addEventListener('submit', addLecture);

        // جلب المحاضرات عند تحميل الصفحة
        window.onload = fetchLectures;