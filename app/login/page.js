import UserAuth from "@/components/UserAuth"
export default function Home() {
    return (
        <>
            <div className=" text-center w-full bg-white " >
                <UserAuth authWork={'Login'} />
            </div>
        </>
    )
}
