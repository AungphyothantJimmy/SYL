import { forwardRef } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

function TikTokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const { data } = useContent();
  const { settings } = data;

  return (
    <div ref={ref} className="w-full bg-[#111827] text-white">
      <footer className="bg-[#111827] py-16 px-6 md:px-20 text-gray-300 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <div className="w-full">
            <div>
              <img
                src={resolveImage(settings.footer_logo_url, asset("logo.jpg"))}
                alt={`${settings.store_name} Logo`}
                className="h-20 w-20 object-cover rounded-full border-2 border-white shadow-md mb-6"
              />
            </div>

            <p className="text-gray-400 mb-6 max-w-md whitespace-pre-line">
              {settings.footer_description}
            </p>

            <div className="flex space-x-6 text-gray-400 text-xl mt-4">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  aria-label="Facebook"
                >
                  <Facebook size={46} />
                </a>
              )}

              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  aria-label="Instagram"
                >
                  <Instagram size={46} />
                </a>
              )}

              {settings.tiktok_url && (
                <a
                  href={settings.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={46} />
                </a>
              )}
            </div>
          </div>

          <div className="w-full">
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">
              Contact Info
            </h3>
            <ul className="space-y-4 text-gray-400">
              {settings.contact_address && (
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span className="whitespace-pre-line">
                    {settings.contact_address}
                  </span>
                </li>
              )}

              {settings.contact_phone && (
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="shrink-0" />
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="hover:text-white transition"
                  >
                    {settings.contact_phone}
                  </a>
                </li>
              )}

              {settings.contact_email && (
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="shrink-0" />
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="hover:text-white transition"
                  >
                    {settings.contact_email}
                  </a>
                </li>
              )}

              {settings.contact_hours && (
                <li className="flex items-start space-x-3">
                  <Clock size={18} className="mt-0.5 shrink-0" />
                  <span className="whitespace-pre-line">
                    {settings.contact_hours}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Footer;
