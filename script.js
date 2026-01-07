// Spielzustand
let currentNode = 'start';
let playerName = 'Jakob';
let hasBrother = false;
let isInPrison = false;
let isDead = false;

// Entscheidungsbaum - Verzweigtes Szenario
const storyTree = {
    start: {
        title: "Herbst 1872 – Die Entscheidung",
        situation: `Du bist ${playerName}, 14 Jahre alt, aus einem Dorf bei Breslau in Schlesien.  Dein Vater ist letzten Winter gestorben.  Deine Mutter arbeitet als Tagelöhnerin, aber die Löhne auf dem Land sinken seit Jahren – billiges Getreide aus Russland und Amerika macht die Bauern arm.  Deine drei jüngeren Geschwister hungern.  Der Dorfschmied erzählt von seinem Neffen, der im Ruhrgebiet in einer Zeche arbeitet:  "12 Silbergroschen am Tag!  In einer Woche mehr als hier im ganzen Monat!"`,
        choices: [
            {
                text: "Du gehst allein nach Bochum, wo Kohlezechen Arbeiter suchen.  Die Fahrt kostet fast alles, was die Familie hat.",
                consequence: "Nach drei Tagen Fahrt im überfüllten Güterwagen erreichst du Bochum. Der Gestank der Koksöfen brennt in der Nase. Du findest Arbeit als Schlepperjunge in der Zeche \"Präsident\" – 10 Stunden unter Tage, 8 Silbergroschen am Tag.",
                next: "question2_alone"
            },
            {
                text: "Du versuchst, beim örtlichen Großbauern als Knecht unterzukommen – Kost und Logis gegen Arbeit.",
                consequence: "Der Bauer nimmt dich, zahlt aber nichts. Nach vier Monaten schlägt er dich, weil du \"zu langsam\" bist. Du fliehst und gehst doch noch ins Ruhrgebiet.",
                next: "question2_alone"
            },
            {
                text: "Du nimmst deinen 11-jährigen Bruder Heinrich mit ins Ruhrgebiet.  Zwei verdienen mehr als einer.",
                consequence: "Ihr beide findet Arbeit in derselben Zeche. Heinrich wird \"Türjunge\" – er muss im Dunkeln sitzen und Wettertüren öffnen, 10 Stunden täglich. Zusammen verdient ihr 14 Silbergroschen.",
                next: "question2_brother",
                action: () => { hasBrother = true; }
            },
            {
                text: "Du gehst nach Breslau zur Textilfabrik, nur einen Tagesmarsch entfernt.",
                consequence: "In Breslau herrscht Typhus. Die Fabrik stellt niemanden ein.  Du kehrst hungrig zurück und gehst schließlich doch ins Ruhrgebiet.",
                next: "question2_alone"
            }
        ]
    },
    
    question2_alone: {
        title: "Winter 1872/73 – Das neue Leben",
        situation: `Du wohnst jetzt in einer "Schlafstelle" – ein Bett in einem Keller, das du mit zwei Schichtarbeitern teilst.  Jeder schläft 8 Stunden, dann kommt der nächste.  Die Vermieterin, eine Witwe, verlangt 1 Silbergroschen täglich. Das Bett ist voller Wanzen, die Wände schimmeln.  Du arbeitest in völliger Dunkelheit unter Tage, schleppst Kohlenwagen.  Deine Hände sind blutig, der Rücken schmerzt ständig. Von deinen 8 Silbergroschen bleiben nach Miete und Brot etwa 3 übrig. `,
        choices: [
            {
                text: "Du schickst alles nach Hause zu deiner Mutter und isst nur das Nötigste.",
                consequence: "Deine Familie überlebt den Winter.  Aber du wirst immer schwächer.  Im März 1873 erkrankst du an schwerem Durchfall – das Trinkwasser ist verseucht.  Du verlierst 5 Tage Lohn.",
                next: "question3_alone_weak"
            },
            {
                text: "Du kaufst dir Schnaps, wie die anderen Bergleute – es hilft gegen Kälte und Schmerz.",
                consequence: "Du verschuldest dich beim Schnapsverkäufer. Er arbeitet mit dem Zechenbesitzer zusammen – die Schulden werden direkt vom Lohn abgezogen. Du kommst nicht mehr raus.",
                next: "question3_alone_debt"
            },
            {
                text: "Du sparst jeden Pfennig für bessere Kleidung – deine Jacke ist durchlöchert.",
                consequence: "Im Februar 1873 bricht der Wiener Börsenkrach aus. Die Zeche entlässt 200 Arbeiter. Du behältst deine Stelle, aber der Lohn wird auf 7 Silbergroschen gesenkt.",
                next: "question3_alone_crisis"
            },
            {
                text: "Du gehst sonntagabends zur \"Keilerei\" (Kneipe), wo Bergleute sich treffen und Nachrichten austauschen.",
                consequence: "Du hörst von anderen Zechen, von Unfällen, von einem \"Knappverein\", der kranken Bergleuten hilft. Du beginnst zu verstehen, wie das System funktioniert.",
                next: "question3_alone_aware"
            }
        ]
    },
    
    question2_brother: {
        title:  "Winter 1872/73 – Das neue Leben",
        situation: `Ihr wohnt in einer "Schlafstelle" – ein Bett, das ihr mit einem Schichtarbeiter teilt. Die Vermieterin verlangt 1,5 Silbergroschen täglich. Heinrich hustet nachts – die Kohlenluft macht ihn krank. Du arbeitest in völliger Dunkelheit unter Tage, schleppst Kohlenwagen. Von euren 14 Silbergroschen bleiben nach Miete und Brot etwa 6 übrig.`,
        choices: [
            {
                text: "Du schickst alles nach Hause zu deiner Mutter.",
                consequence: "Deine Familie überlebt.  Aber Heinrich wird immer schwächer. Im März 1873 erkrankt er an schwerem Husten – Kohlenstaub in der Lunge.",
                next: "question3_brother_sick"
            },
            {
                text: "Du kaufst besseres Essen für dich und Heinrich.",
                consequence: "Heinrich erholt sich etwas, aber eure Mutter schreibt verzweifelte Briefe. Im Februar 1873 verhungert deine jüngste Schwester.",
                next: "question3_brother_guilt"
            },
            {
                text: "Du gehst sonntagabends zur Kneipe und nimmst Heinrich mit.",
                consequence: "Ihr hört von einem \"Knappverein\" und von anderen jungen Arbeitern.  Heinrich lernt lesen von einem alten Sozialdemokraten.  Ihr beginnt zu verstehen.",
                next: "question3_brother_aware"
            },
            {
                text: "Ihr spart für eine bessere Unterkunft.",
                consequence: "Nach sechs Monaten reicht es nicht. Die Mieten steigen schneller als ihr sparen könnt. Der Wiener Börsenkrach verschärft alles.",
                next: "question3_brother_crisis"
            }
        ]
    },
    
    question3_alone_weak: {
        title: "Frühjahr 1874 – Die Familie in Not",
        situation: `Du bist noch immer geschwächt.  Deine Mutter schreibt (der Dorfschullehrer schreibt für sie): Deine 9-jährige Schwester Marie soll in eine Seidenfabrik in Krefeld, 12 Stunden am Spulrad, 4 Silbergroschen am Tag.  "Besser als verhungern", schreibt die Mutter. Du weißt:  Mädchen verlieren in den Fabriken oft Finger, wenn sie müde werden. `,
        choices: [
            {
                text: "Du erlaubst es – ohne Maries Lohn stirbt die Familie.",
                consequence: "Marie arbeitet ab Mai 1874 in Krefeld. Im August verfängt sich ihr Zopf in der Spulmaschine – sie verliert Kopfhaut und rechtes Ohr. Sie überlebt, ist entstellt.  Die Familie hat Einkommen.",
                next: "question4_sister_injured"
            },
            {
                text: "Du verbietest es und nimmst eine zweite Arbeit an:  nachts Kohlensäcke verladen am Bahnhof.",
                consequence: "Nach drei Wochen brichst du vor Erschöpfung zusammen. Ein Kohlewagen rollt über dein linkes Bein. Der Zechenarzt amputiert unter dem Knie.  Keine Entschädigung – \"eigenes Verschulden durch Übermüdung\".",
                next: "ending_crippled"
            },
            {
                text: "Du schreibst an den katholischen Kaplan der Zeche und bittest um Hilfe.",
                consequence: "Der Kaplan gibt 2 Taler Almosen. Es hilft für einen Monat. Marie muss trotzdem arbeiten.",
                next: "question4_sister_works"
            },
            {
                text: "Du fragst in der Kneipe nach dem \"Knappverein\".",
                consequence: "Im Knappverein triffst du ältere Bergleute. Sie erklären:  \"Allein ist der Arbeiter nichts – zusammen sind wir stark.\" Du trittst bei und die Familie bekommt kleine Unterstützung.",
                next: "question4_knappverein"
            }
        ]
    },
    
    question3_brother_sick: {
        title: "Frühjahr 1874 – Heinrichs Krankheit",
        situation: `Heinrich hustet jede Nacht schwarz.  Kohlenstaub.  Er ist erst 12, aber seine Lunge ist schon geschädigt. Der Zechenarzt sagt: "Ist halt so.  Kann weiterarbeiten." Aber du siehst, dass Heinrich immer schwächer wird.  Nachts weint er vor Schmerzen. `,
        choices: [
            {
                text: "Du lässt Heinrich weiterarbeiten – ihr braucht das Geld.",
                consequence: "Im Juli 1874 bricht Heinrich unter Tage zusammen. Er stirbt drei Tage später an Lungenversagen. Er wird 12 Jahre alt. Du bist allein.",
                next: "question4_brother_dead"
            },
            {
                text: "Du schickst Heinrich zurück ins Dorf zur Mutter.",
                consequence: "Heinrich erholt sich langsam auf dem Land.  Aber ohne sein Einkommen verhungert deine jüngste Schwester. Du arbeitest allein weiter.",
                next: "question4_alone_guilt"
            },
            {
                text: "Du gehst zum Knappverein und bittest um Hilfe.",
                consequence: "Der Knappverein zahlt für einen Arztbesuch. Der Arzt sagt: \"Raus aus der Zeche oder er stirbt.\" Du schickst Heinrich nach Hause.  Die Vereinskasse unterstützt dich mit 2 Groschen pro Woche.",
                next: "question4_knappverein_saved"
            },
            {
                text: "Du kaufst \"Medizin\" vom Quacksalber am Markt.",
                consequence: "Die \"Medizin\" ist Schnaps mit Kräutern. Heinrich wird noch kränker. Nach zwei Wochen stirbt er an Vergiftung. Du wurdest betrogen.",
                next: "ending_brother_poisoned"
            }
        ]
    },
    
    question4_knappverein: {
        title: "Sommer 1877 – Der Lohnkampf",
        situation: `Du bist jetzt Mitglied im Knappverein. Die Konjunktur erholt sich, die Zeche macht Profite.  Aber im Juli 1877 kürzt die Direktion die Löhne um 1 Silbergroschen – angeblich wegen "schwieriger Flöze".  Gleichzeitig verlängert sie die Schicht auf 11 Stunden. Ein alter Hauer namens August Siegel sagt: "Wenn wir alle zusammenhalten, müssen sie nachgeben!" Andere warnen:  "Sie holen die Polizei!"`,
        choices: [
            {
                text:  "Du beteiligst dich am Streik und bleibst am 22.  Juli zu Hause.",
                consequence: "320 Mann streiken für 4 Tage. Die Polizei räumt die Zechenanlage mit Säbeln. Drei Bergleute werden schwer verletzt. Du wirst verhaftet, auf dem Polizeirevier geschlagen und nach 24 Stunden entlassen.  Dein Name steht auf einer Liste – keine Zeche im Revier stellt dich mehr ein.",
                next: "question5_blacklisted"
            },
            {
                text: "Du gehst zur Arbeit – du kannst dir keinen Lohnausfall leisten.",
                consequence: "Die Streikenden nennen dich \"Streikbrecher\".  Einer spuckt vor dir aus. Du behältst die Arbeit zum niedrigeren Lohn. Der Streik wird niedergeschlagen.",
                next: "question5_scab"
            },
            {
                text: "Du versuchst, mit dem Steiger zu reden und um Gnade zu bitten.",
                consequence: "Der Steiger lacht dich aus:  \"Fresse halten und arbeiten, oder verhungern. \" Die Streikenden verachten dich als Feigling.",
                next: "question5_coward"
            },
            {
                text: "Du organisierst heimlich eine Streikkasse mit anderen Knappmitgliedern.",
                consequence: "Ihr sammelt in drei Wochen 40 Taler. Als der Streik kommt, könnt ihr 50 Familien unterstützen. Der Streik hält länger durch.  Nach 6 Tagen lenken die Besitzer teilweise ein:  9,5-Stunden-Schicht, minimale Lohnerhöhung.",
                next: "question5_organizer"
            }
        ]
    },
    
    question5_blacklisted: {
        title: "Winter 1877/78 – Ohne Arbeit",
        situation: `Du stehst auf der schwarzen Liste. Keine Zeche nimmt dich.  Du versuchst es als Tagelöhner am Hafen in Duisburg – harte Arbeit, unregelmäßig, 4-5 Silbergroschen an guten Tagen. An manchen Tagen gibt es keine Arbeit. Du hungerst.  Nachts schläfst du in einem Schuppen.  Im Dezember kommt der Frost. `,
        choices: [
            {
                text: "Du versuchst, nach Hamburg zu kommen und auf einem Schiff anzuheuern.",
                consequence: "Du marschierst vier Tage durch den Schnee. In Hamburg findest du Arbeit als Kohlentrimmer auf einem Dampfer.  Harte Arbeit, aber regelmäßiger Lohn. Du verlässt Deutschland.",
                next: "ending_sailor"
            },
            {
                text: "Du brichst in eine Bäckerei ein, um Brot zu stehlen.",
                consequence: "Der Bäcker erwischt dich. Die Polizei verhaftet dich. Du wirst zu 18 Monaten Zuchthaus verurteilt wegen Einbruchdiebstahls.",
                next: "question6_prison"
            },
            {
                text: "Du gehst zurück zum Knappverein und bittest um Hilfe.",
                consequence: "Der Verein sammelt Geld für dich – 28 Groschen. Es reicht für zwei Wochen. Sie organisieren dir heimlich Arbeit in einer kleinen Zeche in Westfalen, wo niemand die schwarze Liste kennt.",
                next: "question6_new_job"
            },
            {
                text: "Du erfrierst langsam im Schuppen und gibst auf.",
                consequence: "Am 14. Januar 1878 findest ein Hafenarbeiter deine Leiche im Schuppen. Du wirst 19 Jahre alt. Ein namenloses Grab auf dem Armenfriedhof.",
                next: "ending_frozen"
            }
        ]
    },
    
    question6_prison: {
        title:  "Frühjahr 1878 – Im Zuchthaus",
        situation: `Das Zuchthaus Bochum ist die Hölle. 14 Stunden täglich Steineklopfen. Schläge bei jedem Verstoß. Das Essen ist verrottet. Aber hier triffst du andere:  Sozialdemokraten, Gewerkschafter, Männer, die beim Streik verhaftet wurden. Ein Mann namens Wilhelm Liebknecht erklärt dir: "Der Arbeiter wird immer verlieren – bis wir uns alle organisieren, bis wir politische Macht haben."`,
        choices: [
            {
                text: "Du hörst zu und lernst.  Du willst kämpfen.",
                consequence: "Nach 18 Monaten wirst du entlassen – härter, wütender, aber mit klarem Bewusstsein. Du trittst der verbotenen SPD bei.",
                next: "question7_socialist",
                action: () => { isInPrison = false; }
            },
            {
                text: "Du hältst den Kopf unten und willst nur überleben.",
                consequence: "Nach 18 Monaten wirst du entlassen, gebrochen und ohne Hoffnung. Du findest kaum Arbeit – jetzt bist du vorbestraft UND auf der schwarzen Liste.",
                next: "ending_broken"
            },
            {
                text: "Du versuchst zu fliehen.",
                consequence: "Beim Fluchtversuch erschießt dich ein Wachmann in den Rücken. Du stirbst auf der Zuchthaus-Mauer. Du wirst 20 Jahre alt.",
                next: "ending_shot"
            },
            {
                text: "Du wirst krank – Typhus grassiert im Zuchthaus.",
                consequence: "Du liegst wochenlang im Fieber. Fünfzehn Gefangene sterben. Du überlebst knapp, aber dein Körper ist ruiniert.  Nach der Entlassung kannst du nicht mehr schwer arbeiten.",
                next: "ending_crippled_disease"
            }
        ]
    },
    
    question7_socialist: {
        title:  "Herbst 1878 – Das Sozialistengesetz",
        situation: `Du bist frei, aber Bismarck erlässt im Oktober 1878 das Sozialistengesetz.  Arbeitervereine werden verboten, sozialdemokratische Zeitungen geschlossen, Versammlungen aufgelöst. Ein Mann namens Karl Hoffmann organisiert heimliche Treffen im Wald außerhalb Bochums.  Du hast im Zuchthaus gelernt:  Nur gemeinsam sind wir stark.`,
        choices: [
            {
                text: "Du gehst zu den geheimen Treffen – trotz des Risikos.",
                consequence: "Ihr organisiert euch im Untergrund.  Über Monate baut ihr ein Netzwerk auf. Flugblätter, geheime Kassen, Solidarität. Am 3. November 1878 stürmt die Polizei ein Treffen. Du entkommst durch den Wald.",
                next: "question8_underground"
            },
            {
                text: "Du konzentrierst dich auf legale Gewerkschaftsarbeit.",
                consequence: "Du hilfst, eine Krankenkasse aufzubauen. Es ist langsam, mühsam, aber legal.  Kleine Schritte.  1883 kommen Bismarcks Sozialgesetze – ihr hattet einen kleinen Anteil daran.",
                next: "ending_reformist"
            },
            {
                text: "Du emigrierst nach Amerika – hier gibt es keine Zukunft.",
                consequence: "Du verkaufst alles und kaufst eine Schiffspassage.  In New York arbeitest du in einer Fabrik – auch dort Ausbeutung, aber ohne Sozialistengesetz.  Du baust ein neues Leben auf.",
                next: "ending_america"
            },
            {
                text: "Du bist zu erschöpft.  Du ziehst dich zurück.",
                consequence: "Du arbeitest als einfacher Tagelöhner bis zu deinem Tod. Die Bewegung zieht an dir vorbei. Du stirbst 1891 an Lungentuberkulose, vergessen.",
                next: "ending_forgotten"
            }
        ]
    },
    
    question8_underground: {
        title:  "Frühjahr 1889 – Der große Streik",
        situation:  `Du bist jetzt 31 Jahre alt. Im Mai 1889 beginnt der größte Bergarbeiterstreik im Ruhrgebiet:  90. 000 Mann legen die Arbeit nieder. Die Forderungen:  8-Stunden-Schicht, 20% mehr Lohn, Ende der Willkür. Kaiser Wilhelm II. schickt Truppen.  Du bist einer der geheimen Organisatoren – die Polizei sucht dich.  Dies ist der Moment, auf den ihr jahrelang hingearbeitet habt.`,
        choices: [
            {
                text: "Du stellst dich an die Spitze – trotz der Gefahr.",
                consequence: "Du hältst Reden vor Tausenden. Die Zeitungen nennen dich einen \"Rädelsführer\". Nach drei Wochen werden minimale Zugeständnisse gemacht.  Du wirst verhaftet und zu 3 Jahren Zuchthaus verurteilt – aber du hast Geschichte geschrieben.",
                next: "ending_hero"
            },
            {
                text: "Du organisierst im Hintergrund – Streikkassen, Kommunikation, Versorgung.",
                consequence: "Der Streik bringt erste Erfolge. Du bleibst unerkannt, kannst weitermachen. 1890 fällt das Sozialistengesetz.  Die SPD wird legal. Du wirst Gewerkschaftsführer.",
                next: "ending_organizer"
            },
            {
                text: "Du wirst von einem Spitzel verraten.",
                consequence: "Die Polizei verhaftet dich am 18. Mai. Im Verhör wirst du schwer misshandelt. Man bietet dir einen Deal: Namen nennen oder 5 Jahre Zuchthaus.",
                next: "final_choice_betrayal"
            },
            {
                text: "Du zweifelst im letzten Moment – zu viel Risiko.",
                consequence: "Du ziehst dich zurück. Der Streik geschieht ohne dich. Er bringt kleine Erfolge.  Du lebst weiter in Sicherheit, aber mit lebenslanger Scham.",
                next: "ending_coward_final"
            }
        ]
    },
    
    final_choice_betrayal: {
        title: "Mai 1889 – Die letzte Entscheidung",
        situation:  `Du sitzt blutig im Verhörzimmer. Der Polizeikommissar sagt: "Nenne uns zehn Namen von Rädelsführern, und du kommst mit sechs Monaten davon.  Schweigst du, sind es fünf Jahre Zuchthaus – und wir kriegen sie trotzdem." Du denkst an Wilhelm, an Karl, an die anderen.  An jahrelange Arbeit.  An Solidarität. An alles, wofür ihr gekämpft habt.`,
        choices: [
            {
                text: "Du nennst die Namen – du kannst nicht noch einmal ins Zuchthaus.",
                consequence: "Du wirst nach sechs Monaten entlassen.  Aber die Arbeiterbewegung verstößt dich als Verräter.  Niemand spricht mehr mit dir. Du lebst in Isolation bis zu deinem Tod.",
                next: "ending_traitor"
            },
            {
                text: "Du schweigst.  Solidarität bis zum Ende.",
                consequence: "Fünf Jahre Zuchthaus.  Harte Jahre.  Aber als du 1894 entlassen wirst, empfangen dich Hunderte Genossen am Tor. Du bist eine Legende.  Du hast nicht gebrochen.",
                next: "ending_unbroken"
            },
            {
                text: "Du nennst falsche Namen – Fabrikbesitzer und Polizeispitzel.",
                consequence: "Die Polizei merkt den Betrug. Sie schlagen dich halb tot. Du überlebst, wirst zu 7 Jahren verurteilt.  Aber die Bewegung weiß:  Du hast niemanden verraten.",
                next: "ending_defiant"
            },
            {
                text: "Du greifst den Kommissar an – lieber Tod als Verrat.",
                consequence: "Die Wachen erschießen dich. Du stirbst mit 31 Jahren im Polizeipräsidium Bochum.  Dein Name wird in Arbeiterliedern besungen. Du bist unsterblich.",
                next: "ending_martyr"
            }
        ]
    },
    
    // ENDINGS
    ending_frozen: {
        title: "Ende – Erfroren und vergessen",
        text: `Du stirbst im Winter 1878 im Alter von 19 Jahren in einem Hafenschuppen in Duisburg. Niemand kennt deinen Namen. Du wirst in einem Massengrab auf dem Armenfriedhof verscharrt. Tausende teilten dein Schicksal – junge Menschen, die vom Land in die Städte kamen, von der Industrialisierung verschlungen und vergessen wurden.  Die soziale Frage blieb unbeantwortet.  Für dich kam jede Hilfe zu spät.`,
        isDeath: true
    },
    
    ending_crippled:  {
        title: "Ende – Zum Krüppel gemacht",
        text: `Nach der Amputation deines Beins 1874 kannst du nicht mehr unter Tage arbeiten. Du bettelst auf den Straßen Bochums. Die Zeche zahlte keine Entschädigung – \"eigenes Verschulden\". 1884 kommt Bismarcks Unfallversicherung, aber sie gilt nicht rückwirkend. Du stirbst 1887 an Unterernährung, 29 Jahre alt. Dein Leben zeigt die Brutalität der frühen Industrialisierung: Menschen als Verbrauchsmaterial, weggeworfen nach dem Unfall.`,
        isDeath: true
    },
    
    ending_hero: {
        title: "Ende – Der Rädelsführer",
        text: `Du verbringst drei Jahre im Zuchthaus, wirst 1892 entlassen.  Die Arbeiterbewegung feiert dich als Helden. Du wirst Reichstagsabgeordneter der SPD. 1918 erlebst du die Revolution, die Abdankung des Kaisers.  Im Alter erzählst du deinen Enkeln von den Kämpfen der 1870er und 1880er Jahre – von Hunger, Repression, aber auch von Solidarität und kleinen Siegen.  Du stirbst 1923, 65 Jahre alt, in Würde.  Dein Leben zeigt:  Organisierter Widerstand kann die Welt verändern.`,
        isDeath: false
    },
    
    ending_unbroken: {
        title:  "Ende – Ungebrochen",
        text: `Nach fünf Jahren Zuchthaus (1889-1894) wirst du entlassen.  Hunderte Genossen empfangen dich.  Du hast nicht gebrochen, niemanden verraten.  Du arbeitest als Gewerkschaftsorganisator, prägst die Arbeiterbewegung bis ins 20. Jahrhundert. 1918 erlebst du die Revolution.  Du stirbst 1928 im Alter von 70 Jahren, umgeben von drei Generationen von Arbeitern, die du inspiriert hast. Dein Leben zeigt:  Solidarität und Prinzipientreue können Systeme überdauern.`,
        isDeath: false
    },
    
    ending_martyr: {
        title: "Ende – Der Märtyrer",
        text: `Du stirbst am 18. Mai 1889 im Polizeipräsidium Bochum, erschossen im Alter von 31 Jahren. Die Arbeiterbewegung macht dich zum Märtyrer.  Dein Name wird in Liedern besungen, auf Transparenten getragen. \"Jakob fiel, damit wir leben können.\" Jahrzehnte später erinnert eine Gedenktafel an dich.  Dein Tod zeigt: Die Arbeiterbewegung wurde mit Blut erkäft.  Aber aus jedem Märtyrer erwuchsen zehn neue Kämpfer.`,
        isDeath: true
    },
    
    ending_traitor: {
        title: "Ende – Der Verräter",
        text: `Du hast zehn Namen genannt.  Sechs Männer wurden verhaftet. Die Arbeiterbewegung verstößt dich.  Niemand spricht mehr mit dir.  Du findest Arbeit als Werkschutz – jetzt bewachst du die Zeche gegen Streikende. Die anderen Arbeiter hassen dich. Du trinkst dich zu Tode, stirbst 1897 an Leberzirrhose, 39 Jahre alt, allein und verachtet.  Dein Leben zeigt:  Verrat zerstört nicht nur andere, sondern vor allem einen selbst.`,
        isDeath: true
    },
    
    ending_organizer: {
        title: "Ende – Der stille Organisator",
        text:  `Du wirst nie verhaftet, stehst nie im Rampenlicht. Aber du bist das Rückgrat der Bewegung:  Streikkassen, Bildungsabende, Krankenkassen, heimliche Flugblätter. 1890 fällt das Sozialistengesetz. Die SPD wird legal. Du wirst Gewerkschaftsführer, organisierst Tausende. 1912 wird die SPD stärkste Partei im Reichstag. Du stirbst 1920 im Alter von 62 Jahren.  Bei deiner Beerdigung kommen 5. 000 Menschen. Dein Leben zeigt: Revolutionen brauchen nicht nur Redner, sondern vor allem Organisatoren.`,
        isDeath: false
    },
    
    ending_forgotten: {
        title: "Ende – Vergessen",
        text: `Du stirbst 1891 an Lungentuberkulose, 33 Jahre alt.  Die Arbeiterbewegung zieht an dir vorbei.  Du warst zu erschöpft, zu gebrochen.  Ein namenloses Grab, keine Familie, keine Genossen.  Dein Leben zeigt die andere Seite: Nicht alle konnten kämpfen.  Viele wurden von der Industrialisierung einfach zermalmt, vergessen von der Geschichte.  Auch ihr Schicksal gehört zur sozialen Frage.`,
        isDeath: true
    },
    
    ending_america: {
        title: "Ende – Das neue Land",
        text: `In Amerika arbeitest du in Pittsburgh, wieder in Stahlfabriken.  Auch dort Ausbeutung, auch dort Kämpfe.  Aber du überlebst, gründest eine Familie.  Deine Kinder werden Amerikaner, sprechen kaum Deutsch. 1910, mit 52 Jahren, besitzt du ein kleines Haus.  Du bist der Armut entkommen.  Aber manchmal denkst du an Bochum, an die Genossen, an die Kämpfe.  Dein Leben zeigt: Emigration war für manche der einzige Ausweg.  Aber die Flucht löste die soziale Frage nicht – sie blieb in Deutschland zurück.`,
        isDeath: false
    },
    
    ending_sailor: {
        title: "Ende – Zur See",
        text: `Du arbeitest als Matrose auf Handelsschiffen. Die Arbeit ist hart, aber du siehst die Welt:  Hamburg, London, New York, Kalkutta. 1885 heuerst du auf einem Walfänger an.  Du überlebst, kehrst nie nach Deutschland zurück. 1902 lässt du dich in Liverpool nieder, heiratest eine Irin. Du stirbst 1915 im Alter von 57 Jahren.  Dein Leben zeigt:  Manche entkamen der Industriehölle durch Flucht.  Aber Millionen hatten diese Option nicht.`,
        isDeath: false
    },
    
    ending_broken: {
        title: "Ende – Gebrochen",
        text: `18 Monate Zuchthaus haben dich zerstört. Du bist vorbestraft UND auf der schwarzen Liste.  Keine Zeche nimmt dich.  Du lebst von Gelegenheitsarbeiten, Betteln, manchmal Diebstahl. 1883 wirst du wieder verhaftet – Vagabundage.  Weitere 12 Monate.  Du stirbst 1885 in einer Armenunterkunft an Typhus, 27 Jahre alt. Dein Leben zeigt: Der Staat und die Industrie brachen systematisch jeden Widerstand.  Viele überlebten das nicht.`,
        isDeath: true
    },
    
    ending_reformist: {
        title: "Ende – Der Reformer",
        text: `Du arbeitest jahrzehntelang in der Gewerkschaft, organisierst Krankenkassen, Bildungsvereine, legale Streiks. 1883 kommen Bismarcks Sozialgesetze – ein kleiner Sieg.  1890 fällt das Sozialistengesetz. Die Bewegung wächst legal. Du wirst nie berühmt, aber du verbesserst das Leben Tausender. Du stirbst 1918 im Alter von 60 Jahren, drei Wochen vor der Revolution. Dein Leben zeigt: Auch kleine, geduldige Schritte können Systeme verändern.  Reform UND Revolution waren nötig.`,
        isDeath: false
    },
    
    ending_defiant: {
        title: "Ende – Trotz",
        text: `Sieben Jahre Zuchthaus (1889-1896) für deinen Betrugsversuch. Du wirst schwer misshandelt, aber du hast niemanden verraten. 1896 entlassen, arbeitest du als einfacher Bergmann weiter. Du lebst in Armut, aber mit erhobenem Kopf. Die Genossen respektieren dich. Du stirbst 1912 an Staublunge, 54 Jahre alt. Bei deiner Beerdigung sprechen 200 Bergleute das Lied „Brüder, zur Sonne, zur Freiheit".  Dein Leben zeigt:  Würde kann man nicht brechen. `,
        isDeath: false
    },
    
    ending_shot: {
        title: "Ende – Auf der Flucht erschossen",
        text: `Am 23. März 1879 fällt deine Leiche von der Zuchthausmauer.  Du wirst 20 Jahre alt.  Der Wachmann wird befördert.  Dein Name erscheint in keiner Statistik. Ein namenloses Grab hinter dem Zuchthaus.  Dein Leben zeigt die Gewalt des Systems: Gefängnisse, Polizei, Militär – alle Macht lag beim Staat und den Besitzenden.  Wer aufbegehrte, wurde gebrochen oder getötet.`,
        isDeath: true
    },
    
    ending_brother_poisoned: {
        title: "Ende – Betrogen und verloren",
        text: `Heinrich stirbt im April 1874 an der vergifteten \"Medizin\" des Quacksalbers. Er wird 12 Jahre alt. Du bist zerstört. Du arbeitest weiter, aber ohne Sinn. 1878 stirbst du bei einem Grubenunglück – ein Stollen stürzt ein. Du wirst 20 Jahre alt. Dein Leben zeigt: Die Armut machte Menschen anfällig für Betrüger. Ohne Geld für echte Ärzte starben Arbeiter an Scharlatanen.`,
        isDeath: true
    }
};

