const fetch = require('node-fetch');

async function testOpenAI() {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-proj-kXgvPkZpmbU4weSnO7_lOFe3uN'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: "Hello, this is a test!"
            }]
        })
    });

    const data = await response.json();
    console.log(data);
}

testOpenAI().catch(console.error); 