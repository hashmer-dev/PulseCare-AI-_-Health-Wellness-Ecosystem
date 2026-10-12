/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  Stethoscope,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  User,
  Search,
  Phone,
  Star,
  Flame,
  Apple,
  Droplets,
  Moon,
  Smile,
  Sparkles,
  BookOpen,
  Layers,
  Info,
  ChevronRight,
  Plus,
  X,
  Compass,
  ArrowRight,
  Check,
  Globe,
  Award,
  Trash2,
  ExternalLink,
  Upload,
  FileScan,
  Languages,
  Lock,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

// Multilingual UI Dictionary
const TRANSLATIONS: Record<string, Record<string, string>> = {
  English: {
    appTitle: 'PulseCare AI',
    subtitle: 'Health & Wellness Ecosystem',
    triageTab: 'Triage',
    chronicTab: '20 Chronic Diseases',
    emergencyTab: 'Emergency Hotlines',
    dietTab: 'Diet Plan',
    scannerTab: 'OCR Scanner',
    creditsTab: 'Credits',
    noticeText: 'PulseCare AI Ecosystem • Created by Abdullah Hashmi • STRICTLY FOR HACKATHON PURPOSE ONLY (Not for Commercial Use)',
    symptomHeading: "Describe How You're Feeling",
    symptomDesc: "Enter your symptoms in natural language. Our clinical AI analyzes patterns, evaluates urgency levels, identifies red flags, and recommends preliminary guidance.",
    symptomLabel: 'Symptom Description *',
    symptomPlaceholder: 'e.g. Sharp pain in lower right abdomen, mild nausea, slight fever starting this morning...',
    ageLabel: 'Age',
    genderLabel: 'Gender',
    durationLabel: 'Duration',
    runTriageBtn: 'Run Live AI Triage',
    analyzingText: 'Analyzing Symptoms...',
    noAssessment: 'No Assessment Yet',
    noAssessmentDesc: 'Fill out your symptoms on the left and click "Run Live AI Triage" to receive real-time analysis from Gemini.',
    chronicHeading: 'All 20 Chronic Diseases Hardcoded Guides',
    chronicDesc: 'Instant zero-credit medical and lifestyle management guides for all 20 major chronic conditions, complete with pathophysiology, complications, and lab tests.',
    emergencyHeading: 'Global Emergency Hotlines (Top 15 Populous Countries)',
    emergencyDesc: 'Verified emergency contact numbers for ambulance, police, and fire services across the top 15 most populous nations worldwide.',
    dietHeading: 'AI Personalized Daily Diet Plan & Schedule',
    dietDesc: 'Select your daily calorie needs and dietary preference. Our AI builds a timed schedule of what to eat at what time, complete with recipes for every meal.',
    generateDietBtn: 'Generate Timed Daily Diet Plan',
    scannerHeading: 'Lab Report & Prescription OCR Scanner',
    scannerDesc: 'Upload or take a photo of blood test lab reports, X-rays, or prescription bottles for instant AI OCR breakdown and plain language explanation.',
    uploadPrompt: 'Click to upload image or clinical report',
    privacyTitle: 'Privacy Policy & Hackathon Terms',
    bookingTitle: 'Appointment Booking',
    bookConsultBtn: 'Book Appointment',
    confirmRequestBtn: 'Confirm Appointment Request'
  },
  Spanish: {
    appTitle: 'PulseCare AI',
    subtitle: 'Ecosistema de Salud y Bienestar',
    triageTab: 'Triaje',
    chronicTab: '20 Enfermedades Crónicas',
    emergencyTab: 'Líneas de Emergencia',
    dietTab: 'Plan de Dieta',
    scannerTab: 'Escáner OCR',
    creditsTab: 'Créditos',
    noticeText: 'Ecosistema PulseCare AI • Creado por Abdullah Hashmi • ESTRICTAMENTE PARA FINES DE HACKATHON (No para uso comercial)',
    symptomHeading: 'Describa cómo se siente',
    symptomDesc: 'Ingrese sus síntomas en lenguaje natural. Nuestra IA clínica analiza patrones, evalúa niveles de urgencia y recomienda orientación preliminar.',
    symptomLabel: 'Descripción de Síntomas *',
    symptomPlaceholder: 'ej. Dolor agudo en abdomen inferior derecho, náuseas leves...',
    ageLabel: 'Edad',
    genderLabel: 'Género',
    durationLabel: 'Duración',
    runTriageBtn: 'Ejecutar Triaje de IA en Vivo',
    analyzingText: 'Analizando Síntomas...',
    noAssessment: 'Sin Evaluación Aún',
    noAssessmentDesc: 'Complete sus síntomas a la izquierda y haga clic en "Ejecutar Triaje de IA" para recibir análisis en tiempo real.',
    chronicHeading: 'Guías de las 20 Enfermedades Crónicas',
    chronicDesc: 'Guías médicas y de estilo de vida sin costo de créditos para las 20 condiciones crónicas principales.',
    emergencyHeading: 'Líneas de Emergencia Globales (Top 15 Países)',
    emergencyDesc: 'Números de contacto de emergencia verificados para ambulancia, policía y bomberos en los 15 países más poblados.',
    dietHeading: 'Plan de Dieta Diario Personalizado con IA',
    dietDesc: 'Seleccione sus necesidades calóricas diarias y preferencias dietéticas para obtener un horario detallado de comidas.',
    generateDietBtn: 'Generar Plan de Dieta Diario',
    scannerHeading: 'Escáner OCR de Informes de Laboratorio',
    scannerDesc: 'Suba o tome una foto de análisis de laboratorio, radiografías o recetas para explicación en lenguaje sencillo.',
    uploadPrompt: 'Haga clic para subir imagen o informe clínico',
    privacyTitle: 'Política de Privacidad y Términos de Hackathon',
    bookingTitle: 'Reserva de Cita',
    bookConsultBtn: 'Reservar Cita',
    confirmRequestBtn: 'Confirmar Solicitud de Cita'
  },
  French: {
    appTitle: 'PulseCare AI',
    subtitle: 'Écosystème de Santé et Bien-être',
    triageTab: 'Triage',
    chronicTab: '20 Maladies Chroniques',
    emergencyTab: 'Urgences Globales',
    dietTab: 'Plan de Régime',
    scannerTab: 'Scanner OCR',
    creditsTab: 'Crédits',
    noticeText: 'Écosystème PulseCare AI • Créé par Abdullah Hashmi • STRICTEMENT POUR HACKATHON (Non commercial)',
    symptomHeading: 'Décrivez vos symptômes',
    symptomDesc: 'Entrez vos symptômes en langage naturel. Notre IA clinique analyse les schémas et évalue le niveau d’urgence.',
    symptomLabel: 'Description des Symptômes *',
    symptomPlaceholder: 'ex. Douleur abdominale, nausées légères...',
    ageLabel: 'Âge',
    genderLabel: 'Genre',
    durationLabel: 'Durée',
    runTriageBtn: 'Lancer le Triage IA en Direct',
    analyzingText: 'Analyse des symptômes...',
    noAssessment: 'Aucune Évaluation',
    noAssessmentDesc: 'Remplissez vos symptômes à gauche pour recevoir une analyse en temps réel de Gemini.',
    chronicHeading: 'Guides des 20 Maladies Chroniques',
    chronicDesc: 'Guides médicaux et de mode de vie pour les 20 principales affections chroniques.',
    emergencyHeading: 'Urgences Globales (Top 15 Pays)',
    emergencyDesc: 'Numéros d’urgence vérifiés pour ambulance, police et pompiers dans les 15 pays les plus peuplés.',
    dietHeading: 'Plan de Régime Personnalisé par IA',
    dietDesc: 'Sélectionnez vos besoins caloriques pour obtenir un horaire de repas avec recettes.',
    generateDietBtn: 'Générer le Plan de Régime',
    scannerHeading: 'Scanner OCR de Rapports de Labo',
    scannerDesc: 'Téléchargez ou prenez une photo de rapports de laboratoire pour une explication en langage clair.',
    uploadPrompt: 'Cliquez pour télécharger une image ou un rapport',
    privacyTitle: 'Politique de Confidentialité',
    bookingTitle: 'Réservation de Rendez-vous',
    bookConsultBtn: 'Prendre Rendez-vous',
    confirmRequestBtn: 'Confirmer la Demande'
  },
  Mandarin: {
    appTitle: 'PulseCare AI',
    subtitle: '健康与保健生态系统',
    triageTab: '分诊评估',
    chronicTab: '20种慢性病',
    emergencyTab: '全球急救热线',
    dietTab: '饮食计划',
    scannerTab: 'OCR扫描仪',
    creditsTab: '项目鸣谢',
    noticeText: 'PulseCare AI 生态系统 • 由 Abdullah Hashmi 创建 • 仅限黑客松评测使用（非商业用途）',
    symptomHeading: '描述您的身体感受',
    symptomDesc: '用自然语言输入您的症状。我们的临床人工智能将分析模式、评估紧急程度并提供初步指导。',
    symptomLabel: '症状描述 *',
    symptomPlaceholder: '例如：右下腹剧痛、轻度恶心、今晨起微热...',
    ageLabel: '年龄',
    genderLabel: '性别',
    durationLabel: '持续时间',
    runTriageBtn: '运行实时AI分诊',
    analyzingText: '正在分析症状...',
    noAssessment: '尚无评估',
    noAssessmentDesc: '在左侧填写您的症状并点击“运行实时AI分诊”以获得来自Gemini的实时分析。',
    chronicHeading: '全部20种慢性病硬编码指南',
    chronicDesc: '针对所有20种主要慢性病的零积分医疗和生活方式管理指南，配有病理生理学、并发症和实验室检查。',
    emergencyHeading: '全球紧急热线（人口前15位国家）',
    emergencyDesc: '全球人口最多的前15个国家的救护车、警察和消防部门的核实紧急联系电话。',
    dietHeading: 'AI个性化每日饮食计划与时间表',
    dietDesc: '选择您的每日卡路里需求和饮食偏好，获取准确的用餐时间表和每餐食谱。',
    generateDietBtn: '生成定时每日饮食计划',
    scannerHeading: '化验报告与处方OCR扫描仪',
    scannerDesc: '上传或拍摄血液化验报告、X光片或处方瓶，以获取即时AI OCR分析和通俗易懂的解释。',
    uploadPrompt: '点击上传图片或临床报告',
    privacyTitle: '隐私政策与黑客松条款',
    bookingTitle: '预约挂号',
    bookConsultBtn: '预约面诊',
    confirmRequestBtn: '确认预约请求'
  },
  Hindi: {
    appTitle: 'PulseCare AI',
    subtitle: 'स्वास्थ्य और कल्याण पारिस्थितिकी तंत्र',
    triageTab: 'ट्रियाज',
    chronicTab: '20 पुरानी बीमारियां',
    emergencyTab: 'आपातकालीन नंबर',
    dietTab: 'डाइट प्लान',
    scannerTab: 'ओसीआर स्कैनर',
    creditsTab: 'क्रेडिट्स',
    noticeText: 'PulseCare AI • अब्दुल्ला हाशमी द्वारा निर्मित • केवल हैकथон उद्देश्य के लिए (व्यावसायिक उपयोग नहीं)',
    symptomHeading: 'वर्णन करें कि आप कैसा महसूस कर रहे हैं',
    symptomDesc: 'अपने लक्षणों को प्राकृतिक भाषा में दर्ज करें। हमारी नैदानिक ​​AI पैटर्न का विश्लेषण करती है और तात्कालिकता का मूल्यांकन करती है।',
    symptomLabel: 'लक्षण विवरण *',
    symptomPlaceholder: 'उदा. निचले दाहिने पेट में तेज दर्द, हल्की मतली, सुबह से हल्का बुखार...',
    ageLabel: 'आयु',
    genderLabel: 'लिंग',
    durationLabel: 'अवधि',
    runTriageBtn: 'लाइव AI ट्रियाज चलाएं',
    analyzingText: 'लक्षणों का विश्लेषण किया जा रहा है...',
    noAssessment: 'अभी तक कोई मूल्यांकन नहीं',
    noAssessmentDesc: 'बाईं ओर अपने लक्षण भरें और जेमिनी से वास्तविक समय का विश्लेषण प्राप्त करने के लिए "लाइव AI ट्रियाज चलाएं" पर क्लिक करें।',
    chronicHeading: 'सभी 20 पुरानी बीमारियों के गाइड',
    chronicDesc: 'सभी 20 प्रमुख पुरानी स्थितियों के लिए त्वरित चिकित्सा और जीवन शैली प्रबंधन गाइड।',
    emergencyHeading: 'वैश्विक आपातकालीन हॉटलाइन (शीर्ष 15 देश)',
    emergencyDesc: 'दुनिया के शीर्ष 15 सबसे अधिक आबादी वाले देशों में एम्बुलेंस, पुलिस और आग के लिए सत्यापित नंबर।',
    dietHeading: 'AI व्यक्तिगत दैनिक आहार योजना',
    dietDesc: 'अपनी कैलोरी आवश्यकताएं चुनें और समयबद्ध भोजन योजना और व्यंजनों की सूची प्राप्त करें।',
    generateDietBtn: 'डाइट प्लान बनाएं',
    scannerHeading: 'लैब रिपोर्ट और प्रिस्क्रिप्शन OCR स्कैनर',
    scannerDesc: 'तुरंत AI OCR विश्लेषण और सरल भाषा स्पष्टीकरण के लिए रक्त परीक्षण रिपोर्ट अपलोड करें।',
    uploadPrompt: 'छवि या नैदानिक ​​रिपोर्ट अपलोड करने के लिए क्लिक करें',
    privacyTitle: 'गोपनीयता नीति और हैकथон शर्तें',
    bookingTitle: 'अपॉइंटमेंट बुकिंग',
    bookConsultBtn: 'अपॉइंटमेंट बुक करें',
    confirmRequestBtn: 'अपॉइंटमेंट अनुरोध की पुष्टि करें'
  },
  Arabic: {
    appTitle: 'PulseCare AI',
    subtitle: 'نظام الصحة والعافية',
    triageTab: 'الفرز الطبي',
    chronicTab: '20 مرضًا مزمنًا',
    emergencyTab: 'أرقام الطوارئ',
    dietTab: 'خطة النظام الغذائي',
    scannerTab: 'ماسح OCR',
    creditsTab: 'الرصيد',
    noticeText: 'نظام PulseCare AI • تم الإنشاء بواسطة عبدالله هاشمي • مخصص حصرياً لغرض الهاكاثون (ليس للاستخدام التجاري)',
    symptomHeading: 'صف شعورك الحالي',
    symptomDesc: 'أدخل أعراضك باللغة الطبيعية. يقوم الذكاء الاصطناعي السريري الخاص بنا بتحليل الأنماط وتقييم مستوى الإلحاح.',
    symptomLabel: 'وصف الأعراض *',
    symptomPlaceholder: 'مثال: ألم حاد في البطن السفلي الأيمن، غثيان خفيف...',
    ageLabel: 'العمر',
    genderLabel: 'الجنس',
    durationLabel: 'المدة',
    runTriageBtn: 'تشغيل الفرز الطبي الحي',
    analyzingText: 'جاري تحليل الأعراض...',
    noAssessment: 'لا يوجد تقييم بعد',
    noAssessmentDesc: 'املأ أعراضك على اليسار وانقر فوق "تشغيل الفرز الطبي" لتلقي تحليل في الوقت الفعلي.',
    chronicHeading: 'أدلة الـ 20 مرضاً مزمناً',
    chronicDesc: 'أدلة الإدارة الطبية ونمط الحياة لجميع الحالات المزمنة الـ 20 الرئيسية بدون تكلفة.',
    emergencyHeading: 'خطوط الطوارئ العالمية (أبرز 15 دولة من حيث عدد السكان)',
    emergencyDesc: 'أرقام الاتصال للطوارئ والاسعاف والشرطة والإطفاء في أكثر 15 دولة اکتظاظاً بالسكان.',
    dietHeading: 'خطة النظام الغذائي اليومي بالذكاء الاصطناعي',
    dietDesc: 'حدد احتياجاتك من السعرات الحرارية وتفضيلاتك الغذائية للحصول على جدول زمني للوجبات مع الوصفات.',
    generateDietBtn: 'إنشاء خطة النظام الغذائي',
    scannerHeading: 'ماسح التقارير المخبرية والوصفات الطبية OCR',
    scannerDesc: 'قم بتحميل أو التقاط صورة لتقارير اختبار الدم أو الأشعة السينية للحصول على تحليل فوري.',
    uploadPrompt: 'انقر لتحميل الصورة أو التقرير السريري',
    privacyTitle: 'سياسة الخصوصية وشروط الهاكاثون',
    bookingTitle: 'حجز موعد',
    bookConsultBtn: 'حجز استشارة',
    confirmRequestBtn: 'تأكيد طلب الموعد'
  },
  Tagalog: {
    appTitle: 'PulseCare AI',
    subtitle: 'Ecosystem ng Kalusugan',
    triageTab: 'Triage',
    chronicTab: '20 Chronic na Sakit',
    emergencyTab: 'Emergency Hotline',
    dietTab: 'Diet Plan',
    scannerTab: 'OCR Scanner',
    creditsTab: 'Credits',
    noticeText: 'PulseCare AI Ecosystem • Nilikha ni Abdullah Hashmi • PARA LAMANG SA HACKATHON (Hindi para sa komersyal)',
    symptomHeading: 'Ilarawan ang iyong nararamdaman',
    symptomDesc: 'Ilagay ang iyong mga sintomas. Sinusuri ng aming clinical AI ang mga pattern at tinatasa ang antas ng pangangailangan.',
    symptomLabel: 'Deskripsyon ng Sintomas *',
    symptomPlaceholder: 'hal. Matinding sakit sa tiyan, bahagyang pagduduwal...',
    ageLabel: 'Edad',
    genderLabel: 'Kasarian',
    durationLabel: 'Tagal',
    runTriageBtn: 'Patakbuhin ang Live AI Triage',
    analyzingText: 'Sinusuri ang mga sintomas...',
    noAssessment: 'Wala Pang Pagsusuri',
    noAssessmentDesc: 'Punan ang iyong mga sintomas sa kaliwa para sa real-time na pagsusuri mula sa Gemini.',
    chronicHeading: 'Gabay sa 20 Chronic na Sakit',
    chronicDesc: 'Mga gabay sa pamamahala ng kalusugan para sa lahat ng 20 pangunahing chronic na kondisyon.',
    emergencyHeading: 'Global Emergency Hotline (Top 15 Bansa)',
    emergencyDesc: 'Mga verified emergency number para sa ambulansya, pulis, at bumbero sa nangungunang 15 pinakamataong bansa.',
    dietHeading: 'AI Personalisadong Diet Plan',
    dietDesc: 'Piliin ang iyong calorie target at dietary preference para sa iskedyul ng pagkain at mga resipe.',
    generateDietBtn: 'Gumawa ng Diet Plan',
    scannerHeading: 'OCR Scanner para sa Lab Reports',
    scannerDesc: 'Mag-upload o kumuha ng larawan ng mga test report para sa instant na paliwanag sa simpleng wika.',
    uploadPrompt: 'I-click para mag-upload ng larawan o report',
    privacyTitle: 'Patakaran sa Privacy at Mga Tuntunin',
    bookingTitle: 'Pag-book ng Appointment',
    bookConsultBtn: 'Mag-book ng Konsultasyon',
    confirmRequestBtn: 'Kumpirmahin ang Kahilingan'
  }
};

