import AccLayout from "@/components/AccLayout"

const layout = ({ children }) => {
    return (
        <div className="w-full h-full flex items-center justify-center mx-auto">
            <AccLayout  >
                {children}
            </AccLayout>
        </div>
    )
}

export default layout