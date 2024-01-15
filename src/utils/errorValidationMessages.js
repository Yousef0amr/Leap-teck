const en = [
    { fieldName: 'phone', errorMessage: 'Invalid phone number format' },
    { fieldName: 'email', errorMessage: 'Invalid email address format' },
    { fieldName: 'name', errorMessage: 'Name must be at least 3 characters long' },
    { fieldName: 'password', errorMessage: 'Password must be at least 8 characters long' },
    { fieldName: 'token', errorMessage: 'Token required' },
    { fieldName: 'otpSecret', errorMessage: 'OTP Secret required' },
    { fieldName: 'newPassword', errorMessage: 'Password must be at least 8 characters long' },
    { fieldName: 'confirmPassword', errorMessage: 'Password does not match' },
];

const ar = [
    { fieldName: 'phone', errorMessage: 'صيغة رقم الهاتف غير صالحة' },
    { fieldName: 'email', errorMessage: 'صيغة البريد الإلكتروني غير صالحة' },
    { fieldName: 'name', errorMessage: 'يجب أن يكون الاسم على الأقل 3 أحرف' },
    { fieldName: 'password', errorMessage: 'يجب أن تكون كلمة المرور على الأقل 8 أحرف' },
    { fieldName: 'token', errorMessage: 'مطلوب رمز' },
    { fieldName: 'otpSecret', errorMessage: 'مطلوب OTPSecret' },
    { fieldName: 'newPassword', errorMessage: 'يجب أن تكون كلمة المرور على الأقل 8 أحرف' },
    { fieldName: 'confirmPassword', errorMessage: 'كلمة المرور غير متطابقة' },

];

module.exports = {
    en,
    ar,
};
