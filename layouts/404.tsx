import NotFound from "@/components/partials/404";
import Base from "@/layouts/BaseLayout";
import { getRegularPage } from "@/lib/contentParser";

const notFound = ({ data }) => {
    return (
        <Base>
            <NotFound data={data} />
        </Base>
    );
};

// get 404 page data
export const getStaticProps = async () => {
    const notFoundData = await getRegularPage("404");
    return {
        props: {
            data: notFoundData,
        },
    };
};

export default notFound;
