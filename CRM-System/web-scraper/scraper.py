import os
import requests

def download_royalty_free_images(query="forklift", num_images=5, folder_name="rental_assets"):
    # ສ້າງໂຟນເດີສຳລັບເກັບຮູບພາບ
    os.makedirs(folder_name, exist_ok=True)
    
    # ປ່ຽນ YOUR_API_KEY ເປັນລະຫັດທີ່ໄດ້ຈາກ Pexels
    API_KEY = "W29e3xz0SMXCnELeDwi0ydh3dMLf3w8lwgHEuV2mxaLKlxzGfoDWb1K3"
    url = f"https://api.pexels.com/v1/search?query={query}&per_page={num_images}"
    
    headers = {
        "Authorization": API_KEY
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        photos = data.get("photos", [])
        
        if not photos:
            print(f"ບໍ່ພົບຮູບພາບສຳລັບຄຳຄົ້ນຫາ: {query}")
            return
            
        print(f"ພົບຮູບພາບທັງໝົດ {len(photos)} ຮູບ")
        
        for index, photo in enumerate(photos):
            # ສາມາດປ່ຽນຂະໜາດຮູບໄດ້: original, large, medium, small
            img_url = photo["src"]["large"] 
            img_data = requests.get(img_url).content
            
            # ຕັ້ງຊື່ໄຟລ໌ຕາມຄຳຄົ້ນຫາ
            file_name = os.path.join(folder_name, f"{query.replace(' ', '_')}_{index + 1}.jpg")
            
            with open(file_name, 'wb') as f:
                f.write(img_data)
            print(f"✅ ດາວໂຫຼດສຳເລັດ: {file_name}")
            
    except Exception as e:
        print(f"❌ ເກີດຂໍ້ຜິດພາດ: {e}")

# ທົດລອງດຶງຮູບພາບສຳລັບລະບົບເຊົ່າ
download_royalty_free_images(query="forklift", num_images=10)
download_royalty_free_images(query="heavy machinery", num_images=5)
download_royalty_free_images(query="engine parts", num_images=5)