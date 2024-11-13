import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Divider } from '@nextui-org/react';
import '../css/animations.css';

function Developer({ img, description, name, delay, handleClick, color, bg }) {
  return (
    <article
      onClick={handleClick}
      className={` animation-devs  cursor-pointer hover:scale-95 hover:opacity-50 transition-transform duration-300    shadow-2xl shadow-black/60 bg-black/30 rounded-lg gap-7  items-center`}
    >
      <picture className="w-96 mx-auto    h-20 bg-gray-100 rounded-xl pointer-events-none">
        <img
          src={img}
          alt=""
          data-img={`img${delay}`}
          className="w-full  h-96 select-none rounded-t-lg object-cover pointer-events-none"
          style={{ viewTransitionName: `img${delay}` }}
        />
      </picture>
      <div className="pointer-events-none px-12 mt-4 ">
        <h3
          data-name={`text${delay}`}
          style={{ viewTransitionName: `text${delay}` }}
          className={`pointer-events-none  ${color} text-2xl font-bold`}
        >
          {name}
        </h3>
        <p className="pointer-events-none text-xs text-center text-white/60">
          {description}
        </p>
        <Divider className='my-3'/>
        <MdOutlineArrowForwardIos
          color="#fff"
          size={40}
          className="shadow-sm   mx-auto mb-4 pointer-events-none"
        />
      </div>
    </article>
  );
}

export default Developer;
