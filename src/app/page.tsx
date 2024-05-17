import Mens from "@/components/Mens";
import NewProduct from "@/components/NewProduct";
import ShowCarousel from "@/components/ShowCarousel";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="">
          <ShowCarousel />
          <section className="mx-auto">
            <NewProduct />
          </section>
          <section className="">
            <Mens />
          </section>
        </main>
      </div>
    </>
  );
}
