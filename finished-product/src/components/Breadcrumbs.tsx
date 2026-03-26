import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  label: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ label }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em]">
        <Link to="/" className="text-pk-gold hover:text-pk-gold-dark transition-colors">HOME</Link>
        <span className="text-pk-muted">/</span>
        <span className="text-pk-dark">{label.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
