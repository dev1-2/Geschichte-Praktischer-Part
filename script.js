// ===== GAME STATE =====
let gameState = {
    // Basic info
    age: 14,
    year: 1872,
    location: 'Breslau',
    
    // Family
    hasBrother: false,
    brotherAlive: false,
    brotherHealth: 0,
    familyAlive: 4, // mother + 3 siblings
    
    // Work & Money
    hasJob: false,
    jobType: '',
    money: 0,
    wages: 0,
    
    // Health & Status
    health: 100,
    injuryLevel: 0,
    isSick: false,
    
    // Political & Social
    hasJoinedUnion: false,
    hasJoinedSPD: false,
    politicalAwareness: 0,
    reputation: 0,
    
    // Flags
    inPrison: false,
    isBlacklisted: false,
    inDebt: false,
    hasEducation: false,
    
    // Specific events
    sisterInjured: false,
    workAccident: false,
    
    // Choices tracking
    helpedByUnion: false,
    isStreikbrecher: false,
    isOrganizer: false
};

// Decision path tracking - stores choice indices (0-3)
let decisionPath = [];
let currentQuestion = 0;

// Question generators
const questionGenerators = [
    generateQuestion1,
    generateQuestion2,
    generateQuestion3,
    generateQuestion4,
    generateQuestion5,
    generateQuestion6,
    generateQuestion7,
    generateQuestion8
];

// ===== UTILITY FUNCTIONS =====
function updateDisplay() {
    document.getElementById('health-display').textContent = Math.max(0, Math.min(100, gameState.health));
    document.getElementById('money-display').textContent = gameState.money;
    document.getElementById('reputation-display').textContent = gameState.reputation;
    
    const progress = (currentQuestion / 8) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `Frage ${currentQuestion} von 8`;
}

function applyEffects(effects) {
    for (let key in effects) {
        if (gameState.hasOwnProperty(key)) {
            if (typeof effects[key] === 'number' && typeof gameState[key] === 'number') {
                gameState[key] += effects[key];
            } else {
                gameState[key] = effects[key];
            }
        }
    }
    updateDisplay();
}

// ===== QUESTION 1 (1872): Die Ausgangssituation =====
function generateQuestion1() {
    return {
        title: "Herbst 1872 – Die Entscheidung",
        situation: `Du bist Jakob, 14 Jahre alt, aus einem Dorf bei Breslau in Schlesien. Dein Vater ist letzten Winter gestorben. Deine Mutter arbeitet als Tagelöhnerin, aber die Löhne auf dem Land sinken seit Jahren – billiges Getreide aus Russland und Amerika macht die Bauern arm. Deine drei jüngeren Geschwister hungern. Der Dorfschmied erzählt von seinem Neffen, der im Ruhrgebiet in einer Zeche arbeitet: "12 Silbergroschen am Tag! In einer Woche mehr als hier im ganzen Monat!"`,
        choices: [
            {
                text: "Du gehst allein nach Bochum, wo Kohlezechen Arbeiter suchen. Die Fahrt kostet fast alles, was die Familie hat.",
                consequence: "Nach drei Tagen Fahrt im überfüllten Güterwagen erreichst du Bochum. Der Gestank der Koksöfen brennt in der Nase. Du findest Arbeit als Schlepperjunge in der Zeche \"Präsident\" – 10 Stunden unter Tage, 8 Silbergroschen am Tag.",
                effects: {
                    location: 'Bochum',
                    hasJob: true,
                    jobType: 'Schlepperjunge',
                    money: 8,
                    wages: 8,
                    health: -5
                }
            },
            {
                text: "Du versuchst, beim örtlichen Großbauern als Knecht unterzukommen – Kost und Logis gegen Arbeit.",
                consequence: "Der Bauer nimmt dich, zahlt aber nichts. Nach vier Monaten schlägt er dich, weil du \"zu langsam\" bist. Du fliehst und gehst doch noch ins Ruhrgebiet.",
                effects: {
                    location: 'Bochum',
                    hasJob: true,
                    jobType: 'Schlepperjunge',
                    money: 5,
                    wages: 8,
                    health: -10,
                    year: 1873
                }
            },
            {
                text: "Du nimmst deinen 11-jährigen Bruder Heinrich mit ins Ruhrgebiet. Zwei verdienen mehr als einer.",
                consequence: "Ihr beide findet Arbeit in derselben Zeche. Heinrich wird \"Türjunge\" – er muss im Dunkeln sitzen und Wettertüren öffnen, 10 Stunden täglich. Zusammen verdient ihr 14 Silbergroschen.",
                effects: {
                    location: 'Bochum',
                    hasJob: true,
                    jobType: 'Schlepperjunge',
                    hasBrother: true,
                    brotherAlive: true,
                    brotherHealth: 80,
                    money: 14,
                    wages: 14,
                    familyAlive: 3,
                    health: -5
                }
            },
            {
                text: "Du gehst nach Breslau zur Textilfabrik, nur einen Tagesmarsch entfernt.",
                consequence: "In Breslau herrscht Typhus. Die Fabrik stellt niemanden ein. Du kehrst hungrig zurück und gehst schließlich doch ins Ruhrgebiet.",
                effects: {
                    location: 'Bochum',
                    hasJob: true,
                    jobType: 'Schlepperjunge',
                    money: 6,
                    wages: 8,
                    health: -15,
                    isSick: true
                }
            }
        ]
    };
}

