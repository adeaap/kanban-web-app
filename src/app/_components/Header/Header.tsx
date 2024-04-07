import styles from "./Header.module.css";
import Image from "next/image";
import LogoMobile from "../../../assets/logo-mobile.svg";
import IconChevronDown from "../../../assets/icon-chevron-down.svg";
import IconAddTaskMobile from "../../../assets/icon-add-task-mobile.svg";
import IconVerticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className="flex items-center gap-4">
        <Image src={LogoMobile} alt="Kanban Logo" />
        <div className="flex items-center gap-2">
          <h1 className="heading-l">Platform Launch</h1>
          <Image src={IconChevronDown} alt="Icon Chevron Down" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* <button className={styles["icon-add-task-mobile"]}>
          <Image src={IconAddTaskMobile} alt="Add task" />
        </button> */}
        <Image src={IconVerticalEllipsis} alt="More actions" />
      </div>
    </header>
  );
}
