import { FaArrowLeft } from 'react-icons/fa';
import { Button, Image, Divider } from '@nextui-org/react';
import PropTypes from 'prop-types';
import Icons from './Icons';
import '../css/homeStyles.css';
DeveloperView.propTypes = {
  imgStyleView: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  nameStyleView: PropTypes.string.isRequired,
  handleClickExit: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
function DeveloperView({
  src,
  imgStyleView,
  nameStyleView,
  name,
  handleClickExit,
  text,
}) {
  return (
    <section className=" border-3  border-rainbow  w-4/5 shadow-xl shadow-black p-2 mx-auto mt-7  rounded-xl  ">
      <div className="grid grid-cols-2 bg-gray-900/90 gap-20 rounded-lg items-center px-14 py-10">
        <div className="flex flex-col items-center ">
          <div className="mt-2">
            <h3
              className={`animation-title ${
                name && name === 'Alvaro Arboleda'
                  ? 'text-ming-500'
                  : name === 'Deivy Gallego'
                  ? 'text-red-500'
                  : 'text-jade-500 '
              } text-3xl border border-white/40 w-max px-4  py-2 rounded-md font-bold`}
              style={{ viewTransitionName: `${nameStyleView}` }}
            >
              {name}
              <Divider className={`w-14 mx-auto `} />
            </h3>
            <Divider
              className={`h-4 mx-auto animation-title`}
              orientation="vertical"
            />
          </div>

          <p
            className={`border border-white/40  text-white/80  px-5 animation-text py-3 rounded-lg animation-title text-justify text-wrap w-96`}
          >
            {text}
          </p>
          <Divider
            className={`h-4 mx-auto animation-text  `}
            orientation="vertical"
          />
          <div>
            <div>
              <h6
                className={`border animation-btn border-white/40 px-5 py-3 rounded-lg  w-max mx-auto ${
                  name && name === 'Alvaro Arboleda'
                    ? 'text-ming-500'
                    : name === 'Deivy Gallego'
                    ? 'text-red-500'
                    : 'text-jade-500'
                } text-2xl  font-semibold  animation-text  `}
              >
                Habilidades
                <Divider className="w-6 mx-auto " />
              </h6>
            </div>
            <Divider className="h-3 mx-auto " orientation="vertical" />
            <Divider className=" mx-auto " />
            <Icons name={name} />
            <Divider className=" mx-auto mt-4" />
          </div>

          <Button
            color="primary"
            className={`text-md animation-image w-2/3 mt-4 py-3 transition-transform-colors hover:scale-95 duration-1000  mx-auto  border ${
              name && name === 'Alvaro Arboleda'
                ? 'border-ming-500 hover:bg-ming-700'
                : name === 'Deivy Gallego'
                ? 'border-red-500 hover:bg-red-700'
                : 'border-jade-500 hover:bg-jade-700'
            }`}
            radius="xl"
            onClick={handleClickExit}
          >
            <FaArrowLeft />
            Volver
          </Button>
        </div>
        <Image
          src={src}
          width={700}
          height={520}
          className="w-full h-max my-auto  border-4 border-white/10  shadow-black shadow-2xl object-cover "
          style={{ viewTransitionName: `${imgStyleView}` }}
        />
      </div>
    </section>
  );
}

export default DeveloperView;
