import ResourceBlog from "@/components/ResourcePage";
import { db } from '@/util/firebase/config'
import { getData, getPaths } from "@/util/promise";

export default async function Page({ params: { slug } }) {
    const data = await getData(slug);
    return (
        <>
            <ResourceBlog data={data} />
        </>
    );
}

export async function generateStaticParams() {
    const infoData = await getPaths();
    // Generate params for each title in the collection
    return infoData?.map((info) => ({
        slug: info.title.replace(/\s+/g, "-"),
    }));
}

// export async function getStaticPaths() {
//     const paths = await generateStaticParams();

//     return {
//         paths,
//         fallback: false,
//     };
// }