// ===== QUESTION 2 (1872/73): Umgang mit Geld/Wohnung =====
function generateQuestion2() {
    const hasBrother = gameState.hasBrother;
    const money = gameState.money;
    
    let situation = `Du wohnst ${hasBrother ? 'mit deinem Bruder' : 'allein'} in einer "Schlafstelle" – ein Bett in einem Keller, das du mit ${hasBrother ? 'einem' : 'zwei'} Schichtarbeiter${hasBrother ? '' : 'n'} teilst. Jeder schläft 8 Stunden, dann kommt der nächste. Die Vermieterin, eine Witwe, verlangt ${hasBrother ? '1,5' : '1'} Silbergroschen täglich. Das Bett ist voller Wanzen, die Wände schimmeln.`;
    
    if (hasBrother) {
        situation += ` Heinrich hustet nachts – die Kohlenluft macht ihn krank.`;
    }
    
    situation += ` Du arbeitest in völliger Dunkelheit unter Tage, schleppst Kohlenwagen. Deine Hände sind blutig, der Rücken schmerzt ständig. Von deinen ${money} Silbergroschen bleiben nach Miete und Brot etwa ${Math.floor(money / 3)} übrig.`;
    
    return {
        title: "Winter 1872/73 – Das neue Leben",
        situation: situation,
        choices: [
            {
                text: "Du schickst alles nach Hause zu deiner Mutter und isst nur das Nötigste.",
                consequence: hasBrother ? 
                    "Deine Familie überlebt den Winter. Aber Heinrich wird immer schwächer. Im März 1873 erkrankt er an schwerem Husten – Kohlenstaub in der Lunge." :
                    "Deine Familie überlebt den Winter. Aber du wirst immer schwächer. Im März 1873 erkrankst du an schwerem Durchfall – das Trinkwasser ist verseucht. Du verlierst 5 Tage Lohn.",
                effects: {
                    money: 0,
                    health: -15,
                    reputation: 5,
                    year: 1873,
                    ...(hasBrother && { brotherHealth: -20, isSick: true })
                }
            },
            {
                text: "Du kaufst dir Schnaps, wie die anderen Bergleute – es hilft gegen Kälte und Schmerz.",
                consequence: "Du verschuldest dich beim Schnapsverkäufer. Er arbeitet mit dem Zechenbesitzer zusammen – die Schulden werden direkt vom Lohn abgezogen. Du kommst nicht mehr raus.",
                effects: {
                    money: -5,
                    health: -10,
                    inDebt: true,
                    year: 1873,
                    familyAlive: hasBrother ? 3 : 3
                }
            },
            {
                text: "Du sparst jeden Pfennig für bessere Kleidung – deine Jacke ist durchlöchert.",
                consequence: "Im Februar 1873 bricht der Wiener Börsenkrach aus. Die Zeche entlässt 200 Arbeiter. Du behältst deine Stelle, aber der Lohn wird auf " + Math.floor(gameState.wages * 0.85) + " Silbergroschen gesenkt.",
                effects: {
                    money: Math.floor(gameState.money * 0.7),
                    wages: Math.floor(gameState.wages * 0.85),
                    year: 1873,
                    politicalAwareness: 5
                }
            },
            {
                text: "Du gehst sonntagabends zur \"Keilerei\" (Kneipe), wo Bergleute sich treffen und Nachrichten austauschen.",
                consequence: "Du hörst von anderen Zechen, von Unfällen, von einem \"Knappverein\", der kranken Bergleuten hilft. Du beginnst zu verstehen, wie das System funktioniert.",
                effects: {
                    money: Math.floor(gameState.money * 0.6),
                    politicalAwareness: 15,
                    reputation: 10,
                    year: 1873
                }
            }
        ]
    };
}

