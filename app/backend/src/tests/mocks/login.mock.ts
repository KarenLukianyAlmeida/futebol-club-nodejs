const login = {
    email: 'admin@admin.com',
    password:'secret_admin'
};

const loginWithoutEmail = {
    email: '',
    password:'secret_admin'
};

const loginInvalidPasword = {
    email: 'admin@admin.com',
    password:'invalid_password'
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MjI5NDMyNjF9.oO2ublVRCdAipKzpxpYpEUMuEnKXfhrJ7KxQZSsMLMM';

export {
    login,
    loginWithoutEmail,
    token,
    loginInvalidPasword,
};
