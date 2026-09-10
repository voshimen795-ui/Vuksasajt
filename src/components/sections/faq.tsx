import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const faqs = [
  {
    question: "Kako da znam koliki mi agregat treba?",
    answer:
      "Saberite snagu svih uređaja koji rade istovremeno i dodajte rezervu za uređaje sa jakim startom, poput klime, pumpe ili elektromotora. Kalkulator na ovoj stranici radi taj proračun umesto vas, a naš inženjer ga besplatno proverava pre nego što pošaljemo ponudu.",
  },
  {
    question: "Koja je razlika između benzinskog i dizel agregata?",
    answer:
      "Benzinski agregati su lakši i povoljniji, pa su idealni za povremenu upotrebu do nekoliko kilovata. Dizel agregati troše manje goriva po satu, traju duže pod opterećenjem i logičan su izbor za svakodnevni rad i veće snage.",
  },
  {
    question: "Šta je ATS ormar i da li mi je potreban?",
    answer:
      "ATS je automatika koja prepozna nestanak struje, sama pokrene agregat i prebaci napajanje objekta na njega — obično za nekoliko sekundi. Neophodan je svuda gde prekid napajanja pravi štetu: hladnjače, serverske sobe, apoteke, proizvodnja.",
  },
  {
    question: "Da li je moguće iznajmiti agregat samo na nekoliko dana?",
    answer:
      "Da. Iznajmljujemo i na jedan dan i na duži period. U dogovor ulazi dostava, priključenje i preuzimanje uređaja, a za duže najmove dogovaramo povoljniju dnevnu cenu.",
  },
  {
    question: "Servisirate li agregat koji nije kupljen kod vas?",
    answer:
      "Servisiramo uređaje bez obzira na to gde su kupljeni. Radimo redovne servise po planu održavanja, kao i vanredne popravke i zamenu delova.",
  },
  {
    question: "Koliko brzo izlazite na teren u slučaju kvara?",
    answer:
      "Dežurni tim radi 24 sata dnevno. Za lokacije u Beogradu i okolini na terenu smo najčešće u roku od sat vremena, a za ostatak Srbije termin dogovaramo odmah po pozivu.",
  },
];

export function Faq() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Česta pitanja</span>
            <h2 className="heading-lg mt-6">Pitanja koja najčešće dobijamo</h2>
            <p className="mt-5 text-base leading-relaxed text-steel-400">
              Ako nešto nije jasno, javite se telefonom — objasnićemo bez tehničkog žargona
              i bez obaveze.
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
