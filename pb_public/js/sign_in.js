const pb = new PocketBase('http://127.0.0.1:8090'); // عدل الرابط حسب سيرفرك

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const authData = await pb.collection('Users').authWithPassword(email, password);
        
        alert('تم تسجيل الدخول بنجاح!');
        //window.location.href = '/Home.html'; // تح/ويل لصفحة الرئيسية
        window.location.replace('/الرئيسية'); // تح/ويل لصفحة الرئيسية
    } catch (error) {
console.error('Error logging in:', error);
        document.getElementById('error-message').textContent = 'حدث خطأ أثناء تسجيل الدخول: ' + error.message;
    }
});