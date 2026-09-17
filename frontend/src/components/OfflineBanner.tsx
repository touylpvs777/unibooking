import { useEffect, useState } from 'react'

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 z-50 font-bold shadow-md">
      ⚠️ ບໍ່ມີການເຊື່ອມຕໍ່ອິນເຕີເນັດ, ກະລຸນາກວດສອບສັນຍານຂອງທ່ານ. (ລະບົບອາດຈະບໍ່ບັນທຶກຂໍ້ມູນ)
    </div>
  )
}
