// --- Kunci Rahasia Anda (Ganti dengan nilai yang sebenarnya!) ---
const CHATBASE_TOKEN = 'Bearer 5ef37cf4-5498-484e-a116-5ee8c1f3bcad'; // GANTI DENGAN TOKEN ANDA
const CHATBOT_ID = 'MNTT3Tk2dmgw4vGPBzTIw'; // GANTI DENGAN ID CHATBOT ANDA
// ------------------------------------------------------------------

const API_URL = 'https://www.chatbase.co/api/v1/chat';

async function sendMessageToAI() {
    const userInputElement = document.getElementById('user-input');
    const userMessage = userInputElement.value;
    
    if (!userMessage.trim()) return; // Jangan kirim pesan kosong

    // Tampilkan pesan pengguna di antarmuka
    appendMessage('user', userMessage);
    userInputElement.value = ''; // Kosongkan input

    const options = {
        method: 'POST',
        headers: {
            'Authorization': CHATBASE_TOKEN, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "chatbotId": CHATBOT_ID,
            // Mengirim pesan terbaru dari pengguna
            "messages": [{"role": "user", "content": userMessage}], 
            // Anda dapat menggunakan ID unik untuk conversationId, contactId, dll.
            "conversationId": "conv_" + Date.now(),
            "contactId": "user_web_demo",
            "model": "gpt-4o-mini",
            "temperature": 0.7,
            "stream": false
        })
    };

    try {
        // Panggil API
        const response = await fetch(API_URL, options);
        const data = await response.json();

        // Ambil respons AI (biasanya dari pesan terakhir dalam array)
        const aiResponse = data.messages[data.messages.length - 1].content;
        
        // Tampilkan respons AI di antarmuka
        appendMessage('assistant', aiResponse);

    } catch (error) {
        console.error('Terjadi kesalahan saat memanggil API Chatbase:', error);
        appendMessage('system', 'Maaf, terjadi kesalahan saat menghubungi AI.');
    }
}

// Fungsi pembantu untuk menampilkan pesan
function appendMessage(role, content) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role); // Gunakan kelas 'user' atau 'assistant' untuk styling
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    // Gulir ke bawah agar pesan terbaru terlihat
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Tambahkan event listener saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('send-button').addEventListener('click', sendMessageToAI);
    // Opsional: Kirim pesan saat tombol Enter ditekan
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageToAI();
        }
    });
});