// ===== QUESTION 3 (1874): Familienkrise =====
function generateQuestion3() {
    const hasBrother = gameState.hasBrother;
    const inDebt = gameState.inDebt;
    
    let situation, choices;
    
    if (inDebt) {
        situation = `Der Schnapsverkäufer hat dich in der Falle. Jeden Freitag nimmt er die Hälfte deines Lohns direkt an der Zeche. Du kannst nicht mehr nach Hause schicken. Deine Mutter schreibt verzweifelte Briefe. Im April stirbt dein jüngster Bruder an Hunger. Du trinkst noch mehr, um zu vergessen.`;
        choices = [
            {
                text: "Du versuchst, die Schulden abzuarbeiten und nüchtern zu werden.",
                consequence: "Nach einem Jahr harter Arbeit und Verzicht bist du schuldenfrei. Aber die Familie hat gelitten. Du bist verbittert, aber frei.",
                effects: { inDebt: false, money: 2, health: -10, familyAlive: Math.max(1, gameState.familyAlive - 1), year: 1874, politicalAwareness: 5 }
            },
            {
                text: "Du fliehst nachts aus Bochum, ohne die Schulden zu zahlen.",
                consequence: "Du marschierst nach Dortmund. Dort findest du Arbeit in einer anderen Zeche unter falschem Namen. Du lebst in ständiger Angst, erkannt zu werden.",
                effects: { inDebt: false, location: 'Dortmund', money: 5, health: -5, year: 1874, familyAlive: Math.max(1, gameState.familyAlive - 1) }
            },
            {
                text: "Du gibst auf und säufst dich zu Tode.",
                consequence: "Im Herbst 1873 bricht deine Leber zusammen. Du stirbst mit 15 Jahren in der Schlafstelle. Der Schnapsverkäufer nimmt deine Jacke als letzte Zahlung.",
                effects: { health: -100 }
            },
            {
                text: "Du gehst zum Knappverein und bittest um Hilfe gegen den Wucherer.",
                consequence: "Der Verein konfrontiert den Schnapsverkäufer öffentlich. Nach einer heftigen Auseinandersetzung wird ein Kompromiss gefunden. Du zahlst die Hälfte der Schulden ab.",
                effects: { inDebt: false, money: 0, hasJoinedUnion: true, reputation: 15, politicalAwareness: 20, year: 1874, helpedByUnion: true }
            }
        ];
    } else if (hasBrother && gameState.brotherHealth < 70) {
        situation = `Heinrich hustet jede Nacht schwarz. Kohlenstaub. Er ist erst ${11 + (gameState.year - 1872)}, aber seine Lunge ist schon geschädigt. Der Zechenarzt sagt: "Ist halt so. Kann weiterarbeiten." Aber du siehst, dass Heinrich immer schwächer wird. Nachts weint er vor Schmerzen.`;
        choices = [
            {
                text: "Du lässt Heinrich weiterarbeiten – ihr braucht das Geld.",
                consequence: "Im Juli 1874 bricht Heinrich unter Tage zusammen. Er stirbt drei Tage später an Lungenversagen. Er wird 12 Jahre alt. Du bist allein.",
                effects: { hasBrother: false, brotherAlive: false, money: Math.floor(gameState.wages * 0.6), wages: 8, health: -20, year: 1874, politicalAwareness: 10 }
            },
            {
                text: "Du schickst Heinrich zurück ins Dorf zur Mutter.",
                consequence: "Heinrich erholt sich langsam auf dem Land. Aber ohne sein Einkommen verhungert deine jüngste Schwester. Du arbeitest allein weiter.",
                effects: { hasBrother: false, brotherAlive: true, money: Math.floor(gameState.money * 0.5), wages: 8, familyAlive: Math.max(1, gameState.familyAlive - 1), year: 1874 }
            },
            {
                text: "Du gehst zum Knappverein und bittest um Hilfe.",
                consequence: "Der Knappverein zahlt für einen Arztbesuch. Der Arzt sagt: \"Raus aus der Zeche oder er stirbt.\" Du schickst Heinrich nach Hause. Die Vereinskasse unterstützt dich mit 2 Groschen pro Woche.",
                effects: { hasBrother: false, brotherAlive: true, hasJoinedUnion: true, money: gameState.money + 2, wages: 10, reputation: 15, politicalAwareness: 15, year: 1874, helpedByUnion: true }
            },
            {
                text: "Du kaufst \"Medizin\" vom Quacksalber am Markt.",
                consequence: "Die \"Medizin\" ist Schnaps mit Kräutern. Heinrich wird noch kränker. Nach zwei Wochen stirbt er an Vergiftung. Du wurdest betrogen.",
                effects: { hasBrother: false, brotherAlive: false, money: gameState.money - 5, wages: 8, health: -30, year: 1874 }
            }
        ];
    } else {
        situation = `Du bist jetzt ${gameState.age + (gameState.year - 1872)} Jahre alt. Deine Mutter schreibt (der Dorfschullehrer schreibt für sie): Deine 9-jährige Schwester Marie soll in eine Seidenfabrik in Krefeld, 12 Stunden am Spulrad, 4 Silbergroschen am Tag. "Besser als verhungern", schreibt die Mutter. Du weißt: Mädchen verlieren in den Fabriken oft Finger, wenn sie müde werden.`;
        choices = [
            {
                text: "Du erlaubst es – ohne Maries Lohn stirbt die Familie.",
                consequence: "Marie arbeitet ab Mai 1874 in Krefeld. Im August verfängt sich ihr Zopf in der Spulmaschine – sie verliert Kopfhaut und rechtes Ohr. Sie überlebt, ist entstellt. Die Familie hat Einkommen.",
                effects: { sisterInjured: true, familyAlive: gameState.familyAlive, money: gameState.money + 4, year: 1874, politicalAwareness: 10 }
            },
            {
                text: "Du verbietest es und nimmst eine zweite Arbeit an: nachts Kohlensäcke verladen am Bahnhof.",
                consequence: "Nach drei Wochen brichst du vor Erschöpfung zusammen. Ein Kohlewagen rollt über dein linkes Bein. Der Zechenarzt amputiert unter dem Knie. Keine Entschädigung – \"eigenes Verschulden durch Übermüdung\".",
                effects: { health: -100, workAccident: true }
            },
            {
                text: "Du schreibst an den katholischen Kaplan der Zeche und bittest um Hilfe.",
                consequence: "Der Kaplan gibt 2 Taler Almosen. Es hilft für einen Monat. Marie muss trotzdem arbeiten.",
                effects: { money: gameState.money + 20, year: 1874 }
            },
            {
                text: "Du fragst in der Kneipe nach dem \"Knappverein\".",
                consequence: "Im Knappverein triffst du ältere Bergleute. Sie erklären: \"Allein ist der Arbeiter nichts – zusammen sind wir stark.\" Du trittst bei und die Familie bekommt kleine Unterstützung.",
                effects: { hasJoinedUnion: true, money: gameState.money + 3, reputation: 10, politicalAwareness: 20, year: 1874, helpedByUnion: true }
            }
        ];
    }
    
    return {
        title: "Frühjahr 1874 – Familienkrise",
        situation: situation,
        choices: choices
    };
}


// ===== QUESTION 4 (1877): Der erste Streik =====
function generateQuestion4() {
    const hasUnion = gameState.hasJoinedUnion;
    const awareness = gameState.politicalAwareness;
    
    let situation = `Es ist Sommer 1877. Du bist jetzt ${gameState.age + (gameState.year - 1872)} Jahre alt. Die Konjunktur erholt sich, die Zeche macht Profite. Aber im Juli kürzt die Direktion die Löhne um 1 Silbergroschen – angeblich wegen "schwieriger Flöze". Gleichzeitig verlängert sie die Schicht auf 11 Stunden.`;
    
    if (hasUnion) {
        situation += ` Ein alter Hauer namens August Siegel sagt beim Vereinstreffen: "Wenn wir alle zusammenhalten, müssen sie nachgeben!" Andere warnen: "Sie holen die Polizei!"`;
    } else {
        situation += ` Die anderen Bergleute murren. Einige reden von Streik. Aber du stehst abseits – du bist nicht organisiert.`;
    }
    
    return {
        title: "Sommer 1877 – Der Lohnkampf",
        situation: situation,
        choices: [
            {
                text: "Du beteiligst dich am Streik und bleibst am 22. Juli zu Hause.",
                consequence: "320 Mann streiken für 4 Tage. Die Polizei räumt die Zechenanlage mit Säbeln. Drei Bergleute werden schwer verletzt. Du wirst verhaftet, auf dem Polizeirevier geschlagen und nach 24 Stunden entlassen. Dein Name steht auf einer Liste – keine Zeche im Revier stellt dich mehr ein.",
                effects: { isBlacklisted: true, money: 0, health: -15, reputation: 25, politicalAwareness: 30, year: 1877 }
            },
            {
                text: "Du gehst zur Arbeit – du kannst dir keinen Lohnausfall leisten.",
                consequence: "Die Streikenden nennen dich \"Streikbrecher\". Einer spuckt vor dir aus. Du behältst die Arbeit zum niedrigeren Lohn. Der Streik wird niedergeschlagen.",
                effects: { isStreikbrecher: true, wages: gameState.wages - 1, reputation: -20, year: 1877 }
            },
            {
                text: "Du versuchst, mit dem Steiger zu reden und um Gnade zu bitten.",
                consequence: "Der Steiger lacht dich aus: \"Fresse halten und arbeiten, oder verhungern.\" Die Streikenden verachten dich als Feigling.",
                effects: { reputation: -15, politicalAwareness: 10, year: 1877 }
            },
            {
                text: "Du organisierst heimlich eine Streikkasse mit anderen.",
                consequence: "Ihr sammelt in drei Wochen 40 Taler. Als der Streik kommt, könnt ihr 50 Familien unterstützen. Der Streik hält länger durch. Nach 6 Tagen lenken die Besitzer teilweise ein: 9,5-Stunden-Schicht, minimale Lohnerhöhung.",
                effects: { isOrganizer: true, hasJoinedUnion: true, reputation: 35, politicalAwareness: 40, year: 1877, money: gameState.money + 2 }
            }
        ]
    };
}

