import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from 'swiper/modules';
import 'swiper/css';
function InfoPersonalyties() {
  const personallyties = [
    {
      nombre: 'Extraversion',
      titulo: 'Extraversion: La Energía de la Sociabilidad',
      significado:
        'Muestra cuán sociable, activa y orientada a la interacción es una persona.',
      alto: 'Tiende a buscar el contacto social y disfruta de ambientes dinámicos.',
      bajo: 'Refleja una inclinación hacia la introspección y preferencia por actividades individuales.',
      color: 'bg-blue-600/70', // Azul para representar energía y sociabilidad
    },
    {
      nombre: 'Amabilidad',
      titulo: 'Amabilidad: La Amabilidad en las Relaciones',
      significado:
        'Mide la capacidad de una persona para ser empática, confiada y cooperativa.',
      alto: 'Indica una inclinación a ser considerado y afectuoso, facilitando relaciones armoniosas.',
      bajo: 'Puede describir a alguien más crítico, competitivo o escéptico, características valiosas en ciertos contextos.',
      color: 'bg-green-600/70', // Verde para simbolizar amabilidad y empatía
    },
    {
      nombre: 'Responsabilidad',
      titulo: 'Responsabilidad: La Estructura y la Organización',
      significado:
        'Mide el nivel de organización, disciplina y orientación a metas.',
      alto: 'Indica ser meticuloso, planificador y confiable, asociado con la responsabilidad.',
      bajo: 'Sugiere mayor flexibilidad y espontaneidad, a menudo relacionado con adaptabilidad.',
      color: 'bg-yellow-600/70', // Amarillo para reflejar organización y claridad
    },
    {
      nombre: 'Apertura',
      titulo: 'Apertura: La Apertura a Nuevas Experiencias',
      significado: 'Mide la curiosidad y la disposición a probar cosas nuevas.',
      alto: 'Indica mentalidad abierta, creatividad y búsqueda de aprendizaje e innovación.',
      bajo: 'Refleja preferencia por la rutina y mayor valoración de lo conocido y tradicional.',
      color: 'bg-purple-600/70', // Púrpura para representar creatividad e innovación
    },
    {
      nombre: 'Neuroticismo',
      titulo: 'Neuroticismo: La Sensibilidad Emocional',
      significado:
        'Describe la estabilidad emocional y susceptibilidad al estrés.',
      alto: 'Indica sensibilidad emocional pronunciada, vulnerabilidad a la ansiedad.',
      bajo: 'Sugiere estabilidad emocional, resiliencia y menor afectación por el estrés.',
      color: 'bg-red-600/70', // Rojo para simbolizar la intensidad emocional
    },
  ];

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      initialSlide={2}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 10,
        modifier: 2,
        slideShadows: true,
      }}
      spaceBetween={10}
      autoplay={{
        delay: 3600,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
      className="flex border-b border-white/60 my-20 mySwiper animation-up w-full shadow-2xl px-10 shadow-black py-10 rounded-full"
    >
      {personallyties.map((item, i) => (
        <SwiperSlide key={i}>
          <Card
            className={`text-center px-8 pb-6  pt-4 ${item.color} border border-white/40 shadow-white/10 shadow-xl`}
          >
            <CardHeader className="flex gap-1  flex-col items-center w-full justify-center">
              <h2 className="text-lg font-medium border px-4 py-1 rounded-lg shadow-lg shadow-black/60">
                {item.titulo}
              </h2>
              <span className=" w-px   bg-white/40 h-3 mx-auto flex "></span>

              <p className="text-base w-11/12 text-white/90 ">
                {item.significado}
              </p>
            </CardHeader>
            <Divider className="w-11/12 mx-auto bg-white/40" />
            <CardBody className="flex gap-1  mt-2 flex-col  justify-center ">
              <h4 className="text-xl font-medium">
                Fortalezas y Tendencias Personales
              </h4>
              <Divider className="w-16  bg-white/40" />

              <div className="grid grid-cols-2 mt-4 mx-auto gap-2 items-center  justify-center">
                <div className="shadow-xl bg-black/40 rounded-xl shadow-black/70 px-4 py-3">
                  <h3 className="mb-2  text-lg  font-semibold text-center">
                    {item.nombre}-
                    <span className="border border-white/40 px-2 rounded-full py-1">
                      Bajo
                    </span>
                  </h3>
                  <Divider className="mx-auto bg-white/40" />
                  <p className="text-justify mt-1 text-white/70">{item.bajo}</p>
                </div>

                <div className="shadow-xl bg-black/40 rounded-xl shadow-black/70 px-4 py-3">
                  <h3 className="mb-2  text-lg  font-semibold text-center">
                    {item.nombre}-
                    <span className="border border-white/40 px-2 rounded-full py-1">
                      Alto
                    </span>
                  </h3>
                  <Divider className="mx-auto bg-white/40" />
                  <p className="text-justify mt-1 text-white/70">{item.alto}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default InfoPersonalyties;
