// Attractions grouped by district key (see laoProvinces.js for the
// province -> district structure this cross-references). A district only
// appears as a clickable pill in ProvinceSelector.vue if it has at least one
// entry here -- this is the single source of truth for "does this district
// have any historical or tourist sites," not a separate flag.
//
// `image` is a real local photo where one exists in public/images/, or
// `null` to fall back to a tinted placeholder card (see the .attraction-card
// styles in pages/destinations/index.vue) -- same pattern index.vue already
// uses for bestOfLaos entries without dedicated photography.
//
// Display names/types are never hardcoded here: they live in locales/*.json
// under attractions.<key>.name and attractions.types.<type>, resolved with
// $t() where this data is consumed.
export const laoAttractions = {
  chanthabuly: [
    { key: 'patuxay', image: '/images/patuxay.jpeg', type: 'monument' },
    { key: 'thatLuang', image: '/images/phathartlaung.jpeg', type: 'heritage' }
  ],
  sikhottabong: [
    { key: 'watSokPaLuang', image: null, type: 'temple' }
  ],
  hadxaifong: [
    { key: 'buddhaPark', image: null, type: 'monument' }
  ],

  luangPrabangTown: [
    { key: 'watXiengThong', image: null, type: 'temple' },
    { key: 'kuangSiWaterfall', image: '/images/Tardkaungse.png', type: 'nature' }
  ],
  pakOu: [
    { key: 'pakOuCaves', image: null, type: 'nature' }
  ],
  nambak: [
    { key: 'muangNgoi', image: '/images/Muaengngoy.jpg', type: 'nature' }
  ],

  champasakTown: [
    { key: 'watPhou', image: '/images/Wat-Phu-Laos.jpg', type: 'heritage' }
  ],
  khong: [
    { key: 'khonePhapheng', image: '/images/khonephapheng.jpg', type: 'nature' }
  ],
  paksong: [
    { key: 'tadFaneWaterfall', image: null, type: 'nature' }
  ],

  thakhek: [
    { key: 'kongLorCave', image: '/images/Muaengfuaeng.webp', type: 'nature' }
  ],

  anouvong: [
    { key: 'phaXaiViewpoint', image: null, type: 'nature' }
  ],

  phongsalyTown: [
    { key: 'phouFaStupa', image: null, type: 'temple' }
  ],
  namthaTown: [
    { key: 'namHaProtectedArea', image: null, type: 'nature' }
  ],
  xayTown: [
    { key: 'phouThatTemple', image: null, type: 'temple' }
  ],
  houayxay: [
    { key: 'goldenTriangleViewpoint', image: null, type: 'nature' }
  ],
  viengxay: [
    { key: 'viengxayCaves', image: null, type: 'heritage' }
  ],
  xayabouryTown: [
    { key: 'elephantFestivalGrounds', image: null, type: 'culture' }
  ],
  phonsavan: [
    { key: 'plainOfJars', image: null, type: 'heritage' }
  ],
  vangVieng: [
    { key: 'tamChangCave', image: '/images/hero-bg.jpg', type: 'nature' },
    { key: 'blueLagoon', image: null, type: 'nature' }
  ],
  paksan: [
    { key: 'phouKhaoKhouayNpa', image: null, type: 'nature' }
  ],
  kaysonePhomvihane: [
    { key: 'thatIngHang', image: null, type: 'heritage' }
  ],
  salavanTown: [
    { key: 'tadLoWaterfall', image: null, type: 'nature' }
  ],
  lamam: [
    { key: 'xeSapNpa', image: null, type: 'nature' }
  ],
  samakhixay: [
    { key: 'tadSamongphak', image: null, type: 'nature' }
  ]
}
