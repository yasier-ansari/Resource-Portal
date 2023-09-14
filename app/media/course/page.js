'use client'
import HeroSection from "@/components/Resources/HeroSection";
import { usePathname } from "next/navigation";
import Video from '@/public/images/video.jpg'
export default function Page() {
    const router = usePathname()
    return (
        <div className="min-h-[80vh] w-full text-center h-full  " >
            <HeroSection para={"A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts"} urlPath={router} Src={Video} />
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi quaerat libero ad voluptatum, aspernatur est incidunt sit culpa temporibus, animi voluptas quasi corporis quo dolor, quas voluptate. Magnam, fuga.
                Dolor reiciendis facere distinctio impedit dignissimos minima nam assumenda ex quo deserunt. Molestias, laboriosam odit laudantium natus accusamus eaque temporibus ipsa veniam sint tempora corrupti repellat vel porro aliquam! Sunt?
                Distinctio, sint voluptates. Culpa ad neque sit maiores libero, et facilis earum esse ab quae ut perspiciatis dolor nam modi aliquid molestiae odio iure, eum, sunt temporibus quasi! Soluta, placeat.
                Alias culpa temporibus odit dignissimos quod aperiam molestiae quibusdam odio saepe, possimus repellat rerum sit. Non architecto officia ea est dicta suscipit quidem, laborum quas, cum assumenda eligendi nobis ex.
                Sunt aliquid fugiat atque dolore quae modi odio non totam, quo quos voluptas dolorem tempora libero quasi blanditiis dolor ab ad quibusdam doloribus quaerat itaque? Recusandae similique dolor a voluptate!
                Doloremque, voluptatum. Praesentium, itaque suscipit? Cupiditate ut tempora neque quo. Cumque sequi adipisci magnam amet animi libero exercitationem quos ratione nemo impedit in, minus, pariatur quisquam, iusto natus nulla minima?
                Quam modi nulla dicta voluptate eaque odit distinctio minima aliquam repellendus rerum assumenda sed labore quod vitae, accusantium molestias porro cum qui nobis ad cumque, consequuntur nostrum natus! Dolorum, enim!
                Doloremque eius voluptas, veniam repudiandae unde nesciunt consequatur numquam rem quaerat iste a debitis quam explicabo quis quasi nulla inventore id aliquam aliquid magnam. Iusto totam nobis quasi neque atque.
                Possimus illum officiis obcaecati eaque nisi a aliquam repellendus odit asperiores vel maxime deserunt iste, labore debitis deleniti molestiae ratione repudiandae ullam, assumenda ipsam, nam earum necessitatibus rem. Suscipit, praesentium.
                Minima est possimus in quod, vel iste rem voluptates unde voluptatem odio dicta quia soluta nisi illum maiores dolores enim neque praesentium facilis exercitationem. Aliquam, maxime unde. Nisi, laboriosam quos.
            </div>
        </div>
    )
}