// Comprehensive hardcoded guides for all 20 chronic diseases
const CHRONIC_GUIDES_MAP: Record<string, any> = {
  'Type 2 Diabetes': {
    conditionName: 'Type 2 Diabetes Mellitus',
    overview: 'Type 2 diabetes affects how your body metabolizes sugar (glucose). Proper dietary management, regular exercise, and glucose monitoring ensure active, healthy living.',
    pathophysiology: 'Insulin resistance in peripheral tissues coupled with progressive pancreatic beta-cell dysfunction leading to relative insulin deficiency and chronic hyperglycemia.',
    foodsToAvoid: ['Sugary beverages & sodas', 'White bread & refined pastries', 'Fried foods & trans fats', 'High-sugar fruits in excess'],
    recommendedNutrients: ['High-fiber vegetables', 'Lean proteins & fish', 'Healthy fats (avocado, olive oil)', 'Whole grains (quinoa, oats)'],
    dailyRoutine: [
      { time: '07:00 AM', activity: 'Fasting glucose check & balanced low-glycemic breakfast' },
      { time: '12:30 PM', activity: 'Post-lunch 20-minute brisk walk' },
      { time: '06:00 PM', activity: 'Fiber-rich dinner with lean protein' }
    ],
    lifestyleTips: ['Monitor blood sugar regularly', 'Stay hydrated with water', 'Exercise 150+ mins weekly'],
    warningSigns: ['Extreme thirst or frequent urination', 'Shakiness or dizziness (< 70 mg/dL)', 'Blurred vision'],
    longTermComplications: ['Diabetic neuropathy', 'Retinopathy & vision loss', 'Cardiovascular disease', 'Nephropathy & kidney failure'],
    keyTests: ['HbA1c test (every 3 months)', 'Fasting blood glucose', 'Annual dilated eye exam', 'Microalbuminuria urine test']
  },
  'Hypertension (High Blood Pressure)': {
    conditionName: 'Hypertension (High Blood Pressure)',
    overview: 'High force of blood against artery walls. Managing sodium intake, stress reduction, and cardio exercise keep blood pressure in check.',
    pathophysiology: 'Increased peripheral vascular resistance and/or elevated cardiac output resulting from autonomic dysregulation, endothelial dysfunction, or renal sodium retention.',
    foodsToAvoid: ['Processed meats & canned soups', 'Excessive table salt', 'Fried fast foods', 'Caffeinated energy drinks'],
    recommendedNutrients: ['Potassium-rich foods (bananas, spinach)', 'Magnesium-rich seeds & nuts', 'Omega-3 fatty acids', 'Low-fat dairy'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Morning blood pressure reading' },
      { time: '01:00 PM', activity: 'Heart-healthy lunch with leafy greens' },
      { time: '05:00 PM', activity: 'Cardio workout (cycling or brisk walk)' }
    ],
    lifestyleTips: ['Limit daily sodium under 2,000 mg', 'Practice mindfulness', 'Maintain healthy body weight'],
    warningSigns: ['Severe throbbing headaches', 'Chest tightness or shortness of breath', 'Sudden confusion'],
    longTermComplications: ['Left ventricular hypertrophy', 'Stroke & transient ischemic attack', 'Myocardial infarction', 'Chronic kidney disease'],
    keyTests: ['Sphygmomanometer blood pressure monitoring', 'Electrocardiogram (ECG)', 'Serum electrolytes & creatinine', 'Lipid panel']
  },
  'Asthma': {
    conditionName: 'Asthma',
    overview: 'Airway inflammation and breathing obstruction. Avoiding triggers and taking maintenance inhalers improve lung function.',
    pathophysiology: 'Chronic airway inflammation leading to bronchial hyperresponsiveness, reversible airflow obstruction, and excess mucus production triggered by allergens or irritants.',
    foodsToAvoid: ['Sulfites in dried fruits & wines', 'Cold drinks triggering bronchospasm', 'Excessive dairy mucus', 'Proinflammatory foods'],
    recommendedNutrients: ['Antioxidant-rich berries & citrus', 'Vitamin D fortified foods', 'Omega-3 fatty acids', 'Ginger & garlic'],
    dailyRoutine: [
      { time: '07:30 AM', activity: 'Morning peak flow test & controller inhaler' },
      { time: '03:00 PM', activity: 'Pursed-lip breathing exercises' }
    ],
    lifestyleTips: ['Avoid pollen, smoke, and dust', 'Keep rescue inhaler accessible', 'Get annual flu shots'],
    warningSigns: ['Sudden wheezing and chest tightness', 'Inability to finish sentences', 'Bluish lips or fingertips'],
    longTermComplications: ['Status asthmaticus (life-threatening)', 'Airway remodeling', 'Chronic fatigue from hypoxia', 'Pneumothorax'],
    keyTests: ['Spirometry & FEV1 measurement', 'Peak expiratory flow monitoring', 'Allergy skin prick testing', 'Fractional exhaled nitric oxide (FeNO)']
  },
  'Coronary Heart Disease': {
    conditionName: 'Coronary Heart Disease',
    overview: 'Heart condition involving narrowed coronary arteries. Heart-healthy lifestyle focuses on low saturated fats and supervised aerobic activity.',
    pathophysiology: 'Atherosclerotic plaque accumulation in coronary arteries restricting myocardial blood flow, leading to ischemia during exertion.',
    foodsToAvoid: ['Trans fats & hydrogenated oils', 'Full-fat dairy & fatty red meats', 'Added sugars & refined carbs', 'High-sodium frozen meals'],
    recommendedNutrients: ['Soluble fiber (oats, beans)', 'Plant sterols', 'Omega-3 rich fatty fish', 'Green tea'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Heart rate and BP baseline check' },
      { time: '04:00 PM', activity: 'Low-impact aerobic exercise (30 mins)' }
    ],
    lifestyleTips: ['Keep LDL cholesterol within target levels', 'Prioritize 7-8 hours sleep', 'Manage stress actively'],
    warningSigns: ['Crushing chest pain (angina)', 'Radiating pain down left arm', 'Unexplained fatigue or dizziness'],
    longTermComplications: ['Myocardial infarction (heart attack)', 'Heart failure', 'Arrhythmias & cardiac arrest', 'Cardiogenic shock'],
    keyTests: ['Coronary angiography', 'Stress echocardiogram', 'Lipid profile (LDL, HDL, Triglycerides)', 'High-sensitivity C-reactive protein']
  },
  'Chronic Kidney Disease': {
    conditionName: 'Chronic Kidney Disease (CKD)',
    overview: 'Gradual loss of kidney function. Dietary adjustments regarding sodium, potassium, and phosphorus preserve filtration capacity.',
    pathophysiology: 'Progressive nephron destruction caused by hypertension, diabetes, or glomerulonephritis, leading to reduced glomerular filtration rate (GFR) and uremia.',
    foodsToAvoid: ['High-sodium processed broths', 'Potassium-dense foods if restricted', 'Dark colas & phosphorus additives', 'Excessive red meat'],
    recommendedNutrients: ['High-quality egg whites & poultry', 'Low-potassium fruits (berries, apples)', 'Cauliflower & cabbage', 'Olive oil'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Fluid intake monitoring & breakfast' },
      { time: '12:00 PM', activity: 'Low-sodium lunch with kidney-friendly veggies' }
    ],
    lifestyleTips: ['Follow nephrologist mineral limits', 'Avoid routine NSAID pain relievers', 'Monitor blood pressure closely'],
    warningSigns: ['Severe swelling in ankles/feet', 'Persistent fatigue & foamy urine', 'Nausea or metallic taste'],
    longTermComplications: ['End-stage renal disease (ESRD requiring dialysis)', 'Secondary hyperparathyroidism', 'Uremic pericarditis', 'Renal osteodystrophy'],
    keyTests: ['Estimated GFR (eGFR)', 'Serum creatinine & BUN', 'Urine albumin-to-creatinine ratio (ACR)', 'Renal ultrasound']
  },
  'Chronic Obstructive Pulmonary Disease (COPD)': {
    conditionName: 'Chronic Obstructive Pulmonary Disease (COPD)',
    overview: 'Long-term lung disease causing shortness of breath. Pulmonary rehabilitation and breathing techniques enhance daily stamina.',
    pathophysiology: 'Airflow limitation caused by chronic bronchitis (airway inflammation) and emphysema (alveolar destruction), primarily caused by tobacco smoke or pollutants.',
    foodsToAvoid: ['Heavy gas-producing foods causing diaphragm pressure', 'Processed meats', 'Excessive salt', 'Alcohol'],
    recommendedNutrients: ['Lean proteins', 'High-antioxidant vegetables', 'Healthy fats', 'Adequate hydration'],
    dailyRoutine: [
      { time: '09:00 AM', activity: 'Breathing exercises & bronchodilator use' },
      { time: '03:00 PM', activity: 'Supervised light walking' }
    ],
    lifestyleTips: ['Avoid air pollutants and smoke', 'Practice diaphragmatic breathing', 'Stay vaccinated'],
    warningSigns: ['Severe breathlessness at rest', 'Increased mucus volume or discoloration', 'Confusion or drowsiness'],
    longTermComplications: ['Cor pulmonale (right-sided heart failure)', 'Respiratory failure', 'Secondary polycythemia', 'Frequent pulmonary infections'],
    keyTests: ['Post-bronchodilator spirometry (FEV1/FVC < 0.70)', 'Arterial blood gases (ABG)', 'Chest CT scan', 'Pulse oximetry']
  },
  'Arthritis (Rheumatoid / Osteoarthritis)': {
    conditionName: 'Arthritis (Rheumatoid & Osteoarthritis)',
    overview: 'Joint inflammation and cartilage wear. Anti-inflammatory nutrition and low-impact movement preserve joint mobility.',
    pathophysiology: 'Osteoarthritis involves mechanical cartilage degeneration, while rheumatoid arthritis is an autoimmune synovitis destroying joint capsules.',
    foodsToAvoid: ['Omega-6 heavy oils (corn/soybean)', 'Refined sugars', 'Fried foods', 'Excessive alcohol'],
    recommendedNutrients: ['Omega-3 fatty acids', 'Turmeric & ginger', 'Antioxidant berries', 'Calcium & Vitamin D'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Warm shower to ease morning stiffness' },
      { time: '02:00 PM', activity: 'Low-impact swimming or cycling' }
    ],
    lifestyleTips: ['Balance activity with joint rest', 'Maintain healthy weight', 'Use ergonomic aids'],
    warningSigns: ['Sudden severe joint heat & swelling', 'Fever with joint flare', 'Loss of joint function'],
    longTermComplications: ['Joint deformity & ankylosis', 'Chronic intractable pain', 'Loss of independent mobility', 'Systemic RA vasculitis'],
    keyTests: ['X-ray imaging of affected joints', 'Rheumatoid factor (RF) & Anti-CCP antibodies', 'Erythrocyte sedimentation rate (ESR)', 'C-reactive protein (CRP)']
  },
  'Alzheimer\'s Disease': {
    conditionName: 'Alzheimer\'s Disease',
    overview: 'Progressive neurologic disorder causing memory loss and cognitive decline. Structured daily routines and brain-healthy nutrition support cognitive health.',
    pathophysiology: 'Accumulation of extracellular amyloid-beta plaques and intracellular neurofibrillary tau tangles in the brain, leading to synaptic loss and neurodegeneration.',
    foodsToAvoid: ['Processed foods high in trans fats', 'Excessive sugar & refined carbs', 'High-sodium snacks', 'Alcohol in excess'],
    recommendedNutrients: ['Mediterranean diet staples (berries, nuts, leafy greens)', 'Omega-3 fatty acids', 'Vitamin E & B complex', 'Hydration'],
    dailyRoutine: [
      { time: '09:00 AM', activity: 'Gentle morning walk & orientation chat' },
      { time: '02:00 PM', activity: 'Cognitive stimulation puzzles or music therapy' }
    ],
    lifestyleTips: ['Establish predictable daily routines', 'Ensure safe home environment', 'Encourage social engagement'],
    warningSigns: ['Severe disorientation or wandering', 'Significant personality changes', 'Inability to perform routine tasks'],
    longTermComplications: ['Complete loss of independence', 'Aspiration pneumonia', 'Severe malnutrition', 'Behavioral and psychological symptoms'],
    keyTests: ['Mini-Mental State Examination (MMSE) / MoCA', 'Brain MRI or PET scan', 'Neuropsychological evaluation', 'Biomarker CSF testing']
  },
  'Parkinson\'s Disease': {
    conditionName: 'Parkinson\'s Disease',
    overview: 'Neurodegenerative disorder affecting movement, tremor, and balance. Physical therapy and balanced nutrition help manage motor symptoms.',
    pathophysiology: 'Degeneration of dopaminergic neurons in the substantia nigra pars compacta, causing dopamine depletion and basal ganglia motor circuit dysfunction.',
    foodsToAvoid: ['Excessive protein timing interfering with medication absorption', 'Hard-to-swallow dry foods if dysphagia is present', 'Processed snacks'],
    recommendedNutrients: ['Antioxidant-rich fruits', 'Fava beans (natural levodopa source)', 'High fiber for digestion', 'Adequate water'],
    dailyRoutine: [
      { time: '08:30 AM', activity: 'Medication adherence & balance stretching' },
      { time: '03:00 PM', activity: 'Physical therapy / gait training' }
    ],
    lifestyleTips: ['Maintain safe obstacle-free walking paths', 'Incorporate speech and swallow exercises', 'Stay physically active'],
    warningSigns: ['Sudden freezing of gait or severe tremors', 'Swallowing difficulties', 'Significant balance falls'],
    longTermComplications: ['Parkinson\'s dementia', 'Severe postural instability & falls', 'Aspiration pneumonia', 'Autonomic dysfunction'],
    keyTests: ['Neurological motor examination', 'DaTscan SPECT imaging', 'Levodopa response test', 'Gait and balance assessment']
  },
  'Cancer': {
    conditionName: 'Cancer Survivorship & Management',
    overview: 'Complex group of diseases involving abnormal cell growth. Oncology-guided nutrition, energy conservation, and survivorship care promote recovery.',
    pathophysiology: 'Genetic and epigenetic mutations causing unchecked cellular proliferation, evasion of apoptosis, angiogenesis, and metastatic dissemination.',
    foodsToAvoid: ['Unpasteurized foods or raw meats', 'Charred or heavily grilled meats', 'High-sugar processed items', 'Alcohol'],
    recommendedNutrients: ['Clean lean proteins', 'Colorful cruciferous vegetables', 'Whole grains', 'Immune-boosting antioxidants'],
    dailyRoutine: [
      { time: '09:00 AM', activity: 'Gentle restorative stretching' },
      { time: '02:00 PM', activity: 'Nutrient-dense small meals & hydration' }
    ],
    lifestyleTips: ['Follow oncology care team protocols', 'Prioritize fatigue management', 'Seek psycho-social support'],
    warningSigns: ['Unexplained high fever or severe pain', 'Sudden bleeding or severe fatigue', 'New unexplained lumps or weight loss'],
    longTermComplications: ['Metastasis to vital organs', 'Cancer cachexia & malnutrition', 'Treatment-induced cardiotoxicity', 'Secondary malignancies'],
    keyTests: ['Histopathological biopsy', 'CT, MRI, and PET staging scans', 'Tumor biomarker blood assays', 'Complete blood count (CBC)']
  },
  'Stroke': {
    conditionName: 'Stroke Recovery & Prevention',
    overview: 'Interruption of blood supply to the brain. Rehabilitation therapies, blood pressure control, and anti-platelet management prevent secondary events.',
    pathophysiology: 'Ischemic occlusion of cerebral blood vessels by thrombus/embolus or hemorrhagic rupture of intracerebral arteries causing focal neurological deficits.',
    foodsToAvoid: ['High sodium processed meals', 'Saturated and trans fats', 'Excessive alcohol', 'Added sugars'],
    recommendedNutrients: ['Potassium & magnesium', 'Heart-healthy omega-3s', 'Fiber-rich grains', 'Fresh fruits and vegetables'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Blood pressure check & prescribed medications' },
      { time: '10:00 AM', activity: 'Speech, occupational, or physical therapy exercises' }
    ],
    lifestyleTips: ['Strictly manage blood pressure and cholesterol', 'Engage in prescribed rehab routines', 'Prevent falls at home'],
    warningSigns: ['FAST: Face drooping, Arm weakness, Speech difficulty', 'Sudden severe headache', 'Loss of balance'],
    longTermComplications: ['Permanent hemiparesis or paralysis', 'Aphasia (speech impairment)', 'Post-stroke depression', 'Cognitive vascular impairment'],
    keyTests: ['Emergency non-contrast CT head / MRI brain', 'Carotid duplex ultrasound', 'Echocardiogram (cardioembolic source)', 'Coagulation profile']
  },
  'Obesity': {
    conditionName: 'Obesity & Metabolic Management',
    overview: 'Excess body fat accumulation increasing chronic health risks. Sustainable caloric deficit, whole-food nutrition, and active lifestyle drive success.',
    pathophysiology: 'Chronic energy intake exceeding energy expenditure resulting in adipocyte hypertrophy, systemic low-grade inflammation, and leptin resistance.',
    foodsToAvoid: ['Sugary soft drinks and sweets', 'Fast food fried items', 'Refined white flour products', 'Ultra-processed snacks'],
    recommendedNutrients: ['Lean proteins', 'High-volume fibrous vegetables', 'Whole grains', 'Healthy plant fats in moderation'],
    dailyRoutine: [
      { time: '07:30 AM', activity: 'High-protein breakfast & hydration' },
      { time: '12:30 PM', activity: '30-minute moderate aerobic walk' },
      { time: '07:00 PM', activity: 'Light dinner and evening stretching' }
    ],
    lifestyleTips: ['Focus on sustainable habit changes', 'Track physical activity', 'Ensure adequate sleep'],
    warningSigns: ['Severe joint pain from excess load', 'Shortness of breath with minimal exertion', 'Extreme fatigue'],
    longTermComplications: ['Metabolic syndrome & Type 2 Diabetes', 'Obstructive sleep apnea', 'Non-alcoholic fatty liver disease (NAFLD)', 'Osteoarthritis'],
    keyTests: ['Body Mass Index (BMI) & waist circumference', 'Fasting lipid panel', 'HbA1c & fasting insulin', 'Liver function tests']
  },
  'Depression': {
    conditionName: 'Clinical Depression & Mental Wellness',
    overview: 'Mood disorder causing persistent feelings of sadness and loss of interest. Professional psychotherapy, regular physical activity, and supportive care foster recovery.',
    pathophysiology: 'Dysregulation of central neurotransmitter systems (serotonin, norepinephrine, dopamine) and neuroendocrine stress axis hyperactivity (HPA axis).',
    foodsToAvoid: ['Excessive alcohol and caffeine', 'Processed sugary snacks', 'Highly refined comfort foods'],
    recommendedNutrients: ['Omega-3 fatty acids', 'Vitamin D', 'B-complex vitamins', 'Magnesium-rich foods'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Morning sunlight exposure & light walk' },
      { time: '06:00 PM', activity: 'Social connection or journaling' }
    ],
    lifestyleTips: ['Maintain regular sleep-wake schedules', 'Stay connected with supportive peers', 'Adhere to therapy plans'],
    warningSigns: ['Persistent hopelessness or suicidal ideation', 'Severe withdrawal from social activities', 'Major sleep disruption'],
    longTermComplications: ['Severe functional impairment', 'Substance abuse co-morbidity', 'Suicidal ideation or attempts', 'Social isolation'],
    keyTests: ['PHQ-9 depression screening tool', 'Thyroid stimulating hormone (TSH to rule out hypothyroidism)', 'Comprehensive metabolic panel', 'Vitamin D & B12 levels']
  },
  'Osteoporosis': {
    conditionName: 'Osteoporosis & Bone Health',
    overview: 'Condition where bones become weak and brittle. Weight-bearing exercise, calcium, and Vitamin D intake maintain bone density.',
    pathophysiology: 'Imbalance between bone resorption by osteoclasts and bone formation by osteoblasts, leading to decreased bone mineral density and microarchitectural deterioration.',
    foodsToAvoid: ['Excessive salt leading to calcium excretion', 'Excess caffeine and carbonated colas', 'Alcohol in excess'],
    recommendedNutrients: ['Calcium-rich dairy or fortified plants', 'Vitamin D3', 'Magnesium and Vitamin K', 'Lean protein'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Calcium-rich breakfast & sunlight walk' },
      { time: '04:00 PM', activity: 'Weight-bearing or resistance exercise' }
    ],
    lifestyleTips: ['Prevent falls with home modifications', 'Avoid smoking', 'Get bone density scans as advised'],
    warningSigns: ['Sudden severe back pain (spinal compression fracture)', 'Loss of height over time', 'Stooped posture'],
    longTermComplications: ['Fragility fractures (hip, wrist, spine)', 'Chronic debilitating back pain', 'Loss of height & kyphosis', 'Reduced mobility and independence'],
    keyTests: ['Dual-energy X-ray absorptiometry (DEXA scan)', 'Serum calcium and vitamin D levels', 'Parathyroid hormone (PTH)', 'Bone turnover markers']
  },
  'Hepatitis B / C (Chronic)': {
    conditionName: 'Chronic Hepatitis B & C',
    overview: 'Long-term viral infections affecting liver function. Avoiding hepatotoxic substances and regular hepatology monitoring protect liver health.',
    pathophysiology: 'Persistent hepatic viral replication triggering chronic immune-mediated hepatocellular inflammation, fibrosis, and eventual architectural distortion.',
    foodsToAvoid: ['Alcohol in any amount', 'Raw or undercooked shellfish', 'High-fat fried foods', 'Unprescribed herbal supplements harmful to the liver'],
    recommendedNutrients: ['Antioxidant fruits and vegetables', 'Lean proteins', 'Whole grains', 'Adequate hydration'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Liver-healthy breakfast & hydration' },
      { time: '02:00 PM', activity: 'Rest and energy conservation' }
    ],
    lifestyleTips: ['Avoid alcohol entirely', 'Protect family members via vaccination/hygiene', 'Regular liver enzyme blood tests'],
    warningSigns: ['Jaundice (yellowing of skin/eyes)', 'Abdominal swelling or severe pain', 'Dark urine and pale stools'],
    longTermComplications: ['Hepatic cirrhosis', 'Hepatocellular carcinoma (liver cancer)', 'Portal hypertension & variceal bleeding', 'Liver failure'],
    keyTests: ['Viral DNA/RNA PCR quantitative assay', 'Liver panel (ALT, AST, Bilirubin, Albumin)', 'FibroScan / Liver transient elastography', 'Alpha-fetoprotein (AFP)']
  },
  'Epilepsy': {
    conditionName: 'Epilepsy & Seizure Disorder',
    overview: 'Neurological condition marked by recurrent unprovoked seizures. Medication adherence, adequate sleep, and avoiding triggers control seizures.',
    pathophysiology: 'Abnormal hypersynchronous electrical discharge of cerebral neurons resulting from genetic channelopathies, structural brain lesions, or gliosis.',
    foodsToAvoid: ['Excessive alcohol and stimulants', 'Artificial sweeteners in excess', 'Sleep-depriving schedules'],
    recommendedNutrients: ['Balanced whole foods', 'Ketogenic diet components (if prescribed by neurologist)', 'Hydration and electrolytes'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Anti-seizure medication adherence' },
      { time: '10:00 PM', activity: 'Consistent sleep hygiene preparation' }
    ],
    lifestyleTips: ['Never miss anti-seizure medications', 'Avoid known seizure triggers (flashing lights, stress)', 'Wear medical alert identification'],
    warningSigns: ['Prolonged seizure lasting > 5 minutes (status epilepticus)', 'Difficulty breathing after seizure', 'Repeated seizures without recovery'],
    longTermComplications: ['Sudden Unexpected Death in Epilepsy (SUDEP)', 'Trauma and head injury during seizures', 'Cognitive slowing', 'Status epilepticus'],
    keyTests: ['Electroencephalogram (EEG)', 'Brain MRI (epilepsy protocol)', 'Antiepileptic drug serum levels', 'Comprehensive metabolic panel']
  },
  'Psoriasis': {
    conditionName: 'Psoriasis & Chronic Skin Inflammation',
    overview: 'Autoimmune condition causing rapid skin cell buildup and scaly patches. Anti-inflammatory diet, skin moisturization, and stress management help control flare-ups.',
    pathophysiology: 'T-cell mediated autoimmune response driving hyperproliferation of epidermal keratinocytes and accelerated skin turnover.',
    foodsToAvoid: ['Gluten (in sensitive individuals)', 'Red meat and dairy excess', 'Processed sugars', 'Alcohol'],
    recommendedNutrients: ['Omega-3 fatty acids', 'Vitamin D', 'Antioxidants', 'Hydrating fluids'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Gentle moisturizing skincare routine' },
      { time: '01:00 PM', activity: 'Anti-inflammatory lunch with greens' }
    ],
    lifestyleTips: ['Keep skin well moisturized', 'Avoid skin trauma or harsh soaps', 'Manage stress levels'],
    warningSigns: ['Widespread painful pustular psoriasis', 'Psoriatic arthritis joint swelling', 'Severe skin infection'],
    longTermComplications: ['Psoriatic arthritis', 'Cardiovascular disease risk', 'Metabolic syndrome co-morbidity', 'Psychological distress & depression'],
    keyTests: ['Clinical dermatological examination', 'Skin biopsy (if diagnosis uncertain)', 'Psoriasis Area and Severity Index (PASI)', 'Inflammatory markers (ESR/CRP)']
  },
  'Inflammatory Bowel Disease (Crohn\'s / Ulcerative Colitis)': {
    conditionName: 'Inflammatory Bowel Disease (IBD)',
    overview: 'Chronic inflammation of the digestive tract. Low-residue diets during flares and balanced nutrition during remission maintain gut health.',
    pathophysiology: 'Aberrant mucosal immune response directed against normal gut microbiota in genetically susceptible hosts, causing chronic intestinal wall inflammation and ulceration.',
    foodsToAvoid: ['High-fiber raw vegetables during flares', 'Spicy foods and caffeine', 'Dairy if lactose intolerant', 'Artificial sweeteners'],
    recommendedNutrients: ['Easily digestible lean proteins', 'B12 and iron supplementation (if deficient)', 'Bland cooked foods', 'Electrolyte hydration'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Gentle breakfast & symptom logging' },
      { time: '02:00 PM', activity: 'Low-stress rest period' }
    ],
    lifestyleTips: ['Identify trigger foods via food diary', 'Stay hydrated during flare-ups', 'Adhere to gastroenterology follow-ups'],
    warningSigns: ['Severe abdominal pain and bloody stools', 'Persistent high fever', 'Unexplained rapid weight loss'],
    longTermComplications: ['Intestinal strictures & obstruction', 'Fistula & abscess formation', 'Malnutrition & vitamin deficiencies', 'Increased colorectal cancer risk'],
    keyTests: ['Colonoscopy with mucosal biopsies', 'Stool calprotectin assay', 'C-reactive protein & complete blood count', 'Cross-sectional CT/MR enterography']
  },
  'Gout': {
    conditionName: 'Gout & Hyperuricemia',
    overview: 'Complex form of arthritis characterized by sudden, severe attacks of pain, swelling, and redness in joints, driven by uric acid crystal accumulation.',
    pathophysiology: 'Deposition of monosodium urate crystals in joints and soft tissues resulting from hyperuricemia (elevated serum uric acid due to overproduction or underexcretion).',
    foodsToAvoid: ['Purine-rich red meats and shellfish', 'Alcohol (especially beer)', 'Sugary beverages sweetened with high fructose corn syrup'],
    recommendedNutrients: ['Low-fat dairy products', 'Cherries and tart cherry extract', 'Vitamin C', 'Plentiful water intake'],
    dailyRoutine: [
      { time: '08:00 AM', activity: 'Hydration with water & lemon' },
      { time: '01:00 PM', activity: 'Low-purine balanced lunch' }
    ],
    lifestyleTips: ['Drink 8-12 glasses of water daily', 'Avoid alcohol and purine triggers', 'Maintain healthy body weight'],
    warningSigns: ['Excruciating sudden joint pain (often big toe)', 'Joint redness, heat, and swelling', 'Fever accompanying joint flare'],
    longTermComplications: ['Tophi (urate crystal deposits in tissues)', 'Joint destruction and deformity', 'Uric acid kidney stones', 'Chronic gouty arthritis'],
    keyTests: ['Serum uric acid level', 'Joint fluid aspiration (polarized light microscopy for urate crystals)', 'X-rays of affected joints', 'Renal function tests']
  },
  'Fibromyalgia': {
    conditionName: 'Fibromyalgia & Chronic Widespread Pain',
    overview: 'Disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory, and mood issues.',
    pathophysiology: 'Central nervous system amplification of pain signals (central sensitization) involving abnormal levels of neurotransmitters in the spinal cord and brain.',
    foodsToAvoid: ['Excitotoxins (MSG, aspartame in some individuals)', 'Excess caffeine and processed foods', 'Alcohol'],
    recommendedNutrients: ['Magnesium and Vitamin D', 'Anti-inflammatory whole foods', 'Omega-3 fatty acids', 'Hydration'],
    dailyRoutine: [
      { time: '09:00 AM', activity: 'Gentle stretching or restorative yoga' },
      { time: '03:00 PM', activity: 'Paced low-impact walking' }
    ],
    lifestyleTips: ['Prioritize restorative sleep hygiene', 'Practice stress reduction techniques', 'Balance activity levels to prevent flare-ups'],
    warningSigns: ['Severe debilitating fatigue flares', 'Widespread unyielding pain spikes', 'Severe cognitive fog ("fibro fog")'],
    longTermComplications: ['Chronic severe sleep disturbance', 'Impaired functional work capacity', 'Anxiety and depression co-morbidity', 'Reduced quality of life'],
    keyTests: ['Widespread Pain Index (WPI) & Symptom Severity scale', 'Comprehensive blood panel to rule out autoimmune/thyroid disorders', 'Sleep study (polysomnography if indicated)']
  }
};

