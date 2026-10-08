/**
 * App.js - Guitar Scale & Mode Explorer
 * Complete bilingual (EN/ES) logic, transposed tables, fretboard nut fix, and wiki audio playback
 */

const NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

const ENHARMONICS = {
  'Db': 'C♯', 'Eb': 'D♯', 'Gb': 'F♯', 'Ab': 'G♯', 'Bb': 'A♯',
  'C#': 'C♯', 'D#': 'D♯', 'F#': 'F♯', 'G#': 'G♯', 'A#': 'A♯'
};

function normalizeNote(n) {
  const trimmed = n.trim();
  return ENHARMONICS[trimmed] || trimmed;
}

// Fixed note frequency calculation: A4 = 440Hz
function getNoteFrequency(noteName, octave = 4) {
  const noteIndex = NOTES.indexOf(normalizeNote(noteName));
  if (noteIndex === -1) return 440;
  const midiNote = (octave + 1) * 12 + noteIndex;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// BILINGUAL UI TEXTS
const UI_TEXTS = {
  en: {
    langLabel: 'English',
    title: 'Guitar Scale & Mode Explorer',
    subtitle: 'Music theory reference & 6-9 string interactive fretboard guide',
    navWiki: 'Wiki & Theory',
    navTool: 'Fretboard Tool',
    navPrivacy: 'Privacy',
    navContact: 'Contact',
    adLabel: 'Advertisement',
    wikiMainTitle: '📚 Comprehensive Scale, Mode & Harmonization Encyclopedia',
    wikiMainDesc: 'Complete musical theory reference with step-by-step transformations, scale degree formulas, mode comparisons, and modal fit rules.',
    wikiBadge: 'Master Music Theory Guide',
    thGuideTitle: '📖 Understanding Scale Formulas, Step Codes & Degree Intervals',
    thGuideIntro: 'In music theory, every scale is built upon an exact mathematical sequence of distances (intervals) between notes within the 12-tone chromatic system. This guide uses three standard notations so you can read and apply scale formulas effortlessly:',
    thCol1Title: '1. Tone & Semitone Code (T / S)',
    thCol1Desc: 'Represents distances in step names where T = Tone (2 semitones / 2 frets) and S = Semitone (1 semitone / 1 fret). For example, T-T-S-T-T-T-S is the standard Major Scale formula.',
    thCol2Title: '2. Step Number Sequence (Numeric)',
    thCol2Desc: 'Displays the exact number of frets or semitones between consecutive notes. For instance, 2-2-1-2-2-2-1 is identical to T-T-S-T-T-T-S. A value of 3 represents a minor third jump (3 semitones).',
    thCol3Title: '3. Scale Degree Interval Notation',
    thCol3Desc: 'Measures each note relative to the Root note (1). Symbols like ♭3 indicate a flat 3rd (minor third), ♯4 indicates an augmented 4th, and ♭7 indicates a minor 7th degree.',
    transTitle: '🔄 Step-by-Step Scale Transformation Guide',
    toolMainTitle: '🎸 Interactive Tool: Scale, Chord & Fretboard Visualizer',
    toolMainSubtitle: 'Configure root note, scale family, mode, string count, and custom tuning to visualize and listen to scales and harmonized degree chords on the fretboard.',
    lblRoot: 'Root Note (Tonal Center):',
    lblFamily: 'Scale Family:',
    lblMode: 'Mode / Specific Scale:',
    lblStrings: 'Number of Strings:',
    lblDisplay: 'Fret Labels:',
    optDispInterval: 'Interval Degrees (1, ♭3, 5...)',
    optDispNote: 'Note Names (C, D, E...)',
    optDispBoth: 'Both (Note + Degree)',
    fretboardTitle: '🎸 Guitar Fretboard (24 Frets)',
    lblLegRoot: 'Root (1)',
    lblLegScale: 'Scale Notes',
    tuningTitle: '⚙️ String-by-String Tuning Configuration',
    lblPresets: 'Standard Presets:',
    btnPlayScale: '▶ Play Scale Audio',
    btnPlayingScale: '🔊 Playing Scale...',
    lblSpeedTitle: 'Speed:',
    lblStepFormulaTitle: 'Step & Interval Formula:',
    lblDegreeFormulaTitle: 'Scale Degree Formula:',
    lblNotesListTitle: 'Notes in this Key:',
    lblChordsTitle: '🎼 Harmonized Scale Chords (Triads, Tetrads & Semitone Formulas):',
    lblDescTitle: 'Sonorial Timbre & Character:',
    matrixTitle: '🗺️ Transposed Modal Relativity Matrix of Selected Scale Family',
    matrixSubtitle: 'This matrix demonstrates modal relativity: Every mode in a horizontal row shares the exact same set of pitch notes, changing only the root note (tonal center). For example, C Major, D Dorian, E Phrygian, F Lydian, G Mixolydian, A Aeolian, and B Locrian all contain the exact same notes (C, D, E, F, G, A, B)!',
    footerCopy: 'Guitar Scale & Mode Explorer — Educational tool created by an independent musician & software engineer.',
    tableHeaderMode: 'Mode Name',
    tableHeaderCode: 'Tone/Semitone Code',
    tableHeaderSteps: 'Numeric Steps',
    tableHeaderGenre: 'Genres / Usage',
    tableHeaderDesc: 'Characteristics & Sonic Color',
    scrollHint: '↔ Scroll'
  },
  es: {
    langLabel: 'Español',
    title: 'Wiki & Explorador de Escalas, Modos y Mástil',
    subtitle: 'Enciclopedia de teoría musical y herramienta interactiva multitono (6 a 9 cuerdas)',
    navWiki: 'Enciclopedia',
    navTool: 'Mástil Interactivo',
    navPrivacy: 'Privacidad',
    navContact: 'Contacto',
    adLabel: 'Anuncio Publicitario',
    wikiMainTitle: '📚 Enciclopedia Definitiva de Escalas, Modos y Armonización',
    wikiMainDesc: 'Manual de consulta profesional con análisis detallado de uso práctico, acoples modales, acoples pentatónicos y harmonización grado por grado.',
    wikiBadge: 'Guía Maestra para Músicos',
    thGuideTitle: '📖 Guía Explicativa de Fórmulas, Código de Pasos y Grados Intervalares',
    thGuideIntro: 'En teoría musical, cada escala se construye sobre una secuencia matemática exacta de distancias (intervalos) entre notas dentro del sistema cromático de 12 tonos. Esta guía utiliza tres notaciones estándar para que puedas leer y aplicar fórmulas sin esfuerzo:',
    thCol1Title: '1. Código de Tonos y Semitonos (T / S)',
    thCol1Desc: 'Representa la distancia en nombres de paso donde T = Tono (2 semitonos / 2 trastes) y S = Semitone (1 semitono / 1 traste). Por ejemplo, T-T-S-T-T-T-S es la fórmula de la Escala Mayor.',
    thCol2Title: '2. Secuencia Numérica de Pasos',
    thCol2Desc: 'Muestra la cantidad exacta de trastes o semitonos entre notas consecutivas. Por ejemplo, 2-2-1-2-2-2-1 es idéntica a T-T-S-T-T-T-S. Un valor de 3 representa un salto de tercera menor (3 semitonos).',
    thCol3Title: '3. Notación Intervalar por Grados',
    thCol3Desc: 'Mide cada nota respecto a la nota Raíz (1). Símbolos como ♭3 indican tercera menor, ♯4 indica cuarta aumentada, y ♭7 indica séptima menor.',
    transTitle: '🔄 Guía de Transformación Paso a Paso entre Escalas',
    toolMainTitle: '🎸 Herramienta Interactiva: Visualizador de Escalas, Acordes y Mástil',
    toolMainSubtitle: 'Configura la nota raíz, la familia, el modo, el número de cuerdas y la afinación para ver y escuchar las notas y los acordes en el mástil.',
    lblRoot: 'Nota Raíz (Tónica):',
    lblFamily: 'Familia de Escalas:',
    lblMode: 'Modo / Escala Específica:',
    lblStrings: 'Nº de Cuerdas:',
    lblDisplay: 'Mostrar en Trastes:',
    optDispInterval: 'Grados de Intervalo (1, ♭3, 5...)',
    optDispNote: 'Nombres de Notas (C, D, E...)',
    optDispBoth: 'Ambos (Nota + Grado)',
    fretboardTitle: '🎸 Mástil de Guitarra (24 Trastes)',
    lblLegRoot: 'Tónica (1)',
    lblLegScale: 'Notas de la Escala',
    tuningTitle: '⚙️ Configuración de Afinación Cuerda por Cuerda',
    lblPresets: 'Afinación Estándar:',
    btnPlayScale: '▶ Reproducir Escala',
    btnPlayingScale: '🔊 Reproduciendo...',
    lblSpeedTitle: 'Velocidad:',
    lblStepFormulaTitle: 'Fórmula de Pasos e Intervalos:',
    lblDegreeFormulaTitle: 'Fórmula por Grados:',
    lblNotesListTitle: 'Notas en esta Tonalidad:',
    lblChordsTitle: '🎼 Escala Harmonizada (Acordes Tríadas, Tétradas e Intervalos):',
    lblDescTitle: 'Sonoridad y Carácter Tímbrico:',
    matrixTitle: '🗺️ Matriz Transpuesta de Relatividad Modal de la Familia Seleccionada',
    matrixSubtitle: 'Esta matriz demuestra la relatividad modal: Todos los modos en una misma fila horizontal comparten exactamente el mismo conjunto de notas musicales. Por ejemplo, Do Mayor (Jónico), Re Dórico, Mi Frigio, Fa Lidio, Sol Mixolidio, La Eólico y Si Locrio contienen exactamente las mismas notas (Do, Re, Mi, Fa, Sol, La, Si). ¡Solo cambia la nota raíz (centro tonal)!',
    footerCopy: 'Wiki & Explorador de Escalas — Proyecto educativo independiente creado por un músico e ingeniero de software.',
    tableHeaderMode: 'Modo',
    tableHeaderCode: 'Código Tono/Semitono',
    tableHeaderSteps: 'Pasos Numéricos',
    tableHeaderGenre: 'Géneros / Uso',
    tableHeaderDesc: 'Sonoridad y Características',
    scrollHint: '↔ Desliza'
  }
};

// SCALE FAMILIES DATA WITH EXPANDED ABOUT/HISTORY & INLINED TRANSFORMATIONS
const SCALE_FAMILIES = {
  diatonic: {
    key: 'diatonic',
    name: { en: 'Diatonic Family (Major Scale)', es: 'Familia Diatónica (Escala Mayor)' },
    rootFormulaSteps: [2, 2, 1, 2, 2, 2, 1],
    about: {
      en: 'Origins & History: Codified during the Renaissance and Baroque eras (J.S. Bach, Rameau), the Diatonic scale grew from ancient Greek Pythagorean tuning and medieval Church Modes. It established the bedrock of Western tonal harmony. Today it is used across virtually every genre including Pop, Rock, Country, Jazz, Classical, and Folk.',
      es: 'Acerca de, Orígenes e Historia: Codificada formalmente durante el Renacimiento y Barroco (J.S. Bach), la escala Diatónica evolucionó desde los modos gregorianos y la afinación pitagórica. Es el cimiento absoluto de la armonía tonal occidental. Hoy se utiliza en pop, rock, country, jazz, música clásica y folclor.'
    },
    transformation: {
      en: { base: 'Diatonic Major Scale (Base)', arrow: '⬇ (Lower 3rd, 6th, and 7th degrees by 1 semitone)', res: 'Natural Minor Scale (Aeolian)' },
      es: { base: 'Escala Diatónica Mayor (Base)', arrow: '⬇ (Baja un semitono el 3º, 6º y 7º grado)', res: 'Escala Menor Natural (Eólica)' }
    },
    chords: [
      { deg: 'I', triad: 'I (Major)', tetrad: 'Imaj7', formula: '1 - 3 - 5 - 7' },
      { deg: 'ii', triad: 'ii (Minor)', tetrad: 'ii7', formula: '1 - ♭3 - 5 - ♭7' },
      { deg: 'iii', triad: 'iii (Minor)', tetrad: 'iii7', formula: '1 - ♭3 - 5 - ♭7' },
      { deg: 'IV', triad: 'IV (Major)', tetrad: 'IVmaj7', formula: '1 - 3 - 5 - 7' },
      { deg: 'V', triad: 'V (Major)', tetrad: 'V7 (Dom)', formula: '1 - 3 - 5 - ♭7' },
      { deg: 'vi', triad: 'vi (Minor)', tetrad: 'vi7', formula: '1 - ♭3 - 5 - ♭7' },
      { deg: 'vii°', triad: 'vii° (Dim)', tetrad: 'm7(♭5)', formula: '1 - ♭3 - ♭5 - ♭7' }
    ],
    modes: [
      { id: 'ionian', name: { en: '1. Ionian (Major)', es: '1. Jónico (Escala Mayor)' }, steps: [2, 2, 1, 2, 2, 2, 1], code: 'T-T-S-T-T-T-S', degrees: ['1', '2', '3', '4', '5', '6', '7'], genre: { en: 'Pop, Classical, Country', es: 'Pop, Clásica, Country' }, desc: { en: 'Bright, stable, clear, and resolutive. Foundation of pop & classical music.', es: 'Alegre, estable, claro, resolutivo. Base de la armonía clásica y pop.' } },
      { id: 'dorian', name: { en: '2. Dorian', es: '2. Dórico' }, steps: [2, 1, 2, 2, 2, 1, 2], code: 'T-S-T-T-T-S-T', degrees: ['1', '2', '♭3', '4', '5', '6', '♭7'], genre: { en: 'Funk, Jazz, Blues, Rock', es: 'Funk, Jazz, Blues, Rock' }, desc: { en: 'Sophisticated minor with a bright major 6th. Key for Jazz, Funk & Rock (Billie Jean).', es: 'Menor elegante, sofisticado, melancólico con toque brillante por la 6ª mayor (Billie Jean).' } },
      { id: 'phrygian', name: { en: '3. Phrygian', es: '3. Frigio' }, steps: [1, 2, 2, 2, 1, 2, 2], code: 'S-T-T-T-S-T-T', degrees: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'], genre: { en: 'Flamenco, Heavy Metal, Thrash', es: 'Flamenco, Metal Pesado, Thrash' }, desc: { en: 'Dark, tense, Spanish/Flamenco flavor with a flat 2nd degree (Metallica).', es: 'Oscuro, tenso, místico, con sabor flamenco, español o metal pesado por la ♭2.' } },
      { id: 'lydian', name: { en: '4. Lydian', es: '4. Lidio' }, steps: [2, 2, 2, 1, 2, 2, 1], code: 'T-T-T-S-T-T-S', degrees: ['1', '2', '3', '♯4', '5', '6', '7'], genre: { en: 'Film Scoring, Sci-Fi, Prog Rock', es: 'Cine, Sci-Fi, Rock Progresivo' }, desc: { en: 'Dreamy, ethereal, futuristic with an augmented 4th (Sci-Fi film scores, Disney).', es: 'Mágico, espacial, de ensueño, extremadamente brillante y futurista por la ♯4.' } },
      { id: 'mixolydian', name: { en: '5. Mixolydian', es: '5. Mixolidio' }, steps: [2, 2, 1, 2, 2, 1, 2], code: 'T-T-S-T-T-S-T', degrees: ['1', '2', '3', '4', '5', '6', '♭7'], genre: { en: 'Classic Rock, Blues, Southern Rock', es: 'Rock Clásico, Blues, Rock Sureño' }, desc: { en: 'Bluesy, festive major sound with a flat 7th. Backbone of Classic Rock & Blues.', es: 'Festivo, blusero, rockero. Es una escala mayor desenfadada por la ♭7.' } },
      { id: 'aeolian', name: { en: '6. Aeolian (Natural Minor)', es: '6. Eólico (Escala Menor Natural)' }, steps: [2, 1, 2, 2, 1, 2, 2], code: 'T-S-T-T-S-T-T', degrees: ['1', '2', '♭3', '4', '5', '♭6', '♭7'], genre: { en: 'Rock, Metal, Pop Ballads', es: 'Rock, Metal, Baladas Pop' }, desc: { en: 'Sad, emotional, dramatic minor key foundation for ballads and rock anthems.', es: 'Triste, dramático, emotivo, serio. Base de baladas, rock y canciones épicas.' } },
      { id: 'locrian', name: { en: '7. Locrian', es: '7. Locrio' }, steps: [1, 2, 2, 1, 2, 2, 2], code: 'S-T-T-S-T-T-T', degrees: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'], genre: { en: 'Death Metal, Fusion, Avant-Garde', es: 'Death Metal, Fusión, Vanguardia' }, desc: { en: 'Unstable, highly dissonant, lacks a perfect 5th (Extreme Metal, Avant-garde Jazz).', es: 'Extremadamente tenso e inestable. Carece de quinta justa (Metal Extremo).' } }
    ]
  },
  harmonic_minor: {
    key: 'harmonic_minor',
    name: { en: 'Harmonic Minor Family', es: 'Familia Menor Armónica' },
    rootFormulaSteps: [2, 1, 2, 2, 1, 3, 1],
    about: {
      en: 'Origins & History: Developed in European Classical music to create a strong dominant major chord (V7) resolving to a minor tonic (i). Famous in Middle Eastern traditions, Klezmer, Flamenco, and popularized in modern guitar by Neoclassical shredders (Yngwie Malmsteen, Randy Rhoads).',
      es: 'Acerca de, Orígenes e Historia: Desarrollada en la música clásica europea para obtener un acorde dominante mayor (V7) fuerte hacia la tónica menor. Ampliamente usada en la música del Medio Oriente, Klezmer, Flamenco, y popularizada en la guitarra eléctrica por virtuosos del Metal Neoclásico.'
    },
    transformation: {
      en: { base: 'Natural Minor Scale', arrow: '⬇ (Raise 7th degree by 1 semitone for leading tone)', res: 'Harmonic Minor Scale' },
      es: { base: 'Escala Menor Natural', arrow: '⬇ (Eleva un semitono el 7º grado para la sensible)', res: 'Escala Menor Armónica' }
    },
    chords: [
      { deg: 'i', triad: 'i (Minor)', tetrad: 'im(maj7)', formula: '1 - ♭3 - 5 - 7' },
      { deg: 'ii°', triad: 'ii° (Dim)', tetrad: 'm7(♭5)', formula: '1 - ♭3 - ♭5 - ♭7' },
      { deg: '♭III+', triad: '♭III+ (Aug)', tetrad: '♭IIImaj7(♯5)', formula: '1 - 3 - ♯5 - 7' },
      { deg: 'iv', triad: 'iv (Minor)', tetrad: 'iv7', formula: '1 - ♭3 - 5 - ♭7' },
      { deg: 'V', triad: 'V (Major)', tetrad: 'V7 (Dom)', formula: '1 - 3 - 5 - ♭7' },
      { deg: '♭VI', triad: '♭VI (Major)', tetrad: '♭VImaj7', formula: '1 - 3 - 5 - 7' },
      { deg: 'vii°', triad: 'vii° (Dim)', tetrad: 'vii°7', formula: '1 - ♭3 - ♭5 - ♭♭7' }
    ],
    modes: [
      { id: 'hm_1', name: { en: '1. Harmonic Minor', es: '1. Menor Armónica' }, steps: [2, 1, 2, 2, 1, 3, 1], code: 'T-S-T-T-S-3S-S', degrees: ['1', '2', '♭3', '4', '5', '♭6', '7'], genre: { en: 'Neoclassical Metal, Classical, Film', es: 'Metal Neoclásico, Clásica, Cine' }, desc: { en: 'Dramatic, exotic, neoclassical, dark (Yngwie Malmsteen).', es: 'Dramática, exótica, neoclásica y oscura. Salto de 3 semitonos.' } },
      { id: 'hm_2', name: { en: '2. Locrian ♮6', es: '2. Locrio ♮6' }, steps: [1, 2, 2, 1, 3, 1, 2], code: 'S-T-T-S-3S-S-T', degrees: ['1', '♭2', '♭3', '4', '♭5', '6', '♭7'], genre: { en: 'Jazz Fusion, World Music', es: 'Jazz Fusión, Música del Mundo' }, desc: { en: 'Diminished, unstable with oriental tension.', es: 'Disminuido e inestable con tensión oriental por la 6ª mayor.' } },
      { id: 'hm_3', name: { en: '3. Ionian ♯5', es: '3. Jónico ♯5' }, steps: [2, 2, 1, 3, 1, 2, 1], code: 'T-T-S-3S-S-T-S', degrees: ['1', '2', '3', '4', '♯5', '6', '7'], genre: { en: 'Modern Jazz, Prog Rock', es: 'Jazz Moderno, Rock Progresivo' }, desc: { en: 'Majestic yet suspended, ideal for maj7(♯5) chords.', es: 'Majestuoso pero suspendido y misterioso por la ♯5.' } },
      { id: 'hm_4', name: { en: '4. Dorian ♯4 (Klezmer)', es: '4. Dórico ♯4 (Klezmer)' }, steps: [2, 1, 3, 1, 2, 1, 2], code: 'T-S-3S-S-T-S-T', degrees: ['1', '2', '♭3', '♯4', '5', '6', '♭7'], genre: { en: 'Klezmer, Gypsy Jazz, Balkan', es: 'Klezmer, Jazz Gitano, Música Bálcana' }, desc: { en: 'Tragic gypsy klezmer color with augmented 4th.', es: 'Sonido trágico, gitano, klezmer con ♯4 y ♭3.' } },
      { id: 'hm_5', name: { en: '5. Phrygian Dominant', es: '5. Frigio Dominante' }, steps: [1, 3, 1, 2, 1, 2, 2], code: 'S-3S-S-T-S-T-T', degrees: ['1', '♭2', '3', '4', '5', '♭6', '♭7'], genre: { en: 'Flamenco, Arabic, Metal, Shred', es: 'Flamenco, Árabe, Heavy Metal, Shred' }, desc: { en: 'King of Flamenco, Egyptian, Middle Eastern & Neoclassical Metal sound.', es: 'Insignia del Flamenco, música Árabe, Egipcia y Heavy Metal.' } },
      { id: 'hm_6', name: { en: '6. Lydian ♯2', es: '6. Lidio ♯2' }, steps: [3, 1, 2, 1, 2, 2, 1], code: '3S-S-T-S-T-T-S', degrees: ['1', '♯2', '3', '♯4', '5', '6', '7'], genre: { en: 'Film Scoring, Impressionism', es: 'Cine, Impresionismo' }, desc: { en: 'Dreamy and bright with initial 3 semitone jump.', es: 'Mágico, brillante con salto inicial de 3 semitonos.' } },
      { id: 'hm_7', name: { en: '7. Ultra Locrian', es: '7. Ultra Locrio' }, steps: [1, 2, 1, 2, 2, 1, 3], code: 'S-T-S-T-T-S-3S', degrees: ['1', '♭2', '♭3', '♭4', '♭5', '♭6', '♭♭7'], genre: { en: 'Jazz, Diminished Soloing', es: 'Jazz, Solos Disminuidos' }, desc: { en: 'Maximum diminished tension for dim7 chords.', es: 'Máxima tensión disminuida sobre acorde °7.' } }
    ]
  },
  melodic_minor: {
    key: 'melodic_minor',
    name: { en: 'Melodic Minor Family (Jazz Minor)', es: 'Familia Menor Melódica (Jazz Minor)' },
    rootFormulaSteps: [2, 1, 2, 2, 2, 2, 1],
    about: {
      en: 'Origins & History: Classical composers raised both 6th and 7th degrees when ascending to avoid the vocal 3-semitone gap of Harmonic Minor. In Modern Jazz, it is played ascending in both directions. Essential for Allan Holdsworth, Pat Metheny, Guthrie Govan, and Miles Davis.',
      es: 'Acerca de, Orígenes e Historia: Los compositores clásicos elevaron tanto el 6º como el 7º grado al ascender para evitar el salto vocal brusco de la menor armónica. En el Jazz Moderno se toca igual al subir y bajar. Esencial para Allan Holdsworth, Pat Metheny, Guthrie Govan y Miles Davis.'
    },
    transformation: {
      en: { base: 'Harmonic Minor Scale', arrow: '⬇ (Raise 6th degree by 1 semitone to smooth 3S jump)', res: 'Melodic Minor Scale (Jazz Minor)' },
      es: { base: 'Escala Menor Armónica', arrow: '⬇ (Eleva un semitono el 6º grado para suavizar)', res: 'Escala Menor Melódica (Jazz Minor)' }
    },
    chords: [
      { deg: 'i', triad: 'i (Minor)', tetrad: 'im(maj7)', formula: '1 - ♭3 - 5 - 7' },
      { deg: 'ii', triad: 'ii (Minor)', tetrad: 'ii7(♭9)', formula: '1 - ♭3 - 5 - ♭7' },
      { deg: '♭III+', triad: '♭III+ (Aug)', tetrad: '♭IIImaj7(♯5)', formula: '1 - 3 - ♯5 - 7' },
      { deg: 'IV', triad: 'IV (Major)', tetrad: 'IV7 (Lyd Dom)', formula: '1 - 3 - 5 - ♭7' },
      { deg: 'V', triad: 'V (Major)', tetrad: 'V7(♭13)', formula: '1 - 3 - 5 - ♭7' },
      { deg: 'vi°', triad: 'vi° (Dim)', tetrad: 'm7(♭5)', formula: '1 - ♭3 - ♭5 - ♭7' },
      { deg: 'vii°', triad: 'vii° (Dim)', tetrad: 'm7(♭5)alt', formula: '1 - ♭3 - ♭5 - ♭7' }
    ],
    modes: [
      { id: 'mm_1', name: { en: '1. Melodic Minor', es: '1. Menor Melódica' }, steps: [2, 1, 2, 2, 2, 2, 1], code: 'T-S-T-T-T-T-S', degrees: ['1', '2', '♭3', '4', '5', '6', '7'], genre: { en: 'Jazz, Modern Fusion', es: 'Jazz, Fusión Moderna' }, desc: { en: 'Sophisticated, elegant minor for m(maj7) chords.', es: 'Híbrida, elegante, sofisticada, clave en Jazz.' } },
      { id: 'mm_2', name: { en: '2. Dorian ♭2', es: '2. Dórico ♭2' }, steps: [1, 2, 2, 2, 2, 1, 2], code: 'S-T-T-T-T-S-T', degrees: ['1', '♭2', '♭3', '4', '5', '6', '♭7'], genre: { en: 'Jazz Fusion', es: 'Jazz Fusión' }, desc: { en: 'Phrygian sound with a major 6th. Modern Fusion.', es: 'Frigio brillante con 6ª mayor (Jazz Fusion).' } },
      { id: 'mm_3', name: { en: '3. Lydian Augmented', es: '3. Lidio Aumentado' }, steps: [2, 2, 2, 2, 1, 2, 1], code: 'T-T-T-T-S-T-S', degrees: ['1', '2', '3', '♯4', '♯5', '6', '7'], genre: { en: 'Post-Bop Jazz, Cinema', es: 'Post-Bop, Cine' }, desc: { en: 'Expansive, spacey sound for maj7(♯5) chords.', es: 'Flotante, espacial sobre acordes 7♯5.' } },
      { id: 'mm_4', name: { en: '4. Lydian Dominant', es: '4. Lidio Dominante' }, steps: [2, 2, 2, 1, 2, 1, 2], code: 'T-T-T-S-T-S-T', degrees: ['1', '2', '3', '♯4', '5', '6', '♭7'], genre: { en: 'Jazz, Cartoons, Debussy', es: 'Jazz, Caricaturas Retro, Debussy' }, desc: { en: 'Playful, modern scale for 7(♯11) dominant chords.', es: 'Animado y moderno para acordes 7(♯11).' } },
      { id: 'mm_5', name: { en: '5. Mixolydian ♭6', es: '5. Mixolidio ♭6' }, steps: [2, 2, 1, 2, 1, 2, 2], code: 'T-T-S-T-S-T-T', degrees: ['1', '2', '3', '4', '5', '♭6', '♭7'], genre: { en: 'Romantic Jazz, Hindu Music', es: 'Jazz Romántico, Música Hindú' }, desc: { en: 'Warm nostalgic tension over V7(♭13) chords.', es: 'Nostálgico pero mayor.' } },
      { id: 'mm_6', name: { en: '6. Locrian ♮2', es: '6. Locrio ♮2' }, steps: [2, 1, 2, 1, 2, 2, 2], code: 'T-S-T-S-T-T-T', degrees: ['1', '2', '♭3', '4', '♭5', '♭6', '♭7'], genre: { en: 'Bebop, Hard Bop', es: 'Bebop, Hard Bop' }, desc: { en: 'Ideal scale for improvising over m7(♭5) chords.', es: 'Ideal para acordes m7(♭5) semidisminuidos.' } },
      { id: 'mm_7', name: { en: '7. Altered (Superlocrian)', es: '7. Alterado (Superlocrio)' }, steps: [1, 2, 1, 2, 2, 2, 2], code: 'S-T-S-T-T-T-T', degrees: ['1', '♭2', '♭3', '♭4', '♭5', '♭6', '♭7'], genre: { en: 'Modern Jazz Soloing', es: 'Solos de Jazz Moderno' }, desc: { en: '#1 choice for jazz solos over 7alt dominant chords.', es: 'Máxima tensión sobre dominantes alterados.' } }
    ]
  },
  harmonic_major: {
    key: 'harmonic_major',
    name: { en: 'Harmonic Major Family', es: 'Familia Armónica Mayor' },
    rootFormulaSteps: [2, 2, 1, 2, 1, 3, 1],
    about: {
      en: 'Origins & History: A major scale with a flattened 6th degree (♭6). Popularized in 19th-century Romantic orchestral music (Rimsky-Korsakov) to inject deep exotic minor subdominant colors (iv minor chord in major key) into bright major progressions.',
      es: 'Acerca de, Orígenes e Historia: Escala mayor con el sexto grado bemolizado (♭6). Popularizada en la música orquestal romántica del siglo XIX (Rimsky-Korsakov) para inyectar colores menores exóticos (acorde iv menor en tono mayor) dentro de tonalidades mayores.'
    },
    transformation: {
      en: { base: 'Diatonic Major Scale (Base)', arrow: '⬇ (Lower 6th degree only by 1 semitone)', res: 'Harmonic Major Scale' },
      es: { base: 'Escala Diatónica Mayor (Base)', arrow: '⬇ (Baja un semitono únicamente el 6º grado)', res: 'Escala Armónica Mayor' }
    },
    chords: [
      { deg: 'I', triad: 'I (Major)', tetrad: 'Imaj7', formula: '1 - 3 - 5 - 7' },
      { deg: 'ii°', triad: 'ii° (Dim)', tetrad: 'm7(♭5)', formula: '1 - ♭3 - ♭5 - ♭7' },
      { deg: 'iii', triad: 'iii (Minor)', tetrad: 'iii7(♭9)', formula: '1 - ♭3 - 5 - ♭7' },
      { deg: 'iv', triad: 'iv (Minor)', tetrad: 'ivm(maj7)', formula: '1 - ♭3 - 5 - 7' },
      { deg: 'V', triad: 'V (Major)', tetrad: 'V7(♭9)', formula: '1 - 3 - 5 - ♭7' },
      { deg: '♭VI+', triad: '♭VI+ (Aug)', tetrad: '♭VImaj7(♯5)', formula: '1 - 3 - ♯5 - 7' },
      { deg: 'vii°', triad: 'vii° (Dim)', tetrad: 'vii°7', formula: '1 - ♭3 - ♭5 - ♭♭7' }
    ],
    modes: [
      { id: 'hmaj_1', name: { en: '1. Harmonic Major', es: '1. Armónica Mayor' }, steps: [2, 2, 1, 2, 1, 3, 1], code: 'T-T-S-T-S-3S-S', degrees: ['1', '2', '3', '4', '5', '♭6', '7'], genre: { en: 'Romantic, Film Scoring', es: 'Romántica, Cine' }, desc: { en: 'Exotic, romantic, cinematic major key color.', es: 'Exótica, romántica, apasionada.' } },
      { id: 'hmaj_2', name: { en: '2. Dorian ♭5', es: '2. Dórico ♭5' }, steps: [2, 1, 2, 1, 3, 1, 2], code: 'T-S-T-S-3S-S-T', degrees: ['1', '2', '♭3', '4', '♭5', '6', '♭7'], genre: { en: 'Jazz Fusion', es: 'Jazz Fusión' }, desc: { en: 'Jazz minor color with diminished 5th.', es: 'Menor con quinta disminuida y salto oriental.' } },
      { id: 'hmaj_3', name: { en: '3. Phrygian ♭4', es: '3. Frigio ♭4' }, steps: [1, 2, 1, 3, 1, 2, 2], code: 'S-T-S-3S-S-T-T', degrees: ['1', '♭2', '♭3', '♭4', '5', '♭6', '♭7'], genre: { en: 'Avant-Garde, World', es: 'Vanguardia, World Music' }, desc: { en: 'Tense, mysterious with flat 4th.', es: 'Tenso y misterioso con cuarta disminuida.' } },
      { id: 'hmaj_4', name: { en: '4. Lydian ♭3', es: '4. Lidio ♭3 (Lidio Menor)' }, steps: [2, 1, 3, 1, 2, 2, 1], code: 'T-S-3S-S-T-T-S', degrees: ['1', '2', '♭3', '♯4', '5', '6', '7'], genre: { en: 'Film Scores, Dark Lydian', es: 'Música de Cine, Lidio Oscuro' }, desc: { en: 'Dramatic Lydian with minor 3rd.', es: 'Lidio dramático con tercera menor.' } },
      { id: 'hmaj_5', name: { en: '5. Mixolydian ♭2', es: '5. Mixolidio ♭2' }, steps: [1, 3, 1, 2, 2, 1, 2], code: 'S-3S-S-T-T-S-T', degrees: ['1', '♭2', '3', '4', '5', '6', '♭7'], genre: { en: 'Arabic, Dominant Solos', es: 'Música Árabe, Solos Dominantes' }, desc: { en: 'Exotic dominant with flat 2nd.', es: 'Dominante exótico con segunda bemol.' } },
      { id: 'hmaj_6', name: { en: '6. Lydian ♯5 ♯2', es: '6. Lidio ♯5 ♯2' }, steps: [3, 1, 2, 2, 1, 2, 1], code: '3S-S-T-T-S-T-S', degrees: ['1', '♯2', '3', '♯4', '♯5', '6', '7'], genre: { en: 'Sci-Fi Film', es: 'Ciencia Ficción' }, desc: { en: 'Highly dissonant and galactic sound.', es: 'Muy disonante y expansivo.' } },
      { id: 'hmaj_7', name: { en: '7. Locrian ♭♭7', es: '7. Locrio ♭♭7' }, steps: [1, 2, 2, 1, 2, 1, 3], code: 'S-T-T-S-T-S-3S', degrees: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭♭7'], genre: { en: 'Diminished Soloing', es: 'Solos Disminuidos' }, desc: { en: 'Tense, suited for diminished arpeggios.', es: 'Tenso, especial para arpegios disminuidos.' } }
    ]
  },
  pentatonic_and_blues: {
    key: 'pentatonic_and_blues',
    name: { en: 'Pentatonics & Blues Family', es: 'Pentatónicas y Escala de Blues' },
    rootFormulaSteps: [3, 2, 2, 3, 2],
    about: {
      en: 'Origins & History: Ancient 5-note scales dating back over 50,000 years in prehistoric flutes, Chinese traditional music, African folk, and Celtic tunes. In the 20th century, African-American musicians added the passing "Blue Note" (♭5) creating the Blues Scale — the foundation for B.B. King, Jimi Hendrix, Stevie Ray Vaughan, and Eric Clapton.',
      es: 'Acerca de, Orígenes e Historia: Escalas ancestrales de 5 notas con más de 50,000 años de antigüedad presentes en flautas prehistóricas, música tradicional china y folclor africano. En el siglo XX, músicos afroamericanos añadieron la "Blue Note" (♭5) dando origen a la Escala de Blues, cimiento de B.B. King, Jimi Hendrix, Stevie Ray Vaughan y Eric Clapton.'
    },
    fits: {
      en: [
        { title: '🔥 Minor Pentatonic Fits (1 - ♭3 - 4 - 5 - ♭7)', list: ['Aeolian (Natural Minor): 100% exact skeleton.', 'Dorian Mode: Fits perfectly, core Blues-Rock & Funk solo sound.', 'Phrygian Mode: Fits cleanly over minor triad base.'] },
        { title: '☀️ Major Pentatonic Fits (1 - 2 - 3 - 5 - 6)', list: ['Ionian (Major Scale): Sweet, consonant for Country & Pop.', 'Mixolydian Mode: Fits amazingly for Southern Rock & Blues.', 'Lydian Mode: Works smoothly without clashing with ♯4.'] }
      ],
      es: [
        { title: '🔥 Acoples de la Pentatónica Menor (1 - ♭3 - 4 - 5 - ♭7)', list: ['Modo Eólico (Menor Natural): Acople exacto 100%. Esqueleto natural.', 'Modo Dórico: Cuadra perfecto, sonido estrella de Blues-Rock y Funk.', 'Modo Frigio: Encaja sobre el acorde tríada menor base.'] },
        { title: '☀️ Acoples de la Pentatónica Mayor (1 - 2 - 3 - 5 - 6)', list: ['Modo Jónico (Escala Mayor): Dulce, dulce para Country, Pop y Baladas.', 'Modo Mixolidio: Funciona excelente para Rock Sureño y Blues.', 'Modo Lidio: Encaja suavemente sin chocar con la ♯4.'] }
      ]
    },
    blueNoteDetail: {
      en: '🎸 The "Blue Note" (♭5 / ♯4): Located exactly between the 4th and 5th degrees (3 semitones above the minor 3rd). It acts as a chromatic passing note, adding intense expressive grit and melancholy emotion when bent or slid into the 5th degree.',
      es: '🎸 La "Nota de Blues" (♭5 / ♯4): Se ubica exactamente entre el 4º y 5º grado. Funciona como nota de paso cromática que añade una tensión expresiva desgarradora y rasgada al deslizarse o estirarse hacia la 5ª justa.'
    },
    modes: [
      { id: 'p_maj', name: { en: 'Major Pentatonic (5 notes)', es: 'Pentatónica Mayor (5 notas)' }, steps: [2, 2, 3, 2, 3], code: 'T-T-3S-T-3S', degrees: ['1', '2', '3', '5', '6'], genre: { en: 'Country, Pop, Folk, Rock', es: 'Country, Pop, Folclor, Rock' }, desc: { en: 'Consonant, sweet, country/rock sound. Fits Ionian & Mixolydian.', es: 'Consonante, universal, folclórica. Sin semitonos.' } },
      { id: 'p_min', name: { en: 'Minor Pentatonic (5 notes)', es: 'Pentatónica Menor (5 notas)' }, steps: [3, 2, 2, 3, 2], code: '3S-T-T-3S-T', degrees: ['1', '♭3', '4', '5', '♭7'], genre: { en: 'Rock, Blues, Metal, Pop', es: 'Rock, Blues, Metal, Pop' }, desc: { en: '#1 solo scale in guitar history. Fits Aeolian, Dorian & Phrygian.', es: 'Piedra angular del Rock, Blues, Pop y Metal.' } },
      { id: 'p_blues', name: { en: 'Blues Scale (6 notes)', es: 'Escala de Blues (6 notas)' }, steps: [3, 2, 1, 1, 3, 2], code: '3S-T-S-S-3S-T', degrees: ['1', '♭3', '4', '♭5', '5', '♭7'], genre: { en: 'Chicago Blues, Hard Rock, Funk', es: 'Chicago Blues, Hard Rock, Funk' }, desc: { en: 'Adds the tension "Blue Note" (♭5) to minor pentatonic.', es: 'Agrega la "Blue Note" (♭5) a la pentatónica menor.' } }
    ]
  },
  symmetric: {
    key: 'symmetric',
    name: { en: 'Symmetric & Synthetic Scales', es: 'Escalas Simétricas / Sintéticas' },
    rootFormulaSteps: [2, 2, 2, 2, 2, 2],
    about: {
      en: 'Origins & History: Built on exact mathematical interval repetition (e.g., all whole tones or alternating half/whole steps). Because of their perfect mathematical symmetry, rotating these scales produces identical pitch patterns — meaning they DO NOT have distinct uniquely-named relative modes. Used heavily by Claude Debussy, Thelonious Monk, Igor Stravinsky, and horror/sci-fi film composers for tension and floating weightlessness.',
      es: 'Acerca de, Orígenes e Historia: Creadas mediante repetición matemática exacta de intervalos. Debido a su simetría matemática perfecta, rotar sus notas produce los mismos patrones intervalares, por lo que NO tienen modos relativos con nombres únicos. Usadas por Claude Debussy, Thelonious Monk, Igor Stravinsky y compositores de cine de terror y ciencia ficción.'
    },
    modes: [
      { id: 'sym_wt', name: { en: 'Whole Tone (6 notes)', es: 'Escala de Tonos Completos (6 notas)' }, steps: [2, 2, 2, 2, 2, 2], code: 'T-T-T-T-T-T', degrees: ['1', '2', '3', '♯4', '♯5', '♭7'], genre: { en: 'Impressionism, Dream Sequences', es: 'Impresionismo, Sueños en Cine' }, desc: { en: 'Dreamy, weightless, floating sound (Debussy, Monk).', es: 'Suena flotante, mágica, a sueño o hipnosis.' } },
      { id: 'sym_dim_4', name: { en: 'Formula 3-3-3-3 (Dim7 Arp)', es: 'Fórmula 3-3-3-3 (Arpegio °7)' }, steps: [3, 3, 3, 3], code: '3S-3S-3S-3S', degrees: ['1', '♭3', '♭5', '♭♭7'], genre: { en: 'Suspense, Film Tension', es: 'Suspenso, Drama en Cine' }, desc: { en: 'Symmetrical 4-note minor 3rd arpeggio.', es: 'Muestra las 4 notas pilar del acorde disminuido 7º.' } },
      { id: 'sym_oct_ts', name: { en: 'Octatonic Diminished (Tone-Semitone)', es: 'Octatónica Disminuida (Tono-Semitono)' }, steps: [2, 1, 2, 1, 2, 1, 2, 1], code: 'T-S-T-S-T-S-T-S', degrees: ['1', '2', '♭3', '4', '♭5', '♭6', '6', '7'], genre: { en: 'Terror Movies, Modern Jazz', es: 'Cine de Terror, Jazz Moderno' }, desc: { en: 'Alternates Tone and Semitone. Suspense and terror movies.', es: 'Tensión en Jazz y películas de misterio/terror.' } },
      { id: 'sym_double_harm', name: { en: 'Double Harmonic (Byzantine)', es: 'Doble Armónica (Bizantina)' }, steps: [1, 3, 1, 2, 1, 3, 1], code: 'S-3S-S-T-S-3S-S', degrees: ['1', '♭2', '3', '4', '5', '♭6', '7'], desc: { en: 'Two 3-semitone jumps. Deeply mystical Middle Eastern sound.', es: 'Doble salto de 3 semitonos. Profundamente mística.' } }
    ]
  }
};

const DEFAULT_TUNINGS = {
  6: [
    { note: 'E', octave: 4, thickness: 1 },
    { note: 'B', octave: 3, thickness: 1.5 },
    { note: 'G', octave: 3, thickness: 2 },
    { note: 'D', octave: 3, thickness: 2.5 },
    { note: 'A', octave: 2, thickness: 3 },
    { note: 'E', octave: 2, thickness: 3.5 }
  ],
  7: [
    { note: 'E', octave: 4, thickness: 1 },
    { note: 'B', octave: 3, thickness: 1.5 },
    { note: 'G', octave: 3, thickness: 2 },
    { note: 'D', octave: 3, thickness: 2.5 },
    { note: 'A', octave: 2, thickness: 3 },
    { note: 'E', octave: 2, thickness: 3.5 },
    { note: 'B', octave: 1, thickness: 4 }
  ],
  8: [
    { note: 'E', octave: 4, thickness: 1 },
    { note: 'B', octave: 3, thickness: 1.5 },
    { note: 'G', octave: 3, thickness: 2 },
    { note: 'D', octave: 3, thickness: 2.5 },
    { note: 'A', octave: 2, thickness: 3 },
    { note: 'E', octave: 2, thickness: 3.5 },
    { note: 'B', octave: 1, thickness: 4 },
    { note: 'F♯', octave: 1, thickness: 4.5 }
  ],
  9: [
    { note: 'E', octave: 4, thickness: 1 },
    { note: 'B', octave: 3, thickness: 1.5 },
    { note: 'G', octave: 3, thickness: 2 },
    { note: 'D', octave: 3, thickness: 2.5 },
    { note: 'A', octave: 2, thickness: 3 },
    { note: 'E', octave: 2, thickness: 3.5 },
    { note: 'B', octave: 1, thickness: 4 },
    { note: 'F♯', octave: 1, thickness: 4.5 },
    { note: 'C♯', octave: 1, thickness: 5 }
  ]
};

// GLOBAL APP STATE WITH LOCALSTORAGE PERSISTENCE
const state = {
  lang: localStorage.getItem('scale_wiki_lang') || 'en',
  currentRoot: localStorage.getItem('scale_wiki_root') || 'C',
  currentFamilyKey: localStorage.getItem('scale_wiki_family') || 'diatonic',
  currentModeIndex: parseInt(localStorage.getItem('scale_wiki_mode') || '0', 10),
  stringCount: parseInt(localStorage.getItem('scale_wiki_strings') || '6', 10),
  displayMode: localStorage.getItem('scale_wiki_display') || 'interval',
  playbackSpeed: parseInt(localStorage.getItem('scale_wiki_speed') || '280', 10),
  currentTuning: JSON.parse(localStorage.getItem('scale_wiki_tuning') || JSON.stringify(DEFAULT_TUNINGS[6]))
};

function saveState() {
  localStorage.setItem('scale_wiki_lang', state.lang);
  localStorage.setItem('scale_wiki_root', state.currentRoot);
  localStorage.setItem('scale_wiki_family', state.currentFamilyKey);
  localStorage.setItem('scale_wiki_mode', state.currentModeIndex);
  localStorage.setItem('scale_wiki_strings', state.stringCount);
  localStorage.setItem('scale_wiki_display', state.displayMode);
  localStorage.setItem('scale_wiki_speed', state.playbackSpeed);
  localStorage.setItem('scale_wiki_tuning', JSON.stringify(state.currentTuning));
}

// WEB AUDIO SYNTHESIZER WITH TRIANGLE WAVE
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration = 0.6) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// PLAY MODE 1 IN C FOR WIKI CARDS
function playWikiFamilyAudio(fKey) {
  const family = SCALE_FAMILIES[fKey];
  if (!family || !family.modes[0]) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const steps = family.modes[0].steps;
  const rootNote = 'C';
  const rootIndex = NOTES.indexOf(rootNote);
  const startOctave = 3;
  let currentOctave = startOctave;

  const scaleNotes = [rootNote];
  let currIndex = rootIndex;

  for (let i = 0; i < steps.length - 1; i++) {
    currIndex = (currIndex + steps[i]) % 12;
    scaleNotes.push(NOTES[currIndex]);
  }

  const notesSequence = [];
  let prevNoteIndex = rootIndex;

  scaleNotes.forEach((note, idx) => {
    const idxInNotes = NOTES.indexOf(normalizeNote(note));
    if (idx > 0 && idxInNotes < prevNoteIndex) {
      currentOctave++;
    }
    prevNoteIndex = idxInNotes;
    notesSequence.push({ note, freq: getNoteFrequency(note, currentOctave) });
  });

  notesSequence.push({ note: rootNote, freq: getNoteFrequency(rootNote, startOctave + 1) });

  notesSequence.forEach((item, idx) => {
    setTimeout(() => {
      playTone(item.freq, 0.45);
    }, idx * 250);
  });
}

// DOM ELEMENTS
const btnLangToggle = document.getElementById('btn-lang-toggle');
const currentLangLabel = document.getElementById('current-lang-label');

const selectRoot = document.getElementById('select-root');
const selectFamily = document.getElementById('select-family');
const selectMode = document.getElementById('select-mode');
const selectStrings = document.getElementById('select-strings');
const selectDisplayMode = document.getElementById('select-display-mode');

const tuningContainer = document.getElementById('tuning-inputs-container');
const btnPresetStd = document.getElementById('btn-preset-std');
const btnPresetDropD = document.getElementById('btn-preset-dropd');

const scaleDisplayTitle = document.getElementById('scale-display-title');
const scaleFamilyBadge = document.getElementById('scale-family-badge');
const scaleStepFormulaText = document.getElementById('scale-step-formula-text');
const scaleStepFormulaNumbers = document.getElementById('scale-step-formula-numbers');
const scaleDegreeFormula = document.getElementById('scale-degree-formula');
const scaleNotesList = document.getElementById('scale-notes-list');
const scaleChordsContainer = document.getElementById('scale-chords-container');
const scaleDescription = document.getElementById('scale-description');

const btnPlayScale = document.getElementById('btn-play-scale');
const btnPlayScaleTop = document.getElementById('btn-play-scale-top');
const inputSpeed = document.getElementById('input-speed');

const fretboardEl = document.getElementById('fretboard');

const matrixHeaderRow = document.getElementById('matrix-header-row');
const matrixBodyRows = document.getElementById('matrix-body-rows');
const wikiGridContainer = document.getElementById('wiki-grid-container');

// INITIALIZATION
function initApp() {
  applyLanguageToDOM();

  selectRoot.innerHTML = NOTES.map(n => `<option value="${n}">${n}</option>`).join('');
  selectRoot.value = state.currentRoot;

  updateFamilySelector();
  updateModeSelector();

  selectStrings.value = state.stringCount;
  selectDisplayMode.value = state.displayMode;
  inputSpeed.value = 700 - state.playbackSpeed;

  // EVENT LISTENERS
  btnLangToggle.addEventListener('click', () => {
    state.lang = (state.lang === 'en') ? 'es' : 'en';
    saveState();
    applyLanguageToDOM();
    updateFamilySelector();
    updateModeSelector();
    updateUI();
  });

  selectRoot.addEventListener('change', (e) => {
    state.currentRoot = e.target.value;
    saveState();
    updateUI();
  });

  selectFamily.addEventListener('change', (e) => {
    state.currentFamilyKey = e.target.value;
    state.currentModeIndex = 0;
    saveState();
    updateModeSelector();
    updateUI();
  });

  selectMode.addEventListener('change', (e) => {
    state.currentModeIndex = parseInt(e.target.value, 10);
    saveState();
    updateUI();
  });

  selectStrings.addEventListener('change', (e) => {
    const num = parseInt(e.target.value, 10);
    state.stringCount = num;
    state.currentTuning = JSON.parse(JSON.stringify(DEFAULT_TUNINGS[num]));
    saveState();
    renderTuningControls();
    updateUI();
  });

  selectDisplayMode.addEventListener('change', (e) => {
    state.displayMode = e.target.value;
    saveState();
    renderFretboard();
  });

  inputSpeed.addEventListener('input', (e) => {
    const sliderVal = parseInt(e.target.value, 10);
    state.playbackSpeed = 700 - sliderVal;
    saveState();
  });

  btnPresetStd.addEventListener('click', () => {
    state.currentTuning = JSON.parse(JSON.stringify(DEFAULT_TUNINGS[state.stringCount]));
    saveState();
    renderTuningControls();
    renderFretboard();
  });

  btnPresetDropD.addEventListener('click', () => {
    const std = JSON.parse(JSON.stringify(DEFAULT_TUNINGS[state.stringCount]));
    const lowestString = std[std.length - 1];
    const idx = NOTES.indexOf(normalizeNote(lowestString.note));
    if (idx !== -1) {
      let newIdx = (idx - 2 + 12) % 12;
      lowestString.note = NOTES[newIdx];
      if (idx < 2) lowestString.octave -= 1;
    }
    state.currentTuning = std;
    saveState();
    renderTuningControls();
    renderFretboard();
  });

  btnPlayScale.addEventListener('click', playScaleAudio);
  if (btnPlayScaleTop) {
    btnPlayScaleTop.addEventListener('click', playScaleAudio);
  }

  renderTuningControls();
  updateUI();
}

function updateFamilySelector() {
  selectFamily.innerHTML = Object.keys(SCALE_FAMILIES).map(key => {
    const name = SCALE_FAMILIES[key].name[state.lang] || SCALE_FAMILIES[key].name.en;
    return `<option value="${key}">${name}</option>`;
  }).join('');
  selectFamily.value = state.currentFamilyKey;
}

function updateModeSelector() {
  const family = SCALE_FAMILIES[state.currentFamilyKey] || SCALE_FAMILIES.diatonic;
  selectMode.innerHTML = family.modes.map((mode, idx) => {
    const mName = typeof mode.name === 'object' ? (mode.name[state.lang] || mode.name.en) : mode.name;
    return `<option value="${idx}">${mName}</option>`;
  }).join('');
  selectMode.value = state.currentModeIndex;
}

function applyLanguageToDOM() {
  const t = UI_TEXTS[state.lang] || UI_TEXTS.en;

  currentLangLabel.textContent = t.langLabel;
  document.getElementById('ui-header-title').textContent = t.title;
  document.getElementById('ui-header-subtitle').textContent = t.subtitle;
  document.getElementById('nav-wiki-link').textContent = t.navWiki;
  document.getElementById('nav-tool-link').textContent = t.navTool;
  document.getElementById('nav-privacy-link').textContent = t.navPrivacy;
  document.getElementById('nav-contact-link').textContent = t.navContact;

  document.getElementById('ui-ad-label-1').textContent = t.adLabel;
  document.getElementById('ui-ad-label-2').textContent = t.adLabel;
  document.getElementById('ui-ad-label-3').textContent = t.adLabel;

  document.getElementById('wiki-main-title').textContent = t.wikiMainTitle;
  document.getElementById('wiki-main-desc').textContent = t.wikiMainDesc;
  document.getElementById('wiki-badge-label').textContent = t.wikiBadge;

  document.getElementById('th-guide-title').textContent = t.thGuideTitle;
  document.getElementById('th-guide-intro').textContent = t.thGuideIntro;
  document.getElementById('th-col1-title').textContent = t.thCol1Title;
  document.getElementById('th-col1-desc').textContent = t.thCol1Desc;
  document.getElementById('th-col2-title').textContent = t.thCol2Title;
  document.getElementById('th-col2-desc').textContent = t.thCol2Desc;
  document.getElementById('th-col3-title').textContent = t.thCol3Title;
  document.getElementById('th-col3-desc').textContent = t.thCol3Desc;

  document.getElementById('tool-main-title').textContent = t.toolMainTitle;
  document.getElementById('tool-main-subtitle').textContent = t.toolMainSubtitle;

  document.getElementById('lbl-root').textContent = t.lblRoot;
  document.getElementById('lbl-family').textContent = t.lblFamily;
  document.getElementById('lbl-mode').textContent = t.lblMode;
  document.getElementById('lbl-strings').textContent = t.lblStrings;
  document.getElementById('lbl-display').textContent = t.lblDisplay;

  document.getElementById('opt-disp-interval').textContent = t.optDispInterval;
  document.getElementById('opt-disp-note').textContent = t.optDispNote;
  document.getElementById('opt-disp-both').textContent = t.optDispBoth;

  document.getElementById('ui-fretboard-title').textContent = t.fretboardTitle;
  document.getElementById('lbl-leg-root').textContent = t.lblLegRoot;
  document.getElementById('lbl-leg-scale').textContent = t.lblLegScale;

  document.getElementById('ui-tuning-title').textContent = t.tuningTitle;
  document.getElementById('lbl-presets').textContent = t.lblPresets;

  btnPlayScale.textContent = t.btnPlayScale;
  if (btnPlayScaleTop) btnPlayScaleTop.textContent = t.btnPlayScale;
  document.getElementById('lbl-speed-title').textContent = t.lblSpeedTitle;
  document.getElementById('lbl-step-formula-title').textContent = t.lblStepFormulaTitle;
  document.getElementById('lbl-degree-formula-title').textContent = t.lblDegreeFormulaTitle;
  document.getElementById('lbl-notes-list-title').textContent = t.lblNotesListTitle;
  document.getElementById('lbl-chords-title').textContent = t.lblChordsTitle;
  document.getElementById('lbl-desc-title').textContent = t.lblDescTitle;

  document.getElementById('ui-matrix-title').textContent = t.matrixTitle;
  document.getElementById('ui-matrix-subtitle').textContent = t.matrixSubtitle;

  document.getElementById('ui-footer-copy').textContent = t.footerCopy;

  renderWikiCards();
}

// RENDER WIKI ENCYCLOPEDIA CARDS WITH INLINED TRANSFORMATIONS & AUDIO BUTTON
function renderWikiCards() {
  const t = UI_TEXTS[state.lang] || UI_TEXTS.en;
  wikiGridContainer.innerHTML = '';

  Object.keys(SCALE_FAMILIES).forEach((fKey) => {
    const family = SCALE_FAMILIES[fKey];
    const card = document.createElement('article');
    card.className = 'wiki-card';

    const fName = family.name[state.lang] || family.name.en;
    const fAbout = family.about ? (family.about[state.lang] || family.about.en) : '';

    // INLINED TRANSFORMATION STEP IF AVAILABLE
    let transHTML = '';
    if (family.transformation) {
      const tr = family.transformation[state.lang] || family.transformation.en;
      transHTML = `
        <div class="transformation-block">
          <h5>${t.transTitle}</h5>
          <div class="trans-3step-card">
            <div class="trans-line-base">${tr.base}</div>
            <div class="trans-line-arrow">${tr.arrow}</div>
            <div class="trans-line-result">${tr.res}</div>
          </div>
        </div>
      `;
    }

    // CHORDS SLABS
    let chordsHTML = '';
    if (family.chords) {
      chordsHTML = `
        <div class="wiki-chords-box">
          <div class="wiki-chords-header">
            <span>🎼 ${state.lang === 'es' ? 'Acordes Harmonizados (Desliza ➔)' : 'Harmonized Degree Chords (Scroll ➔)'}</span>
            <span class="scroll-hint">${t.scrollHint}</span>
          </div>
          <div class="wiki-chords-scroll">
            ${family.chords.map(ch => `
              <div class="chord-slab">
                <span class="c-deg">${ch.deg}</span>
                <span class="c-triad">${ch.triad}</span>
                <span class="c-tetrad">${ch.tetrad}</span>
                <span class="c-formula">${ch.formula}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // PENTATONIC MODAL FITS & BLUE NOTE MINI SECTION
    let fitsHTML = '';
    if (family.fits) {
      const fitItems = family.fits[state.lang] || family.fits.en;
      const blueNote = family.blueNoteDetail ? (family.blueNoteDetail[state.lang] || family.blueNoteDetail.en) : '';
      fitsHTML = `
        <div class="pentatonic-fits-grid">
          ${fitItems.map(fit => `
            <div class="fit-box">
              <h5>${fit.title}</h5>
              <ul>
                ${fit.list.map(li => `<li>${li}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        ${blueNote ? `<div class="blue-note-box"><h5>${blueNote}</h5></div>` : ''}
      `;
    }

    // TRANSPOSED MODES TABLE WITH GENRE COLUMN
    const tableHTML = `
      <div class="wiki-modes-table-container">
        <table class="wiki-modes-table">
          <thead>
            <tr>
              <th>${t.tableHeaderMode}</th>
              <th>${t.tableHeaderCode}</th>
              <th>${t.tableHeaderSteps}</th>
              <th>${t.tableHeaderGenre}</th>
              <th>${t.tableHeaderDesc}</th>
            </tr>
          </thead>
          <tbody>
            ${family.modes.map(m => {
              const mName = typeof m.name === 'object' ? (m.name[state.lang] || m.name.en) : m.name;
              const mGenre = m.genre ? (m.genre[state.lang] || m.genre.en) : '-';
              const mDesc = typeof m.desc === 'object' ? (m.desc[state.lang] || m.desc.en) : m.desc;
              const mSteps = m.steps.join('-');
              return `
                <tr>
                  <td class="col-mode-name">${mName}</td>
                  <td class="col-code">${m.code || ''}</td>
                  <td class="col-steps">${mSteps}</td>
                  <td class="col-genre">${mGenre}</td>
                  <td class="col-desc">${mDesc}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    card.innerHTML = `
      <div class="wiki-card-title-row">
        <h3>
          ${fName}
          <button class="btn btn-sm btn-primary btn-play-family-wiki" data-family="${fKey}">▶ ${state.lang === 'es' ? 'Escuchar (C)' : 'Play Scale (C)'}</button>
        </h3>
      </div>
      <div class="wiki-section-detail">
        <h4>💡 ${state.lang === 'es' ? 'Acerca de, Orígenes e Historia:' : 'About, History & Context:'}</h4>
        <p>${fAbout}</p>
      </div>
      ${transHTML}
      ${chordsHTML}
      ${fitsHTML}
      ${tableHTML}
    `;

    // Event listener for Play Scale in Wiki Card
    const playBtn = card.querySelector('.btn-play-family-wiki');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        playWikiFamilyAudio(fKey);
      });
    }

    wikiGridContainer.appendChild(card);
  });
}

// TUNING CONTROLS
function renderTuningControls() {
  tuningContainer.innerHTML = '';
  state.currentTuning.forEach((st, idx) => {
    const div = document.createElement('div');
    div.className = 'tuning-string-item';

    const label = document.createElement('span');
    label.textContent = `${state.lang === 'es' ? 'Cuerda' : 'String'} ${idx + 1}:`;

    const selectNote = document.createElement('select');
    selectNote.className = 'tuning-select';
    selectNote.innerHTML = NOTES.map(n => `<option value="${n}" ${n === st.note ? 'selected' : ''}>${n}</option>`).join('');

    const selectOctave = document.createElement('select');
    selectOctave.className = 'tuning-select';
    [0, 1, 2, 3, 4, 5].forEach(oct => {
      const opt = document.createElement('option');
      opt.value = oct;
      opt.textContent = oct;
      if (oct === st.octave) opt.selected = true;
      selectOctave.appendChild(opt);
    });

    selectNote.addEventListener('change', (e) => {
      st.note = e.target.value;
      saveState();
      renderFretboard();
    });

    selectOctave.addEventListener('change', (e) => {
      st.octave = parseInt(e.target.value, 10);
      saveState();
      renderFretboard();
    });

    div.appendChild(label);
    div.appendChild(selectNote);
    div.appendChild(selectOctave);
    tuningContainer.appendChild(div);
  });
}

// CÁLCULO DE LA ESCALA Y HARMONIZACIÓN
function getSelectedScaleData() {
  const family = SCALE_FAMILIES[state.currentFamilyKey] || SCALE_FAMILIES.diatonic;
  const mode = family.modes[state.currentModeIndex] || family.modes[0];
  const rootIndex = NOTES.indexOf(normalizeNote(state.currentRoot));

  const scaleNotes = [];
  let currIndex = rootIndex;
  scaleNotes.push(NOTES[currIndex]);

  for (let i = 0; i < mode.steps.length - 1; i++) {
    currIndex = (currIndex + mode.steps[i]) % 12;
    scaleNotes.push(NOTES[currIndex]);
  }

  const harmonizedChords = scaleNotes.map((rootNote, idx) => {
    const len = scaleNotes.length;

    const note1 = rootNote;
    const note3 = scaleNotes[(idx + 2) % len];
    const note5 = scaleNotes[(idx + 4) % len];
    const note7 = scaleNotes[(idx + 6) % len];

    const idx1 = NOTES.indexOf(normalizeNote(note1));
    const idx3 = NOTES.indexOf(normalizeNote(note3));
    const idx5 = NOTES.indexOf(normalizeNote(note5));
    const idx7 = NOTES.indexOf(normalizeNote(note7));

    const semitonesTo3 = (idx3 - idx1 + 12) % 12;
    const semitonesTo5 = (idx5 - idx1 + 12) % 12;
    const semitonesTo7 = (idx7 - idx1 + 12) % 12;

    const semitonesA = semitonesTo3;
    const semitonesB = (semitonesTo5 - semitonesTo3 + 12) % 12;

    let symbol = '';
    let deg3Text = semitonesTo3 === 4 ? '3' : (semitonesTo3 === 3 ? '♭3' : (semitonesTo3 === 2 ? '2' : '4'));
    let deg5Text = semitonesTo5 === 7 ? '5' : (semitonesTo5 === 6 ? '♭5' : (semitonesTo5 === 8 ? '♯5' : '5'));
    let deg7Text = semitonesTo7 === 11 ? '7' : (semitonesTo7 === 10 ? '♭7' : (semitonesTo7 === 9 ? '♭♭7' : '7'));

    if (semitonesTo3 === 4 && semitonesTo5 === 7) symbol = '';
    else if (semitonesTo3 === 3 && semitonesTo5 === 7) symbol = 'm';
    else if (semitonesTo3 === 3 && semitonesTo5 === 6) symbol = 'dim (°)';
    else if (semitonesTo3 === 4 && semitonesTo5 === 8) symbol = 'aug (+)';
    else symbol = 'm';

    let seventhSuffix = '';
    if (semitonesTo7 === 11) seventhSuffix = 'maj7';
    else if (semitonesTo7 === 10) seventhSuffix = '7';
    else if (semitonesTo7 === 9) seventhSuffix = 'dim7';

    return {
      degreeLabel: mode.degrees[idx] || `${state.lang === 'es' ? 'Grado' : 'Degree'} ${idx + 1}`,
      rootNote,
      triadName: `${rootNote}${symbol}`,
      tetradName: `${rootNote}${symbol}${seventhSuffix}`,
      triadNotes: `${note1} - ${note3} - ${note5}`,
      tetradNotes: `${note1} - ${note3} - ${note5} - ${note7}`,
      triadIntervals: `1 - ${deg3Text} - ${deg5Text}`,
      tetradIntervals: `1 - ${deg3Text} - ${deg5Text} - ${deg7Text}`,
      semitoneFormula: `${state.lang === 'es' ? 'Raíz' : 'Root'} + ${semitonesA} + ${semitonesB}`
    };
  });

  return { family, mode, rootNote: state.currentRoot, scaleNotes, harmonizedChords };
}

// UPDATE GLOBAL UI
function updateUI() {
  const scaleData = getSelectedScaleData();
  const mName = typeof scaleData.mode.name === 'object' ? (scaleData.mode.name[state.lang] || scaleData.mode.name.en) : scaleData.mode.name;
  const fName = typeof scaleData.family.name === 'object' ? (scaleData.family.name[state.lang] || scaleData.family.name.en) : scaleData.family.name;
  const mDesc = typeof scaleData.mode.desc === 'object' ? (scaleData.mode.desc[state.lang] || scaleData.mode.desc.en) : scaleData.mode.desc;

  scaleDisplayTitle.textContent = `${scaleData.rootNote} - ${mName}`;
  scaleFamilyBadge.textContent = fName;

  const stepsText = scaleData.mode.steps.map(s => (s === 1 ? 'S' : (s === 2 ? 'T' : `${s}S`))).join('-');
  const stepsNumbers = scaleData.mode.steps.join('-');

  scaleStepFormulaText.textContent = stepsText;
  scaleStepFormulaNumbers.textContent = stepsNumbers;

  scaleDegreeFormula.innerHTML = scaleData.mode.degrees.map((deg, idx) => `
    <span class="chip ${idx === 0 ? 'chip-root' : ''}">${deg}</span>
  `).join('');

  scaleNotesList.innerHTML = scaleData.scaleNotes.map((note, idx) => `
    <span class="chip ${idx === 0 ? 'chip-root' : ''}">${note}</span>
  `).join('');

  scaleChordsContainer.innerHTML = scaleData.harmonizedChords.map(ch => `
    <div class="chord-degree-card">
      <div class="chord-degree-num">${ch.degreeLabel}</div>
      <div class="chord-name-main">${ch.triadName}</div>
      <div class="chord-notes-span">${ch.triadNotes}</div>
      <div class="chord-intervals-span">(${ch.triadIntervals})</div>
      <div class="chord-semitones-span">${ch.semitoneFormula}</div>
    </div>
  `).join('');

  scaleDescription.textContent = mDesc;

  renderFretboard();
  renderRelativityMatrix();
}

// RENDERING FRETBOARD WITH NUT FIX & OPEN STRING PITCH CORRECTION
function renderFretboard() {
  fretboardEl.innerHTML = '';
  const scaleData = getSelectedScaleData();

  const numbersRow = document.createElement('div');
  numbersRow.className = 'fret-numbers-row';

  // Label for String Tuning Column
  const stringHeadCell = document.createElement('div');
  stringHeadCell.className = 'fret-number-cell';
  stringHeadCell.textContent = state.lang === 'es' ? 'Afin.' : 'Tuning';
  numbersRow.appendChild(stringHeadCell);

  // Fret 0 (Open Strings) Header with Nut Border between Fret 0 and Fret 1
  const openFretHeadCell = document.createElement('div');
  openFretHeadCell.className = 'fret-number-cell fret-open-header';
  openFretHeadCell.textContent = '0 (Open)';
  numbersRow.appendChild(openFretHeadCell);

  const singleMarkers = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleMarkers = [12, 24];

  for (let fret = 1; fret <= 24; fret++) {
    const cell = document.createElement('div');
    cell.className = 'fret-number-cell';
    if (singleMarkers.includes(fret) || doubleMarkers.includes(fret)) {
      cell.classList.add('has-marker');
    }
    cell.textContent = fret;
    numbersRow.appendChild(cell);
  }
  fretboardEl.appendChild(numbersRow);

  state.currentTuning.forEach((stringConfig, stringIdx) => {
    const row = document.createElement('div');
    row.className = 'fret-string-row';
    row.style.setProperty('--string-thickness', `${stringConfig.thickness}px`);

    const labelCell = document.createElement('div');
    labelCell.className = 'string-label-cell';
    labelCell.textContent = `${stringConfig.note}${stringConfig.octave}`;
    row.appendChild(labelCell);

    const openNoteIndex = NOTES.indexOf(normalizeNote(stringConfig.note));

    // FRET 0: OPEN STRING CELL (TEXT LABEL WITHOUT CIRCLE BADGE BEHIND IT)
    const openCell = document.createElement('div');
    openCell.className = 'fret-note-cell fret-open-cell';

    const openNoteName = NOTES[openNoteIndex];
    const openFreq = getNoteFrequency(openNoteName, stringConfig.octave);
    const openScaleIdx = scaleData.scaleNotes.indexOf(openNoteName);

    if (openScaleIdx !== -1) {
      const isRoot = openScaleIdx === 0;
      const degText = scaleData.mode.degrees[openScaleIdx] || (openScaleIdx + 1);

      const openTextSpan = document.createElement('span');
      openTextSpan.className = `open-string-text-label ${isRoot ? 'is-root' : ''}`;

      if (state.displayMode === 'interval') {
        openTextSpan.textContent = degText;
      } else if (state.displayMode === 'note') {
        openTextSpan.textContent = openNoteName;
      } else {
        openTextSpan.textContent = `${openNoteName}(${degText})`;
      }

      openCell.appendChild(openTextSpan);
    }

    openCell.addEventListener('click', () => {
      playTone(openFreq, 0.7);
    });
    row.appendChild(openCell);

    // FRETS 1 TO 24 (AFTER THE PHYSICAL BONE NUT)
    for (let fret = 1; fret <= 24; fret++) {
      const fretCell = document.createElement('div');
      fretCell.className = 'fret-note-cell';

      if (stringIdx === Math.floor(state.currentTuning.length / 2) && singleMarkers.includes(fret)) {
        const marker = document.createElement('div');
        marker.className = 'fret-marker-single';
        fretCell.appendChild(marker);
      }
      if (doubleMarkers.includes(fret) && (stringIdx === Math.floor(state.currentTuning.length / 3) || stringIdx === Math.floor(state.currentTuning.length * 2 / 3))) {
        const marker = document.createElement('div');
        marker.className = 'fret-marker-double';
        fretCell.appendChild(marker);
      }

      const noteIdx = (openNoteIndex + fret) % 12;
      const noteName = NOTES[noteIdx];
      const octaveOffset = Math.floor((openNoteIndex + fret) / 12);
      const fretOctave = stringConfig.octave + octaveOffset;
      const freq = getNoteFrequency(noteName, fretOctave);

      const scaleIdx = scaleData.scaleNotes.indexOf(noteName);
      if (scaleIdx !== -1) {
        const badge = document.createElement('div');
        const isRoot = scaleIdx === 0;
        const degreeText = scaleData.mode.degrees[scaleIdx] || (scaleIdx + 1);

        badge.className = `fret-note-badge ${isRoot ? 'note-root' : 'note-scale'}`;

        if (state.displayMode === 'interval') {
          badge.textContent = degreeText;
        } else if (state.displayMode === 'note') {
          badge.textContent = noteName;
        } else {
          badge.textContent = `${noteName}`;
          badge.title = `${noteName} (${degreeText})`;
        }

        badge.dataset.freq = freq;
        fretCell.appendChild(badge);
      }

      fretCell.addEventListener('click', () => {
        playTone(freq, 0.7);
        const badge = fretCell.querySelector('.fret-note-badge');
        if (badge) {
          badge.classList.add('playing');
          setTimeout(() => badge.classList.remove('playing'), 300);
        }
      });

      row.appendChild(fretCell);
    }

    fretboardEl.appendChild(row);
  });
}

// AUDIO PLAYSCALE FOR INTERACTIVE TOOL
function playScaleAudio() {
  const scaleData = getSelectedScaleData();
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = UI_TEXTS[state.lang] || UI_TEXTS.en;
  btnPlayScale.disabled = true;
  btnPlayScale.textContent = t.btnPlayingScale;

  if (btnPlayScaleTop) {
    btnPlayScaleTop.disabled = true;
    btnPlayScaleTop.textContent = t.btnPlayingScale;
  }

  const rootIndex = NOTES.indexOf(normalizeNote(state.currentRoot));
  const startOctave = 3;
  let currentOctave = startOctave;

  const notesSequence = [];
  let prevNoteIndex = rootIndex;

  scaleData.scaleNotes.forEach((note, idx) => {
    const idxInNotes = NOTES.indexOf(normalizeNote(note));
    if (idx > 0 && idxInNotes < prevNoteIndex) {
      currentOctave++;
    }
    prevNoteIndex = idxInNotes;
    notesSequence.push({ note, freq: getNoteFrequency(note, currentOctave) });
  });

  const finalRootNote = scaleData.scaleNotes[0];
  notesSequence.push({ note: finalRootNote, freq: getNoteFrequency(finalRootNote, startOctave + 1) });

  const intervalMs = state.playbackSpeed;

  notesSequence.forEach((item, idx) => {
    setTimeout(() => {
      playTone(item.freq, 0.5);

      const badges = fretboardEl.querySelectorAll('.fret-note-badge');
      badges.forEach(b => {
        if (Math.abs(parseFloat(b.dataset.freq) - item.freq) < 1) {
          b.classList.add('playing');
          setTimeout(() => b.classList.remove('playing'), intervalMs - 20);
        }
      });

      if (idx === notesSequence.length - 1) {
        setTimeout(() => {
          btnPlayScale.disabled = false;
          btnPlayScale.textContent = t.btnPlayScale;
          if (btnPlayScaleTop) {
            btnPlayScaleTop.disabled = false;
            btnPlayScaleTop.textContent = t.btnPlayScale;
          }
        }, intervalMs);
      }
    }, idx * intervalMs);
  });
}

// TRANSPOSED MODAL RELATIVITY MATRIX
function renderRelativityMatrix() {
  matrixHeaderRow.innerHTML = '';
  matrixBodyRows.innerHTML = '';

  const family = SCALE_FAMILIES[state.currentFamilyKey] || SCALE_FAMILIES.diatonic;

  // HEADERS: "Mode / Root", "0 (Root)", "1", "2", "3", "4", "5", "6", "7"...
  const thMode = document.createElement('th');
  thMode.textContent = `${state.lang === 'es' ? 'Modo / Tónica' : 'Mode / Root'}`;
  matrixHeaderRow.appendChild(thMode);

  family.modes.forEach((mode, mIdx) => {
    const th = document.createElement('th');
    const mName = typeof mode.name === 'object' ? (mode.name[state.lang] || mode.name.en) : mode.name;
    th.textContent = mIdx === 0 ? `0 (${state.lang === 'es' ? 'Raíz' : 'Root'})` : `${mIdx} (${mName.split('.')[1] || mName})`;
    matrixHeaderRow.appendChild(th);
  });

  // ROWS FOR EACH OF THE 12 CHROMATIC KEYS
  NOTES.forEach(root => {
    const tr = document.createElement('tr');
    const rootIndex = NOTES.indexOf(root);

    const tdKey = document.createElement('td');
    tdKey.style.fontWeight = '700';
    tdKey.style.color = '#a5b4fc';
    tdKey.textContent = `${root} ${state.lang === 'es' ? 'Tonalidad' : 'Key'}`;
    tr.appendChild(tdKey);

    family.modes.forEach((mode, mIdx) => {
      const td = document.createElement('td');

      let semitoneOffset = 0;
      for (let i = 0; i < mIdx; i++) {
        semitoneOffset += family.rootFormulaSteps[i];
      }

      const relativeNoteIndex = (rootIndex + semitoneOffset) % 12;
      const relativeNote = NOTES[relativeNoteIndex];

      td.textContent = relativeNote;

      if (root === state.currentRoot) {
        td.classList.add('highlight-root');
      }

      tr.appendChild(td);
    });

    matrixBodyRows.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', initApp);
