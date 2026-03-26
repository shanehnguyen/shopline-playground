import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { images } from '../assets/images';

interface Variant {
  name: string;
  image?: string;
}

interface Collection {
  name: string;
  variants: Variant[];
  layout: string;
}

const FurniturePage: React.FC = () => {
  const collections: Collection[] = [
    {
      name: 'Mallorca',
      layout: 'grid-cols-1 md:grid-cols-2',
      variants: [
        { name: 'White', image: images.collections.variants.mallorcaWhite },
        { name: 'Dolphin Gray', image: images.collections.variants.mallorcaGray },
      ]
    },
    {
      name: 'Shady',
      layout: 'grid-cols-1 md:grid-cols-3',
      variants: [
        { name: 'White', image: images.collections.variants.shadyWhite },
        { name: 'Gray', image: images.collections.variants.shadyGray },
        { name: 'Neutral', image: images.collections.variants.shadyNatural },
      ]
    },
    {
      name: 'Franco',
      layout: 'custom-franco',
      variants: [
        { name: 'White', image: images.collections.variants.francoWhite },
        { name: 'Gray', image: images.collections.variants.francoGray },
        { name: 'Oak', image: images.collections.variants.francoOak },
        { name: 'Slim White', image: images.collections.variants.francoSlimWhite },
        { name: 'Slim Black', image: images.collections.variants.francoBlack },
        { name: 'Slim Oak', image: images.collections.variants.francoSlimOak },
      ]
    },
    {
      name: 'Irena',
      layout: 'custom-irena',
      variants: [
        { name: 'White', image: images.collections.variants.irenaWhite },
        { name: 'Gray', image: images.collections.variants.irenaGray },
        { name: 'Olive', image: images.collections.variants.irenaOlive },
        { name: 'Glossy White', image: images.collections.variants.irenaGlossyWhite },
        { name: 'Woodgrains', image: images.collections.variants.irenaWoodgrains },
      ]
    },
    {
      name: 'Newport',
      layout: 'grid-cols-1 md:grid-cols-3',
      variants: [
        { name: 'Natural', image: images.collections.variants.newportOak },
        { name: 'Umbria Elm', image: images.collections.variants.newportUmbria },
        { name: 'Shoreline', image: images.collections.variants.newportShoreline },
      ]
    },
    {
      name: 'Aspen',
      layout: 'grid-cols-1 md:grid-cols-3',
      variants: [
        { name: 'Stone Gray', image: images.collections.variants.aspenGray },
        { name: 'Emerald', image: images.collections.variants.aspenEmerald },
        { name: 'Raven', image: images.collections.variants.aspenRaven },
      ]
    }
  ];

  const VariantCard: React.FC<{ variant: Variant; collectionName: string }> = ({ variant, collectionName }) => (
    <Link 
      to={`/products?collection=${encodeURIComponent(collectionName)}&color=${encodeURIComponent(variant.name)}`}
      className="block group"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="relative aspect-[8/5] overflow-hidden bg-white">
          {variant.image ? (
            <img 
              src={variant.image} 
              alt={variant.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 bg-[#eeebe6]" />
          )}
          <ImagePlaceholder aspectRatio="aspect-full" className="opacity-10 mix-blend-overlay" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-medium text-pk-dark group-hover:text-pk-gold transition-colors">{variant.name}</span>
          <span className="text-[20px] text-pk-gold transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <Layout>
      <Breadcrumbs label="Furniture Collections" />
      <main className="bg-white px-4 md:px-8 py-12 md:py-[72px]">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          {collections.map((collection) => (
            <section key={collection.name} className="space-y-8">
              <div className="space-y-4">
                <Link 
                  to={`/products?collection=${encodeURIComponent(collection.name)}`}
                  className="inline-block group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-pk-gold group-hover:text-pk-dark transition-colors">
                    {collection.name}
                  </span>
                </Link>
                <hr className="border-t border-pk-border" />
              </div>

              {collection.layout === 'custom-franco' ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collection.variants.slice(0, 2).map(v => <VariantCard key={v.name} variant={v} collectionName={collection.name} />)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {collection.variants.slice(2).map(v => <VariantCard key={v.name} variant={v} collectionName={collection.name} />)}
                  </div>
                </div>
              ) : collection.layout === 'custom-irena' ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collection.variants.slice(0, 2).map(v => <VariantCard key={v.name} variant={v} collectionName={collection.name} />)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {collection.variants.slice(2).map(v => <VariantCard key={v.name} variant={v} collectionName={collection.name} />)}
                  </div>
                </div>
              ) : (
                <div className={`grid gap-8 ${collection.layout}`}>
                  {collection.variants.map(v => <VariantCard key={v.name} variant={v} collectionName={collection.name} />)}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default FurniturePage;