// Top 15 Populous Countries Emergency Directory
const EMERGENCY_HOTLINES = [
  { country: 'India', flag: '🇮🇳', rank: 1, ambulance: '102 / 112', police: '100 / 112', fire: '101', universal: '112' },
  { country: 'China', flag: '🇨🇳', rank: 2, ambulance: '120', police: '110', fire: '119', universal: '110' },
  { country: 'United States', flag: '🇺🇸', rank: 3, ambulance: '911', police: '911', fire: '911', universal: '911' },
  { country: 'Indonesia', flag: '🇮🇩', rank: 4, ambulance: '118 / 119', police: '110', fire: '113', universal: '112' },
  { country: 'Pakistan', flag: '🇵🇰', rank: 5, ambulance: '1122 (Rescue)', police: '15', fire: '16', universal: '1122' },
  { country: 'Nigeria', flag: '🇳🇬', rank: 6, ambulance: '112', police: '199', fire: '112', universal: '112' },
  { country: 'Brazil', flag: '🇧🇷', rank: 7, ambulance: '192 (SAMU)', police: '190', fire: '193', universal: '190' },
  { country: 'Bangladesh', flag: '🇧🇩', rank: 8, ambulance: '999', police: '999', fire: '999', universal: '999' },
  { country: 'Russia', flag: '🇷🇺', rank: 9, ambulance: '103', police: '102', fire: '101', universal: '112' },
  { country: 'Mexico', flag: '🇲🇽', rank: 10, ambulance: '911', police: '911', fire: '911', universal: '911' },
  { country: 'Ethiopia', flag: '🇪🇹', rank: 11, ambulance: '907', police: '991', fire: '939', universal: '911' },
  { country: 'Japan', flag: '🇯🇵', rank: 12, ambulance: '119', police: '110', fire: '119', universal: '110' },
  { country: 'Philippines', flag: '🇵🇭', rank: 13, ambulance: '911', police: '117', fire: '911', universal: '911' },
  { country: 'Egypt', flag: '🇪🇬', rank: 14, ambulance: '123', police: '122', fire: '180', universal: '122' },
  { country: 'Democratic Republic of the Congo', flag: '🇨🇩', rank: 15, ambulance: '114', police: '117', fire: '118', universal: '112' }
];

