'use client'

import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { useLang } from './LanguageProvider'

type BoldItem = { bold: string; text: string }
type SectionItem = string | BoldItem

type Section = {
  heading: string
  body?: string
  intro?: string
  items?: SectionItem[]
  outro?: string
  isContact?: boolean
}

type Content = {
  legal: string
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
  backLink: string
}

const CONTENT: Record<'en' | 'ru' | 'uz', Content> = {
  en: {
    legal: 'Legal',
    title: 'Privacy Policy',
    subtitle: 'This policy explains what information we collect, how we use it, and the choices you have regarding your data.',
    lastUpdated: 'Last updated: July 2026',
    backLink: 'Back to homepage',
    sections: [
      {
        heading: '1. Introduction',
        body: 'Ctrl Code ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at ctrlcode.uz or contact us about our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.',
      },
      {
        heading: '2. Information We Collect',
        intro: 'We may collect the following types of personal information when you interact with us:',
        items: [
          { bold: 'Contact details', text: ' — your name, email address, and phone number submitted via our contact or enquiry forms.' },
          { bold: 'Project information', text: ' — details about your business, project scope, budget range, and timeline that you share with us voluntarily.' },
          { bold: 'Technical data', text: ' — IP address, browser type, device identifiers, and pages visited, collected automatically when you browse our site.' },
          { bold: 'Communications', text: ' — the content of emails or messages you send to us.' },
        ],
        outro: 'We do not knowingly collect information from children under the age of 16. If you believe a child has provided us with personal data, please contact us so we can delete it.',
      },
      {
        heading: '3. How We Use Your Information',
        intro: 'The information we collect is used to:',
        items: [
          'Respond to your enquiries, proposals, and consultation requests.',
          'Deliver, manage, and improve the services we provide to you.',
          'Send project updates, invoices, and support communications.',
          'Send our newsletter if you have subscribed (you may unsubscribe at any time).',
          'Analyse website usage to improve performance, content, and user experience.',
          'Comply with applicable legal obligations.',
        ],
        outro: 'We will never sell your personal data to third parties or use it for purposes incompatible with those stated above.',
      },
      {
        heading: '4. Cookies and Analytics',
        intro: 'Our website uses the following types of cookies:',
        items: [
          { bold: 'Necessary cookies', text: " — required for the site to function, such as remembering your language and theme preference. These cannot be disabled." },
          { bold: 'Analytics cookies', text: " — we use Google Analytics to understand how visitors interact with the site. Data is aggregated and anonymised where possible. You may opt out via your browser settings or Google's opt-out tools." },
        ],
        outro: 'You can control cookies through your browser preferences. Disabling certain cookies may affect the functionality of the site.',
      },
      {
        heading: '5. Third-Party Services',
        intro: 'We rely on trusted third-party providers to operate our website and deliver our services. These may include:',
        items: [
          { bold: 'Hosting providers', text: ' — our infrastructure is hosted on cloud platforms that may process data on our behalf under strict data processing agreements.' },
          { bold: 'Analytics', text: ' — Google Analytics (Alphabet Inc.) processes anonymised usage data under their own privacy policy.' },
          { bold: 'Email services', text: ' — we may use transactional email providers to deliver notifications and newsletters.' },
        ],
        outro: 'All third-party providers are selected for compliance with applicable data protection laws and are contractually bound to handle your data securely.',
      },
      {
        heading: '6. Data Security',
        body: 'We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission (TLS), access controls, and regular security reviews. While we take every reasonable precaution, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.',
      },
      {
        heading: '7. Your Rights',
        intro: 'Under the General Data Protection Regulation (GDPR) and applicable local laws, you have the following rights regarding your personal data:',
        items: [
          { bold: 'Right of access', text: ' — request a copy of the personal data we hold about you.' },
          { bold: 'Right to rectification', text: ' — ask us to correct inaccurate or incomplete data.' },
          { bold: 'Right to erasure', text: ' — request that we delete your personal data where there is no lawful basis for retaining it.' },
          { bold: 'Right to data portability', text: ' — receive your data in a structured, machine-readable format.' },
          { bold: 'Right to restrict processing', text: ' — ask us to pause the processing of your data in certain circumstances.' },
          { bold: 'Right to object', text: ' — object to the processing of your data for direct marketing or where we rely on legitimate interests.' },
        ],
        outro: 'To exercise any of these rights, please contact us at the address below. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.',
      },
      {
        heading: '8. Contact Information',
        intro: 'If you have any questions, requests, or concerns about this Privacy Policy or the way we handle your data, please contact us:',
        isContact: true,
      },
      {
        heading: '9. Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes acceptance of the revised policy.',
      },
    ],
  },

  ru: {
    legal: 'Правовая информация',
    title: 'Политика конфиденциальности',
    subtitle: 'В этой политике объясняется, какую информацию мы собираем, как мы её используем и какие у вас есть возможности в отношении ваших данных.',
    lastUpdated: 'Последнее обновление: июль 2026 г.',
    backLink: 'На главную',
    sections: [
      {
        heading: '1. Введение',
        body: 'Ctrl Code («мы», «нас» или «наш») обязуется защищать вашу конфиденциальность. Данная Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при посещении нашего сайта ctrlcode.uz или при обращении к нам по вопросам наших услуг. Пожалуйста, внимательно ознакомьтесь с этой политикой. Если вы не согласны с её условиями, прекратите использование сайта.',
      },
      {
        heading: '2. Информация, которую мы собираем',
        intro: 'Мы можем собирать следующие типы персональных данных при вашем взаимодействии с нами:',
        items: [
          { bold: 'Контактные данные', text: ' — ваше имя, адрес электронной почты и номер телефона, переданные через наши контактные формы.' },
          { bold: 'Информация о проекте', text: ' — сведения о вашем бизнесе, объёме проекта, бюджете и сроках, которые вы предоставляете добровольно.' },
          { bold: 'Технические данные', text: ' — IP-адрес, тип браузера, идентификаторы устройств и просмотренные страницы, собираемые автоматически при посещении сайта.' },
          { bold: 'Коммуникации', text: ' — содержимое писем и сообщений, которые вы отправляете нам.' },
        ],
        outro: 'Мы намеренно не собираем данные детей до 16 лет. Если вы считаете, что ребёнок предоставил нам свои персональные данные, свяжитесь с нами для их удаления.',
      },
      {
        heading: '3. Как мы используем вашу информацию',
        intro: 'Собранная нами информация используется для:',
        items: [
          'Ответов на ваши запросы, предложения и заявки на консультацию.',
          'Предоставления, управления и улучшения услуг, которые мы оказываем вам.',
          'Отправки обновлений по проекту, счетов и коммуникаций по поддержке.',
          'Отправки нашей рассылки, если вы подписались (вы можете отписаться в любое время).',
          'Анализа использования сайта для улучшения производительности, контента и пользовательского опыта.',
          'Соблюдения применимых правовых обязательств.',
        ],
        outro: 'Мы никогда не продаём ваши персональные данные третьим сторонам и не используем их в целях, несовместимых с вышеуказанными.',
      },
      {
        heading: '4. Файлы cookie и аналитика',
        intro: 'Наш сайт использует следующие типы файлов cookie:',
        items: [
          { bold: 'Необходимые файлы cookie', text: ' — требуются для работы сайта, например для запоминания языка и темы. Их нельзя отключить.' },
          { bold: 'Аналитические файлы cookie', text: ' — мы используем Google Analytics для понимания взаимодействия посетителей с сайтом. Данные агрегируются и анонимизируются по возможности. Вы можете отказаться через настройки браузера или инструменты отказа Google.' },
        ],
        outro: 'Вы можете управлять файлами cookie через настройки браузера. Отключение некоторых файлов cookie может повлиять на функциональность сайта.',
      },
      {
        heading: '5. Сторонние сервисы',
        intro: 'Для работы нашего сайта и предоставления услуг мы привлекаем доверенных сторонних поставщиков. К ним могут относиться:',
        items: [
          { bold: 'Хостинг-провайдеры', text: ' — наша инфраструктура размещена на облачных платформах, которые могут обрабатывать данные от нашего имени в соответствии со строгими соглашениями об обработке данных.' },
          { bold: 'Аналитика', text: ' — Google Analytics (Alphabet Inc.) обрабатывает анонимизированные данные об использовании в соответствии со своей политикой конфиденциальности.' },
          { bold: 'Сервисы электронной почты', text: ' — мы можем использовать поставщиков транзакционной электронной почты для доставки уведомлений и рассылок.' },
        ],
        outro: 'Все сторонние поставщики отбираются с учётом соответствия применимым законам о защите данных и обязуются по договору обращаться с вашими данными безопасным образом.',
      },
      {
        heading: '6. Безопасность данных',
        body: 'Мы применяем отраслевые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. В их числе — шифрование передачи данных (TLS), контроль доступа и регулярные проверки безопасности. Несмотря на все разумные меры предосторожности, ни один метод электронного хранения или передачи данных не является на 100% безопасным, и мы не можем гарантировать абсолютную защиту.',
      },
      {
        heading: '7. Ваши права',
        intro: 'В соответствии с Общим регламентом о защите данных (GDPR) и применимым местным законодательством вы имеете следующие права в отношении своих персональных данных:',
        items: [
          { bold: 'Право на доступ', text: ' — запросить копию персональных данных, которые мы о вас храним.' },
          { bold: 'Право на исправление', text: ' — попросить нас исправить неточные или неполные данные.' },
          { bold: 'Право на удаление', text: ' — потребовать удаления ваших персональных данных, если нет законных оснований для их хранения.' },
          { bold: 'Право на переносимость данных', text: ' — получить свои данные в структурированном, машиночитаемом формате.' },
          { bold: 'Право на ограничение обработки', text: ' — попросить нас приостановить обработку ваших данных в определённых обстоятельствах.' },
          { bold: 'Право на возражение', text: ' — возразить против обработки ваших данных для прямого маркетинга или когда мы опираемся на законные интересы.' },
        ],
        outro: 'Для осуществления любого из этих прав обратитесь к нам по указанному ниже адресу. Мы ответим в течение 30 дней. Вы также вправе подать жалобу в местный орган по защите данных.',
      },
      {
        heading: '8. Контактная информация',
        intro: 'Если у вас есть вопросы, запросы или опасения относительно настоящей Политики конфиденциальности или порядка обработки ваших данных, свяжитесь с нами:',
        isContact: true,
      },
      {
        heading: '9. Изменения в настоящей политике',
        body: 'Мы можем периодически обновлять данную Политику конфиденциальности, чтобы отразить изменения в наших практиках, технологиях или правовых требованиях. В таком случае мы изменим дату «Последнее обновление» вверху этой страницы. Мы рекомендуем периодически просматривать данную политику. Продолжение использования нашего сайта после любых изменений означает принятие обновлённой политики.',
      },
    ],
  },

  uz: {
    legal: "Huquqiy ma'lumot",
    title: 'Maxfiylik siyosati',
    subtitle: "Ushbu siyosat biz qanday ma'lumot to'plashimiz, undan qanday foydalanishimiz va ma'lumotlaringiz bo'yicha qanday imkoniyatlarga ega ekanligingizni tushuntiradi.",
    lastUpdated: 'Oxirgi yangilanish: 2026 yil iyul',
    backLink: 'Bosh sahifaga',
    sections: [
      {
        heading: '1. Kirish',
        body: "Ctrl Code («biz» yoki «bizning») sizning maxfiyligingizni himoya qilishga majburdir. Ushbu Maxfiylik siyosati ctrlcode.uz saytimizga tashrif buyurganingizda yoki xizmatlarimiz haqida murojaat qilganingizda ma'lumotlaringizni qanday to'plash, ishlatish, oshkor qilish va himoya qilishimizni tushuntiradi. Iltimos, ushbu siyosatni diqqat bilan o'qing. Agar siz uning shartlari bilan rozi bo'lmasangiz, saytdan foydalanishni to'xtating.",
      },
      {
        heading: "2. Biz to'playdigan ma'lumotlar",
        intro: "Biz siz bilan muloqot qilganingizda quyidagi turdagi shaxsiy ma'lumotlarni to'plashimiz mumkin:",
        items: [
          { bold: "Aloqa ma'lumotlari", text: " — aloqa yoki so'rov formalarimiz orqali taqdim etilgan ismingiz, elektron pochta manzilingiz va telefon raqamingiz." },
          { bold: "Loyiha haqida ma'lumot", text: " — ixtiyoriy ravishda baham ko'radigan biznesingiz, loyiha hajmi, byudjet diapazoni va muddatlar haqidagi ma'lumotlar." },
          { bold: "Texnik ma'lumotlar", text: " — saytimizda ko'rib chiqayotganingizda avtomatik ravishda to'planadigan IP-manzil, brauzer turi, qurilma identifikatorlari va tashrif buyurilgan sahifalar." },
          { bold: 'Muloqotlar', text: " — bizga yuboriladigan elektron pochta yoki xabarlar mazmuni." },
        ],
        outro: "Biz 16 yoshgacha bo'lgan bolalardan ma'lumot to'plamaymiz. Agar bola bizga shaxsiy ma'lumot bergan deb hisoblasangiz, uni o'chirish uchun biz bilan bog'laning.",
      },
      {
        heading: "3. Ma'lumotlaringizdan foydalanish tartibi",
        intro: "Biz to'playdigan ma'lumotlar quyidagi maqsadlarda ishlatiladi:",
        items: [
          "So'rovlaringiz, takliflaringiz va konsultatsiya so'rovlariga javob berish.",
          "Sizga ko'rsatadigan xizmatlarni taqdim etish, boshqarish va yaxshilash.",
          "Loyiha yangilanishlari, hisob-fakturalar va qo'llab-quvvatlash xabarlarini yuborish.",
          "Obuna bo'lgan bo'lsangiz, yangiliklar xabarnomasini yuborish (istalgan vaqtda obunadan chiqishingiz mumkin).",
          "Sayt foydalanishini tahlil qilish va ishlash, kontent va foydalanuvchi tajribasini yaxshilash.",
          "Amaldagi huquqiy majburiyatlarni bajarish.",
        ],
        outro: "Biz hech qachon shaxsiy ma'lumotlaringizni uchinchi tomonlarga sotmaymiz yoki yuqorida aytilganlarga mos kelmaydigan maqsadlarda ishlatmaymiz.",
      },
      {
        heading: '4. Cookie-fayllar va tahlil',
        intro: "Saytimizda quyidagi cookie-fayllar turlari ishlatiladi:",
        items: [
          { bold: 'Zaruriy cookie-fayllar', text: " — til va mavzu afzalliklaringizni eslab qolish kabi saytning ishlashi uchun kerak. Ularni o'chirib bo'lmaydi." },
          { bold: 'Tahliliy cookie-fayllar', text: " — biz saytimizga tashrif buyuruvchilarning xatti-harakatlarini tushunish uchun Google Analytics-dan foydalanamiz. Ma'lumotlar imkon qadar aggregatsiya qilinadi va anonim tarzda qayta ishlanadi. Brauzeringiz sozlamalari yoki Google-ning chiqish vositalari orqali voz kechishingiz mumkin." },
        ],
        outro: "Cookie-fayllarni brauzeringiz sozlamalari orqali boshqarishingiz mumkin. Ba'zi cookie-fayllarni o'chirish saytning funksionalligiga ta'sir ko'rsatishi mumkin.",
      },
      {
        heading: '5. Uchinchi tomon xizmatlari',
        intro: "Biz saytimizni boshqarish va xizmatlar ko'rsatish uchun ishonchli uchinchi tomon provayderlariga tayanamiz. Ularga quyidagilar kirishi mumkin:",
        items: [
          { bold: 'Hosting-provayderlar', text: " — bizning infratuzilmamiz qattiq ma'lumotlarni qayta ishlash shartnomalari asosida bizning nomimizda ma'lumotlarni qayta ishlashi mumkin bo'lgan bulutli platformalarda joylashgan." },
          { bold: 'Tahlil', text: " — Google Analytics (Alphabet Inc.) o'zlarining maxfiylik siyosati asosida anonim foydalanish ma'lumotlarini qayta ishlaydi." },
          { bold: 'Elektron pochta xizmatlari', text: " — biz bildirishnomalar va xabarnomasini yuborish uchun tranzaksion elektron pochta provayderlaridan foydalanishimiz mumkin." },
        ],
        outro: "Barcha uchinchi tomon provayderlari amaldagi ma'lumotlarni himoya qilish qonunlariga muvofiqligi nuqtai nazaridan tanlanadi va shartnoma bo'yicha ma'lumotlaringizni xavfsiz boshqarishga majburdir.",
      },
      {
        heading: "6. Ma'lumotlar xavfsizligi",
        body: "Biz shaxsiy ma'lumotlaringizni ruxsatsiz kirish, o'zgartirish, oshkor qilish yoki yo'q qilishdan himoya qilish uchun sanoat standartidagi texnik va tashkiliy choralar qo'llaymiz. Bularga shifrlangan ma'lumot uzatish (TLS), kirish nazorati va muntazam xavfsizlik tekshiruvlari kiradi. Barcha oqilona ehtiyot choralarini ko'rgan holda, elektron saqlash yoki uzatishning hech bir usuli 100% xavfsiz emas va biz mutlaq xavfsizlikni kafolatlay olmaymiz.",
      },
      {
        heading: '7. Sizning huquqlaringiz',
        intro: "Umumiy ma'lumotlarni himoya qilish to'g'risidagi reglament (GDPR) va amaldagi mahalliy qonunlar asosida siz shaxsiy ma'lumotlaringizga nisbatan quyidagi huquqlarga egasiz:",
        items: [
          { bold: 'Kirish huquqi', text: " — biz siz haqingizda saqlaydigan shaxsiy ma'lumotlar nusxasini so'rash." },
          { bold: "To'g'rilash huquqi", text: " — noto'g'ri yoki to'liq bo'lmagan ma'lumotlarni tuzatishimizni so'rash." },
          { bold: "O'chirish huquqi", text: " — saqlash uchun qonuniy asos bo'lmagan taqdirda shaxsiy ma'lumotlaringizni o'chirishni talab qilish." },
          { bold: "Ma'lumotlar ko'chma ekanligiga huquq", text: " — ma'lumotlaringizni tuzilgan, mashina o'qiydigan formatda olish." },
          { bold: "Qayta ishlashni cheklash huquqi", text: " — muayyan holatlarda ma'lumotlaringizni qayta ishlashni to'xtatib turishimizni so'rash." },
          { bold: "E'tiroz bildirish huquqi", text: " — to'g'ridan-to'g'ri marketing uchun yoki qonuniy manfaatlarimizga tayanadigan hollarda ma'lumotlaringizni qayta ishlashga e'tiroz bildirish." },
        ],
        outro: "Ushbu huquqlardan birini amalga oshirish uchun quyidagi manzilda biz bilan bog'laning. Biz 30 kun ichida javob beramiz. Siz, shuningdek, mahalliy ma'lumotlarni himoya qilish organi bilan shikoyat qilish huquqiga egasiz.",
      },
      {
        heading: "8. Aloqa ma'lumotlari",
        intro: "Ushbu Maxfiylik siyosati yoki ma'lumotlaringizni boshqarish tartibi haqida savollaringiz, so'rovlaringiz yoki tashvishlaringiz bo'lsa, biz bilan bog'laning:",
        isContact: true,
      },
      {
        heading: "9. Siyosatdagi o'zgarishlar",
        body: "Biz ushbu Maxfiylik siyosatini vaqti-vaqti bilan amaliyotlarimiz, texnologiyalar yoki huquqiy talablardagi o'zgarishlarni aks ettirish uchun yangilashimiz mumkin. Buni qilganimizda, biz ushbu sahifaning yuqorisidagi «Oxirgi yangilanish» sanasini o'zgartiramiz. Siyosatni vaqti-vaqti bilan ko'rib chiqishingizni tavsiya etamiz. Har qanday o'zgarishlardan keyin saytimizdan foydalanishni davom ettirishingiz yangilangan siyosatni qabul qilishingizni bildiradi.",
      },
    ],
  },
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 'clamp(20px, 2.4vw, 26px)',
  color: 'var(--text-primary)',
  letterSpacing: -0.3,
  marginBottom: 16,
}

const bodyStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  margin: 0,
}

const listStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  margin: 0,
  paddingLeft: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

export default function PrivacyPolicyPage() {
  const { lang } = useLang()
  const c = CONTENT[lang] ?? CONTENT.en

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <section
        style={{
          background: 'var(--section-alt)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'clamp(72px, 10vw, 120px) 0 clamp(48px, 6vw, 72px)',
        }}
      >
        <div className="max-lg:px-6" style={{ maxWidth: 800, margin: '0 auto' }}>
          <span
            className="font-mono"
            style={{
              display: 'block',
              fontSize: 11,
              letterSpacing: 2,
              color: 'var(--text-tertiary)',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            {c.legal}
          </span>
          <h1
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              letterSpacing: 'clamp(-2px, -0.25vw, -1px)',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            {c.title}
          </h1>
          <p className="font-body" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: 580, margin: 0 }}>
            {c.subtitle}
          </p>
          <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 24, marginBottom: 0 }}>
            {c.lastUpdated}
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 7vw, 80px) 0 clamp(64px, 9vw, 96px)' }}>
        <div className="max-lg:px-6" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 56px)' }}>

            {c.sections.map((section, idx) => (
              <React.Fragment key={section.heading}>
                <div>
                  <h2 className="font-display font-semibold" style={sectionHeadingStyle}>
                    {section.heading}
                  </h2>

                  {section.body && (
                    <p className="font-body" style={bodyStyle}>{section.body}</p>
                  )}

                  {section.intro && (
                    <p className="font-body" style={{ ...bodyStyle, marginBottom: 16 }}>{section.intro}</p>
                  )}

                  {section.items && (
                    <ul className="font-body" style={listStyle}>
                      {section.items.map((item, i) =>
                        typeof item === 'string' ? (
                          <li key={i}>{item}</li>
                        ) : (
                          <li key={i}>
                            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.bold}</strong>
                            {item.text}
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {section.outro && (
                    <p className="font-body" style={{ ...bodyStyle, marginTop: 16 }}>{section.outro}</p>
                  )}

                  {section.isContact && (
                    <div
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 12,
                        padding: 'clamp(20px, 3vw, 28px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        marginTop: 16,
                      }}
                    >
                      <p className="font-body" style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>Ctrl Code</p>
                      <p className="font-body" style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>IT Park Uzbekistan Resident</p>
                      <a href="mailto:info@ctrlcode.uz" className="font-body" style={{ fontSize: 14, color: 'var(--kicker)', textDecoration: 'none' }}>
                        info@ctrlcode.uz
                      </a>
                      <a href="tel:+998770007878" className="font-body" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                        +998 77 000 78 78
                      </a>
                    </div>
                  )}
                </div>

                {idx < c.sections.length - 1 && (
                  <div style={{ height: 1, background: 'var(--border-subtle)' }} />
                )}
              </React.Fragment>
            ))}

            <div style={{ paddingTop: 8 }}>
              <Link
                href="/"
                className="font-body"
                style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <span aria-hidden="true" style={{ fontSize: 16 }}>&larr;</span>
                {c.backLink}
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