// ===== QUESTION 5 (1877/78): Krankheit =====
function generateQuestion5() {
    const blacklisted = gameState.isBlacklisted;
    const streikbrecher = gameState.isStreikbrecher;
    const hasUnion = gameState.hasJoinedUnion;
    
    let situation, choices;
    
    if (blacklisted) {
        situation = `Du stehst auf der schwarzen Liste. Keine Zeche nimmt dich. Du versuchst es als Tagelöhner am Hafen in Duisburg – harte Arbeit, unregelmäßig, 4-5 Silbergroschen an guten Tagen. An manchen Tagen gibt es keine Arbeit. Du hungerst. Nachts schläfst du in einem Schuppen. Im Dezember kommt der Frost.`;
        choices = [
            {
                text: "Du versuchst, nach Hamburg zu kommen und auf einem Schiff anzuheuern.",
                consequence: "Du marschierst vier Tage durch den Schnee. In Hamburg findest du Arbeit als Kohlentrimmer auf einem Dampfer. Harte Arbeit, aber regelmäßiger Lohn. Du verlässt Deutschland.",
                effects: { location: 'Hamburg', hasJob: true, money: 10, health: -10, year: 1878 }
            },
            {
                text: "Du brichst in eine Bäckerei ein, um Brot zu stehlen.",
                consequence: "Der Bäcker erwischt dich. Die Polizei verhaftet dich. Du wirst zu 18 Monaten Zuchthaus verurteilt wegen Einbruchdiebstahls.",
                effects: { inPrison: true, health: -20, money: 0, year: 1878 }
            },
            {
                text: "Du gehst zurück zum Knappverein und bittest um Hilfe.",
                consequence: "Der Verein sammelt Geld für dich – 28 Groschen. Es reicht für zwei Wochen. Sie organisieren dir heimlich Arbeit in einer kleinen Zeche in Westfalen, wo niemand die schwarze Liste kennt.",
                effects: { isBlacklisted: false, hasJoinedUnion: true, location: 'Dortmund', hasJob: true, money: 8, reputation: 20, year: 1878 }
            },
            {
                text: "Du erfrierst langsam im Schuppen und gibst auf.",
                consequence: "Am 14. Januar 1878 findet ein Hafenarbeiter deine Leiche im Schuppen. Du wirst 19 Jahre alt. Ein namenloses Grab auf dem Armenfriedhof.",
                effects: { health: -100 }
            }
        ];
    } else if (streikbrecher) {
        situation = `Du hast während des Streiks gearbeitet. Die anderen Bergleute meiden dich. Jemand hat "Verräter" an deine Tür geschmiert. In der Kneipe dreht man dir den Rücken zu. Du hast Arbeit, aber du bist allein. Ganz allein.`;
        choices = [
            {
                text: "Du versuchst, dich zu rechtfertigen – du hattest keine Wahl.",
                consequence: "Niemand will es hören. \"Jeder hatte eine Wahl\", sagen sie. Du bleibst isoliert. Die Jahre vergehen in Einsamkeit.",
                effects: { health: -15, reputation: -10, year: 1878 }
            },
            {
                text: "Du verlässt Bochum und suchst Arbeit woanders.",
                consequence: "In Essen kennt niemand deine Geschichte. Du findest Arbeit, beginnst neu. Aber das Gefühl der Schuld bleibt.",
                effects: { location: 'Essen', reputation: 0, politicalAwareness: 10, year: 1878 }
            },
            {
                text: "Du wendest dich an den Werkschutz – die nehmen jeden.",
                consequence: "Der Werkschutz nimmt dich. Jetzt bewachst du die Zeche gegen Streikende. Du bist endgültig auf der anderen Seite.",
                effects: { jobType: 'Werkschutz', wages: 10, reputation: -30, year: 1878 }
            },
            {
                text: "Du versuchst, dich zu rehabilitieren – du trittst heimlich dem Knappverein bei.",
                consequence: "Der Verein nimmt dich nach langem Zögern auf. Du musst deine Reue beweisen. Als 1878 das Sozialistengesetz kommt, bist du dabei.",
                effects: { hasJoinedUnion: true, isStreikbrecher: false, reputation: 5, politicalAwareness: 25, year: 1878 }
            }
        ];
    } else {
        situation = `Winter 1877/78. Die Arbeit unter Tage hat dich gezeichnet. Du hustest jeden Morgen schwarz. Dein Rücken schmerzt ständig. ${hasUnion ? 'Im Knappverein reden sie von Krankenkassen, von Bismarcks geplanten Sozialgesetzen.' : 'Du weißt: Wenn du nicht mehr arbeiten kannst, bist du erledigt.'}`;
        choices = [
            {
                text: "Du arbeitest weiter trotz Krankheit – du brauchst das Geld.",
                consequence: "Nach drei Monaten kollabierst du unter Tage. Deine Lunge ist schwer geschädigt. Der Zechenarzt sagt: \"Staublunge. Unheilbar.\" Du kannst nicht mehr unter Tage arbeiten.",
                effects: { health: -40, hasJob: false, wages: 0, year: 1878 }
            },
            {
                text: "Du kaufst Medizin vom Quacksalber am Markt.",
                consequence: "Die \"Medizin\" hilft nicht. Du verschwendest Geld. Drei Monate später bist du noch kränker.",
                effects: { money: gameState.money - 8, health: -15, year: 1878 }
            },
            {
                text: hasUnion ? "Du gehst zur Krankenkasse des Knappvereins." : "Du suchst Hilfe beim Knappverein.",
                consequence: hasUnion ? 
                    "Die Kasse zahlt für einen richtigen Arzt und gibt dir 6 Wochen Krankengeld. Du erholst dich etwas. Das System funktioniert." :
                    "Der Verein nimmt dich auf und hilft dir. Die Kasse zahlt für Behandlung. Du lernst: Nur gemeinsam überleben wir.",
                effects: { hasJoinedUnion: true, health: 5, reputation: 15, politicalAwareness: 20, year: 1878 }
            },
            {
                text: "Du überlegst, zurück aufs Land zu gehen.",
                consequence: "Auf dem Land ist es noch schlimmer. Die Agrarkrise trifft hart. Nach zwei Monaten kehrst du zurück ins Ruhrgebiet.",
                effects: { money: Math.max(0, gameState.money - 5), health: -5, year: 1878 }
            }
        ];
    }
    
    return {
        title: "Winter 1877/78 – Krankheit und Krise",
        situation: situation,
        choices: choices
    };
}

