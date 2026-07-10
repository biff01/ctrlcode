// Translation dictionary keyed by the English source string.
// English is the source language (keys); only ru + uz mappings are stored.
// t(s) returns translations[lang][s] ?? s, so any missing key falls back to English.

export type Lang = 'en' | 'ru' | 'uz'

export const translations: Record<'ru' | 'uz', Record<string, string>> = {
  ru: {
    // ── NavBar ──
    'Home': 'Главная',
    'Services': 'Услуги',
    'Portfolio': 'Портфолио',
    'Price': 'Цены',
    'Contact': 'Контакты',
    'Login': 'Войти',
    'Sign up': 'Регистрация',

    // ── Hero ──
    'From idea to': 'От идеи до',
    'digital reality.': 'цифровой реальности.',
    'We design and build web platforms, mobile apps, CRM systems and AI products for ambitious companies — fast, reliable and beautifully engineered.':
      'Мы проектируем и создаём веб-платформы, мобильные приложения, CRM-системы и AI-продукты для амбициозных компаний — быстро, надёжно и с безупречной инженерией.',
    'OFFICIAL IT PARK UZBEKISTAN RESIDENT': 'ОФИЦИАЛЬНЫЙ РЕЗИДЕНТ IT PARK UZBEKISTAN',
    'Start a project': 'Начать проект',
    'View our work': 'Наши работы',
    'PROJECTS DELIVERED': 'ПРОЕКТОВ СДАНО',
    'YEARS OF EXPERIENCE': 'ЛЕТ ОПЫТА',
    'LONG-TERM CLIENTS': 'ПОСТОЯННЫХ КЛИЕНТОВ',
    'SUPPORT & CARE': 'ПОДДЕРЖКА И ЗАБОТА',

    // ── Services ──
    'A new species of product tool.': 'Новый вид продуктового инструмента.',
    'Purpose-built for modern teams with AI workflows at its core, Ctrl Code sets a new standard for planning and building products.':
      'Созданный для современных команд с AI-процессами в основе, Ctrl Code задаёт новый стандарт планирования и создания продуктов.',
    'Built for purpose': 'Создан с целью',
    'Ctrl Code is shaped by the practices and principles of world-class product teams — every decision serves the outcome.':
      'Ctrl Code сформирован практиками и принципами продуктовых команд мирового класса — каждое решение работает на результат.',
    'Powered by AI agents': 'На базе AI-агентов',
    'Designed for workflows shared by humans and AI, from planning through execution and post-launch optimisation.':
      'Разработан для процессов, где вместе работают люди и AI — от планирования и реализации до оптимизации после запуска.',
    'Designed for speed': 'Создан для скорости',
    'Reduces noise and restores momentum so your team can ship with clarity, confidence, and relentless focus.':
      'Убирает шум и возвращает темп, чтобы ваша команда выпускала продукт ясно, уверенно и сфокусированно.',

    // ── Work ──
    'SELECTED WORK': 'ИЗБРАННЫЕ РАБОТЫ',
    'Work that speaks for itself.': 'Работы, которые говорят сами за себя.',
    'A collection of products, platforms, and digital systems built with clarity, speed, and precision.':
      'Коллекция продуктов, платформ и цифровых систем, созданных ясно, быстро и точно.',
    'All projects': 'Все проекты',
    'View Live Product': 'Открыть продукт',
    'View case study': 'Открыть кейс',
    'Interactive showcase': 'Интерактивный показ',
    'Desktop view': 'Десктоп',
    'Mobile view': 'Мобильный',
    'Open original': 'Открыть оригинал',
    'Close showcase': 'Закрыть показ',
    'Scroll inside the frame to explore': 'Прокручивайте внутри окна, чтобы изучить',
    'SaaS Platform': 'SaaS-платформа',
    'AI Workflow Platform': 'AI-платформа процессов',
    'Web App': 'Веб-приложение',
    'Logistics Management': 'Управление логистикой',
    'Website Design': 'Дизайн сайта',
    'Real Estate Platform': 'Платформа недвижимости',
    'EdTech': 'EdTech',
    'Education Platform': 'Образовательная платформа',
    'Healthcare': 'Здравоохранение',
    'Healthcare Website': 'Сайт для здравоохранения',
    'Mobile App': 'Мобильное приложение',
    'Mobile Application': 'Мобильное приложение',

    // ── Why ──
    'WHY CTRL CODE': 'ПОЧЕМУ CTRL CODE',
    'Built to be your unfair advantage.': 'Создан, чтобы стать вашим преимуществом.',
    'Proven process': 'Проверенный процесс',
    'A battle-tested delivery cycle — discovery, design, sprints, launch. No chaos, no guessing.':
      'Проверенный цикл работы — исследование, дизайн, спринты, запуск. Без хаоса и догадок.',
    'International quality': 'Международное качество',
    "Standards you'd expect from a top European studio, priced fairly for the region.":
      'Стандарты уровня ведущей европейской студии по честной для региона цене.',
    'Fast execution': 'Быстрое исполнение',
    'First results in weeks, not months. We move at startup speed without cutting corners.':
      'Первые результаты за недели, а не месяцы. Мы работаем со скоростью стартапа, не жертвуя качеством.',
    'Clear communication': 'Прозрачная коммуникация',
    'One dedicated manager, weekly demos, and a roadmap you can actually read and trust.':
      'Один выделенный менеджер, еженедельные демо и понятная дорожная карта, которой можно доверять.',
    '24/7 support': 'Поддержка 24/7',
    'We stay on after launch — monitoring, updates, and real humans on call when it matters.':
      'Мы остаёмся с вами после запуска — мониторинг, обновления и живые люди на связи, когда это важно.',
    'Transparent pricing': 'Прозрачные цены',
    'Fixed scopes and clear estimates upfront. No surprise invoices, ever.':
      'Фиксированный объём и понятные оценки заранее. Никаких неожиданных счетов.',

    // ── Pricing ──
    'My Pricing': 'Мои цены',
    'Standard Plan': 'Стандартный план',
    'Premium Plan': 'Премиум план',
    'Have design ready to build? Or small budget?': 'Готовый дизайн для разработки? Или небольшой бюджет?',
    'Full design & development with priority delivery.': 'Полный дизайн и разработка с приоритетной сдачей.',
    'Dedicated team for complex, long-term projects.': 'Выделенная команда для сложных долгосрочных проектов.',
    'Enterprise': 'Enterprise',
    '/ hour': '/ час',
    'Need your wireframe': 'Нужен ваш вайрфрейм',
    'Design with Figma, Framer': 'Дизайн в Figma, Framer',
    'Implement with Webflow, React, WordPress, Laravel/PHP': 'Реализация на Webflow, React, WordPress, Laravel/PHP',
    'Remote / Online': 'Удалённо / Онлайн',
    'Work in business days, no weekend': 'Работа в будни, без выходных',
    'Support 6 months': 'Поддержка 6 месяцев',
    'Everything in Standard': 'Всё из Стандартного',
    'Custom UI/UX design from scratch': 'Индивидуальный UI/UX-дизайн с нуля',
    'React, Next.js & TypeScript apps': 'Приложения на React, Next.js и TypeScript',
    'CMS & API integrations': 'Интеграции CMS и API',
    'Priority support & faster turnaround': 'Приоритетная поддержка и ускоренные сроки',
    'Support 12 months': 'Поддержка 12 месяцев',
    'Dedicated development team': 'Выделенная команда разработки',
    'Full-stack architecture & planning': 'Full-stack архитектура и планирование',
    'Performance, security & SEO audit': 'Аудит производительности, безопасности и SEO',
    'SLA guarantee & uptime monitoring': 'Гарантия SLA и мониторинг доступности',
    'Ongoing retainer available': 'Доступна абонентская поддержка',
    'Support 24 months': 'Поддержка 24 месяца',
    'Get Started': 'Начать',
    'Contact Us': 'Связаться',
    'Custom Quote': 'Индивидуальный расчёт',
    'Best value · Save up to 40% vs. agency rates': 'Лучшая цена · Экономия до 40% по сравнению с агентством',

    // ── BookACall ──
    "Ctrl Code — we don't just build websites, we craft digital experiences that make brands feel sharper, faster, and more powerful.":
      'Ctrl Code — мы не просто создаём сайты, мы создаём цифровой опыт, который делает бренды острее, быстрее и сильнее.',
    'Design by Wizerdui': 'Дизайн: Wizerdui',

    // ── FinalCTA ──
    'Have an idea?': 'Есть идея?',
    "Let's ship it together.": 'Реализуем её вместе.',
    "Book a free 30-minute consultation — we'll estimate your project within 48 hours.":
      'Запишитесь на бесплатную 30-минутную консультацию — мы оценим ваш проект в течение 48 часов.',
    'Book free consultation': 'Бесплатная консультация',
    'Write on Telegram': 'Написать в Telegram',

    // ── ConsultStrip ──
    'Not sure what you need?': 'Не уверены, что вам нужно?',
    "Book a free 30-minute call — we'll help you scope it and send an estimate within 48 hours.":
      'Запишитесь на бесплатный 30-минутный звонок — мы поможем определить объём и пришлём оценку в течение 48 часов.',

    // ── FAQ ──
    'FAQ': 'FAQ',
    'Questions, answered.': 'Вопросы и ответы.',
    'How do payments work?': 'Как происходит оплата?',
    '50% to start, 50% on delivery. Larger projects are split into milestone payments tied to demos you can actually see.':
      '50% в начале, 50% при сдаче. Крупные проекты разбиваются на поэтапные платежи, привязанные к демо, которые вы можете видеть.',
    'Do you provide support after launch?': 'Предоставляете ли вы поддержку после запуска?',
    'Yes — every plan includes 30 days of free support. Ongoing care plans with monitoring and updates start at $200/mo.':
      'Да — каждый план включает 30 дней бесплатной поддержки. Планы сопровождения с мониторингом и обновлениями от $200/мес.',
    'Can you take over an existing project?': 'Можете ли вы взять существующий проект?',
    'We start with a code and infrastructure audit, then propose an honest fix-or-rebuild plan with estimates for both.':
      'Мы начинаем с аудита кода и инфраструктуры, затем предлагаем честный план «починить или пересобрать» с оценками для обоих вариантов.',
    'How fast can we start?': 'Как быстро мы можем начать?',
    'Discovery call this week; the first sprint usually kicks off within 7–10 days of signing.':
      'Ознакомительный звонок на этой неделе; первый спринт обычно стартует через 7–10 дней после подписания.',
    'Do you sign NDAs and contracts?': 'Подписываете ли вы NDA и договоры?',
    'Always. As an official IT Park Uzbekistan resident we work with formal contracts and e-invoicing.':
      'Всегда. Как официальный резидент IT Park Uzbekistan мы работаем по официальным договорам и с электронными счетами.',

    // ── Footer ──
    'Ready to start building': 'Готовы начать создавать',
    'your next product?': 'ваш следующий продукт?',
    'Contact us': 'Связаться с нами',
    'Newsletter': 'Рассылка',
    "We'd love to share our love for craft with you in our monthly newsletter.":
      'Мы будем рады делиться с вами любовью к ремеслу в нашей ежемесячной рассылке.',
    'Benefits': 'Преимущества',
    'Features': 'Возможности',
    'Platform': 'Платформа',
    'Solution': 'Решение',
    'Overview': 'Обзор',
    'About us': 'О нас',
    'Connectors': 'Коннекторы',
    'Security': 'Безопасность',
    '© 2025 Ctrl Code. All rights reserved.': '© 2025 Ctrl Code. Все права защищены.',

    // ── NewsletterForm ──
    "Thanks — you're subscribed.": 'Спасибо — вы подписаны.',
    'Email address': 'Адрес эл. почты',
    'Subscribe': 'Подписаться',
    'Enter a valid email.': 'Введите корректный email.',

    // ── ServicesHero ──
    'SERVICES': 'УСЛУГИ',
    'What we build.': 'Что мы создаём.',
    'Five disciplines, one team. Every engagement is scoped, designed and engineered end-to-end — with a single point of contact.':
      'Пять направлений, одна команда. Каждый проект оценивается, проектируется и разрабатывается от начала до конца — с единой точкой контакта.',

    // ── ServiceBlocks ──
    'Web Development': 'Веб-разработка',
    'Corporate websites, e-commerce and complex web applications on modern stacks. Fast to load, easy to manage, built to convert.':
      'Корпоративные сайты, e-commerce и сложные веб-приложения на современных стеках. Быстрая загрузка, простое управление, высокая конверсия.',
    'Corporate websites & landing pages': 'Корпоративные сайты и лендинги',
    'E-commerce with local payments': 'E-commerce с локальными платежами',
    'Complex web applications': 'Сложные веб-приложения',
    'Performance & SEO optimization': 'Оптимизация производительности и SEO',
    'Web Platform': 'Веб-платформа',
    'Mobile Apps': 'Мобильные приложения',
    'Native-quality apps for iOS and Android from a single codebase — designed for retention and shipped to both stores.':
      'Приложения нативного качества для iOS и Android из единой кодовой базы — созданы для удержания и опубликованы в обоих магазинах.',
    'Flutter & React Native': 'Flutter и React Native',
    'App Store / Play Market publishing': 'Публикация в App Store / Play Market',
    'Push, analytics & payments': 'Push, аналитика и платежи',
    'Offline-first architecture': 'Offline-first архитектура',
    'CRM & ERP Systems': 'CRM и ERP системы',
    'Custom internal systems that mirror how your business actually works — sales, warehouse, finance and telephony in one place.':
      'Индивидуальные внутренние системы, отражающие реальную работу вашего бизнеса — продажи, склад, финансы и телефония в одном месте.',
    'Sales & lead management': 'Управление продажами и лидами',
    'Warehouse and finance modules': 'Модули склада и финансов',
    'Telephony & Telegram integrations': 'Интеграции телефонии и Telegram',
    'Role-based dashboards': 'Панели по ролям',
    'CRM System': 'CRM-система',
    'AI Solutions': 'AI-решения',
    'Practical AI that removes repetitive work: assistants, document automation and integrations with the models you already trust.':
      'Практичный AI, убирающий рутину: ассистенты, автоматизация документов и интеграции с моделями, которым вы доверяете.',
    'Custom chatbots & assistants': 'Индивидуальные чат-боты и ассистенты',
    'Document & data automation': 'Автоматизация документов и данных',
    'Speech and vision integrations': 'Интеграции распознавания речи и изображений',
    'LLM API integrations': 'Интеграции LLM API',
    'AI Platform': 'AI-платформа',
    'Creative & Branding': 'Креатив и брендинг',
    'Identity, product design and motion that make your company look as good as it works.':
      'Айдентика, продуктовый дизайн и анимация, благодаря которым ваша компания выглядит так же хорошо, как и работает.',
    'Logo & brand identity': 'Логотип и фирменный стиль',
    'UI/UX design systems': 'UI/UX дизайн-системы',
    'Motion & 3D visuals': 'Анимация и 3D-визуалы',
    'Marketing creatives': 'Маркетинговые креативы',
    'Brand Design': 'Дизайн бренда',
    'WEB': 'WEB',
    'MOBILE': 'MOBILE',
    'SYSTEMS': 'SYSTEMS',
    'AI': 'AI',
    'DESIGN': 'DESIGN',

    // ── PricingHero ──
    'PRICING': 'ЦЕНЫ',
    'Invest in what ships.': 'Инвестируйте в результат.',
    'Fixed scopes, milestone payments and a free consultation before any commitment.':
      'Фиксированный объём, поэтапная оплата и бесплатная консультация до любых обязательств.',

    // ── PortfolioHero / PortfolioWork ──
    'Work that defines': 'Работы, определяющие',
    'our craft.': 'наше мастерство.',
    'Every project is a collaboration, every result is a story. Browse 48+ projects across web, mobile, SaaS, and brand design.':
      'Каждый проект — это сотрудничество, каждый результат — история. Более 48 проектов в вебе, мобайле, SaaS и брендинге.',
    'All': 'Все',
    'Web': 'Веб',
    'Mobile': 'Мобайл',
    'SaaS': 'SaaS',
    'E-Com': 'E-Com',
    'Branding': 'Брендинг',
    'No projects in this category yet.': 'В этой категории пока нет проектов.',
    'Brand Identity System': 'Система фирменного стиля',
    'E-Commerce': 'E-Commerce',

    // ── StatsStrip ──
    'Projects Delivered': 'Проектов сдано',
    'Revenue Generated': 'Сгенерировано выручки',
    'Client Retention': 'Удержание клиентов',
    'Years of Experience': 'Лет опыта',

    // ── FeaturedCaseStudy ──
    'FEATURED WORK': 'ИЗБРАННАЯ РАБОТА',
    'Case Study': 'Кейс',
    'From idea to $1M ARR': 'От идеи до $1M ARR',
    'in 8 months.': 'за 8 месяцев.',
    "We built NuroMedical's entire platform from scratch — analytics, user management, billing, and AI-powered clinical insights. The client went from 0 to $1M ARR within their first year of launch.":
      'Мы создали всю платформу NuroMedical с нуля — аналитику, управление пользователями, биллинг и клинические инсайты на основе AI. Клиент вырос с 0 до $1M ARR за первый год после запуска.',
    'Read Case Study': 'Читать кейс',

    // ── WorkShowcase ──
    'Ride status fails to update': 'Статус поездки не обновляется',
    'App shows incorrect pickup location': 'Приложение показывает неверное место подачи',
    'Improve explanations for tax feature': 'Улучшить пояснения для налоговой функции',
    'New Issue': 'Новая задача',
    'Create Issue': 'Создать задачу',

    // ── ContactHero ──
    'CONTACT': 'КОНТАКТЫ',
    "Let's talk.": 'Давайте поговорим.',
    'Tell us about your project — we reply within 24 hours and estimate within 48.':
      'Расскажите о вашем проекте — мы отвечаем в течение 24 часов и оцениваем в течение 48.',

    // ── ContactForm ──
    'EMAIL': 'EMAIL',
    'PHONE': 'ТЕЛЕФОН',
    'OFFICE': 'ОФИС',
    'HOURS': 'ЧАСЫ РАБОТЫ',
    'Tashkent, Shahribod 50': 'Ташкент, Шахрибод 50',
    'Mon–Sat, 10:00 – 19:00': 'Пн–Сб, 10:00 – 19:00',
    'Web development': 'Веб-разработка',
    'Mobile app': 'Мобильное приложение',
    'CRM system': 'CRM-система',
    'AI product': 'AI-продукт',
    'Branding & design': 'Брендинг и дизайн',
    'Other': 'Другое',
    'Request received.': 'Заявка получена.',
    'Thanks,': 'Спасибо,',
    "— we'll reply within 24 hours.": '— мы ответим в течение 24 часов.',
    'there': 'вам',
    'Send another request': 'Отправить ещё заявку',
    'Start your project': 'Начните ваш проект',
    'YOUR NAME': 'ВАШЕ ИМЯ',
    'PHONE OR TELEGRAM': 'ТЕЛЕФОН ИЛИ TELEGRAM',
    'SERVICE': 'УСЛУГА',
    'BUDGET': 'БЮДЖЕТ',
    'ABOUT YOUR PROJECT': 'О ВАШЕМ ПРОЕКТЕ',
    'A few sentences about your idea, timeline and goals…': 'Несколько предложений о вашей идее, сроках и целях…',
    'Send request': 'Отправить заявку',
    'Free consultation · NDA on request · Reply within 24 hours':
      'Бесплатная консультация · NDA по запросу · Ответ в течение 24 часов',
    'Please tell us your name.': 'Пожалуйста, укажите ваше имя.',
    'A phone or Telegram is required.': 'Требуется телефон или Telegram.',
    'Tell us a little about your project.': 'Расскажите немного о вашем проекте.',

    // ── ShopClient ──
    'STORE': 'МАГАЗИН',
    'Templates & services.': 'Шаблоны и услуги.',
    'Ready-made kits and fixed-scope services you can buy today.':
      'Готовые наборы и услуги с фиксированным объёмом, которые можно купить сегодня.',
    'item': 'товар',
    'items': 'товаров',
    'Checkout': 'Оформить',
    'TEMPLATE': 'ШАБЛОН',
    'Landing Page Kit': 'Набор для лендинга',
    'Production-ready Next.js landing template with animations.': 'Готовый к продакшену шаблон лендинга на Next.js с анимациями.',
    'Admin Dashboard': 'Админ-панель',
    'React + TypeScript dashboard with charts and auth flows.': 'Дашборд на React + TypeScript с графиками и авторизацией.',
    'Design System': 'Дизайн-система',
    'Figma + code tokens, components and documentation.': 'Figma + код-токены, компоненты и документация.',
    'Code Audit': 'Аудит кода',
    '48-hour review of your codebase with a prioritized report.': '48-часовой разбор вашей кодовой базы с приоритизированным отчётом.',
    'Brand Starter': 'Стартовый бренд-набор',
    'Logo, palette, typography and a one-page brand guide.': 'Логотип, палитра, типографика и одностраничный бренд-гайд.',
    'SEO Boost': 'SEO-ускорение',
    'Technical SEO pass, performance tuning and Core Web Vitals.': 'Технический SEO-проход, оптимизация производительности и Core Web Vitals.',
    'Add': 'Добавить',
    'In cart': 'В корзине',

    // ── AuthForm ──
    'Account created': 'Аккаунт создан',
    'Welcome back': 'С возвращением',
    'Taking you to your dashboard…': 'Переходим в вашу панель…',
    'Create your account': 'Создайте аккаунт',
    'Sign in': 'Войти',
    'Start your project with Ctrl Code.': 'Начните ваш проект с Ctrl Code.',
    'Welcome back — log in to continue.': 'С возвращением — войдите, чтобы продолжить.',
    'FULL NAME': 'ПОЛНОЕ ИМЯ',
    'PASSWORD': 'ПАРОЛЬ',
    'CONFIRM PASSWORD': 'ПОДТВЕРДИТЕ ПАРОЛЬ',
    'Forgot password?': 'Забыли пароль?',
    'Please wait…': 'Пожалуйста, подождите…',
    'Create account': 'Создать аккаунт',
    'Already have an account? ': 'Уже есть аккаунт? ',
    "Don't have an account? ": 'Нет аккаунта? ',
    'Please enter your name.': 'Пожалуйста, введите ваше имя.',
    'Email is required.': 'Email обязателен.',
    'Password is required.': 'Пароль обязателен.',
    'At least 6 characters.': 'Минимум 6 символов.',
    'Passwords do not match.': 'Пароли не совпадают.',
  },

  uz: {
    // ── NavBar ──
    'Home': 'Bosh sahifa',
    'Services': 'Xizmatlar',
    'Portfolio': 'Portfolio',
    'Price': 'Narxlar',
    'Contact': 'Aloqa',
    'Login': 'Kirish',
    'Sign up': "Ro'yxatdan o'tish",

    // ── Hero ──
    'From idea to': "G'oyadan",
    'digital reality.': 'raqamli voqelik.',
    'We design and build web platforms, mobile apps, CRM systems and AI products for ambitious companies — fast, reliable and beautifully engineered.':
      "Biz shijoatli kompaniyalar uchun veb-platformalar, mobil ilovalar, CRM tizimlar va AI mahsulotlarini loyihalash va yaratamiz — tez, ishonchli va nafis muhandislik bilan.",
    'OFFICIAL IT PARK UZBEKISTAN RESIDENT': 'IT PARK UZBEKISTAN RASMIY REZIDENTI',
    'Start a project': 'Loyihani boshlash',
    'View our work': 'Ishlarimizni koʻrish',
    'PROJECTS DELIVERED': 'TOPSHIRILGAN LOYIHALAR',
    'YEARS OF EXPERIENCE': 'YILLIK TAJRIBA',
    'LONG-TERM CLIENTS': 'DOIMIY MIJOZLAR',
    'SUPPORT & CARE': "QOʻLLAB-QUVVATLASH VA GʻAMXOʻRLIK",

    // ── Services ──
    'A new species of product tool.': 'Mahsulot vositasining yangi turi.',
    'Purpose-built for modern teams with AI workflows at its core, Ctrl Code sets a new standard for planning and building products.':
      "Zamonaviy jamoalar uchun AI jarayonlari asosida yaratilgan Ctrl Code mahsulotlarni rejalashtirish va yaratishda yangi standart o'rnatadi.",
    'Built for purpose': 'Maqsad uchun yaratilgan',
    'Ctrl Code is shaped by the practices and principles of world-class product teams — every decision serves the outcome.':
      "Ctrl Code jahon darajasidagi mahsulot jamoalarining amaliyoti va tamoyillari asosida shakllangan — har bir qaror natijaga xizmat qiladi.",
    'Powered by AI agents': 'AI agentlari asosida',
    'Designed for workflows shared by humans and AI, from planning through execution and post-launch optimisation.':
      "Odamlar va AI birgalikda ishlaydigan jarayonlar uchun — rejalashtirishdan bajarishgacha va ishga tushgandan keyingi optimallashtirishgacha.",
    'Designed for speed': 'Tezlik uchun yaratilgan',
    'Reduces noise and restores momentum so your team can ship with clarity, confidence, and relentless focus.':
      "Shovqinni kamaytiradi va sur'atni tiklaydi, shunda jamoangiz aniqlik, ishonch va to'liq diqqat bilan ishga tushiradi.",

    // ── Work ──
    'SELECTED WORK': 'TANLANGAN ISHLAR',
    'Work that speaks for itself.': "O'zi haqida gapiradigan ishlar.",
    'A collection of products, platforms, and digital systems built with clarity, speed, and precision.':
      'Aniqlik, tezlik va nafislik bilan yaratilgan mahsulotlar, platformalar va raqamli tizimlar to‘plami.',
    'All projects': 'Barcha loyihalar',
    'View Live Product': 'Mahsulotni ochish',
    'View case study': 'Loyihani ochish',
    'Interactive showcase': 'Interaktiv namoyish',
    'Desktop view': 'Kompyuter',
    'Mobile view': 'Mobil',
    'Open original': 'Asl saytni ochish',
    'Close showcase': 'Namoyishni yopish',
    'Scroll inside the frame to explore': 'Koʻrish uchun oyna ichida aylantiring',
    'SaaS Platform': 'SaaS platforma',
    'AI Workflow Platform': 'AI jarayon platformasi',
    'Web App': 'Veb-ilova',
    'Logistics Management': 'Logistika boshqaruvi',
    'Website Design': 'Sayt dizayni',
    'Real Estate Platform': "Ko'chmas mulk platformasi",
    'EdTech': 'EdTech',
    'Education Platform': "Ta'lim platformasi",
    'Healthcare': "Sog'liqni saqlash",
    'Healthcare Website': "Sog'liqni saqlash sayti",
    'Mobile App': 'Mobil ilova',
    'Mobile Application': 'Mobil ilova',

    // ── Why ──
    'WHY CTRL CODE': 'NEGA CTRL CODE',
    'Built to be your unfair advantage.': 'Sizning ustunligingiz uchun yaratilgan.',
    'Proven process': 'Sinovdan o‘tgan jarayon',
    'A battle-tested delivery cycle — discovery, design, sprints, launch. No chaos, no guessing.':
      "Sinovdan o'tgan ish sikli — tadqiqot, dizayn, sprintlar, ishga tushirish. Tartibsizlik va taxminsiz.",
    'International quality': 'Xalqaro sifat',
    "Standards you'd expect from a top European studio, priced fairly for the region.":
      "Yetakchi Yevropa studiyasidan kutiladigan standartlar, mintaqa uchun adolatli narxda.",
    'Fast execution': 'Tez bajarish',
    'First results in weeks, not months. We move at startup speed without cutting corners.':
      "Birinchi natijalar oylar emas, haftalarda. Biz sifatni yo'qotmasdan startap tezligida ishlaymiz.",
    'Clear communication': 'Aniq muloqot',
    'One dedicated manager, weekly demos, and a roadmap you can actually read and trust.':
      "Bitta mas'ul menejer, haftalik demolar va siz ishonishingiz mumkin bo'lgan tushunarli yo'l xaritasi.",
    '24/7 support': "24/7 qo'llab-quvvatlash",
    'We stay on after launch — monitoring, updates, and real humans on call when it matters.':
      "Biz ishga tushgandan keyin ham yoningizdamiz — monitoring, yangilanishlar va kerak bo'lganda jonli odamlar aloqada.",
    'Transparent pricing': 'Shaffof narxlar',
    'Fixed scopes and clear estimates upfront. No surprise invoices, ever.':
      "Belgilangan hajm va oldindan aniq baholash. Hech qachon kutilmagan hisob-fakturalar yo'q.",

    // ── Pricing ──
    'My Pricing': 'Mening narxlarim',
    'Standard Plan': 'Standart reja',
    'Premium Plan': 'Premium reja',
    'Have design ready to build? Or small budget?': 'Tayyor dizayn bormi? Yoki kichik byudjet?',
    'Full design & development with priority delivery.': 'Toʻliq dizayn va ishlab chiqish, ustuvor topshirish bilan.',
    'Dedicated team for complex, long-term projects.': 'Murakkab, uzoq muddatli loyihalar uchun maxsus jamoa.',
    'Enterprise': 'Enterprise',
    '/ hour': '/ soat',
    'Need your wireframe': 'Sizning vayrfreymingiz kerak',
    'Design with Figma, Framer': 'Figma, Framer bilan dizayn',
    'Implement with Webflow, React, WordPress, Laravel/PHP': 'Webflow, React, WordPress, Laravel/PHP bilan amalga oshirish',
    'Remote / Online': 'Masofadan / Onlayn',
    'Work in business days, no weekend': 'Ish kunlari, dam olish kunlarisiz',
    'Support 6 months': "6 oy qo'llab-quvvatlash",
    'Everything in Standard': 'Standartdagi barcha narsa',
    'Custom UI/UX design from scratch': 'Noldan maxsus UI/UX dizayn',
    'React, Next.js & TypeScript apps': 'React, Next.js va TypeScript ilovalari',
    'CMS & API integrations': 'CMS va API integratsiyalari',
    'Priority support & faster turnaround': "Ustuvor qo'llab-quvvatlash va tezroq bajarish",
    'Support 12 months': "12 oy qo'llab-quvvatlash",
    'Dedicated development team': 'Maxsus ishlab chiqish jamoasi',
    'Full-stack architecture & planning': 'Full-stack arxitektura va rejalashtirish',
    'Performance, security & SEO audit': 'Unumdorlik, xavfsizlik va SEO auditi',
    'SLA guarantee & uptime monitoring': 'SLA kafolati va ishlash monitoringi',
    'Ongoing retainer available': "Doimiy qo'llab-quvvatlash mavjud",
    'Support 24 months': "24 oy qo'llab-quvvatlash",
    'Get Started': 'Boshlash',
    'Contact Us': "Bog'lanish",
    'Custom Quote': 'Maxsus hisob-kitob',
    'Best value · Save up to 40% vs. agency rates': "Eng yaxshi narx · Agentlik narxidan 40% gacha tejash",

    // ── BookACall ──
    "Ctrl Code — we don't just build websites, we craft digital experiences that make brands feel sharper, faster, and more powerful.":
      "Ctrl Code — biz shunchaki saytlar yaratmaymiz, biz brendlarni yanada aniq, tez va kuchli qiladigan raqamli tajribalarni yaratamiz.",
    'Design by Wizerdui': 'Dizayn: Wizerdui',

    // ── FinalCTA ──
    'Have an idea?': "G'oyangiz bormi?",
    "Let's ship it together.": 'Birga oshiramiz!',
    "Book a free 30-minute consultation — we'll estimate your project within 48 hours.":
      "Bepul 30 daqiqalik konsultatsiyaga yoziling — biz loyihangizni 48 soat ichida baholaymiz.",
    'Book free consultation': 'Bepul konsultatsiya',
    'Write on Telegram': 'Telegramda yozing',

    // ── ConsultStrip ──
    'Not sure what you need?': 'Nima kerakligiga ishonchingiz komil emasmi?',
    "Book a free 30-minute call — we'll help you scope it and send an estimate within 48 hours.":
      "Bepul 30 daqiqalik qo'ng'iroqqa yoziling — biz hajmini aniqlashga yordam beramiz va 48 soat ichida baho yuboramiz.",

    // ── FAQ ──
    'FAQ': 'FAQ',
    'Questions, answered.': 'Savollarga javoblar.',
    'How do payments work?': "To'lovlar qanday amalga oshiriladi?",
    '50% to start, 50% on delivery. Larger projects are split into milestone payments tied to demos you can actually see.':
      "Boshida 50%, topshirishda 50%. Yirik loyihalar siz ko'ra oladigan demolarga bog'langan bosqichli to'lovlarga bo'linadi.",
    'Do you provide support after launch?': "Ishga tushgandan keyin qo'llab-quvvatlaysizmi?",
    'Yes — every plan includes 30 days of free support. Ongoing care plans with monitoring and updates start at $200/mo.':
      "Ha — har bir reja 30 kunlik bepul qo'llab-quvvatlashni o'z ichiga oladi. Monitoring va yangilanishlar bilan doimiy xizmat rejalari $200/oydan boshlanadi.",
    'Can you take over an existing project?': 'Mavjud loyihani qabul qila olasizmi?',
    'We start with a code and infrastructure audit, then propose an honest fix-or-rebuild plan with estimates for both.':
      "Biz kod va infratuzilma auditidan boshlaymiz, so'ngra har ikkisi uchun baholar bilan halol «tuzatish yoki qayta qurish» rejasini taklif qilamiz.",
    'How fast can we start?': 'Qanchalik tez boshlashimiz mumkin?',
    'Discovery call this week; the first sprint usually kicks off within 7–10 days of signing.':
      "Bu hafta tanishuv qo'ng'irog'i; birinchi sprint odatda shartnoma imzolangandan keyin 7–10 kun ichida boshlanadi.",
    'Do you sign NDAs and contracts?': 'NDA va shartnomalar imzolaysizmi?',
    'Always. As an official IT Park Uzbekistan resident we work with formal contracts and e-invoicing.':
      "Har doim. IT Park Uzbekistan rasmiy rezidenti sifatida biz rasmiy shartnomalar va elektron hisob-fakturalar bilan ishlaymiz.",

    // ── Footer ──
    'Ready to start building': 'Keyingi mahsulotingizni',
    'your next product?': 'yaratishga tayyormisiz?',
    'Contact us': "Biz bilan bog'lanish",
    'Newsletter': 'Axborot byulleteni',
    "We'd love to share our love for craft with you in our monthly newsletter.":
      "Biz oylik axborot byulletenimizda hunarga bo'lgan mehrimizni siz bilan baham ko'rishdan xursand bo'lamiz.",
    'Benefits': 'Afzalliklar',
    'Features': 'Imkoniyatlar',
    'Platform': 'Platforma',
    'Solution': 'Yechim',
    'Overview': 'Umumiy koʻrinish',
    'About us': 'Biz haqimizda',
    'Connectors': 'Konnektorlar',
    'Security': 'Xavfsizlik',
    '© 2025 Ctrl Code. All rights reserved.': '© 2025 Ctrl Code. Barcha huquqlar himoyalangan.',

    // ── NewsletterForm ──
    "Thanks — you're subscribed.": 'Rahmat — siz obuna boʻldingiz.',
    'Email address': 'Email manzili',
    'Subscribe': 'Obuna boʻlish',
    'Enter a valid email.': "To'g'ri email kiriting.",

    // ── ServicesHero ──
    'SERVICES': 'XIZMATLAR',
    'What we build.': 'Biz nima yaratamiz.',
    'Five disciplines, one team. Every engagement is scoped, designed and engineered end-to-end — with a single point of contact.':
      "Beshta yo'nalish, bitta jamoa. Har bir loyiha boshidan oxirigacha baholanadi, loyihalanadi va ishlab chiqiladi — yagona aloqa nuqtasi bilan.",

    // ── ServiceBlocks ──
    'Web Development': 'Veb-ishlab chiqish',
    'Corporate websites, e-commerce and complex web applications on modern stacks. Fast to load, easy to manage, built to convert.':
      "Zamonaviy steklarda korporativ saytlar, e-commerce va murakkab veb-ilovalar. Tez yuklanadigan, boshqarishga oson, konversiyaga yo'naltirilgan.",
    'Corporate websites & landing pages': 'Korporativ saytlar va landing sahifalar',
    'E-commerce with local payments': "Mahalliy to'lovlar bilan e-commerce",
    'Complex web applications': 'Murakkab veb-ilovalar',
    'Performance & SEO optimization': 'Unumdorlik va SEO optimallashtirish',
    'Web Platform': 'Veb-platforma',
    'Mobile Apps': 'Mobil ilovalar',
    'Native-quality apps for iOS and Android from a single codebase — designed for retention and shipped to both stores.':
      "iOS va Android uchun yagona kod bazasidan native sifatli ilovalar — ushlab qolish uchun ishlab chiqilgan va ikkala do'konga joylashtirilgan.",
    'Flutter & React Native': 'Flutter va React Native',
    'App Store / Play Market publishing': 'App Store / Play Market’da nashr etish',
    'Push, analytics & payments': "Push, analitika va to'lovlar",
    'Offline-first architecture': 'Offline-first arxitektura',
    'CRM & ERP Systems': 'CRM va ERP tizimlari',
    'Custom internal systems that mirror how your business actually works — sales, warehouse, finance and telephony in one place.':
      "Biznesingiz aslida qanday ishlashini aks ettiruvchi maxsus ichki tizimlar — sotuv, ombor, moliya va telefoniya bir joyda.",
    'Sales & lead management': 'Sotuv va lidlarni boshqarish',
    'Warehouse and finance modules': 'Ombor va moliya modullari',
    'Telephony & Telegram integrations': 'Telefoniya va Telegram integratsiyalari',
    'Role-based dashboards': 'Rollarga asoslangan panellar',
    'CRM System': 'CRM tizimi',
    'AI Solutions': 'AI yechimlari',
    'Practical AI that removes repetitive work: assistants, document automation and integrations with the models you already trust.':
      "Takroriy ishni bartaraf etadigan amaliy AI: yordamchilar, hujjatlarni avtomatlashtirish va siz ishonadigan modellar bilan integratsiyalar.",
    'Custom chatbots & assistants': 'Maxsus chatbotlar va yordamchilar',
    'Document & data automation': "Hujjat va ma'lumotlarni avtomatlashtirish",
    'Speech and vision integrations': "Nutq va tasvirni tanish integratsiyalari",
    'LLM API integrations': 'LLM API integratsiyalari',
    'AI Platform': 'AI platforma',
    'Creative & Branding': 'Kreativ va brending',
    'Identity, product design and motion that make your company look as good as it works.':
      "Kompaniyangizni ishlashi kabi chiroyli ko'rsatadigan aynelik, mahsulot dizayni va animatsiya.",
    'Logo & brand identity': 'Logotip va brend identifikatsiyasi',
    'UI/UX design systems': 'UI/UX dizayn tizimlari',
    'Motion & 3D visuals': 'Animatsiya va 3D vizuallar',
    'Marketing creatives': 'Marketing kreativlari',
    'Brand Design': 'Brend dizayni',
    'WEB': 'WEB',
    'MOBILE': 'MOBILE',
    'SYSTEMS': 'SYSTEMS',
    'AI': 'AI',
    'DESIGN': 'DESIGN',

    // ── PricingHero ──
    'PRICING': 'NARXLAR',
    'Invest in what ships.': 'Natijaga sarmoya kiriting.',
    'Fixed scopes, milestone payments and a free consultation before any commitment.':
      "Belgilangan hajm, bosqichli to'lovlar va har qanday majburiyatdan oldin bepul konsultatsiya.",

    // ── PortfolioHero / PortfolioWork ──
    'Work that defines': 'Mahoratimizni belgilaydigan',
    'our craft.': 'ishlar.',
    'Every project is a collaboration, every result is a story. Browse 48+ projects across web, mobile, SaaS, and brand design.':
      "Har bir loyiha — hamkorlik, har bir natija — hikoya. Veb, mobil, SaaS va brend dizaynidagi 48+ loyihani ko'rib chiqing.",
    'All': 'Barchasi',
    'Web': 'Veb',
    'Mobile': 'Mobil',
    'SaaS': 'SaaS',
    'E-Com': 'E-Com',
    'Branding': 'Brending',
    'No projects in this category yet.': "Bu toifada hali loyihalar yo'q.",
    'Brand Identity System': 'Brend identifikatsiya tizimi',
    'E-Commerce': 'E-Commerce',

    // ── StatsStrip ──
    'Projects Delivered': 'Topshirilgan loyihalar',
    'Revenue Generated': 'Yaratilgan daromad',
    'Client Retention': 'Mijozlarni ushlab qolish',
    'Years of Experience': 'Yillik tajriba',

    // ── FeaturedCaseStudy ──
    'FEATURED WORK': 'TANLANGAN ISH',
    'Case Study': 'Keys',
    'From idea to $1M ARR': "G'oyadan $1M ARR gacha",
    'in 8 months.': '8 oyda.',
    "We built NuroMedical's entire platform from scratch — analytics, user management, billing, and AI-powered clinical insights. The client went from 0 to $1M ARR within their first year of launch.":
      "Biz NuroMedical’ning butun platformasini noldan yaratdik — analitika, foydalanuvchilarni boshqarish, billing va AI asosidagi klinik tahlillar. Mijoz ishga tushgan birinchi yilida 0 dan $1M ARR gacha o'sdi.",
    'Read Case Study': 'Keysni oʻqish',

    // ── WorkShowcase ──
    'Ride status fails to update': 'Sayohat holati yangilanmayapti',
    'App shows incorrect pickup location': "Ilova noto'g'ri olib ketish joyini ko'rsatmoqda",
    'Improve explanations for tax feature': 'Soliq funksiyasi izohlarini yaxshilash',
    'New Issue': 'Yangi vazifa',
    'Create Issue': 'Vazifa yaratish',

    // ── ContactHero ──
    'CONTACT': 'ALOQA',
    "Let's talk.": 'Keling, gaplashaylik.',
    'Tell us about your project — we reply within 24 hours and estimate within 48.':
      'Loyihangiz haqida gapiring — biz 24 soat ichida javob beramiz va 48 soat ichida baholaymiz.',

    // ── ContactForm ──
    'EMAIL': 'EMAIL',
    'PHONE': 'TELEFON',
    'OFFICE': 'OFIS',
    'HOURS': 'ISH VAQTI',
    'Tashkent, Shahribod 50': 'Toshkent, Shahribod 50',
    'Mon–Sat, 10:00 – 19:00': 'Dush–Shan, 10:00 – 19:00',
    'Web development': 'Veb-ishlab chiqish',
    'Mobile app': 'Mobil ilova',
    'CRM system': 'CRM tizimi',
    'AI product': 'AI mahsulot',
    'Branding & design': 'Brending va dizayn',
    'Other': 'Boshqa',
    'Request received.': 'Soʻrov qabul qilindi.',
    'Thanks,': 'Rahmat,',
    "— we'll reply within 24 hours.": '— biz 24 soat ichida javob beramiz.',
    'there': 'sizga',
    'Send another request': 'Yana soʻrov yuborish',
    'Start your project': 'Loyihangizni boshlang',
    'YOUR NAME': 'ISMINGIZ',
    'PHONE OR TELEGRAM': 'TELEFON YOKI TELEGRAM',
    'SERVICE': 'XIZMAT',
    'BUDGET': 'BYUDJET',
    'ABOUT YOUR PROJECT': 'LOYIHANGIZ HAQIDA',
    'A few sentences about your idea, timeline and goals…': "G'oyangiz, muddatlaringiz va maqsadlaringiz haqida bir necha jumla…",
    'Send request': 'Soʻrov yuborish',
    'Free consultation · NDA on request · Reply within 24 hours':
      "Bepul konsultatsiya · So'rov bo'yicha NDA · 24 soat ichida javob",
    'Please tell us your name.': 'Iltimos, ismingizni kiriting.',
    'A phone or Telegram is required.': 'Telefon yoki Telegram talab qilinadi.',
    'Tell us a little about your project.': "Loyihangiz haqida bir oz gapirib bering.",

    // ── ShopClient ──
    'STORE': "DO'KON",
    'Templates & services.': 'Shablonlar va xizmatlar.',
    'Ready-made kits and fixed-scope services you can buy today.':
      "Bugun sotib olishingiz mumkin bo'lgan tayyor to'plamlar va belgilangan hajmli xizmatlar.",
    'item': 'mahsulot',
    'items': 'mahsulot',
    'Checkout': 'Rasmiylashtirish',
    'TEMPLATE': 'SHABLON',
    'Landing Page Kit': "Landing sahifa to'plami",
    'Production-ready Next.js landing template with animations.': 'Animatsiyali, ishlab chiqarishga tayyor Next.js landing shabloni.',
    'Admin Dashboard': 'Admin panel',
    'React + TypeScript dashboard with charts and auth flows.': 'Grafiklar va avtorizatsiyali React + TypeScript dashboard.',
    'Design System': 'Dizayn tizimi',
    'Figma + code tokens, components and documentation.': 'Figma + kod tokenlari, komponentlar va hujjatlar.',
    'Code Audit': 'Kod auditi',
    '48-hour review of your codebase with a prioritized report.': 'Kod bazangizni 48 soatlik tahlili va ustuvor hisobot.',
    'Brand Starter': "Boshlang'ich brend to'plami",
    'Logo, palette, typography and a one-page brand guide.': 'Logotip, palitra, tipografika va bir sahifali brend qoʻllanma.',
    'SEO Boost': 'SEO kuchaytirish',
    'Technical SEO pass, performance tuning and Core Web Vitals.': 'Texnik SEO tekshiruvi, unumdorlikni sozlash va Core Web Vitals.',
    'Add': "Qo'shish",
    'In cart': 'Savatda',

    // ── AuthForm ──
    'Account created': 'Hisob yaratildi',
    'Welcome back': 'Xush kelibsiz',
    'Taking you to your dashboard…': 'Panelingizga oʻtkazmoqdamiz…',
    'Create your account': 'Hisob yarating',
    'Sign in': 'Kirish',
    'Start your project with Ctrl Code.': 'Loyihangizni Ctrl Code bilan boshlang.',
    'Welcome back — log in to continue.': 'Xush kelibsiz — davom etish uchun kiring.',
    'FULL NAME': "TO'LIQ ISM",
    'PASSWORD': 'PAROL',
    'CONFIRM PASSWORD': 'PAROLNI TASDIQLANG',
    'Forgot password?': 'Parolni unutdingizmi?',
    'Please wait…': 'Iltimos, kuting…',
    'Create account': 'Hisob yaratish',
    'Already have an account? ': 'Hisobingiz bormi? ',
    "Don't have an account? ": "Hisobingiz yo'qmi? ",
    'Please enter your name.': 'Iltimos, ismingizni kiriting.',
    'Email is required.': 'Email talab qilinadi.',
    'Password is required.': 'Parol talab qilinadi.',
    'At least 6 characters.': 'Kamida 6 ta belgi.',
    'Passwords do not match.': 'Parollar mos kelmadi.',
  },
}
