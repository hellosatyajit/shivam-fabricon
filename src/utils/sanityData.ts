import { video } from "framer-motion/client";
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
  shortDescription: string;
  longDescription: string;
  isFeature:boolean;
  videoUrl:string;
  images: ServiceImage[];
}

export async function fetchServices(): Promise<Service[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "services"]{
      title,
      "slug": slug.current, 
      shortDescription,
      longDescription,
      isFeature,
      videoUrl,
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
      shortDescription: service.shortDescription,
      longDescription:service.longDescription,
      isFeature:service.isFeature,
      videoUrl:service.videoUrl,
      images:
        service.images?.map((image: any) => ({
          src: image.src,
          alt: image.alt || "No description available",
        })) || [],
    })) || []
  );
}

//fetch the casestudt data
export interface ProjectsImage {
  src: string;
  alt: string;
}

export interface Testimonial {
  name: string;
  role: string;
  message: string;
  imageSrc: string;  // Image URL for the testimonial
  date: string;      // Date when the testimonial was given
}

export interface Projects {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  isFeature: boolean;
  videoUrl: string;
  images: ProjectsImage[];
  projectType: string;
  testimonials: Testimonial[];  // Array of testimonials
}


export async function fetchProjects(): Promise<Projects[]> {
  const data = await SanityDatabase.fetch(`
   *[_type == "Projects"]{
  title,
  "slug": slug.current,
  shortDescription,
  longDescription,
  isFeature,
  videoUrl,
  projectType,
  images[] {
    _type == "image" => {
      "src": asset->url,
      "alt": alt
    }
  },
  testimonials[] {
    name,
    role,
    message,
    "imageSrc": image.asset->url, // Fetching the image URL
    date
  }
}

  `);

  return (
    data.map((project: any) => ({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription,
      isFeature: project.isFeature,
      videoUrl: project.videoUrl,
      projectType: project.projectType,
      images:
        project.images?.map((image: any) => ({
          src: image.src,
          alt: image.alt || "No description available",
        })) || [],
      testimonials: 
        project.testimonials?.map((testimonial: any) => ({
          name: testimonial.name,
          role: testimonial.role,
          message: testimonial.message,
          imageSrc: testimonial.imageSrc || "", 
          date: testimonial.date,
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
  shortDescription: string;
  longDescription:string;
  videoUrl:string;
  isFeature:boolean;
  images: IndustryImage[];
}

export async function fetchIndustry(): Promise<Industry[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "Industry"]{
      title,
      "slug": slug.current,
      shortDescription,
      longDescription,
      videoUrl,
      isFeature,
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
      shortDescription: industry.shortDescription,
      longDescription:industry.longDescription,
      videoUrl:industry.videoUrl,
      isFeature:industry.isFeature,
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