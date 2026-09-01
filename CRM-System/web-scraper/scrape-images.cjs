import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, 'green_discovery_images');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ຟັງຊັນດາວໂຫຼດຮູບດ້ວຍ Native Fetch (ຮອງຮັບ Node 18+)
async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`❌ ດາວໂຫຼດພາດ: ${url} (${error.message})`);
    return false;
  }
}

(async () => {
  console.log('🚀 ກຳລັງເປີດ Browser ຈຳລອງ (Puppeteer)...');
  // ເປີດ Chrome ຈຳລອງ
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // ຕັ້ງຄ່າໜ້າຈໍໃຫ້ໃຫຍ່ ແລະ ປອມຕົວເປັນ Browser ປົກກະຕິ
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  console.log('🌐 ກຳລັງເຂົ້າໜ້າເວັບ...');
  // ລໍຖ້າຈົນກວ່າໜ້າເວັບຈະໂຫຼດ Network ສຳເລັດ
  await page.goto('//https://www.mitforklift.com/en/eu/forklift-downloads/', { waitUntil: 'networkidle2', timeout: 60000 });

  console.log('📜 ກຳລັງເລື່ອນໜ້າຈໍເພື່ອໂຫຼດຮູບ (Lazy Loading Bypass)...');
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        // ຖ້າເລື່ອນຈົນສຸດໜ້າແລ້ວ ໃຫ້ຢຸດ
        if(totalHeight >= scrollHeight - window.innerHeight){
          clearInterval(timer);
          resolve();
        }
      }, 300); // ຄວາມໄວໃນການເລື່ອນ
    });
  });

  // ລໍຖ້າໃຫ້ຮູບໂຫຼດສຳເລັດຫຼັງຈາກເລື່ອນ
  await new Promise(r => setTimeout(r, 2000));

  console.log('🔍 ກຳລັງສະກັດເອົາລິ້ງຮູບພາບ...');
  const imageUrls = await page.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll('img').forEach(img => {
      // ດຶງລິ້ງແທ້ຈາກ src ຫຼື attribute ອື່ນໆ
      const src = img.src || img.getAttribute('data-src');
      if (src && src.startsWith('http')) {
        urls.add(src);
      }
    });
    return Array.from(urls);
  });

  console.log(`พົບຮູບທັງໝົດ ${imageUrls.length} ຮູບ, ເລີ່ມດາວໂຫຼດ...`);

  let count = 0;
  for (const url of imageUrls) {
    count++;
    try {
      const parsedUrl = new URL(url);
      let ext = path.extname(parsedUrl.pathname).split('?')[0];
      if (!ext || ext.length > 5) ext = '.jpg';
      
      // ສ້າງຊື່ໄຟລ໌ໃຫ້ປອດໄພ
      const filename = `gd_image_${count}${ext}`;
      const filepath = path.join(OUTPUT_DIR, filename);

      await downloadImage(url, filepath);
      console.log(`[${count}/${imageUrls.length}] ດາວໂຫຼດແລ້ວ: ${filename}`);
    } catch (e) {
      console.error(`ຂ້າມ: ${url}`);
    }
  }

  await browser.close();
  console.log(`\n🎉 ສຳເລັດການວິເຄາະ ແລະ ດາວໂຫຼດ! ກວດເບິ່ງທີ່ໂຟນເດີ: ${OUTPUT_DIR}`);
})();