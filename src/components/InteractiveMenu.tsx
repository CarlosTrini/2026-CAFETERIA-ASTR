import React, { useState, useMemo } from 'react';
import { MENU_DATA, CATEGORIES } from '../content/data-dishes';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import Swiper and modules
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';



export default function InteractiveMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'japanese' | 'popular' | 'specialty'>('all');

  // Filtrado
  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      // Categoría
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Búsqueda de texto
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtro de badges
      let matchesFilter = true;
      if (activeFilter === 'japanese') matchesFilter = !!item.isJapanese;
      if (activeFilter === 'popular') matchesFilter = !!item.isPopular;
      if (activeFilter === 'specialty') matchesFilter = !!item.isSpecialty;

      return matchesCategory && matchesSearch && matchesFilter;
    });
  }, [selectedCategory, searchQuery, activeFilter]);

  const whatsappNumber = '525512345678';

  return (
    <section id="menu" className="py-16 md:py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Encabezado de la Sección */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <p className="text-dark font-bold italic">
            Presentamos nuestra carta
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-ultra-dark">
            Delicias artesanales para cada momento del día
          </h2>
          <p className="text-sm sm:text-base text-darkest">
            Todo preparado al instante con ingredientes seleccionados. Disponible para disfrutar aquí o empaquetado para llevar.
          </p>
        </div>

        {/* Barra de Filtros por Categoría */}
        <div className="flex flex-wrap  w-full lg:w-[60%] lg:mx-auto items-center justify-center gap-2 sm:gap-3 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${selectedCategory === cat.id
                ? 'bg-linear-to-r from-dark-accent to-darkest text-white shadow-md shadow-dark/20 scale-[1.02]'
                : 'bg-white text-darkest border border-accent hover:bg-secondary hover:text-dark'
                }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Barra de Búsqueda y Filtros Rápidos */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white/80 p-3 sm:p-4 rounded-2xl border border-accent shadow-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Buscar café, mochi, hamburguesa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-secondary/60 border border-accent text-ultra-dark placeholder-dark-accent/80 focus:outline-none focus:ring-2 focus:ring-dark"
            />
            <span className="absolute left-3 top-2.5 text-dark-accent text-xs">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-darkest hover:text-dark cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${activeFilter === 'all'
                ? 'bg-dark text-white'
                : 'bg-secondary text-darkest hover:bg-accent'
                }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${activeFilter === 'popular'
                ? 'bg-dark text-white'
                : 'bg-secondary text-darkest hover:bg-accent'
                }`}
            >
              ⭐ Los Más Pedidos
            </button>
            <button
              onClick={() => setActiveFilter('japanese')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${activeFilter === 'japanese'
                ? 'bg-dark text-white'
                : 'bg-secondary text-darkest hover:bg-accent'
                }`}
            >
              🇯🇵 Toque Japonés
            </button>
            <button
              onClick={() => setActiveFilter('specialty')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${activeFilter === 'specialty'
                ? 'bg-dark text-white'
                : 'bg-secondary text-darkest hover:bg-accent'
                }`}
            >
              ✨ Especialidad
            </button>
          </div>
        </div> */}


        {/* Grilla de Productos */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-accent p-8">
            <div className="text-4xl mb-3">☕</div>
            <h3 className="font-serif-display text-lg font-bold text-ultra-dark">
              No encontramos resultados para tu búsqueda
            </h3>
            <p className="text-xs text-darkest mt-1">
              Prueba buscando otro término como "café", "matcha", "crepa" o "hamburguesa".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-secondary text-dark text-xs font-bold hover:bg-accent cursor-pointer">
              Restablecer filtros
            </button>
          </div>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              500: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },

            }}
            modules={[EffectCards, Pagination, Autoplay]}
            effect="slide"
            autoplay={{ delay: 1800 }}
            loop={true}
            pagination={true}
            grabCursor={true}
            onSlideChange={() => { }}
            onSwiper={(swiper) => { }}
          >


            {filteredItems.map((item, idx) => {
              const whatsappOrderUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `¡Hola! Me gustaría pedir de su menú: *${item.name}* ($${item.price} MXN). ¿Tienen disponibilidad?`
              )}`;

              return (

                <SwiperSlide>
                  <div
                    key={item.id}
                    className="max-w-85 bg-white rounded-3xl border border-accent overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                  >
                    {/* Imagen con badges */}
                    <div className="relative aspect-16/10 overflow-hidden bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

                      {/* Badge Superior Izquierda */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.isJapanese && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-dark shadow-sm">
                            🇯🇵 Japonés
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-dark text-white shadow-sm">
                            ⭐ Favorito
                          </span>
                        )}
                        {item.isSpecialty && !item.isJapanese && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-ultra-dark shadow-sm">
                            ✨ Especialidad
                          </span>
                        )}
                      </div>

                      {/* Precio Flotante */}
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-sm font-bold text-ultra-dark shadow-md">
                        ${item.price} <span className="text-[10px] font-normal text-darkest">MXN</span>
                      </div>
                    </div>

                    {/* Contenido de la Tarjeta */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-dark-accent uppercase tracking-wider">
                          <span>{item.categoryLabel}</span>
                        </div>
                        <h3 className="font-serif-display font-bold text-base text-ultra-dark group-hover:text-dark transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-darkest leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Tags y Botón de Pedido */}
                      <div className="pt-2 border-t border-accent/60 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-secondary text-darkest"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={whatsappOrderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-whatsapp hover:bg-whatsapp-dark text-white shadow-xs transition-colors shrink-0 cursor-pointer"
                          title="Pedir este producto por WhatsApp"
                        >
                          <span>Pedir</span>
                          <span>💬</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

          </Swiper>
        )}


        {/* Nota al pie del menú */}
        <div className="mt-12 p-4 sm:p-6 rounded-3xl bg-secondary border border-accent flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-ultra-dark">
              ¿Deseas personalizar tu bebida o pedir un postre especial para llevar?
            </p>
            <p className="text-xs text-darkest">
              Contamos con leches vegetales (avena, almendra, soya), opciones sin gluten y cajas de regalo.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Me gustaría cotizar un pedido especial para llevar / evento.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold bg-dark text-white hover:bg-darker transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            Consultar con el Barista
          </a>
        </div>

      </div>
    </section>
  );
}
