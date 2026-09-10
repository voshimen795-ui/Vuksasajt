import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

const faqs = [
  {
    question: "Kako da znam koliki mi agregat treba?",
    answer:
      "Saberite potrošače koji rade istovremeno i dodajte rezervu za one sa jakim startom (klima, pumpa, motor). Kalkulator to radi umesto vas, a mi proračun proveravamo besplatno.",
  },
  {
    question: "Benzinski ili dizel?",
    answer:
      "Benzinski su lakši i povoljniji, za povremenu upotrebu do nekoliko kilovata. Dizel troši manje po satu i bolje podnosi svakodnevni rad i veće snage.",
  },
  {
    question: "Šta je ATS ormar?",
    answer:
      "Automatika koja pri nestanku struje sama pokrene agregat i prebaci napajanje, obično za nekoliko sekundi. Neophodna tamo gde prekid pravi štetu — hladnjače, serverske sobe, apoteke.",
  },
  {
    question: "Može li najam na nekoliko dana?",
    answer:
      "Može, i na jedan dan i na duži period. Dostava, priključenje i preuzimanje ulaze u dogovor.",
  },
  {
    question: "Servisirate li agregat koji nije kupljen kod vas?",
    answer: "Servisiramo sve marke, bez obzira gde su kupljene — redovno održavanje i popravke.",
  },
  {
    question: "Koliko brzo izlazite na teren?",
    answer:
      "Dežurstvo je 24/7. U Beogradu i okolini najčešće u roku od sat vremena, za ostatak Srbije termin dogovaramo odmah po pozivu.",
  },
];

export function Faq() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Česta pitanja</span>
            <TextReveal
              className="heading-lg mt-6"
              segments={[{ text: "Pitanja koja" }, { text: "najčešće dobijamo", accent: true }]}
            />
            <p className="mt-5 text-base leading-relaxed text-steel-400">
              Ako nešto nije jasno, pozovite — objasnićemo bez obaveze.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
