import fs from 'fs/promises';
import path from 'path';
import sendgrid from '@sendgrid/mail';
import QRCode from 'qrcode';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'info@etkinlikbilgisayar.com';
const BCC_EMAIL = 'info@etkinlikbilgisayar.com';

if (SENDGRID_API_KEY) {
  sendgrid.setApiKey(SENDGRID_API_KEY);
}

const imageAttachments = async () => {
  const assets = [
    { filename: 'Email-logo-top.jpg', type: 'image/jpeg', cid: 'logo' },
    { filename: 'Email-body-stars.jpg', type: 'image/jpeg', cid: 'bodyStars' },
    { filename: '425217-HIB-Animation-Email.gif', type: 'image/gif', cid: 'heroGif' }
  ];

  return Promise.all(
    assets.map(async ({ filename, type, cid }) => {
      const filePath = path.resolve(process.cwd(), 'public', 'email', filename);
      const content = await fs.readFile(filePath);
      return {
        content: content.toString('base64'),
        filename,
        type,
        disposition: 'inline',
        content_id: cid
      };
    })
  );
};

const qrAttachment = async (payload) => {
  const qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
    type: 'image/png',
    margin: 1,
    width: 280,
  });
  const base64 = qrDataUrl.split(',')[1];
  return {
    content: base64,
    filename: 'registration-qr.png',
    type: 'image/png',
    disposition: 'inline',
    content_id: 'qrCode',
  };
};

const sanitize = (value) => String(value || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const createHtml = ({ ad_soyad, email, telefon, sirket_unvan, katilim_nedeni }) => `
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Etkinlik Kaydınız Alındı</title>
  </head>
  <body style="margin:0;padding:0;background:#070b12;color:#f8fafc;font-family:Inter,system-ui,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;background:#070b12;padding:24px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#0f172a;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35);">
            <tr>
              <td style="padding:32px 24px;background:#020617;text-align:center;">
                <img src="cid:logo" alt="Etkinlik Bilgisayar" width="240" style="display:block;margin:0 auto;max-width:240px;height:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:0;">
                <img src="cid:heroGif" alt="Etkinlik animasyonu" width="100%" style="display:block;max-width:100%;height:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 24px;color:#f8fafc;">
                <h1 style="margin:0 0 16px;font-size:28px;line-height:1.1;color:#ffffff;">Kayıt Talebiniz Alındı</h1>
                <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#cbd5e1;">Merhaba <strong>${sanitize(ad_soyad)}</strong>,</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;color:#cbd5e1;">Kurumsal Liderlik Zirvesi için kayıt bilgileriniz başarıyla alındı. Aşağıda gönderdiğiniz bilgileri bulabilirsiniz.</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#111827;border-radius:18px;padding:20px;">
                  <tr><td style="padding:8px 0;color:#94a3b8;font-size:14px;">Ad Soyad</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${sanitize(ad_soyad)}</td></tr>
                  <tr><td style="padding:8px 0;color:#94a3b8;font-size:14px;">E-posta</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${sanitize(email)}</td></tr>
                  <tr><td style="padding:8px 0;color:#94a3b8;font-size:14px;">Telefon</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${sanitize(telefon)}</td></tr>
                  <tr><td style="padding:8px 0;color:#94a3b8;font-size:14px;">Şirket / Ünvan</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${sanitize(sirket_unvan)}</td></tr>
                  <tr><td style="padding:8px 0;color:#94a3b8;font-size:14px;">Katılım Nedeni</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${sanitize(katilim_nedeni)}</td></tr>
                </table>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;color:#cbd5e1;">Bilgileriniz etkinlik ekibimiz tarafından incelenecek ve kısa süre içinde size dönüş yapılacaktır. Bu e-posta'nın bir kopyası ayrıca bilgi amaçlı olarak info@etkinlikbilgisayar.com adresine gönderilmiştir.</p>
                <p style="margin:0;font-size:16px;line-height:1.75;color:#cbd5e1;">Sorularınız için lütfen bu e-postaya cevap verin veya bizimle iletişime geçin.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;color:#f8fafc;">
                <div style="background:#111827;border-radius:22px;padding:20px;text-align:center;">
                  <p style="margin:0 0 14px;font-size:16px;color:#94a3b8;">Kişiye özel QR kodunuzu aşağıda bulabilirsiniz:</p>
                  <img src="cid:qrCode" alt="Kişiye özel QR kod" width="220" style="display:block;margin:0 auto;max-width:100%;height:auto;border-radius:18px;background:#ffffff;padding:10px;" />
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;color:#cbd5e1;font-size:14px;line-height:1.75;">
                <img src="cid:bodyStars" alt="Etkinlik yıldızları" width="100%" style="display:block;max-width:100%;height:auto;border-radius:16px;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;background:#020617;color:#94a3b8;font-size:13px;text-align:center;">
                Etkinlik Bilgisayar | Kurumsal Liderlik Zirvesi 2024
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ error: 'SendGrid API key is not configured' });
  }

  const { ad_soyad, email, telefon, sirket_unvan, katilim_nedeni, kvkk_onay } = req.body || {};

  if (!ad_soyad || !email || !telefon || !sirket_unvan || !katilim_nedeni) {
    return res.status(400).json({ error: 'Eksik kayıt bilgileri' });
  }

  try {
    const attachments = await imageAttachments();
    const message = {
      to: email,
      bcc: BCC_EMAIL,
      from: FROM_EMAIL,
      subject: 'Kurumsal Liderlik Zirvesi 2024 kaydınız alındı',
      html: createHtml({ ad_soyad, email, telefon, sirket_unvan, katilim_nedeni }),
      text: `Merhaba ${sanitize(ad_soyad)},\n\nKaydınız alındı.\n\nE-posta: ${sanitize(email)}\nTelefon: ${sanitize(telefon)}\nŞirket/Ünvan: ${sanitize(sirket_unvan)}\nKatılım Nedeni: ${sanitize(katilim_nedeni)}\n\ninfo@etkinlikbilgisayar.com adresine ayrıca bir kopya gönderildi.`,
      attachments,
      replyTo: FROM_EMAIL,
    };

    await sendgrid.send(message);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({ error: 'E-posta gönderimi sırasında bir hata oluştu.' });
  }
}
