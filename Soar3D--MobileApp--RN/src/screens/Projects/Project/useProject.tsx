import { useNavigation } from "@react-navigation/native";
import useThemeImages from "assets/images";
import { useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { useGetProjectByIdQuery } from "shared/apis/projects/projectsApi";
import { tabBarStyles } from "shared/navigators/BottomStack";
import { ProjectStackNavigatorProps } from "shared/navigators/ProjectStackNavigator";
import { IFolderList } from "shared/types/folders/folders.type";
import { IMyScansList } from "shared/types/myScans/myScans.type";

type ScanItems = {
  thumbnail: ImageSourcePropType;
  name: string;
  id: string;
};

const UNASSIGNED_SCANS = "Unassigned Scans";

const useProject = (id: string) => {
  const { data, isLoading, isError } = useGetProjectByIdQuery(id);
  const navigation = useNavigation<ProjectStackNavigatorProps>();
  const { navigate, setOptions } = navigation;

  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [scans, setScans] = useState<Record<string, ScanItems[]>>({});
  const [activeFolderKey, setActiveFolderKey] =
    useState<string>(UNASSIGNED_SCANS);
  const [scansData, setScansData] = useState<Record<string, IMyScansList[]>>(
    {}
  );

  const { DefaultScanImage } = useThemeImages();

  const showBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        ...tabBarStyles,
      },
    });
  };

  const hideBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    setOptions({ headerTitle: data.data.name });
    const { unassigned_scans, folders } = data.data;
    const filteredFolder: IFolderList[] = folders.filter(
      (item: IFolderList) => item !== undefined && item !== null
    );
    const folderNames = [
      ...filteredFolder.map((folder: IFolderList) => folder.name),
      UNASSIGNED_SCANS,
    ];
    setFolderNames(folderNames);
    setActiveFolderKey(folderNames[0]);

    const scans: Record<string, ScanItems[]> = {};
    const scansData: Record<string, IMyScansList[]> = {};

    folders.forEach((folder: IFolderList, index: number) => {
      if (folder === undefined && folder === null) return;
      const folderName = folderNames[index];
      scans[folderName] = [];
      scansData[folderName] = [];

      folder.scans.forEach((scan: IMyScansList) => {
        if (scan === undefined && scan === null) return;
        const thumbnail = scan.input_videos[0]?.thumbnail;
        scans[folderName].push({
          thumbnail: thumbnail ? { uri: thumbnail } : DefaultScanImage,
          name: scan.scan_name,
          id: scan._id,
        });
        scansData[folderName].push(scan);
      });
    });

    const unassignedScansIndex = folderNames.length - 1;
    scans[folderNames[unassignedScansIndex]] = [];
    scansData[folderNames[unassignedScansIndex]] = [];

    unassigned_scans.forEach((scan: IMyScansList) => {
      if (scan === undefined && scan === null) return;
      const thumbnail = scan.input_videos[0]?.thumbnail;
      scans[folderNames[unassignedScansIndex]].push({
        thumbnail: thumbnail ? { uri: thumbnail } : DefaultScanImage,
        name: scan.scan_name,
        id: scan._id,
      });
      scansData[folderNames[unassignedScansIndex]].push(scan);
    });

    setScans(scans);
    setScansData(scansData);
  }, [data]);

  useEffect(() => {
    const unsubscribeShowTab = navigation.addListener("focus", showBottomTab);
    const unsubscribeHideTab = navigation.addListener("blur", hideBottomTab);

    return () => {
      unsubscribeHideTab();
      unsubscribeShowTab();
    };
  }, [navigation]);

  const handleChangeFolder = (key: string) => {
    setActiveFolderKey(key);
  };

  const handleOpenScan = (id: string) => {
    hideBottomTab();
    navigate("Scans", {
      scans: scansData[activeFolderKey],
      activeScanId: id,
      activeRoute: "Projects",
    });
  };

  return {
    isLoading,
    folderNames,
    scans: scans[activeFolderKey],
    activeFolderKey,
    handleChangeFolder,
    handleOpenScan,
  };
};

export default useProject;
