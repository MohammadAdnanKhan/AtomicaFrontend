import { PhoneCall, MessageSquareText, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const contacts = [
  { label: 'WhatsApp & Call', number: '9629388282', whatsapp: true },
  { label: 'WhatsApp & Call', number: '7397323948', whatsapp: true },
  { label: 'WhatsApp & Call', number: '9840964414', whatsapp: true },
  { label: 'WhatsApp & Call', number: '7395918843', whatsapp: true },
];

function Contact() {
  return (
    <section className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500 overflow-hidden">
      {/* Hero */}
      <div className="grain relative bg-wash-light dark:bg-wash-dark border-b hairline">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            Get in touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-heading text-5xl md:text-7xl font-semibold leading-[1.02] tracking-[-0.02em]"
          >
            Let’s <span className="em-serif">talk</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg md:text-xl max-w-2xl text-light-secondary dark:text-dark-secondary leading-relaxed"
          >
            Whether it's admissions, careers, or questions — we're just a call or message away.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-5 gap-14">
        {/* Phone list */}
        <div className="lg:col-span-3">
          <span className="eyebrow">Reach us directly</span>
          <ul className="mt-7 border-t hairline">
            {contacts.map((c, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="border-b hairline py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs uppercase tracking-eyebrow text-light-secondary dark:text-dark-secondary mb-1">
                    {c.label}
                  </div>
                  <div className="font-heading text-2xl md:text-3xl font-semibold text-light-primary dark:text-dark-primary tracking-tight">
                    +91 {c.number}
                  </div>
                </div>
                <div className="flex gap-3">
                  {c.whatsapp && (
                    <a
                      href={`https://wa.me/91${c.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-light-secondary/25 dark:border-white/15 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition"
                    >
                      <MessageSquareText size={17} />
                      WhatsApp
                    </a>
                  )}
                  <a
                    href={`tel:+91${c.number}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-light-surface dark:text-dark-background bg-light-primary dark:bg-dark-primary hover:-translate-y-0.5 transition shadow-soft"
                  >
                    <PhoneCall size={17} />
                    Call
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="rounded-[1.4rem] border hairline p-8 bg-light-surface dark:bg-dark-surface shadow-soft h-full">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-light-primary dark:bg-dark-primary text-light-surface dark:text-dark-background mb-5">
              <MapPin size={22} />
            </span>
            <h3 className="font-heading text-xl font-semibold mb-3">Office Address</h3>
            <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
              Old No 10, New No 14, Muthuthottam, 2nd Street,
              <br />
              Kodambakkam, Chennai, Tamil Nadu, India
              <br />
              Pin Code — 600 024
            </p>
            <p className="mt-6 text-sm font-heading italic text-light-primary dark:text-dark-primary">
              We’re excited to hear from you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
