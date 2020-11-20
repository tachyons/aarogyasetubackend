 
const MAX_COLUMNS = 2;

const mediaConfigHome = language => ({
  display_title: language.mediaTab.trendingNow,
  items_in_master_list: 3,
  data: [
    
    {
      type: 'video',
      colspan: MAX_COLUMNS,
      height: '166',
      url: 'https://www.youtube.com/embed/kLxTPzC7lEI',
      thumbnail:
        'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/kLxTPzC7lEI-medium.jpg',
      display_title: '#MaskForce | Join the Fight!',
    },
    {
      type: 'video',
      colspan: MAX_COLUMNS /2, 
      height: '166',
      url: 'https://www.youtube.com/embed/ODJwrhjom-0',
      thumbnail:
        'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/ODJwrhjom-0-medium.jpg', // TBD
      display_title: 'Mask Pehno, #CoronaSoldier Bano: Mask ka Vaar Corona ki Haar',
    },
    {
      type: 'video',
      colspan: MAX_COLUMNS /2, 
      height: '166',
      url: 'https://www.youtube.com/embed/yeg5iOuNh0s',
      thumbnail:
        'https://static1.swaraksha.gov.in/public/assets/media/thumbnails/yeg5iOuNh0s-medium.jpg', // TBD
      display_title: 'Our battle with COVID-19 is not over, we will take precautions and move on | Akshay Kumar | #IndiaWillWin',
    },
  ],
});
export default mediaConfigHome;
