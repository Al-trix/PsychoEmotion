import CardPersonalitie from './CardPersonalitie';
import amabilidad from '../../public/amabilidad.jpeg';
import extraversion from '../../public/extraversion.jpeg';
import apertura from '../../public/apertura.jpeg';
import responsabilidad from '../../public/responsabilidad.jpeg';
import neuroticismo from '../../public/neuroticismo.jpeg';

function InfoPersonalitiesHome() {
  const personalidades = [
    {
      nombre: 'Extraversión',
      color: 'bg-blue-500',
      descripcion:
        'La extraversión describe a personas que encuentran satisfacción en la interacción social y se sienten motivadas por entornos en los que pueden expresarse abiertamente. Estas personas suelen ser entusiastas, habladoras y asertivas. Les atraen actividades que involucran a otros, y se sienten cómodas en grupos grandes. También suelen ser buscadoras de emociones, disfrutando de nuevos retos y situaciones que les permitan mantenerse activos y comprometidos con el mundo que les rodea.',
      img: extraversion,
    },
    {
      nombre: 'Amabilidad',
      color: 'bg-green-500',
      descripcion:
        'La amabilidad refleja una orientación hacia la compasión, la empatía y la cooperación. Las personas con altos niveles de amabilidad suelen ser generosas, afectuosas y dispuestas a ayudar a los demás sin esperar nada a cambio. Valoran las relaciones armoniosas y tienden a evitar conflictos, priorizando la satisfacción y el bienestar de otros. Esta característica contribuye a crear una sensación de conexión y confianza en sus relaciones, ya que muestran sinceridad y tolerancia hacia diferentes perspectivas y necesidades.',
      img: amabilidad,
    },
    {
      nombre: 'Responsabilidad',
      color: 'bg-yellow-500',
      descripcion:
        'La responsabilidad describe a individuos organizados, disciplinados y orientados hacia metas específicas. Estas personas tienden a ser meticulosas y confiables, abordando cada tarea con planificación y esfuerzo continuo. Valoran la puntualidad y la precisión, y suelen cumplir con sus compromisos, tanto personales como profesionales. Suelen evitar la procrastinación y demuestran una ética de trabajo sólida, lo cual los hace personas altamente confiables. Esta característica también está relacionada con un fuerte sentido de deber y una inclinación a cumplir objetivos de largo plazo, incluso frente a desafíos o sacrificios personales.',
      img: responsabilidad,
    },
    {
      nombre: 'Apertura',
      color: 'bg-purple-500',
      descripcion:
        'La apertura se relaciona con una inclinación hacia la curiosidad intelectual, la creatividad y la receptividad a nuevas experiencias. Las personas con una alta apertura disfrutan explorando ideas, culturas y enfoques diferentes. Son imaginativas y están dispuestas a desafiar las normas establecidas para encontrar alternativas innovadoras. Esta característica también implica una alta sensibilidad estética y una inclinación hacia el arte y la apreciación de lo abstracto. La apertura facilita la adaptabilidad y una actitud abierta frente al cambio y la diversidad.',
      img: apertura,
    },
    {
      nombre: 'Neuroticismo',
      color: 'bg-red-500',
      descripcion:
        'El neuroticismo refleja la predisposición a experimentar emociones negativas como ansiedad, tristeza o frustración. Las personas con altos niveles de neuroticismo pueden tener una respuesta emocional intensa frente al estrés y suelen sentirse inseguras o preocupadas en situaciones adversas. A menudo tienen una mayor sensibilidad a la crítica y pueden sentirse abrumadas por la incertidumbre. Aunque esta característica puede ser desafiante, también puede motivar a las personas a ser más introspectivas y a trabajar en estrategias de afrontamiento para mejorar su bienestar emocional.',
      img: neuroticismo,
    },
  ];

  return (
    <section>
      {personalidades.map(({img, descripcion, nombre, color}, i) => {
        <CardPersonalitie key={i} img={img} text={descripcion} bg={color} name={nombre}/>
      })}
    </section>
  );
}

export default InfoPersonalitiesHome;
