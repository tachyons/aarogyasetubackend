
const MAX_COLUMNS = 3;

const mediaConfig = language => ({
  maxColumns: MAX_COLUMNS,
  sections: [
    {
      display_title: language.mediaTab.trendingNow,
      id: 'trending',
      items_in_master_list: 1,
      data: [
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/kLxTPzC7lEI',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/kLxTPzC7lEI-small.jpg',
          display_title: '#MaskForce | Join the Fight!',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://www.youtube.com/embed/ODJwrhjom-0',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/ODJwrhjom-0-medium.jpg', // TBD
          display_title: 'Mask Pehno, #CoronaSoldier Bano: Mask ka Vaar Corona ki Haar',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://www.youtube.com/embed/yeg5iOuNh0s',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/yeg5iOuNh0s-small.jpg', // TBD
          display_title:
          'Our battle with COVID-19 is not over, we will take precautions and move on | Akshay Kumar | #IndiaWillWin',
        },
        
        
      ],
    },
    {
      display_title: 'What Will App Do',
      items_in_master_list: 2,
      data: [
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/phc1UAQQ81s',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/phc1UAQQ81s.jpg',
          display_title: 'Aarogya Setu App Guide | 11 Languages',
          lang: {
            hi: {
              url: 'https://www.youtube.com/embed/S6_Zd4gE4Z4',
              display_title: '',
            },
            gu: {
              url: 'https://www.youtube.com/embed/HRZqMfKqCzU',
              display_title: '',
            },
            ka: {
              url: 'https://www.youtube.com/embed/3NmVJOP1TFg',
              display_title: '',
            },
            te: {
              url: 'https://www.youtube.com/embed/uCzrpOnDDZM',
              display_title: '',
            },
            od: {
              url: 'https://www.youtube.com/embed/RIYvqHlg1s8',
              display_title: '',
            },
            ta: {
              url: 'https://www.youtube.com/embed/lMLMb8W2FKs',
              display_title: '',
            },
            ma: {
              url: 'https://www.youtube.com/embed/73KeumvdXSM',
              display_title: '',
            },
            mal: {
              url: 'https://www.youtube.com/embed/ecIIes-IV0I',
              display_title: '',
            },
            ba: {
              url: 'https://www.youtube.com/embed/Yug08fZrUb0',
              display_title: '',
            },
            pu: {
              url: 'https://www.youtube.com/embed/9ThyNC-wwoY',
              display_title: '',
            },
          },
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/S1gezSMkL-s',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/S1gezSMkL-small.jpg',
          display_title: 'Aarogya Setu | Green Color: What does it signify?',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/RHOWgsw_acw',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/RHOWgsw_acw-small.jpg',
          display_title: 'Aarogya Setu | Yellow Color: What does it signify?',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/exq7PmaZp3A',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/exq7PmaZp3A-small.jpg',
          display_title: 'Aarogya Setu | Orange Color: What does it signify?',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/NBleonLgVoY',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/NBleonLgVoY-small.jpg',
          display_title: 'Aarogya Setu | Red Color: What does it signify?',
        },
        
      ],
    },
    {
      display_title: 'Advice From Doctors',
      items_in_master_list: 2,
      data: [
        { 
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/2Iwzdbam9UM',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/2Iwzdbam9UM-small.jpg',
          display_title: 'जानिए, मास्क लगाना, हाथ धोना और सोशल डिस्टेंसिंग क्यों जरूरी है',
        },
        { 
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/nt2fqOPprfU',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/nt2fqOPprfU-small.jpg',
          display_title: 'Mental health is an integral part of health ',
        },
        { 
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/JXobDg2Fpn4',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/JXobDg2Fpn4-small.jpg',
          display_title: 'एम्स के निदेशक डॉ. रणदीप गुलेरिया से जानिए क्या है #COVID-19',
        },
       
      ],
    },
    {
      display_title: 'How to Boost Immunity',
      items_in_master_list: 2,
      data: [
        
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/qWvb9LPgHiU',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/qWvb9LPgHiU-small.jpg',
          display_title: 'Detecting Rhodamine B Adulteration in Sweet Potato',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/7000VF7dS18',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/7000VF7dS18-small.jpg',
          display_title: 'स्‍वास्‍थ्‍य की नियमित जाँच जरुरी | #PoshanMaah2020',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/mBaKpcpRKVI',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/mBaKpcpRKVI-small.jpg',
          display_title: 'Tahiree Pulao by Suvir Saran | #PoshanMaah2020',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/SL2Fm1tO5Ng',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/SL2Fm1tO5Ng-small.jpg',
          display_title: 'SAGPAITHA by MALINI AWASTHI #PoshanMaah2020',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/mMKOKTjWChY',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/mMKOKTjWChY-small.jpg',
          display_title: 'शिशु के साथ मां की सेहत की देखभाल भी सबसे जरूरी | #PoshanMaah2020',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/QBmZB_dXass',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/QBmZB_dXass-small.jpg',
          display_title: 'Ayush for immunity',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '166',
          url: 'https://www.youtube.com/embed/J_Ze8h01Qxc',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/J_Ze8h01Qxc-small.jpg',
          display_title: 'Strengthen your immunity and fight off COVID-19',
        },
               
      ],
    },
    
    {
      display_title: 'Learning Centre',
      items_in_master_list: 2,
      data: [
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/EySx7v8isT8',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/EySx7v8isT8-small.jpg',
          display_title: 'लापरवाही बना सकती है आपको कोरोना का शिकार',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/usUGmiugtOk',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/usUGmiugtOk-small.jpg',
          display_title: 'COVID के विरुद्ध जनांदोलन, महामारी से बचाव के लिए अपनाएं 5 स्वच्छ आदतें #IndiaFightsCorona',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/AS_BSUUM7G0',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/AS_BSUUM7G0-small.jpg',
          display_title: 'आइये त्योहारों के मौसम में कोविड अनुरूप व्यवहार अपनाने की शपथ लें ',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/cqvVhPXK54YE',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/cqvVhPXK54YE-small.jpg',
          display_title: 'Wear Face Masks & Maintain Social Distancing',
        },
       
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/hHuI2xiSrFs',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/hHuI2xiSrFs-small.jpg',
          display_title: '#IndiaFightsCorona - सभी की सुरक्षा के लिए, सही जानकारी दें',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/ZoZOB8JCJQk',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/ZoZOB8JCJQk-small.jpg',
          display_title: 'Adopt COVID Appropriate Behaviour',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/P3mCIgJCVxM',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/P3mCIgJCVxM-small.jpg',
          display_title: 'Dos & Donts For Using Public Transportation',
        },
       
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/_ZdYHfdb8eQ',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/ZdYHfdb8eQ-small.jpg',
          display_title: 'Proper Cleaning & Disinfection Practices | #IndiaFightsCorona',
        },
        
       
      ],
    },
    {
      display_title: 'Together We Can',
      items_in_master_list: 2,
      data: [
        
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/XayPUiNa9rA',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/XayPUiNa9rA-medium.jpg',
          display_title: 'How To Stop Social Stigma',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/UqWgqKEXK6Y',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/UqWgqKEXK6Y-medium.jpg',
          display_title: 'हम एकसाथ मिलकर Covid-19 को हराएंगे',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/g2guAMMKboI',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/g2guAMMKboI-medium.jpg',
          display_title: 'COVID-19 के विरुद्ध जनांदोलन - सतर्क रहें, सुरक्षित रहें',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/ePhDOnzAey4',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/ePhDOnzAey4-medium.jpg',
          display_title: '“Waqt Hi Toh Hai, Guzar Jayega…”, A beautiful poem on COVID-19',
        },
       
        
      ],
    },
    
    {
      display_title: 'Corona Soldiers',
      items_in_master_list: 2,
      data: [
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/axTq9MUn37E',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/axTq9MUn37E-small.jpg',
          display_title: 'मास्क पहनो #CoronaSoldier बनो',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/lOoMK_efwEw',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/lOoMK_efwEw-small.jpg',
          display_title: 'अपनी जिम्मेदारी निभाएं और मास्क पहन कर देश में कोरोना को हराएं।',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/DCOUqI_nwNc',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/DCOUqI_nwNc-small.jpg',
          display_title: 'हमने मास्क पहना है आप भी पहनिए',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/6zvD2-olwMw',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/6zvD2-olwMw-small.jpg',
          display_title: 'कोरोना से लड़िए  मास्क पहनिए',
        },
      ],
    },
    {
      display_title: '#MannKiBaat',
      items_in_master_list: 2,
      data: [
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/QoEg01SvdgQ',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/QoEg01SvdgQ-small.jpg',
          display_title: 'Do Gaj Ki Doori, Mask Zaroori',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/JU77T2vdlqg',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/JU77T2vdlqg-small.jpg',
          display_title: 'हमारे वीर जवान भले ही सीमा पर हैं, लेकिन पूरा देश उनके साथ है',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/C3-4JYKNars',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/C3-4JYKNars-small.jpg',
          display_title: 'भूलिए मत, वायरस अभी नहीं गया है',
        },
      
      ],
    },
    {
      display_title: 'Celebrity Videos',
      items_in_master_list: 2,
      data: [
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/vFaFmJt9xKo',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/vFaFmJt9xKo-small.jpg',
          display_title: 'Aarogya Setu App | Ajay Devgan | #SetuMeraBodyguard',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/kLxTPzC7lEI',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/kLxTPzC7lEI-small.jpg',
          display_title: '#MaskForce | Join the Fight!',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/CQ4ZBPM9W-4',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/CQ4ZBPM9W-4-small.jpg',
          display_title: 'Beautiful Message by Shri. Amitabh Bachchan | Memories',
        },
        
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/VIApASANFaw',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/VIApASANFaw-small.jpg',
          display_title: 'Aarogya Setu App | Nirahua | #SetuMeraBodyguard',
        },
        {
          type: 'video',
          colspan: MAX_COLUMNS / 2,
          height: '192',
          url: 'https://www.youtube.com/embed/3u5dywz_WSg',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/3u5dywz_WSg-small.jpg',
          display_title:
            'Anuj Sharma | Chattisgarhi Star Actor | Aarogya Setu App | #SetuMeraBodygard',
        },
        
        
      ],
    },
    {
      display_title: 'Download Centre',
      items_in_master_list: 2,
      data: [
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/Guidelines-for-Re-opening_English.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/reopening.jpg',
          display_title: 'Guidelines for Reopening',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/Guidelines-for-Re-opening_Hindi-min.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOPs_preventive_Measures_Films_e.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/films.jpg',
          display_title: 'SOPs on Preventive Measures for Exhibition of Films',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOPs_Preventive_Measures_Films_H.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOPs_for_Festivities_e.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/festivals.jpg',
          display_title: 'SOPs for Festivities',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOPs_for_Festivities_hindi.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/eng-SOP-for-Schools.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/sop-eng.jpeg',
          display_title: 'SOP for Partial Reopening of Schools on Voluntary Basis',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/Hindi-SOP-for-Schools.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-Higher-Education-Institutions.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/sop-hei.jpeg',
          display_title: 'SOP for Skill Training Institutions and HEIs',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-For-Media-Production.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/sop-media.jpg',
          display_title: 'SOP for Media Production',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/hindi-sop-media.pdf',
              display_title: '',
            },
          },
        },
        
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/MyGov-Unlock4.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/lock4.jpg',
          display_title: 'Guidelines for Unlock 4.0',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/Guidelines-for-Yoga-Gym-Institutes.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/gym.jpg',
          display_title: 'Preventive Guidelines for Yoga and Gym Institutes',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/Guidelines-for-International-Arrivals.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/arrival-medium.jpg',
          display_title: 'Guidelines for International Arrivals',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/New-Normal-Etiquettes.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/normal-medium.jpg',
          display_title: 'New Normal Etiquettes',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/Aarogya_Setu_Color_English.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/Aarogya_Setu_Color_English.jpg',
          display_title: 'Significance of Various Colors on the Home Screen of Aarogya Setu App',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/Aarogya_Setu_Color_Hindi.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/COVIDKATHA.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/COVIDKATHA.jpg',
          display_title: '#COVIDKATHA',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Offices-en.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/SOP-for-Offices.jpg',
          display_title: 'Standard Operating Procedure for Offices',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Offices-hi.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Shopping-Malls.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/SOP-for-Shopping-Malls.jpg',
          display_title: 'Standard Operating Procedure for Shopping Malls',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Shopping-Malls-hi.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url: 'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Hotels.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/SOP-for-Hotels.jpg',
          display_title: 'Standard Operating Procedure for Hotels and Hospitality Units',
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Religious-Places.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/SOP-for-Religious-Places.jpg',
          display_title: 'Standard Operating Procedure for Religious Places',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Religious-Places-hi.pdf',
              display_title: '',
            },
          },
        },
        {
          type: 'link',
          colspan: MAX_COLUMNS,
          height: '192',
          url:
            'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Restaurant.pdf',
          thumbnail:
            'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/SOP-for-Restaurant.jpg',
          display_title: 'Standard Operating Procedure for Restaurants',
          lang: {
            hi: {
              url:
                'https://static1.swaraksha.gov.in/public/assets/media/downloads/SOP-for-Restaurant-hi.pdf',
              display_title: '',
            },
          },
        },
        
      ],
    },
  ],
});

export default mediaConfig;
