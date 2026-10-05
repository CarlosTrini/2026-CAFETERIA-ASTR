import React, { useState, useEffect } from 'react';

export default function LocationHours() {
  const [currentStatus, setCurrentStatus] = useState<{
    isOpen: boolean;
    message: string;
    todayIndex: number;
  }>({
    isOpen: false,
    message: 'Calculando horario...',
    todayIndex: 0,
  });

  // revisar hora
  const checkOpenStatus = () => {
    const now = new Date();
    // Dia 0 = Domingo, 1 = Lunes, ...
    const day = now.getDay();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    let isOpen = false;

    let statusText = '';

    if (day >= 1 && day <= 5) {
      // Lunes a Viernes: 9:00 a 20:00
      if (currentHour >= 9 && currentHour < 20) {
        isOpen = true;
        statusText = '¡Estamos Abiertos! (Cerramos hoy a las 20:00)';
      } else if (currentHour < 9) {
        statusText = 'Cerrado por ahora (Abrimos hoy a las 9:00 am)';
      } else {
        statusText = 'Cerrado por hoy (Abrimos mañana a las 9:00 am)';
      }
    } else if (day === 6) {
      // Sábado: 9:00 a 21:00
      if (currentHour >= 9 && currentHour < 21) {
        isOpen = true;
        statusText = '¡Estamos Abiertos! (Cerramos hoy a las 21:00)';
      } else if (currentHour < 9) {
        statusText = 'Cerrado por ahora (Abrimos hoy a las 9:00 am)';
      } else {
        statusText = 'Cerrado por hoy (Abrimos mañana domingo a las 11:00 am)';
      }
    } else if (day === 0) {
      // Domingo: 11:00 a 17:00
      if (currentHour >= 11 && currentHour < 17) {
        isOpen = true;
        statusText = '¡Estamos Abiertos! (Cerramos hoy a las 17:00)';
      } else if (currentHour < 11) {
        statusText = 'Cerrado por ahora (Abrimos hoy a las 11:00 am)';
      } else {
        statusText = 'Cerrado por hoy (Abrimos mañana lunes a las 9:00 am)';
      }
    }

    setCurrentStatus({
      isOpen,
      message: statusText,
      todayIndex: day,
    });
  };

  useEffect(() => {

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const schedules = [
    {
      day: 'Lunes a Viernes',
      hours: '9:00 am – 20:00 pm',
      daysMatch: [1, 2, 3, 4, 5],
    },
    {
      day: 'Sábados',
      hours: '9:00 am – 21:00 pm',
      daysMatch: [6],
    },
    {
      day: 'Domingos',
      hours: '11:00 am – 17:00 pm',
      daysMatch: [0],
    },
  ];

  return (
    <section id="horarios" className="py-16 md:py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">

          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-ultra-dark">
            Horarios & Dónde Encontrarnos
          </h2>
          <p className="text-sm sm:text-base text-darkest">
            Te esperamos con los brazos abiertos en nuestro rincón sobre Av. Insurgentes Sur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Columna Izquierda => Tarjeta de Horarios y Datos */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-accent shadow-sm">

            <div className="space-y-6">
              {/* Live Status */}
              <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${currentStatus.isOpen
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 animate-bounce'
                : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider ">
                    {currentStatus.isOpen ? '🟢 Abierto en este momento' : '🕒 Horario de atención'}
                  </p>
                  <p className="text-xs font-medium opacity-90">
                    {currentStatus.message}
                  </p>
                </div>
              </div>

              {/* Horarios Detallados */}
              <div className="space-y-3">
                <h3 className="font-serif-display font-bold text-lg text-ultra-dark flex items-center gap-2">
                  <span>⏰</span>
                  <span>Horarios de Atención</span>
                </h3>

                <div className="space-y-2">
                  {schedules.map((s, idx) => {
                    const isToday = s.daysMatch.includes(currentStatus.todayIndex);
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm transition-all ${isToday
                          ? 'bg-secondary border-dark-accent font-semibold text-ultra-dark'
                          : 'bg-white border-accent/80 text-darkest'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{s.day}</span>
                          {isToday && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-dark text-white">
                              Hoy
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs">{s.hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dirección y Ubicación */}
              <div className="space-y-2 pt-2 border-t border-accent">
                <h3 className="font-serif-display font-bold text-lg text-ultra-dark flex items-center gap-2">
                  <span>📍</span>
                  <span>Ubicación</span>
                </h3>
                <p className="text-xs sm:text-sm text-darkest leading-relaxed">
                  <strong>Av. Insurgentes Sur</strong>, Ciudad de México (CDMX), México.
                </p>
                <p className="text-xs text-dark-accent font-medium">
                  Fácil acceso en transporte público (Metrobús / Metro) y estacionamiento cercano.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-accent flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Av.+Insurgentes+Sur,+Ciudad+de+M%C3%A9xico"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-dark text-white hover:bg-darker transition-colors shadow-xs"
              >
                Abrir en Google Maps
              </a>
              <a
                href="https://wa.me/525512345678?text=Hola,%20quisiera%20saber%20c%C3%B3mo%20llegar%20a%20su%20cafeter%C3%ADa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-whatsapp text-white hover:bg-whatsapp-dark transition-colors shadow-xs"
              >
                Preguntar por WhatsApp
              </a>
            </div>

          </div>

          {/* Columna Derecha: Embed de Google Maps Responsive */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-accent shadow-md bg-white min-h-95 lg:min-h-115 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.327010162267!2d-99.1875447241039!3d19.354988243153603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ffeb596b4797%3A0xb3a79b71de81d223!2sAv.%20Insurgentes%20Sur%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1790916097891!5m2!1ses-419!2smx"
              className="w-full h-full min-h-95 lg:min-h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Mapa de Ubicación de Komorebi Café en Av. Insurgentes Sur"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
