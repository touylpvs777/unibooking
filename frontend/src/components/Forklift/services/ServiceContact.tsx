import React from "react";
import { MapPin, PhoneCall, Mail, Building2, ExternalLink } from "lucide-react";

export const ServiceContact = ({ isLo }: { isLo: boolean }) => {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isLo ? "ສູນສ້ອມແປງກາງ & ສຳນັກງານໃຫຍ່" : "Central Workshop & Headquarters"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {isLo ? "ຕິດຕໍ່ ດີເຄ ລາວ ສູນລົດຟອກລີບ 4S" : "Contact DK LAO 4S Hub"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isLo
              ? "ສູນສ້ອມແປງໃຫຍ່ ແລະ ສາງອາໄຫຼ່ OEM ຕັ້ງຢູ່ຖະໜົນກຳແພງເມືອງ (T4) ນະຄອນຫຼວງວຽງຈັນ ພ້ອມໃຫ້ຄຳປຶກສາ ແລະ ຈັດສົ່ງດ່ວນທົ່ວປະເທດ."
              : "Our central workshop and master parts depot is located on Khamphengmeuang Road (T4), Vientiane Capital. Open Monday – Saturday."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {isLo ? "ບໍລິສັດ ດີເຄ ລາວ ຈຳກັດ" : "DK LAO CO., LTD."}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {isLo
                      ? "ຖະໜົນກຳແພງເມືອງ (T4), ບ້ານໜອງໄຮ, ເມືອງຫາດຊາຍຟອງ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ"
                      : "Khamphengmeuang Road (T4), Nonghai Village, Hadsayfong District, Vientiane Capital, Lao PDR"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <PhoneCall className="w-5 h-5 text-slate-500" />
                  <div className="flex-grow">
                    <div className="text-xs text-slate-500 mb-1">{isLo ? "ເບີໂທສູນສ້ອມ & ສຳນັກງານໃຫຍ່" : "Central Workshop & Landlines"}</div>
                    <div className="font-semibold text-slate-900 dark:text-white flex flex-wrap gap-4 text-sm">
                      <a href="tel:+85621480248" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+856 21 480 248</a>
                      <a href="tel:+85621480249" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+856 21 480 249</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <PhoneCall className="w-5 h-5 text-emerald-500" />
                  <div className="flex-grow">
                    <div className="text-xs text-slate-500 mb-1">{isLo ? "ສາຍດ່ວນ Hotline / WhatsApp 24/7" : "Emergency Hotline / WhatsApp 24/7"}</div>
                    <a
                      href="https://wa.me/8562058929299"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline text-base"
                    >
                      +856 20 5892 9299
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <div className="flex-grow">
                    <div className="text-xs text-slate-500 mb-1">{isLo ? "ອີເມວທາງການ (Official Inquiries)" : "Official Email Inquiries"}</div>
                    <div className="font-semibold text-slate-900 dark:text-white flex flex-wrap gap-4 text-sm">
                      <a href="mailto:Salesadmin@dklao.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Salesadmin@dklao.com</a>
                      <a href="mailto:info@dklao.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@dklao.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Image Placeholder */}
          <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl h-[400px] lg:h-full min-h-[400px] overflow-hidden relative border border-slate-300 dark:border-slate-700 shadow-sm group">
            {/* Real embedded Google Map for Vientiane */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121703.95543719875!2d102.53123891460594!3d17.962002364684992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31246870df20c085%3A0xc6c761b6976dcff8!2sVientiane%2C%20Laos!5e0!3m2!1sen!2s!4v1714488390772!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay for map button */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-6 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none">
              <a
                href="https://maps.google.com/?q=Vientiane+Laos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 pointer-events-auto text-sm"
              >
                {isLo ? "ເປີດໃນ Google Maps" : "Open in Google Maps"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
