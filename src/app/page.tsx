import Footer from "@/components/Footer";
import Mens from "@/components/Mens";
import NewProduct from "@/components/NewProduct";
import ShowCarousel from "@/components/ShowCarousel";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 h-full p-4 md:ml-40">
          <div className="overflow-hidden">
            <ShowCarousel />
          </div>
          <section className="mx-auto">
            <NewProduct />
          </section>
          <section className="">
            <Mens />
          </section>
        </main>
      </div>
      <div className="hidden md:flex bg-zinc-950">
        <Footer />
      </div>
    </>
  );
}
