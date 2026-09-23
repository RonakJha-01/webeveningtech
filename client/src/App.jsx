import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/services";
import Templates from "./sections/Templates";
// import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Services />
      <Templates />
      {/* <Contact /> */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;