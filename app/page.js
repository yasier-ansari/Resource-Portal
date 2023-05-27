import IndexPage from "@/components/IndexPage"
export default function Home() {
  // const getCache = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("AltData")) : null;
  // const setCache = (value) => typeof window !== 'undefined' ? localStorage.setItem("AltData", JSON.stringify({ data: value, timestamp: new Date().getTime() })) : null;
  return (
    <>
      <div className="  text-center mx-auto pt-8 md:pt-16  " >
        <IndexPage />
      </div>
    </>
  )
}
