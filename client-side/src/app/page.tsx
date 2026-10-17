'use client';

import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import MachinerySection from '../components/MachinerySection';
import CommitmentsSection from '../components/CommitmentsSection';
import ProjectEstimator from '../components/ProjectEstimator';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <MachinerySection />
      <CommitmentsSection />
      <ProjectEstimator />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
