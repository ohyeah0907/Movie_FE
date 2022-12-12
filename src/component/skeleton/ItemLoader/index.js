import ContentLoader from "react-content-loader";
import styles from "./ItemLoader.module.scss";
import clsx from "clsx";
import { Puff, Rings } from "react-loading-icons";

export const ItemLoader = ({ layout = "normal" }) => {
  return (
    <>
      <div
        className={clsx(
          styles.loaderContainer,
          styles[`loaderContainer${layout}`]
        )}
      >
        <div
          className={clsx(
            styles.loaderContent,
            styles[`loaderContent${layout}`]
          )}
        >
          {layout.includes("feature") ? (
            <div className={styles.loaderIcon}>
              <Puff speed={2} stroke="#f1b722" width={"100%"} height={"100%"} />
            </div>
          ) : (
            <ContentLoader
              height={"100px"}
              width={"100%"}
              speed={2}
              backgroundColor={"#002231"}
              foregroundColor={"#f6bd60"}
            >
              <rect rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          )}
        </div>
      </div>
    </>
  );
};
