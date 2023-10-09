import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGetProjectsQuery } from "shared/apis/projects/projectsApi";
import { ProjectStackNavigatorProps } from "shared/navigators/ProjectStackNavigator";
import useThemeImages from "assets/images";
import {
  IProjectsListData,
  IProjectsListResponse,
} from "shared/types/projects/projects.type";

const useProjects = () => {
  const { data, isError } = useGetProjectsQuery(undefined);
  const { navigate } = useNavigation<ProjectStackNavigatorProps>();
  const { DefaultProjectImage } = useThemeImages();

  let projects: IProjectsListData[] = [];

  if (data) {
    const projectsFiltered: IProjectsListResponse[] = data.data.filter(
      (item: IProjectsListResponse) => item !== null && item !== undefined
    );
    projects = projectsFiltered.map((item: IProjectsListResponse) => {
      return {
        id: item._id,
        name: item.name,
        image: item?.thumbnail?.url
          ? { uri: item.thumbnail.url }
          : DefaultProjectImage,
      };
    });
  }

  const navigateToProject = (id: string) => {
    navigate("Project", {
      id,
    });
  };

  return { projects, navigateToProject };
};

export default useProjects;
