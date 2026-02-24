import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
    EN: {
        nav_home: "Home",
        nav_notices: "Notices",
        nav_complaints: "Complaints",
        nav_login: "Login",
        nav_logout: "Logout",
        gram_panchayat: "Gram Panchayat",
        hero_title: "Digital Gram Panchayat",
        hero_subtitle: "Connecting villages with transparent governance",
        btn_notices: "View Notices",
        btn_complaint: "File Complaint"
    },
    MR: {
        nav_home: "मुख्यपृष्ठ",
        nav_notices: "सूचना",
        nav_complaints: "तक्रारी",
        nav_login: "लॉगिन",
        nav_logout: "लॉगआउट",
        gram_panchayat: "ग्रामपंचायत",
        hero_title: "डिजिटल ग्रामपंचायत",
        hero_subtitle: "पारदर्शक कारभारातून गावांना जोडत आहे",
        btn_notices: "सूचना पहा",
        btn_complaint: "तक्रार नोंदवा"
    }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('app_lang') || 'EN';
    });

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
    }, [lang]);

    const t = (key) => {
        return translations[lang]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
