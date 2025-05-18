
import BestPeople from "@/components/section/BestPepole";
import Feedback from "@/components/section/Feedback";
import Hero from "@/components/section/Hero";
import Member from "@/components/section/Member";

import Product from "@/components/section/Product";



export default function Home() {
  return (
    <div>
    <Hero/>
      <Product/>
   <Feedback/>
   <Member/>
   <BestPeople/>
    </div>
  );
}
