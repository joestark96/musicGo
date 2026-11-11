export interface TheoryTopic {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  readTime: string;
  summary: string;
  audioNote?: string;
  clef?: 'treble' | 'bass';
  staveNotes?: { note: string; duration?: 'quarter' }[];
  sections: {
    heading: string;
    content: string;
    highlightBox?: string;
    bulletPoints?: string[];
  }[];
}

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'el-pentagrama-y-claves',
    category: 'Fundamentos',
    title: 'El Pentagrama y las Claves Musicales',
    subtitle: 'La cuadrícula donde nace la música escrita',
    readTime: '4 min',
    summary: 'El pentagrama consta de cinco líneas horizontales paralelas y cuatro espacios entre ellas que se enumeran siempre de abajo hacia arriba.',
    clef: 'treble',
    staveNotes: [{ note: 'E4' }, { note: 'G4' }, { note: 'B4' }, { note: 'D5' }, { note: 'F5' }],
    sections: [
      {
        heading: '¿Qué es el Pentagrama?',
        content: 'La palabra proviene del griego penta (cinco) y gramma (escrito o línea). Es el soporte gráfico sobre el cual se escriben las notas y todos los signos musicales.',
        highlightBox: 'Regla de oro: Las líneas y espacios del pentagrama se cuentan SIEMPRE de abajo hacia arriba (Línea 1 es la inferior, Línea 5 es la superior).'
      },
      {
        heading: 'La Clave de Sol (𝄞)',
        content: 'La Clave de Sol se sitúa al principio del pentagrama y comienza su trazo en la 2ª línea. Esto define que cualquier nota que esté en la 2ª línea es la nota Sol (G4). A partir de allí, subiendo o bajando por líneas y espacios se determinan todas las demás notas.',
        bulletPoints: [
          'Líneas (abajo a arriba): Mi (1ª), Sol (2ª), Si (3ª), Re (4ª), Fa (5ª)',
          'Espacios (abajo a arriba): Fa (1º), La (2º), Do (3º), Mi (4º)',
          'Do Central (C4): Se coloca en una línea adicional debajo del pentagrama.'
        ]
      },
      {
        heading: 'La Clave de Fa (𝄢)',
        content: 'La Clave de Fa en 4ª línea ubica la nota Fa (F3) entre los dos puntos de su símbolo. Se utiliza para la mano izquierda en el piano, y para instrumentos de registro grave como el bajo, violonchelo, fagot o trombón.'
      }
    ]
  },
  {
    id: 'ritmo-y-metricas',
    category: 'Ritmo',
    title: 'Figuras de Duración, Silencios y Compases',
    subtitle: 'El tiempo, el pulso y la métrica',
    readTime: '5 min',
    summary: 'El ritmo organiza la duración del sonido y del silencio. Cada figura tiene un valor relativo matemático exacto.',
    sections: [
      {
        heading: 'El Árbol de Figuras Musicales',
        content: 'Cada figura dura exactamente la mitad que la figura superior y el doble que la figura inferior.',
        bulletPoints: [
          'Redonda (𝅝) = 4 tiempos (en 4/4)',
          'Blanca (𝅗𝅥) = 2 tiempos',
          'Negra (𝅘𝅥) = 1 tiempo (el pulso común)',
          'Corchea (𝅘𝅥𝅮) = 1/2 tiempo (dos corcheas completan 1 negra)',
          'Semicorchea (𝅘𝅥𝅯) = 1/4 tiempo (cuatro semicorcheas completan 1 negra)'
        ]
      },
      {
        heading: 'El Compás y la Cifra Indicadora',
        content: 'El compás divide el tiempo musical en partes iguales separadas por líneas divisorias. En 4/4:',
        highlightBox: 'El numerador (4) indica la cantidad de tiempos por compás. El denominador (4) indica qué figura vale 1 tiempo (el 4 representa a la negra).'
      }
    ]
  },
  {
    id: 'intervalos-y-escalas',
    category: 'Escalas',
    title: 'Intervalos y la Escala Mayor',
    subtitle: 'La fórmula que rige la tonalidad occidental',
    readTime: '6 min',
    summary: 'Un intervalo es la distancia entre dos alturas de sonido. La combinación ordenada de tonos y semitonos genera las diferentes escalas y modos.',
    sections: [
      {
        heading: '¿Qué es un Tono y un Semitono?',
        content: 'El semitono es la distancia más pequeña entre dos notas adyacentes en el sistema temperado occidental (ejemplo: de Do a Do#, o de Mi a Fa). Dos semitonos forman un Tono entero.',
        highlightBox: 'Recuerda: Entre Mi y Fa, y entre Si y Do, la distancia natural es de medio tono (semitono). ¡No hay tecla negra entre ellas!'
      },
      {
        heading: 'La Fórmula de la Escala Mayor',
        content: 'Cualquier escala mayor en el mundo se construye con este patrón interválico estricto:',
        bulletPoints: [
          'Tono - Tono - Semitono - Tono - Tono - Tono - Semitono (T-T-S-T-T-T-S)',
          'En Do Mayor: Do -(T)- Re -(T)- Mi -(S)- Fa -(T)- Sol -(T)- La -(T)- Si -(S)- Do',
          'Si comienzas en Sol: Sol, La, Si, Do, Re, Mi, Fa#, Sol (necesitas Fa# para mantener el semitono final)'
        ]
      }
    ]
  },
  {
    id: 'acordes-y-armonia',
    category: 'Armonía',
    title: 'Construcción de Acordes y Tríadas',
    subtitle: 'El cimiento armónico para acompañar canciones',
    readTime: '5 min',
    summary: 'Un acorde se crea cuando suenan 3 o más notas superpuestas por terceras.',
    sections: [
      {
        heading: 'Anatomía de una Tríada',
        content: 'Una tríada básica contiene tres notas:',
        bulletPoints: [
          '1. Fundamental (Raíz): Da el nombre al acorde (ej. Do)',
          '2. Tercera: Define si el acorde es Mayor (3ª mayor) o Menor (3ª menor)',
          '3. Quinta: Otorga estabilidad y cuerpo (generalmente 5ª justa)'
        ]
      },
      {
        heading: 'Acorde Mayor vs Menor',
        content: 'La Tercera Mayor consta de 4 semitonos (2 tonos). La Tercera Menor consta de 3 semitonos (1 tono y medio).',
        highlightBox: 'Do Mayor (C) = Do + Mi + Sol | Do Menor (Cm) = Do + Mi♭ + Sol'
      }
    ]
  },
  {
    id: 'composicion-progresiones',
    category: 'Composición',
    title: 'Secretos de Composición y Progresiones Populares',
    subtitle: 'Cómo encadenar acordes y escribir melodías memorables',
    readTime: '6 min',
    summary: 'Aprende cómo los compositores crean movimiento y emoción combinando grados tonales y curvas melódicas.',
    sections: [
      {
        heading: 'Los Grados Tonales (I, IV, V, vi)',
        content: 'En la música tonal, a cada nota de la escala se le asigna un número romano llamado grado:',
        bulletPoints: [
          'Grado I (Tónica): El hogar, descanso, resolución plena (ej. C)',
          'Grado IV (Subdominante): Salida, movimiento, emoción expansiva (ej. F)',
          'Grado V (Dominante): Tensión máxima, sensación de querer resolver a I (ej. G o G7)',
          'Grado vi (Relativa menor): Toque nostálgico o melancólico (ej. Am)'
        ]
      },
      {
        heading: 'La Progresión de los Cuatro Acordes (I - V - vi - IV)',
        content: 'Popularizada por Pachelbel, The Beatles, U2, Adele y cientos de bandas sonoras. En Do Mayor se toca: C → G → Am → F.',
        highlightBox: 'Consejo para componer: Una melodía fuerte combina movimientos por grado conjunto (paso a paso como Do-Re-Mi) con pequeños saltos expresivos (de Do a Sol) para llamar la atención.'
      }
    ]
  }
];
