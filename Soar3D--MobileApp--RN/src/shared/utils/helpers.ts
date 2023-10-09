import { SERVER_URL_DEV, SERVER_URL_PROD } from "@env";
import { IMyScansList } from "shared/types/myScans/myScans.type";

export const MY_SERVER_URL = SERVER_URL_PROD;

export const routeWithParams = (root: string, params: any) => {
  let result = root;
  Object.keys(params).forEach((key) => {
    result = result.replace(`:${key}`, params[key]);
  });
  return result;
};

export const convertSizeToText = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
  return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

export const validCoordinates = (cords: any, altCords?: any) => {
  let latitude = parseFloat(cords["latitude"]);
  let longitude = parseFloat(cords["longitude"]);

  if (latitude == 0 && longitude == 0 && altCords) {
    latitude = parseFloat(altCords["latitude"]);
    longitude = parseFloat(altCords["longitude"]);
  }

  if (
    !(latitude >= -90 && latitude <= 90) ||
    !(longitude >= -180 && longitude <= 180)
  ) {
    return {
      latitude: 40.7018596,
      longitude: -74.0411671,
    };
  }

  return {
    latitude,
    longitude,
  };
};

export const updateMultipleScansCategory = (scans: IMyScansList[]) => {
  return scans.map((item) => {
    return {
      ...item,
      category: ["3d Scan", "3D Scan"].includes(item.category)
        ? "NeRF"
        : item.category,
    };
  });
};

export const updateScanCategory = (scans: IMyScansList) => {
  return {
    ...scans,
    category: ["3d Scan", "3D Scan"].includes(scans.category)
      ? "NeRF"
      : scans.category,
  };
};

export const extractLocationName = (location: string): string | undefined => {
  if (!location) return;

  const alphaNumLocation = location
    .match(/[a-zA-Z0-9!@#$%^&*()\-_]+/g)
    ?.join(" ");

  return (alphaNumLocation ?? "").split(",").pop()?.trim();
};

export const calculateOverallPercentage = (decimalPercentages: number[]) => {
  const sum = decimalPercentages.reduce(
    (accumulator, percentage) => accumulator + percentage,
    0
  );
  const average = sum / decimalPercentages.length;
  const overallPercentage = average * 100;
  return overallPercentage;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function addQueryParamsToLink(link: string, queryParams: any): string {
  return `${link}&${new URLSearchParams(queryParams).toString()}`;
}

export function getTimeAgo(date: any) {
  var seconds = Math.floor(((new Date() as any) - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " year" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
  }
  return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}

export const getAddressFromCoordinates = async (
  latitude: any,
  longitude: any
) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyDlDCNhuZmEmgltF_kuoNEBhmGltDhbgUA`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      //  console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};
