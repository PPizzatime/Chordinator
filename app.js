/**
 * App.js - Wiki & Explorador de Escalas, Modos y Mástil
 */

// --- BASE DE DATOS TEÓRICA Y DE ESCALAS ---

const NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

// Mapeo para enarmónicos
const ENHARMONICS = {
  'Db': 'C♯', 'Eb': 'D♯', 'Gb': 'F♯', 'Ab': 'G♯', 'Bb': 'A♯',
  'C#': 'C♯', 'D#': 'D♯', 'F#': 'F♯', 'G#': 'G♯', 'A#': 'A♯'
};

function normalizeNote(n) {
  const trimmed = n.trim();
  return ENHARMONICS[trimmed] || trimmed;
}

// Frecuencias base A4 = 440 Hz
function getNoteFrequency(noteName, octave = 4) {
  const noteIndex = NOTES.indexOf(normalizeNote(noteName));
  if (noteIndex === -1) return 440;
  const midiNote = (octave + 1) * 12 + noteIndex;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// Familias y sus Modos
const SCALE_FAMILIES = {
  diatonic: {
    name: 'Familia Diatónica (Escala Mayor)',
    rootFormulaSteps: [2, 2, 1, 2, 2, 2, 1],
    modes: [
      { id: 'ionian', name: '1. Jónico (Escala Mayor)', steps: [2, 2, 1, 2, 2, 2, 1], degrees: ['1', '2', '3', '4', '5', '6', '7'], desc: 'Alegre, estable, claro, resolutivo. Base de la armonía clásica y pop.' },
      { id: 'dorian', name: '2. Dórico', steps: [2, 1, 2, 2, 2, 1, 2], degrees: ['1', '2', '♭3', '4', '5', '6', '♭7'], desc: 'Menor elegante, sofisticado, melancólico con toque brillante por la 6ª mayor. Usado en Jazz, Funk, Blues y Rock (ej. Billie Jean).' },
      { id: 'phrygian', name: '3. Frigio', steps: [1, 2, 2, 2, 1, 2, 2], degrees: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'], desc: 'Oscuro, tenso, místico, con sabor flamenco, español o metal pesado por la ♭2.' },
      { id: 'lydian', name: '4. Lidio', steps: [2, 2, 2, 1, 2, 2, 1], degrees: ['1', '2', '3', '♯4', '5', '6', '7'], desc: 'Mágico, espacial, de ensueño, extremadamente brillante y futurista por la ♯4 (Cine Sci-Fi, Disney).' },
      { id: 'mixolydian', name: '5. Mixolidio', steps: [2, 2, 1, 2, 2, 1, 2], degrees: ['1', '2', '3', '4', '5', '6', '♭7'], desc: 'Festivo, blusero, rockero. Es una escala mayor desenfadada por la ♭7 (Classic Rock, Blues).' },
      { id: 'aeolian', name: '6. Eólico (Escala Menor Natural)', steps: [2, 1, 2, 2, 1, 2, 2], degrees: ['1', '2', '♭3', '4', '5', '♭6', '♭7'], desc: 'Triste, dramático, emotivo, serio. Base de baladas, rock y canciones épicas.' },
      { id: 'locrian', name: '7. Locrio', steps: [1, 2, 2, 1, 2, 2, 2], degrees: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'], desc: 'Extremadamente tenso e inestable. Carece de quinta justa (Metal Extremo, Jazz vanguardista).' }
    ]
  },
  harmonic_minor: {
    name: 'Familia Menor Armónica',
    rootFormulaSteps: [2, 1, 2, 2, 1, 3, 1],
    modes: [
      { id: 'hm_1', name: '1. Menor Armónica', steps: [2, 1, 2, 2, 1, 3, 1], degrees: ['1', '2', '♭3', '4', '5', '♭6', '7'], desc: 'Dramática, exótica, neoclásica y oscura. Salto característico de 3 semitonos (Yngwie Malmsteen).' },
      { id: 'hm_2', name: '2. Locrio ♮6 (Locrio 6)', steps: [1, 2, 2, 1, 3, 1, 2], degrees: ['1', '♭2', '♭3', '4', '♭5', '6', '♭7'], desc: 'Disminuido e inestable con tensión oriental por la 6ª mayor.' },
      { id: 'hm_3', name: '3. Jónico ♯5 (Jónico Aumentado)', steps: [2, 2, 1, 3, 1, 2, 1], degrees: ['1', '2', '3', '4', '♯5', '6', '7'], desc: 'Majestuoso pero suspendido y misterioso por la ♯5.' },
      { id: 'hm_4', name: '4. Dórico ♯4 (Dórico Ucraniano / Klezmer)', steps: [2, 1, 3, 1, 2, 1, 2], degrees: ['1', '2', '♭3', '♯4', '5', '6', '♭7'], desc: 'Sonido trágico, gitano, klezmer con ♯4 y ♭3.' },
      { id: 'hm_5', name: '5. Frigio Dominante (Flamenco / Mixo ♭9 ♭13)', steps: [1, 3, 1, 2, 1, 2, 2], degrees: ['1', '♭2', '3', '4', '5', '♭6', '♭7'], desc: 'Insignia del Flamenco, música Árabe, Egipcia y Heavy Metal. Enorme tensión dominante.' },
      { id: 'hm_6', name: '6. Lidio ♯2', steps: [3, 1, 2, 1, 2, 2, 1], degrees: ['1', '♯2', '3', '♯4', '5', '6', '7'], desc: 'Mágico, brillante con salto inicial de 3 semitonos.' },
      { id: 'hm_7', name: '7. Superlocrio ♭♭7 (Ultra Locrio)', steps: [1, 2, 1, 2, 2, 1, 3], degrees: ['1', '♭2', '♭3', '♭4', '♭5', '♭6', '♭♭7'], desc: 'Máxima tensión disminuida. Usada sobre acordes disminuidos 7.' }
    ]
  },
  melodic_minor: {
    name: 'Familia Menor Melódica (Jazz Minor)',
    rootFormulaSteps: [2, 1, 2, 2, 2, 2, 1],
    modes: [
      { id: 'mm_1', name: '1. Menor Melódica', steps: [2, 1, 2, 2, 2, 2, 1], degrees: ['1', '2', '♭3', '4', '5', '6', '7'], desc: 'Híbrida: inicio menor y final mayor. Elegante, sofisticada, clave en el Jazz Moderno.' },
      { id: 'mm_2', name: '2. Dórico ♭2 (Frigio ♮6)', steps: [1, 2, 2, 2, 2, 1, 2], degrees: ['1', '♭2', '♭3', '4', '5', '6', '♭7'], desc: 'Frigio brillante y sofisticado con sexta mayor. Sonido Jazz Fusion.' },
      { id: 'mm_3', name: '3. Lidio Aumentado (Lidio ♯5)', steps: [2, 2, 2, 2, 1, 2, 1], degrees: ['1', '2', '3', '♯4', '♯5', '6', '7'], desc: 'Flotante, espacial, expansivo sobre acordes 7♯5.' },
      { id: 'mm_4', name: '4. Lidio Dominante (Lidio ♭7 / Acústico)', steps: [2, 2, 2, 1, 2, 1, 2], degrees: ['1', '2', '3', '♯4', '5', '6', '♭7'], desc: 'Animado, espacial y moderno. Usado para acordes 7(♯11) y caricaturas retro.' },
      { id: 'mm_5', name: '5. Mixolidio ♭6 (Hindú)', steps: [2, 2, 1, 2, 1, 2, 2], degrees: ['1', '2', '3', '4', '5', '♭6', '♭7'], desc: 'Nostálgico pero mayor. Tensión melódica resuelve cálidamente.' },
      { id: 'mm_6', name: '6. Locrio ♮2 (Eólico ♭5 / Semidisminuido)', steps: [2, 1, 2, 1, 2, 2, 2], degrees: ['1', '2', '♭3', '4', '♭5', '♭6', '♭7'], desc: 'Ideal para improvisar sobre acordes m7(♭5) en Jazz.' },
      { id: 'mm_7', name: '7. Alterado (Superlocrio)', steps: [1, 2, 1, 2, 2, 2, 2], degrees: ['1', '♭2', '♭3', '♭4', '♭5', '♭6', '♭7'], desc: 'Máxima tensión. Utilizado sobre acordes dominantes alterados antes de resolver.' }
    ]
  },
  harmonic_major: {
    name: 'Familia Armónica Mayor',
    rootFormulaSteps: [2, 2, 1, 2, 1, 3, 1],
    modes: [
      { id: 'hmaj_1', name: '1. Armónica Mayor', steps: [2, 2, 1, 2, 1, 3, 1], degrees: ['1', '2', '3', '4', '5', '♭6', '7'], desc: 'Escala mayor con sexto grado bemol. Exótica con tensión de 3 semitonos.' },
      { id: 'hmaj_2', name: '2. Dórico ♭5', steps: [2, 1, 2, 1, 3, 1, 2], degrees: ['1', '2', '♭3', '4', '♭5', '6', '♭7'], desc: 'Menor con quinta disminuida y salto oriental.' },
      { id: 'hmaj_3', name: '3. Frigio ♭4', steps: [1, 2, 1, 3, 1, 2, 2], degrees: ['1', '♭2', '♭3', '♭4', '5', '♭6', '♭7'], desc: 'Tenso y misterioso con cuarta disminuida.' },
      { id: 'hmaj_4', name: '4. Lidio ♭3 (Lidio Menor)', steps: [2, 1, 3, 1, 2, 2, 1], degrees: ['1', '2', '♭3', '♯4', '5', '6', '7'], desc: 'Lidio dramático con tercera menor.' },
      { id: 'hmaj_5', name: '5. Mixolidio ♭2 (Mixo-Frigio)', steps: [1, 3, 1, 2, 2, 1, 2], degrees: ['1', '♭2', '3', '4', '5', '6', '♭7'], desc: 'Dominante exótico con segunda bemol.' },
      { id: 'hmaj_6', name: '6. Lidio ♯5 ♯2', steps: [3, 1, 2, 2, 1, 2, 1], degrees: ['1', '♯2', '3', '♯4', '♯5', '6', '7'], desc: 'Muy disonante y expansivo.' },
      { id: 'hmaj_7', name: '7. Locrio ♭♭7', steps: [1, 2, 2, 1, 2, 1, 3], degrees: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭♭7'], desc: 'Tenso, especial para arpegios disminuidos.' }
    ]
  },
  pentatonic_and_blues: {
    name: 'Pentatónicas y Blues',
    rootFormulaSteps: [3, 2, 2, 3, 2],
    modes: [
      { id: 'p_maj', name: 'Pentatónica Mayor (5 notas)', steps: [2, 2, 3, 2, 3], degrees: ['1', '2', '3', '5', '6'], desc: 'Consonante, universal, folclórica. Sin semitonos, nunca choca.' },
      { id: 'p_min', name: 'Pentatónica Menor (5 notas)', steps: [3, 2, 2, 3, 2], degrees: ['1', '♭3', '4', '5', '♭7'], desc: 'Piedra angular del Rock, Blues, Pop y Metal.' },
      { id: 'p_blues', name: 'Escala de Blues (6 notas)', steps: [3, 2, 1, 1, 3, 2], degrees: ['1', '♭3', '4', '♭5', '5', '♭7'], desc: 'Agrega la "Blue Note" (♭5) a la pentatónica menor. Tensión rasgada inconfundible.' }
    ]
  },
  symmetric: {
    name: 'Escalas Simétricas / Sintéticas',
    rootFormulaSteps: [2, 2, 2, 2, 2, 2],
    modes: [
      { id: 'sym_wt', name: 'Escala de Tonos Completos (Whole Tone - 6 notas)', steps: [2, 2, 2, 2, 2, 2], degrees: ['1', '2', '3', '♯4', '♯5', '♭7'], desc: 'Divide la octava en 6 tonos exactos. Suena flotante, mágica, a sueño o hipnosis (Debussy).' },
      { id: 'sym_dim_4', name: 'Fórmula 3-3-3-3 (Arpegio Disminuido 7ª - 4 notas)', steps: [3, 3, 3, 3], degrees: ['1', '♭3', '♭5', '♭♭7'], desc: 'Simetría pura de 4 terceras menores. Muestra las 4 notas pilar del acorde disminuido 7º.' },
      { id: 'sym_oct_ts', name: 'Octatónica Disminuida (Tono-Semitono - 8 notas)', steps: [2, 1, 2, 1, 2, 1, 2, 1], degrees: ['1', '2', '♭3', '4', '♭5', '♭6', '6', '7'], desc: 'Alterna Tono y Semitono. Tensión en Jazz y películas de misterio/terror.' },
      { id: 'sym_oct_st', name: 'Octatónica Disminuida (Semitono-Tono - 8 notas)', steps: [1, 2, 1, 2, 1, 2, 1, 2], degrees: ['1', '♭2', '♭3', '3', '♯4', '5', '6', '♭7'], desc: 'Alterna Semitono y Tono. Muy usada sobre acordes dominantes.' },
      { id: 'sym_double_harm', name: 'Doble Armónica (Bizantina / Flamenca Mayor - 7 notas)', steps: [1, 3, 1, 2, 1, 3, 1], degrees: ['1', '♭2', '3', '4', '5', '♭6', '7'], desc: 'Doble salto de 3 semitonos. Profundamente mística, oriental y tradicional del Medio Oriente.' }
    ]
  }
};

// Default tunings para 6, 7, 8, 9 cuerdas
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

// ESTADO DE LA APLICACIÓN
const state = {
  currentRoot: 'C',
  currentFamilyKey: 'diatonic',
  currentModeIndex: 0,
  stringCount: 6,
  displayMode: 'interval',
  playbackSpeed: 280,
  currentTuning: JSON.parse(JSON.stringify(DEFAULT_TUNINGS[6]))
};

// AUDIO CONTEXT CON ONDA TRIANGULAR
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

// Reproducción con ONDA TRIANGULAR para máxima claridad tímbrica
function playTone(freq, duration = 0.6) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle'; // Onda triangular rica en armónicos impares
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  // Envolvente de volumen clara y audible
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// --- DOM ELEMENTS ---
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
const scaleDescription = document.getElementById('scale-description');

const btnPlayScale = document.getElementById('btn-play-scale');
const inputSpeed = document.getElementById('input-speed');

const fretboardEl = document.getElementById('fretboard');

const matrixHeaderRow = document.getElementById('matrix-header-row');
const matrixBodyRows = document.getElementById('matrix-body-rows');

// --- INICIALIZACIÓN DE LA INTERFAZ ---

function initApp() {
  selectRoot.innerHTML = NOTES.map(n => `<option value="${n}">${n}</option>`).join('');
  selectRoot.value = state.currentRoot;

  selectFamily.innerHTML = Object.keys(SCALE_FAMILIES).map(key => {
    return `<option value="${key}">${SCALE_FAMILIES[key].name}</option>`;
  }).join('');
  selectFamily.value = state.currentFamilyKey;

  updateModeSelector();

  selectRoot.addEventListener('change', (e) => {
    state.currentRoot = e.target.value;
    updateUI();
  });

  selectFamily.addEventListener('change', (e) => {
    state.currentFamilyKey = e.target.value;
    state.currentModeIndex = 0;
    updateModeSelector();
    updateUI();
  });

  selectMode.addEventListener('change', (e) => {
    state.currentModeIndex = parseInt(e.target.value, 10);
    updateUI();
  });

  selectStrings.addEventListener('change', (e) => {
    const num = parseInt(e.target.value, 10);
    state.stringCount = num;
    state.currentTuning = JSON.parse(JSON.stringify(DEFAULT_TUNINGS[num]));
    renderTuningControls();
    updateUI();
  });

  selectDisplayMode.addEventListener('change', (e) => {
    state.displayMode = e.target.value;
    renderFretboard();
  });

  inputSpeed.addEventListener('input', (e) => {
    state.playbackSpeed = parseInt(e.target.value, 10);
  });

  btnPresetStd.addEventListener('click', () => {
    state.currentTuning = JSON.parse(JSON.stringify(DEFAULT_TUNINGS[state.stringCount]));
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
    renderTuningControls();
    renderFretboard();
  });

  btnPlayScale.addEventListener('click', playScaleAudio);

  renderTuningControls();
  updateUI();
}

function updateModeSelector() {
  const family = SCALE_FAMILIES[state.currentFamilyKey];
  selectMode.innerHTML = family.modes.map((mode, idx) => {
    return `<option value="${idx}">${mode.name}</option>`;
  }).join('');
  selectMode.value = state.currentModeIndex;
}

// --- RENDERING DE TUNING CONTROLS ---

function renderTuningControls() {
  tuningContainer.innerHTML = '';
  state.currentTuning.forEach((st, idx) => {
    const div = document.createElement('div');
    div.className = 'tuning-string-item';

    const label = document.createElement('span');
    label.textContent = `Cuerda ${idx + 1}:`;

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
      renderFretboard();
    });

    selectOctave.addEventListener('change', (e) => {
      st.octave = parseInt(e.target.value, 10);
      renderFretboard();
    });

    div.appendChild(label);
    div.appendChild(selectNote);
    div.appendChild(selectOctave);
    tuningContainer.appendChild(div);
  });
}

// --- CÁLCULO DE LA ESCALA SELECCIONADA ---

function getSelectedScaleData() {
  const family = SCALE_FAMILIES[state.currentFamilyKey];
  const mode = family.modes[state.currentModeIndex] || family.modes[0];
  const rootIndex = NOTES.indexOf(normalizeNote(state.currentRoot));

  const scaleNotes = [];
  let currIndex = rootIndex;
  scaleNotes.push(NOTES[currIndex]);

  for (let i = 0; i < mode.steps.length - 1; i++) {
    currIndex = (currIndex + mode.steps[i]) % 12;
    scaleNotes.push(NOTES[currIndex]);
  }

  return {
    family,
    mode,
    rootNote: state.currentRoot,
    scaleNotes
  };
}

// --- ACTUALIZACIÓN GLOBAL DE LA UI ---

function updateUI() {
  const scaleData = getSelectedScaleData();

  scaleDisplayTitle.textContent = `${scaleData.rootNote} - ${scaleData.mode.name}`;
  scaleFamilyBadge.textContent = scaleData.family.name;

  // Render de fórmula directa en texto (Renglo 1: T/S, Renglón 2: Números)
  const stepsText = scaleData.mode.steps.map(step => {
    if (step === 1) return 'S';
    if (step === 2) return 'T';
    return `${step}S`;
  }).join(' - ');

  const stepsNumbers = scaleData.mode.steps.join(' - ');

  scaleStepFormulaText.textContent = stepsText;
  scaleStepFormulaNumbers.textContent = stepsNumbers;

  // Grados
  scaleDegreeFormula.innerHTML = scaleData.mode.degrees.map((deg, idx) => {
    const isRoot = idx === 0;
    return `<span class="chip ${isRoot ? 'chip-root' : ''}">${deg}</span>`;
  }).join('');

  // Lista de Notas
  scaleNotesList.innerHTML = scaleData.scaleNotes.map((note, idx) => {
    const isRoot = idx === 0;
    return `<span class="chip ${isRoot ? 'chip-root' : ''}">${note}</span>`;
  }).join('');

  scaleDescription.textContent = scaleData.mode.desc;

  renderFretboard();
  renderRelativityMatrix();
}

// --- RENDERING DEL MÁSTIL DE GUITARRA ---

function renderFretboard() {
  fretboardEl.innerHTML = '';
  const scaleData = getSelectedScaleData();

  const numbersRow = document.createElement('div');
  numbersRow.className = 'fret-numbers-row';

  const emptyNutCell = document.createElement('div');
  emptyNutCell.className = 'fret-number-cell';
  emptyNutCell.textContent = 'Afin.';
  numbersRow.appendChild(emptyNutCell);

  const singleMarkers = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleMarkers = [12, 24];

  for (let fret = 0; fret <= 24; fret++) {
    const cell = document.createElement('div');
    cell.className = 'fret-number-cell';
    if (singleMarkers.includes(fret) || doubleMarkers.includes(fret)) {
      cell.classList.add('has-marker');
    }
    cell.textContent = fret === 0 ? '0 (Ab.)' : fret;
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

    for (let fret = 0; fret <= 24; fret++) {
      const fretCell = document.createElement('div');
      fretCell.className = 'fret-note-cell';

      if (stringIdx === Math.floor(state.currentTuning.length / 2)) {
        if (singleMarkers.includes(fret)) {
          const marker = document.createElement('div');
          marker.className = 'fret-marker-single';
          fretCell.appendChild(marker);
        }
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

// --- REPRODUCCIÓN AUDIO DE LA ESCALA ---

function playScaleAudio() {
  const scaleData = getSelectedScaleData();
  const ctx = getAudioContext();
  if (!ctx) return;

  btnPlayScale.disabled = true;
  btnPlayScale.textContent = '🔊 Reproduciendo...';

  const rootIndex = NOTES.indexOf(normalizeNote(state.currentRoot));
  let currentOctave = 3;

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

  notesSequence.push({ note: scaleData.scaleNotes[0], freq: getNoteFrequency(scaleData.scaleNotes[0], currentOctave + 1) });

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
          btnPlayScale.textContent = '▶ Reproducir Escala';
        }, intervalMs);
      }
    }, idx * intervalMs);
  });
}

// --- TABLA / MATRIZ DE RELATIVIDAD MODAL ---

function renderRelativityMatrix() {
  matrixHeaderRow.innerHTML = '';
  matrixBodyRows.innerHTML = '';

  const family = SCALE_FAMILIES[state.currentFamilyKey];

  const thRoot = document.createElement('th');
  thRoot.textContent = 'Tónica / Modo 1';
  matrixHeaderRow.appendChild(thRoot);

  family.modes.forEach((mode, idx) => {
    if (idx === 0) return;
    const th = document.createElement('th');
    th.textContent = mode.name;
    matrixHeaderRow.appendChild(th);
  });

  NOTES.forEach(root => {
    const tr = document.createElement('tr');
    const rootIndex = NOTES.indexOf(root);

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
