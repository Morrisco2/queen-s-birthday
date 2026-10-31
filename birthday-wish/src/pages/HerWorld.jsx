
import Introduction from "./Sections/Introduction";
import LittleThings from "./Sections/LittleThings";
import LoveMessage from "./Sections/LoveMessage";

const HerWorld = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF8F5]">
      <Introduction />
      <LittleThings />
      <LoveMessage />
    </main>
  );
};

export default HerWorld;
