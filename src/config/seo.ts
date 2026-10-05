/**
 * Configuración global de SEO para la Cafetería.
 */

export interface SiteConfig {
  name: string;
  title: string;
  titleTemplate: string;
  description: string;
  url: string;
  author: string;
  locale: string;
  themeColor: string;
  defaultOgImage: string;
  phone: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  openingHours: {
    days: string;
    hours: string;
  }[];
  twitter: {
    handle: string;
    site: string;
    cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
  };
  organization: {
    name: string;
    logo: string;
    url: string;
    sameAs: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: 'Komorebi Café & Repostería',
  title: 'Komorebi Café | Cafetería de Especialidad & Postres Japoneses',
  titleTemplate: '%s | Komorebi Café',
  description: 'Cafetería boutique de especialidad en Insurgentes Sur. Disfruta de café de altura, repostería artesanal, postres japoneses (mochis, dorayakis, matcha), crepas, helados, hamburguesas gourmet y hot dogs de autor. Consumo en lugar o para llevar.',
  url: 'https://komorebi-cafe.mx',
  author: 'Komorebi Café Boutique',
  locale: 'es_MX',
  themeColor: '#8f4646',
  // Imagen de alta calidad para Open Graph y Twitter Cards cuando se comparta en WhatsApp / Facebook / Instagram / Twitter
  defaultOgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
  phone: '+52 55 1234 5678',
  whatsapp: '525512345678',
  address: {
    street: 'Av. Insurgentes Sur',
    city: 'Ciudad de México',
    state: 'CDMX',
    country: 'MX',
  },
  openingHours: [
    { days: 'Lunes a Viernes', hours: '09:00 - 20:00' },
    { days: 'Sábado', hours: '09:00 - 21:00' },
    { days: 'Domingo', hours: '11:00 - 17:00' },
  ],
  twitter: {
    handle: '@komorebi_cafe',
    site: '@komorebi_cafe',
    cardType: 'summary_large_image',
  },
  organization: {
    name: 'Komorebi Café & Repostería',
    logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400&auto=format&fit=crop',
    url: 'https://komorebi-cafe.mx',
    sameAs: [
      'https://instagram.com/komorebi_cafemx',
      'https://facebook.com/komorebicafemx',
    ],
  },
};

/**
 * Interfaz de propiedades SEO para componentes y layouts.
 */
export interface SEOProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
  canonical?: string | URL;
  image?: string;
  imageAlt?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  keywords?: string[];
  locale?: string;
  themeColor?: string;
  publishDate?: Date | string;
  modifiedDate?: Date | string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    section?: string;
  };
  schema?: Record<string, any> | Record<string, any>[];
}

/**
 * Generador de Schemas de datos estructurados JSON-LD (Schema.org)
 */
export function generateDefaultSchemas(pageUrl: string, seoProps: SEOProps) {
  const schemas: Record<string, any>[] = [];

  // Schema de WebSite
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: seoProps.description || siteConfig.description,
    inLanguage: seoProps.locale || siteConfig.locale,
  });

  // Schema de CafeOrCoffeeShop / Restaurant LocalBusiness
  schemas.push({
    '@context': 'https://schema.org',
    '@type': ['CafeOrCoffeeShop', 'Bakery', 'Restaurant'],
    name: siteConfig.name,
    url: siteConfig.url,
    image: seoProps.image || siteConfig.defaultOgImage,
    description: seoProps.description || siteConfig.description,
    telephone: siteConfig.phone,
    priceRange: '$$',
    servesCuisine: [
      'Café de Especialidad',
      'Repostería Japonesa',
      'Panadería Artesanal',
      'Crepas y Helados',
      'Hamburguesas Gourmet',
      'Snacks y Hot Dogs'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.354988,
      longitude: -99.187545,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '17:00',
      },
    ],
    hasMenu: `${siteConfig.url}/#menu`,
    acceptsReservations: 'False',
  });

  // Si se pasaron schemas personalizados adicionales
  if (seoProps.schema) {
    if (Array.isArray(seoProps.schema)) {
      schemas.push(...seoProps.schema);
    } else {
      schemas.push(seoProps.schema);
    }
  }

  return schemas;
}