// ===== QUESTION 6 (1878): Sozialistengesetz =====
function generateQuestion6() {
    const hasUnion = gameState.hasJoinedUnion;
    const inPrison = gameState.inPrison;
    const awareness = gameState.politicalAwareness;
    
    let situation, choices;
    
    if (inPrison) {
        situation = `Das Zuchthaus Bochum ist die Hölle. 14 Stunden täglich Steineklopfen. Schläge bei jedem Verstoß. Das Essen ist verrottet. Aber hier triffst du andere: Sozialdemokraten, Gewerkschafter, Männer, die beim Streik verhaftet wurden. Ein Mann erzählt dir von Marx, von der Arbeiterbewegung, vom Klassenkampf.`;
        choices = [
            {
                text: "Du hörst zu und lernst. Du willst kämpfen.",
                consequence: "Nach 18 Monaten wirst du entlassen – härter, wütender, aber mit klarem Bewusstsein. Du trittst der verbotenen SPD bei.",
                effects: { inPrison: false, hasJoinedSPD: true, politicalAwareness: 50, reputation: 20, health: -20, year: 1879 }
            },
            {
                text: "Du hältst den Kopf unten und willst nur überleben.",
                consequence: "Nach 18 Monaten wirst du entlassen, gebrochen und ohne Hoffnung. Du findest kaum Arbeit – jetzt bist du vorbestraft UND auf der schwarzen Liste.",
                effects: { inPrison: false, isBlacklisted: true, health: -30, reputation: -10, year: 1879 }
            },
            {
                text: "Du versuchst zu fliehen.",
                consequence: "Beim Fluchtversuch erschießt dich ein Wachmann in den Rücken. Du stirbst auf der Zuchthaus-Mauer. Du wirst 20 Jahre alt.",
                effects: { health: -100 }
            },
            {
                text: "Du wirst krank – Typhus grassiert im Zuchthaus.",
                consequence: "Du liegst wochenlang im Fieber. Fünfzehn Gefangene sterben. Du überlebst knapp, aber dein Körper ist ruiniert. Nach der Entlassung kannst du nicht mehr schwer arbeiten.",
                effects: { inPrison: false, health: -50, hasJob: false, year: 1879 }
            }
        ];
    } else {
        situation = `Oktober 1878: Bismarck erlässt das Sozialistengesetz. Arbeitervereine werden verboten, sozialdemokratische Zeitungen geschlossen, Versammlungen aufgelöst. ${hasUnion ? 'Dein Knappverein muss sich auflösen oder in den Untergrund gehen.' : 'Überall Razzien, Verhaftungen. Die Polizei ist allgegenwärtig.'} Du musst dich entscheiden.`;
        choices = [
            {
                text: "Du gehst zu den geheimen Treffen – trotz des Risikos.",
                consequence: hasUnion ? 
                    "Ihr organisiert euch im Untergrund. Über Monate baut ihr ein Netzwerk auf. Flugblätter, geheime Kassen, Solidarität. Das Risiko ist hoch, aber die Sache ist gerecht." :
                    "Du schließt dich der verbotenen Bewegung an. Es ist gefährlich, aber du fühlst dich zum ersten Mal Teil von etwas Größerem.",
                effects: { hasJoinedSPD: true, hasJoinedUnion: true, politicalAwareness: 40, reputation: 25, year: 1878 }
            },
            {
                text: "Du konzentrierst dich auf legale Gewerkschaftsarbeit.",
                consequence: "Du hilfst, eine Krankenkasse aufzubauen. Es ist langsam, mühsam, aber legal. Kleine Schritte. 1883 kommen Bismarcks Sozialgesetze – ihr hattet einen kleinen Anteil daran.",
                effects: { hasJoinedUnion: true, politicalAwareness: 20, reputation: 15, year: 1878 }
            },
            {
                text: "Du hältst dich fern – zu gefährlich.",
                consequence: "Du arbeitest weiter, hältst den Kopf unten. Die Bewegung zieht an dir vorbei. Du überlebst, aber bleibst bedeutungslos.",
                effects: { politicalAwareness: 5, year: 1878 }
            },
            {
                text: "Du denkst ans Auswandern – hier gibt es keine Zukunft.",
                consequence: "Du sparst für eine Schiffspassage. In zwei Jahren kannst du nach Amerika gehen.",
                effects: { money: Math.max(0, gameState.money - 10), year: 1878 }
            }
        ];
    }
    
    return {
        title: "Herbst 1878 – Das Sozialistengesetz",
        situation: situation,
        choices: choices
    };
}

// ===== QUESTION 7 (1884): Klassenbewusstsein =====
function generateQuestion7() {
    const hasSPD = gameState.hasJoinedSPD;
    const hasUnion = gameState.hasJoinedUnion;
    const isOrganizer = gameState.isOrganizer;
    const awareness = gameState.politicalAwareness;
    
    let situation = `Es ist 1884. Du bist jetzt ${gameState.age + 12} Jahre alt. ${awareness > 30 ? 'Die Jahre im Untergrund haben dich geprägt. Du verstehst das System jetzt.' : 'Du hast überlebt, aber zu welchem Preis?'} Die Arbeiterbewegung wächst trotz Sozialistengesetz. ${hasSPD || hasUnion ? 'Du bist Teil davon.' : 'Du stehst am Rand.'} 1889 steht der große Bergarbeiterstreik bevor.`;
    
    return {
        title: "Frühjahr 1884 – Klassenbewusstsein",
        situation: situation,
        choices: [
            {
                text: "Du willst Streikorganisator werden – an vorderster Front kämpfen.",
                consequence: "Du baust über Jahre ein Netzwerk auf. Heimliche Treffen, Streikkassen, Propaganda. Du bist auf Polizeilisten, aber die Genossen respektieren dich.",
                effects: { isOrganizer: true, hasJoinedSPD: true, hasJoinedUnion: true, reputation: 40, politicalAwareness: 60, year: 1884 }
            },
            {
                text: "Du unterstützt im Hintergrund – weniger Risiko, aber wichtig.",
                consequence: "Du sammelst Geld, organisierst Treffen, verteilst Flugblätter. Niemand kennt deinen Namen, aber ohne Leute wie dich würde nichts funktionieren.",
                effects: { hasJoinedUnion: true, reputation: 25, politicalAwareness: 40, year: 1884 }
            },
            {
                text: "Du bleibst neutral – Überleben ist genug.",
                consequence: "Du arbeitest, Jahr für Jahr. Die Bewegung zieht an dir vorbei. Du lebst, aber lebst du wirklich?",
                effects: { politicalAwareness: 10, year: 1884 }
            },
            {
                text: "Du wartest auf Reformen – Bismarck wird nachgeben müssen.",
                consequence: "1883 kommen die Sozialgesetze: Krankenversicherung, später Unfallversicherung. Kleine Siege. Du arbeitest für legale Verbesserungen.",
                effects: { hasJoinedUnion: true, reputation: 15, politicalAwareness: 25, year: 1884 }
            }
        ]
    };
}

