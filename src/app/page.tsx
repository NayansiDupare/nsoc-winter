import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { Rewards } from "@/components/sections/rewards";
import { Roles } from "@/components/sections/roles";
import { Sponsors } from "@/components/sections/sponsors";
import { Stats } from "@/components/sections/stats";
import { Steps } from "@/components/sections/steps";
import { Timeline } from "@/components/sections/timeline";
import { IcicleDivider } from "@/components/winter/icicle-divider";

// Section order follows the live nsoc.in home page.
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Roles />
      <Stats />
      <Steps />
      <IcicleDivider />
      <Rewards />
      <IcicleDivider />
      <Timeline />
      <IcicleDivider />
      <Sponsors />
      <Partners />
      <Contact />
    </>
  );
}
