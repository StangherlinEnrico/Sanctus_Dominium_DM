import React from "react";
import PageHeader from "../components/PageHeader";
import TextSection from "../components/TextSection";
import GridSection from "../components/GridSection";
import InfoBox from "../components/InfoBox";
import "./RacesPage.css";

const RacesPage: React.FC = () => {
  // Header configuration
  const header = {
    chapterBadge: "Capitolo I - Parte II",
    icon: "🧬",
    title: "RAZZE SOTTO IL GIOGO",
    subtitle:
      "Dieci stirpi principali plasmate attraverso secoli di manipolazione spirituale",
  };

  // TextSection configuration
  const introTextSection = {
    type: "textSection" as const,
    title: "",
    content:
      "L'Impero di Sanctus Dominium non ha semplicemente conquistato razze preesistenti: ne ha create di nuove, plasmando l'umanità e altre forme di vita attraverso secoli di **manipolazione spirituale**, **esperimenti teurgici** e **selezione controllata**.",
  };

  // GridSection configuration per le razze
  const racesGridSection = {
    type: "gridSection" as const,
    title: "Le Stirpi dell'Impero",
    subtitle:
      "Ogni razza rappresenta una diversa risposta al controllo imperiale",
    columns: 2,
    gap: "large" as const,
    itemType: "contentBox" as const,
    items: [
      {
        title: "I Devoti",
        subtitle: "I Figli Perfetti",
        content:
          "L'apice dell'ingegneria sociale imperiale: umani **perfezionati** attraverso otto generazioni di selezione spirituale controllata.",
        additionalInfo: [
          "Pelle dorata **luminescente** che riflette la purezza spirituale",
          "Occhi che cambiano colore secondo lo stato di grazia",
          "Nascono predisposti all'**obbedienza assoluta**",
          "Vivono in beatitudine artificiale programmata",
        ],
      },
      {
        title: "I Santificati",
        subtitle: "I Morti Benedetti",
        content:
          "Zombie inconsapevoli della propria condizione, **preservati** da benedizioni corrotte per servire come propaganda vivente.",
        additionalInfo: [
          "Credono sinceramente di essere **vivi**",
          "Occupano posizioni di prestigio nell'Impero",
          "Solo magia potente può rivelare la loro natura",
          "Propaganda ambulante perfetta per l'Impero",
        ],
      },
      {
        title: "Le Candele Viventi",
        subtitle: "I Servitori di Cera",
        content:
          "Costrutti umanoidi di cera benedetta animati dalla **Fiamma Eterna**, destinati al sacrificio volontario.",
        additionalInfo: [
          "**Stoppino interiore** che li consuma in 50 anni",
          "Muti per natura, comunicano tramite **modulazioni luminose**",
          "Incarnano il concetto di sacrificio volontario",
          "Costrutti senzienti animati da energia divina",
        ],
      },
      {
        title: "I Custodi Ferrosi",
        subtitle: "I Guardiani Automatici",
        content:
          "Automi senzienti originariamente creati come guardiani, che hanno sviluppato **coscienza propria** attraverso secoli di esposizione a energie divine corrotte.",
        additionalInfo: [
          "Corpo metallico con **incisioni di preghiere** luminose",
          "Le preghiere si illuminano quando provano emozioni",
          "Cercano di comprendere il concetto di **anima artificiale**",
          "Alcuni servono l'Impero, altri si sono ribellati",
        ],
      },
      {
        title: "I Divoratori di Peccato",
        subtitle: "I Purificatori Viventi",
        content:
          "Creature dall'aspetto demoniaco create dall'Impero per **consumare letteralmente** i peccati altrui durante confessioni estreme.",
        additionalInfo: [
          "Pelle scura come carbone, **occhi di brace ardente**",
          "Si nutrono delle trasgressioni morali che toccano",
          "Più peccati consumano, più terrificante diventa l'aspetto",
          "La loro anima paradossalmente si **purifica** consumando il male",
        ],
      },
      {
        title: "I Sussurranti",
        subtitle: "I Figli del Silenzio",
        content:
          "Nati dalla resistenza, hanno sviluppato **telepatia** per evitare la sorveglianza imperiale.",
        additionalInfo: [
          "Corde vocali **atrofizzate** li costringono al silenzio",
          "Cervelli ipertrofizzati per comunicazione mentale",
          "Considerati cospiratori naturali dalle autorità",
          "Alleati perfetti per la **resistenza clandestina**",
        ],
      },
      {
        title: "I Ricordanti",
        subtitle: "I Custodi della Verità",
        content:
          "Discendenti di saggi che nascosero la **storia vera** nelle proprie menti, diventando archivi viventi.",
        additionalInfo: [
          "Tramandano geneticamente **memorie ancestrali**",
          "Occhi argentei con infinite profondità di saggezza",
          "Archivi viventi di **conoscenze proibite**",
          "Custodiscono la vera storia dell'Impero",
        ],
      },
      {
        title: "I Marchiati",
        subtitle: "I Segnati dal Rifiuto",
        content:
          "Discendenti di ribelli che sopravvissero alla punizione imperiale. Portano **marchi divini permanenti** che raccontano i loro peccati in simboli sacri.",
        additionalInfo: [
          "Paria sociali con marchi visibili sulla pelle",
          "Paradossalmente **immuni** a ulteriori maledizioni divine",
          "Resistenti alla magia divina e teurgica",
          "Naturale diffidenza verso qualsiasi autorità spirituale",
        ],
      },
      {
        title: "I Figli del Vuoto",
        subtitle: "Gli Esiliati Dimensionali",
        content:
          "Discendenti di maghi intrappolati tra i piani durante tentativi di fuga dall'Impero. Esistono **parzialmente** in questa realtà.",
        additionalInfo: [
          "Corpi **semitrasparenti** e instabili dimensionalmente",
          "Capaci di attraversare la materia solida",
          "Soffrono di costante spaesamento dimensionale",
          "Immuni a molte forme di controllo fisico",
        ],
      },
      {
        title: "Gli Spezzati",
        subtitle: "I Liberati dalla Follia",
        content:
          "Vittime di esperimenti falliti di controllo mentale, i loro spiriti frantumati li rendono **immuni** a ulteriori manipolazioni.",
        additionalInfo: [
          "Personalità multiple come meccanismo di difesa",
          "Paradossalmente **immuni** al controllo mentale",
          "Geniali ma instabili emotivamente",
          "Rappresentano la rottura completa del sistema imperiale",
        ],
      },
    ],
  };

  // TextSection per popolazione e distribuzione
  const populationTextSection = {
    type: "textSection" as const,
    title: "Popolazione e Distribuzione",
    content:
      "La distribuzione demografica riflette il successo delle diverse strategie di sopravvivenza sotto il dominio imperiale, fornendo al DM una base per determinare la frequenza degli incontri nelle diverse aree dell'ambientazione:",
    additionalInfo: [
      "**Devoti 30%** - Concentrati nelle città imperiali",
      "**Santificati 20%** - Diffusi nelle posizioni di potere",
      "**Candele Viventi 15%** - Servizio religioso e rituale",
      "**Sussurranti 10%** - Comunità isolate, spesso sotterranee",
      "**Ricordanti 8%** - Nascosti tra la popolazione generale",
      "**Spezzati 5%** - Vagabondi, manicomi, resistenza",
      "**Custodi Ferrosi 4%** - Templi, fortezze, rovine",
      "**Divoratori di Peccato 3%** - Zone di confine e tribunali",
      "**Figli del Vuoto 3%** - Aree magicamente instabili",
      "**Marchiati 3%** - Zone di confine, comunità di paria",
    ],
  };

  // GridSection per alleanze e conflitti
  const dynamicsGridSection = {
    type: "gridSection" as const,
    title: "Dinamiche Sociali",
    columns: 2,
    gap: "medium" as const,
    itemType: "contentBox" as const,
    items: [
      {
        title: "Alleanze della Resistenza",
        subtitle: "Necessità Complementari",
        content:
          "Le razze si alleano secondo necessità specifiche per sopravvivere sotto il controllo imperiale.",
        additionalInfo: [
          "**Sussurranti + Ricordanti**: Comunicazione sicura e conoscenza storica",
          "**Spezzati + Candele Viventi**: Accettazione del destino tragico",
          "**Marchiati + Figli del Vuoto**: Rifiuto dell'autorità imperiale",
          "**Custodi Ferrosi + Divoratori**: Ricerca di redenzione e comprensione dell'anima",
        ],
      },
      {
        title: "Conflitti Interni",
        subtitle: "Filosofie Incompatibili",
        content:
          "Ogni razza rappresenta una filosofia di sopravvivenza diversa, creando **tensioni naturali** difficili da superare.",
        additionalInfo: [
          "**Devoti vs Ricordanti**: Disgusto per la contaminazione della verità",
          "**Santificati vs Razze Psichiche**: Timore della rivelazione della loro natura",
          "**Custodi Ferrosi vs Organici**: Difficoltà nel comprendere le emozioni",
          "**Collaborazionisti vs Resistenti**: Accuse reciproche di tradimento",
        ],
      },
    ],
  };

  // InfoBox per utilizzo narrativo
  const narrativeInfoBox = {
    type: "infoBox" as const,
    svgIcon: "../assets/icons/info.svg",
    title: "Utilizzo Narrativo",
    content:
      "Ogni razza offre opportunità uniche per esplorare temi specifici che arricchiscono la narrazione:",
    severity: "success" as const,
    additionalInfo: [
      "**Controllo vs Libertà**: attraverso Devoti e Spezzati",
      "**Identità e Memoria**: tramite Santificati e Ricordanti",
      "**Sacrificio e Significato**: con Candele Viventi e Divoratori",
      "**Esistenza e Realtà**: mediante Figli del Vuoto",
      "**Anima e Coscienza**: esplorando Custodi Ferrosi e Sussurranti",
    ],
  };

  // InfoBox per meccaniche di gioco
  const mechanicsInfoBox = {
    type: "infoBox" as const,
    svgIcon: "../assets/icons/info.svg",
    title: "Meccaniche di Gioco",
    content:
      "Le razze sono progettate strategicamente per migliorare l'esperienza di gioco:",
    severity: "warning" as const,
    additionalInfo: [
      "**Creare tensione naturale** nel party attraverso filosofie contrastanti",
      "**Offrire soluzioni creative** ai problemi attraverso abilità uniche",
      "**Generare agganci narrativi** automatici basati sulla natura razziale",
      "**Fornire resistenze specifiche** contro diverse forme di controllo imperiale",
    ],
  };

  const dmNotesInfoBox = {
    type: "infoBox" as const,
    svgIcon: "../assets/icons/info.svg",
    title: "Note per il Dungeon Master",
    content:
      "Ogni razza rappresenta una diversa risposta al controllo totalitario imperiale, offrendo **opportunità narrative uniche** per esplorare temi di controllo, libertà, identità e resistenza. Le razze sono progettate per creare tensione naturale nel party attraverso filosofie contrastanti.",
    severity: "info" as const,
  };

  return (
    <div className="races-page">
      {/* Background decorativo */}
      <div className="background-ornaments">
        <div className="ornament ornament-1">⚜</div>
        <div className="ornament ornament-2">✠</div>
        <div className="ornament ornament-3">⚜</div>
        <div className="ornament ornament-4">✠</div>
      </div>

      <div className="races-container">
        {/* Header usando PageHeader component */}
        <PageHeader header={header} />

        {/* Intro usando TextSection component */}
        <TextSection data={introTextSection} />

        {/* Razze usando GridSection con ContentBox */}
        <GridSection data={racesGridSection} />

        {/* Popolazione e distribuzione usando TextSection */}
        <TextSection data={populationTextSection} />

        {/* Dinamiche sociali usando GridSection */}
        <GridSection data={dynamicsGridSection} />

        {/* Utilizzo narrativo usando InfoBox */}
        <InfoBox data={narrativeInfoBox} />

        {/* Meccaniche di gioco usando InfoBox */}
        <InfoBox data={mechanicsInfoBox} />

        {/* Note DM usando InfoBox component */}
        <InfoBox data={dmNotesInfoBox} />
      </div>
    </div>
  );
};

export default RacesPage;