// ===== QUESTION 8 (1889/90): Der große Bergarbeiterstreik =====
function generateQuestion8() {
    const isOrganizer = gameState.isOrganizer;
    const hasSPD = gameState.hasJoinedSPD;
    const hasUnion = gameState.hasJoinedUnion;
    const awareness = gameState.politicalAwareness;
    
    let situation = `Mai 1889: Der größte Bergarbeiterstreik im Ruhrgebiet beginnt. 90.000 Mann legen die Arbeit nieder. Die Forderungen: 8-Stunden-Schicht, 20% mehr Lohn, Ende der Willkür. Kaiser Wilhelm II. schickt Truppen. ${isOrganizer ? 'Du bist einer der geheimen Organisatoren – die Polizei sucht dich.' : hasUnion ? 'Du bist dabei, als einfacher Streikender.' : 'Du musst dich entscheiden: Mitmachen oder nicht?'} Dies ist der Moment.`;
    
    return {
        title: "Frühjahr 1889 – Der große Bergarbeiterstreik",
        situation: situation,
        choices: [
            {
                text: "Du stellst dich an die Spitze – trotz der Gefahr.",
                consequence: "Du hältst Reden vor Tausenden. Die Zeitungen nennen dich einen \"Rädelsführer\". Nach drei Wochen werden minimale Zugeständnisse gemacht. Du wirst verhaftet und zu 3 Jahren Zuchthaus verurteilt – aber du hast Geschichte geschrieben.",
                effects: { inPrison: true, reputation: 60, politicalAwareness: 80, year: 1889 }
            },
            {
                text: "Du organisierst im Hintergrund – Streikkassen, Kommunikation, Versorgung.",
                consequence: "Der Streik bringt erste Erfolge. Du bleibst unerkannt, kannst weitermachen. 1890 fällt das Sozialistengesetz. Die SPD wird legal. Du wirst Gewerkschaftsführer.",
                effects: { isOrganizer: true, reputation: 50, politicalAwareness: 70, year: 1889, money: gameState.money + 10 }
            },
            {
                text: "Du streikst mit, aber unauffällig.",
                consequence: "Du bist Teil der Masse. Der Streik bringt kleine Verbesserungen. Du hast mitgemacht, wenn auch nicht an vorderster Front.",
                effects: { reputation: 20, politicalAwareness: 40, year: 1889 }
            },
            {
                text: "Du zweifelst im letzten Moment – zu viel Risiko.",
                consequence: "Du ziehst dich zurück. Der Streik geschieht ohne dich. Er bringt kleine Erfolge. Du lebst weiter in Sicherheit, aber mit lebenslanger Scham.",
                effects: { reputation: -10, politicalAwareness: 20, year: 1889 }
            }
        ]
    };
}

