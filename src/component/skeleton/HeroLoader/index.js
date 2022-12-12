import ContentLoader from "react-content-loader";
import styles from "./HeroLoader.module.scss";
import clsx from "clsx";
import { SpinningCircles, Rings } from "react-loading-icons";
import { MainLogo } from "../../Logo";

export const HeroLoader = () => {
  return (
    <>
      <div className={clsx(styles.loaderContainer)}>
        <div
          className={clsx(
            "d-flex justify-content-center align-items-center",
            styles.loaderContent
          )}
        >
          <div className={styles.loaderLogo}>
            <MainLogo width={"500"} height={"200"} />
          </div>
          <div className={styles.loaderIcon}>
            <Rings speed={2} stroke="#f1b722" width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>
    </>
  );
};
