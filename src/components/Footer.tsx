import { forwardRef } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { asset } from "../lib/defaults";
import { resolveImage } from "../lib/images";

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
