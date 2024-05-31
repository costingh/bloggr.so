import { WebAppPage } from "@/components/templates/WebAppPage/WebAppPage";
import { Routes } from "@/config/routes";

const CreateNewBlog = () => {
  return <WebAppPage currentPage={Routes.createNewBlog} />;
};

export default CreateNewBlog;
