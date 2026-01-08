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
    
    question3_alone_debt: {
        title: "Frühjahr 1873 – Gefangen in Schulden",
        situation: `Der Schnapsverkäufer hat dich in der Falle. Jeden Freitag nimmt er die Hälfte deines Lohns direkt an der Zeche. Du kannst nicht mehr nach Hause schicken. Deine Mutter schreibt verzweifelte Briefe. Im April stirbt dein jüngster Bruder an Hunger. Du trinkst noch mehr, um zu vergessen.`,
        choices: [
            {
                text: "Du versuchst, die Schulden abzuarbeiten und nüchtern zu werden.",
                consequence: "Nach einem Jahr harter Arbeit und Verzicht bist du schuldenfrei. Aber die Familie hat gelitten. Du bist verbittert, aber frei.",
                next: "question4_alone_guilt"
            },
            {
                text: "Du fliehst nachts aus Bochum, ohne die Schulden zu zahlen.",
                consequence: "Du marschierst nach Dortmund. Dort findest du Arbeit in einer anderen Zeche unter falschem Namen. Du lebst in ständiger Angst, erkannt zu werden.",
                next: "question6_new_job"
            },
            {
                text: "Du gibst auf und säufst dich zu Tode.",
                consequence: "Im Herbst 1873 bricht deine Leber zusammen. Du stirbst mit 15 Jahren in der Schlafstelle. Der Schnapsverkäufer nimmt deine Jacke als letzte Zahlung.",
                next: "ending_broken"
            },
            {
                text: "Du gehst zum Knappverein und bittest um Hilfe gegen den Wucherer.",
                consequence: "Der Verein konfrontiert den Schnapsverkäufer öffentlich. Nach einer heftigen Auseinandersetzung wird ein Kompromiss gefunden. Du zahlst die Hälfte der Schulden ab.",
                next: "question4_knappverein"
            }
        ]
    },
    
    question3_alone_crisis: {
        title: "Frühjahr 1873 – Die Wirtschaftskrise",
        situation: `Der Wiener Börsenkrach hat die gesamte Wirtschaft getroffen. Dein Lohn wurde auf 7 Silbergroschen gekürzt. Die Zeche droht mit weiteren Entlassungen. Andere Bergleute werden aggressiv – jeder hat Angst um seine Stelle. Die Stimmung ist explosiv.`,
        choices: [
            {
                text: "Du arbeitest härter und länger, um deine Stelle zu sichern.",
                consequence: "Du machst Überstunden ohne Bezahlung. Nach sechs Monaten kollabierst du vor Erschöpfung. Im Krankenhaus erfährst du: chronische Mangelernährung.",
                next: "question3_alone_weak"
            },
            {
                text: "Du suchst nach einer anderen Arbeit in Essen oder Dortmund.",
                consequence: "Überall dasselbe Bild: Lohnkürzungen, Entlassungen. Nach drei Wochen Suche kehrst du zurück. Du hast zwei Wochen Lohn verloren.",
                next: "question4_alone_guilt"
            },
            {
                text: "Du gehst zu den Treffen des Knappvereins, wo über Widerstand geredet wird.",
                consequence: "Im Knappverein lernst du: Die Krise trifft nicht alle gleich. Die Zechenbesitzer machen noch immer Profit. Du beginnst zu verstehen.",
                next: "question4_knappverein"
            },
            {
                text: "Du versuchst, zurück aufs Land zu deiner Familie zu gehen.",
                consequence: "Dort ist es noch schlimmer – die Agrarkrise trifft härter. Nach zwei Monaten gehst du zurück ins Ruhrgebiet. Diesmal mit klarerem Blick.",
                next: "question4_knappverein"
            }
        ]
    },
    
    question3_alone_aware: {
        title: "Frühjahr 1873 – Erwachendes Bewusstsein",
        situation: `In der Kneipe hörst du die älteren Bergleute reden. Ein Mann namens Friedrich erzählt von Streiks in Belgien, von Gewerkschaften in England, vom \"Kommunistischen Manifest\". Ein anderer warnt: \"Das Sozialistengesetz kommt bald – dann ist Schluss mit Reden.\" Du beginnst zu verstehen: Das System ist gemacht, um dich unten zu halten.`,
        choices: [
            {
                text: "Du willst mehr lernen und trittst dem Knappverein bei.",
                consequence: "Im Knappverein bekommst du Zugang zu verbotenen Zeitungen und Flugblättern. Ein alter Sozialdemokrat bringt dir Lesen bei. Deine Welt öffnet sich.",
                next: "question4_knappverein"
            },
            {
                text: "Das ist dir zu gefährlich – du konzentrierst dich auf die Arbeit.",
                consequence: "Du bleibst unpolitisch, arbeitest weiter. Die Jahre vergehen. 1877 kommt der große Streik – du stehst abseits.",
                next: "question5_scab"
            },
            {
                text: "Du fragst nach konkreter Hilfe für deine hungernde Familie.",
                consequence: "Der Knappverein sammelt 3 Taler für dich. Es rettet deine Geschwister über den Winter. Du bist jetzt Teil der Solidargemeinschaft.",
                next: "question4_knappverein"
            },
            {
                text: "Du denkst: Diese Reden ändern nichts, Auswandern ist die einzige Lösung.",
                consequence: "Du sparst zwei Jahre lang jeden Pfennig. 1875 kaufst du eine Schiffspassage nach Amerika.",
                next: "ending_america"
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
    
    question3_brother_aware: {
        title: "Frühjahr 1873 – Bildung und Bewusstsein",
        situation: `Der alte Sozialdemokrat in der Kneipe heißt Otto Weber. Er war 1848 dabei, bei der Revolution. Jetzt lehrt er Heinrich und dich lesen. Heinrich ist begabt – mit 11 Jahren liest er schon Zeitungen. Ihr versteht langsam: Eure Armut ist kein Schicksal, sondern gemacht.`,
        choices: [
            {
                text: "Ihr beide tretet dem Knappverein bei und engagiert euch.",
                consequence: "Der Verein wird eure zweite Familie. Heinrich wächst im politischen Bewusstsein auf. Als 1877 der Streik kommt, seid ihr vorbereitet.",
                next: "question4_knappverein"
            },
            {
                text: "Das ist zu gefährlich für Heinrich – du schickst ihn zurück nach Hause.",
                consequence: "Heinrich protestiert, will bleiben und kämpfen. Aber du bestehst darauf. Er geht zurück aufs Land, voller Groll. Du bleibst allein.",
                next: "question4_alone_guilt"
            },
            {
                text: "Ihr konzentriert euch auf Selbstbildung, haltet euch aus Politik raus.",
                consequence: "Heinrich und du lernt weiter, bleibt aber unpolitisch. Als der Streik 1877 kommt, steht ihr abseits. Viele verachten euch.",
                next: "question5_scab"
            },
            {
                text: "Heinrich soll zur Schule – ihr spart für seine Ausbildung.",
                consequence: "Nach zwei Jahren reicht es für drei Monate Abendschule. Heinrich lernt Schreiben und Rechnen. Er wird später Gewerkschaftssekretär.",
                next: "question4_knappverein_saved"
            }
        ]
    },
    
    question3_brother_crisis: {
        title: "Frühjahr 1873 – Die Wirtschaftskrise trifft hart",
        situation: `Der Wiener Börsenkrach hat alles verschlimmert. Die Mieten steigen, während die Löhne fallen. Ihr könnt eure Ersparnisse nicht halten. Heinrich wird immer dünner – er bekommt nicht genug zu essen. Die Vermieterin droht mit Rauswurf.`,
        choices: [
            {
                text: "Ihr zieht in eine noch billigere Unterkunft – ein Loch im Keller.",
                consequence: "Der Keller ist feucht und kalt. Im Winter 1873/74 erkrankt Heinrich an schwerem Husten. Die Ersparnisse sind trotzdem weg.",
                next: "question3_brother_sick"
            },
            {
                text: "Du suchst für Heinrich eine leichtere Arbeit über Tage.",
                consequence: "Heinrich wird Botenjunge für die Zeche – weniger Lohn (4 Groschen), aber gesünder. Zusammen überlebt ihr die Krise.",
                next: "question4_knappverein_saved"
            },
            {
                text: "Ihr geht beide zurück ins Dorf – hier gibt es keine Zukunft.",
                consequence: "Auf dem Land ist es noch schlimmer. Nach drei Monaten Hunger geht ihr doch zurück ins Ruhrgebiet. Diesmal ohne Illusionen.",
                next: "question4_alone_guilt"
            },
            {
                text: "Ihr geht zum Knappverein und bittet um Unterstützung.",
                consequence: "Der Verein hilft euch durch die schwerste Zeit. 5 Groschen pro Woche aus der Solidarkasse. Ihr überlebt – und lernt den Wert der Solidarität.",
                next: "question4_knappverein"
            }
        ]
    },
    
    question3_brother_guilt: {
        title: "Frühjahr 1874 – Das Gewicht der Schuld",
        situation: `Deine jüngste Schwester ist verhungert, weil ihr besser gegessen habt. Der Brief deiner Mutter ist voller Vorwürfe. Heinrich weint jede Nacht. Er sagt: \"Es ist meine Schuld.\" Du weißt: Das System ist schuld. Aber das hilft nicht gegen das Gefühl.`,
        choices: [
            {
                text: "Ihr schickt ab jetzt alles Geld nach Hause, esst nur Brot.",
                consequence: "Nach drei Monaten werdet ihr beide krank vor Schwäche. Heinrich bricht zusammen. Ihr müsst mehr essen, oder ihr sterbt auch.",
                next: "question3_brother_sick"
            },
            {
                text: "Ihr holt eure Mutter und die Geschwister ins Ruhrgebiet.",
                consequence: "Die ganze Familie kommt nach Bochum. Ihr wohnt zu sechst in einem Zimmer. Alle arbeiten – auch die 7-Jährige. Aber ihr seid zusammen.",
                next: "question4_knappverein"
            },
            {
                text: "Heinrich kann nicht mehr – du schickst ihn zurück zur Mutter.",
                consequence: "Heinrich geht zurück, gebrochen. Du arbeitest allein weiter, getrieben von Schuldgefühlen. Du wirst härter, verbitterter.",
                next: "question4_alone_guilt"
            },
            {
                text: "Ihr sucht Trost und Verständnis beim Knappverein.",
                consequence: "Dort treffen ihr andere mit ähnlichen Geschichten. Ihr seid nicht allein. Die Schuld wird zum Zorn – Zorn auf das System.",
                next: "question4_knappverein"
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
    
    question4_alone_guilt: {
        title: "Sommer 1875 – Leben mit der Schuld",
        situation: `Du arbeitest weiter, Jahr für Jahr. Die Schuld über den Tod deiner Schwester lässt dich nicht los. Du bist jetzt 17, fühlst dich wie 40. Die anderen Bergleute reden von Streiks, von Veränderung. Du fragst dich: Wozu?`,
        choices: [
            {
                text: "Du schließt dich dem Knappverein an – vielleicht gibt Kampf dem Leben Sinn.",
                consequence: "Im Verein findest du Kameradschaft. Die gemeinsame Sache gibt dir neue Kraft. Du beginnst, nach vorne zu schauen.",
                next: "question4_knappverein"
            },
            {
                text: "Du arbeitest mechanisch weiter, ohne Hoffnung.",
                consequence: "Die Jahre vergehen. Du wirst älter, aber nicht weiser. Als 1877 der Streik kommt, stehst du teilnahmslos daneben.",
                next: "question5_scab"
            },
            {
                text: "Du versuchst zu vergessen – mit Schnaps und Spielhöllen.",
                consequence: "Du verfällst dem Alkohol. Dein Geld fließt in die Kneipen. Du wirst zum Schatten deiner selbst.",
                next: "ending_broken"
            },
            {
                text: "Du sparst eisern und emigrierst nach Amerika.",
                consequence: "1876 verlässt du Deutschland für immer. In Amerika versuchst du, neu anzufangen – ohne die Geister der Vergangenheit.",
                next: "ending_america"
            }
        ]
    },
    
    question4_brother_dead: {
        title: "Herbst 1874 – Allein nach Heinrichs Tod",
        situation: `Heinrich ist tot. 12 Jahre alt. Er liegt auf dem Armenfriedhof, Grab Nr. 247, ohne Stein. Du bist allein in Bochum. Die Trauer frisst dich auf. Nachts hörst du seinen Husten noch immer. Du fragst dich: Wofür das alles?`,
        choices: [
            {
                text: "Du schwörst Rache an diesem System und trittst der Arbeiterbewegung bei.",
                consequence: "Heinrichs Tod wird dein Antrieb. Du trittst dem Knappverein bei, dann der SPD. Sein Tod soll nicht umsonst gewesen sein.",
                next: "question4_knappverein"
            },
            {
                text: "Du kannst nicht mehr – du gehst zurück ins Dorf zur Familie.",
                consequence: "Auf dem Land versuchst du zu vergessen. Aber die Armut ist überall. Nach einem Jahr gehst du zurück ins Ruhrgebiet.",
                next: "question4_alone_guilt"
            },
            {
                text: "Du arbeitest weiter wie ein Automat, innerlich tot.",
                consequence: "Die Jahre vergehen in grauer Monotonie. Du lebst, aber du lebst nicht wirklich. 1877 kommt der Streik – du bemerkst es kaum.",
                next: "question5_scab"
            },
            {
                text: "Du kannst es nicht ertragen und begehst Selbstmord.",
                consequence: "Am 3. November 1874 erhängst du dich in der Schlafstelle. Du wirst 16 Jahre alt. Man begräbt dich neben Heinrich. Grab Nr. 248.",
                next: "ending_forgotten"
            }
        ]
    },
    
    question4_knappverein_saved: {
        title: "Sommer 1876 – Ein kleiner Sieg",
        situation: `Der Knappverein hat geholfen. Heinrich lebt, wenn auch auf dem Land. Du arbeitest allein weiter, aber mit dem Wissen: Solidarität funktioniert. Andere Bergleute fragen dich nach dem Verein. Die Bewegung wächst. 1877 steht der große Streik bevor.`,
        choices: [
            {
                text: "Du wirbst aktiv neue Mitglieder für den Knappverein.",
                consequence: "In einem Jahr gewinnst du 30 neue Mitglieder. Als der Streik kommt, seid ihr stark genug für echten Widerstand.",
                next: "question5_organizer"
            },
            {
                text: "Du bleibst Mitglied, aber passiv – zu viel Risiko.",
                consequence: "Du zahlst Beiträge, gehst zu Treffen, aber hältst dich zurück. Als der Streik kommt, musst du dich entscheiden.",
                next: "question4_knappverein"
            },
            {
                text: "Du konzentrierst dich darauf, Heinrich eine Ausbildung zu finanzieren.",
                consequence: "Du schickst alles Geld nach Hause. Heinrich geht zur Schule. Er wird später Lehrer – ein Aufstieg. Dein Opfer war nicht umsonst.",
                next: "ending_reformist"
            },
            {
                text: "Du holst Heinrich zurück – er soll an deiner Seite kämpfen.",
                consequence: "Heinrich kommt zurück, diesmal als Lehrling über Tage. Ihr beide werdet aktiv im Knappverein. Brüder im Kampf.",
                next: "question4_knappverein"
            }
        ]
    },
    
    question4_sister_injured: {
        title: "Winter 1874 – Maries Verstümmelung",
        situation: `Marie kam nach Hause, ohne Ohr, mit Narben auf dem Kopf. Die anderen Kinder verspotten sie. Sie kann nicht mehr in die Fabrik – niemand will ein \"entstelltes Mädchen\". Deine Mutter schreibt: \"Wir verhungern.\" Die 4 Silbergroschen fehlen.`,
        choices: [
            {
                text: "Du schickst noch mehr Geld, arbeitest doppelt so viel.",
                consequence: "Du nimmst eine zweite Arbeit an. Nach vier Monaten kollabierst du. Im Krankenhaus erfährst du: Dein Körper gibt auf.",
                next: "ending_crippled_disease"
            },
            {
                text: "Du versuchst, Marie nach Bochum zu holen – vielleicht findet sie hier Arbeit.",
                consequence: "Marie kommt, aber findet nur Arbeit als Straßenmagd für 2 Groschen täglich. Ihr lebt zusammen in Armut, aber zusammen.",
                next: "question4_knappverein"
            },
            {
                text: "Du gehst zum Knappverein und bittest um Hilfe für die Familie.",
                consequence: "Der Verein sammelt 8 Taler für Marie. Es reicht für sechs Monate. Du lernst: Nur gemeinsam überleben wir.",
                next: "question4_knappverein"
            },
            {
                text: "Du schreibst an die Fabrik und forderst Entschädigung für Marie.",
                consequence: "Die Fabrik lacht dich aus: \"Beweis es!\" Du hast keine Dokumente, keinen Anwalt, keine Macht. Du lernst, wer in diesem System zählt.",
                next: "question4_alone_guilt"
            }
        ]
    },
    
    question4_sister_works: {
        title: "Herbst 1874 – Marie in der Fabrik",
        situation: `Marie arbeitet in Krefeld. Jeden Monat schickt sie 3 Silbergroschen nach Hause – eine 9-Jährige, 12 Stunden am Tag. Die Briefe deiner Mutter sagen: \"Marie ist tapfer.\" Aber du weißt, was das bedeutet. Ein Kind sollte nicht tapfer sein müssen.`,
        choices: [
            {
                text: "Du arbeitest weiter und hoffst, dass Marie es schafft.",
                consequence: "Marie überlebt die Fabrik. Mit 16 ist sie klein, gebeugt, aber sie lebt. Die Familie überlebt. Du hast das System besiegt – für diesmal.",
                next: "question4_knappverein"
            },
            {
                text: "Du holst Marie raus und riskierst das Verhungern der Familie.",
                consequence: "Marie kommt zurück ins Dorf. Zwei Monate später verhungert dein jüngster Bruder. Marie weint: \"Es ist meine Schuld.\" Nichts ist richtig in dieser Welt.",
                next: "question4_alone_guilt"
            },
            {
                text: "Du versuchst, mehr zu verdienen und Marie rauszukaufen.",
                consequence: "Du arbeitest wie besessen. Nach einem Jahr hast du genug für drei Monate ohne Maries Lohn. Sie hört auf zu arbeiten, erholt sich.",
                next: "question4_knappverein_saved"
            },
            {
                text: "Du wirst politisch – dieses System muss sich ändern.",
                consequence: "Du trittst dem Knappverein bei. Maries Schicksal wird dein Antrieb. Kinderarbeit muss verboten werden. Du beginnst zu kämpfen.",
                next: "question4_knappverein"
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
    
    question5_scab: {
        title: "Winter 1877/78 – Der Streikbrecher",
        situation: `Du hast während des Streiks gearbeitet. Die anderen Bergleute meiden dich. Jemand hat \"Verräter\" an deine Tür geschmiert. In der Kneipe dreht man dir den Rücken zu. Du hast Arbeit, aber du bist allein. Ganz allein.`,
        choices: [
            {
                text: "Du versuchst, dich zu rechtfertigen – du hattest keine Wahl.",
                consequence: "Niemand will es hören. \"Jeder hatte eine Wahl\", sagen sie. Du bleibst isoliert. Die Jahre vergehen in Einsamkeit.",
                next: "ending_broken"
            },
            {
                text: "Du verlässt Bochum und suchst Arbeit woanders.",
                consequence: "In Essen kennt niemand deine Geschichte. Du findest Arbeit, beginnst neu. Aber das Gefühl der Schuld bleibt.",
                next: "question6_new_job"
            },
            {
                text: "Du wendest dich an den Werkschutz – die nehmen jeden.",
                consequence: "Der Werkschutz nimmt dich. Jetzt bewachst du die Zeche gegen Streikende. Du bist endgültig auf der anderen Seite.",
                next: "ending_traitor"
            },
            {
                text: "Du versuchst, dich zu rehabilitieren – du trittst heimlich dem Knappverein bei.",
                consequence: "Der Verein nimmt dich nach langem Zögern auf. Du musst deine Reue beweisen. Als 1878 das Sozialistengesetz kommt, bist du dabei.",
                next: "question7_socialist"
            }
        ]
    },
    
    question5_coward: {
        title: "Winter 1877/78 – Der Feigling",
        situation: `Du hast dich an den Steiger gewandt, um Gnade gebettelt. Beide Seiten verachten dich. Die Streikenden nennen dich Feigling, die Zeche traut dir nicht. Du bist nirgendwo willkommen. Die Scham frisst dich auf.`,
        choices: [
            {
                text: "Du versuchst, durch harte Arbeit Respekt zurückzugewinnen.",
                consequence: "Du arbeitest doppelt so hart. Nach einem Jahr respektieren dich einige wieder. Aber du vergisst die Demütigung nie.",
                next: "question6_new_job"
            },
            {
                text: "Du verlässt das Ruhrgebiet – hier ist dein Name verbrannt.",
                consequence: "Du gehst nach Schlesien zurück. Dort findest du Arbeit in einem Stahlwerk. Niemand kennt deine Geschichte.",
                next: "question6_new_job"
            },
            {
                text: "Die Scham ist zu groß – du greifst zur Flasche.",
                consequence: "Der Alkohol wird dein Fluchtweg. Du verfällst immer tiefer. Dein Leben zerfällt.",
                next: "ending_broken"
            },
            {
                text: "Du versuchst, beim nächsten Mal mutiger zu sein – du trittst dem Knappverein bei.",
                consequence: "Der Verein gibt dir eine zweite Chance. Als 1878 das Sozialistengesetz kommt, stehst du auf der richtigen Seite.",
                next: "question7_socialist"
            }
        ]
    },
    
    question5_organizer: {
        title: "Winter 1877/78 – Der Organisator",
        situation: `Der Streik war ein Teilerfolg. Die 9,5-Stunden-Schicht ist ein Anfang. Du wirst respektiert als einer, der im Hintergrund alles organisiert hat. Der Knappverein wächst. Aber die Obrigkeit beobachtet euch. 1878 kommt das Sozialistengesetz.`,
        choices: [
            {
                text: "Du gehst in den Untergrund – der Kampf geht weiter, egal was kommt.",
                consequence: "Du organisierst heimliche Treffen, Solidarkassen, Flugblätter. Das Risiko ist hoch, aber die Sache ist gerecht.",
                next: "question7_socialist"
            },
            {
                text: "Du konzentrierst dich auf legale Gewerkschaftsarbeit.",
                consequence: "Du arbeitest innerhalb des Systems. Langsame Fortschritte, aber sicherer. Krankenkassen, Bildungsvereine.",
                next: "ending_reformist"
            },
            {
                text: "Du emigrierst – in Amerika gibt es bessere Chancen.",
                consequence: "Mit deiner Erfahrung findest du schnell Arbeit in der US-Gewerkschaftsbewegung. Du kämpfst weiter, nur woanders.",
                next: "ending_america"
            },
            {
                text: "Du bleibst aktiv, aber vorsichtiger – Familiengründung geht vor.",
                consequence: "Du heiratest, bekommst Kinder. Der Kampf tritt in den Hintergrund. Du sorgst für die Familie.",
                next: "ending_reformist"
            }
        ]
    },
    
    question6_new_job: {
        title: "Frühjahr 1879 – Neuanfang in Westfalen",
        situation: `Du arbeitest jetzt in einer kleinen Zeche bei Dortmund. Niemand kennt deine Vergangenheit. Der Lohn ist schlecht (6 Silbergroschen), die Arbeit hart, aber du bist frei von der schwarzen Liste. Das Sozialistengesetz ist in Kraft – überall Razzien.`,
        choices: [
            {
                text: "Du hältst den Kopf unten und arbeitest einfach weiter.",
                consequence: "Du überlebst, Jahr für Jahr. Kein Held, kein Verräter, nur ein Arbeiter. Du stirbst 1903 an Staublunge, 45 Jahre alt.",
                next: "ending_forgotten"
            },
            {
                text: "Du kontaktierst heimlich den Untergrund-Knappverein.",
                consequence: "Du schließt dich der illegalen Arbeiterbewegung an. Trotz Sozialistengesetz kämpft ihr weiter.",
                next: "question7_socialist"
            },
            {
                text: "Du sparst und versuchst, ein kleines Geschäft zu eröffnen.",
                consequence: "Nach fünf Jahren hast du genug für einen kleinen Laden. Du steigst auf aus der Arbeiterklasse – aber vergisst nie, woher du kommst.",
                next: "ending_reformist"
            },
            {
                text: "Du emigrierst doch noch nach Amerika.",
                consequence: "1881 verlässt du Deutschland. In Pittsburgh arbeitest du wieder im Bergbau, aber mit mehr Chancen.",
                next: "ending_america"
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
    },
    
    ending_coward_final: {
        title: "Ende – Sicherheit um jeden Preis",
        text: `Du hast dich 1889 zurückgezogen, als es darauf ankam. Der Streik brachte Verbesserungen – ohne dich. Du lebst weiter in Sicherheit, arbeitest bis 1910. Deine Kinder profitieren von den Errungenschaften, die andere erkämpft haben. Du stirbst 1915 im Alter von 57 Jahren in deinem Bett. Aber bis zum letzten Atemzug fragst du dich: Was wäre gewesen, wenn du mutiger gewesen wärst? Dein Leben zeigt: Manchmal ist Überleben genug. Aber manchmal genügt es nicht.`,
        isDeath: false
    },
    
    ending_crippled_disease: {
        title: "Ende – Der Körper gibt auf",
        text: `Dein Körper kann nicht mehr. Chronische Mangelernährung, Überarbeitung, die Jahre unter Tage. Im Frühjahr 1875 kollabierst du endgültig. Du wirst ins städtische Krankenhaus eingeliefert. Die Diagnose: Tuberkulose, fortgeschritten. Du stirbst am 7. Juli 1875 im Alter von 17 Jahren. Deine Familie erhält keine Unterstützung. Dein Leben zeigt: Der Körper war das Kapital des Arbeiters – verbraucht er sich, gibt es keine Hilfe.`,
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
    
    if (!node) {
        console.error('Node nicht gefunden:', nodeId);
        return;
    }
    
    // Prüfen ob Ende
    if (nodeId.startsWith('ending_')) {
        showEnding(node);
        return;
    }
    
    // Story anzeigen
    document.getElementById('question-title').textContent = node.title;
    document.getElementById('situation-text').textContent = node.situation;
    
    // Choices anzeigen
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    node.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.setAttribute('data-letter', letters[index] + ')');
        button.textContent = choice.text;
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
