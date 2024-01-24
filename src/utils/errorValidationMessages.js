const en = [
    { fieldName: 'phone', errorMessage: 'Invalid phone number format' },
    { fieldName: 'email', errorMessage: 'Invalid email address format' },
    { fieldName: 'name', errorMessage: 'Name must be at least 3 characters long' },
    { fieldName: 'password', errorMessage: 'Password are required' },
    { fieldName: 'token', errorMessage: 'Token required' },
    { fieldName: 'otpSecret', errorMessage: 'OTP Secret required' },
    { fieldName: 'newPassword', errorMessage: 'Password must be at least 8 characters long' },
    { fieldName: 'confirmPassword', errorMessage: 'Password does not match' },
    // Add the following for personalInfo
    { fieldName: 'personalInfo.name', errorMessage: 'Name must be at least 3 characters long and is required' },
    { fieldName: 'personalInfo.phone', errorMessage: 'Phone must be between 10 and 11 characters long and is required' },
    { fieldName: 'personalInfo.email', errorMessage: 'Email must be a valid email address and is required' },
    { fieldName: 'personalInfo.password', errorMessage: 'Password must be at least 8 characters long and is required' },
    // Add the following for businessInfo
    { fieldName: 'businessInfo.logo', errorMessage: 'Logo is required' },
    { fieldName: 'businessInfo.name', errorMessage: 'Business name must be at least 3 characters long and is required' },
    { fieldName: 'businessInfo.deliveryNumber', errorMessage: 'Delivery number must be between 10 and 11 characters long and is required' },
    { fieldName: 'businessInfo.location', errorMessage: 'Location is required' },
    { fieldName: 'businessInfo.description', errorMessage: 'Description is required' },
    { fieldName: 'businessInfo.categories', errorMessage: 'At least one category is required' },
    { fieldName: 'businessInfo.frontId', errorMessage: 'Front ID is required' },
    { fieldName: 'businessInfo.backId', errorMessage: 'Back ID is required' },
    { fieldName: 'businessInfo.healthCertificate', errorMessage: 'Health certificate is required' },
];

const ar = [
    { fieldName: 'phone', errorMessage: 'صيغة رقم الهاتف غير صالحة' },
    { fieldName: 'email', errorMessage: 'صيغة البريد الإلكتروني غير صالحة' },
    { fieldName: 'name', errorMessage: 'يجب أن يكون الاسم على الأقل 3 أحرف' },
    { fieldName: 'password', errorMessage: ' كلمة المرور مطلوبة' },
    { fieldName: 'token', errorMessage: 'مطلوب رمز' },
    { fieldName: 'otpSecret', errorMessage: 'مطلوب OTPSecret' },
    { fieldName: 'newPassword', errorMessage: 'يجب أن تكون كلمة المرور على الأقل 8 أحرف' },
    { fieldName: 'confirmPassword', errorMessage: 'كلمة المرور غير متطابقة' },
    // Add the following for personalInfo
    { fieldName: 'personalInfo.name', errorMessage: 'يجب أن يكون الاسم على الأقل 3 أحرف ومطلوب' },
    { fieldName: 'personalInfo.phone', errorMessage: 'يجب أن يكون رقم الهاتف بين 10 و 11 حرفًا ومطلوب' },
    { fieldName: 'personalInfo.email', errorMessage: 'يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالح ومطلوب' },
    { fieldName: 'personalInfo.password', errorMessage: 'يجب أن تكون كلمة المرور على الأقل 8 أحرف ومطلوبة' },
    // Add the following for businessInfo
    { fieldName: 'businessInfo.logo', errorMessage: 'مطلوب شعار' },
    { fieldName: 'businessInfo.name', errorMessage: 'يجب أن يكون اسم العمل على الأقل 3 أحرف ومطلوب' },
    { fieldName: 'businessInfo.deliveryNumber', errorMessage: 'يجب أن يكون رقم التسليم بين 10 و 11 حرفًا ومطلوب' },
    { fieldName: 'businessInfo.location', errorMessage: 'الموقع مطلوب' },
    { fieldName: 'businessInfo.description', errorMessage: 'الوصف مطلوب' },
    { fieldName: 'businessInfo.categories', errorMessage: 'مطلوبة على الأقل فئة واحدة' },
    { fieldName: 'businessInfo.frontId', errorMessage: 'مطلوب هوية الواجهة' },
    { fieldName: 'businessInfo.backId', errorMessage: 'مطلوب هوية الخلفية' },
    { fieldName: 'businessInfo.healthCertificate', errorMessage: 'مطلوب شهادة صحية' },
];


module.exports = {
    en,
    ar,
};
