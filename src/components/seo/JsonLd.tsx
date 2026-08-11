import {
  CONTACT_EMAIL,
  OPERATOR_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const DESCRIPTION =
  "A 72-hour software studio. You bring the idea; one operator hands back a deployed, working MVP.";

/**
 * ProfessionalService JSON-LD — real facts only.
 * No aggregateRating, reviews, phone, or invented street address.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    legalName: OPERATOR_LEGAL_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: DESCRIPTION,
    serviceType: "Custom software and MVP development",
    priceRange: "$1,500+",
    areaServed: {
      "@type": "City",
      name: "Chandigarh",
      containedInPlace: {
        "@type": "Country",
        name: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
