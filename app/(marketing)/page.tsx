import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ProcessSection } from "@/components/sections/process";
import { CTASection } from "@/components/sections/cta";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { getProjectsController } from "@/src/presentation/controllers/product.controller";

export default async function Home() {
  const { success, data } = await getProjectsController();

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      {!success || !data ? <></> : <FeaturedProjects projects={data} />}
      <ProcessSection />
      <CTASection />
      {/* <TestimonialsSection /> */}
    </div>
  );
}
