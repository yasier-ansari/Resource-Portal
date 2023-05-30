import ResourceBlog from "@/components/ResourcePage";
import { getData, getPaths } from "@/util/promise";
import { useRouter } from "next/navigation";

export default async function Page({ params: { slug } }) {
    const data = await getData(slug);

    return (
        <div className="font-urban">
            <ResourceBlog data={data} />
        </div>
    );
}

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const data = await getData(slug);
    let infoUrl = `https://localhost:3000/resource/${slug}`

    return {
        title: data[0].title,
        openGraph: {
            title: data[0].title,
            description: data[0].subTitle,
            url: infoUrl,
            image: '../../../public/blo.jpg'
        },
        description: data[0].subTitle,
        keywords: data[0].tags,
        siteName: 'www.yasier.in',
        locale: 'en-US',
    };
}

export async function generateStaticParams() {
    const infoData = await getPaths();

    return infoData?.map((info) => ({
        slug: info.title.replace(/\s+/g, "-"),
    }));
}