// ===== ENDINGS CALCULATION =====
function calculateEnding() {
    const state = gameState;
    const path = decisionPath;
    
    // Death endings basierend auf health
    if (state.health <= 0) {
        // Arbeitsunfall
        if (state.workAccident) {
            return {
                title: "Ende – Zum Krüppel gemacht",
                text: `Nach der Amputation deines Beins ${1874 + (state.year - 1874)} kannst du nicht mehr unter Tage arbeiten. Du bettelst auf den Straßen Bochums. Die Zeche zahlte keine Entschädigung – "eigenes Verschulden durch Übermüdung". Du stirbst ${1874 + 13} an Unterernährung, ${state.age + (state.year - 1872) + 13} Jahre alt. Dein Leben zeigt die Brutalität der frühen Industrialisierung: Menschen als Verbrauchsmaterial, weggeworfen nach dem Unfall.`,
                isDeath: true
            };
        }
        
        // Fluchtversuch erschossen
        if (state.inPrison && path[5] === 2) {
            return {
                title: "Ende – Auf der Flucht erschossen",
                text: `Am 23. März 1879 fällt deine Leiche von der Zuchthausmauer. Du wirst 20 Jahre alt. Der Wachmann wird befördert. Dein Name erscheint in keiner Statistik. Ein namenloses Grab hinter dem Zuchthaus. Dein Leben zeigt die Gewalt des Systems: Gefängnisse, Polizei, Militär – alle Macht lag beim Staat und den Besitzenden.`,
                isDeath: true
            };
        }
        
        // Erfroren
        if (path[4] === 3) {
            return {
                title: "Ende – Erfroren und vergessen",
                text: `Du stirbst im Winter 1878 im Alter von 19 Jahren in einem Hafenschuppen in Duisburg. Niemand kennt deinen Namen. Du wirst in einem Massengrab auf dem Armenfriedhof verscharrt. Tausende teilten dein Schicksal – junge Menschen, die vom Land in die Städte kamen, von der Industrialisierung verschlungen und vergessen wurden. Die soziale Frage blieb unbeantwortet. Für dich kam jede Hilfe zu spät.`,
                isDeath: true
            };
        }
        
        // Bruder vergiftet
        if (path[2] === 3 && path[0] === 2) {
            return {
                title: "Ende – Betrogen und verloren",
                text: `Heinrich stirbt im April 1874 an der vergifteten "Medizin" des Quacksalbers. Er wird 12 Jahre alt. Du bist zerstört von Schuld. Du arbeitest weiter, aber ohne Sinn. 1878 stirbst du bei einem Grubenunglück – ein Stollen stürzt ein. Du wirst 20 Jahre alt. Dein Leben zeigt: Die Armut machte Menschen anfällig für Betrüger. Ohne Geld für echte Ärzte starben Arbeiter an Scharlatanen.`,
                isDeath: true
            };
        }
        
        // Alkoholtod
        if (path[2] === 2 && state.inDebt) {
            return {
                title: "Ende – Im Alkohol ertrunken",
                text: `Im Herbst 1873 bricht deine Leber zusammen. Du stirbst mit 15 Jahren in der Schlafstelle, umgeben von leeren Schnapsflaschen. Der Schnapsverkäufer nimmt deine Jacke als letzte Zahlung. Dein Leben zeigt: Die Verzweiflung trieb viele in die Sucht. Der Alkohol war Flucht und Falle zugleich.`,
                isDeath: true
            };
        }
        
        // Allgemeiner Tod
        return {
            title: "Ende – Vergessen",
            text: `Du stirbst jung, ausgelaugt von harter Arbeit, Hunger und Krankheit im Jahr ${state.year + 2}, ${state.age + (state.year - 1872) + 2} Jahre alt. Eines von Tausenden namenlosen Opfern der Industrialisierung. Die soziale Frage blieb für dich unbeantwortet. Du wirst in einem Massengrab verscharrt.`,
            isDeath: true
        };
    }
    
    // POSITIVE ENDINGS
    
    // Rädelsführer - An der Spitze beim großen Streik
    if (path[7] === 0 && (state.isOrganizer || state.reputation > 40)) {
        return {
            title: "Ende – Der Rädelsführer",
            text: `Du verbringst drei Jahre im Zuchthaus (1889-1892) wegen deiner Rolle beim großen Streik. Nach der Entlassung feiert dich die Arbeiterbewegung als Helden. Du wirst 1893 SPD-Reichstagsabgeordneter für den Wahlkreis Bochum. 1918 erlebst du die Revolution, die Abdankung des Kaisers. Im Alter erzählst du deinen Enkeln von den Kämpfen der 1870er und 1880er Jahre – von Hunger, Repression, aber auch von Solidarität und Siegen. Du stirbst 1923, 65 Jahre alt, in Würde. Dein Leben zeigt: Organisierter Widerstand kann die Welt verändern.`,
            isDeath: false
        };
    }
    
    // Stiller Organisator - Im Hintergrund aber effektiv
    if (path[7] === 1 && state.politicalAwareness > 50) {
        return {
            title: "Ende – Der stille Organisator",
            text: `Du wirst nie verhaftet, stehst nie im Rampenlicht. Aber du bist das Rückgrat der Bewegung: Streikkassen, Bildungsabende, Krankenkassen, heimliche Flugblätter. 1890 fällt das Sozialistengesetz. Die SPD wird legal. Du wirst Gewerkschaftsführer, organisierst Tausende. 1912 wird die SPD stärkste Partei im Reichstag. Du stirbst 1920 im Alter von 62 Jahren. Bei deiner Beerdigung kommen 5.000 Menschen. Dein Leben zeigt: Revolutionen brauchen nicht nur Redner, sondern vor allem Organisatoren.`,
            isDeath: false
        };
    }
    
    // Ungebrochen - SPD-Mitglied mit hoher Reputation
    if (state.hasJoinedSPD && state.reputation > 40) {
        return {
            title: "Ende – Ungebrochen",
            text: `Nach fünf Jahren im Untergrund (1878-1883) und mehreren Verhaftungen wirst du hart, aber ungebrochen. Du hast niemanden verraten, bist den Prinzipien treu geblieben. 1890 fällt das Sozialistengesetz. Du arbeitest als Gewerkschaftsorganisator, prägst die Arbeiterbewegung bis ins 20. Jahrhundert. 1918 erlebst du die Revolution. Du stirbst 1928 im Alter von 70 Jahren, umgeben von drei Generationen von Arbeitern, die du inspiriert hast. Dein Leben zeigt: Solidarität und Prinzipientreue können Systeme überdauern.`,
            isDeath: false
        };
    }
    
    // Gewerkschaftsführer
    if (state.isOrganizer && state.hasJoinedUnion && state.politicalAwareness > 45) {
        return {
            title: "Ende – Der Gewerkschafter",
            text: `Du widmest dein Leben dem Aufbau starker Gewerkschaften. 1890 fällt das Sozialistengesetz, 1892 gründest du mit anderen den Bergarbeiterverband. Du verhandelst Tarifverträge, organisierst Streiks, baust Solidarkassen auf. 1906 sind 500.000 Bergarbeiter organisiert – auch dein Verdienst. Du stirbst 1919, 61 Jahre alt. Die Bewegung trägt dich auf Händen. Dein Leben zeigt: Geduldige Organisation bringt dauerhafte Erfolge.`,
            isDeath: false
        };
    }
    
    // NEGATIVE ENDINGS
    
    // Verräter - Streikbrecher mit schlechter Reputation
    if (state.isStreikbrecher && state.reputation < -10) {
        return {
            title: "Ende – Der Verräter",
            text: `Du hast 1877 als Streikbrecher gearbeitet. Die Arbeiterbewegung verstößt dich. Niemand spricht mehr mit dir. Du findest Arbeit als Werkschutz – jetzt bewachst du die Zeche gegen Streikende. Die anderen Arbeiter hassen dich. Einer spuckt vor dir aus. Du trinkst dich zu Tode, stirbst 1897 an Leberzirrhose, 39 Jahre alt, allein und verachtet. Dein Leben zeigt: Verrat zerstört nicht nur andere, sondern vor allem einen selbst.`,
            isDeath: true
        };
    }
    
    // Gebrochen - Gefängnis ohne Politisierung
    if (state.inPrison && state.politicalAwareness < 20) {
        return {
            title: "Ende – Gebrochen",
            text: `18 Monate Zuchthaus (1878-1879) haben dich zerstört. Du bist vorbestraft UND auf der schwarzen Liste. Keine Zeche nimmt dich. Du lebst von Gelegenheitsarbeiten, Betteln, manchmal Diebstahl. 1883 wirst du wieder verhaftet – Vagabundage. Weitere 12 Monate. Du stirbst 1885 in einer Armenunterkunft an Typhus, 27 Jahre alt. Dein Leben zeigt: Der Staat und die Industrie brachen systematisch jeden Widerstand. Viele überlebten das nicht.`,
            isDeath: true
        };
    }
    
    // Vergessen - Niedriges politisches Bewusstsein
    if (state.politicalAwareness < 10 && !state.hasJoinedUnion) {
        return {
            title: "Ende – Vergessen",
            text: `Du stirbst 1891 an Lungentuberkulose, 33 Jahre alt. Die Arbeiterbewegung zieht an dir vorbei. Du warst zu erschöpft, zu gebrochen. Ein namenloses Grab, keine Familie, keine Genossen. Dein Leben zeigt die andere Seite: Nicht alle konnten kämpfen. Viele wurden von der Industrialisierung einfach zermalmt, vergessen von der Geschichte. Auch ihr Schicksal gehört zur sozialen Frage.`,
            isDeath: true
        };
    }
    
    // NEUTRALE ENDINGS
    
    // Zur See - Hamburg Emigration
    if (state.location === 'Hamburg' && path[4] === 0) {
        return {
            title: "Ende – Zur See",
            text: `Du arbeitest als Matrose auf Handelsschiffen. Die Arbeit ist hart, aber du siehst die Welt: Hamburg, London, New York, Kalkutta. 1885 heuerst du auf einem Walfänger an. Du überlebst, kehrst nie nach Deutschland zurück. 1902 lässt du dich in Liverpool nieder, heiratest eine Irin. Du stirbst 1915 im Alter von 57 Jahren. Dein Leben zeigt: Manche entkamen der Industriehölle durch Flucht. Aber Millionen hatten diese Option nicht.`,
            isDeath: false
        };
    }
    
    // Reformer - Union-Mitglied, moderates Bewusstsein
    if (state.hasJoinedUnion && state.politicalAwareness >= 20 && state.politicalAwareness < 45) {
        return {
            title: "Ende – Der Reformer",
            text: `Du arbeitest jahrzehntelang in der Gewerkschaft, organisierst Krankenkassen, Bildungsvereine, legale Streiks. 1883 kommen Bismarcks Sozialgesetze: Krankenversicherung, später Unfallversicherung. Kleine Siege. 1890 fällt das Sozialistengesetz. Die Bewegung wächst legal. Du wirst nie berühmt, aber du verbesserst das Leben Tausender. Du stirbst 1918 im Alter von 60 Jahren, drei Wochen vor der Revolution. Dein Leben zeigt: Auch kleine, geduldige Schritte können Systeme verändern. Reform UND Revolution waren nötig.`,
            isDeath: false
        };
    }
    
    // Default - Einfacher Überlebender
    if (state.politicalAwareness >= 10) {
        return {
            title: "Ende – Der Überlebende",
            text: `Du hast überlebt. Das ist mehr als viele sagen können. Du arbeitest bis ins hohe Alter als einfacher Bergmann, erlebst kleine Verbesserungen: kürzere Arbeitszeiten, etwas höhere Löhne, Sozialversicherungen. 1918 siehst du die Revolution, die Abdankung des Kaisers. Du stirbst 1925 in bescheidenen Verhältnissen, aber in Würde. Dein Leben zeigt: Nicht jeder konnte Held sein. Aber auch die stillen Überlebenden trugen die Bewegung.`,
            isDeath: false
        };
    }
    
    // Fallback
    return {
        title: "Ende – Ein Arbeiterleben",
        text: `Du stirbst ${state.year + 10}, ${state.age + (state.year - 1872) + 10} Jahre alt. Ein Leben geprägt von harter Arbeit, Entbehrungen, aber auch kleinen Momenten der Solidarität. Du warst einer von Millionen. Dein Leben zeigt: Die Industrialisierung schuf Reichtum für wenige, Elend für viele. Aber sie schuf auch die Arbeiterbewegung – den Kampf für Gerechtigkeit.`,
        isDeath: false
    };
}

