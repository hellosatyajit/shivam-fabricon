import SanityDatabase from "./sanityClient";

export interface Client {
  name: string;
  logo: string;
}

export async function fetchClientData(): Promise<Client[]> {
  const data = await SanityDatabase.fetch(`
      *[_type == "client"]{
        name,
        "logo": logo.asset->url
      }
    `);

  return data || [];
}

export interface LongBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface ShortBenefit {
  title: string;
  description: string;
}

export async function fetchLongBenefits(): Promise<LongBenefit[]> {
  const data = await SanityDatabase.fetch(`
      *[_type == "longbenefits"]{
        title,
        description,
        "icon": icon.asset->url
      }
    `);
  return data || [];
}

export async function fetchShortBenefits(): Promise<ShortBenefit[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "shortbenefits"]{
      title,
      description
    }
  `);
  return data || [];
}

export interface ServiceImage {
  src: string;
  alt: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  images: ServiceImage[];
}

export async function fetchServices(): Promise<Service[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "services"]{
      title,
      "slug": slug.current, 
      description,
      images[] {
        
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      }
    }
  `);

  return (
    data.map((service: any) => ({
      title: service.title,
      slug: service.slug,
      description: service.description,
      images:
        service.images?.map((image: any) => ({
          src: image.src,
          alt: image.alt || "No description available",
        })) || [],
    })) || []
  );
}

//fetch the casestudt data
export interface CaseStudyImage {
  src: string;
  alt: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  description: string;
  images: CaseStudyImage[];
  projectType: string;
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "caseStudy"]{
      title,
      "slug": slug.current, 
      description,       
       projectType,
      images[] {
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      },
    }
  `);

  return (
    data.map((caseStudy: any) => ({
      title: caseStudy.title,
      slug: caseStudy.slug,
      description: caseStudy.description,
      projectType: caseStudy.projectType,
      images:
        caseStudy.images?.map((image: any) => ({
          src: image.src,
          alt: image.alt || "No description available",
        })) || [],
    })) || []
  );
}

//fetch the industry data
export interface IndustryImage {
  src: string;
  alt: string;
}

export interface Industry {
  title: string;
  slug: string;
  description: string;
  images: IndustryImage[];
}

export async function fetchIndustry(): Promise<Industry[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "Industry"]{
      title,
      "slug": slug.current,
      description,
      images[] {
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      }
    }
  `);

  return (
    data.map((industry: any) => ({
      title: industry.title,
      slug: industry.slug,
      description: industry.description,
      images:
        industry.images?.map((image: any) => ({
          src: image.src,
          alt: image.alt || "No description available",
        })) || [],
    })) || []
  );
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface Hero {
  image: HeroImage;
}
export async function fetchHeroImage(): Promise<Hero[]> {
 
  const data = await SanityDatabase.fetch(`
    *[_type == "heroImage"][0]{
      image {
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      }
    }
  `);

  
  return data ? [{
    image: {
      src: data.image?.src,
      alt: data.image?.alt || "Hero Image" 
    }
  }] : [];
}