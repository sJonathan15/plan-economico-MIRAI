async function testLogin() {
    const credentials = {
        email: 'jcanar89@gmail.com',
        password: '1729jack'
    };

    try {
        console.log('Sending login request to http://localhost:3000/api/auth/login...');
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Request failed:', error);
    }
}

testLogin();