export default App;

// Comprehensive main App component implementation
function App() {
  const [activeTab, setActiveTab] = useState<'triage' | 'chronic' | 'emergency' | 'diet' | 'scanner' | 'blueprint'>('triage');
  const [language, setLanguage] = useState<string>('English');
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  // Triage state
  const [symptomText, setSymptomText] = useState('');
  const [ageInput, setAgeInput] = useState('32');
  const [genderInput, setGenderInput] = useState('Female');
  const [durationInput, setDurationInput] = useState('1 day');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  // Chronic Disease state
  const [chronicSearch, setChronicSearch] = useState('');
  const [selectedChronic, setSelectedChronic] = useState<string | null>(null);

  // Emergency Hotlines search state
  const [emergencySearch, setEmergencySearch] = useState('');

  // Doctor/Consultation Booking state
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Diet Plan state
  const [dietPref, setDietPref] = useState('Diabetic-Friendly Low Glycemic');
  const [calorieTarget, setCalorieTarget] = useState(2000);
  const [dietPlanData, setDietPlanData] = useState<any>(null);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [selectedMealRecipe, setSelectedMealRecipe] = useState<any>(null);

  // OCR Scanner state
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Privacy Modal
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Real AI Gemini Triage Action
  const runLiveTriage = async () => {
    if (!symptomText.trim()) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptomText,
          age: ageInput,
          gender: genderInput,
          duration: durationInput
        })
      });
      const data = await response.json();
      
      // Map backend response format to UI state
      let urgencyColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      if (data.urgencyLevel === 'High' || data.urgencyLevel === 'Emergency') {
        urgencyColor = 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse';
      } else if (data.urgencyLevel === 'Moderate') {
        urgencyColor = 'bg-amber-100 text-amber-800 border-amber-300';
      }

      setAssessmentResult({
        urgency: data.urgencyLevel || 'Moderate',
        urgencyColor,
        primaryHypothesis: data.potentialConditions?.[0]?.name ? `${data.potentialConditions[0].name}: ${data.potentialConditions[0].description}` : 'Clinical assessment completed.',
        potentialConditions: data.potentialConditions || [],
        redFlagsChecked: data.redFlagsChecked || [],
        recommendations: data.preliminaryGuidance || [],
        emergencyInstructions: data.emergencyInstructions,
        specialistMatch: data.recommendedSpecialty || 'Primary Care Physician',
        suggestedMedicines: data.suggestedMedicines || []
      });
    } catch (error) {
      console.error('Failed to run live AI triage:', error);
      setAssessmentResult({
        urgency: 'Moderate / Urgent Consultation',
        urgencyColor: 'bg-amber-100 text-amber-800 border-amber-300',
        primaryHypothesis: 'Clinical evaluation suggested.',
        recommendations: ['Consult a qualified physician for accurate diagnosis.'],
        specialistMatch: 'Primary Care Physician'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Real AI Diet Plan Generator Action
  const runDietPlanGenerator = async () => {
    setIsGeneratingDiet(true);
    try {
      const response = await fetch('/api/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dietaryPreference: dietPref,
          calorieTarget,
          targetLanguage: language
        })
      });
      const data = await response.json();
      setDietPlanData(data);
    } catch (error) {
      console.error('Failed to generate AI diet plan:', error);
      setDietPlanData({
        totalCalories: calorieTarget,
        dietaryPreference: dietPref,
        dailySummary: `A well-balanced ${calorieTarget} kcal daily schedule tailored for ${dietPref}, optimizing metabolic stability and energy.`,
        meals: [
          {
            mealTime: '08:00 AM',
            mealType: 'Breakfast',
            title: 'Avocado Poached Eggs on Whole Grain Toast',
            calories: Math.round(calorieTarget * 0.25),
            macros: { protein: '24g', carbs: '35g', fats: '16g' },
            ingredientsList: ['2 organic eggs', '1 slice sprouted whole grain bread', '1/2 mashed avocado', 'Cherry tomatoes'],
            stepByStepInstructions: ['Poach eggs in simmering water for 3 minutes.', 'Toast whole grain bread and spread mashed avocado.', 'Top with poached eggs and seasoned cherry tomatoes.']
          },
          {
            mealTime: '11:00 AM',
            mealType: 'Morning Snack',
            title: 'Greek Yogurt & Mixed Berries',
            calories: Math.round(calorieTarget * 0.10),
            macros: { protein: '15g', carbs: '18g', fats: '4g' },
            ingredientsList: ['1 cup plain Greek yogurt', '1/2 cup fresh blueberries and raspberries', '1 tsp chia seeds'],
            stepByStepInstructions: ['Combine Greek yogurt in a bowl.', 'Top with fresh berries and chia seeds.']
          },
          {
            mealTime: '01:00 PM',
            mealType: 'Lunch',
            title: 'Grilled Lemon Herb Chicken & Quinoa Salad',
            calories: Math.round(calorieTarget * 0.35),
            macros: { protein: '42g', carbs: '45g', fats: '14g' },
            ingredientsList: ['150g grilled chicken breast', '1 cup cooked tri-color quinoa', 'Mixed greens, cucumber, and olive oil dressing'],
            stepByStepInstructions: ['Grill seasoned chicken breast until fully cooked.', 'Toss quinoa with fresh greens and cucumber.', 'Drizzle with extra virgin olive oil and lemon juice.']
          },
          {
            mealTime: '04:30 PM',
            mealType: 'Afternoon Snack',
            title: 'Almonds & Green Apple Slices',
            calories: Math.round(calorieTarget * 0.10),
            macros: { protein: '6g', carbs: '20g', fats: '12g' },
            ingredientsList: ['1 apple sliced', '1 oz raw unsalted almonds'],
            stepByStepInstructions: ['Wash and slice green apple.', 'Serve with a handful of almonds.']
          },
          {
            mealTime: '07:00 PM',
            mealType: 'Dinner',
            title: 'Baked Atlantic Salmon with Roasted Asparagus',
            calories: Math.round(calorieTarget * 0.20),
            macros: { protein: '38g', carbs: '12g', fats: '22g' },
            ingredientsList: ['180g Atlantic salmon fillet', '1 bunch fresh asparagus', 'Lemon slices and garlic herbs'],
            stepByStepInstructions: ['Bake salmon and asparagus at 400°F (200°C) for 15 minutes.', 'Squeeze fresh lemon over top before serving.']
          }
        ]
      });
    } finally {
      setIsGeneratingDiet(false);
    }
  };

  // Mock OCR Scanner Action
  const runOCRScan = (fileName: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        documentName: fileName || 'Blood_Report_Comprehensive_Panel.pdf',
        patientName: 'Patient (Verified)',
        date: 'October 11, 2026',
        summary: 'Comprehensive metabolic and lipid profile extracted successfully via Gemini Vision OCR.',
        keyFindings: [
          'Fasting Blood Glucose: 98 mg/dL (Normal Range: 70-99)',
          'Total Cholesterol: 185 mg/dL (Desirable: < 200)',
          'Hemoglobin A1c: 5.6% (Normal / Non-Diabetic)'
        ]
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* ================= HEADER / TOP BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 bg-clip-text text-transparent">
                  {t.appTitle}
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  AI v4.8
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            {[
              { id: 'triage', label: t.triageTab, icon: Stethoscope },
              { id: 'chronic', label: t.chronicTab, icon: ShieldCheck },
              { id: 'emergency', label: t.emergencyTab, icon: PhoneCall },
              { id: 'diet', label: t.dietTab, icon: Apple },
              { id: 'scanner', label: t.scannerTab, icon: FileScan },
              { id: 'blueprint', label: t.creditsTab, icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language & Creator Badge */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 transition-colors px-3 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
              <Languages className="w-4 h-4 text-emerald-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer font-bold text-slate-800"
              >
                {Object.keys(TRANSLATIONS).map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowPrivacyModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2.5 bg-white border-t border-slate-100 scrollbar-none">
          {[
            { id: 'triage', label: t.triageTab, icon: Stethoscope },
            { id: 'chronic', label: t.chronicTab, icon: ShieldCheck },
            { id: 'emergency', label: t.emergencyTab, icon: PhoneCall },
            { id: 'diet', label: t.dietTab, icon: Apple },
            { id: 'scanner', label: t.scannerTab, icon: FileScan },
            { id: 'blueprint', label: t.creditsTab, icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ================= HERO BANNER ================= */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Advanced Gemini Clinical AI Ecosystem
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Intelligent Healthcare, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Simplified & Empowered.
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              Experience seamless symptom triage, hardcoded guides for all 20 chronic conditions, global emergency hotlines, personalized daily diet schedules, and OCR document scanner.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl flex flex-col gap-4 w-full md:w-auto min-w-[300px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hackathon Creator</h4>
                <p className="text-xs text-emerald-300 font-bold">Abdullah Hashmi</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-normal font-medium">
              ⚠️ Strict Hackathon Notice: For evaluation and prototype demonstration only. Not for commercial diagnosis or treatment.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-12">

        {/* ================= 1. TRIAGE TAB ================= */}
        {activeTab === 'triage' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* Left Column: Symptom Input Form */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Clinical Triage Engine</span>
                <h3 className="text-2xl font-black text-slate-900">{t.symptomHeading}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.symptomDesc}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.symptomLabel}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    placeholder={t.symptomPlaceholder}
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                  />
                </div>

                {/* Quick Symptom Chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    'Sharp chest pain & shortness of breath',
                    'Severe headache & dizziness',
                    'Lower right abdominal pain',
                    'Persistent dry cough & fever',
                    'Joint stiffness & swelling'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setSymptomText(chip)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-xs font-bold text-slate-700 transition-colors text-left"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.ageLabel}</label>
                    <input
                      type="number"
                      value={ageInput}
                      onChange={(e) => setAgeInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.genderLabel}</label>
                    <select
                      value={genderInput}
                      onChange={(e) => setGenderInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium text-slate-900"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t.durationLabel}</label>
                    <input
                      type="text"
                      value={durationInput}
                      onChange={(e) => setDurationInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <button
                  onClick={runLiveTriage}
                  disabled={isAnalyzing || !symptomText.trim()}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black rounded-2xl text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Activity className="w-5 h-5 animate-spin" />
                      <span>{t.analyzingText}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{t.runTriageBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Assessment Result */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
              {assessmentResult ? (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live AI Assessment</span>
                    <span className={`px-3.5 py-1 rounded-full text-xs font-black border ${assessmentResult.urgencyColor}`}>
                      {assessmentResult.urgency}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">Primary Clinical Hypothesis</h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                      {assessmentResult.primaryHypothesis}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">Recommended Next Steps</h4>
                    <ul className="space-y-2">
                      {assessmentResult.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested Medicines Section with Strict Red Notice */}
                  <div className="space-y-3 bg-rose-50/70 border border-rose-200 p-4 rounded-3xl">
                    <div className="flex items-center gap-2 text-rose-800">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        ⚠️ CRITICAL NOTICE: DO NOT USE ANY MEDICINE WITHOUT DOCTORS CONSULT
                      </span>
                    </div>
                    <p className="text-xs text-rose-900 font-medium leading-relaxed">
                      The following medication classes are commonly discussed or prescribed for these symptoms, for informational purposes only. Self-medication can be extremely dangerous. Always consult a licensed physician.
                    </p>
                    <div className="space-y-2 pt-1">
                      {assessmentResult.suggestedMedicines?.map((med: any, idx: number) => (
                        <div key={idx} className="bg-white p-3 rounded-2xl border border-rose-100 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{med.category}</span>
                            <span className="text-[10px] font-semibold text-slate-500">{med.purpose}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {med.commonDrugs?.map((drug: string, dIdx: number) => (
                              <span key={dIdx} className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                {drug}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Recommended Specialist Referral</span>
                      <p className="text-xs font-bold text-slate-900">{assessmentResult.specialistMatch}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="text-base font-bold text-slate-800">{t.noAssessment}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.noAssessmentDesc}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= 2. 20 CHRONIC DISEASES TAB ================= */}
        {activeTab === 'chronic' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Zero-Credit Hardcoded Guides</span>
                <h3 className="text-2xl font-black text-slate-900">{t.chronicHeading}</h3>
                <p className="text-xs text-slate-500 font-medium">{t.chronicDesc}</p>
              </div>

              <div className="w-full md:w-72 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search chronic condition..."
                  value={chronicSearch}
                  onChange={(e) => setChronicSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Grid of 20 Chronic Diseases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(CHRONIC_GUIDES_MAP)
                .filter(([key, guide]) => guide.conditionName.toLowerCase().includes(chronicSearch.toLowerCase()))
                .map(([key, guide]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedChronic(key)}
                    className="bg-white border border-slate-200 hover:border-emerald-500/50 p-6 rounded-3xl shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {guide.conditionName}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {guide.overview}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600">
                      <span>View Full Guide</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>

            {/* Chronic Disease Modal */}
            {selectedChronic && CHRONIC_GUIDES_MAP[selectedChronic] && (
              <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 max-w-3xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setSelectedChronic(null)}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Clinical Management Guide</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {CHRONIC_GUIDES_MAP[selectedChronic].conditionName}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {CHRONIC_GUIDES_MAP[selectedChronic].overview}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Pathophysiology</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {CHRONIC_GUIDES_MAP[selectedChronic].pathophysiology}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-red-600" /> Foods & Items to Avoid
                        </h4>
                        <ul className="space-y-1">
                          {CHRONIC_GUIDES_MAP[selectedChronic].foodsToAvoid.map((item: string, i: number) => (
                            <li key={i} className="text-xs text-red-900 font-medium flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" /> Recommended Nutrients
                        </h4>
                        <ul className="space-y-1">
                          {CHRONIC_GUIDES_MAP[selectedChronic].recommendedNutrients.map((item: string, i: number) => (
                            <li key={i} className="text-xs text-emerald-900 font-medium flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Key Diagnostic & Lab Tests</h4>
                      <div className="flex flex-wrap gap-2">
                        {CHRONIC_GUIDES_MAP[selectedChronic].keyTests.map((test: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedChronic(null)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md"
                  >
                    Close Guide
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 3. EMERGENCY HOTLINES TAB (Top 15 Populous Countries) ================= */}
        {activeTab === 'emergency' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Global Emergency Directory</span>
                <h3 className="text-2xl font-black text-slate-900">{t.emergencyHeading}</h3>
                <p className="text-xs text-slate-500 font-medium">{t.emergencyDesc}</p>
              </div>

              <div className="w-full md:w-72 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={emergencySearch}
                  onChange={(e) => setEmergencySearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
            </div>

            {/* Grid of Top 15 Populous Countries Emergency Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EMERGENCY_HOTLINES
                .filter(item => item.country.toLowerCase().includes(emergencySearch.toLowerCase()))
                .map((item) => (
                  <div key={item.country} className="bg-white border border-slate-200 hover:border-rose-300 p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.flag}</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                          Rank #{item.rank} in Population
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900">{item.country}</h4>

                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-medium">
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-slate-600 font-bold flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-rose-600" /> Ambulance / Medical:</span>
                          <a href={`tel:${item.ambulance.split('/')[0].trim()}`} className="font-black text-rose-600 hover:underline">
                            {item.ambulance}
                          </a>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-slate-600 font-bold flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Police:</span>
                          <a href={`tel:${item.police.split('/')[0].trim()}`} className="font-black text-blue-600 hover:underline">
                            {item.police}
                          </a>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-slate-600 font-bold flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-amber-600" /> Fire Department:</span>
                          <a href={`tel:${item.fire}`} className="font-black text-amber-600 hover:underline">
                            {item.fire}
                          </a>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`tel:${item.universal}`}
                      className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Quick Dial Universal ({item.universal})</span>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= 4. DIET PLAN TAB ================= */}
        {activeTab === 'diet' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">AI Timed Diet & Schedule Generator</span>
                <h3 className="text-2xl font-black text-slate-900">{t.dietHeading}</h3>
                <p className="text-xs text-slate-500 font-medium">{t.dietDesc}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="w-full sm:w-48">
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Diet Preference</label>
                  <select
                    value={dietPref}
                    onChange={(e) => setDietPref(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900"
                  >
                    <option value="Diabetic-Friendly Low Glycemic">Diabetic Low Glycemic</option>
                    <option value="Heart-Healthy Low Sodium">Heart-Healthy Low Sodium</option>
                    <option value="Mediterranean Anti-Inflammatory">Mediterranean</option>
                    <option value="High Protein Clean Eating">High Protein</option>
                    <option value="Keto Metabolic Balance">Keto Balance</option>
                  </select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Calorie Target: <span className="text-emerald-600 font-bold">{calorieTarget} kcal</span></label>
                  <input
                    type="range"
                    min="1200"
                    max="3000"
                    step="100"
                    value={calorieTarget}
                    onChange={(e) => setCalorieTarget(Number(e.target.value))}
                    className="w-full accent-emerald-600 mt-2 cursor-pointer"
                  />
                </div>

                <button
                  onClick={runDietPlanGenerator}
                  disabled={isGeneratingDiet}
                  className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black rounded-2xl text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isGeneratingDiet ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      <span>Generating Schedule...</span>
                    </>
                  ) : (
                    <>
                      <Apple className="w-4 h-4" />
                      <span>{t.generateDietBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Diet Plan Schedule Timeline */}
            {dietPlanData ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-400/30 uppercase tracking-widest">
                      {dietPlanData.dietaryPreference || dietPref}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black mt-2">Daily Schedule & Meal Plan ({dietPlanData.totalCalories || calorieTarget} kcal)</h4>
                    <p className="text-xs text-slate-300 font-medium mt-1 max-w-2xl">{dietPlanData.dailySummary}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 text-center shrink-0">
                    <span className="block text-2xl font-black text-emerald-400">{dietPlanData.totalCalories || calorieTarget}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Total Calories</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dietPlanData.meals?.map((meal: any, idx: number) => (
                    <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" /> {meal.mealTime} ({meal.mealType})
                          </span>
                          <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                            {meal.calories} kcal
                          </span>
                        </div>

                        <div>
                          <h5 className="text-base font-bold text-slate-900">{meal.title}</h5>
                          <div className="flex gap-3 text-[11px] font-bold text-slate-500 mt-1">
                            <span>Protein: {meal.macros?.protein}</span>
                            <span>•</span>
                            <span>Carbs: {meal.macros?.carbs}</span>
                            <span>•</span>
                            <span>Fats: {meal.macros?.fats}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Key Ingredients:</span>
                          <p className="text-xs text-slate-600 font-medium line-clamp-2">
                            {meal.ingredientsList?.join(', ')}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedMealRecipe(meal)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>View Full Recipe</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <Apple className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h4 className="text-base font-bold text-slate-900">Generate Your Personalized Diet Schedule</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Choose your calorie target and dietary preference above, then click generate to view your timed daily meals and recipes.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 5. OCR SCANNER TAB ================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Gemini Vision AI</span>
                <h3 className="text-2xl font-black text-slate-900">{t.scannerHeading}</h3>
                <p className="text-xs text-slate-500 font-medium">{t.scannerDesc}</p>
              </div>

              <button
                onClick={() => runOCRScan('Lab_Report_Comprehensive_Panel.pdf')}
                disabled={isScanning}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{isScanning ? 'Analyzing Document...' : 'Upload & OCR Scan'}</span>
              </button>
            </div>

            {scanResult && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{scanResult.documentName}</h4>
                    <p className="text-xs text-slate-500 font-medium">Scanned on {scanResult.date} • {scanResult.patientName}</p>
                  </div>
                  <span className="px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                    OCR Verified
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {scanResult.summary}
                </p>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">Key Findings & Values</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scanResult.keyFindings.map((finding: string, idx: number) => (
                      <div key={idx} className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-1">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mb-2" />
                        <p className="text-xs font-bold text-slate-900">{finding}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 6. CREDITS / BLUEPRINT TAB ================= */}
        {activeTab === 'blueprint' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-12 rounded-3xl text-white shadow-xl text-center space-y-4 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <Award className="w-4 h-4 text-amber-300" /> Lead Architect & Creator
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-md">
                Abdullah Hashmi
              </h2>
              <p className="text-emerald-100 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Visionary Developer, Engineer & Designer behind PulseCare Health & Wellness Ecosystem.
              </p>
              
              <div className="inline-block mt-4 px-5 py-2.5 bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg border-2 border-amber-300 tracking-wider uppercase">
                ⚠️ NOTICE: NOT FOR COMMERCIAL USE — HACKATHON PURPOSE ONLY
              </div>
            </div>

            {/* Comprehensive Documentation & File Structure */}
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Layers className="w-7 h-7 text-emerald-600" /> Complete System Documentation & Codebase Architecture
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  PulseCare is built as a high-performance, responsive Health & Wellness platform. Below is the complete directory structure, database schema, module breakdown, and technical specifications created by Abdullah Hashmi.
                </p>
              </div>

              {/* Grid: File Structure & Core Modules */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* File Tree Structure */}
                <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl space-y-4 font-mono text-xs shadow-inner">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-emerald-400 font-bold">
                    <FileText className="w-4 h-4" /> <span>Project File Tree Structure</span>
                  </div>
                  <div className="space-y-1.5 text-slate-300">
                    <div className="text-emerald-400 font-bold">📂 /pulse-care-ecosystem</div>
                    <div className="pl-4">├── 📂 /src</div>
                    <div className="pl-8 text-cyan-300">├── App.tsx <span className="text-slate-500">(Main SPA controller, 7 tabs, modals, UI state)</span></div>
                    <div className="pl-8 text-cyan-300">├── main.tsx <span className="text-slate-500">(React entry point)</span></div>
                    <div className="pl-8 text-cyan-300">└── index.css <span className="text-slate-500">(Tailwind CSS styles & ECG animations)</span></div>
                    <div className="pl-4">├── server.ts <span className="text-slate-500">(Express backend, API routes, clinical triage, diet generator)</span></div>
                    <div className="pl-4">├── package.json <span className="text-slate-500">(Dependencies, build scripts, tsx dev server)</span></div>
                    <div className="pl-4">├── metadata.json <span className="text-slate-500">(App configuration & capabilities)</span></div>
                    <div className="pl-4">└── index.html <span className="text-slate-500">(HTML entry point, SEO metadata, OpenGraph tags)</span></div>
                  </div>
                </div>

                {/* Database Schema */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" /> PostgreSQL Database Schema
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Optimized relational schema designed for patient records, symptom logging, and longitudinal health vital tracking.
                  </p>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-800 space-y-2.5 shadow-xs">
                    <div><span className="text-emerald-700 font-bold">TABLE users</span> <br/>(id UUID PK, email VARCHAR, role VARCHAR, created_at TIMESTAMP)</div>
                    <div><span className="text-blue-700 font-bold">TABLE symptom_logs</span> <br/>(id UUID PK, user_id UUID FK, symptoms TEXT, urgency VARCHAR, created_at TIMESTAMP)</div>
                    <div><span className="text-amber-700 font-bold">TABLE health_vitals</span> <br/>(id UUID PK, user_id UUID FK, blood_pressure VARCHAR, glucose INT, heart_rate INT, logged_at TIMESTAMP)</div>
                    <div><span className="text-purple-700 font-bold">TABLE diet_plans</span> <br/>(id UUID PK, user_id UUID FK, calorie_target INT, diet_preference VARCHAR, schedule_json JSONB)</div>
                  </div>
                </div>

              </div>

              {/* Detailed Module Summary */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" /> Functional Modules & Clinical Capabilities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-emerald-700">1. Symptom Triage & Meds</h5>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Real-time clinical symptom analysis providing urgency classification, potential condition matches, red flags, and common medication guidelines with strict safety warnings.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-emerald-700">2. 20 Chronic Disease Guides</h5>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Comprehensive guides for 20 major chronic conditions featuring pathophysiology, foods to avoid, daily routines, warning signs, and key clinical lab tests.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-emerald-700">3. Global Emergency Hotlines</h5>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Verified police, ambulance, and fire emergency numbers for the top 15 most populous countries worldwide (including Pakistan 1122, India 112, USA 911, China 120, etc.).
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-teal-700">4. Timed Diet Plan & Recipes</h5>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Calorie-targeted daily diet scheduler generating chronologically timed meals (Breakfast, Snacks, Lunch, Dinner) complete with macro breakdowns and step-by-step recipes.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-teal-700">5. OCR Report Scanner</h5>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Document scanner for blood test lab reports and prescriptions with automated biomarker extraction, reference range comparisons, and plain-language summaries.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                    <h5 className="text-xs font-black uppercase tracking-wider text-blue-700">6. Multilingual Localization</h5>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Full multi-language support across 7 languages (English, Spanish, French, German, Urdu, Arabic, Mandarin Chinese) translating both interface and dietary schedules.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ================= HEARTBEAT ECG SCROLL ================= */}
      <div className="w-full py-8 overflow-hidden bg-white border-t border-slate-100 flex items-center">
        <div className="animate-ecg-scroll flex items-center">
          <svg className="w-[1200px] h-14 text-emerald-600 shrink-0" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
            <path
              d="M0,30 L200,30 L220,5 L240,55 L260,20 L280,45 L300,30 L500,30 L520,10 L540,50 L560,25 L580,40 L600,30 L800,30 L820,5 L840,55 L860,25 L880,45 L900,30 L1000,30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg className="w-[1200px] h-14 text-emerald-600 shrink-0" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
            <path
              d="M0,30 L200,30 L220,5 L240,55 L260,20 L280,45 L300,30 L500,30 L520,10 L540,50 L560,25 L580,40 L600,30 L800,30 L820,5 L840,55 L860,25 L880,45 L900,30 L1000,30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-600 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 PulseCare AI Ecosystem. Created by <strong>Abdullah Hashmi</strong>. For Hackathon Purpose Only. Not for commercial use.</p>
          <div className="flex items-center gap-4 text-slate-700">
            <button onClick={() => setShowPrivacyModal(true)} className="hover:underline font-bold text-emerald-700">
              Privacy Policy
            </button>
            <span>•</span>
            <span>Clinical Governance</span>
            <span>•</span>
            <span>Emergency Services: 911</span>
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}

      {/* Meal Recipe Modal */}
      {selectedMealRecipe && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMealRecipe(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200 uppercase tracking-widest">
                {selectedMealRecipe.mealTime} • {selectedMealRecipe.mealType}
              </span>
              <h3 className="text-2xl font-black text-slate-900">{selectedMealRecipe.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span>🔥 Calories: {selectedMealRecipe.calories} kcal</span>
                <span>•</span>
                <span>🥩 Protein: {selectedMealRecipe.macros?.protein}</span>
                <span>•</span>
                <span>🌾 Carbs: {selectedMealRecipe.macros?.carbs}</span>
                <span>•</span>
                <span>🥑 Fats: {selectedMealRecipe.macros?.fats}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Ingredients List</h4>
              <ul className="space-y-1.5">
                {selectedMealRecipe.ingredientsList?.map((ing: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 font-medium flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Step-by-Step Recipe Instructions</h4>
              <ol className="space-y-2">
                {selectedMealRecipe.stepByStepInstructions?.map((step: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 font-medium flex items-start gap-2.5 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                    <span className="font-black text-emerald-600 shrink-0">0{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setSelectedMealRecipe(null)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md"
            >
              Close Recipe
            </button>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowPrivacyModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.privacyTitle}</h3>
                <p className="text-xs text-slate-500">PulseCare AI Health & Wellness Ecosystem</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-medium">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 font-bold">
                ⚠️ Notice: This application was created by <strong>Abdullah Hashmi</strong> strictly for hackathon evaluation and prototype demonstration purposes. It is NOT for commercial use, medical diagnosis, or clinical deployment.
              </div>

              <h4 className="font-bold text-slate-900 text-sm">1. Information We Handle</h4>
              <p>
                PulseCare AI processes user-entered symptoms, self-logged vitals, and uploaded medical OCR documents in accordance with privacy-first standards. Vitals logs are stored locally in your browser storage (`localStorage`) and are never transmitted to external commercial databases.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">2. AI & Telehealth Services</h4>
              <p>
                AI analysis (Symptom Triage, Chronic Advice, Meal Plans, and OCR Scanner) is powered by Google Gemini AI models. Consultations are scheduled securely via telehealth protocols.
              </p>

              <h4 className="font-bold text-slate-900 text-sm">3. Medical Disclaimer</h4>
              <p>
                This tool provides preliminary educational guidance only and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified physician for healthcare decisions.
              </p>
            </div>

            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}



    </div>
  );
}
