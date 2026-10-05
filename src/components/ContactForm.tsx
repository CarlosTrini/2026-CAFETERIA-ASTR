import React, { useState } from 'react';
import { faqs } from '../content/data-faq';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    // Para mensaje de WhatsApp
    const serviceLabels: Record<string, string> = {
      general: 'Consulta General / Información',
      takeout: 'Pedido para Llevar (Takeout)',
      special: 'Información para Eventos',
    };

    const text = `¡Hola Komorebi Café! 🌸\n\n*Nombre:* ${formData.name}\n*Teléfono:* ${formData.phone || 'No especificado'}\n*Motivo:* ${serviceLabels[formData.serviceType] || 'Consulta'}\n*Mensaje:* ${formData.message}`;

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/525512345678?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };



  return (
    <section id="contacto" className="py-16 md:py-24 bg-white/70 border-t border-accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-ultra-dark">
            ¿Tienes alguna duda o quieres hacer un pedido especial?
          </h2>
          <p className="text-sm sm:text-base text-darkest">
            Escríbenos y con gusto te atenderemos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Formulario de Contacto */}
          <div className="lg:col-span-6 bg-primary p-6 sm:p-8 rounded-3xl border border-accent shadow-sm">
            <h3 className="font-serif-display font-bold text-xl text-ultra-dark mb-2">
              Envíanos un mensaje
            </h3>
            <p className="text-xs text-darkest mb-6">
              Te responderemos a la brevedad posible a través de WhatsApp o llamada directa.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="text-3xl">🌸</div>
                <h4 className="font-serif-display font-bold text-base text-emerald-900">
                  ¡Gracias por ponerte en contacto!
                </h4>
                <p className="text-xs text-emerald-700">
                  Tu mensaje se ha redirigido a nuestro canal de WhatsApp. Estaremos encantados de servirte.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', serviceType: 'general', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-dark text-white hover:bg-darker cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ultra-dark mb-1">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ana Martínez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-accent text-xs sm:text-sm text-ultra-dark focus:outline-none focus:ring-2 focus:ring-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ultra-dark mb-1">
                    Teléfono / WhatsApp (Opcional)
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 55 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-accent text-xs sm:text-sm text-ultra-dark focus:outline-none focus:ring-2 focus:ring-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ultra-dark mb-1">
                    ¿En qué podemos ayudarte?
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-accent text-xs sm:text-sm text-ultra-dark focus:outline-none focus:ring-2 focus:ring-dark"
                  >
                    <option value="general">Consulta General</option>
                    <option value="takeout">Pedido para Recoger (Takeout)</option>
                    <option value="special">Información para Eventos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ultra-dark mb-1">
                    Mensaje o Detalle del Pedido *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Cuéntanos qué antojo tienes o cuál es tu duda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-accent text-xs sm:text-sm text-ultra-dark focus:outline-none focus:ring-2 focus:ring-dark"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold bg-dark text-white hover:bg-darker shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enviar Mensaje por WhatsApp</span>
                  <span>💬</span>
                </button>
              </form>
            )}
          </div>

          {/* Preguntas Frecuentes */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="font-serif-display font-bold text-2xl text-ultra-dark mb-2">
                Preguntas Frecuentes
              </h3>
              <p className="text-xs sm:text-sm text-darkest">
                Todo lo que necesitas saber antes de tu visita o pedido.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-primary border border-accent rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-ultra-dark">
                        {faq.q}
                      </span>
                      <span className="text-xs text-dark-accent font-bold shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-darkest leading-relaxed border-t border-accent/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Banner decorativo */}
            <div className="p-4 rounded-2xl bg-secondary border border-accent flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <p className="text-xs text-darkest">
                <strong>¿Prefieres llamarnos directamente?</strong><br />
                Estamos disponibles en el teléfono local: <strong>+52 55 1234 5678</strong> durante nuestro horario de servicio.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
