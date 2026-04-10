import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Shield, Lightbulb, Network, ArrowDown, Check } from 'lucide-react';
import { AnimatedText } from '@/components/AnimatedText.jsx';
import { Geometric3DShapes } from '@/components/Geometric3DShapes.jsx';
import { GlassmorphismCard } from '@/components/GlassmorphismCards.jsx';
import { TimelineItem } from '@/components/TimelineItem.jsx';
import { ParticleBackground } from '@/components/ParticleBackground.jsx';
import { FloatingInput, FloatingTextarea, Custom3DCheckbox, SubmitButton } from '@/components/FormComponents.jsx';
import { ConfettiAnimation } from '@/components/ConfettiAnimation.jsx';
import { Easing } from '@/lib/animationConfig.js';
import pb, { isPocketbaseEnabled } from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

export default function EventRegistrationPage() {
  const [formData, setFormData] = useState({
    ad_soyad: '', email: '', telefon: '', sirket_unvan: '', katilim_nedeni: '', kvkk_onay: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const program = [
    { time: '09:00', title: 'Kayıt ve Karşılama', description: 'Güne özel demlenmiş kahveler eşliğinde başlayın.' },
    { time: '09:30', title: 'Açılış Konuşması', description: 'Geleceğin liderlik vizyonu üzerine ufuk açıcı bir başlangıç.' },
    { time: '10:00', title: 'Panel Tartışması: Dijital Dönüşüm', description: 'Sektör liderlerinden teknoloji ve adaptasyon stratejileri.' },
    { time: '11:15', title: 'Stratejik Sunumlar', description: 'Veri odaklı karar alma mekanizmaları.' },
    { time: '12:30', title: 'Öğle Yemeği Arası', description: 'Hilton şeflerinin hazırladığı özel menü.' },
    { time: '13:30', title: 'Ağ Kurma Oturumu', description: 'Yönetici seviyesinde B2B networking fırsatları.' },
    { time: '14:30', title: 'Kapanış ve Değerlendirme', description: 'Günün özetleri ve gelecek adımlar.' }
  ];

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.kvkk_onay) {
      toast.error('Lütfen KVKK metnini onaylayınız.', { position: 'bottom-center' });
      return;
    }

    setIsSubmitting(true);
    let pocketbaseSaved = false;

    try {
      if (isPocketbaseEnabled && pb) {
        try {
          await pb.collection('event_registrations').create(formData, { $autoCancel: false });
          pocketbaseSaved = true;
        } catch (createError) {
          console.warn('PocketBase kayıt hatası:', createError);
        }
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'E-posta gönderimi sırasında bir hata oluştu.');
      }

      setFormSuccess(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setFormData({ ad_soyad: '', email: '', telefon: '', sirket_unvan: '', katilim_nedeni: '', kvkk_onay: false });

      if (isPocketbaseEnabled && !pocketbaseSaved) {
        toast.success('Onay e-postası gönderildi. Kayıt veritabanına bağlanılamadı, lütfen sunucu ayarlarını kontrol edin.', { position: 'bottom-center' });
      } else {
        toast.success('Kayıt başarılı, onay e-postanız gönderildi.', { position: 'bottom-center' });
      }
    } catch (error) {
      console.error(error);
      const message = error?.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
      toast.error(message, { position: 'bottom-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background min-h-screen font-sans overflow-hidden">
      <ConfettiAnimation active={showConfetti} />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-primary via-[#0f2130] to-[#050b10] text-white overflow-hidden perspective-[1000px]"
      >
        <Geometric3DShapes />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md text-accent text-sm font-medium uppercase tracking-wider"
          >
            Özel Davet
          </motion.div>
          
          <AnimatedText 
            text="Kurumsal Liderlik Zirvesi 2024" 
            type="words"
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 justify-center"
            delay={0.2}
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto mb-12"
          >
            İşletme yöneticileri ve karar vericiler için geleceği şekillendiren stratejiler.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: Easing.premium }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          >
            {[
              { icon: Calendar, text: "15 Kasım 2024" },
              { icon: MapPin, text: "Hilton Istanbul Bosphorus" },
              { icon: Clock, text: "09:00 - 17:00" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass-dark px-6 py-3 rounded-xl shadow-lg">
                <item.icon className="w-5 h-5 text-accent" />
                <span className="font-medium tracking-wide">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.button
            onClick={scrollToForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-accent text-primary-foreground px-10 py-5 rounded-xl text-lg font-bold uppercase tracking-wider shadow-xl preserve-3d"
          >
            Hemen Başvur
          </motion.button>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
            >
              Etkinlik Hakkında
            </motion.h2>
            <AnimatedText 
              text="Bu özel etkinlikte, sektörün önde gelen liderlerinden stratejik görüşler alacaksınız. Ağ kurma fırsatı, yenilikçi çözümler ve geleceğin iş trendleri hakkında bilgi edineceksiniz."
              type="words"
              className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed justify-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassmorphismCard icon={Shield} title="Güvenli Gelecek" description="Risk yönetimi ve sürdürülebilir büyüme stratejileri üzerine uzman görüşleri." delay={0.1} />
            <GlassmorphismCard icon={Lightbulb} title="İnovasyon" description="Dijital çağda rekabet avantajı yaratacak yenilikçi iş modelleri." delay={0.2} />
            <GlassmorphismCard icon={Network} title="Ağ Kurma" description="Sektörün elit yöneticileriyle özel tanışma ve işbirliği fırsatları." delay={0.3} />
            <GlassmorphismCard icon={Users} title="Özel Katılım" description="Sadece C-Level ve karar vericilere açık, sınırlı kontenjanlı deneyim." delay={0.4} />
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="py-24 bg-primary relative overflow-hidden text-white">
        <ParticleBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Etkinlik Programı</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Center Line connecting timeline items */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-accent/50 via-accent to-accent/50"
            />
            
            <div className="pl-8 md:pl-0 space-y-12 md:space-y-0">
              {program.map((item, index) => (
                <TimelineItem 
                  key={index}
                  time={item.time}
                  title={item.title}
                  description={item.description}
                  isLeft={index % 2 !== 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="registration-form" className="py-24 bg-muted relative">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark !bg-white/80 p-8 md:p-12 rounded-3xl shadow-2xl border-gray-200"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Başvurunuzu Yapın</h2>
              <p className="text-muted-foreground">Kontenjan sınırlıdır, başvurunuz değerlendirildikten sonra onaylanacaktır.</p>
            </div>

            {formSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Başvurunuz Alındı</h3>
                <p className="text-muted-foreground">En kısa sürede sizinle iletişime geçeceğiz.</p>
                <button 
                  onClick={() => setFormSuccess(false)}
                  className="mt-8 text-accent font-medium hover:underline"
                >
                  Yeni bir başvuru yap
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FloatingInput id="ad_soyad" label="Ad Soyad *" value={formData.ad_soyad} onChange={handleInputChange} required />
                  <FloatingInput id="email" type="email" label="E-posta *" value={formData.email} onChange={handleInputChange} required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FloatingInput id="telefon" type="tel" label="Telefon *" value={formData.telefon} onChange={handleInputChange} required />
                  <FloatingInput id="sirket_unvan" label="Şirket / Ünvan *" value={formData.sirket_unvan} onChange={handleInputChange} required />
                </div>

                <FloatingTextarea id="katilim_nedeni" label="Neden katılmak istiyorsunuz? *" value={formData.katilim_nedeni} onChange={handleInputChange} required />
                
                <Custom3DCheckbox 
                  id="kvkk_onay" 
                  label="Kişisel verilerimin işlenmesini kabul ediyorum *" 
                  checked={formData.kvkk_onay} 
                  onChange={handleInputChange} 
                />

                <SubmitButton isSubmitting={isSubmitting}>
                  Başvuruyu Gönder
                </SubmitButton>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-accent tracking-wider">
              KURUMSAL ETKİNLİKLER
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-white/70">
              <span className="hover:text-accent transition-colors cursor-pointer">events@hilton.com</span>
              <span className="hidden sm:block text-accent/50">•</span>
              <span className="hover:text-accent transition-colors cursor-pointer">+90 212 XXX XXXX</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <p>© 2024 Hilton. Tüm hakları saklıdır.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Gizlilik Politikası</span>
              <span className="hover:text-white cursor-pointer transition-colors">Kullanım Şartları</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}