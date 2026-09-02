// The 18 first-level administrative divisions of Laos (Vientiane Capital +
// 17 provinces). Each lists a short, curated set of districts/villages
// notable for tourism -- not the full administrative district list -- since
// this only feeds the homepage's "Explore by Province" selector. Display
// names are never hardcoded here: they live in locales/*.json under
// provinces.<key>.name / provinces.<key>.districts.<districtKey>, resolved
// with $t() in ProvinceSelector.vue.
//
// Order is deliberate, not alphabetical/administrative: the top 5 tourist
// draws (Vientiane Capital, Luang Prabang, Champasak, Khammuane,
// Xaysomboun) lead so they're visible without scrolling the carousel, then
// the remaining 13 follow in their original administrative-list order.
export const laoProvinces = [
  { key: 'vientianeCapital', districts: [{ key: 'chanthabuly' }, { key: 'sikhottabong' }, { key: 'hadxaifong' }] },
  { key: 'luangPrabang', districts: [{ key: 'luangPrabangTown' }, { key: 'chomphet' }, { key: 'pakOu' }, { key: 'nambak' }] },
  { key: 'champasak', districts: [{ key: 'pakse' }, { key: 'champasakTown' }, { key: 'khong' }, { key: 'paksong' }] },
  { key: 'khammuane', districts: [{ key: 'thakhek' }, { key: 'boualapha' }] },
  { key: 'xaysomboun', districts: [{ key: 'anouvong' }, { key: 'longcheng' }] },
  { key: 'phongsaly', districts: [{ key: 'phongsalyTown' }, { key: 'bounNeua' }, { key: 'bounTai' }] },
  { key: 'luangNamtha', districts: [{ key: 'namthaTown' }, { key: 'muangSing' }, { key: 'viengPhoukha' }] },
  { key: 'oudomxay', districts: [{ key: 'xayTown' }, { key: 'beng' }, { key: 'laDistrict' }] },
  { key: 'bokeo', districts: [{ key: 'houayxay' }, { key: 'tonpheung' }, { key: 'meungDistrict' }] },
  { key: 'huaphanh', districts: [{ key: 'xamNeua' }, { key: 'viengxay' }] },
  { key: 'xayaboury', districts: [{ key: 'xayabouryTown' }, { key: 'hongsa' }] },
  { key: 'xiengkhuang', districts: [{ key: 'phonsavan' }, { key: 'khoun' }] },
  { key: 'vientianeProvince', districts: [{ key: 'vangVieng' }, { key: 'feuang' }, { key: 'kasi' }] },
  { key: 'borikhamxay', districts: [{ key: 'paksan' }, { key: 'khamkeut' }] },
  { key: 'savannakhet', districts: [{ key: 'kaysonePhomvihane' }, { key: 'xepon' }] },
  { key: 'salavan', districts: [{ key: 'salavanTown' }, { key: 'taoy' }] },
  { key: 'sekong', districts: [{ key: 'lamam' }, { key: 'dakcheung' }] },
  { key: 'attapeu', districts: [{ key: 'samakhixay' }, { key: 'sanxay' }] }
]
