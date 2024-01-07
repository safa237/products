import { createSlice } from '@reduxjs/toolkit';

const translationSlice = createSlice({
  name: 'translation',
  initialState: {
    language: 'english', 
    translations: {
      "english": {
        "home" : "Home",
        "store" : "Store",
        "about" : "About Us",
        "brand" : "International brands",
        "blog" : "Blog",
        "contact" : "Contact Us",
        "new" : "What's new",
        "discover" : "Discover everything new",
        "detailsbtn" : "details",
        "links" : "Important links",
        "shipping" : "Shipping Information To ensure your purchases arrive safely, please be sure to provide",
        "private" : "Private Policy",
        "cookies" : "cookies Policy",
        "info" : "Delivery Information",
        "contactP" : "Contact us for any inquiries or assistance you require, we are here to provide support and advice",
        "subscribe" : "Subscribe to AdobeXD via Email",
        "login" : "Sign In",
        "register" : "Sign Up",
        "newhere" : "New Here ?",
        "welcome" : "Welcome, we are glad you visited our website",
        "oneofus" : "One Of Us",
      },
      "french": {
        "home" : "Maison",
        "store" : "Magasin",
        "about" : "A propos de nous",
        "brand" : "Marques internatio",
        "blog" : "Blog",
        "contact" : "Contactez nous",
        "new" : "quoi de neuf",
        "discover" : "Découvrez tout ce qui est nouveau",
        "detailsbtn" : "détails",
        "links" : "Liens importants",
        "shipping" : "Informations d'expédition Pour garantir que vos achats arrivent sans problème, assurez-vous de fournir",
        "private" : "Politique privée",
        "cookies" : "Politique de cookies",
        "info" : "Informations sur la livraison",
        "contactP" : "Contactez-nous pour toute demande de renseignements ou d'assistance dont vous avez besoin, nous sommes là pour vous fournir soutien et conseils",
        "subscribe" : "Abonnez-vous à AdobeXD par e-mail",
        "login" : "se connecter",
        "register" : "registre",
        "newhere" : "Nouveau ici ?",
        "welcome" : "Bienvenue, nous sommes heureux que vous ayez visité notre site Web",
        "oneofus" : "Un de nous",
    },
      "arabic": {
        "home" : "المتجر",
        "store" : "المخزن",
        "about" : "معلومات عنا",
        "brand" : "ماركات عالمية",
        "blog" : "المدونه",
        "contact" : "تواصل معنا",
        "new" : "ما الجديد",
        "new" : "اكتشف كل ما هو جديد",
        "detailsbtn" : "تفاصيل",
        "links" : "روابط مهمه",
        "shipping" : "معلومات الشحن لضمان وصول مشترياتك بأمان، يرجى التأكد من تقديمها",
        "private" : "سياسة خاصة",
        "cookies" : "اتفاقيات تعريف الارتباط",
        "info" : "معلومات التوصيل",
        "contactP" : "اتصل بنا للحصول على أية استفسارات أو مساعدة تحتاجها، فنحن هنا لتقديم الدعم والمشورة",
        "subscribe" : "اشترك في AdobeXD عبر البريد الإلكتروني",
        "login" : "تسجيل دخول",
        "register" : "انشاء حساب",
        "newhere" : "جديد هنا ؟",
        "welcome" : "مرحباً بك، نحن سعداء بزيارتك لموقعنا",
        "oneofus" : "واحد منا",
      }
    },
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = translationSlice.actions;

export const selectLanguage = (state) => state.translation.language;
export const selectTranslations = (state) => state.translation.translations;

export default translationSlice.reducer;
