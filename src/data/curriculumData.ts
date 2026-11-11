import { Unit } from '../types';

export const CURRICULUM: Unit[] = [
  // ==========================================
  // UNIDAD 1: EL PENTAGRAMA Y CLAVE DE SOL
  // ==========================================
  {
    id: 1,
    title: 'Unidad 1: El Pentagrama y las Notas Musicales',
    subtitle: 'Aprende las 7 notas naturales, el pentagrama y la Clave de Sol',
    description: 'Comienza tu viaje musical descubriendo cómo se escriben y suenan las notas en el pentagrama.',
    themeColor: '#58cc02', // duo-green
    nodes: [
      {
        id: 'u1_l1',
        unitId: 1,
        lessonNumber: 1,
        title: 'Las 7 Notas y la Escala Natural',
        subtitle: 'Do, Re, Mi, Fa, Sol, La, Si',
        description: 'Descubre los nombres y sonidos de las notas básicas y su cifrado.',
        icon: '🎵',
        color: 'green',
        totalSteps: 5,
        unlocked: true,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u1_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuántas notas musicales naturales existen en la escala diatónica occidental?',
            options: [
              { id: 'opt1', text: '5 notas' },
              { id: 'opt2', text: '7 notas' },
              { id: 'opt3', text: '12 notas' },
              { id: 'opt4', text: '8 notas' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'Las 7 notas naturales son Do, Re, Mi, Fa, Sol, La y Si. Al llegar a la siguiente Do se completa la octava.'
          },
          {
            id: 'u1_l1_ex2',
            type: 'order-notes',
            prompt: 'Ordena las notas de manera ascendente desde la más grave hasta la más aguda:',
            noteBank: ['Sol', 'Do', 'Mi', 'Si', 'Re', 'La', 'Fa'],
            correctSequence: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
            explanation: 'El orden ascendente tradicional es: Do → Re → Mi → Fa → Sol → La → Si.'
          },
          {
            id: 'u1_l1_ex3',
            type: 'match-pairs',
            prompt: 'Empareja la notación latina (Do-Re-Mi) con el cifrado anglosajón (C-D-E):',
            pairs: [
              { id: 'p1', left: 'Do', right: 'C' },
              { id: 'p2', left: 'Re', right: 'D' },
              { id: 'p3', left: 'Mi', right: 'E' },
              { id: 'p4', left: 'Sol', right: 'G' },
              { id: 'p5', left: 'La', right: 'A' }
            ],
            explanation: 'En el sistema anglosajón: A=La, B=Si, C=Do, D=Re, E=Mi, F=Fa, G=Sol.'
          },
          {
            id: 'u1_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Do (C4) en el teclado de piano:',
            promptSub: 'Es la tecla blanca situada inmediatamente a la izquierda del grupo de dos teclas negras.',
            targetPianoNote: 'C4',
            explanation: '¡Excelente! Do (C) siempre se encuentra inmediatamente a la izquierda del grupo de dos teclas negras.'
          },
          {
            id: 'u1_l1_ex5',
            type: 'listen-identify',
            prompt: 'Escucha este sonido. ¿Qué nota musical es?',
            audioNotes: ['C4'],
            options: [
              { id: 'opt1', text: 'Do (C4)', noteValue: 'C4' },
              { id: 'opt2', text: 'Sol (G4)', noteValue: 'G4' },
              { id: 'opt3', text: 'Mi (E4)', noteValue: 'E4' },
              { id: 'opt4', text: 'La (A4)', noteValue: 'A4' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado el Do central (C4, 261.6 Hz), la nota de referencia del piano.'
          }
        ]
      },
      {
        id: 'u1_l2',
        unitId: 1,
        lessonNumber: 2,
        title: 'Las 5 Líneas del Pentagrama',
        subtitle: 'Mi, Sol, Si, Re, Fa',
        description: 'Aprende a ubicar las notas que reposan sobre las cinco líneas.',
        icon: '🎼',
        color: 'green',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u1_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Por qué la Clave de Sol recibe ese nombre?',
            options: [
              { id: 'opt1', text: 'Porque se dibuja empezando en la 2ª línea, fijando allí la nota Sol' },
              { id: 'opt2', text: 'Porque representa la luz del sol' },
              { id: 'opt3', text: 'Porque es la nota más aguda del piano' },
              { id: 'opt4', text: 'Porque inventó la música solar' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La espiral de la Clave de Sol nace en la segunda línea del pentagrama, estableciendo que toda nota escrita allí es un Sol4 (G4).'
          },
          {
            id: 'u1_l2_ex2',
            type: 'stave-identification',
            prompt: '¿Qué nota está escrita en la segunda línea del pentagrama?',
            clef: 'treble',
            staveNotes: [{ note: 'G4', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Mi (E4)' },
              { id: 'opt2', text: 'Sol (G4)' },
              { id: 'opt3', text: 'Si (B4)' },
              { id: 'opt4', text: 'Re (D5)' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'La segunda línea es Sol (G4). Recuerda las 5 líneas de abajo hacia arriba: Mi, Sol, Si, Re, Fa.'
          },
          {
            id: 'u1_l2_ex3',
            type: 'order-notes',
            prompt: 'Ordena de abajo hacia arriba las notas de las 5 líneas del pentagrama:',
            noteBank: ['Re5', 'Mi4', 'Fa5', 'Si4', 'Sol4'],
            correctSequence: ['Mi4', 'Sol4', 'Si4', 'Re5', 'Fa5'],
            explanation: 'Las 5 líneas de abajo hacia arriba corresponden a: 1ª Mi, 2ª Sol, 3ª Si, 4ª Re, 5ª Fa.'
          },
          {
            id: 'u1_l2_ex4',
            type: 'piano-play',
            prompt: 'Toca la primera línea del pentagrama (Mi4 - E4):',
            targetPianoNote: 'E4',
            explanation: '¡Muy bien! Mi4 es la tecla blanca inmediatamente a la derecha de las dos teclas negras.'
          },
          {
            id: 'u1_l2_ex5',
            type: 'stave-identification',
            prompt: '¿Qué nota reposa sobre la tercera línea central?',
            clef: 'treble',
            staveNotes: [{ note: 'B4', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Sol (G4)' },
              { id: 'opt2', text: 'Si (B4)' },
              { id: 'opt3', text: 'Do (C5)' },
              { id: 'opt4', text: 'Fa (F5)' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'La tercera línea es Si (B4). Es la línea divisoria del pentagrama.'
          }
        ]
      },
      {
        id: 'u1_l3',
        unitId: 1,
        lessonNumber: 3,
        title: 'Los 4 Espacios del Pentagrama',
        subtitle: 'Fa, La, Do, Mi',
        description: 'Domina las notas que habitan entre las líneas.',
        icon: '✨',
        color: 'green',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u1_l3_ex1',
            type: 'stave-identification',
            prompt: '¿Qué nota musical se encuentra en el primer espacio (el más bajo)?',
            clef: 'treble',
            staveNotes: [{ note: 'F4', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Mi (E4)' },
              { id: 'opt2', text: 'Fa (F4)' },
              { id: 'opt3', text: 'La (A4)' },
              { id: 'opt4', text: 'Do (C5)' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'El primer espacio entre la 1ª y 2ª línea es Fa (F4).'
          },
          {
            id: 'u1_l3_ex2',
            type: 'match-pairs',
            prompt: 'Empareja el número de espacio con su nota correspondiente:',
            pairs: [
              { id: 'p1', left: '1er Espacio', right: 'Fa (F4)' },
              { id: 'p2', left: '2º Espacio', right: 'La (A4)' },
              { id: 'p3', left: '3er Espacio', right: 'Do (C5)' },
              { id: 'p4', left: '4º Espacio', right: 'Mi (E5)' }
            ],
            explanation: 'Los 4 espacios forman la palabra mnemotécnica FACE en inglés: F, A, C, E.'
          },
          {
            id: 'u1_l3_ex3',
            type: 'listen-identify',
            prompt: 'Escucha la nota de afinación universal (440 Hz). ¿En qué espacio se escribe?',
            audioNotes: ['A4'],
            options: [
              { id: 'opt1', text: 'Segundo espacio (La4 / A4)', noteValue: 'A4' },
              { id: 'opt2', text: 'Tercer espacio (Do5 / C5)', noteValue: 'C5' },
              { id: 'opt3', text: 'Primer espacio (Fa4 / F4)', noteValue: 'F4' },
              { id: 'opt4', text: 'Cuarto espacio (Mi5 / E5)', noteValue: 'E5' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La nota La4 (440 Hz) es el estándar internacional de afinación y vive en el segundo espacio del pentagrama.'
          },
          {
            id: 'u1_l3_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota del 3er espacio (Do agudo - C5):',
            targetPianoNote: 'C5',
            explanation: '¡Excelente! C5 está una octava por encima del Do Central.'
          },
          {
            id: 'u1_l3_ex5',
            type: 'order-notes',
            prompt: 'Ordena de abajo hacia arriba los 4 espacios:',
            noteBank: ['Do5', 'Mi5', 'Fa4', 'La4'],
            correctSequence: ['Fa4', 'La4', 'Do5', 'Mi5'],
            explanation: 'Los espacios de abajo hacia arriba son: 1º Fa, 2º La, 3º Do, 4º Mi.'
          }
        ]
      },
      {
        id: 'u1_l4',
        unitId: 1,
        lessonNumber: 4,
        title: 'El Do Central y Líneas Adicionales',
        subtitle: 'Ampliando los límites del pentagrama',
        description: 'Aprende a leer notas por debajo y por encima de las cinco líneas.',
        icon: '🎯',
        color: 'green',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u1_l4_ex1',
            type: 'multiple-choice',
            prompt: '¿Cómo se llama la pequeña línea que atraviesa el Do Central (C4)?',
            options: [
              { id: 'opt1', text: 'Línea de compás' },
              { id: 'opt2', text: 'Línea adicional (o ledger line)' },
              { id: 'opt3', text: 'Línea de ligadura' },
              { id: 'opt4', text: 'Línea divisoria' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'Las líneas adicionales se usan para extender el pentagrama hacia los registros más graves o más agudos.'
          },
          {
            id: 'u1_l4_ex2',
            type: 'stave-identification',
            prompt: '¿Qué nota está situada en el espacio inmediatamente debajo de la primera línea?',
            clef: 'treble',
            staveNotes: [{ note: 'D4', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Do (C4)' },
              { id: 'opt2', text: 'Re (D4)' },
              { id: 'opt3', text: 'Mi (E4)' },
              { id: 'opt4', text: 'Si (B3)' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'La nota Re4 (D4) está colgada inmediatamente debajo de la 1ª línea (Mi4).'
          },
          {
            id: 'u1_l4_ex3',
            type: 'piano-play',
            prompt: 'Toca el Do Central (C4) en el teclado:',
            targetPianoNote: 'C4',
            explanation: '¡Perfecto! El Do Central (C4) es el corazón de la lectura de partituras.'
          },
          {
            id: 'u1_l4_ex4',
            type: 'stave-identification',
            prompt: '¿Qué nota se encuentra en la primera línea adicional superior?',
            clef: 'treble',
            staveNotes: [{ note: 'A5', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Sol (G5)' },
              { id: 'opt2', text: 'La (A5)' },
              { id: 'opt3', text: 'Si (B5)' },
              { id: 'opt4', text: 'Do (C6)' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'La primera línea adicional superior es La5 (A5).'
          },
          {
            id: 'u1_l4_ex5',
            type: 'match-pairs',
            prompt: 'Empareja cada nota con su posición respecto a las líneas adicionales:',
            pairs: [
              { id: 'p1', left: 'Do Central (C4)', right: '1ª línea adicional inferior' },
              { id: 'p2', left: 'Re4 (D4)', right: 'Espacio bajo 1ª línea' },
              { id: 'p3', left: 'Sol5 (G5)', right: 'Espacio sobre 5ª línea' },
              { id: 'p4', left: 'La5 (A5)', right: '1ª línea adicional superior' }
            ],
            explanation: 'Dominar las líneas adicionales te permite leer cualquier registro sin dudar.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 2: RITMO Y FIGURAS MUSICALES
  // ==========================================
  {
    id: 2,
    title: 'Unidad 2: Ritmo y Figuras Musicales',
    subtitle: 'El pulso de la música: Redondas, Blancas, Negras y Compases',
    description: 'El ritmo organiza los sonidos en el tiempo. Domina las duraciones y el compás.',
    themeColor: '#1cb0f6', // duo-blue
    nodes: [
      {
        id: 'u2_l1',
        unitId: 2,
        lessonNumber: 1,
        title: 'Figuras de Duración',
        subtitle: 'Redonda, Blanca, Negra y Corchea',
        description: 'Descubre las proporciones matemáticas de la duración musical.',
        icon: '⏱️',
        color: 'blue',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u2_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuántos tiempos dura una Negra (𝅘𝅥) en un compás de 4/4?',
            options: [
              { id: 'opt1', text: '1 tiempo' },
              { id: 'opt2', text: '2 tiempos' },
              { id: 'opt3', text: '4 tiempos' },
              { id: 'opt4', text: '½ tiempo' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La Negra (quarter note) dura exactamente 1 pulso o tiempo en compases con denominador 4.'
          },
          {
            id: 'u2_l1_ex2',
            type: 'match-pairs',
            prompt: 'Empareja cada figura con su duración en tiempos (en 4/4):',
            pairs: [
              { id: 'p1', left: 'Redonda (𝅝)', right: '4 tiempos' },
              { id: 'p2', left: 'Blanca (𝅗𝅥)', right: '2 tiempos' },
              { id: 'p3', left: 'Negra (𝅘𝅥)', right: '1 tiempo' },
              { id: 'p4', left: 'Corchea (𝅘𝅥𝅮)', right: '½ tiempo' }
            ],
            explanation: 'Cada figura dura el doble que la siguiente: Redonda = 2 Blancas = 4 Negras = 8 Corcheas.'
          },
          {
            id: 'u2_l1_ex3',
            type: 'order-notes',
            prompt: 'Ordena las figuras de mayor a menor duración:',
            noteBank: ['Corchea (½T)', 'Redonda (4T)', 'Negra (1T)', 'Blanca (2T)'],
            correctSequence: ['Redonda (4T)', 'Blanca (2T)', 'Negra (1T)', 'Corchea (½T)'],
            explanation: 'De mayor a menor: Redonda (4T) > Blanca (2T) > Negra (1T) > Corchea (½T).'
          },
          {
            id: 'u2_l1_ex4',
            type: 'multiple-choice',
            prompt: '¿Cuántas corcheas equivalen a la duración de una sola Blanca?',
            options: [
              { id: 'opt1', text: '2 corcheas' },
              { id: 'opt2', text: '4 corcheas' },
              { id: 'opt3', text: '8 corcheas' },
              { id: 'opt4', text: '1 corchea' }
            ],
            correctAnswerId: 'opt2',
            explanation: '1 Blanca = 2 Negras. Como cada Negra tiene 2 Corcheas, 1 Blanca equivale a 4 Corcheas.'
          },
          {
            id: 'u2_l1_ex5',
            type: 'multiple-choice',
            prompt: '¿Cómo se dibuja una Redonda en la partitura?',
            options: [
              { id: 'opt1', text: 'Un óvalo hueco sin plica (sin barra vertical)' },
              { id: 'opt2', text: 'Un óvalo relleno negro con plica' },
              { id: 'opt3', text: 'Un óvalo hueco con plica' },
              { id: 'opt4', text: 'Una bandera doble' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La redonda (whole note) es un óvalo hueco sin plica ni corchete.'
          }
        ]
      },
      {
        id: 'u2_l2',
        unitId: 2,
        lessonNumber: 2,
        title: 'Los Silencios Musicales',
        subtitle: 'El arte de la pausa',
        description: 'Los silencios tienen el mismo valor rítmico que sus figuras correspondientes.',
        icon: '🤫',
        color: 'blue',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u2_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuál es la función de los silencios en la música?',
            options: [
              { id: 'opt1', text: 'Indicar pausas de duración precisa y articulación rítmica' },
              { id: 'opt2', text: 'Indicar que el músico se equivocó' },
              { id: 'opt3', text: 'Apagar el instrumento' },
              { id: 'opt4', text: 'Bajar el volumen' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El silencio es música: mide con exactitud el tiempo en que no debe sonar ninguna nota.'
          },
          {
            id: 'u2_l2_ex2',
            type: 'match-pairs',
            prompt: 'Empareja la figura con su silencio equivalente:',
            pairs: [
              { id: 'p1', left: 'Silencio de Redonda', right: 'Cuelga de la 4ª línea (4 tiempos)' },
              { id: 'p2', left: 'Silencio de Blanca', right: 'Descansa sobre la 3ª línea (2 tiempos)' },
              { id: 'p3', left: 'Silencio de Negra', right: 'Símbolo en forma de rayo/garabato (1T)' },
              { id: 'p4', left: 'Silencio de Corchea', right: 'Símbolo con un corchete similar a un 7 (½T)' }
            ],
            explanation: 'El silencio de redonda cuelga como un sombrero hacia abajo, y el de blanca descansa hacia arriba.'
          },
          {
            id: 'u2_l2_ex3',
            type: 'multiple-choice',
            prompt: 'Si sumas un silencio de blanca (2T) y dos silencios de negra (1T + 1T), ¿cuántos tiempos de silencio tienes?',
            options: [
              { id: 'opt1', text: '3 tiempos' },
              { id: 'opt2', text: '4 tiempos (un compás completo de 4/4)' },
              { id: 'opt3', text: '2 tiempos' },
              { id: 'opt4', text: '6 tiempos' }
            ],
            correctAnswerId: 'opt2',
            explanation: '2 tiempos + 1 tiempo + 1 tiempo = 4 tiempos exactos.'
          },
          {
            id: 'u2_l2_ex4',
            type: 'stave-identification',
            prompt: '¿Qué silencio dura exactamente 1 tiempo en este pentagrama?',
            clef: 'treble',
            staveNotes: [{ note: 'REST', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Silencio de Negra (1 tiempo)' },
              { id: 'opt2', text: 'Silencio de Blanca (2 tiempos)' },
              { id: 'opt3', text: 'Silencio de Redonda (4 tiempos)' },
              { id: 'opt4', text: 'Silencio de Corchea (½ tiempo)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El símbolo en forma de rayo (𝄽) es el silencio de negra.'
          },
          {
            id: 'u2_l2_ex5',
            type: 'multiple-choice',
            prompt: '¿Cuántos silencios de corchea se necesitan para llenar el tiempo de un silencio de redonda?',
            options: [
              { id: 'opt1', text: '4 silencios' },
              { id: 'opt2', text: '8 silencios' },
              { id: 'opt3', text: '2 silencios' },
              { id: 'opt4', text: '16 silencios' }
            ],
            correctAnswerId: 'opt2',
            explanation: 'Como cada corchea dura ½ tiempo y la redonda 4 tiempos: 4 / 0.5 = 8 corcheas.'
          }
        ]
      },
      {
        id: 'u2_l3',
        unitId: 2,
        lessonNumber: 3,
        title: 'Compases Simples y Pulso',
        subtitle: '4/4, 3/4 y 2/4',
        description: 'Aprende cómo las barras divisorias agrupan los tiempos de una obra.',
        icon: '🥁',
        color: 'blue',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u2_l3_ex1',
            type: 'multiple-choice',
            prompt: 'En la fracción de compás 4/4, ¿qué indica el número superior (4)?',
            options: [
              { id: 'opt1', text: 'La cantidad de pulsos o tiempos que caben en cada compás' },
              { id: 'opt2', text: 'La velocidad del metrónomo' },
              { id: 'opt3', text: 'La cantidad de pentagramas' },
              { id: 'opt4', text: 'El volumen con el que se debe tocar' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El numerador indica cuántos pulsos hay por compás. El denominador (4) indica que cada pulso es una negra.'
          },
          {
            id: 'u2_l3_ex2',
            type: 'match-pairs',
            prompt: 'Empareja cada compás con su estilo o danza tradicional:',
            pairs: [
              { id: 'p1', left: '3/4', right: 'Vals clásico (1-2-3, 1-2-3)' },
              { id: 'p2', left: '2/4', right: 'Marcha militar o tango (1-2, 1-2)' },
              { id: 'p3', left: '4/4', right: 'Compasillo: Rock, Pop y Balada' }
            ],
            explanation: 'El 3/4 es el compás ternario por excelencia (Vals), mientras que 4/4 es el más común de la música moderna.'
          },
          {
            id: 'u2_l3_ex3',
            type: 'multiple-choice',
            prompt: '¿Puede un compás de 3/4 contener una figura Redonda (4T)?',
            options: [
              { id: 'opt1', text: 'No, porque la redonda dura 4 tiempos y sobrepasaría los 3 tiempos del compás' },
              { id: 'opt2', text: 'Sí, siempre que se toque rápido' },
              { id: 'opt3', text: 'Sí, si se coloca en silencio' },
              { id: 'opt4', text: 'Depende de la clave' }
            ],
            correctAnswerId: 'opt1',
            explanation: '¡Exacto! En 3/4 solo caben 3 tiempos por compás, por lo que una redonda no cabe físicamente.'
          },
          {
            id: 'u2_l3_ex4',
            type: 'multiple-choice',
            prompt: '¿Cómo se llama la línea vertical que separa los compases en el pentagrama?',
            options: [
              { id: 'opt1', text: 'Línea divisoria o barra de compás' },
              { id: 'opt2', text: 'Línea de transporte' },
              { id: 'opt3', text: 'Plica' },
              { id: 'opt4', text: 'Cifra de compás' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Las líneas divisorias o barlines delimitan cada compás verticalmente a través del pentagrama.'
          },
          {
            id: 'u2_l3_ex5',
            type: 'multiple-choice',
            prompt: '¿Qué figura llena exactamente un compás completo de 2/4?',
            options: [
              { id: 'opt1', text: 'Una Blanca (2 tiempos)' },
              { id: 'opt2', text: 'Una Redonda (4 tiempos)' },
              { id: 'opt3', text: 'Una Negra (1 tiempo)' },
              { id: 'opt4', text: 'Una Semicorchea' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Como 2/4 tiene 2 tiempos, una Blanca (2T) completa exactamente el compás.'
          }
        ]
      },
      {
        id: 'u2_l4',
        unitId: 2,
        lessonNumber: 4,
        title: 'El Puntillo y la Ligadura',
        subtitle: 'Extender la duración de las notas',
        description: 'Descubre cómo sumar duración a las figuras para crear ritmos más expresivos.',
        icon: '🪢',
        color: 'blue',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u2_l4_ex1',
            type: 'multiple-choice',
            prompt: '¿Qué efecto produce un puntillo colocado a la derecha de una nota?',
            options: [
              { id: 'opt1', text: 'Le suma la mitad de su valor original' },
              { id: 'opt2', text: 'Duplica su duración' },
              { id: 'opt3', text: 'Le resta medio tiempo' },
              { id: 'opt4', text: 'La convierte en sostenido' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El puntillo añade la mitad del valor de la figura a la que acompaña: Valor + (Valor / 2).'
          },
          {
            id: 'u2_l4_ex2',
            type: 'multiple-choice',
            prompt: 'Si una Blanca dura 2 tiempos, ¿cuánto dura una Blanca con puntillo (𝅗𝅥.)?',
            options: [
              { id: 'opt1', text: '3 tiempos (2 + 1)' },
              { id: 'opt2', text: '4 tiempos' },
              { id: 'opt3', text: '2.5 tiempos' },
              { id: 'opt4', text: '1.5 tiempos' }
            ],
            correctAnswerId: 'opt1',
            explanation: '2 tiempos + la mitad de 2 (1 tiempo) = 3 tiempos. Es la figura reina del compás de 3/4.'
          },
          {
            id: 'u2_l4_ex3',
            type: 'multiple-choice',
            prompt: '¿Cuánto dura una Negra con puntillo (𝅘𝅥.)?',
            options: [
              { id: 'opt1', text: '1.5 tiempos (1 + 0.5)' },
              { id: 'opt2', text: '2 tiempos' },
              { id: 'opt3', text: '3 tiempos' },
              { id: 'opt4', text: '0.75 tiempos' }
            ],
            correctAnswerId: 'opt1',
            explanation: '1 tiempo + la mitad (0.5 tiempo) = 1 tiempo y medio. Suele ir seguida de una corchea.'
          },
          {
            id: 'u2_l4_ex4',
            type: 'multiple-choice',
            prompt: '¿Qué es una ligadura de prolongación (o de unión)?',
            options: [
              { id: 'opt1', text: 'Una línea curva que une dos notas de la misma altura sumando sus duraciones' },
              { id: 'opt2', text: 'Una línea para indicar que se debe tocar más rápido' },
              { id: 'opt3', text: 'Un adorno que se toca con pedal' },
              { id: 'opt4', text: 'Una pausa entre compases' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La ligadura de prolongación suma las duraciones de notas de la misma altura sin volver a atacar la segunda.'
          },
          {
            id: 'u2_l4_ex5',
            type: 'match-pairs',
            prompt: 'Empareja la figura con su duración total calculada:',
            pairs: [
              { id: 'p1', left: 'Blanca con puntillo', right: '3 tiempos' },
              { id: 'p2', left: 'Negra con puntillo', right: '1.5 tiempos' },
              { id: 'p3', left: 'Redonda con puntillo', right: '6 tiempos' },
              { id: 'p4', left: 'Dos negras ligadas', right: '2 tiempos sin separar' }
            ],
            explanation: 'Dominar el puntillo y la ligadura te permite interpretar ritmos dinámicos y sincopados.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 3: REGISTRO GRAVE Y CLAVE DE FA
  // ==========================================
  {
    id: 3,
    title: 'Unidad 3: El Registro Grave y la Clave de Fa',
    subtitle: 'La mano izquierda del piano, el bajo y el gran pentagrama',
    description: 'Aprende a leer en el registro grave utilizado por el violonchelo, bajo, fagot y mano izquierda.',
    themeColor: '#ff9600', // duo-orange
    nodes: [
      {
        id: 'u3_l1',
        unitId: 3,
        lessonNumber: 1,
        title: 'Introducción a la Clave de Fa',
        subtitle: 'La cuarta línea fija la nota Fa3',
        description: 'Descubre los dos puntos de la Clave de Fa y su referencia.',
        icon: '🪨',
        color: 'orange',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u3_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿En qué línea del pentagrama se dibuja tradicionalmente la Clave de Fa en música de piano?',
            options: [
              { id: 'opt1', text: 'En la 4ª línea' },
              { id: 'opt2', text: 'En la 2ª línea' },
              { id: 'opt3', text: 'En la 1ª línea' },
              { id: 'opt4', text: 'En la 5ª línea' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La Clave de Fa tradicional se coloca en la 4ª línea, y sus dos puntos rodean precisamente esa línea.'
          },
          {
            id: 'u3_l1_ex2',
            type: 'stave-identification',
            prompt: 'En Clave de Fa, ¿qué nota está situada sobre la 4ª línea?',
            clef: 'bass',
            staveNotes: [{ note: 'F3', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Fa grave (F3)' },
              { id: 'opt2', text: 'Sol (G3)' },
              { id: 'opt3', text: 'Do (C4)' },
              { id: 'opt4', text: 'Re (D3)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La 4ª línea es Fa3 (F3). Es la nota de referencia absoluta de esta clave.'
          },
          {
            id: 'u3_l1_ex3',
            type: 'multiple-choice',
            prompt: '¿Qué mano del pianista suele leer en Clave de Fa?',
            options: [
              { id: 'opt1', text: 'La mano izquierda (para notas graves y acompañamiento)' },
              { id: 'opt2', text: 'La mano derecha' },
              { id: 'opt3', text: 'Ambas manos a la vez siempre' },
              { id: 'opt4', text: 'Los pies únicamente' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'En las partituras de piano, el pentagrama inferior con Clave de Fa está reservado para la mano izquierda.'
          },
          {
            id: 'u3_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Fa de la 4ª línea de Clave de Fa (F3):',
            targetPianoNote: 'F3',
            explanation: '¡Excelente! Fa3 es un tono cálido y grave, una quinta por debajo del Do Central.'
          },
          {
            id: 'u3_l1_ex5',
            type: 'listen-identify',
            prompt: 'Escucha este sonido grave. ¿Qué nota es en Clave de Fa?',
            audioNotes: ['F3'],
            options: [
              { id: 'opt1', text: 'Fa3 (F3 - 4ª línea Clave Fa)', noteValue: 'F3' },
              { id: 'opt2', text: 'Do4 (C4 - Do Central)', noteValue: 'C4' },
              { id: 'opt3', text: 'Sol4 (G4 - Clave Sol)', noteValue: 'G4' },
              { id: 'opt4', text: 'Mi5 (E5)', noteValue: 'E5' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado Fa3 (174.6 Hz), la nota base de la Clave de Fa.'
          }
        ]
      },
      {
        id: 'u3_l2',
        unitId: 3,
        lessonNumber: 2,
        title: 'Líneas y Espacios en Clave de Fa',
        subtitle: 'Sol, Si, Re, Fa, La',
        description: 'Aprende todas las alturas del pentagrama en el registro grave.',
        icon: '🎻',
        color: 'orange',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u3_l2_ex1',
            type: 'order-notes',
            prompt: 'Ordena de abajo hacia arriba las 5 líneas en Clave de Fa:',
            noteBank: ['Re3', 'Sol2', 'La3', 'Si2', 'Fa3'],
            correctSequence: ['Sol2', 'Si2', 'Re3', 'Fa3', 'La3'],
            explanation: 'En Clave de Fa las líneas son: 1ª Sol, 2ª Si, 3ª Re, 4ª Fa, 5ª La.'
          },
          {
            id: 'u3_l2_ex2',
            type: 'match-pairs',
            prompt: 'Empareja los 4 espacios de Clave de Fa con sus notas:',
            pairs: [
              { id: 'p1', left: '1er Espacio (Clave Fa)', right: 'La (A2)' },
              { id: 'p2', left: '2º Espacio (Clave Fa)', right: 'Do (C3)' },
              { id: 'p3', left: '3er Espacio (Clave Fa)', right: 'Mi (E3)' },
              { id: 'p4', left: '4º Espacio (Clave Fa)', right: 'Sol (G3)' }
            ],
            explanation: 'Los espacios en Clave de Fa son: La, Do, Mi, Sol.'
          },
          {
            id: 'u3_l2_ex3',
            type: 'stave-identification',
            prompt: '¿Qué nota está en el segundo espacio de Clave de Fa?',
            clef: 'bass',
            staveNotes: [{ note: 'C3', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Do (C3)' },
              { id: 'opt2', text: 'Mi (E3)' },
              { id: 'opt3', text: 'Sol (G2)' },
              { id: 'opt4', text: 'La (A2)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El 2º espacio en Clave de Fa es Do3 (C3), una octava más grave que el Do Central.'
          },
          {
            id: 'u3_l2_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Sol2 (1ª línea de Clave de Fa):',
            targetPianoNote: 'G2',
            explanation: '¡Muy bien! Sol2 es una nota de bajo profundo.'
          },
          {
            id: 'u3_l2_ex5',
            type: 'multiple-choice',
            prompt: '¿Qué nota está sobre la 5ª línea superior de la Clave de Fa?',
            options: [
              { id: 'opt1', text: 'La (A3)' },
              { id: 'opt2', text: 'Fa (F3)' },
              { id: 'opt3', text: 'Do (C4)' },
              { id: 'opt4', text: 'Si (B3)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La 5ª línea de Clave de Fa es La3 (A3).'
          }
        ]
      },
      {
        id: 'u3_l3',
        unitId: 3,
        lessonNumber: 3,
        title: 'El Gran Pentagrama',
        subtitle: 'El Do Central como puente entre ambas claves',
        description: 'Comprende el sistema de dos pentagramas unidos que leen los pianistas.',
        icon: '🌉',
        color: 'orange',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u3_l3_ex1',
            type: 'multiple-choice',
            prompt: '¿Dónde se ubica el Do Central (C4) en relación a la Clave de Sol y Clave de Fa?',
            options: [
              { id: 'opt1', text: 'Exactamente en medio: 1ª línea adicional inferior en Sol y 1ª línea adicional superior en Fa' },
              { id: 'opt2', text: 'Solo existe en la Clave de Sol' },
              { id: 'opt3', text: 'En la tercera línea de ambas claves' },
              { id: 'opt4', text: 'En ningún pentagrama' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El Do Central es el puente simétrico: 1 línea abajo del pentagrama de Sol, y 1 línea arriba del pentagrama de Fa.'
          },
          {
            id: 'u3_l3_ex2',
            type: 'stave-identification',
            prompt: '¿Qué nota representa esta línea adicional superior en Clave de Fa?',
            clef: 'bass',
            staveNotes: [{ note: 'C4', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Do Central (C4)' },
              { id: 'opt2', text: 'La (A3)' },
              { id: 'opt3', text: 'Si (B3)' },
              { id: 'opt4', text: 'Re (D4)' }
            ],
            correctAnswerId: 'opt1',
            explanation: '¡Es el Do Central (C4)! Exactamente la misma nota que se escribe con una línea adicional bajo la Clave de Sol.'
          },
          {
            id: 'u3_l3_ex3',
            type: 'piano-play',
            prompt: 'Toca el Do Central (C4), el nexo de unión del Gran Pentagrama:',
            targetPianoNote: 'C4',
            explanation: '¡Magnífico! Ya comprendes cómo se conectan los dos mundos de la partitura.'
          },
          {
            id: 'u3_l3_ex4',
            type: 'match-pairs',
            prompt: 'Empareja la clave con su registro y función principal:',
            pairs: [
              { id: 'p1', left: 'Clave de Sol (G Clef)', right: 'Registro agudo / Melodía principal' },
              { id: 'p2', left: 'Clave de Fa (F Clef)', right: 'Registro grave / Armonía y Bajos' },
              { id: 'p3', left: 'Do Central (C4)', right: 'Frecuencia 261.6 Hz / Centro del sistema' }
            ],
            explanation: 'Juntas abarcan casi 5 octavas completas del piano con facilidad de lectura.'
          },
          {
            id: 'u3_l3_ex5',
            type: 'multiple-choice',
            prompt: '¿Cómo se llama la llave que une el pentagrama de Sol y el de Fa a la izquierda?',
            options: [
              { id: 'opt1', text: 'Corchete o Llave de Sistema (Accolade)' },
              { id: 'opt2', text: 'Clave de paso' },
              { id: 'opt3', text: 'Plica maestra' },
              { id: 'opt4', text: 'Ligadura' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La llave o corchete agrupa los pentagramas que deben ser leídos simultáneamente por un mismo intérprete.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 4: ALTERACIONES Y SEMITONOS
  // ==========================================
  {
    id: 4,
    title: 'Unidad 4: Alteraciones, Semitonos y Teclas Negras',
    subtitle: 'Sostenidos (#), Bemoles (b), Becuadros y la Escala Cromática',
    description: 'Aprende a modificar la altura de las notas y a dominar las 12 notas de la música occidental.',
    themeColor: '#ce82ff', // duo-purple
    nodes: [
      {
        id: 'u4_l1',
        unitId: 4,
        lessonNumber: 1,
        title: 'Tonos y Semitonos',
        subtitle: 'Las distancias elementales del sonido',
        description: 'El semitono es la distancia más corta entre dos teclas contiguas del piano.',
        icon: '📐',
        color: 'purple',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u4_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuál es la distancia mínima entre dos teclas consecutivas en el piano?',
            options: [
              { id: 'opt1', text: 'Un semitono (medio tono)' },
              { id: 'opt2', text: 'Un tono entero' },
              { id: 'opt3', text: 'Una octava' },
              { id: 'opt4', text: 'Tres tonos' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'En el sistema musical occidental templado, la distancia mínima es el semitono.'
          },
          {
            id: 'u4_l1_ex2',
            type: 'multiple-choice',
            prompt: '¿Entre cuáles de las siguientes notas naturales NO hay ninguna tecla negra de por medio?',
            options: [
              { id: 'opt1', text: 'Entre Mi y Fa, y entre Si y Do' },
              { id: 'opt2', text: 'Entre Do y Re, y entre Fa y Sol' },
              { id: 'opt3', text: 'Entre Sol y La' },
              { id: 'opt4', text: 'Entre Re y Mi' }
            ],
            correctAnswerId: 'opt1',
            explanation: '¡Regla de oro de la música! Entre Mi-Fa y entre Si-Do la distancia natural ya es de un semitono directo.'
          },
          {
            id: 'u4_l1_ex3',
            type: 'match-pairs',
            prompt: 'Empareja los pares de notas con su distancia sonora:',
            pairs: [
              { id: 'p1', left: 'De Do a Re', right: '1 Tono entero (2 semitonos)' },
              { id: 'p2', left: 'De Mi a Fa', right: '1 Semitono (medio tono natural)' },
              { id: 'p3', left: 'De Si a Do', right: '1 Semitono (medio tono natural)' },
              { id: 'p4', left: 'De Fa a Sol', right: '1 Tono entero (2 semitonos)' }
            ],
            explanation: 'Todas las notas naturales están separadas por 1 tono, excepto Mi-Fa y Si-Do que son semitonos.'
          },
          {
            id: 'u4_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Mi (E4) y observa cómo está pegada a Fa:',
            targetPianoNote: 'E4',
            explanation: 'Entre Mi y Fa no hay tecla negra: son semitonos naturales.'
          },
          {
            id: 'u4_l1_ex5',
            type: 'multiple-choice',
            prompt: '¿Cuántos semitonos contiene un tono entero?',
            options: [
              { id: 'opt1', text: '2 semitonos' },
              { id: 'opt2', text: '4 semitonos' },
              { id: 'opt3', text: '1 semitono' },
              { id: 'opt4', text: '3 semitonos' }
            ],
            correctAnswerId: 'opt1',
            explanation: '1 Tono = 2 Semitonos. Por ejemplo: Do a Do# (1 semitono) + Do# a Re (1 semitono) = Do a Re (1 tono).'
          }
        ]
      },
      {
        id: 'u4_l2',
        unitId: 4,
        lessonNumber: 2,
        title: 'Sostenidos, Bemoles y Becuadros',
        subtitle: 'Subir, bajar o restablecer la altura',
        description: 'Domina los símbolos que alteran el tono de una nota.',
        icon: '♯',
        color: 'purple',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u4_l2_ex1',
            type: 'match-pairs',
            prompt: 'Empareja cada alteración con su efecto:',
            pairs: [
              { id: 'p1', left: 'Sostenido (♯)', right: 'Sube la nota un semitono' },
              { id: 'p2', left: 'Bemol (♭)', right: 'Baja la nota un semitono' },
              { id: 'p3', left: 'Becuadro (♮)', right: 'Cancela cualquier alteración y devuelve la nota a su estado natural' }
            ],
            explanation: 'Sostenido sube medio tono, bemol baja medio tono, y becuadro restablece al estado natural.'
          },
          {
            id: 'u4_l2_ex2',
            type: 'piano-play',
            prompt: 'Toca la tecla negra de Fa sostenido (F#4):',
            targetPianoNote: 'F#4',
            explanation: '¡Excelente! F#4 es la primera tecla negra del grupo de tres.'
          },
          {
            id: 'u4_l2_ex3',
            type: 'stave-identification',
            prompt: '¿Qué nota alterada se muestra en la partitura?',
            clef: 'treble',
            staveNotes: [{ note: 'F#4', duration: 'quarter' }],
            options: [
              { id: 'opt1', text: 'Fa sostenido (F#4)' },
              { id: 'opt2', text: 'Fa natural (F4)' },
              { id: 'opt3', text: 'Sol bemol (Gb4)' },
              { id: 'opt4', text: 'Mi sostenido (E#4)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El símbolo ♯ colocado antes de la cabeza de la nota indica Fa sostenido.'
          },
          {
            id: 'u4_l2_ex4',
            type: 'listen-identify',
            prompt: 'Escucha este sonido brillante. ¿Qué nota alterada es?',
            audioNotes: ['F#4'],
            options: [
              { id: 'opt1', text: 'Fa sostenido (F#4)', noteValue: 'F#4' },
              { id: 'opt2', text: 'Fa natural (F4)', noteValue: 'F4' },
              { id: 'opt3', text: 'Do natural (C4)', noteValue: 'C4' },
              { id: 'opt4', text: 'La natural (A4)', noteValue: 'A4' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado Fa#4 (369.9 Hz).'
          },
          {
            id: 'u4_l2_ex5',
            type: 'multiple-choice',
            prompt: 'Si en un compás aparece un Fa sostenido, ¿cuánto dura su efecto?',
            options: [
              { id: 'opt1', text: 'Durante todo ese compás para las notas de esa misma altura, hasta la barra divisoria' },
              { id: 'opt2', text: 'Durante toda la canción para siempre' },
              { id: 'opt3', text: 'Solo para esa única nota' },
              { id: 'opt4', text: 'Depende del tempo' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Las alteraciones accidentales afectan a todas las notas iguales dentro del mismo compás hasta que finaliza con la barra divisoria o aparece un becuadro.'
          }
        ]
      },
      {
        id: 'u4_l3',
        unitId: 4,
        lessonNumber: 3,
        title: 'Enarmonía y la Escala Cromática',
        subtitle: 'Distinto nombre, idéntico sonido',
        description: 'Comprende por qué Do# y Reb tocan exactamente la misma tecla física.',
        icon: '🎹',
        color: 'purple',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u4_l3_ex1',
            type: 'multiple-choice',
            prompt: '¿Qué es la enarmonía en la música?',
            options: [
              { id: 'opt1', text: 'Dos notas con nombres diferentes que tienen la misma frecuencia y sonido en el piano' },
              { id: 'opt2', text: 'Cantar fuera de tono' },
              { id: 'opt3', text: 'Tocar dos teclas a la vez' },
              { id: 'opt4', text: 'Una escala sin ritmo' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Por ejemplo, Do sostenido (C#) y Re bemol (Db) son notas enarmónicas: son la misma tecla física en el teclado templado.'
          },
          {
            id: 'u4_l3_ex2',
            type: 'match-pairs',
            prompt: 'Empareja cada nota con su equivalente enarmónico:',
            pairs: [
              { id: 'p1', left: 'Do# (C#)', right: 'Re♭ (Db)' },
              { id: 'p2', left: 'Re# (D#)', right: 'Mi♭ (Eb)' },
              { id: 'p3', left: 'Fa# (F#)', right: 'Sol♭ (Gb)' },
              { id: 'p4', left: 'Sol# (G#)', right: 'La♭ (Ab)' }
            ],
            explanation: 'Subir medio tono desde una nota equivale a bajar medio tono desde la siguiente superior.'
          },
          {
            id: 'u4_l3_ex3',
            type: 'multiple-choice',
            prompt: '¿Cuántas notas componen la escala cromática en una octava completa?',
            options: [
              { id: 'opt1', text: '12 notas (7 blancas + 5 negras)' },
              { id: 'opt2', text: '7 notas' },
              { id: 'opt3', text: '8 notas' },
              { id: 'opt4', text: '10 notas' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Las 12 notas de la escala cromática comprenden todas las notas naturales y alteradas del sistema occidental.'
          },
          {
            id: 'u4_l3_ex4',
            type: 'piano-play',
            prompt: 'Toca la tecla Si bemol (Bb4 / La#4):',
            targetPianoNote: 'Bb4',
            explanation: '¡Perfecto! Bb4 es la tercera tecla negra del grupo de tres.'
          },
          {
            id: 'u4_l3_ex5',
            type: 'order-notes',
            prompt: 'Ordena ascendentemente por semitonos desde Do hasta Mi:',
            noteBank: ['Re', 'Do#', 'Mi', 'Re#', 'Do'],
            correctSequence: ['Do', 'Do#', 'Re', 'Re#', 'Mi'],
            explanation: 'La secuencia cromática avanza estrictamente de semitono en semitono.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 5: INTERVALOS Y ENTRENAMIENTO AUDITIVO
  // ==========================================
  {
    id: 5,
    title: 'Unidad 5: Intervalos Musicales y Oído Relativo',
    subtitle: 'Segundas, Terceras, Cuartas, Quintas y Octavas',
    description: 'Los intervalos son los ladrillos de la melodía y la armonía. Aprende a medirlos y reconocerlos.',
    themeColor: '#ff4b4b', // duo-red
    nodes: [
      {
        id: 'u5_l1',
        unitId: 5,
        lessonNumber: 1,
        title: 'Introducción a los Intervalos',
        subtitle: 'Distancias melódicas y armónicas',
        description: 'Aprende a medir la separación entre dos notas contando grados.',
        icon: '📏',
        color: 'red',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u5_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Qué es un intervalo musical?',
            options: [
              { id: 'opt1', text: 'La distancia o diferencia de altura entre dos sonidos' },
              { id: 'opt2', text: 'El tiempo que dura un ensayo' },
              { id: 'opt3', text: 'El silencio entre canciones' },
              { id: 'opt4', text: 'El volumen del amplificador' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El intervalo mide qué tan lejos o cerca está una nota de otra.'
          },
          {
            id: 'u5_l1_ex2',
            type: 'multiple-choice',
            prompt: '¿Cuál es la diferencia entre un intervalo melódico y uno armónico?',
            options: [
              { id: 'opt1', text: 'El melódico suena sucesivamente (una nota tras otra); el armónico suena simultáneamente (a la vez)' },
              { id: 'opt2', text: 'El melódico es en piano y el armónico en guitarra' },
              { id: 'opt3', text: 'El melódico es afinado y el armónico desafinado' },
              { id: 'opt4', text: 'No existe diferencia' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Melodía = notas en fila horizontal; Armonía = notas apiladas verticalmente.'
          },
          {
            id: 'u5_l1_ex3',
            type: 'match-pairs',
            prompt: 'Empareja los dos tonos con el nombre numérico de su intervalo:',
            pairs: [
              { id: 'p1', left: 'De Do a Re', right: 'Segunda (2ª)' },
              { id: 'p2', left: 'De Do a Mi', right: 'Tercera (3ª)' },
              { id: 'p3', left: 'De Do a Sol', right: 'Quinta Justa (5ª)' },
              { id: 'p4', left: 'De Do a Do agudo', right: 'Octava Justa (8ª)' }
            ],
            explanation: 'Se cuenta la nota de inicio, las intermedias y la de llegada: Do(1), Re(2), Mi(3), Fa(4), Sol(5).'
          },
          {
            id: 'u5_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Sol (G4) para formar una Quinta Justa desde Do4:',
            targetPianoNote: 'G4',
            explanation: '¡Magnífico! De Do a Sol hay 5 notas de distancia: Do-Re-Mi-Fa-Sol.'
          },
          {
            id: 'u5_l1_ex5',
            type: 'listen-identify',
            prompt: 'Escucha este intervalo de Quinta Justa (Do a Sol):',
            audioNotes: ['C4', 'G4'],
            options: [
              { id: 'opt1', text: 'Quinta Justa (Do - Sol)' },
              { id: 'opt2', text: 'Segunda menor' },
              { id: 'opt3', text: 'Unísono' },
              { id: 'opt4', text: 'Séptima mayor' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La quinta justa es uno de los intervalos más consonantes, estables y heroicos de la música (ej: fanfarria de Star Wars).'
          }
        ]
      },
      {
        id: 'u5_l2',
        unitId: 5,
        lessonNumber: 2,
        title: 'Terceras Mayores y Menores',
        subtitle: 'El alma alegre o melancólica de la música',
        description: 'Aprende a diferenciar el color brillante de la tercera mayor del tono íntimo de la menor.',
        icon: '🎭',
        color: 'red',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u5_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuántos tonos de distancia tiene una Tercera Mayor (ej: Do a Mi)?',
            options: [
              { id: 'opt1', text: '2 tonos enteros (4 semitonos)' },
              { id: 'opt2', text: '1 tono y medio' },
              { id: 'opt3', text: '3 tonos' },
              { id: 'opt4', text: '1 tono' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La tercera mayor mide 2 tonos enteros (Do a Re = 1T, Re a Mi = 1T, total = 2T).'
          },
          {
            id: 'u5_l2_ex2',
            type: 'multiple-choice',
            prompt: '¿Cuántos tonos tiene una Tercera Menor (ej: Do a Mi bemol)?',
            options: [
              { id: 'opt1', text: '1 tono y medio (3 semitonos)' },
              { id: 'opt2', text: '2 tonos' },
              { id: 'opt3', text: '1 tono' },
              { id: 'opt4', text: '2 tonos y medio' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La tercera menor mide 1.5 tonos (3 semitonos), dándole un carácter más melancólico u oscuro.'
          },
          {
            id: 'u5_l2_ex3',
            type: 'listen-identify',
            prompt: 'Escucha este intervalo. ¿Es una Tercera Mayor o una Tercera Menor?',
            audioNotes: ['C4', 'E4'],
            options: [
              { id: 'opt1', text: 'Tercera Mayor (Do - Mi / Brillante y abierta)' },
              { id: 'opt2', text: 'Tercera Menor (Do - Mi♭ / Nostálgica)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado Do y Mi: una Tercera Mayor clara y luminosa.'
          },
          {
            id: 'u5_l2_ex4',
            type: 'piano-play',
            prompt: 'Toca Mi bemol (Eb4) para formar una Tercera Menor desde Do4:',
            targetPianoNote: 'Eb4',
            explanation: '¡Excelente! De Do a Mi bemol hay 3 semitonos (Tercera Menor).'
          },
          {
            id: 'u5_l2_ex5',
            type: 'match-pairs',
            prompt: 'Empareja el intervalo con su fórmula en semitonos:',
            pairs: [
              { id: 'p1', left: 'Segunda Mayor (Do - Re)', right: '2 semitonos (1 tono)' },
              { id: 'p2', left: 'Tercera Menor (Do - Mib)', right: '3 semitonos (1.5 tonos)' },
              { id: 'p3', left: 'Tercera Mayor (Do - Mi)', right: '4 semitonos (2 tonos)' },
              { id: 'p4', left: 'Cuarta Justa (Do - Fa)', right: '5 semitonos (2.5 tonos)' }
            ],
            explanation: 'El número exacto de semitonos define si un intervalo es Mayor, Menor o Justo.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 6: ESCALAS Y TONALIDADES
  // ==========================================
  {
    id: 6,
    title: 'Unidad 6: Escalas Musicales y Tonalidades',
    subtitle: 'La Escala Mayor, Escala Menor y el Círculo de Quintas',
    description: 'Descubre la fórmula universal de la escala mayor y las armaduras de clave.',
    themeColor: '#ffc800', // duo-yellow
    nodes: [
      {
        id: 'u6_l1',
        unitId: 6,
        lessonNumber: 1,
        title: 'La Escala Mayor y su Fórmula',
        subtitle: 'Tono - Tono - Semitono - Tono - Tono - Tono - Semitono',
        description: 'Aprende la fórmula mágica para construir una escala mayor en cualquier nota.',
        icon: '☀️',
        color: 'yellow',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u6_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuál es el patrón exacto de intervalos de la Escala Mayor?',
            options: [
              { id: 'opt1', text: 'Tono - Tono - Semitono - Tono - Tono - Tono - Semitono (T-T-S-T-T-T-S)' },
              { id: 'opt2', text: 'Tono - Semitono - Tono - Tono - Semitono - Tono - Tono' },
              { id: 'opt3', text: 'Todos son tonos enteros' },
              { id: 'opt4', text: 'Todos son semitonos' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El patrón T-T-S-T-T-T-S es la regla universal de toda escala mayor en cualquier tonalidad.'
          },
          {
            id: 'u6_l1_ex2',
            type: 'order-notes',
            prompt: 'Ordena las notas de la Escala Mayor de Sol (G Major) con su alteración correspondiente:',
            noteBank: ['Re', 'Sol', 'Fa#', 'Si', 'Do', 'Mi', 'La'],
            correctSequence: ['Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa#'],
            explanation: 'Para cumplir el patrón T-T-S-T-T-T-S comenzando en Sol, el 7º grado debe ser Fa sostenido (Fa#).'
          },
          {
            id: 'u6_l1_ex3',
            type: 'piano-play',
            prompt: 'Toca la tónica de la escala más famosa, Do Mayor (C4):',
            targetPianoNote: 'C4',
            explanation: 'Do Mayor no tiene ninguna alteración: usa exclusivamente las 7 teclas blancas.'
          },
          {
            id: 'u6_l1_ex4',
            type: 'listen-identify',
            prompt: 'Escucha la escala ascendente completa. ¿Qué escala es?',
            audioNotes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
            playType: 'sequence',
            options: [
              { id: 'opt1', text: 'Escala Mayor de Do (C Major)' },
              { id: 'opt2', text: 'Escala Pentatónica menor' },
              { id: 'opt3', text: 'Escala Cromática' },
              { id: 'opt4', text: 'Escala de Blues' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado la escala diatónica mayor de Do (Do-Re-Mi-Fa-Sol-La-Si-Do).'
          },
          {
            id: 'u6_l1_ex5',
            type: 'multiple-choice',
            prompt: '¿Cuántos sostenidos tiene la armadura de la Escala Mayor de Sol (G)?',
            options: [
              { id: 'opt1', text: '1 sostenido (Fa#)' },
              { id: 'opt2', text: '2 sostenidos' },
              { id: 'opt3', text: 'Ningún sostenido' },
              { id: 'opt4', text: '4 sostenidos' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Sol Mayor tiene un único sostenido en su armadura: Fa sostenido.'
          }
        ]
      },
      {
        id: 'u6_l2',
        unitId: 6,
        lessonNumber: 2,
        title: 'La Escala Menor Natural y Relativas',
        subtitle: 'La menor: la hermana de Do Mayor',
        description: 'Comprende el modo menor y la relación entre escalas relativas.',
        icon: '🌙',
        color: 'yellow',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u6_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuál es la escala menor relativa de Do Mayor (comparte sus mismas notas sin alteraciones)?',
            options: [
              { id: 'opt1', text: 'La menor (A minor)' },
              { id: 'opt2', text: 'Re menor' },
              { id: 'opt3', text: 'Mi menor' },
              { id: 'opt4', text: 'Sol menor' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La menor relativa siempre se encuentra 1 tono y medio (una tercera menor) por debajo de la tónica mayor: De Do bajamos a La.'
          },
          {
            id: 'u6_l2_ex2',
            type: 'order-notes',
            prompt: 'Ordena la Escala Menor Natural de La desde su tónica:',
            noteBank: ['Mi', 'La', 'Do', 'Sol', 'Si', 'Fa', 'Re'],
            correctSequence: ['La', 'Si', 'Do', 'Re', 'Mi', 'Fa', 'Sol'],
            explanation: 'La escala menor natural de La usa solo teclas blancas desde La hasta La: La-Si-Do-Re-Mi-Fa-Sol.'
          },
          {
            id: 'u6_l2_ex3',
            type: 'listen-identify',
            prompt: 'Escucha este sonido. ¿Suena a escala mayor o menor?',
            audioNotes: ['A4', 'C5', 'E5'],
            playType: 'chord',
            options: [
              { id: 'opt1', text: 'Acorde / Tonalidad Menor (Nostálgico y profundo)' },
              { id: 'opt2', text: 'Acorde / Tonalidad Mayor (Alegre y festivo)' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado el acorde de La menor (A-C-E), con su característico matiz introspectivo.'
          },
          {
            id: 'u6_l2_ex4',
            type: 'piano-play',
            prompt: 'Toca la tónica de La menor (A4 - 440 Hz):',
            targetPianoNote: 'A4',
            explanation: '¡Excelente! La4 es la tónica del mundo menor natural.'
          },
          {
            id: 'u6_l2_ex5',
            type: 'multiple-choice',
            prompt: '¿Cuál es el orden tradicional de aparición de los sostenidos en las armaduras de clave?',
            options: [
              { id: 'opt1', text: 'Fa - Do - Sol - Re - La - Mi - Si' },
              { id: 'opt2', text: 'Do - Re - Mi - Fa - Sol - La - Si' },
              { id: 'opt3', text: 'Si - Mi - La - Re - Sol - Do - Fa' },
              { id: 'opt4', text: 'Sol - Re - La - Mi - Si - Fa - Do' }
            ],
            correctAnswerId: 'opt1',
            explanation: '¡Mnemotécnica clásica! Los sostenidos siempre se agregan en quintas ascendentes: Fa, Do, Sol, Re, La, Mi, Si.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 7: TRÍADAS Y ACORDES
  // ==========================================
  {
    id: 7,
    title: 'Unidad 7: Acordes y Armonía',
    subtitle: 'Tríadas mayores, menores y cómo acompañar una canción',
    description: 'Aprende a construir acordes apilando terceras y crea tus primeros acompañamientos.',
    themeColor: '#2b70c9',
    nodes: [
      {
        id: 'u7_l1',
        unitId: 7,
        lessonNumber: 1,
        title: 'Tríadas Mayores y Menores',
        subtitle: 'Fundamental, Tercera y Quinta',
        description: 'La anatomía de los acordes básicos de 3 notas.',
        icon: '🎹',
        color: 'blue',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u7_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuáles son las 3 notas que componen el acorde de Do Mayor (C)?',
            options: [
              { id: 'opt1', text: 'Do, Mi, Sol (C - E - G)' },
              { id: 'opt2', text: 'Do, Re, Mi' },
              { id: 'opt3', text: 'Do, Fa, La' },
              { id: 'opt4', text: 'Do, Mi bemol, Sol' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La tríada mayor se compone de Fundamental (Do), 3ª Mayor (Mi) y 5ª Justa (Sol).'
          },
          {
            id: 'u7_l1_ex2',
            type: 'listen-identify',
            prompt: 'Escucha este acorde. ¿Qué acorde es?',
            audioNotes: ['C4', 'E4', 'G4'],
            playType: 'chord',
            options: [
              { id: 'opt1', text: 'Do Mayor (C: Do - Mi - Sol)' },
              { id: 'opt2', text: 'Do menor (Cm: Do - Mib - Sol)' },
              { id: 'opt3', text: 'Fa Mayor' },
              { id: 'opt4', text: 'Sol 7' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Has escuchado la tríada de Do Mayor (C).'
          },
          {
            id: 'u7_l1_ex3',
            type: 'match-pairs',
            prompt: 'Empareja el cifrado del acorde con sus notas:',
            pairs: [
              { id: 'p1', left: 'Do Mayor (C)', right: 'Do - Mi - Sol' },
              { id: 'p2', left: 'La menor (Am)', right: 'La - Do - Mi' },
              { id: 'p3', left: 'Fa Mayor (F)', right: 'Fa - La - Do' },
              { id: 'p4', left: 'Sol Mayor (G)', right: 'Sol - Si - Re' }
            ],
            explanation: '¡Los cuatro acordes más famosos y tocados de toda la historia del pop y rock!'
          },
          {
            id: 'u7_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la tercera del acorde de Do Mayor (Mi4):',
            targetPianoNote: 'E4',
            explanation: '¡Excelente! La tercera es la que define si el acorde es alegre (Mayor) o melancólico (Menor).'
          },
          {
            id: 'u7_l1_ex5',
            type: 'multiple-choice',
            prompt: 'Para convertir un acorde Mayor en Menor, ¿qué nota debemos bajar medio tono?',
            options: [
              { id: 'opt1', text: 'La Tercera (bajarla un semitono)' },
              { id: 'opt2', text: 'La Fundamental' },
              { id: 'opt3', text: 'La Quinta' },
              { id: 'opt4', text: 'Todas las notas' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Al bajar la 3ª un semitono (de Mi a Mi bemol), Do Mayor (C-E-G) se convierte en Do menor (C-Eb-G).'
          }
        ]
      },
      {
        id: 'u7_l2',
        unitId: 7,
        lessonNumber: 2,
        title: 'Inversiones de Acordes',
        subtitle: 'Cambiando el bajo del acorde',
        description: 'Toca las mismas notas en diferente orden vertical para enlazar armonías suavemente.',
        icon: '🔄',
        color: 'blue',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u7_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Qué es una inversión de acorde?',
            options: [
              { id: 'opt1', text: 'Disponer las mismas notas del acorde colocando en el bajo la 3ª o la 5ª en vez de la fundamental' },
              { id: 'opt2', text: 'Tocar el acorde al revés en el tiempo' },
              { id: 'opt3', text: 'Comprar un instrumento caro' },
              { id: 'opt4', text: 'Tocar sin ritmo' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'En estado fundamental el bajo es la fundamental (Do-Mi-Sol). En 1ª inversión el bajo es Mi (Mi-Sol-Do).'
          },
          {
            id: 'u7_l2_ex2',
            type: 'match-pairs',
            prompt: 'Empareja la inversión de Do Mayor con la nota que está en el bajo:',
            pairs: [
              { id: 'p1', left: 'Estado Fundamental', right: 'Do en el bajo (C - E - G)' },
              { id: 'p2', left: 'Primera Inversión (6/3)', right: 'Mi en el bajo (E - G - C)' },
              { id: 'p3', left: 'Segunda Inversión (6/4)', right: 'Sol en el bajo (G - C - E)' }
            ],
            explanation: 'Las inversiones permiten que la mano izquierda y los dedos se muevan la menor distancia posible entre acordes.'
          },
          {
            id: 'u7_l2_ex3',
            type: 'listen-identify',
            prompt: 'Escucha este acorde de Do Mayor en 1ª inversión (Mi en el bajo):',
            audioNotes: ['E4', 'G4', 'C5'],
            playType: 'chord',
            options: [
              { id: 'opt1', text: 'Do Mayor en Primera Inversión (E - G - C)' },
              { id: 'opt2', text: 'Do menor' },
              { id: 'opt3', text: 'Acorde Disminuido' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Aunque las notas están reorganizadas (E4-G4-C5), sigue siendo la armonía de Do Mayor.'
          },
          {
            id: 'u7_l2_ex4',
            type: 'piano-play',
            prompt: 'Toca el bajo de la 1ª inversión de Do Mayor (Mi4):',
            targetPianoNote: 'E4',
            explanation: '¡Muy bien! Con Mi en el bajo la sonoridad es más fluida y menos estática.'
          },
          {
            id: 'u7_l2_ex5',
            type: 'multiple-choice',
            prompt: '¿Por qué los pianistas y compositores usan inversiones?',
            options: [
              { id: 'opt1', text: 'Para que la conducción de voces sea suave y los saltos de mano sean mínimos' },
              { id: 'opt2', text: 'Porque es obligatorio por ley' },
              { id: 'opt3', text: 'Para tocar más fuerte' },
              { id: 'opt4', text: 'Para cambiar de compás' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Las inversiones crean líneas de bajo melódicas y transiciones armónicas elegantes.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 8: PROGRESIONES ARMÓNICAS Y CADENCIAS
  // ==========================================
  {
    id: 8,
    title: 'Unidad 8: Progresiones Armónicas y Cadencias',
    subtitle: 'El Círculo de Armonía: Grados I - IV - V y Creación de Canciones',
    description: 'Descubre los secretos de las canciones exitosas: tensión, resolución y cadencias.',
    themeColor: '#00cd9c',
    nodes: [
      {
        id: 'u8_l1',
        unitId: 8,
        lessonNumber: 1,
        title: 'Los Grados Tonales y Cadencias',
        subtitle: 'Tónica (I), Subdominante (IV) y Dominante (V)',
        description: 'La tríada dorada de funciones armónicas que gobierna la música.',
        icon: '👑',
        color: 'green',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u8_l1_ex1',
            type: 'multiple-choice',
            prompt: 'En tonalidad de Do Mayor, ¿cuáles son los acordes correspondientes a los grados I, IV y V?',
            options: [
              { id: 'opt1', text: 'I = Do Mayor, IV = Fa Mayor, V = Sol Mayor' },
              { id: 'opt2', text: 'I = Do, IV = Re, V = Mi' },
              { id: 'opt3', text: 'I = La menor, IV = Re menor, V = Mi menor' },
              { id: 'opt4', text: 'I = Sol, IV = Do, V = Re' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Contando desde Do: 1º Do (I Tónica), 4º Fa (IV Subdominante), 5º Sol (V Dominante).'
          },
          {
            id: 'u8_l1_ex2',
            type: 'match-pairs',
            prompt: 'Empareja cada grado con su función armónica psicológica:',
            pairs: [
              { id: 'p1', left: 'Grado I (Tónica)', right: 'Reposo absoluto, hogar y estabilidad' },
              { id: 'p2', left: 'Grado IV (Subdominante)', right: 'Transición, partida y movimiento' },
              { id: 'p3', left: 'Grado V (Dominante)', right: 'Tensión máxima que pide regresar a la Tónica' }
            ],
            explanation: 'Toda la música tonal es un viaje: salimos del hogar (I), viajamos (IV), sentimos tensión (V) y regresamos a casa (I).'
          },
          {
            id: 'u8_l1_ex3',
            type: 'listen-identify',
            prompt: 'Escucha la Cadencia Perfecta: Tensión (V) que resuelve a Reposo (I):',
            audioNotes: ['G4', 'B4', 'D5'],
            playType: 'chord',
            options: [
              { id: 'opt1', text: 'Acorde Dominante (Sol Mayor / V) listo para resolver a Do' },
              { id: 'opt2', text: 'Acorde Disminuido' },
              { id: 'opt3', text: 'Acorde de descanso' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El acorde V (Sol) genera la expectativa perfecta para cerrar una frase en el I (Do).'
          },
          {
            id: 'u8_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la tónica de resolución final (C4):',
            targetPianoNote: 'C4',
            explanation: '¡Resolución completa! La tensión se disipa al llegar a la Tónica.'
          },
          {
            id: 'u8_l1_ex5',
            type: 'multiple-choice',
            prompt: '¿Cuál es la progresión de 4 acordes más usada en el pop mundial?',
            options: [
              { id: 'opt1', text: 'I - V - vi - IV (ej: Do - Sol - La menor - Fa)' },
              { id: 'opt2', text: 'I - ii - iii - IV' },
              { id: 'opt3', text: 'vii - vi - v - iv' },
              { id: 'opt4', text: 'V - V - V - V' }
            ],
            correctAnswerId: 'opt1',
            explanation: '¡I-V-vi-IV es la base de cientos de éxitos mundiales como "Let It Be", "With or Without You" o "Despacito"!'
          }
        ]
      },
      {
        id: 'u8_l2',
        unitId: 8,
        lessonNumber: 2,
        title: 'El Acorde de Séptima Dominante (V7)',
        subtitle: 'La fuerza que mueve la música tonal',
        description: 'Añadir la 7ª menor al acorde dominante crea el famoso tritono que resuelve a la tónica.',
        icon: '⚡',
        color: 'green',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u8_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Qué 4 notas componen el acorde de Sol 7 (G7)?',
            options: [
              { id: 'opt1', text: 'Sol, Si, Re, Fa (G - B - D - F)' },
              { id: 'opt2', text: 'Sol, Si, Re, Fa#' },
              { id: 'opt3', text: 'Sol, Do, Mi, Sol' },
              { id: 'opt4', text: 'Sol, La, Si, Do' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'G7 añade la séptima menor (Fa natural) sobre la tríada de Sol Mayor (Sol-Si-Re).'
          },
          {
            id: 'u8_l2_ex2',
            type: 'listen-identify',
            prompt: 'Escucha el acorde de Sol 7 (G7) y su rica tensión:',
            audioNotes: ['G4', 'B4', 'D5', 'F5'],
            playType: 'chord',
            options: [
              { id: 'opt1', text: 'Sol con Séptima Dominante (G7)' },
              { id: 'opt2', text: 'Do Mayor simple' },
              { id: 'opt3', text: 'La menor' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El intervalo entre Si y Fa es un tritono que empuja irresistiblemente hacia Do y Mi.'
          },
          {
            id: 'u8_l2_ex3',
            type: 'match-pairs',
            prompt: 'Empareja la nota de tensión de G7 con la nota de resolución en Do Mayor:',
            pairs: [
              { id: 'p1', left: 'Si (sensible en G7)', right: 'Sube medio tono a Do' },
              { id: 'p2', left: 'Fa (séptima en G7)', right: 'Baja medio tono a Mi' },
              { id: 'p3', left: 'Sol (fundamental)', right: 'Salta al Do fundamental' }
            ],
            explanation: '¡Este doble movimiento Si→Do y Fa→Mi es el mecanismo armónico fundamental de la música clásica y popular!'
          },
          {
            id: 'u8_l2_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Fa (F4), la séptima que crea la magia en G7:',
            targetPianoNote: 'F4',
            explanation: '¡Excelente! Esa nota Fa genera toda la necesidad de resolver.'
          },
          {
            id: 'u8_l2_ex5',
            type: 'multiple-choice',
            prompt: '¿Por qué se llama Séptima "Dominante"?',
            options: [
              { id: 'opt1', text: 'Porque se forma sobre el quinto grado (Dominante) de la tonalidad' },
              { id: 'opt2', text: 'Porque domina a los demás instrumentos en volumen' },
              { id: 'opt3', text: 'Porque se toca con la mano dominante' },
              { id: 'opt4', text: 'Porque fue inventada por reyes' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Al quinto grado de cualquier escala se le llama Dominante, y su acorde de séptima es el V7.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 9: MODOS Y ESCALAS MODERNAS
  // ==========================================
  {
    id: 9,
    title: 'Unidad 9: Modos Griegos y Escalas Modernas',
    subtitle: 'Pentatónica, Blues, Dórico, Mixolidio y el Tritono',
    description: 'Expande tu paleta sonora más allá del modo mayor y menor tradicional.',
    themeColor: '#e056fd',
    nodes: [
      {
        id: 'u9_l1',
        unitId: 9,
        lessonNumber: 1,
        title: 'La Escala Pentatónica',
        subtitle: '5 notas universales sin disonancia',
        description: 'La escala más antigua y versátil de la humanidad: base del rock, pop, folk y jazz.',
        icon: '🎸',
        color: 'purple',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u9_l1_ex1',
            type: 'multiple-choice',
            prompt: '¿Cuántas notas componen una escala pentatónica?',
            options: [
              { id: 'opt1', text: '5 notas' },
              { id: 'opt2', text: '7 notas' },
              { id: 'opt3', text: '8 notas' },
              { id: 'opt4', text: '12 notas' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Penta = 5. La escala pentatónica elimina los semitonos disonantes (en Do Mayor se quitan Fa y Si: Do, Re, Mi, Sol, La).'
          },
          {
            id: 'u9_l1_ex2',
            type: 'order-notes',
            prompt: 'Ordena las 5 notas de la Pentatónica Mayor de Do:',
            noteBank: ['Sol', 'Do', 'La', 'Mi', 'Re'],
            correctSequence: ['Do', 'Re', 'Mi', 'Sol', 'La'],
            explanation: 'La escala pentatónica mayor usa los grados 1, 2, 3, 5 y 6 (Do - Re - Mi - Sol - La).'
          },
          {
            id: 'u9_l1_ex3',
            type: 'listen-identify',
            prompt: 'Escucha la melodía pentatónica. ¿Por qué es tan fácil improvisar con ella?',
            audioNotes: ['C4', 'D4', 'E4', 'G4', 'A4'],
            playType: 'sequence',
            options: [
              { id: 'opt1', text: 'Porque no tiene intervalos de semitono chocantes, cualquier nota suena bien' },
              { id: 'opt2', text: 'Porque no tiene ritmo' },
              { id: 'opt3', text: 'Porque solo tiene una nota' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Al no tener semitonos (4º ni 7º grado), ninguna nota genera choque armónico áspero.'
          },
          {
            id: 'u9_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la nota Sol (G4), el 5º grado de la pentatónica:',
            targetPianoNote: 'G4',
            explanation: '¡Excelente! Las 5 teclas negras del piano forman por sí solas una escala pentatónica perfecta.'
          },
          {
            id: 'u9_l1_ex5',
            type: 'multiple-choice',
            prompt: '¿Qué nota se añade a la pentatónica menor para crear la famosa "Escala de Blues"?',
            options: [
              { id: 'opt1', text: 'La Blue Note (5ª disminuida / 4ª aumentada)' },
              { id: 'opt2', text: 'Una segunda menor' },
              { id: 'opt3', text: 'Un silencio' },
              { id: 'opt4', text: 'Una octava triple' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'La Blue Note (ej: Mib en la escala de La) añade esa tensión visceral y conmovedora característica del Blues.'
          }
        ]
      },
      {
        id: 'u9_l2',
        unitId: 9,
        lessonNumber: 2,
        title: 'Los Modos Griegos y el Tritono',
        subtitle: 'Dórico, Lidio, Mixolidio y el Diabolus in Musica',
        description: 'Viaja por los colores modales utilizados en bandas sonoras, jazz y música medieval.',
        icon: '🧙‍♂️',
        color: 'purple',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u9_l2_ex1',
            type: 'multiple-choice',
            prompt: '¿Qué es el modo Dórico (ej: tocar de Re a Re en teclas blancas)?',
            options: [
              { id: 'opt1', text: 'Una escala menor con el 6º grado elevado (Mayor), con sabor medieval/épico' },
              { id: 'opt2', text: 'Una escala sin notas' },
              { id: 'opt3', text: 'Un compás de 5/4' },
              { id: 'opt4', text: 'Una escala china' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El modo Dórico (muy usado en El Señor de los Anillos y Carlos Santana) tiene una 6ª mayor característica.'
          },
          {
            id: 'u9_l2_ex2',
            type: 'match-pairs',
            prompt: 'Empareja cada modo con su carácter distintivo:',
            pairs: [
              { id: 'p1', left: 'Modo Lidio (Fa a Fa)', right: 'Mayor con 4ª aumentada: Mágico, etéreo y espacial' },
              { id: 'p2', left: 'Modo Mixolidio (Sol a Sol)', right: 'Mayor con 7ª menor: Típico de Rock sureño y celta' },
              { id: 'p3', left: 'Modo Dórico (Re a Re)', right: 'Menor con 6ª mayor: Épico, nostálgico pero esperanzador' }
            ],
            explanation: 'Cada modo griego evoca una emoción completamente diferente utilizando las mismas notas blancas.'
          },
          {
            id: 'u9_l2_ex3',
            type: 'multiple-choice',
            prompt: '¿Por qué en la Edad Media llamaban al Tritono "Diabolus in Musica" (el diablo en la música)?',
            options: [
              { id: 'opt1', text: 'Por su extrema disonancia e inestabilidad de 3 tonos exactos (ej: Fa y Si)' },
              { id: 'opt2', text: 'Porque estaba prohibido por una ley romana' },
              { id: 'opt3', text: 'Porque rompía las cuerdas del laúd' },
              { id: 'opt4', text: 'Porque hacía llover' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El tritono (3 tonos enteros) divide la octava exactamente a la mitad, creando la máxima tensión armónica.'
          },
          {
            id: 'u9_l2_ex4',
            type: 'listen-identify',
            prompt: 'Escucha este intervalo de Tritono (Fa y Si sonando juntos):',
            audioNotes: ['F4', 'B4'],
            playType: 'chord',
            options: [
              { id: 'opt1', text: 'Tritono (Disonancia que busca resolución urgente)' },
              { id: 'opt2', text: 'Quinta Justa pacífica' },
              { id: 'opt3', text: 'Unísono' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'Esa tensión eléctrica es el motor que hace que la música occidental quiera moverse hacia adelante.'
          },
          {
            id: 'u9_l2_ex5',
            type: 'piano-play',
            prompt: 'Toca la nota Si (B4) para completar el tritono desde Fa4:',
            targetPianoNote: 'B4',
            explanation: '¡Completado! De Fa4 a Si4 hay exactamente 3 tonos (Tritono).'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIDAD 10: COMPOSICIÓN Y LECTURA AVANZADA
  // ==========================================
  {
    id: 10,
    title: 'Unidad 10: Composición, Arreglo y Lectura Avanzada',
    subtitle: 'Pregunta y Respuesta, Contrapunto y Creación de Obras',
    description: 'Integra todo lo aprendido y compone piezas musicales completas y equilibradas.',
    themeColor: '#10ac84',
    nodes: [
      {
        id: 'u10_l1',
        unitId: 10,
        lessonNumber: 1,
        title: 'Fraseo: Pregunta y Respuesta',
        subtitle: 'Antecedente y Consecuente',
        description: 'Aprende a estructurar melodías equilibradas que cuenten una historia.',
        icon: '🎼',
        color: 'green',
        totalSteps: 5,
        unlocked: false,
        completedSteps: 0,
        stars: 0,
        exercises: [
          {
            id: 'u10_l1_ex1',
            type: 'multiple-choice',
            prompt: 'En composición, ¿qué es la estructura de "Pregunta y Respuesta" (Antecedente y Consecuente)?',
            options: [
              { id: 'opt1', text: 'Una primera frase que deja la melodía en tensión (semicadencia en V) y una segunda que la resuelve a la tónica (I)' },
              { id: 'opt2', text: 'Dos cantantes haciéndose preguntas habladas' },
              { id: 'opt3', text: 'Tocar una nota fuerte y luego una suave' },
              { id: 'opt4', text: 'Un eco' }
            ],
            correctAnswerId: 'opt1',
            explanation: 'El Himno a la Alegría de Beethoven es el ejemplo perfecto: la primera mitad queda en el aire (V) y la segunda reposa en casa (I).'
          },
          {
            id: 'u10_l1_ex2',
            type: 'order-notes',
            prompt: 'Ordena las 4 notas iniciales del mítico tema del destino de Beethoven (Quinta Sinfonía):',
            noteBank: ['Sol', 'Sol', 'Mib', 'Sol'],
            correctSequence: ['Sol', 'Sol', 'Sol', 'Mib'],
            explanation: '¡Ta-ta-ta-Taaan! (Sol-Sol-Sol-Mib), el motivo más famoso de toda la historia de la música.'
          },
          {
            id: 'u10_l1_ex3',
            type: 'match-pairs',
            prompt: 'Empareja los términos compositivos con su significado:',
            pairs: [
              { id: 'p1', left: 'Motivo musical', right: 'Idea melódica o rítmica breve que se repite y transforma' },
              { id: 'p2', left: 'Frase musical', right: 'Unidad de sentido melódico equivalente a una oración hablada' },
              { id: 'p3', left: 'Modulación', right: 'Cambio fluido de una tonalidad a otra durante la obra' }
            ],
            explanation: 'Con estos 3 elementos se estructuran desde sonatas clásicas hasta canciones pop de 3 minutos.'
          },
          {
            id: 'u10_l1_ex4',
            type: 'piano-play',
            prompt: 'Toca la tónica final de cierre de toda tu carrera como estudiante (C4):',
            targetPianoNote: 'C4',
            explanation: '¡Felicidades, Maestro! Has recorrido desde la primera nota hasta los conceptos más elevados de la composición.'
          },
          {
            id: 'u10_l1_ex5',
            type: 'multiple-choice',
            prompt: '¿Cuál es la mejor manera de dominar la teoría musical?',
            options: [
              { id: 'opt1', text: 'Combinar la lectura con el oído, el piano y componer tus propias melodías en el Estudio de Composición' },
              { id: 'opt2', text: 'Solo memorizar nombres sin escuchar' },
              { id: 'opt3', text: 'Nunca tocar un teclado' },
              { id: 'opt4', text: 'Aprender solo un acorde' }
            ],
            correctAnswerId: 'opt1',
            explanation: '¡La música es un arte vivo! Experimenta, escucha, toca el piano y compone en MusicGo!'
          }
        ]
      }
    ]
  }
];
