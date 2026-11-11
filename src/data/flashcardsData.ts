import { Flashcard } from '../types';

export const FLASHCARDS_DECK: Flashcard[] = [
  // ==========================================
  // SÍMBOLOS MUSICALES
  // ==========================================
  {
    id: 'fc_sym_clef_g',
    category: 'simbolos',
    frontTitle: '𝄞',
    frontSubtitle: 'Símbolo al inicio del pentagrama',
    backTitle: 'Clave de Sol (G Clef)',
    backDescription: 'Fija la segunda línea como Sol4 (G4). Utilizada para melodías e instrumentos agudos: violín, flauta, trompeta, guitarra y mano derecha del piano.',
    example: 'Su espiral nace exactamente en la 2ª línea.'
  },
  {
    id: 'fc_sym_clef_f',
    category: 'simbolos',
    frontTitle: '𝄢',
    frontSubtitle: 'Símbolo con dos puntos',
    backTitle: 'Clave de Fa (F Clef)',
    backDescription: 'Fija la cuarta línea como Fa3 (F3). Utilizada para el registro grave: bajo, violonchelo, fagot, trombón y mano izquierda del piano.',
    example: 'Los dos puntos rodean la 4ª línea.'
  },
  {
    id: 'fc_sym_clef_c',
    category: 'simbolos',
    frontTitle: '𝄡',
    frontSubtitle: 'Símbolo simétrico con forma de B',
    backTitle: 'Clave de Do (C Clef)',
    backDescription: 'Fija el Do Central (C4) en la 3ª o 4ª línea. Es la clave estándar de la viola y el trombón tenor.',
    example: 'El centro de la hendidura marca la nota Do Central.'
  },
  {
    id: 'fc_sym_sharp',
    category: 'simbolos',
    frontTitle: '♯',
    frontSubtitle: 'Alteración ascendente',
    backTitle: 'Sostenido (Sharp)',
    backDescription: 'Eleva la altura de una nota exactamente un semitono cromático (medio tono hacia la derecha en el teclado).',
    example: 'Do (C) → Do sostenido (C#).'
  },
  {
    id: 'fc_sym_flat',
    category: 'simbolos',
    frontTitle: '♭',
    frontSubtitle: 'Alteración descendente',
    backTitle: 'Bemol (Flat)',
    backDescription: 'Disminuye la altura de una nota exactamente un semitono cromático (medio tono hacia la izquierda en el teclado).',
    example: 'Si (B) → Si bemol (Bb).'
  },
  {
    id: 'fc_sym_natural',
    category: 'simbolos',
    frontTitle: '♮',
    frontSubtitle: 'Restaurador de notas',
    backTitle: 'Becuadro (Natural)',
    backDescription: 'Anula el efecto de cualquier sostenido o bemol previo, devolviendo la nota a su afinación natural original.',
    example: 'Restaura Fa# o Sib a su tecla blanca natural.'
  },
  {
    id: 'fc_sym_fermata',
    category: 'simbolos',
    frontTitle: '𝄐',
    frontSubtitle: 'Punto bajo un arco',
    backTitle: 'Calderón (Fermata)',
    backDescription: 'Indica prolongar la duración de la nota o silencio más allá de su valor estricto, a gusto y expresividad del intérprete o director.',
    example: 'Muy común en la última nota de una obra sinfónica.'
  },
  {
    id: 'fc_sym_staccato',
    category: 'simbolos',
    frontTitle: '·',
    frontSubtitle: 'Punto sobre o bajo la cabeza de la nota',
    backTitle: 'Staccato (Picado)',
    backDescription: 'Indica tocar la nota de forma corta, ligera y separada de la siguiente, recortando aproximadamente la mitad de su valor.',
    example: 'Sensación de paso saltarín o gotas de lluvia.'
  },
  {
    id: 'fc_sym_accent',
    category: 'simbolos',
    frontTitle: '>',
    frontSubtitle: 'Cuña sobre o bajo la nota',
    backTitle: 'Acento (Marcato)',
    backDescription: 'Indica atacar esa nota con mayor intensidad, fuerza y énfasis que las circundantes.',
    example: 'Destaca notas clave dentro de la melodía.'
  },
  {
    id: 'fc_sym_tenuto',
    category: 'simbolos',
    frontTitle: '—',
    frontSubtitle: 'Línea horizontal sobre la nota',
    backTitle: 'Tenuto',
    backDescription: 'Indica sostener la nota durante toda su duración completa con un peso uniforme y ligero peso expresivo.',
    example: 'Tocar la nota con valor pleno sin cortarla.'
  },
  {
    id: 'fc_sym_repeat',
    category: 'simbolos',
    frontTitle: '𝄆 ... 𝄇',
    frontSubtitle: 'Doble barra con dos puntos',
    backTitle: 'Barra de Repetición',
    backDescription: 'Indica que el fragmento musical encerrado entre las barras debe ejecutarse dos veces antes de continuar.',
    example: 'Ahorra espacio en partituras al evitar reescribir secciones.'
  },
  {
    id: 'fc_sym_coda',
    category: 'simbolos',
    frontTitle: '𝄌',
    frontSubtitle: 'Círculo con cruz interna',
    backTitle: 'Coda (Cola / Final)',
    backDescription: 'Símbolo de navegación que marca la sección final o desenlace de una composición musical tras realizar un salto.',
    example: 'Usado tras "Al Coda" para saltar al final de la obra.'
  },
  {
    id: 'fc_sym_segno',
    category: 'simbolos',
    frontTitle: '𝄋',
    frontSubtitle: 'S estilizada con puntos y barra',
    backTitle: 'Dal Segno (D.S.)',
    backDescription: 'Instrucción que indica al músico volver al punto de la partitura marcado con el signo 𝄋 y continuar desde allí.',
    example: 'D.S. al Fine = Volver al signo y terminar en "Fine".'
  },

  // ==========================================
  // RITMO Y FIGURAS
  // ==========================================
  {
    id: 'fc_rit_whole',
    category: 'ritmo',
    frontTitle: '𝅝',
    frontSubtitle: 'Óvalo hueco sin plica',
    backTitle: 'Redonda (Whole note)',
    backDescription: 'La figura de mayor valor regular en la notación común. Dura 4 tiempos completos en compás de 4/4.',
    example: '1 Redonda = 2 Blancas = 4 Negras = 8 Corcheas.'
  },
  {
    id: 'fc_rit_half',
    category: 'ritmo',
    frontTitle: '𝅗𝅥',
    frontSubtitle: 'Óvalo blanco con barra vertical (plica)',
    backTitle: 'Blanca (Half note)',
    backDescription: 'Figura que dura 2 tiempos en compás de 4/4. Equivale a la mitad de una redonda.',
    example: 'Dura 2 pulsos del metrónomo.'
  },
  {
    id: 'fc_rit_quarter',
    category: 'ritmo',
    frontTitle: '𝅘𝅥',
    frontSubtitle: 'Óvalo relleno negro con plica',
    backTitle: 'Negra (Quarter note)',
    backDescription: 'Unidad de pulso fundamental en compases de 4/4, 3/4 y 2/4. Dura exactamente 1 tiempo.',
    example: '1 Negra = 1 segundo a 60 BPM.'
  },
  {
    id: 'fc_rit_eighth',
    category: 'ritmo',
    frontTitle: '𝅘𝅥𝅮',
    frontSubtitle: 'Cabeza negra con plica y un corchete',
    backTitle: 'Corchea (Eighth note)',
    backDescription: 'Figura que dura medio tiempo (1/2 tiempo en 4/4). Dos corcheas equivalen a una negra.',
    example: 'Dos corcheas suelen agruparse con una barra horizontal superior.'
  },
  {
    id: 'fc_rit_sixteenth',
    category: 'ritmo',
    frontTitle: '𝅘𝅥𝅯',
    frontSubtitle: 'Cabeza negra con dos corchetes',
    backTitle: 'Semicorchea (Sixteenth note)',
    backDescription: 'Figura que dura un cuarto de tiempo (1/4 de tiempo en 4/4). Cuatro semicorcheas forman un pulso de negra.',
    example: 'Se cuentan verbalmente como: "ti-ki-ti-ki" por cada tiempo.'
  },
  {
    id: 'fc_rit_rest_whole',
    category: 'ritmo',
    frontTitle: '𝄻',
    frontSubtitle: 'Rectángulo colgando de la 4ª línea',
    backTitle: 'Silencio de Redonda',
    backDescription: 'Indica 4 tiempos completos de silencio o la pausa de un compás entero.',
    example: 'Tiene forma de sombrero boca abajo.'
  },
  {
    id: 'fc_rit_rest_half',
    category: 'ritmo',
    frontTitle: '𝄼',
    frontSubtitle: 'Rectángulo apoyado sobre la 3ª línea',
    backTitle: 'Silencio de Blanca',
    backDescription: 'Indica exactamente 2 tiempos de silencio en compás de 4/4.',
    example: 'Tiene forma de sombrero colocado normalmente.'
  },
  {
    id: 'fc_rit_rest_quarter',
    category: 'ritmo',
    frontTitle: '𝄽',
    frontSubtitle: 'Símbolo en forma de rayo o Z con cola',
    backTitle: 'Silencio de Negra',
    backDescription: 'Indica una pausa de exactamente 1 tiempo de duración.',
    example: 'Un pulso completo sin sonido.'
  },
  {
    id: 'fc_rit_rest_eighth',
    category: 'ritmo',
    frontTitle: '𝄾',
    frontSubtitle: 'Similar al número 7 con una bolita',
    backTitle: 'Silencio de Corchea',
    backDescription: 'Indica una pausa de medio tiempo (1/2 tiempo).',
    example: 'Muy usado en música bailable para síncopas y contratiempos.'
  },
  {
    id: 'fc_rit_dot',
    category: 'ritmo',
    frontTitle: '𝅘𝅥 .',
    frontSubtitle: 'Punto a la derecha de cualquier figura',
    backTitle: 'El Puntillo',
    backDescription: 'Añade a la nota la mitad exacta de su valor original.',
    example: 'Blanca (2T) + Puntillo = 3T. Negra (1T) + Puntillo = 1.5T.'
  },
  {
    id: 'fc_rit_triplet',
    category: 'ritmo',
    frontTitle: '3',
    frontSubtitle: 'Grupo de 3 figuras bajo un corchete con el número 3',
    backTitle: 'Tresillo (Triplet)',
    backDescription: 'Grupo de valoración especial que introduce 3 notas en el espacio donde normalmente cabrían solo 2.',
    example: 'Tresillo de corcheas = 3 notas que duran 1 tiempo de negra.'
  },
  {
    id: 'fc_rit_syncopation',
    category: 'ritmo',
    frontTitle: 'Síncopa',
    frontSubtitle: 'Efecto rítmico dinámico',
    backTitle: 'La Síncopa Musical',
    backDescription: 'Fenómeno donde una nota comienza en un tiempo débil o subdivisión y se prolonga sobre el tiempo fuerte siguiente.',
    example: 'Es el alma del Funk, Jazz, Reggae, Salsa y Rock.'
  },

  // ==========================================
  // TÉRMINOS ITALIANOS Y DINÁMICAS
  // ==========================================
  {
    id: 'fc_term_allegro',
    category: 'terminos',
    frontTitle: 'Allegro',
    frontSubtitle: 'Término de Tempo en italiano',
    backTitle: 'Rápido, animado y brillante',
    backDescription: 'Velocidad enérgica entre 120 y 156 pulsos por minuto (BPM). Transmite alegría y dinamismo.',
    example: 'Movimientos iniciales de conciertos de Mozart o Vivaldi.'
  },
  {
    id: 'fc_term_adagio',
    category: 'terminos',
    frontTitle: 'Adagio',
    frontSubtitle: 'Término de Tempo en italiano',
    backTitle: 'Lento, solemne y reposado',
    backDescription: 'Velocidad pausada y expresiva entre 66 y 76 BPM.',
    example: 'Famoso Adagio de Albinoni o Adagio para Cuerdas de Barber.'
  },
  {
    id: 'fc_term_andante',
    category: 'terminos',
    frontTitle: 'Andante',
    frontSubtitle: 'Término de Tempo en italiano',
    backTitle: 'A paso de caminata',
    backDescription: 'Tempo moderadamente tranquilo y fluido, entre 76 y 108 BPM (el paso natural de una persona caminando).',
    example: 'Ni muy rápido ni muy lento, con melodía cantabile.'
  },
  {
    id: 'fc_term_presto',
    category: 'terminos',
    frontTitle: 'Presto',
    frontSubtitle: 'Término de Tempo en italiano',
    backTitle: 'Muy rápido y vertiginoso',
    backDescription: 'Velocidad de gran agilidad y virtuosismo, entre 168 y 200 BPM.',
    example: 'Finales de sinfonías de Beethoven o música de persecución.'
  },
  {
    id: 'fc_term_piano',
    category: 'terminos',
    frontTitle: 'p (Piano)',
    frontSubtitle: 'Dinámica de intensidad',
    backTitle: 'Suave / Volumen bajo',
    backDescription: 'Indica ejecutar el pasaje con suavidad y delicadeza. El instrumento "piano" se llama así por "pianoforte" (suave y fuerte).',
    example: 'pp = Pianissimo (muy suave).'
  },
  {
    id: 'fc_term_forte',
    category: 'terminos',
    frontTitle: 'f (Forte)',
    frontSubtitle: 'Dinámica de intensidad',
    backTitle: 'Fuerte / Volumen potente',
    backDescription: 'Indica tocar con vigor, cuerpo y volumen sonoro elevado.',
    example: 'ff = Fortissimo (extremadamente fuerte).'
  },
  {
    id: 'fc_term_crescendo',
    category: 'terminos',
    frontTitle: '< (Crescendo)',
    frontSubtitle: 'Regulador que se abre hacia la derecha',
    backTitle: 'Aumentando gradualmente el volumen',
    backDescription: 'Indica pasar de un sonido suave a uno progresivamente más potente y emocionante.',
    example: 'Genera expectación y clímax musical.'
  },
  {
    id: 'fc_term_diminuendo',
    category: 'terminos',
    frontTitle: '> (Diminuendo / Decrescendo)',
    frontSubtitle: 'Regulador que se cierra hacia la derecha',
    backTitle: 'Disminuyendo gradualmente el volumen',
    backDescription: 'Indica ir atenuando la intensidad del sonido hasta extinguirse suavemente.',
    example: 'Ideal para finales conmovedores y desvanecimientos.'
  },
  {
    id: 'fc_term_accelerando',
    category: 'terminos',
    frontTitle: 'accel. (Accelerando)',
    frontSubtitle: 'Variación de tempo',
    backTitle: 'Acelerando la velocidad',
    backDescription: 'Indica ir aumentando el tempo progresivamente para generar euforia o urgencia.',
    example: 'Como un tren ganando velocidad.'
  },
  {
    id: 'fc_term_ritardando',
    category: 'terminos',
    frontTitle: 'rit. (Ritardando / Rallentando)',
    frontSubtitle: 'Variación de tempo',
    backTitle: 'Frenando / Retardando la velocidad',
    backDescription: 'Indica disminuir gradualmente la velocidad para preparar una cadencia o final de frase.',
    example: 'Típico frenado al final de una balada antes del último acorde.'
  },
  {
    id: 'fc_term_legato',
    category: 'terminos',
    frontTitle: 'Legato',
    frontSubtitle: 'Articulación musical',
    backTitle: 'Ligado / Sin separación',
    backDescription: 'Indica interpretar las notas conectadas de manera continua y fluida, sin silencios perceptibles entre ellas.',
    example: 'Se representa con una ligadura de expresión sobre las notas.'
  },

  // ==========================================
  // NOTAS Y PENTAGRAMA
  // ==========================================
  {
    id: 'fc_not_middle_c',
    category: 'notas',
    frontTitle: 'Do Central (C4)',
    frontSubtitle: 'La nota de referencia del piano',
    backTitle: 'C4 (261.6 Hz)',
    backDescription: 'Se ubica en la primera línea adicional inferior en Clave de Sol y en la primera línea adicional superior en Clave de Fa.',
    example: 'Es la tecla blanca situada al centro del teclado de 88 notas.'
  },
  {
    id: 'fc_not_a440',
    category: 'notas',
    frontTitle: 'La 440 Hz (A4)',
    frontSubtitle: 'El diapasón universal',
    backTitle: 'Segundo espacio en Clave de Sol',
    backDescription: 'Estándar internacional de afinación desde 1939. Cuando una orquesta afina, el oboe toca esta nota para todos.',
    example: 'Vibra exactamente a 440 oscilaciones por segundo.'
  },
  {
    id: 'fc_not_treble_lines',
    category: 'notas',
    frontTitle: 'Líneas en Clave de Sol',
    frontSubtitle: '5 alturas de abajo hacia arriba',
    backTitle: 'Mi - Sol - Si - Re - Fa',
    backDescription: 'Las 5 líneas corresponden a E4, G4, B4, D5, F5.',
    example: '1ª línea Mi4, 2ª Sol4, 3ª Si4, 4ª Re5, 5ª Fa5.'
  },
  {
    id: 'fc_not_treble_spaces',
    category: 'notas',
    frontTitle: 'Espacios en Clave de Sol',
    frontSubtitle: '4 alturas de abajo hacia arriba',
    backTitle: 'Fa - La - Do - Mi (FACE)',
    backDescription: 'Los 4 espacios corresponden a F4, A4, C5, E5.',
    example: 'Fácil de recordar con la palabra en inglés FACE.'
  },
  {
    id: 'fc_not_bass_lines',
    category: 'notas',
    frontTitle: 'Líneas en Clave de Fa',
    frontSubtitle: '5 alturas en el registro grave',
    backTitle: 'Sol - Si - Re - Fa - La',
    backDescription: 'Las 5 líneas de Clave de Fa corresponden a G2, B2, D3, F3, A3.',
    example: 'La 4ª línea es Fa3, donde se ubica la clave.'
  },
  {
    id: 'fc_not_bass_spaces',
    category: 'notas',
    frontTitle: 'Espacios en Clave de Fa',
    frontSubtitle: '4 alturas en el registro grave',
    backTitle: 'La - Do - Mi - Sol',
    backDescription: 'Los 4 espacios de Clave de Fa corresponden a A2, C3, E3, G3.',
    example: 'Abarca el rango fundamental de la mano izquierda y bajo.'
  },

  // ==========================================
  // INTERVALOS Y ESCALAS
  // ==========================================
  {
    id: 'fc_int_unison',
    category: 'intervalos',
    frontTitle: 'Unísono',
    frontSubtitle: 'Distancia de 0 semitonos',
    backTitle: 'La misma nota idéntica',
    backDescription: 'Dos instrumentos o voces emitiendo exactamente la misma frecuencia sonora a la vez.',
    example: 'Dos personas cantando Do4 al mismo tiempo.'
  },
  {
    id: 'fc_int_semitone',
    category: 'intervalos',
    frontTitle: 'Segunda Menor (2m)',
    frontSubtitle: 'Distancia de 1 semitono',
    backTitle: 'El intervalo más tenso y disonante',
    backDescription: 'Separación de medio tono (ej: Mi a Fa, o Do a Do#). Es el famoso tema de la película "Tiburón" (Jaws).',
    example: 'Máxima tensión de proximidad.'
  },
  {
    id: 'fc_int_major_second',
    category: 'intervalos',
    frontTitle: 'Segunda Mayor (2M)',
    frontSubtitle: 'Distancia de 1 tono entero (2 semitonos)',
    backTitle: 'Un paso de escala natural',
    backDescription: 'La distancia entre Do y Re, o entre Fa y Sol. Base del movimiento melódico gradual.',
    example: 'Primeras dos notas de "Cumpleaños Feliz".'
  },
  {
    id: 'fc_int_minor_third',
    category: 'intervalos',
    frontTitle: 'Tercera Menor (3m)',
    frontSubtitle: 'Distancia de 3 semitonos (1.5 tonos)',
    backTitle: 'El intervalo melancólico',
    backDescription: 'De Do a Mi bemol, o de La a Do. Da el carácter nostálgico e íntimo a los acordes menores.',
    example: 'Comienzo de "Smoke on the Water" o llamada infantil "So-Sol-Mi".'
  },
  {
    id: 'fc_int_major_third',
    category: 'intervalos',
    frontTitle: 'Tercera Mayor (3M)',
    frontSubtitle: 'Distancia de 4 semitonos (2 tonos)',
    backTitle: 'El intervalo luminoso y alegre',
    backDescription: 'De Do a Mi natural. Define la estabilidad y optimismo de los acordes mayores.',
    example: 'Primeras dos notas del tema de "La Primavera" de Vivaldi.'
  },
  {
    id: 'fc_int_perfect_fourth',
    category: 'intervalos',
    frontTitle: 'Cuarta Justa (4J)',
    frontSubtitle: 'Distancia de 5 semitonos (2.5 tonos)',
    backTitle: 'Intervalo noble y abierto',
    backDescription: 'De Do a Fa, o de Sol a Do. Muy común en himnos y marchas militares.',
    example: 'Inicio de "La Marcha Nupcial" de Wagner o el himno nacional.'
  },
  {
    id: 'fc_int_tritone',
    category: 'intervalos',
    frontTitle: 'El Tritono (4ª Aum / 5ª Dis)',
    frontSubtitle: 'Distancia exacta de 3 tonos enteros (6 semitonos)',
    backTitle: 'Diabolus in Musica',
    backDescription: 'El intervalo más tenso del sistema tonal. Divide la octava a la mitad exacta (ej: Do a Fa#, o Si a Fa).',
    example: 'Inicio del tema de "Los Simpson" o el tema de Black Sabbath.'
  },
  {
    id: 'fc_int_perfect_fifth',
    category: 'intervalos',
    frontTitle: 'Quinta Justa (5J)',
    frontSubtitle: 'Distancia de 7 semitonos (3.5 tonos)',
    backTitle: 'La consonancia perfecta',
    backDescription: 'De Do a Sol. Es el intervalo más puro y estable tras la octava. Base del ciclo de quintas y afinar violines.',
    example: 'La fanfarria heroica de Star Wars o 2001 Odisea del Espacio.'
  },
  {
    id: 'fc_int_octave',
    category: 'intervalos',
    frontTitle: 'Octava Justa (8J)',
    frontSubtitle: 'Distancia de 12 semitonos (6 tonos)',
    backTitle: 'La misma nota al doble de frecuencia',
    backDescription: 'De Do4 a Do5. La frecuencia exacta se multiplica por 2 (de 261 Hz a 523 Hz), sonando como la misma nota pero más aguda.',
    example: 'Primeras dos notas de "Somewhere Over the Rainbow".'
  },

  // ==========================================
  // ARMONÍA Y ACORDES
  // ==========================================
  {
    id: 'fc_arm_major_triad',
    category: 'armonia',
    frontTitle: 'Tríada Mayor (C)',
    frontSubtitle: 'Fundamental + 3ª Mayor + 5ª Justa',
    backTitle: 'Acorde Mayor (ej: Do - Mi - Sol)',
    backDescription: 'Estructura de 4 semitonos + 3 semitonos. Genera una sonoridad abierta, positiva, firme y brillante.',
    example: 'Do (C) = C - E - G.'
  },
  {
    id: 'fc_arm_minor_triad',
    category: 'armonia',
    frontTitle: 'Tríada Menor (Cm)',
    frontSubtitle: 'Fundamental + 3ª Menor + 5ª Justa',
    backTitle: 'Acorde Menor (ej: Do - Mib - Sol)',
    backDescription: 'Estructura de 3 semitonos + 4 semitonos. Al bajar la tercera medio tono se transforma en un color melancólico e introspectivo.',
    example: 'La menor (Am) = A - C - E.'
  },
  {
    id: 'fc_arm_dominant_seventh',
    category: 'armonia',
    frontTitle: 'Acorde de 7ª Dominante (V7)',
    frontSubtitle: 'Tríada Mayor + 7ª Menor',
    backTitle: 'Acorde con Máxima Tensión Resolutiva',
    backDescription: 'En tonalidad de Do, es Sol 7 (G7 = Sol-Si-Re-Fa). Contiene un tritono entre Si y Fa que exige resolver a Do y Mi.',
    example: 'G7 empuja con fuerza para resolver en C.'
  },
  {
    id: 'fc_arm_degrees',
    category: 'armonia',
    frontTitle: 'Grados Tonales (I - IV - V)',
    frontSubtitle: 'Los 3 pilares de la armonía',
    backTitle: 'Tónica, Subdominante y Dominante',
    backDescription: 'I (Do) es el hogar de reposo; IV (Fa) es la partida y movimiento; V (Sol) es la tensión que pide volver al hogar.',
    example: 'Base de toda la música clásica, folk, blues y pop.'
  },
  {
    id: 'fc_arm_four_chords',
    category: 'armonia',
    frontTitle: 'I - V - vi - IV',
    frontSubtitle: 'La progresión más exitosa del pop',
    backTitle: 'Do → Sol → La menor → Fa',
    backDescription: 'Secuencia armónica utilizada en cientos de canciones mundiales: "Let It Be", "With or Without You", "Don\'t Stop Believin\'", etc.',
    example: 'Tónica (I), Dominante (V), Relativa menor (vi), Subdominante (IV).'
  },
  {
    id: 'fc_arm_cadence',
    category: 'armonia',
    frontTitle: 'Cadencia Perfecta (V → I)',
    frontSubtitle: 'El punto final en la música',
    backTitle: 'Resolución de Dominante a Tónica',
    backDescription: 'Equivale al punto y final de una oración en el lenguaje hablado. Brinda la sensación definitiva de descanso y conclusión.',
    example: 'Sol Mayor (o G7) resolviendo en Do Mayor.'
  }
];
