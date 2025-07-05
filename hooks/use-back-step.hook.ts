"use client";

import { usePathname, useRouter } from "@/i18n/routing";

export const useBackStep = () => {
  const router = useRouter();
  const pathname = usePathname();

  const goBackStep = () => {
    const pathArray = pathname.split("/");
    if (pathArray.length > 1) {
      pathArray.pop(); // Remove the last segment

      router.push(pathArray.join("/"));
    }
  };

  return goBackStep;
};