// ===== CORE GAME FUNCTIONS =====
function initGame() {
    // Reset state
    gameState = {
        age: 14,
        year: 1872,
        location: 'Breslau',
        hasBrother: false,
        brotherAlive: false,
        brotherHealth: 0,
        familyAlive: 4,
        hasJob: false,
        jobType: '',
        money: 0,
        wages: 0,
        health: 100,
        injuryLevel: 0,
        isSick: false,
        hasJoinedUnion: false,
        hasJoinedSPD: false,
        politicalAwareness: 0,
        reputation: 0,
        inPrison: false,
        isBlacklisted: false,
        inDebt: false,
        hasEducation: false,
        sisterInjured: false,
        workAccident: false,
        helpedByUnion: false,
        isStreikbrecher: false,
        isOrganizer: false
    };
    
    decisionPath = [];
    currentQuestion = 0;
    
    updateDisplay();
    displayQuestion();
}

function displayQuestion() {
    // Check for death
    if (gameState.health <= 0) {
        showEnding(calculateEnding());
        return;
    }
    
    // Check if we reached the end
    if (currentQuestion >= 8) {
        showEnding(calculateEnding());
        return;
    }
    
    // Generate current question
    const questionData = questionGenerators[currentQuestion]();
    
    // Update UI
    document.getElementById('question-title').textContent = questionData.title;
    document.getElementById('situation-text').textContent = questionData.situation;
    
    // Create choice buttons
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    questionData.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.setAttribute('data-letter', letters[index] + ')');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(index, choice);
        choicesContainer.appendChild(button);
    });
    
    // Show/hide sections
    document.getElementById('story-section').style.display = 'block';
    document.getElementById('choices-section').style.display = 'block';
    document.getElementById('consequence-section').style.display = 'none';
    document.getElementById('ending-section').style.display = 'none';
    
    updateDisplay();
}

function makeChoice(choiceIndex, choice) {
    // Add to decision path
    decisionPath.push(choiceIndex);
    
    // Apply effects
    applyEffects(choice.effects);
    
    // Show consequence
    document.getElementById('consequence-text').textContent = choice.consequence;
    document.getElementById('consequence-section').style.display = 'block';
    document.getElementById('choices-section').style.display = 'none';
    
    // Setup continue button
    document.getElementById('continue-btn').onclick = () => {
        currentQuestion++;
        displayQuestion();
    };
}

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

// ===== START GAME ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', initGame);

