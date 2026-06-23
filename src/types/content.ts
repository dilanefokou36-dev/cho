export interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  credit: string;
}

export interface ImageMeta {
  src: string;
  alt: string;
  credit: string;
}

export interface GalleryImage extends ImageMeta {
  id: string;
  caption: string;
  location: string;
}
