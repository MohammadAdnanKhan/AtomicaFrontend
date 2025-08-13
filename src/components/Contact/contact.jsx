import { PhoneCall, MessageSquareText, MapPin } from 'lucide-react';
import React from 'react';

const contacts = [
  {
    label: 'WhatsApp & Call',
    number: '9629388282',
    whatsapp: true,
  },
  {
    label: 'WhatsApp & Call',
    number: '7397323948',
    whatsapp: true,
  },
  {
    label: 'WhatsApp & Call',
    number: '9840964414',
    whatsapp: true,
  },
  {
    label: 'Call Only',
    number: '7395918843',
    whatsapp: false,
  },
];

function Contact() {
  return (
    <section className="min-h-screen px-6 py-16 font-body bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
      <div className="max-w-5xl mx-auto text-center animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-light-primary dark:text-dark-primary">
          Let’s Talk!
        </h2>
        <p className="text-lg md:text-xl text-light-secondary dark:text-dark-secondary mb-12 max-w-2xl mx-auto">
          Whether it's admissions, careers, or questions, we're just a call or message away.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((c, index) => (
            <div
              key={index}
              className="group bg-light-surface dark:bg-dark-surface rounded-xl p-6 shadow-xl border border-light-primary dark:border-dark-primary hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-xl font-semibold font-heading mb-3">
                {c.label}
              </h3>
              <p className="text-2xl font-bold text-light-primary dark:text-dark-primary tracking-wide mb-4">
                +91 {c.number}
              </p>

              <div className="flex justify-center gap-4">
                {c.whatsapp && (
                  <a
                    href={`https://wa.me/91${c.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full shadow-md transition"
                  >
                    <MessageSquareText size={18} />
                    WhatsApp
                  </a>
                )}
                <a
                  href={`tel:+91${c.number}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full shadow-md transition"
                >
                  <PhoneCall size={18} />
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-light-surface dark:bg-dark-surface rounded-xl p-6 shadow-xl border border-light-primary dark:border-dark-primary max-w-2xl mx-auto hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold font-heading mb-4 flex items-center justify-center gap-2">
            <MapPin size={20} className="text-light-primary dark:text-dark-primary" />
            Office Address
          </h3>
          <p className="text-lg text-light-secondary dark:text-dark-secondary leading-relaxed">
            Old No 10, New No 14, Muthuthottam, 2nd Street,<br />
            Kodambakkam, Chennai, Tamil Nadu, India<br />
            Pin Code - 600 024
          </p>
        </div>

        <div className="mt-16 animate-bounce font-heading text-light-secondary dark:text-dark-secondary text-sm">
          We’re excited to hear from you!
        </div>
      </div>
    </section>
  );
}

export default Contact;