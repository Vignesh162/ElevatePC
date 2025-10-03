export default function PcCard(props) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
      <div className="flex flex-col w-[70vw] md:w-[30vw] h-fit rounded-2xl bg-black text-white items-center p-5">
        <img
          className="w-[90%] rounded-2xl mt-3"
          src={`${props.imgURL}`}
          alt="Compact PC"
        />
        <h2 className="w-full text-3xl font-bold text-center mt-3">
          {props.title}
        </h2>
        <button className="h-[40px] w-[40%] mt-5 mb-3 rounded-2xl bg-white text-black hover:bg-blue-600">
          Explore!
        </button>
      </div>
    </div>
  );
}
