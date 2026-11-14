import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { phone, pass, otp, type } = req.body;

        if (type === 'login') {
            if (!phone || !pass) {
                return res.status(400).json({ error: 'Phone and password are required' });
            }
            
            return res.status(200).json({ 
                success: true, 
                message: 'Login credentials received, please verify OTP' 
            });
        } 
        
        else if (type === 'send_otp') {
            return res.status(200).json({ 
                success: true, 
                message: 'OTP sent successfully' 
            });
        } 
        
        else if (type === 'verify_otp') {
            if (!otp) {
                return res.status(400).json({ error: 'OTP is required' });
            }

            return res.status(200).json({ 
                success: true, 
                message: 'OTP verified successfully' 
            });
        }

        return res.status(400).json({ error: 'Invalid request type' });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
