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
                        <strong>${lecture.title}</strong>
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

        // جلب المحاضرات عند تحميل الصفحة
        window.onload = fetchLectures;
