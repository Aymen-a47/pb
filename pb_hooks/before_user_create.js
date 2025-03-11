pocketBase.beforeCreate((record, collection) => {
    const email = record.email;
  
    // تحقق مما إذا كان البريد الإلكتروني ينتهي بنطاق جامعي
    if (!email.endsWith('@university.edu')) {
      throw new Error('البريد الإلكتروني يجب أن يكون من نطاق جامعي (مثال: example@university.edu).');
    }
  });