// Spiel initialisieren
function initGame() {
    currentNode = 'start';
    hasBrother = false;
    isInPrison = false;
    isDead = false;
    displayNode(currentNode);
}

// Node anzeigen
function displayNode(nodeId) {
    const node = storyTree[nodeId];
    
    if (! node) {
        console.error('Node nicht gefunden:', nodeId);
        return;
    }
    
    // Prüfen ob Ende
    if (nodeId. startsWith('ending_')) {
        showEnding(node);
        return;
    }
    
    // Story anzeigen
    document.getElementById('question-title').textContent = node.title;
    document.getElementById('situation-text').textContent = node.situation;
    
    // Choices anzeigen
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer. innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    node.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.setAttribute('data-letter', letters[index] + ')');
        button.textContent = choice. text;
        button.onclick = () => makeChoice(choice);
        choicesContainer.appendChild(button);
    });
    
    // Sichtbarkeit setzen
    document.getElementById('story-section').style.display = 'block';
    document.getElementById('choices-section').style.display = 'block';
    document.getElementById('consequence-section').style.display = 'none';
    document.getElementById('ending-section').style.display = 'none';
}

// Wahl treffen
function makeChoice(choice) {
    // Action ausführen (z.B. hasBrother setzen)
    if (choice.action) {
        choice.action();
    }
    
    // Konsequenz anzeigen
    document.getElementById('consequence-text').textContent = choice.consequence;
    document.getElementById('consequence-section').style.display = 'block';
    document.getElementById('choices-section').style.display = 'none';
    
    // Weiter-Button
    document.getElementById('continue-btn').onclick = () => {
        displayNode(choice.next);
    };
}

// Ende anzeigen
function showEnding(ending) {
    document.getElementById('ending-title').textContent = ending.title;
    document.getElementById('ending-text').textContent = ending.text;
    
    const endingBox = document.querySelector('.ending-box');
    if (ending.isDeath) {
        endingBox.classList.add('death-ending');
    } else {
        endingBox.classList.remove('death-ending');
    }
    
    document.getElementById('story-section').style.display = 'none';
    document.getElementById('choices-section').style.display = 'none';
    document.getElementById('consequence-section').style.display = 'none';
    document.getElementById('ending-section').style.display = 'block';
    
    document.getElementById('restart-btn').onclick = initGame;
}

// Spiel starten
initGame();
