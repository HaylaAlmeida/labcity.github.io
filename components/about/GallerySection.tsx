'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { urlForImage } from '@/lib/cms/sanity';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
    asset: any;
    alt?: string;
    caption?: string;
}

interface GallerySectionProps {
    images?: GalleryImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    if (!images || images.length === 0) return null;

    return (
        <div className="relative group rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900/50">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, idx) => (
                        <div key={idx} className="flex-[0_0_100%] min-w-0 relative aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
                            <img
                                src={urlForImage(image).url()}
                                alt={image.alt || 'Galeria LabCity'}
                                className="w-full h-full object-cover"
                            />
                            {image.caption && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12">
                                    <p className="text-white text-sm font-medium leading-relaxed drop-shadow-md">
                                        {image.caption}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-0"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-0"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute top-4 right-4 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => emblaApi?.scrollTo(idx)}
                        className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
